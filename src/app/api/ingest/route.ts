import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  // Authenticate via API key
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing API key" }, { status: 401 });
  }

  const rawKey = authHeader.slice(7); // Remove "Bearer "
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  // Look up the API key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: apiKey } = await supabase
    .from("api_keys")
    .select("id, project_id, name, revoked_at")
    .eq("key_hash", keyHash)
    .single();

  if (!apiKey || apiKey.revoked_at) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  // Update last_used_at
  await supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", apiKey.id);

  // Parse body
  const body = await request.json();
  const { agent_id, events } = body;

  if (!agent_id || !events || !Array.isArray(events)) {
    return NextResponse.json({ error: "Missing agent_id or events" }, { status: 400 });
  }

  // Find or create agent
  const { data: existingAgent } = await supabase
    .from("agents")
    .select("id")
    .eq("project_id", apiKey.project_id)
    .eq("name", agent_id)
    .single();

  let agentId: string;

  if (existingAgent) {
    agentId = existingAgent.id;
  } else {
    const { data: newAgent, error: createError } = await supabase
      .from("agents")
      .insert({
        project_id: apiKey.project_id,
        name: agent_id,
        type: "sdk",
      })
      .select("id")
      .single();

    if (createError || !newAgent) {
      return NextResponse.json({ error: "Failed to register agent" }, { status: 500 });
    }
    agentId = newAgent.id;
  }

  // Process events
  let sessionId: string | null = null;
  const traces: any[] = [];

  for (const event of events) {
    if (event.type === "llm_call") {
      // Create session if not yet created
      if (!sessionId) {
        const { data: session } = await supabase
          .from("sessions")
          .insert({
            agent_id: agentId,
            started_at: new Date(event.timestamp || Date.now()).toISOString(),
            status: "active",
          })
          .select("id")
          .single();
        if (session) sessionId = session.id;
      }

      if (sessionId) {
        traces.push({
          session_id: sessionId,
          model: event.model,
          provider: event.provider,
          prompt_tokens: event.response?.usage?.input_tokens || null,
          completion_tokens: event.response?.usage?.output_tokens || null,
          latency_ms: event.duration_ms || null,
          cost: event.cost_estimate || null,
          status_code: 200,
          request_body: event.request || null,
          response_body: { content: event.response?.content },
          created_at: new Date(event.timestamp || Date.now()).toISOString(),
        });
      }
    } else if (event.type === "http_call") {
      if (sessionId) {
        traces.push({
          session_id: sessionId,
          model: "http",
          provider: event.method,
          latency_ms: event.duration_ms || null,
          status_code: event.status || null,
          request_body: { url: event.url, body: event.request_body },
          response_body: { body: event.response_body },
          created_at: new Date(event.timestamp || Date.now()).toISOString(),
        });
      }
    }
    // loop_detected events are logged but not stored as traces for now
  }

  // Batch insert traces
  if (traces.length > 0) {
    const { error: traceError } = await supabase.from("traces").insert(traces);
    if (traceError) {
      console.error("Trace insert error:", traceError);
    }

    // Update session totals
    if (sessionId) {
      const totalTokens = traces.reduce(
        (sum, t) => sum + (t.prompt_tokens || 0) + (t.completion_tokens || 0),
        0,
      );
      const totalCost = traces.reduce((sum, t) => sum + (t.cost || 0), 0);

      await supabase
        .from("sessions")
        .update({
          total_tokens: totalTokens,
          total_cost: totalCost,
        })
        .eq("id", sessionId);
    }
  }

  // End session if the batch contains a session_end signal
  // (We could add this later)

  return NextResponse.json({
    ok: true,
    agent_id: agentId,
    session_id: sessionId,
    traces_logged: traces.length,
  });
}
