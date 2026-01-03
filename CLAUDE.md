# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lifesaver Trailblazer Hub is a React showcase website for the Lifesaver Labs ecosystem—three coordinated entities (Coalition Nonprofit, PBC, and USAT/i18n civics) focused on public health innovation, emergency response, and democratic reform. The site showcases 20+ interconnected projects.

## Commands

```bash
npm run dev              # Start dev server at http://localhost:8080
npm run build            # Production build
npm run lint             # Run ESLint
npm run test             # Run tests in watch mode (Vitest)
npm run test:run         # Run tests once
npm run test:coverage    # Generate coverage reports
```

### Running a single test file
```bash
npm run test:run src/components/ProjectCard.test.tsx
```

## Architecture

### Tech Stack
- **Build**: Vite 5.4 with React SWC plugin
- **Framework**: React 18 + TypeScript 5.8
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + shadcn/ui (Radix-based)
- **State**: TanStack Query v5
- **Maps/Viz**: D3, react-simple-maps, Recharts
- **Testing**: Vitest + Testing Library

### Source Structure
```
src/
├── components/       # Reusable components
│   └── ui/          # shadcn/ui primitives (45+ components)
├── pages/           # Route-level page components
├── hooks/           # Custom React hooks
├── lib/             # Utilities (cn function for classnames)
├── assets/          # Images and GeoJSON data
└── test/            # Test setup with comprehensive mocks
```

### Key Files
- `src/App.tsx` - Router configuration with 5 routes
- `src/components/OrganizationTabs.tsx` - Main project showcase (3 org tabs)
- `src/pages/DroneCoverageCalculatorUSAT.tsx` - Complex D3 geo visualization
- `src/pages/WestWingBlessedMap.tsx` - Gall-Peters projection map
- `src/index.css` - Design system CSS variables and Tailwind config

### Import Conventions
Use path alias `@/` for all imports:
```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## Testing

The test suite has 535+ tests across 37 files. The test setup (`src/test/setup.ts`) mocks:
- react-simple-maps components
- D3 geo functions and projections
- All asset imports
- Browser APIs (matchMedia, ResizeObserver, IntersectionObserver)

## TypeScript Configuration

The project uses relaxed TypeScript settings (`noImplicitAny: false`, `strictNullChecks: false`) for rapid prototyping. This is intentional.

## Design System

- **Primary color**: International Orange (#FF5000 / RGB 255,80,0 / CMYK 0,69,100,0)
- **Dark mode**: Class-based via `next-themes`
- **Fonts**: System sans-serif, Georgia for display headings
- **Breakpoints**: Standard Tailwind + 2xl at 1400px

## Content Notes

- All US maps intentionally include territories (equity focus)
- Project descriptions emphasize life-saving, equity, and democratic values
- The site uses Lovable.dev tooling (visible in component tagger plugin)
