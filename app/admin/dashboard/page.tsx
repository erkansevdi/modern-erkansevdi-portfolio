"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Yönetim Paneli</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link href="/admin/about" className="p-6 rounded-xl border dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-800 transition">
          <h2 className="font-semibold text-lg mb-2">🧑‍💻 Hakkımda</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Kişisel bilgileri ve referansları düzenle.</p>
        </Link>

        <Link href="/admin/experiences" className="p-6 rounded-xl border dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-800 transition">
          <h2 className="font-semibold text-lg mb-2">💼 Deneyimler</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">İş geçmişini yönet, yeni deneyim ekle veya gizle.</p>
        </Link>
      </div>
    </div>
  );
}
