"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "demo" },
    { href: "/examples", label: "examples" },
    { href: "/install", label: "install" },
    { href: "https://github.com/bryantleft/tw-border", label: "github", external: true },
  ];

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          >
            <Logo size={24} />
            <span>tw-border</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="py-4">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

