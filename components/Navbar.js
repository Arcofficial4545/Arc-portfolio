"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Navbar() {
  const { scrolled } = useScrollProgress(50);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        animate={{
          padding: scrolled ? "0.6rem 1.5rem" : "1rem 1.5rem",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          backgroundColor: "transparent",
          borderBottom: "none",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="relative z-10 flex items-center"
        >
          <img
            src="/images/LOGO.png"
            alt="ARC Logo"
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* Center Nav — Desktop */}
        <div className="hidden md:flex">
          <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300"
                  style={{
                    color: isActive ? "var(--foreground)" : "var(--muted)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: "var(--surface-strong)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side — Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--background)",
            }}
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            className="glass relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1.5px] w-4 rounded-full"
              style={{ backgroundColor: "var(--foreground)" }}
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 3 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[1.5px] w-4 rounded-full"
              style={{ backgroundColor: "var(--foreground)" }}
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -3 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{
              backgroundColor: "var(--background)",
              backdropFilter: "blur(24px)",
            }}
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="text-2xl font-medium transition-colors duration-300"
                    style={{
                      color: isActive ? "var(--foreground)" : "var(--muted)",
                    }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="glass glass-hover mt-4 rounded-full px-8 py-3 text-lg font-medium"
                style={{ color: "var(--foreground)" }}
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
