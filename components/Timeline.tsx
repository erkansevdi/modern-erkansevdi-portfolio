"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Experience = {
  id: string;
  company: string;
  year_start: string;
  year_end: string | null;
  translations?: Record<string, Record<string, string>>;
};

export default function Timeline() {
  const { lang } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const getText = (exp: Experience, field: string): string => {
    return exp.translations?.[lang]?.[field] || exp[field as keyof Experience]?.toString() || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("id, company, year_start, year_end, translations")
        .eq("visible", true)
        .order("sort_order", { ascending: true });
      if (error) console.error("Supabase Timeline Error:", error);
      else setExperiences(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      {/* Timeline çizgisi */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-sky-500/30"></div>

      <div className="space-y-12">
        {experiences.map((exp, i) => {
          const formattedYear = exp.year_end
            ? `${exp.year_start} - ${exp.year_end}`
            : lang === "tr"
            ? `${exp.year_start} - Günümüz`
            : `${exp.year_start} - Present`;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col sm:flex-row items-center sm:justify-between gap-6"
            >
              <div className="sm:w-1/3 text-slate-500 dark:text-slate-400 text-sm">
                {formattedYear}
              </div>
              <div className="w-3 h-3 rounded-full bg-sky-400 shadow-md shadow-sky-500/40"></div>
              <div className="sm:w-1/3 text-center sm:text-left text-base font-semibold text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/40 px-4 py-3 rounded-xl">
                {getText(exp, "company")}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
