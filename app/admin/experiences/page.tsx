"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Experience = {
  id: string;
  company: string;
  position: string;
  year_start: string;
  year_end: string;
  tech_stack: string;
  visible: boolean;
  sort_order: number;
  translations: {
    tr?: {
      description?: string;
      position?: string;
    };
    en?: {
      description?: string;
      position?: string;
    };
  };
};

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"tr" | "en">("tr");

  const [newExp, setNewExp] = useState({
    company: "",
    year_start: "",
    year_end: "",
    tech_stack: "",
    tr_description: "",
    en_description: "",
  });

  // Deneyimleri çek
  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data) setExperiences(data);
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  // Yeni deneyim ekle
  const handleAdd = async () => {
    if (!newExp.company.trim()) return alert("Şirket adı boş olamaz!");

    const { data, error } = await supabase
      .from("experiences")
      .insert([
        {
          company: newExp.company,
          year_start: newExp.year_start,
          year_end: newExp.year_end,
          tech_stack: newExp.tech_stack,
          visible: true,
          sort_order: experiences.length + 1,
          translations: {
            tr: {
              position: "",
              description: newExp.tr_description,
            },
            en: {
              position: "",
              description: newExp.en_description,
            },
          },
        },
      ])
      .select();

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("✅ Yeni deneyim eklendi!");
      setExperiences([...experiences, data[0]]);
      setNewExp({
        company: "",
        year_start: "",
        year_end: "",
        tech_stack: "",
        tr_description: "",
        en_description: "",
      });
    }
  };

  // Görünürlük değiştir
  const toggleVisibility = async (exp: Experience) => {
    const { error } = await supabase
      .from("experiences")
      .update({ visible: !exp.visible })
      .eq("id", exp.id);
    if (!error)
      setExperiences(
        experiences.map((e) =>
          e.id === exp.id ? { ...e, visible: !exp.visible } : e
        )
      );
  };

  // Çeviri düzenle
  const handleTranslationChange = (
    expId: string,
    field: "description" | "position",
    value: string
  ) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              translations: {
                ...exp.translations,
                [lang]: {
                  ...exp.translations?.[lang],
                  [field]: value,
                },
              },
            }
          : exp
      )
    );
  };

  // Kaydet
  const handleSave = async (exp: Experience) => {
    setSaving(true);
    const { error } = await supabase
      .from("experiences")
      .update({ translations: exp.translations })
      .eq("id", exp.id);
    setSaving(false);
    if (error) alert("❌ " + error.message);
    else alert("✅ Güncellendi!");
  };

  if (loading) return <p className="text-center py-10">Yükleniyor...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">💼 Deneyim Yönetimi (TR/EN)</h1>

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

      {/* Yeni deneyim ekleme */}
      <div className="p-6 mb-10 border border-slate-300 dark:border-slate-700 rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Yeni Deneyim Ekle</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
          <input
            type="text"
            placeholder="Şirket Adı"
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="Başlangıç Yılı"
            value={newExp.year_start}
            onChange={(e) => setNewExp({ ...newExp, year_start: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="Bitiş Yılı"
            value={newExp.year_end}
            onChange={(e) => setNewExp({ ...newExp, year_end: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="Teknolojiler (virgülle ayır)"
            value={newExp.tech_stack}
            onChange={(e) => setNewExp({ ...newExp, tech_stack: e.target.value })}
            className="input"
          />
        </div>

        <textarea
          placeholder="Açıklama (TR)"
          value={newExp.tr_description}
          onChange={(e) =>
            setNewExp({ ...newExp, tr_description: e.target.value })
          }
          rows={3}
          className="w-full p-3 mb-2 border rounded-lg bg-transparent border-slate-300 dark:border-slate-700"
        />
        <textarea
          placeholder="Açıklama (EN)"
          value={newExp.en_description}
          onChange={(e) =>
            setNewExp({ ...newExp, en_description: e.target.value })
          }
          rows={3}
          className="w-full p-3 border rounded-lg bg-transparent border-slate-300 dark:border-slate-700"
        />

        <button onClick={handleAdd} className="btn-gradient mt-4">
          Ekle
        </button>
      </div>

      {/* Deneyim listesi */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white/70 dark:bg-slate-800/40"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{exp.company}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {exp.year_start} - {exp.year_end}
                </p>
              </div>
              <button
                onClick={() => toggleVisibility(exp)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  exp.visible
                    ? "bg-green-500/20 text-green-600"
                    : "bg-red-500/20 text-red-600"
                }`}
              >
                {exp.visible ? "Görünüyor" : "Gizli"}
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-1">
                Açıklama ({lang.toUpperCase()})
              </label>
              <textarea
                value={exp.translations?.[lang]?.description || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    exp.id,
                    "description",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full p-2 border rounded-lg bg-transparent border-slate-300 dark:border-slate-700"
              />
            </div>

            <button
              onClick={() => handleSave(exp)}
              disabled={saving}
              className="btn-gradient mt-3"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
