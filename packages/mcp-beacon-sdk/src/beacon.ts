import type { BeaconConfig, BeaconEvent, LoopAlert } from "./types";
import { estimateTokens, estimateCost } from "./tokens";
import { Reporter } from "./reporter";
import { LoopDetector } from "./loop-detector";

export class Beacon {
  private config: Required<BeaconConfig>;
  private reporter: Reporter;
  private loopDetector: LoopDetector;
  private session: {
    inputTokens: number;
    outputTokens: number;
    totalCost: number;
    requestCount: number;
  };

  constructor(config: BeaconConfig) {
    this.config = {
      flushIntervalMs: config.flushIntervalMs ?? 5000,
      maxBufferSize: config.maxBufferSize ?? 100,
      offlineCache: config.offlineCache ?? true,
      maxRetries: config.maxRetries ?? 3,
      endpoint: config.endpoint,
      apiKey: config.apiKey,
      agentId: config.agentId ?? `agent_${Date.now()}`,
    };

    this.reporter = new Reporter(this.config);
    this.loopDetector = new LoopDetector();
    this.session = {
      inputTokens: 0,
      outputTokens: 0,
      totalCost: 0,
      requestCount: 0,
    };
  }

  /** Record an LLM API call event */
  async record(event: BeaconEvent): Promise<void> {
    this.session.requestCount++;
    if (event.type === "llm_call") {
      const inputTokens = event.response.usage?.input_tokens ?? estimateTokens(event.request.messages);
      const outputTokens = event.response.usage?.output_tokens ?? estimateTokens(event.response.content);
      event.cost_estimate = estimateCost(event.model, inputTokens, outputTokens);
      event.response.usage = {
        input_tokens: inputTokens,
        output_tokens: outputTokens,
      };

      this.session.inputTokens += inputTokens;
      this.session.outputTokens += outputTokens;
      this.session.totalCost += event.cost_estimate;

      // Check for loops
      const loopResult = this.loopDetector.check(event.request.messages);
      if (loopResult) {
        this.reporter.enqueue({ type: "loop_detected", ...loopResult });
      }
    }

    this.reporter.enqueue(event);
  }

  /** Get current session stats */
  getSession() {
    return { ...this.session };
  }

  /** Flush and stop the reporter */
  async shutdown(): Promise<void> {
    await this.reporter.flush();
    this.reporter.stop();
  }
}
