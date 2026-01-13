# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ticketz-UI is a **mockup/prototype UI** for a community-first ticketing platform targeting niche events (underground music, fitness clubs, tech meetups). This is not a functional application—it's a "cardboard" front-end for planning and demo purposes. All data is static/mocked.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
npm run deploy   # Build and deploy to GitHub Pages
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling and dev server
- **Tailwind CSS** for styling
- **React Router DOM** for client-side routing
- **Recharts** for dashboard analytics charts
- **Lucide React** for icons

## Architecture

### Route Structure

The app has three main user flows defined in [App.tsx](src/App.tsx):

1. **Public/Landing pages** (`/`, `/discovery`, `/communities`, `/about`, etc.) - Marketing and discovery
2. **Attendee journey** (`/event/:id`, `/checkout`, `/wallet`, `/orders`, etc.) - Ticket purchasing flow
3. **Organizer journey** (`/dashboard/*`) - Event management, analytics, guest lists

### Key Directories

- `src/pages/` - Route-level components, organized by user type:
  - `pages/attendee/` - Wallet, orders, checkout, event details
  - `pages/organizer/` - Dashboard, event management, analytics, scanner
  - `pages/auth/` - Login/register (demo only)
- `src/components/` - Reusable UI components
  - `components/dashboard/` - Organizer dashboard-specific (Sidebar, StatCard, charts)
  - `components/discovery/` - Event discovery components
  - `components/communities/` - Community-related components
  - `components/about/` - About page components
- `src/layouts/` - Page layout wrappers (DashboardLayout for organizer pages)
- `src/context/` - React context (AuthContext with localStorage persistence)

### Styling Conventions

Custom Tailwind theme in [tailwind.config.js](tailwind.config.js):
- Colors: `dark` (#0d1216), `surface` (#18191b), `lime` (#a7f175), `limehover`
- Fonts: Manrope (sans), Fraunces (serif for headings), JetBrains Mono (mono)

Global styles in [src/index.css](src/index.css) define base typography and a `.glass-nav` component.

### Auth System

The `AuthContext` in [src/context/AuthContext.tsx](src/context/AuthContext.tsx) provides mock authentication with localStorage persistence. Default state is logged-in for demo purposes.

## Deployment

Pushes to `master` branch trigger automatic deployment to GitHub Pages via GitHub Actions. The site is served from the `gh-pages` branch at `/ticketz-ui/` base path.
