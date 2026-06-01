"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-[var(--gray-bg)]">
      <div className="text-center">
        <p className="text-8xl font-extrabold font-[var(--font-heading)] text-[var(--error)] mb-4">
          500
        </p>
        <h1 className="text-2xl font-bold text-[var(--text)] mb-2">
          Something Went Wrong
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center font-semibold rounded-lg bg-[var(--orange)] text-white px-5 py-2.5 hover:bg-[var(--orange-dark)] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
