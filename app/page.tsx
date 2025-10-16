"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative bg-[color:var(--bg-base)]">
      {/* 🧑‍💻 Hero */}
<section className="relative overflow-hidden py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto w-44 h-56 rounded-3xl overflow-hidden ring-4 ring-sky-400/30 shadow-[0_0_25px_rgba(56,189,248,0.25)] mb-6">
              <Image
                src="/profile.jpg"
                alt="Erkan Sevdi"
                width={176}
                height={224}
                className="object-cover object-center rounded-3xl"
                priority
              />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {t("greeting")}
            </h1>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              {t("developerDesc")}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a className="btn-gradient" href="#timeline">
                {t("experienceBtn")}
              </a>
              <a
                className="glass px-5 py-2.5 rounded-xl"
                href="https://github.com/erkansevdi"
                target="_blank"
                rel="noreferrer"
              >
                {t("github")}
              </a>
              <a
                className="glass px-5 py-2.5 rounded-xl"
                href="https://www.linkedin.com/in/erkansevdi/"
                target="_blank"
                rel="noreferrer"
              >
                {t("linkedin")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

<AboutSection />

      {/* 🕓 Deneyim Çizelgesi */}
      <section
        id="timeline"
        className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 transition-colors duration-500"
      >
        <div
          className="absolute inset-0 -z-10 rounded-3xl"
          style={{
            background: "var(--timeline-bg)",
          }}
        />
        <div
          className="relative border-2 border-sky-300/60 dark:border-white/10 rounded-3xl p-10 
               backdrop-blur-md shadow-glow overflow-hidden
               bg-white/85 dark:bg-slate-900/40 transition-all duration-500"
        >
          <div className="relative mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">{t("timelineTitle")}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t("timelineDesc")}</p>
          </div>

          <Timeline />

          <div className="relative text-center mt-14">
            <Link href="/experience" className="btn-gradient inline-flex items-center gap-2">
              {t("detailsBtn")}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 📬 Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="max-w-none">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
