"use client";

import { useState } from "react";
import { motion } from "motion/react";

const MAX_VISIBLE_TAGS = 4;

export default function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const visibleTags = project.tags?.slice(0, MAX_VISIBLE_TAGS) || [];
  const remainingCount = (project.tags?.length || 0) - MAX_VISIBLE_TAGS;

  return (
    <motion.div
      className="glass group flex h-full flex-col overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
    >
      {/* Screenshot Preview */}
      <div
        className="relative h-40 w-full overflow-hidden sm:h-48 md:h-56"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {!imgError ? (
          <iframe
            src={project.demo}
            title={project.title}
            className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ color: "var(--muted)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          </div>
        )}
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        {/* Title */}
        <h3
          className="mb-2 text-base font-bold sm:text-lg md:text-xl"
          style={{ color: "var(--foreground)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="mb-4 line-clamp-3 text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="glass rounded-full px-3 py-1 text-xs font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {tag}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="glass rounded-full px-3 py-1 text-xs font-medium"
              style={{ color: "var(--muted)" }}
            >
              +{remainingCount} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-opacity hover:opacity-90 sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Demo
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
              style={{ color: "var(--foreground)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
              style={{ color: "var(--foreground)" }}
            >
              Details
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
