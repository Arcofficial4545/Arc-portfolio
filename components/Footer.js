"use client";

import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-12 px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        {/* Nav Pills */}
        <nav className="flex flex-wrap items-center justify-center gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="glass glass-hover rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300"
              style={{ color: "var(--muted)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          &copy; {new Date().getFullYear()} Abdul Rehman (ARC).
        </p>
      </div>
    </footer>
  );
}
