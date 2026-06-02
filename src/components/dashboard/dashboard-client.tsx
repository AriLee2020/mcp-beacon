"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header-footer";
import { SignOutButton } from "@/components/auth/signout-button";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import Link from "next/link";
import { BarChart3, Code, Bell, Settings, Plus } from "lucide-react";

interface DashboardClientProps {
  user: any;
  profile: any;
  projects: any[];
  alertLogs: any[];
}

export function DashboardClient({ user, profile, projects: initialProjects, alertLogs }: DashboardClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleProjectCreated = (project: any) => {
    setProjects((prev) => [project, ...prev]);
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {projects.length} projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <BarChart3 className="w-5 h-5" />, label: "Total Requests", value: "—" },
            { icon: <Bell className="w-5 h-5" />, label: "Alerts", value: String(alertLogs?.length || 0) },
            { icon: <Code className="w-5 h-5" />, label: "Projects", value: String(projects.length) },
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
            <button
              onClick={() => setShowCreateDialog(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                >
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {project.description || "No description"}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono">
                      ID: {project.id.slice(0, 8)}...
                    </code>
                    <span className="text-gray-400">{project.total_calls?.toLocaleString() || 0} calls</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <Code className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                No projects yet. Create your first project to start monitoring.
              </p>
              <button
                onClick={() => setShowCreateDialog(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Project
              </button>
            </div>
          )}
        </div>

        {/* Recent Alerts */}
        {alertLogs && alertLogs.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-2">
              {alertLogs.map((log: any) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-xl border ${
                    log.alerts?.alert_type === "cost_spike" || log.alerts?.alert_type === "error_rate"
                      ? "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950"
                      : log.alerts?.alert_type === "latency"
                        ? "border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950"
                        : "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase">{log.alerts?.alert_type || "alert"}</span>
                      <p className="text-sm mt-1">{log.alerts?.name || "Alert"} — value: {log.value}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.triggered_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <CreateProjectDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onCreated={handleProjectCreated}
      />
    </>
  );
}
