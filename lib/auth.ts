"use server";

import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

/**
 * Admin girişi — username bazlı kontrol
 */
export async function loginAdmin(username: string, password: string) {
      console.log("🚀 Login denemesi:", username, password);

  const { data, error } = await supabase
    .from("admins")
    .select("id, username, password_hash")
    .eq("username", username)
    .single();
  console.log("📦 Supabase result:", { data, error });


  if (error || !data) {
        console.log(data);

    console.error("❌ Admin bulunamadı:", error);
      console.log("📦 Supabase result:", { data, error });
      console.log("🚀 Login denemesi:", username, password);

    return { success: false, message: "Kullanıcı bulunamadı." };
  }

  const passwordMatch = await bcrypt.compare(password, data.password_hash);

  if (!passwordMatch) {
    return { success: false, message: "Hatalı şifre." };
  }

  // Giriş başarılı → cookie oluştur
  cookies().set("admin_session", data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 gün
    path: "/",
  });

  return { success: true };
}

/**
 * Çıkış işlemi
 */
export async function logoutAdmin() {
  cookies().delete("admin_session");
}
