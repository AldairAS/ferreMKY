"use server";

import { supabase } from "@/config";

export async function getUserData() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", user?.id)
    .single();

  return userData;
}
