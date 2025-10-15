"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "tr" | "en";

type LanguageContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
};

const translations = {
    tr: {
        greeting: "Merhaba 👋",
        developerDesc:
            "Full Stack Developer — Next.js & React ile modern, performanslı ve kullanıcı odaklı web deneyimleri tasarlıyorum.",
        experienceBtn: "Deneyimlerime Göz At",
        detailsBtn: "Detaylı Deneyimleri Gör",
        timelineTitle: "Deneyim Çizelgesi",
        timelineDesc: "İş geçmişim ve profesyonel deneyimlerim.",
        contactTitle: "Bana Ulaşın",
        contactDesc: "Sorularınız veya iş birlikleri için mesaj bırakın.",
        email: "E-posta",
        github: "GitHub",
        linkedin: "LinkedIn",
        name: "Ad Soyad",
        message: "Mesajınız",
        send: "Gönder",
        sent: "Gönderildi ✅",

        // ✅ Hakkımda
        aboutTitle: "Hakkımda",
        aboutDesc:
            "Analitik düşünebilen, takım çalışmasına yatkın, araştırmayı seven ve güncel teknolojileri takip eden bir yazılım geliştiricisiyim. Sürekli öğrenmeye ve kendimi geliştirmeye büyük önem veririm.",

        // ✅ Bilgi Kartları
        education: "Eğitim",
        educationDesc: "Bilgisayar Mühendisliği (2015 - 2019) • 3.05 / 4.00 – Bölüm Beşincisi",
        languages: "Diller",
        english: "İngilizce — Profesyonel Çalışma Yetkinliği",
        personalInfo: "Özel Bilgiler",
        military: "Askerlik Durumu: Yapıldı",
        license: "Ehliyet: B Sınıfı",
        social: "Sosyal Medya",
        interests: "İlgi Alanları",
        interestList: "🏎️ Formula 1, 🏛️ Mitoloji, ⚽ Futbol, 🌍 Yeni Yerler Keşfetmek",
        references: "Referanslar",

        // Referanslar (istenirse ayrı anahtarlar)
        ref1: "Halil İbrahim USLU — AlbarakaTech Global – Software Engineer",
        ref2: "Necati Çağrı KOCA — SABİS Bilgi Teknolojileri – Genel Müdür",

        // Timeline Detayları
        timelineDetailedTitle: "Deneyim Detayları",
        timelineDetailedDesc: "Kariyerim boyunca çalıştığım pozisyonlar ve yürüttüğüm projeler.",

        // Şirketler ve pozisyonlar
        company1Title: "Yazılım Geliştirme Uzmanı",
        company1Name: "AlbarakaTech Global",
        company1Period: "2023 - Günümüz",
        company1Projects:
            "Kredi Çözümleri: Bireysel ve kurumsal kredi sistemlerinin geliştirilmesi.",
        company1Tech: "Kullanılan Teknolojiler: C#, .NET Core, MSSQL, Azure, GIT, TFS.",

        company2Title: "Yazılım Geliştirme Uzmanı",
        company2Name: "Eren Holding",
        company2Period: "2023",
        company2Projects:
            "Alokasyon ve Lojistik Sistemleri: Üretimden mağazaya kadar olan süreçlerin dijital yönetimi için sistemler geliştirilmesi.",
        company2Tech: "Kullanılan Teknolojiler: .NET Core, MSSQL, Vue.js, TypeScript, Azure.",

        company3Title: "Yazılım Mühendisi",
        company3Name: "SABİS Bilgi Teknolojileri",
        company3Period: "2021 - 2023",
        company3Projects:
            "Aile Hekim Bilgi Sistemi: Muayene, laboratuvar, raporlama ve veri alışverişi için uygulama geliştirilmesi.",
        company3Tech: "Kullanılan Teknolojiler: C#, ASP.NET, MSSQL, JavaScript, Git.",

        company4Title: "Proje Mühendisi",
        company4Name: "Deniz Harp Merkezi Komutanlığı",
        company4Period: "2020 - 2021",
        company4Projects:
            "COVID-19 Takip Yazılımı ve Karantina Yönetim Sistemi geliştirilmesi.",
        company4Tech: "Kullanılan Teknolojiler: C#, ASP.NET, MVC, MSSQL.",

        // Experience sayfası
        experiencePageTitle: "Deneyimler",
        experiencePageDesc: "Profesyonel kariyer geçmişimi ve yürüttüğüm projeleri keşfedin.",
        // 📅 Timeline Yılları
        yearNow: "2023 - Günümüz",
        year2023: "2023",
        year2021_2023: "2021 - 2023",
        year2020_2021: "2020 - 2021",

        // 🏢 Şirket İsimleri
        companyAlbaraka: "AlbarakaTech Global",
        companyEren: "Eren Holding",
        companySabis: "SABİS Bilgi Teknolojileri",
        companyNavy: "Deniz Harp Merkezi Komutanlığı",


    },

    en: {
        greeting: "Hello 👋",
        developerDesc:
            "Full Stack Developer — I design modern, high-performance and user-focused web experiences using Next.js & React.",
        experienceBtn: "View My Experiences",
        detailsBtn: "See Detailed Experiences",
        timelineTitle: "Experience Timeline",
        timelineDesc: "My work history and professional experiences.",
        contactTitle: "Contact Me",
        contactDesc: "Leave a message for questions or collaborations.",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        name: "Full Name",
        message: "Your Message",
        send: "Send",
        sent: "Sent ✅",

        // ✅ About
        aboutTitle: "About Me",
        aboutDesc:
            "I am a software developer with analytical thinking skills, who enjoys teamwork, research, and keeping up with modern technologies. I highly value continuous learning and self-improvement.",

        // ✅ Cards
        education: "Education",
        educationDesc: "Computer Engineering (2015 - 2019) • GPA 3.05 / 4.00 – Top 5 in Department",
        languages: "Languages",
        english: "English — Professional Proficiency",
        personalInfo: "Personal Info",
        military: "Military Service: Completed",
        license: "Driver’s License: Class B",
        social: "Social Media",
        interests: "Interests",
        interestList: "🏎️ Formula 1, 🏛️ Mythology, ⚽ Football, 🌍 Exploring New Places",
        references: "References",
        ref1: "Halil İbrahim USLU — AlbarakaTech Global – Software Engineer",
        ref2: "Necati Çağrı KOCA — SABİS Information Technologies – General Manager",
        timelineDetailedTitle: "Experience Details",
        timelineDetailedDesc: "Positions and projects I have worked on during my career.",

        company1Title: "Software Development Specialist",
        company1Name: "AlbarakaTech Global",
        company1Period: "2023 - Present",
        company1Projects:
            "Credit Solutions: Development of individual and corporate credit systems.",
        company1Tech: "Technologies: C#, .NET Core, MSSQL, Azure, GIT, TFS.",

        company2Title: "Software Development Specialist",
        company2Name: "Eren Holding",
        company2Period: "2023",
        company2Projects:
            "Allocation and Logistics Systems: Development of systems for managing operations from production to retail.",
        company2Tech: "Technologies: .NET Core, MSSQL, Vue.js, TypeScript, Azure.",

        company3Title: "Software Engineer",
        company3Name: "SABIS Information Technologies",
        company3Period: "2021 - 2023",
        company3Projects:
            "Family Physician Information System: Application for examinations, labs, reports, and data exchange with the Ministry of Health.",
        company3Tech: "Technologies: C#, ASP.NET, MSSQL, JavaScript, Git.",

        company4Title: "Project Engineer",
        company4Name: "Naval Warfare Center Command",
        company4Period: "2020 - 2021",
        company4Projects:
            "COVID-19 Tracking Software and Quarantine Management System development.",
        company4Tech: "Technologies: C#, ASP.NET, MVC, MSSQL.",

        experiencePageTitle: "Experiences",
        experiencePageDesc: "Explore my professional career and projects I’ve contributed to.",
        // 📅 Timeline Years
        yearNow: "2023 - Present",
        year2023: "2023",
        year2021_2023: "2021 - 2023",
        year2020_2021: "2020 - 2021",

        // 🏢 Companies
        companyAlbaraka: "AlbarakaTech Global",
        companyEren: "Eren Holding",
        companySabis: "SABIS Information Technologies",
        companyNavy: "Turkish Naval Warfare Center Command",
    },
};

const LanguageContext = createContext<LanguageContextType>({
    lang: "tr",
    setLang: () => { },
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>("tr");

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") as Lang | null;
        if (savedLang === "tr" || savedLang === "en") setLang(savedLang);
    }, []);

    const handleLangChange = (newLang: Lang) => {
        setLang(newLang);
        localStorage.setItem("lang", newLang);
    };

    const t = (key: string): string => {
        const dict = translations[lang] as Record<string, string>;
        return dict[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang: handleLangChange, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
