import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header-footer";
import Link from "next/link";
import { ArrowLeft, Key, Activity, BarChart3, Settings } from "lucide-react";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) notFound();

  const { data: apiKeys } = await supabase
    .from("api_keys")
    .select("*")
    .eq("project_id", id)
    .eq("revoked_at", null as any)
    .is("revoked_at", null);

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("project_id", id);

  return (
    <>
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/projects/${id}/settings`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
            <p className="text-2xl font-bold">{agents?.length || 0}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Agents</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Key className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-3" />
            <p className="text-2xl font-bold">{apiKeys?.length || 0}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">API Keys</p>
          </div>
          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400 mb-3" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Calls</p>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <div>
                <p className="text-sm font-medium">Get your API Key</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Create an API key in project settings to authenticate your agents.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <div>
                <p className="text-sm font-medium">Install the SDK</p>
                <code className="block mt-1 text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono">
                  npm install @mcp-beacon/sdk
                </code>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <div>
                <p className="text-sm font-medium">Start monitoring</p>
                <code className="block mt-1 text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg font-mono whitespace-pre-wrap">
                  {`import { MCPBeacon } from '@mcp-beacon/sdk';

const beacon = new MCPBeacon({ apiKey: 'mb_...' });
beacon.track({ model: 'gpt-4', tokens: 150, cost: 0.003 });`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
