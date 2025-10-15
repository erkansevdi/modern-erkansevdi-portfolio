"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { motion } from "framer-motion";

type About = {
    id: string;
    description: string;
    education: string;
    languages: string;
    special_info: string;
    interests: string;
    reference_text: string;
    translations: any;
};

export default function AboutSection() {
    const { lang } = useLanguage();
    const [about, setAbout] = useState<About | null>(null);
    const [social, setSocial] = useState<Record<string, string>>({});

    useEffect(() => {
        const fetchAbout = async () => {
            const { data, error } = await supabase.from("about").select("*").single();

            if (error) {
                console.error("❌ Supabase Error:", error);
                return;
            }

            if (data) {
                setAbout(data);

                const translation = data.translations?.[lang];
                if (translation?.social) {
                    // ✅ JSONB içinden social verilerini doğrudan state’e atıyoruz
                    setSocial({
                        x: translation.social.x || "",
                        github: translation.social.github || "",
                        linkedin: translation.social.linkedin || "",
                        instagram: translation.social.instagram || "",
                    });
                }
            }
        };

        fetchAbout();
    }, [lang]);

    if (!about) {
        return (
            <div className="text-center py-10 text-slate-400">
                {lang === "tr" ? "Yükleniyor..." : "Loading..."}
            </div>
        );
    }

    const dict = about.translations?.[lang] || {};

    return (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold">
                    {lang === "tr" ? "Hakkımda" : "About Me"}
                </h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    {dict.description || about.description}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Eğitim */}
                <div className="border border-sky-300 dark:border-white/10 rounded-2xl p-6 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-2 text-sky-600 dark:text-sky-400">
                        {lang === "tr" ? "Eğitim" : "Education"}
                    </h3>
                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: (dict.education || about.education)
                                .replace(/\t/g, "&emsp;"), // sekme karakterlerini HTML boşluğuna çevir
                        }}
                    />
                </div>

                {/* Diller */}
                <div className="border border-sky-300 dark:border-white/10 rounded-2xl p-6 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-2 text-sky-600 dark:text-sky-400">
                        {lang === "tr" ? "Diller" : "Languages"}
                    </h3>
                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: (dict.languages || about.languages)
                                .replace(/\t/g, "&emsp;"),
                        }}
                    />
                </div>

                <div className="border border-sky-300 dark:border-white/10 rounded-2xl p-6 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-2 text-sky-600 dark:text-sky-400">
                        {lang === "tr" ? "Özel Bilgiler" : "Personal Info"}
                    </h3>
                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: (dict.special_info || about.special_info)
                                .replace(/\t/g, "&emsp;"),
                        }}
                    />
                </div>

                {/* İlgi Alanları */}
                <div className="border border-sky-300 dark:border-white/10 rounded-2xl p-6 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-2 text-sky-600 dark:text-sky-400">
                        {lang === "tr" ? "İlgi Alanları" : "Interests"}
                    </h3>
                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: (dict.interests || about.interests)
                                .replace(/\t/g, "&emsp;"), // \t karakterlerini HTML boşluğuna çevir
                        }}
                    />
                </div>


                {/* Referanslar */}
                <div className="border border-sky-300 dark:border-white/10 rounded-2xl p-6 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-2 text-sky-600 dark:text-sky-400">
                        {lang === "tr" ? "Referanslar" : "References"}
                    </h3>
                    <p
                        className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: (dict.references || about.reference_text)
                                .replace(/\t/g, "&emsp;"), // \t karakterlerini HTML boşluğuna çevir
                        }}
                    />
                </div>

                {/* 🌐 Sosyal Medya */}
                <div className="border border-sky-300 dark:border-white/10 rounded-2xl p-6 
                bg-white/80 dark:bg-slate-900/40 backdrop-blur-md">
                    <h3 className="text-lg font-semibold mb-4 text-sky-600 dark:text-sky-400">
                        {lang === "tr" ? "Sosyal Medya" : "Social Media"}
                    </h3>

                    {Object.keys(social).length === 0 ? (
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {lang === "tr" ? "Henüz eklenmedi." : "Not available yet."}
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {[
                                { key: "x", icon: "/icons/x.svg", label: "X (Twitter)" },
                                { key: "github", icon: "/icons/github.svg", label: "GitHub" },
                                { key: "linkedin", icon: "/icons/linkedin.svg", label: "LinkedIn" },
                                { key: "instagram", icon: "/icons/instagram.svg", label: "Instagram" },
                            ]
                                .filter((item) => social[item.key])
                                .map((item, index) => (
                                    <motion.a
                                        key={item.key}
                                        href={social[item.key]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 
                       text-slate-800 dark:text-slate-100
                       hover:text-sky-500 dark:hover:text-sky-300
                       transition-colors duration-300"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.15 }}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={22}
                                            height={22}
                                            className="dark:brightness-150 transition duration-300"
                                        />
                                        <span>{item.label}</span>
                                    </motion.a>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
