"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import SectionWrapper from "./SectionWrapper";
import AnimatedHeadline from "./AnimatedHeadline";
import { SOCIAL_LINKS } from "@/lib/constants";

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

function ContactCard({ icon, label, value, onClick, actionIcon, href }) {
  const Wrapper = href ? "a" : "button";
  const wrapperProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return (
    <Wrapper {...wrapperProps} className="block w-full text-left">
      <motion.div
        className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
        whileHover={{
          y: -2,
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Icon */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
          style={{ backgroundColor: "var(--surface)", color: "var(--accent)" }}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            {label}
          </p>
          <p
            className="mt-0.5 truncate text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            {value}
          </p>
        </div>

        {/* Action icon */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl opacity-50 transition-all duration-300 group-hover:opacity-100"
          style={{ backgroundColor: "var(--surface)", color: "var(--muted)" }}
        >
          {actionIcon}
        </div>
      </motion.div>
    </Wrapper>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copiedField, setCopiedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyIcon = (field) =>
    copiedField === field ? (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ) : (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    );

  const externalIcon = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Heading */}
          <AnimatedHeadline
            label="CONTACT"
            title="Let's connect, create, and solve."
          />

          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Contact Form — takes 3 cols */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2.5 block text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: "var(--muted)" }}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="from_name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className="glass w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-1"
                      style={{
                        color: "var(--foreground)",
                        "--tw-ring-color": "var(--accent)",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2.5 block text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: "var(--muted)" }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="reply_to"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="glass w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-1"
                      style={{
                        color: "var(--foreground)",
                        "--tw-ring-color": "var(--accent)",
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--muted)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="glass w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-1"
                    style={{
                      color: "var(--foreground)",
                      "--tw-ring-color": "var(--accent)",
                    }}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 sm:w-auto sm:px-10"
                  style={{
                    backgroundColor:
                      status === "sent"
                        ? "#22c55e"
                        : status === "error"
                          ? "#ef4444"
                          : status === "sending"
                            ? "var(--surface-strong)"
                            : "var(--accent)",
                    color:
                      status === "sending"
                        ? "var(--muted)"
                        : status === "sent" || status === "error"
                          ? "#fff"
                          : "var(--background)",
                  }}
                  whileHover={status === "idle" ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status === "idle" ? { scale: 0.97 } : {}}
                  disabled={status !== "idle"}
                >
                  {status === "sending" && (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Sending...
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Message Sent!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      Failed — Try Again
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Direct Contact — takes 2 cols */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4 lg:col-span-2">
              <p
                className="mb-1 text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                Or reach out directly
              </p>

              <ContactCard
                label="Email"
                value={SOCIAL_LINKS.email}
                onClick={() => handleCopy(SOCIAL_LINKS.email, "email")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                }
                actionIcon={copyIcon("email")}
              />

              <ContactCard
                label="LinkedIn"
                value="Abdul Rehman"
                href={SOCIAL_LINKS.linkedin}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                }
                actionIcon={externalIcon}
              />

              <ContactCard
                label="WhatsApp"
                value={SOCIAL_LINKS.whatsapp}
                onClick={() => handleCopy(SOCIAL_LINKS.whatsapp, "whatsapp")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                }
                actionIcon={copyIcon("whatsapp")}
              />

              <ContactCard
                label="GitHub"
                value="View Profile"
                href="https://github.com/Arcofficial4545"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                }
                actionIcon={externalIcon}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
