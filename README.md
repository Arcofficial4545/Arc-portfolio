# ARC Portfolio — Abdul Rehman

Premium, futuristic single-page developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 15** (App Router, JavaScript)
- **Tailwind CSS v4**
- **Framer Motion** (via `motion` package)
- **next-themes** (dark/light toggle)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build
npm start
```

## Customization

### Add Your Photo

Replace the portrait placeholder in the Hero section by adding your image to `public/` and updating `components/Hero.js`.

### Add Projects

Add project objects to the `PROJECTS` array in `lib/constants.js`:

```js
export const PROJECTS = [
  {
    title: "Project Name",
    description: "Brief description of the project.",
    tags: ["React", "Tailwind", "API"],
    link: "https://example.com",
  },
];
```

### Contact Form Backend

The contact form in `components/Contact.js` is ready for backend integration. Hook up the `handleSubmit` function to your API route or service.

## Project Structure

```
app/
  layout.js          Root layout + theme provider
  page.js            Main page composing all sections
  globals.css        Tailwind + glassmorphism utilities
components/
  Navbar.js          Floating glass navbar
  Hero.js            Hero with typewriter animation
  About.js           Professional story + timeline
  Skills.js          Skills showcase
  Projects.js        Project cards + empty state
  Contact.js         Contact form + direct links
  Footer.js          Minimal footer
  ThemeToggle.js     Dark/light toggle
  Typewriter.js      Role cycling animation
  SectionWrapper.js  Scroll-reveal wrapper
  ProjectCard.js     Glass project card
hooks/
  useScrollProgress.js  Scroll tracking hook
lib/
  constants.js       All site data and configuration
```

## License

MIT
