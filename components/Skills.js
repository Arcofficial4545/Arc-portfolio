"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import SectionWrapper from "./SectionWrapper";
import { TubesBackground } from "@/components/ui/neon-flow";
import IconCloud from "./IconCloud";
import AnimatedHeadline from "./AnimatedHeadline";
import { SKILLS } from "@/lib/constants";

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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ICON_SLUGS = [
  "javascript",
  "react",
  "redux",
  "nodedotjs",
  "cplusplus",
  "html5",
  "css3",
  "tailwindcss",
  "bootstrap",
  "git",
  "github",
  "vercel",
  "axios",
  "nextdotjs",
  "visualstudiocode",
  "figma",
];

export default function Skills() {
  const slugs = useMemo(() => ICON_SLUGS, []);

  return (
    <SectionWrapper id="skills" className="relative overflow-hidden">
      {/* Neon Flow Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.4 }}>
        <TubesBackground className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Heading */}
          <AnimatedHeadline
            label="SKILLS"
            title="Tools & expertise"
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Icon Cloud */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg">
                <IconCloud iconSlugs={slugs} />
              </div>
            </motion.div>

            {/* Right — Skill Categories */}
            <div className="flex flex-col gap-8">
              {Object.entries(SKILLS).map(([category, skills]) => (
                <motion.div key={category} variants={fadeUp}>
                  <h4
                    className="mb-4 text-sm font-semibold tracking-wide uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="glass glass-hover cursor-default rounded-full px-4 py-2 text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                        whileHover={{ y: -2, scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
