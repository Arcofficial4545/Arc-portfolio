"use client";

import { motion } from "motion/react";
import { ROLES, HERO_CHIPS } from "@/lib/constants";
import Typewriter from "./Typewriter";
import { TubesBackground } from "@/components/ui/neon-flow";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 sm:px-6 md:px-8"
    >
      {/* Neon Flow Background */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.4 }}>
        <TubesBackground className="h-full w-full" enableClickInteraction={true} />
      </div>

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 pt-20 pb-8 sm:gap-10 sm:pt-24 sm:pb-12 lg:grid-cols-2 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column — Content */}
        <div className="flex flex-col gap-5 sm:gap-7">
          <motion.div variants={itemVariants}>
            <h1
              className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
              style={{ color: "var(--foreground)" }}
            >
              Abdul
              <br />
              <span className="pl-10 md:pl-14">Rehman Ch</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="text-lg font-medium sm:text-xl md:text-2xl">
            <Typewriter words={ROLES} speed={80} delayBetweenWords={2000} cursor={true} cursorChar="|" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-base leading-relaxed md:text-lg"
            style={{ color: "var(--muted)" }}
          >
            Software Engineer with 2+ years of hands-on experience building
            production-grade web applications. I craft scalable, maintainable
            solutions using modern JavaScript and React — from clean component
            architectures to full-stack delivery.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3"
          >
            {HERO_CHIPS.map((chip) => (
              <span
                key={chip}
                className="glass rounded-full px-4 py-1.5 text-xs font-medium md:text-sm"
                style={{ color: "var(--foreground)" }}
              >
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 pt-2"
          >
            <a
              href="#projects"
              className="glass glass-hover rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300"
              style={{ color: "var(--foreground)" }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
              }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right Column — Portrait */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center lg:-ml-8 lg:justify-center"
        >
          <div className="relative -mt-8 w-80 sm:-mt-12 sm:w-104 md:-mt-16 md:w-xl">
            <img
              src="/images/profile.png"
              alt="Abdul Rehman — ARC"
              className="h-auto w-full object-contain drop-shadow-2xl"
            />
            {/* Bottom fade into background */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
              style={{
                background: "linear-gradient(to top, var(--background), transparent)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
