import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeSync } from "@/components/ThemeSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrismaMedia — News and analysis from Central and Eastern Europe",
  description:
    "PrismaMedia covers politics, elections, and policy in Czech Republic, Slovakia, Hungary, Moldova, Georgia, and Armenia. Breaking news, opinion polls, and in-depth reporting.",
};

const themeScript = `
(function() {
  var path = document.location.pathname;
  if (path === '/dark' || path.indexOf('/dark/') === 0) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
