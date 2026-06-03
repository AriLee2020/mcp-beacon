"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header-footer";
import Link from "next/link";
import { ArrowLeft, Activity, BarChart3, Zap, Clock, Code, Key, Copy, Check, Terminal } from "lucide-react";

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
  const [keys, setKeys] = useState<any[]>([]);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyName, setKeyName] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${projectId}/stats`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    fetch(`/api/projects/${projectId}/keys`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setKeys(data.keys || []);
      })
      .catch(console.error);
  }, [projectId]);

  const createKey = async () => {
    const r = await fetch(`/api/projects/${projectId}/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: keyName || "Default" }),
    });
    const d = await r.json();
    if (d.api_key) {
      setNewKey(d.api_key);
      setShowKeyInput(false);
      setKeyName("");
      fetch(`/api/projects/${projectId}/keys`)
        .then((r) => r.json())
        .then((data) => { if (!data.error) setKeys(data.keys || []); });
    }
  };

  const copyCmd = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            { icon: <Activity className="w-5 h-5" />, label: "Total Calls", value: loading ? "—" : String(stats?.total_calls || 0) },
            { icon: <Zap className="w-5 h-5" />, label: "Total Tokens", value: loading ? "—" : (stats?.total_tokens || 0).toLocaleString() },
            { icon: <BarChart3 className="w-5 h-5" />, label: "Cost", value: loading ? "—" : `$${(stats?.total_cost || 0).toFixed(4)}` },
            { icon: <Clock className="w-5 h-5" />, label: "Avg Latency", value: loading ? "—" : `${stats?.avg_latency_ms || 0}ms` },
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

        {/* Quick Start SDK */}
        {keys.length > 0 && (
          <div className="mb-8 p-6 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold">Quick Start — SDK Setup</h2>
              <button
                onClick={() => copyCmd("npm install mcp-beacon")}
                className="ml-auto inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div><span className="text-gray-500"># 1. Install</span></div>
              <div>npm install mcp-beacon</div>
              <div className="mt-3"><span className="text-gray-500"># 2. Wrap your client (example: DeepSeek)</span></div>
              <div>
                <span className="text-purple-400">import</span> {"{"} createBeacon, wrap {"}"} <span className="text-purple-400">from</span> <span className="text-yellow-300">"mcp-beacon"</span>;
              </div>
              <div className="mt-1">
                <span className="text-purple-400">const</span> beacon = createBeacon({"{"}<br/>
                {"  "}endpoint: <span className="text-yellow-300">"https://mcpbeacon.asia"</span>,<br/>
                {"  "}apiKey: <span className="text-yellow-300">"YOUR_KEY"</span>,<br/>
                {"  "}agentId: <span className="text-yellow-300">"my-agent"</span>,<br/>
                {"}"});
              </div>
              <div className="mt-1">
                <span className="text-purple-400">const</span> ai = wrap(beacon, <span className="text-purple-400">new</span> OpenAI({"{"} apiKey, baseURL: <span className="text-yellow-300">"https://api.deepseek.com"</span> {"}"}));
              </div>
              <div className="mt-3"><span className="text-gray-500"># 3. Use normally — everything is tracked</span></div>
              <div><span className="text-purple-400">await</span> ai.chat.completions.create({"{"} model: <span className="text-yellow-300">"deepseek-chat"</span>, messages: [...] {"}"});</div>
              <div><span className="text-purple-400">await</span> beacon.shutdown();</div>
            </div>
          </div>
        )}

        {/* API Keys */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              <Key className="w-4 h-4 inline mr-2" />
              API Keys ({keys.length})
            </h2>
            <button onClick={() => setShowKeyInput(true)} className="text-sm text-blue-600 hover:text-blue-700">
              + New Key
            </button>
          </div>

          {showKeyInput && (
            <div className="mb-4 flex gap-2">
              <input
                type="text" placeholder="Key name (optional)" value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border text-sm dark:bg-gray-900 dark:border-gray-700"
              />
              <button onClick={createKey} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Create</button>
              <button onClick={() => setShowKeyInput(false)} className="px-3 py-2 text-sm text-gray-500">Cancel</button>
            </div>
          )}

          {newKey && (
            <div className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">⚠️ Save this key — it won't be shown again!</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded bg-white dark:bg-gray-900 font-mono text-sm break-all">{newKey}</code>
                <button onClick={() => { navigator.clipboard.writeText(newKey); setNewKey(null); }}
                  className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-medium">Copy &amp; Dismiss</button>
              </div>
            </div>
          )}

          {keys.length > 0 ? (
            <div className="space-y-2">
              {keys.map((key: any) => (
                <div key={key.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm">
                  <div>
                    <span className="font-mono text-xs">{key.name}</span>
                    <span className="ml-2 text-gray-400 text-xs">Created {new Date(key.created_at).toLocaleDateString()}</span>
                  </div>
                  <span className={`text-xs font-medium ${key.revoked_at ? "text-red-500" : "text-green-500"}`}>
                    {key.revoked_at ? "Revoked" : "Active"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No API keys yet. Click "+ New Key" to create one.</p>
          )}
        </div>

        {/* Agents */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Agents ({stats?.agents?.length || 0})</h2>
          {stats?.agents && stats.agents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.agents.map((agent) => (
                <div key={agent.id} className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-semibold text-sm">{agent.name}</span>
                  </div>
                  <code className="text-xs text-gray-400 font-mono">{agent.id.slice(0, 12)}...</code>
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
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(trace.created_at).toLocaleTimeString()}</td>
                      <td className="px-4 py-3 font-mono text-xs">
                        <span className="text-gray-400">{trace.provider}/</span>{trace.model}
                      </td>
                      <td className="px-4 py-3 text-xs">{trace.latency_ms != null ? `${trace.latency_ms}ms` : "—"}</td>
                      <td className="px-4 py-3 text-xs font-mono">{trace.cost != null ? `$${trace.cost.toFixed(6)}` : "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${(trace.status_code || 200) < 400 ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"}`}>
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
