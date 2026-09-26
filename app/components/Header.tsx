"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#fruits", label: "精選品種" },
  { href: "/#why", label: "我們的堅持" },
  { href: "/blog", label: "芒果誌" },
  { href: "/#contact", label: "聯絡我們" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-ink font-serif text-base text-paper">
            芒
          </span>
          <span className="font-serif text-lg font-medium tracking-tight text-ink">
            台灣芒果
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-xs font-medium tracking-[0.15em] text-ink-soft md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="uppercase transition-colors hover:text-rust"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden border border-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-paper md:inline-block"
          >
            立即訂購
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="開啟選單"
            className="flex h-9 w-9 items-center justify-center border border-line text-ink md:hidden"
          >
            <span className="text-base leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-line px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium tracking-wide text-ink-soft transition-colors hover:text-rust"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 border border-ink px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-ink"
          >
            立即訂購
          </Link>
        </div>
      )}
    </header>
  );
}
