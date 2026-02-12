import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Abdul Rehman | ARC — Software Engineer",
  description:
    "Software Engineer with 2+ years of production experience. Specializing in modern JavaScript, React, and full-stack web development.",
  keywords: [
    "Abdul Rehman",
    "ARC",
    "Software Engineer",
    "React Developer",
    "Full-Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Abdul Rehman" }],
  openGraph: {
    title: "Abdul Rehman | ARC — Software Engineer",
    description:
      "Software Engineer with 2+ years of production experience in modern web development.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
