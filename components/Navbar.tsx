"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const toggleLanguage = () => {
    const newLang = lang === "tr" ? "en" : "tr";
    setLang(newLang);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        {/* Sol: Logo */}
        <Link href="/" className="text-lg font-bold tracking-wider">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--bg-gradient)" }}
          >
            ERKAN SEVDİ
          </span>
        </Link>

        {/* Orta: Menü */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
      <Link
        href="/"
        className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
      >
        {lang === "tr" ? "ANA SAYFA" : "HOME"}
      </Link>

      <Link
        href="/experience"
        className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
      >
        {lang === "tr" ? "DENEYİMLER" : "EXPERIENCES"}
      </Link>
        </div>

        {/* Sağ: Sosyal Medya + Tema + Dil */}
        <div className="flex items-center gap-4">
          {/* 🔗 Sosyal Medya */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              title="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 .297a12 12 0 00-3.787 23.412c.6.112.82-.262.82-.582v-2.182c-3.338.726-4.042-1.416-4.042-1.416a3.18 3.18 0 00-1.334-1.75c-1.09-.75.082-.736.082-.736a2.528 2.528 0 011.844 1.24 2.57 2.57 0 003.514 1.004 2.565 2.565 0 01.766-1.61c-2.666-.302-5.466-1.334-5.466-5.93a4.62 4.62 0 011.23-3.21 4.3 4.3 0 01-.118-3.168s1.008-.322 3.3 1.23a11.5 11.5 0 016 0c2.29-1.552 3.3-1.23 3.3-1.23a4.3 4.3 0 01-.118 3.168 4.62 4.62 0 011.23 3.21c0 4.61-2.802 5.625-5.475 5.922a2.865 2.865 0 01.817 2.218v3.293c0 .32.218.694.825.576A12 12 0 0012 .297z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition"
              title="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M4.98 3.5a2.48 2.48 0 100 4.96 2.48 2.48 0 000-4.96zM2 9h6v12H2zM14.75 9c-2.54 0-4.25 1.32-4.25 4.1V21h-4V9h4v2.33c.78-1.16 2.17-2.33 4.25-2.33 3.11 0 5.75 1.96 5.75 6.18V21h-4v-5.5c0-1.75-.63-2.75-2.25-2.75-1.54 0-2.5 1.12-2.5 2.75V21h-4V9h4v1.42C12.04 9.62 13.31 9 14.75 9z" />
              </svg>
            </a>
          </div>

          {/* ☀️🌙 Tema Butonu */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 transition"
            aria-label="Tema Değiştir"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-300" />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* 🌐 Dil Butonu */}
          <button
            onClick={toggleLanguage}
            className="w-7 h-7 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600 hover:scale-110 transition-transform"
            aria-label="Dil Değiştir"
          >
            <Image
              src={lang === "tr" ? "/icons/tr.svg" : "/icons/en.svg"}
              alt={lang === "tr" ? "Türkçe" : "English"}
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
