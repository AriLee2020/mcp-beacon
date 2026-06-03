import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  // 1. SSR client — reads user session from cookies (authenticated role)
  const supabaseSSR = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll() {}, // no-op for API routes
      },
    }
  );

  const { data: { user }, error: authError } = await supabaseSSR.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Admin client — service_role bypasses RLS
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // 3. Ensure profile exists — Magic Link login creates auth.users but NOT public.profiles
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || null,
        avatar_url: user.user_metadata?.avatar_url || null,
      },
      { onConflict: "id" }
    );

  if (profileError) {
    console.error("Failed to upsert profile:", profileError);
    return NextResponse.json(
      { error: "Failed to ensure user profile" },
      { status: 500 }
    );
  }

  const { name, description } = await request.json();
  if (!name || name.trim().length === 0) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 });
  }

  const rawKey = "mb_" + crypto.randomBytes(24).toString("hex");
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  const { data: project, error: projectError } = await supabaseAdmin
    .from("projects")
    .insert({
      user_id: user.id,
      name: name.trim(),
      description: description?.trim() || null,
    })
    .select()
    .single();

  if (projectError || !project) {
    return NextResponse.json(
      { error: projectError?.message || "Failed to create project" },
      { status: 500 }
    );
  }

  const { error: keyError } = await supabaseAdmin
    .from("api_keys")
    .insert({
      project_id: project.id,
      key_hash: keyHash,
      name: "Default",
    });

  if (keyError) {
    await supabaseAdmin.from("projects").delete().eq("id", project.id);
    return NextResponse.json({ error: "Failed to create API key" }, { status: 500 });
  }

  return NextResponse.json({
    project: { id: project.id, name: project.name, description: project.description, created_at: project.created_at },
    api_key: rawKey,
  });
}
