"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export function AuthHashHandler() {
  const router = useRouter();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;

    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      processed.current = true;
      const supabase = createClient();

      // Supabase PKCE flow: detect hash, exchange for session
      supabase.auth
        .getSession()
        .then(({ data: { session }, error }) => {
          if (session) {
            // Clean URL hash
            window.history.replaceState(null, "", window.location.pathname);
            router.push("/dashboard");
          } else if (error) {
            console.error("Hash auth error:", error.message);
          }
        })
        .catch((err) => {
          console.error("Hash auth failed:", err);
        });
    }
  }, [router]);

  return null;
}
