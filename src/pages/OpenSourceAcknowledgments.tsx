import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Heart, Code, Users } from "lucide-react";

// ============================================================================
// OPEN SOURCE ACKNOWLEDGMENTS
// ============================================================================
// This page honors the countless contributors to the open source ecosystem
// whose freely given work makes projects like this possible.
//
// Last Updated: January 2026
// ============================================================================

interface PackageInfo {
  name: string;
  version: string;
  license: string;
  description: string;
  homepage?: string;
  author?: string;
  category: 'core' | 'ui' | 'visualization' | 'forms' | 'tooling' | 'testing';
}

const LAST_UPDATED = "January 3, 2026";

// All dependencies from package.json with license information
const PACKAGES: PackageInfo[] = [
  // Core Framework
  { name: "React", version: "18.3.1", license: "MIT", description: "A JavaScript library for building user interfaces", homepage: "https://react.dev", author: "Meta (Facebook)", category: "core" },
  { name: "React DOM", version: "18.3.1", license: "MIT", description: "React package for working with the DOM", homepage: "https://react.dev", author: "Meta (Facebook)", category: "core" },
  { name: "React Router DOM", version: "6.30.1", license: "MIT", description: "Declarative routing for React web applications", homepage: "https://reactrouter.com", author: "Remix Software", category: "core" },
  { name: "TypeScript", version: "5.8.3", license: "Apache-2.0", description: "TypeScript is a language for application-scale JavaScript", homepage: "https://www.typescriptlang.org", author: "Microsoft", category: "core" },

  // Build & Development
  { name: "Vite", version: "5.4.19", license: "MIT", description: "Next generation frontend tooling", homepage: "https://vite.dev", author: "Evan You & Vite Contributors", category: "tooling" },
  { name: "@vitejs/plugin-react-swc", version: "3.11.0", license: "MIT", description: "Speed up Vite with SWC", homepage: "https://github.com/vitejs/vite-plugin-react-swc", category: "tooling" },
  { name: "ESLint", version: "9.32.0", license: "MIT", description: "Find and fix problems in JavaScript code", homepage: "https://eslint.org", author: "Nicholas C. Zakas & ESLint Contributors", category: "tooling" },
  { name: "PostCSS", version: "8.5.6", license: "MIT", description: "A tool for transforming CSS with JavaScript", homepage: "https://postcss.org", author: "Andrey Sitnik", category: "tooling" },
  { name: "Autoprefixer", version: "10.4.21", license: "MIT", description: "Parse CSS and add vendor prefixes", homepage: "https://github.com/postcss/autoprefixer", author: "Andrey Sitnik", category: "tooling" },

  // UI Component Libraries (Radix)
  { name: "@radix-ui/react-accordion", version: "1.2.11", license: "MIT", description: "Unstyled, accessible accordion component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-alert-dialog", version: "1.1.14", license: "MIT", description: "Unstyled, accessible alert dialog component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-dialog", version: "1.1.14", license: "MIT", description: "Unstyled, accessible dialog component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-dropdown-menu", version: "2.1.15", license: "MIT", description: "Unstyled, accessible dropdown menu", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-tabs", version: "1.1.12", license: "MIT", description: "Unstyled, accessible tabs component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-tooltip", version: "1.2.7", license: "MIT", description: "Unstyled, accessible tooltip component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-select", version: "2.2.5", license: "MIT", description: "Unstyled, accessible select component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-checkbox", version: "1.3.2", license: "MIT", description: "Unstyled, accessible checkbox component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-switch", version: "1.2.5", license: "MIT", description: "Unstyled, accessible switch component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-slider", version: "1.3.5", license: "MIT", description: "Unstyled, accessible slider component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-toast", version: "1.2.14", license: "MIT", description: "Unstyled, accessible toast notifications", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-popover", version: "1.1.14", license: "MIT", description: "Unstyled, accessible popover component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-label", version: "2.1.7", license: "MIT", description: "Unstyled, accessible label component", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },
  { name: "@radix-ui/react-slot", version: "1.2.3", license: "MIT", description: "Merges props onto its immediate child", homepage: "https://www.radix-ui.com", author: "Workos", category: "ui" },

  // Styling
  { name: "Tailwind CSS", version: "3.4.17", license: "MIT", description: "A utility-first CSS framework", homepage: "https://tailwindcss.com", author: "Adam Wathan & Tailwind Labs", category: "ui" },
  { name: "tailwindcss-animate", version: "1.0.7", license: "MIT", description: "Tailwind CSS plugin for animations", homepage: "https://github.com/jamiebuilds/tailwindcss-animate", author: "Jamie Kyle", category: "ui" },
  { name: "@tailwindcss/typography", version: "0.5.16", license: "MIT", description: "Beautiful typographic defaults for HTML", homepage: "https://tailwindcss.com/docs/typography-plugin", author: "Tailwind Labs", category: "ui" },
  { name: "class-variance-authority", version: "0.7.1", license: "Apache-2.0", description: "CSS-in-TS utility for component variants", homepage: "https://cva.style", author: "Joe Bell", category: "ui" },
  { name: "clsx", version: "2.1.1", license: "MIT", description: "A tiny utility for constructing className strings", homepage: "https://github.com/lukeed/clsx", author: "Luke Edwards", category: "ui" },
  { name: "tailwind-merge", version: "2.6.0", license: "MIT", description: "Merge Tailwind CSS classes without style conflicts", homepage: "https://github.com/dcastil/tailwind-merge", author: "Dany Castillo", category: "ui" },

  // Icons
  { name: "Lucide React", version: "0.462.0", license: "ISC", description: "Beautiful & consistent icon toolkit", homepage: "https://lucide.dev", author: "Lucide Contributors", category: "ui" },

  // Data Visualization
  { name: "D3.js", version: "7.9.0", license: "ISC", description: "Data-Driven Documents for web visualization", homepage: "https://d3js.org", author: "Mike Bostock & Observable", category: "visualization" },
  { name: "d3-geo", version: "3.1.1", license: "ISC", description: "Geographic projections for D3", homepage: "https://d3js.org", author: "Mike Bostock", category: "visualization" },
  { name: "d3-geo-projection", version: "4.0.0", license: "ISC", description: "Extended geographic projections for D3", homepage: "https://github.com/d3/d3-geo-projection", author: "Mike Bostock", category: "visualization" },
  { name: "Recharts", version: "2.15.4", license: "MIT", description: "A composable charting library for React", homepage: "https://recharts.org", author: "Recharts Group", category: "visualization" },
  { name: "react-simple-maps", version: "3.0.0", license: "MIT", description: "Beautiful SVG maps in React", homepage: "https://www.react-simple-maps.io", author: "Zach Mongeau", category: "visualization" },

  // Forms
  { name: "React Hook Form", version: "7.61.1", license: "MIT", description: "Performant, flexible forms for React", homepage: "https://react-hook-form.com", author: "Bill Luo (Beier)", category: "forms" },
  { name: "@hookform/resolvers", version: "3.10.0", license: "MIT", description: "Validation resolvers for React Hook Form", homepage: "https://react-hook-form.com", author: "Bill Luo (Beier)", category: "forms" },
  { name: "Zod", version: "3.25.76", license: "MIT", description: "TypeScript-first schema validation", homepage: "https://zod.dev", author: "Colin McDonnell", category: "forms" },

  // State Management & Data Fetching
  { name: "@tanstack/react-query", version: "5.83.0", license: "MIT", description: "Powerful data synchronization for React", homepage: "https://tanstack.com/query", author: "Tanner Linsley & TanStack", category: "core" },

  // UI Components (Other)
  { name: "cmdk", version: "1.1.1", license: "MIT", description: "Fast, composable command menu for React", homepage: "https://cmdk.paco.me", author: "Paco Coursey", category: "ui" },
  { name: "Sonner", version: "1.7.4", license: "MIT", description: "An opinionated toast component for React", homepage: "https://sonner.emilkowal.ski", author: "Emil Kowalski", category: "ui" },
  { name: "Vaul", version: "0.9.9", license: "MIT", description: "Drawer component for React", homepage: "https://vaul.emilkowal.ski", author: "Emil Kowalski", category: "ui" },
  { name: "Embla Carousel React", version: "8.6.0", license: "MIT", description: "A lightweight carousel library", homepage: "https://www.embla-carousel.com", author: "David Jerleke", category: "ui" },
  { name: "react-day-picker", version: "8.10.1", license: "MIT", description: "Flexible date picker for React", homepage: "https://react-day-picker.js.org", author: "Giampaolo Bellavite", category: "ui" },
  { name: "react-resizable-panels", version: "2.1.9", license: "MIT", description: "Resizable panel groups for React", homepage: "https://react-resizable-panels.vercel.app", author: "Brian Vaughn", category: "ui" },
  { name: "input-otp", version: "1.4.2", license: "MIT", description: "One-time password input for React", homepage: "https://input-otp.rodz.dev", author: "Guilherme Rodz", category: "ui" },
  { name: "next-themes", version: "0.3.0", license: "MIT", description: "Perfect dark mode in React apps", homepage: "https://github.com/pacocoursey/next-themes", author: "Paco Coursey", category: "ui" },

  // Utilities
  { name: "date-fns", version: "3.6.0", license: "MIT", description: "Modern JavaScript date utility library", homepage: "https://date-fns.org", author: "Sasha Koss & date-fns Contributors", category: "core" },

  // Testing
  { name: "Vitest", version: "4.0.16", license: "MIT", description: "Next generation testing framework powered by Vite", homepage: "https://vitest.dev", author: "Anthony Fu & Vitest Contributors", category: "testing" },
  { name: "@testing-library/react", version: "16.3.1", license: "MIT", description: "Simple and complete React DOM testing utilities", homepage: "https://testing-library.com/react", author: "Kent C. Dodds & Contributors", category: "testing" },
  { name: "@testing-library/jest-dom", version: "6.9.1", license: "MIT", description: "Custom Jest matchers for DOM testing", homepage: "https://testing-library.com", author: "Kent C. Dodds & Contributors", category: "testing" },
  { name: "@testing-library/user-event", version: "14.6.1", license: "MIT", description: "Fire events the same way the user does", homepage: "https://testing-library.com", author: "Kent C. Dodds & Contributors", category: "testing" },
  { name: "jsdom", version: "27.4.0", license: "MIT", description: "A JavaScript implementation of web standards", homepage: "https://github.com/jsdom/jsdom", author: "Elijah Insua & jsdom Contributors", category: "testing" },
];

const CATEGORY_LABELS: Record<string, string> = {
  core: "Core Framework & Runtime",
  ui: "User Interface & Styling",
  visualization: "Data Visualization & Maps",
  forms: "Forms & Validation",
  tooling: "Build Tools & Development",
  testing: "Testing Infrastructure",
};

const CATEGORY_ORDER = ['core', 'ui', 'visualization', 'forms', 'tooling', 'testing'];

export default function OpenSourceAcknowledgments() {
  const packagesByCategory = CATEGORY_ORDER.reduce((acc, category) => {
    acc[category] = PACKAGES.filter(p => p.category === category);
    return acc;
  }, {} as Record<string, PackageInfo[]>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary/50 border-b border-border">
        <div className="container px-6 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            <span>Back to Lifesaver Labs</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-primary" size={32} />
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Open Source Acknowledgments
            </h1>
          </div>

          <p className="text-muted-foreground max-w-3xl">
            Standing on the shoulders of giants. This project would not be possible without
            the accumulated decades of freely⁵ and permissively⁵ contributed work from
            the open source community.
          </p>

          <p className="text-sm text-muted-foreground/70 mt-4">
            <strong>Last Updated:</strong> {LAST_UPDATED}
          </p>
        </div>
      </header>

      {/* Gratitude Statement */}
      <section className="bg-primary/5 border-b border-primary/20">
        <div className="container px-6 py-8">
          <div className="flex items-start gap-4">
            <Users className="text-primary mt-1 flex-shrink-0" size={24} />
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                We owe an enormous debt to the giants whose shoulders we stand on here—so many of
                whom contributed their work <strong>freely⁵</strong> and <strong>permissively⁵</strong> to
                build up the public Kohlberg Commons. This set of projects would not be possible
                without the accumulated decades of help from the open source community and the many
                technology, research, and social layers and labors this set of projects is built on.
              </p>
              <p className="text-muted-foreground">
                It's sad to say, but so many souls who contributed we've lost the complex attribution
                and contribution chains for; we can only now credit them anonymously⁵ as part of{" "}
                <em>Anon</em> or <em>Nobody⁵</em>. While in research universities and academies it is
                critically essential to credit the entire attribution chain with assiduous care, in
                this urgent, pressing public health and security⁵ work we're ashamed to say we don't
                always have time under severe time scarcity⁵ to build and maintain comprehensive
                perfectly documented bibliographies of contributions.
              </p>
              <p className="text-muted-foreground">
                We have to move as fast as we can and we don't always have time for that bibliographic
                documentation work, but we'll try as we go to give first and second authorial credit
                and recognize those who we can whenever we can, and to the extent we can recover the
                data, we're happy to share our sources anytime it's helpful for advancing the cause
                and making sure everyone's contributions at all layers and levels are recognized and
                duly appreciated and celebrated.
              </p>
              <p className="font-medium text-foreground">
                This certainly could not have been built without you, and it won't get done without you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Package List */}
      <main className="container px-6 py-12">
        <div className="flex items-center gap-2 mb-8">
          <Code className="text-muted-foreground" size={20} />
          <h2 className="text-2xl font-display font-bold">
            Dependencies ({PACKAGES.length} packages)
          </h2>
        </div>

        <div className="space-y-12">
          {CATEGORY_ORDER.map(category => (
            <section key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {packagesByCategory[category].map(pkg => (
                  <div
                    key={pkg.name}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{pkg.name}</h4>
                      {pkg.homepage && (
                        <a
                          href={pkg.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          title="Visit homepage"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-secondary px-2 py-0.5 rounded font-mono">
                        v{pkg.version}
                      </span>
                      <span className="text-muted-foreground">
                        {pkg.license}
                      </span>
                      {pkg.author && (
                        <span className="text-muted-foreground/70 truncate">
                          {pkg.author}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Additional Acknowledgments */}
        <section className="mt-16 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold mb-6">Additional Acknowledgments</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Research & Data Sources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• American Heart Association (AHA) Statistics</li>
                <li>• CARES (Cardiac Arrest Registry to Enhance Survival)</li>
                <li>• Larsen et al. 1993 Survival Model</li>
                <li>• Mell et al. 2017 EMS Response Times</li>
                <li>• Swedish Drone AED Studies (Lancet Digital Health)</li>
                <li>• US Census Bureau Population Data</li>
                <li>
                  <a
                    href="/dokumentation/QALY-MODEL-BIBLIOGRAPHY.md"
                    className="text-primary hover:underline"
                  >
                    Full Bibliography →
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Design & Infrastructure</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• shadcn/ui — Component system inspiration</li>
                <li>• Vercel — Hosting & deployment platform</li>
                <li>• GitHub — Version control & collaboration</li>
                <li>• Lovable — Development platform</li>
                <li>• Node.js & npm — Runtime & package management</li>
                <li>• The entire JavaScript ecosystem</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:col-span-2">
              <h4 className="font-semibold mb-3">The Unnamed Many</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Beyond the packages listed above, this project benefits from the work of
                thousands of unnamed contributors to foundational technologies: web standards
                committees (W3C, WHATWG), browser engine developers, programming language
                designers, network protocol authors, operating system maintainers, and the
                countless developers who file bug reports, write documentation, answer questions
                on forums, and mentor newcomers. We see you, even when we can't name you.
                Thank you.
              </p>
            </div>
          </div>
        </section>

        {/* License Summary */}
        <section className="mt-12 bg-secondary/30 rounded-lg p-6">
          <h3 className="font-semibold mb-4">License Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
            <div>
              <span className="font-mono bg-background px-2 py-1 rounded">MIT</span>
              <p className="text-muted-foreground mt-1">
                {PACKAGES.filter(p => p.license === 'MIT').length} packages
              </p>
            </div>
            <div>
              <span className="font-mono bg-background px-2 py-1 rounded">ISC</span>
              <p className="text-muted-foreground mt-1">
                {PACKAGES.filter(p => p.license === 'ISC').length} packages
              </p>
            </div>
            <div>
              <span className="font-mono bg-background px-2 py-1 rounded">Apache-2.0</span>
              <p className="text-muted-foreground mt-1">
                {PACKAGES.filter(p => p.license === 'Apache-2.0').length} packages
              </p>
            </div>
            <div>
              <span className="font-mono bg-background px-2 py-1 rounded">BSD-*</span>
              <p className="text-muted-foreground mt-1">
                {PACKAGES.filter(p => p.license.startsWith('BSD')).length} packages
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            All dependencies use OSI-approved open source licenses. Full license texts are
            available in the respective package repositories.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container px-6 py-8 text-center">
          <p className="text-sm text-secondary-foreground/70 mb-2">
            © {new Date().getFullYear()} Lifesaver Labs Coalition & PBC
          </p>
          <p className="text-xs text-secondary-foreground/50 italic">
            "We stand on the shoulders of giants, and we lift as we climb."
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-secondary-foreground/30">|</span>
            <a
              href="https://github.com/lifesaverlabs/lifesaver-trailblazer-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              View Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
