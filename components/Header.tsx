'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CURRENCIES, fetchRates } from "@/lib/currencies";

const navLinks = [
  { label: "Czech", href: "#czech-republic" },
  { label: "Slovakia", href: "#slovakia" },
  { label: "Hungary", href: "#hungary" },
  { label: "Moldova", href: "#moldova" },
  { label: "Georgia", href: "#georgia" },
  { label: "Armenia", href: "#armenia" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [ratesError, setRatesError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchRates()
      .then((r) => {
        if (!cancelled) setRates(r);
      })
      .catch(() => {
        if (!cancelled) setRatesError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative border-b border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900" ref={menuRef}>
      {/* Currency rates: 1 USD per national currency */}
      <div
        className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/80"
        aria-label="Exchange rates per 1 USD"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-center text-xs text-zinc-600 dark:text-zinc-400 sm:justify-start sm:gap-x-5 sm:py-2.5 sm:px-6 lg:px-8">
          <span className="font-medium text-zinc-500 dark:text-zinc-500">1 USD</span>
          {ratesError && (
            <span className="text-amber-600 dark:text-amber-500">Rates unavailable</span>
          )}
          {!ratesError && !rates && (
            <span className="animate-pulse">Loading rates…</span>
          )}
          {!ratesError && rates && (
            <>
              {CURRENCIES.map(({ code, symbol }) => {
                const rate = rates[code];
                if (rate == null) return null;
                const value = code === "AMD" || code === "HUF" ? Math.round(rate) : rate.toFixed(2);
                return (
                  <span key={code} className="whitespace-nowrap">
                    {symbol} {value}
                  </span>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-sans text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
          Prisma<span className="font-normal">Media</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-300 md:flex"
        >
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#"
            className="hidden rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800 md:inline-flex lg:px-4"
          >
            Subscribe
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        className={`absolute left-0 right-0 top-full z-50 border-b border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900 md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6" aria-label="Mobile navigation links">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-900"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            onClick={closeMenu}
            className="mt-4 flex w-full justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  );
}
