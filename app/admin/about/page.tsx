"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Translation = {
  description: string;
  education: string;
  languages: string;
  special_info: string;
  interests: string;
  references: string;
  social?: {
    x?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export default function AdminAboutPage() {
  const [about, setAbout] = useState<any>(null);
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase.from("about").select("*").single();
      if (!error && data) setAbout(data);
      setLoading(false);
    };
    fetchAbout();
  }, []);

  const handleChange = (field: keyof Translation, value: string) => {
    if (!about) return;
    const updated = {
      ...about,
      translations: {
        ...about.translations,
        [lang]: {
          ...about.translations[lang],
          [field]: value,
        },
      },
    };
    setAbout(updated);
  };

  const handleSocialChange = (platform: string, value: string) => {
    if (!about) return;
    const updated = {
      ...about,
      translations: {
        ...about.translations,
        [lang]: {
          ...about.translations[lang],
          social: {
            ...about.translations[lang]?.social,
            [platform]: value,
          },
        },
      },
    };
    setAbout(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("about")
      .update({ translations: about.translations })
      .eq("id", about.id);
    setSaving(false);
    if (error) alert("❌ " + error.message);
    else alert("✅ Kaydedildi!");
  };

  if (loading) return <p className="text-center py-10">Yükleniyor...</p>;
  const t = about?.translations?.[lang] || {};

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">🧠 Hakkımda (TR/EN)</h1>

      {/* Dil seçici */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setLang("tr")}
          className={`px-4 py-2 rounded-lg border ${
            lang === "tr"
              ? "bg-sky-500 text-white"
              : "bg-transparent border-slate-300 dark:border-slate-700"
          }`}
        >
          🇹🇷 Türkçe
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-2 rounded-lg border ${
            lang === "en"
              ? "bg-sky-500 text-white"
              : "bg-transparent border-slate-300 dark:border-slate-700"
          }`}
        >
          🇬🇧 English
        </button>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Açıklama</label>
          <textarea
            value={t.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Eğitim</label>
          <input
            type="text"
            value={t.education || ""}
            onChange={(e) => handleChange("education", e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Diller</label>
          <input
            type="text"
            value={t.languages || ""}
            onChange={(e) => handleChange("languages", e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Özel Bilgiler</label>
          <input
            type="text"
            value={t.special_info || ""}
            onChange={(e) => handleChange("special_info", e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">İlgi Alanları</label>
          <input
            type="text"
            value={t.interests || ""}
            onChange={(e) => handleChange("interests", e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Referanslar</label>
          <textarea
            value={t.references || ""}
            onChange={(e) => handleChange("references", e.target.value)}
            rows={3}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* 🌐 Sosyal Medya */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-sky-600 dark:text-sky-400">
            Sosyal Medya
          </h3>
          {["x", "github", "linkedin", "instagram"].map((platform) => (
            <div key={platform} className="mb-2">
              <label className="block text-sm mb-1 capitalize">{platform}</label>
              <input
                type="text"
                value={t.social?.[platform] || ""}
                onChange={(e) => handleSocialChange(platform, e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-transparent focus:ring-2 focus:ring-sky-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-gradient mt-4"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
}
