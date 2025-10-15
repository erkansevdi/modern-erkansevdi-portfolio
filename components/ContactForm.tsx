"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ " + (await res.text()));
      }
    } catch (error) {
      console.error("Mail gönderim hatası:", error);
      alert("❌ Mail gönderimi başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative border border-sky-300/40 dark:border-white/10 rounded-3xl p-10 shadow-glow bg-white/10 dark:bg-slate-900/40">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold">{t("contactTitle")}</h3>
        <p className="mt-2 text-slate-400">{t("contactDesc")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder={t("name")}
            value={formData.name}
            onChange={handleChange}
            className="flex-1 px-4 py-3 rounded-lg border border-sky-400/50 dark:border-slate-700 bg-transparent 
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            className="flex-1 px-4 py-3 rounded-lg border border-sky-400/50 dark:border-slate-700 bg-transparent 
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
        </div>

        <textarea
          name="message"
          placeholder={t("message")}
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="px-4 py-3 rounded-lg border border-sky-400/50 dark:border-slate-700 bg-transparent 
                     focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`btn-gradient mt-4 self-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading
            ? (t("send") + "...")
            : isSent
            ? t("sent")
            : t("send")}
        </button>
      </form>
    </div>
  );
}
