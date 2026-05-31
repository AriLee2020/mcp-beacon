export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          stripe_customer_id: string | null;
          plan: "free" | "pro" | "enterprise";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          stripe_customer_id?: string | null;
          plan?: "free" | "pro" | "enterprise";
        };
        Update: {
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          stripe_customer_id?: string | null;
          plan?: "free" | "pro" | "enterprise";
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          api_key: string;
          daily_request_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          api_key?: string;
          daily_request_limit?: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          daily_request_limit?: number;
          updated_at?: string;
        };
      };
      agents: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          provider: "openai" | "anthropic" | "deepseek" | "custom";
          model: string;
          config: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          provider: "openai" | "anthropic" | "deepseek" | "custom";
          model: string;
          config?: Record<string, unknown> | null;
        };
        Update: {
          name?: string;
          provider?: "openai" | "anthropic" | "deepseek" | "custom";
          model?: string;
          config?: Record<string, unknown> | null;
          updated_at?: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          agent_id: string;
          status: "active" | "completed" | "error";
          input_tokens: number;
          output_tokens: number;
          total_cost: number;
          request_count: number;
          started_at: string;
          ended_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          agent_id: string;
          status?: "active" | "completed" | "error";
          input_tokens?: number;
          output_tokens?: number;
          total_cost?: number;
          request_count?: number;
          started_at?: string;
          ended_at?: string | null;
        };
        Update: {
          status?: "active" | "completed" | "error";
          input_tokens?: number;
          output_tokens?: number;
          total_cost?: number;
          request_count?: number;
          ended_at?: string | null;
        };
      };
      alerts: {
        Row: {
          id: string;
          project_id: string;
          type: "cost_spike" | "rate_limit" | "loop_detected" | "error_rate";
          severity: "info" | "warning" | "critical";
          message: string;
          metadata: Record<string, unknown> | null;
          resolved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          type: "cost_spike" | "rate_limit" | "loop_detected" | "error_rate";
          severity?: "info" | "warning" | "critical";
          message: string;
          metadata?: Record<string, unknown> | null;
          resolved?: boolean;
        };
        Update: {
          severity?: "info" | "warning" | "critical";
          message?: string;
          metadata?: Record<string, unknown> | null;
          resolved?: boolean;
        };
      };
    };
  };
}
