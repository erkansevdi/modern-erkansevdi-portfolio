import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/auth";

export async function POST() {
  try {
    await logoutAdmin();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ success: false, message: "Çıkış hatası." });
  }
}
