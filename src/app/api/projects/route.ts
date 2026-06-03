import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  // Create Supabase client with service_role to bypass RLS
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {}, // no-op for API routes
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const { name, description } = await request.json();
  if (!name || name.trim().length === 0) {
    return NextResponse.json({ error: "Project name is required" }, { status: 400 });
  }

  // Generate API key
  const prefix = "mb_";
  const random = crypto.randomBytes(24).toString("hex");
  const rawKey = prefix + random; // e.g., mb_a1b2c3d4...

  // Hash key for storage
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  // Create project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name: name.trim(),
      description: description?.trim() || null,
    })
    .select()
    .single();

  if (projectError || !project) {
    console.error("Project creation failed:", projectError);
    return NextResponse.json(
      { error: projectError?.message || "Failed to create project" },
      { status: 500 }
    );
  }

  // Store API key
  const { error: keyError } = await supabase
    .from("api_keys")
    .insert({
      project_id: project.id,
      key_hash: keyHash,
      name: "Default",
    });

  if (keyError) {
    console.error("API key creation failed:", keyError);
    // Clean up the project if key creation fails
    await supabase.from("projects").delete().eq("id", project.id);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    project: {
      id: project.id,
      name: project.name,
      description: project.description,
      created_at: project.created_at,
    },
    api_key: rawKey, // ⚠️ Only returned ONCE — save it now
  });
}
