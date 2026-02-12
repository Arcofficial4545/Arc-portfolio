"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import SectionWrapper from "./SectionWrapper";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/lib/constants";

const WORDS = ["Innovative", "Development", "Solutions"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

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

function WordFocusHeading() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusedIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="flex flex-wrap items-center gap-x-4 gap-y-2 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
      {WORDS.map((word, i) => (
        <motion.span
          key={word}
          animate={{
            filter: focusedIndex === i ? "blur(0px)" : "blur(4px)",
            opacity: focusedIndex === i ? 1 : 0.3,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ color: "var(--foreground)" }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Label */}
          <motion.div variants={fadeUp} className="mb-6">
            <p
              className="mb-3 text-sm font-medium tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Projects
            </p>
          </motion.div>

          {/* Word Focus Heading */}
          <motion.div variants={fadeUp} className="mb-16">
            <WordFocusHeading />
          </motion.div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
