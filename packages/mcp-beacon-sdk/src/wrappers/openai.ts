import { Beacon } from "../beacon";

interface OpenAIClient {
  chat: {
    completions: {
      create: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
    };
  };
}

/**
 * Wrap an OpenAI client instance to monitor all chat.completions.create calls.
 *
 * @example
 * const openai = new OpenAI({ apiKey: '...' });
 * const monitored = beacon.wrap(openai);
 * // All subsequent calls to monitored.chat.completions.create are tracked
 */
export function wrapOpenAI(beacon: Beacon, client: OpenAIClient): OpenAIClient {
  const originalCreate = client.chat.completions.create.bind(client.chat.completions);

  const wrappedCreate = async (params: Record<string, unknown>): Promise<Record<string, unknown>> => {
    const startTime = Date.now();

    try {
      const result = await originalCreate(params);
      const duration = Date.now() - startTime;

      // Extract content from response
      const choices = result.choices as Array<{ message?: { content?: string }; finish_reason?: string }> | undefined;
      const usage = result.usage as { prompt_tokens?: number; completion_tokens?: number } | undefined;

      // Fire-and-forget recording
      beacon.record({
        type: "llm_call",
        timestamp: startTime,
        provider: "openai",
        model: (params.model as string) || "unknown",
        request: { ...params },
        response: {
          content: choices?.[0]?.message?.content ?? "",
          usage: {
            input_tokens: usage?.prompt_tokens,
            output_tokens: usage?.completion_tokens,
          },
          finish_reason: choices?.[0]?.finish_reason,
        },
        duration_ms: duration,
      }).catch(() => {});

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      beacon
        .record({
          type: "llm_call",
          timestamp: startTime,
          provider: "openai",
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
    chat: {
      ...client.chat,
      completions: {
        ...client.chat.completions,
        create: wrappedCreate,
      },
    },
  };
}
