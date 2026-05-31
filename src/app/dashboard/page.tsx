import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header-footer";
import Link from "next/link";
import { BarChart3, Code, Bell, Settings } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id);

  const { data: alerts } = await supabase
    .from("alerts")
    .select("*")
    .eq("resolved", false)
    .limit(5);

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Plan: {profile?.plan || "free"} · {projects?.length || 0} projects
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <BarChart3 className="w-5 h-5" />, label: "Total Requests", value: "—" },
            { icon: <Bell className="w-5 h-5" />, label: "Alerts", value: String(alerts?.length || 0) },
            { icon: <Code className="w-5 h-5" />, label: "Projects", value: String(projects?.length || 0) },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Monthly Cost", value: "$0.00" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="inline-flex p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-3">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Projects</h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              + New Project
            </button>
          </div>
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {project.description || "No description"}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                      API Key: {project.api_key.slice(0, 8)}...
                    </code>
                    <span className="text-gray-400">{project.daily_request_limit.toLocaleString()} req/day</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <Code className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No projects yet. Create your first project to start monitoring.</p>
            </div>
          )}
        </div>

        {/* Recent Alerts */}
        {alerts && alerts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${
                    alert.severity === "critical"
                      ? "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950"
                      : alert.severity === "warning"
                        ? "border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950"
                        : "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase">{alert.type}</span>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
