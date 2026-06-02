import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Ensure profile exists
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      full_name: user.email?.split("@")[0] || "User",
    });
  }

  const [{ data: freshProfile }, { data: projects }, { data: alertLogs }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("projects").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase
      .from("alert_logs")
      .select("*, alerts!inner(name, alert_type)")
      .eq("acknowledged", false)
      .limit(5),
  ]);

  return (
    <DashboardClient
      user={user}
      profile={freshProfile}
      projects={projects || []}
      alertLogs={alertLogs || []}
    />
  );
}
