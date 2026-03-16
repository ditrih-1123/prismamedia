"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Syncs the "dark" class on documentElement when pathname changes (client-side nav).
 * Ensures /dark shows dark theme and any other path shows light.
 */
export function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isDark = pathname === "/dark" || (pathname?.startsWith("/dark/") ?? false);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [pathname]);

  return null;
}
