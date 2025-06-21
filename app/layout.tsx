import type { Metadata } from "next";
import { Epilogue, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/context/ThemeContext";
import { AuthProvider } from "./lib/context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import DeveloperBar from "./components/DeveloperBar";
import { Toaster } from "sonner";

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
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${epilogue.variable} ${notoSans.variable} antialiased font-epilogue`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden bg-background">
              <Header />
              <Analytics />
              <SpeedInsights />
              <Toaster richColors position="top-right" />
              <main className="flex h-full grow flex-col">
                {children}
                
              </main>
              <Footer />
              <DeveloperBar />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
