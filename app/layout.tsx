import type { Metadata } from "next";
import { Epilogue, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/context/ThemeContext";
import { AuthProvider } from "./lib/context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Leziz - Lezzetli Tarifleri Keşfet",
  description: "Dünyanın en iyi tariflerini bulun ve paylaşın",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${epilogue.variable} ${notoSans.variable} antialiased`}
        style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{fontFamily: 'Epilogue, "Noto Sans", sans-serif', backgroundColor: 'var(--background)'}}>
              <Header />
              <main className="flex h-full grow flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
