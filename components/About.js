"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import SectionWrapper from "./SectionWrapper";
import RetroGrid from "./RetroGrid";
import AnimatedHeadline from "./AnimatedHeadline";
import { CAREER_TIMELINE } from "@/lib/constants";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const TimelineIcon = ({ type }) => {
  const icons = {
    rocket: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    briefcase: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
        <path d="M12 12h.01" />
      </svg>
    ),
    globe: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    code: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  };
  return icons[type] || icons.code;
};

export default function About() {
  const [accentColor, setAccentColor] = useState("#3b82f6");

  useEffect(() => {
    const root = document.documentElement;
    const updateColor = () => {
      const color = getComputedStyle(root).getPropertyValue("--accent").trim();
      if (color.startsWith("#")) setAccentColor(color);
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
      {/* Retro Grid Background — very low opacity + blur */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.15, filter: "blur(3px)" }}>
        <RetroGrid
          gridColor={accentColor}
          showScanlines={false}
          glowEffect={true}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Section Heading */}
          <AnimatedHeadline
            label="ABOUT"
            title="Turning problems into production-ready solution"
          />

          {/* Two-column layout: About text left, Career right */}
          <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Left — About Me */}
            <motion.div variants={slideIn} className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <p
                  className="text-sm leading-[1.8] sm:text-base md:text-lg"
                  style={{ color: "var(--muted)" }}
                >
                  I&apos;m a passionate Software Engineer and Bachelor of Computer Science student
                  with over 2 years of hands-on experience in web development. I specialize in
                  building scalable, production-ready web applications with clean architecture
                  and intuitive user interfaces.
                </p>
                <p
                  className="text-sm leading-[1.8] sm:text-base md:text-lg"
                  style={{ color: "var(--muted)" }}
                >
                  I began my professional journey at DuoLabz, where I developed strong foundations
                  in JavaScript and modern web technologies. I currently work remotely at iClosed.io,
                  contributing to a large-scale production codebase, collaborating with senior
                  engineers, and delivering features used in real-world environments.
                </p>
                <p
                  className="text-sm leading-[1.8] sm:text-base md:text-lg"
                  style={{ color: "var(--muted)" }}
                >
                  Alongside my full-time role, I build full-stack applications and take on freelance
                  projects, managing everything from frontend development to backend integration and
                  deployment. I&apos;m driven by continuous learning, problem-solving, and writing
                  maintainable, high-quality code.
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["JavaScript","React.js", "Redux", "RTK Query", "React-Query", "Tailwind CSS", "Node.js", "C++", "Git", "Vercel", "Axios","Redux Saga"].map((tech) => (
                  <span
                    key={tech}
                    className="glass rounded-full px-3 py-1 text-xs font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Career Snapshot */}
            <motion.div variants={fadeUp}>
              <h3
                className="mb-6 text-lg font-semibold sm:mb-8 sm:text-xl md:text-2xl"
                style={{ color: "var(--foreground)" }}
              >
                Career Snapshot
              </h3>

              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ backgroundColor: "var(--surface-border)" }}
                />

                <div className="flex flex-col gap-8">
                  {CAREER_TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.role}
                      className="relative pl-12"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                          backgroundColor:
                            item.period === "Current"
                              ? "var(--accent)"
                              : "var(--surface)",
                          border: "1px solid var(--surface-border)",
                          color:
                            item.period === "Current"
                              ? "var(--background)"
                              : "var(--accent)",
                          boxShadow:
                            item.period === "Current"
                              ? "0 0 16px var(--glow)"
                              : "none",
                        }}
                      >
                        <TimelineIcon type={item.icon} />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                            style={{
                              backgroundColor:
                                item.period === "Current"
                                  ? "var(--accent)"
                                  : "var(--surface)",
                              color:
                                item.period === "Current"
                                  ? "var(--background)"
                                  : "var(--accent)",
                            }}
                          >
                            {item.period}
                          </span>
                        </div>
                        <h4
                          className="text-base font-semibold md:text-lg"
                          style={{ color: "var(--foreground)" }}
                        >
                          {item.role}
                        </h4>
                        <p
                          className="mt-0.5 text-xs font-medium"
                          style={{ color: "var(--accent)" }}
                        >
                          {item.company}
                        </p>
                        <p
                          className="mt-2 text-sm leading-relaxed"
                          style={{ color: "var(--muted)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
