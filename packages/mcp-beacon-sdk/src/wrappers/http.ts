import { Beacon } from "../beacon";

/**
 * Wrap the global `fetch` function to monitor HTTP calls made by your agent.
 *
 * ⚠️ This wraps global fetch — only use in agent code, not in your main app.
 *
 * @example
 * const unwrap = beacon.wrapFetch();
 * // All subsequent fetch() calls are tracked
 * unwrap(); // restore original fetch when done
 */
export function wrapFetch(beacon: Beacon): () => void {
  const originalFetch = globalThis.fetch;

  const wrappedFetch: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const startTime = Date.now();
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const method = init?.method || "GET";

    try {
      const response = await originalFetch(input, init);
      const duration = Date.now() - startTime;

      // Clone response to read body for recording
      let responseBody = "";
      try {
        const clone = response.clone();
        responseBody = await clone.text();
      } catch {
        // Can't read body (e.g., streaming response)
      }

      beacon
        .record({
          type: "http_call",
          timestamp: startTime,
          method,
          url,
          status: response.status,
          duration_ms: duration,
          request_body: init?.body?.toString(),
          response_body: responseBody.slice(0, 1000), // Truncate large responses
        })
        .catch(() => {});

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      beacon
        .record({
          type: "http_call",
          timestamp: startTime,
          method,
          url,
          status: 0,
          duration_ms: duration,
          response_body: `Error: ${error instanceof Error ? error.message : "Unknown"}`,
        })
        .catch(() => {});
      throw error;
    }
  };

  globalThis.fetch = wrappedFetch;

  return () => {
    globalThis.fetch = originalFetch;
  };
}

/**
 * Wrap an Axios instance to monitor HTTP calls.
 * Pass your axios instance (or the default import) to wrap it.
 *
 * @example
 * import axios from 'axios';
 * beacon.wrapAxios(axios);
 */
export function wrapAxios(beacon: Beacon, axiosInstance: {
  interceptors: {
    request: { use: (onFulfilled: (config: unknown) => unknown) => number };
    response: { use: (onFulfilled: (response: unknown) => unknown, onRejected: (error: unknown) => unknown) => number };
  };
}): void {
  // Record start times per request
  const timers = new Map<unknown, number>();

  axiosInstance.interceptors.request.use((config: unknown) => {
    const cfg = config as Record<string, unknown>;
    timers.set(cfg, Date.now());
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response: unknown) => {
      const resp = response as Record<string, unknown>;
      const cfg = resp.config as Record<string, unknown>;
      const startTime = timers.get(cfg) || Date.now();
      timers.delete(cfg);
      const duration = Date.now() - startTime;

      beacon
        .record({
          type: "http_call",
          timestamp: startTime,
          method: (cfg.method as string) || "GET",
          url: (cfg.url as string) || "",
          status: (resp.status as number) || 200,
          duration_ms: duration,
          request_body: cfg.data ? JSON.stringify(cfg.data) : undefined,
          response_body: resp.data ? JSON.stringify(resp.data).slice(0, 1000) : undefined,
        })
        .catch(() => {});

      return response;
    },
    (error: unknown) => {
      const err = error as Record<string, unknown>;
      const cfg = err.config as Record<string, unknown> | undefined;
      const startTime = cfg ? (timers.get(cfg) || Date.now()) : Date.now();
      if (cfg) timers.delete(cfg);
      const duration = Date.now() - startTime;

      beacon
        .record({
          type: "http_call",
          timestamp: startTime,
          method: (cfg?.method as string) || "GET",
          url: (cfg?.url as string) || "",
          status: (err.status as number) || 0,
          duration_ms: duration,
          response_body: `Error: ${err.message || "Unknown"}`,
        })
        .catch(() => {});

      throw error;
    },
  );
}
