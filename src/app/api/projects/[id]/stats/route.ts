import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll() {},
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify project ownership
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Get agent IDs for this project
  const { data: agents } = await supabase
    .from("agents")
    .select("id, name")
    .eq("project_id", id);

  const agentIds = agents?.map((a) => a.id) || [];

  if (agentIds.length === 0) {
    return NextResponse.json({
      total_calls: 0,
      total_tokens: 0,
      total_cost: 0,
      avg_latency_ms: 0,
      sessions: 0,
      agents: agents || [],
      recent_traces: [],
    });
  }

  // Get sessions for these agents
  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, total_tokens, total_cost, status")
    .in("agent_id", agentIds);

  const sessionIds = sessions?.map((s) => s.id) || [];

  // Aggregate stats
  const totalTokens = sessions?.reduce((sum, s) => sum + (s.total_tokens || 0), 0) || 0;
  const totalCost = sessions?.reduce((sum, s) => sum + (s.total_cost || 0), 0) || 0;

  let total_calls = 0;
  let avg_latency_ms = 0;

  if (sessionIds.length > 0) {
    const { data: traces } = await supabase
      .from("traces")
      .select("latency_ms, created_at, model, provider, cost")
      .in("session_id", sessionIds)
      .order("created_at", { ascending: false })
      .limit(1000);

    total_calls = traces?.length || 0;
    const validLatencies = traces?.filter((t) => t.latency_ms != null) || [];
    avg_latency_ms = validLatencies.length > 0
      ? Math.round(validLatencies.reduce((sum, t) => sum + t.latency_ms!, 0) / validLatencies.length)
      : 0;

    const { data: recent } = await supabase
      .from("traces")
      .select("latency_ms, created_at, model, provider, cost, status_code")
      .in("session_id", sessionIds)
      .order("created_at", { ascending: false })
      .limit(10);

    return NextResponse.json({
      total_calls,
      total_tokens: totalTokens,
      total_cost: totalCost,
      avg_latency_ms,
      sessions: sessions?.length || 0,
      agents: agents || [],
      recent_traces: recent || [],
    });
  }

  return NextResponse.json({
    total_calls: 0,
    total_tokens: 0,
    total_cost: 0,
    avg_latency_ms: 0,
    sessions: 0,
    agents: agents || [],
    recent_traces: [],
  });
}
