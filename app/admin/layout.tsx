"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/auth";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (!mounted) return null;

  const menuItems = [
    { name: "🧠 Hakkımda", href: "/admin/about" },
    { name: "💼 Deneyimler", href: "/admin/experiences" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sol Menü */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between fixed h-screen">
        <div>
          <h1 className="text-xl font-bold mb-8 text-sky-500">Admin Panel</h1>
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === item.href
                    ? "bg-sky-500 text-white"
                    : "hover:bg-sky-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "dark" ? "Açık Tema" : "Koyu Tema"}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Sağ İçerik */}
      <main className="flex-1 ml-64 p-10">
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-8 transition-all">
          {children}
        </div>
      </main>
    </div>
  );
}
