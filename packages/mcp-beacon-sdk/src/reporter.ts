import type { BeaconConfig } from "./types";
import type { BeaconEvent } from "./types";

export class Reporter {
  private buffer: BeaconEvent[] = [];
  private config: Required<BeaconConfig>;
  private timer: ReturnType<typeof setInterval> | null = null;
  private flushing = false;

  constructor(config: Required<BeaconConfig>) {
    this.config = config;
    this.start();
  }

  private start(): void {
    this.timer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.flush();
      }
    }, this.config.flushIntervalMs);
  }

  /** Add event to buffer; flush if buffer is full */
  enqueue(event: BeaconEvent): void {
    this.buffer.push(event);
    if (this.buffer.length >= this.config.maxBufferSize) {
      // Fire-and-forget flush (don't block the caller)
      this.flush().catch(() => {});
    }
  }

  /** Flush all buffered events to the server */
  async flush(): Promise<void> {
    if (this.flushing || this.buffer.length === 0) return;
    this.flushing = true;

    const batch = [...this.buffer];
    this.buffer = [];

    let lastError: Error | null = null;
    for (let attempt = 0; attempt < this.config.maxRetries; attempt++) {
      try {
        await this.sendBatch(batch);
        lastError = null;
        break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error("Unknown error");
        // Exponential backoff: 1s, 2s, 4s
        await this.sleep(Math.pow(2, attempt) * 1000);
      }
    }

    if (lastError) {
      // Put events back into buffer for next flush
      this.buffer = [...batch, ...this.buffer];

      // Offline cache fallback
      if (this.config.offlineCache) {
        this.cacheToLocalStorage(batch).catch(() => {});
      }
    }

    this.flushing = false;
  }

  private async sendBatch(events: BeaconEvent[]): Promise<void> {
    const response = await fetch(`${this.config.endpoint}/api/ingest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        agent_id: this.config.agentId,
        events,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  private async cacheToLocalStorage(events: BeaconEvent[]): Promise<void> {
    try {
      if (typeof localStorage === "undefined") return;
      const key = `mcp_beacon_cache_${this.config.agentId}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([...existing, ...events]));
    } catch {
      // Silently fail — local storage may not be available
    }
  }

  /** Replay cached events from offline storage */
  async replayCache(): Promise<number> {
    try {
      if (typeof localStorage === "undefined") return 0;
      const key = `mcp_beacon_cache_${this.config.agentId}`;
      const cached = JSON.parse(localStorage.getItem(key) || "[]");
      if (cached.length === 0) return 0;

      const count = cached.length;
      for (let i = 0; i < cached.length; i += 50) {
        const chunk = cached.slice(i, i + 50);
        try {
          await this.sendBatch(chunk);
        } catch {
          break;
        }
      }
      localStorage.removeItem(key);
      return count;
    } catch {
      return 0;
    }
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
