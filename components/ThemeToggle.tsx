"use client";

import { usePathname } from "next/navigation";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const pathname = usePathname() ?? "/";
  const isDark = pathname === "/dark" || pathname.startsWith("/dark/");

  const linkClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900";

  if (isDark) {
    return (
      <a
        href="/"
        className={linkClass}
        aria-label="Switch to light mode"
      >
        <Sun size={20} weight="bold" />
      </a>
    );
  }

  return (
    <a
      href="/dark"
      className={linkClass}
      aria-label="Open site in dark mode (/dark)"
    >
      <Moon size={20} weight="bold" />
    </a>
  );
}
