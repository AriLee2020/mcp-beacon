import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import crypto from "crypto";

// GET /api/projects/[id]/keys — list API keys
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll() {},
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify project ownership
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: keys } = await supabase
    .from("api_keys")
    .select("id, name, last_used_at, created_at, revoked_at")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ keys: keys || [] });
}

// POST /api/projects/[id]/keys — create new API key
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll() {},
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { name } = await request.json();

  // Generate key
  const prefix = "mb_";
  const random = crypto.randomBytes(24).toString("hex");
  const rawKey = prefix + random;
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  const { error: keyError } = await supabase
    .from("api_keys")
    .insert({
      project_id: id,
      key_hash: keyHash,
      name: name || `Key ${Date.now()}`,
    });

  if (keyError) {
    return NextResponse.json({ error: keyError.message }, { status: 500 });
  }

  return NextResponse.json({ api_key: rawKey });
}
