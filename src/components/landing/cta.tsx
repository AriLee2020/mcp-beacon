import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 sm:p-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Ready to Ship with Confidence?
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
          Start monitoring your AI agents in under 2 minutes. No credit card required.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-blue-400 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
