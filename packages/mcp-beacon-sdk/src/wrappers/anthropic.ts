import { Beacon } from "../beacon";

interface AnthropicClient {
  messages: {
    create: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
  };
}

/**
 * Wrap an Anthropic client instance to monitor all messages.create calls.
 *
 * @example
 * const anthropic = new Anthropic({ apiKey: '...' });
 * const monitored = beacon.wrap(anthropic);
 * // All subsequent calls to monitored.messages.create are tracked
 */
export function wrapAnthropic(beacon: Beacon, client: AnthropicClient): AnthropicClient {
  const originalCreate = client.messages.create.bind(client.messages);

  const wrappedCreate = async (params: Record<string, unknown>): Promise<Record<string, unknown>> => {
    const startTime = Date.now();

    try {
      const result = await originalCreate(params);
      const duration = Date.now() - startTime;

      const content = result.content as Array<{ type: string; text?: string }> | undefined;
      const usage = result.usage as { input_tokens?: number; output_tokens?: number } | undefined;

      beacon
        .record({
          type: "llm_call",
          timestamp: startTime,
          provider: "anthropic",
          model: (params.model as string) || "unknown",
          request: { ...params },
          response: {
            content: content?.map((c) => c.text ?? "").join("") ?? "",
            usage: {
              input_tokens: usage?.input_tokens,
              output_tokens: usage?.output_tokens,
            },
            finish_reason: (result.stop_reason as string) ?? undefined,
          },
          duration_ms: duration,
        })
        .catch(() => {});

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      beacon
        .record({
          type: "llm_call",
          timestamp: startTime,
          provider: "anthropic",
          model: (params.model as string) || "unknown",
          request: { ...params },
          response: {
            content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
          duration_ms: duration,
        })
        .catch(() => {});
      throw error;
    }
  };

  return {
    ...client,
    messages: {
      ...client.messages,
      create: wrappedCreate,
    },
  };
}
