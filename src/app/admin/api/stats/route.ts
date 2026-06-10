import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createServiceSupabase();

  try {
    // Total users
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // Users today
    const today = new Date().toISOString().split("T")[0];
    const { count: usersToday } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00+08:00`);

    // Total projects
    const { count: totalProjects } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    // Total agents
    const { count: totalAgents } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true });

    // Total sessions
    const { count: totalSessions } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true });

    // Total traces (API calls)
    const { count: totalTraces } = await supabase
      .from("traces")
      .select("*", { count: "exact", head: true });

    // Recent users
    const { data: recentUsers } = await supabase
      .from("profiles")
      .select("id, email, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    // Recent agents
    const { data: recentAgents } = await supabase
      .from("agents")
      .select("id, name, project_id, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      usersToday: usersToday || 0,
      totalProjects: totalProjects || 0,
      totalAgents: totalAgents || 0,
      totalSessions: totalSessions || 0,
      totalTraces: totalTraces || 0,
      recentUsers: recentUsers || [],
      recentAgents: recentAgents || [],
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
