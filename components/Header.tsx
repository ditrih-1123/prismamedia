'use client';

import { useState, useRef, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";

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
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className="relative border-b border-zinc-200 bg-white" ref={menuRef}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="font-sans text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          Prisma<span className="font-normal">Media</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 md:flex"
        >
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="hover:text-zinc-900">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-800 hover:bg-zinc-100 md:inline-flex lg:px-4"
          >
            Subscribe
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 md:hidden"
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
        className={`absolute left-0 right-0 top-full z-50 border-b border-zinc-200 bg-white shadow-lg md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6" aria-label="Mobile navigation links">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            onClick={closeMenu}
            className="mt-4 flex w-full justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-zinc-800"
          >
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  );
}
