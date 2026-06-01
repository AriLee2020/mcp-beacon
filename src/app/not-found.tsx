import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-[var(--gray-bg)]">
      <div className="text-center">
        <p className="text-8xl font-extrabold font-[var(--font-heading)] text-[var(--orange)] mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-[var(--text)] mb-2">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-semibold rounded-lg bg-[var(--orange)] text-white px-5 py-2.5 hover:bg-[var(--orange-dark)] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center font-semibold rounded-lg border border-[var(--orange)] text-[var(--orange)] px-5 py-2.5 hover:bg-[var(--orange-ghost)] transition-colors"
          >
            View Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
