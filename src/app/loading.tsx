export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--gray-bg)]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[var(--orange)] animate-bounce" style={{ animationDelay: "-0.3s" }} />
        <div className="w-3 h-3 rounded-full bg-[var(--orange)] animate-bounce" style={{ animationDelay: "-0.15s" }} />
        <div className="w-3 h-3 rounded-full bg-[var(--orange)] animate-bounce" />
      </div>
    </div>
  );
}
