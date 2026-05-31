import Link from "next/link";
import { TrendingUp, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
        <Zap className="w-4 h-4" />
        Now in Public Beta
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
        Monitor Your AI Agents{" "}
        <span className="text-blue-600 dark:text-blue-400">Before They Burn Cash</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Real-time observability for OpenAI, Anthropic, and DeepSeek agents. Track costs, detect loops, and get alerts — all with a single line of code.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
        >
          Get Started Free
        </Link>
        <Link
          href="#features"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          See Features
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Cost Tracking" value="Real-time" />
        <StatCard icon={<Shield className="w-5 h-5" />} label="Loop Detection" value="Auto-alert" />
        <StatCard icon={<Zap className="w-5 h-5" />} label="Setup Time" value="&lt; 2 minutes" />
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="inline-flex p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-3">
        {icon}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}
