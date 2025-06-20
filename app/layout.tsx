import type { Metadata } from "next";
import { Epilogue, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/context/ThemeContext";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
