// === Event types ===

export interface BeaconConfig {
  /** MCP Beacon API endpoint */
  endpoint: string;
  /** Project API key */
  apiKey: string;
  /** Agent identifier (optional, auto-generated if not provided) */
  agentId?: string;
  /** Flush interval in ms (default: 5000) */
  flushIntervalMs?: number;
  /** Maximum buffer size before forced flush (default: 100) */
  maxBufferSize?: number;
  /** Enable offline cache (default: true) */
  offlineCache?: boolean;
  /** Maximum retry attempts (default: 3) */
  maxRetries?: number;
}

export interface LLMEvent {
  type: "llm_call";
  timestamp: number;
  provider: "openai" | "anthropic" | "deepseek" | "custom";
  model: string;
  request: {
    messages?: unknown[];
    temperature?: number;
    max_tokens?: number;
    [key: string]: unknown;
  };
  response: {
    content: string;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
    };
    finish_reason?: string;
  };
  duration_ms: number;
  cost_estimate?: number;
}

export interface HTTPEvent {
  type: "http_call";
  timestamp: number;
  method: string;
  url: string;
  status: number;
  duration_ms: number;
  request_body?: string;
  response_body?: string;
}

export interface LoopAlert {
  type: "loop_detected";
  similarity: number;
  messages: unknown[];
  repeated_pattern: string;
}

export type BeaconEvent = LLMEvent | HTTPEvent | LoopAlert;

export interface SessionStartPayload {
  agent_id: string;
  provider: string;
  model: string;
}

export interface SessionEndPayload {
  status: "completed" | "error";
  input_tokens: number;
  output_tokens: number;
  total_cost: number;
  request_count: number;
}

// === Model pricing (per 1K tokens, USD) ===

export const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  // OpenAI
  "gpt-4o": { input: 0.005, output: 0.015 },
  "gpt-4o-mini": { input: 0.00015, output: 0.0006 },
  "gpt-4-turbo": { input: 0.01, output: 0.03 },
  "gpt-4": { input: 0.03, output: 0.06 },
  "gpt-3.5-turbo": { input: 0.0005, output: 0.0015 },
  // Anthropic
  "claude-sonnet-4-20250514": { input: 0.003, output: 0.015 },
  "claude-3-5-sonnet-20241022": { input: 0.003, output: 0.015 },
  "claude-3-5-haiku-20241022": { input: 0.0008, output: 0.004 },
  "claude-3-opus-20240229": { input: 0.015, output: 0.075 },
  // DeepSeek
  "deepseek-chat": { input: 0.00027, output: 0.0011 },
  "deepseek-reasoner": { input: 0.00055, output: 0.00219 },
};
