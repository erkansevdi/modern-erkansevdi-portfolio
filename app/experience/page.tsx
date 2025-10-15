"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Experience = {
  id: string;
  company: string | null;
  position: string | null;
  year_start: string | null;
  year_end: string | null;
  description: string | null;
  tech_stack: string | null;
  visible: boolean | null;
  sort_order: number | null;
  translations?: Record<string, Record<string, string>>;
};

export default function ExperiencePage() {
  const { lang } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // JSONB verisinden doğru dilde metin çekmek için yardımcı fonksiyon
  const getText = (exp: Experience, field: string): string => {
    return (
      exp.translations?.[lang]?.[field] ||
      exp[field as keyof Experience]?.toString() ||
      ""
    );
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (error) console.error("Supabase Error:", error);
      else if (data) setExperiences(data);
    };

    fetchExperiences();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-600 dark:text-sky-400">
          {lang === "tr" ? "Deneyim Detayları" : "Experience Details"}
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          {lang === "tr"
            ? "Profesyonel geçmişim ve katkı sağladığım projeler"
            : "My professional journey and the projects I've contributed to"}
        </p>
      </div>

      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative border border-sky-400/30 dark:border-white/10 rounded-2xl 
                       p-6 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-md 
                       hover:shadow-sky-500/20 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
                {getText(exp, "company")}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {exp.year_start} -{" "}
                {exp.year_end
                  ? exp.year_end
                  : lang === "tr"
                  ? "Devam ediyor"
                  : "Present"}
              </p>
            </div>

            {getText(exp, "position") && (
              <h3 className="text-lg mt-2 font-medium text-slate-700 dark:text-slate-200">
                {getText(exp, "position")}
              </h3>
            )}

            {getText(exp, "description") && (
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {getText(exp, "description")}
              </p>
            )}

            {exp.tech_stack && (
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tech_stack
                  .split(",")
                  .map((tech) => tech.trim())
                  .filter(Boolean)
                  .map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-sky-100 text-sky-700 
                                 dark:bg-sky-900/40 dark:text-sky-300 border border-sky-300/20"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            )}
          </motion.div>
        ))}

        {experiences.length === 0 && (
          <p className="text-center text-slate-500 dark:text-slate-400">
            {lang === "tr" ? "Henüz deneyim eklenmedi." : "No experiences added yet."}
          </p>
        )}
      </div>
    </section>
  );
}
