import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "Erkan Sevdi | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* 🌟 Font Awesome CDN */}
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
  integrity="sha512-KNuLwZsDbPG0A0u+3QnRz6m5sL+lM1k+8Uq0XyZt7Pfx+rJ9yVUz88B1YQhDshVyx3Czq1vU1jOTjKjKMoVxBA=="
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
/>

      </head>

      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
