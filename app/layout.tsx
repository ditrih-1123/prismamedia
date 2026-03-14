import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
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
  var key = 'theme';
  var q = document.location.search;
  if (q.indexOf('theme=dark') !== -1) {
    document.documentElement.classList.add('dark');
    try { localStorage.setItem(key, 'dark'); } catch (e) {}
  } else if (q.indexOf('theme=light') !== -1) {
    document.documentElement.classList.remove('dark');
    try { localStorage.setItem(key, 'light'); } catch (e) {}
  } else {
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
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
        {children}
      </body>
    </html>
  );
}
