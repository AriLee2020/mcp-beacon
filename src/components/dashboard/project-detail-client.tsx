"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header-footer";
import Link from "next/link";
import { ArrowLeft, Activity, BarChart3, Zap, Clock, Code } from "lucide-react";

interface ProjectStats {
  total_calls: number;
  total_tokens: number;
  total_cost: number;
  avg_latency_ms: number;
  sessions: number;
  agents: { id: string; name: string }[];
  recent_traces: {
    id: string;
    model: string;
    provider: string;
    latency_ms: number | null;
    cost: number | null;
    status_code: number | null;
    created_at: string;
  }[];
}

export default function ProjectPageClient({
  project,
  projectId,
}: {
  project: any;
  projectId: string;
}) {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/stats`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.description}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Activity className="w-5 h-5" />, label: "Total Calls", value: loading ? "—" : String(stats?.total_calls || 0), color: "blue" },
            { icon: <Zap className="w-5 h-5" />, label: "Total Tokens", value: loading ? "—" : (stats?.total_tokens || 0).toLocaleString(), color: "amber" },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Cost", value: loading ? "—" : `$${(stats?.total_cost || 0).toFixed(4)}`, color: "green" },
            { icon: <Clock className="w-5 h-5" />, label: "Avg Latency", value: loading ? "—" : `${stats?.avg_latency_ms || 0}ms`, color: "purple" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className={`inline-flex p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-950 text-${stat.color}-600 dark:text-${stat.color}-400 mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Agents */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Agents ({stats?.agents?.length || 0})
          </h2>
          {stats?.agents && stats.agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.agents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-semibold text-sm">{agent.name}</span>
                  </div>
                  <code className="text-xs text-gray-400 font-mono">
                    {agent.id.slice(0, 12)}...
                  </code>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <Code className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">No agents connected yet.</p>
            </div>
          )}
        </div>

        {/* Recent Traces */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Traces</h2>
          {stats?.recent_traces && stats.recent_traces.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                    <th className="px-4 py-3 font-medium text-gray-500">Time</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Model</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Latency</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Cost</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {stats.recent_traces.map((trace, i) => (
                    <tr key={trace.id || i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(trace.created_at).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        <span className="text-gray-400">{trace.provider}/</span>
                        {trace.model}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {trace.latency_ms != null ? `${trace.latency_ms}ms` : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono">
                        {trace.cost != null ? `$${trace.cost.toFixed(6)}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            (trace.status_code || 200) < 400
                              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                          }`}
                        >
                          {trace.status_code || 200}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <Activity className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">No traces recorded yet.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
