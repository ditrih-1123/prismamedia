"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const base = pathname || "/";
  const darkHref = `${base}${base.includes("?") ? "&" : "?"}theme=dark`;
  const lightHref = base.split("?")[0] || "/";

  const linkClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900";

  if (dark) {
    return (
      <a
        href={lightHref}
        className={linkClass}
        aria-label="Switch to light mode (open without dark theme)"
      >
        <Sun size={20} weight="bold" />
      </a>
    );
  }

  return (
    <a
      href={darkHref}
      className={linkClass}
      aria-label="Open site in dark mode (shareable link)"
    >
      <Moon size={20} weight="bold" />
    </a>
  );
}
