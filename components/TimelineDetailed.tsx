"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function TimelineDetailed() {
  const { t } = useLanguage();

  const experiences = [
    {
      title: t("company1Title"),
      company: t("company1Name"),
      period: t("company1Period"),
      project: t("company1Projects"),
      tech: t("company1Tech"),
    },
    {
      title: t("company2Title"),
      company: t("company2Name"),
      period: t("company2Period"),
      project: t("company2Projects"),
      tech: t("company2Tech"),
    },
    {
      title: t("company3Title"),
      company: t("company3Name"),
      period: t("company3Period"),
      project: t("company3Projects"),
      tech: t("company3Tech"),
    },
    {
      title: t("company4Title"),
      company: t("company4Name"),
      period: t("company4Period"),
      project: t("company4Projects"),
      tech: t("company4Tech"),
    },
  ];

  return (
    <div className="relative border-2 border-sky-300/60 dark:border-white/10 rounded-3xl p-10 
      backdrop-blur-md bg-white/85 dark:bg-slate-900/40 shadow-glow transition-all duration-500">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold">{t("timelineDetailedTitle")}</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{t("timelineDetailedDesc")}</p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-sky-200 dark:border-white/10 rounded-2xl p-6 bg-white/70 dark:bg-slate-900/30"
          >
            <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400">
              {exp.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {exp.company} • {exp.period}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{exp.project}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{exp.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
