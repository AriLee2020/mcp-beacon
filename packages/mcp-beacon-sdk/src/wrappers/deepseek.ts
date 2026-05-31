import { Beacon } from "../beacon";

interface DeepSeekClient {
  chat: {
    completions: {
      create: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
    };
  };
}

/**
 * Wrap a DeepSeek client instance (OpenAI-compatible) to monitor all API calls.
 *
 * @example
 * const deepseek = new OpenAI({ baseURL: 'https://api.deepseek.com', apiKey: '...' });
 * const monitored = beacon.wrap(deepseek, { provider: 'deepseek' });
 */
export function wrapDeepSeek(beacon: Beacon, client: DeepSeekClient): DeepSeekClient {
  const originalCreate = client.chat.completions.create.bind(client.chat.completions);

  const wrappedCreate = async (params: Record<string, unknown>): Promise<Record<string, unknown>> => {
    const startTime = Date.now();

    try {
      const result = await originalCreate(params);
      const duration = Date.now() - startTime;

      const choices = result.choices as Array<{ message?: { content?: string }; finish_reason?: string }> | undefined;
      const usage = result.usage as { prompt_tokens?: number; completion_tokens?: number } | undefined;

      beacon
        .record({
          type: "llm_call",
          timestamp: startTime,
          provider: "deepseek",
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
        })
        .catch(() => {});

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      beacon
        .record({
          type: "llm_call",
          timestamp: startTime,
          provider: "deepseek",
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
