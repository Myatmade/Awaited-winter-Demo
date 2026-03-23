import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Macondo, Oxanium } from "next/font/google";

const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-macondo",
});

const oxanium = Oxanium({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata = {
  title: "The Awaited Winter",
  description: "Interactive story project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${macondo.variable} ${oxanium.variable}`}>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
