import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { AdminClient } from "./admin-client";

const ADMIN_EMAILS = ["915781358@qq.com"];

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !ADMIN_EMAILS.includes(user.email)) {
    redirect("/auth/login");
  }

  return <AdminClient />;
}
