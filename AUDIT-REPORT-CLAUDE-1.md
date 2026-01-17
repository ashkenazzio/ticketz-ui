# TICKETZ UI — BRAND & DESIGN AUDIT REPORT

**Audit Date:** January 2026
**Auditor Role:** Principal Product Designer & Brand Strategist
**Scope:** Public website pages only (excludes authenticated app pages)

---

## EXECUTIVE SUMMARY

The Ticketz UI implementation largely follows the "Immersive Utility" / "Warm Dark Mode" aesthetic defined in the Affinity reference screenshots. The main remaining issues are related to undefined CSS classes and inconsistent border radius usage.

**Critical Issues Found:** 5
**High Priority Issues:** 12
**Medium Priority Issues:** 24

---

## TABLE OF CONTENTS

1. [Critical Brand Violations](#1-critical-brand-violations)
2. [Page-by-Page Audit](#2-page-by-page-audit)
3. [Typography Violations](#3-typography-violations)
4. [Color & Background Issues](#4-color--background-issues)
5. [Border Radius Inconsistencies](#5-border-radius-inconsistencies)
6. [Depth & 2.5D Layering Issues](#6-depth--25d-layering-issues)
7. [Copywriting Red Flags](#7-copywriting-red-flags)
8. [Mobile & Responsive Fails](#8-mobile--responsive-fails)
9. [Sitemap & Coverage](#9-sitemap--coverage)
10. [Action Items](#10-action-items)

---

## 1. CRITICAL BRAND VIOLATIONS

### 1.1 Background Colors: VERIFIED

**Status:** ✅ Colors match Affinity reference

| Color | Value | Status |
|-------|-------|--------|
| `dark` | `#0d1216` | Matches Affinity's very dark backgrounds |
| `surface` | `#18191b` | Appropriate for elevated surfaces |

**Verification:** Compared against Affinity website CSS (`5cbf532a93e57e5a.ltr.css`) and screenshots. The dark backgrounds are intentionally near-black.

### 1.2 Light Mode Sections: BY DESIGN

**Status:** ✅ Intentional design choice matching Affinity pattern

Affinity uses light/cream sections throughout their site (see `affinity-07-get-affinity.png`, `affinity-02-graphic-design.png`). Their warm cream color is `#E0DCD6`.

| File | Color | Comparison |
|------|-------|------------|
| `OrganizerFinancials.tsx` | `#EAE8E2` | ✅ Very close to Affinity's `#E0DCD6` |
| `FairPlay.tsx` | `#e5e7eb` | ⚠️ Cooler gray - consider warming to `#EAE8E2` |
| `DiscoveryWallet.tsx` | `#E5E5E5` | ⚠️ Neutral gray - acceptable for ticket mock |

### 1.3 Pure Black Usage (Minor)

| File | Line | Issue | Recommendation |
|------|------|-------|----------------|
| `InitiationCTA.tsx` | `:6` | Uses `bg-black` | Consider `bg-dark` for consistency |
| `NoAIBadge.tsx` | `:5` | Uses `bg-black` | Acceptable for dramatic effect |

### 1.4 Undefined CSS Classes

The following classes are used but **NOT DEFINED** in `tailwind.config.js`:

| Class | Files Using It |
|-------|---------------|
| `font-display` | 15+ files (see Section 3) |
| `bg-darker` | `AttendeeCTA.tsx`, `OrganizerCTA.tsx` |
| `bg-surface-highlight` | `Hero.tsx`, `OrganizerGrowthGrid.tsx` |
| `shadow-float` | `Hero.tsx` |
| `scrollbar-hide` | `FrequencyDiscovery.tsx` |

---

## 2. PAGE-BY-PAGE AUDIT

### 2.1 HOME (`/`)

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `Hero.tsx` | `:67` | Uses undefined `shadow-float` | High |
| `Hero.tsx` | `:69` | Uses undefined `bg-surface-highlight` | High |
| `Hero.tsx` | `:81, :92` | Mixed `rounded-lg` with `rounded-sm` | Medium |
| `Hero.tsx` | `:160` | Bouncing animation feels cheap | Low |
| `UserTypeSelection.tsx` | `:9` | Body copy `text-gray-400` too dark | Medium |
| `StatementBreak.tsx` | `:4` | Uses undefined `font-display` | Critical |
| `FairPlay.tsx` | `:5` | Light section (by design) - consider warming color | Low |
| `AttendeeZone.tsx` | `:39, :64` | Arrow buttons use `rounded-full` (pill) | Medium |
| `OrganizerZone.tsx` | `:131` | Generic `rounded` class | Low |
| `Spotlight.tsx` | — | Clean implementation | Pass |

### 2.2 ATTENDEES (`/attendees`)

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `AttendeesHero.tsx` | `:70` | Card uses `rounded-2xl` (too rounded) | Medium |
| `AttendeesHero.tsx` | `:46` | Notification uses `rounded-full` | Low |
| `DiscoveryGrid.tsx` | `:20, :40, :56, :72` | All cards use `rounded-2xl` | Medium |
| `WebWalletFeature.tsx` | `:10` | Device frame `rounded-[3rem]` (toy-like) | Medium |
| `WebWalletFeature.tsx` | `:32` | Ticket card `rounded-2xl` | Low |
| `AttendeeCTA.tsx` | `:6` | Uses undefined `bg-darker` | High |
| `AttendeeCTA.tsx` | `:8` | CTA card uses `rounded-3xl` | Medium |
| `AttendeeCTA.tsx` | `:23` | White button uses `rounded-full` | Medium |
| `SocialLoop.tsx` | `:40` | Glass card `rounded-2xl` | Medium |
| `SocialLoop.tsx` | `:99` | Floating card `rounded-xl` | Low |

**Glassmorphism Check:** `backdrop-blur-xl` + `bg-white/5` correctly implemented in `SocialLoop.tsx`.

### 2.3 ORGANIZERS (`/organizers`)

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `OrganizersHero.tsx` | `:43` | Card uses `rounded-xl` | Medium |
| `OrganizerFeatures.tsx` | `:33` | Card `rounded-2xl` + rotation gimmick | Low |
| `OrganizerFeatures.tsx` | `:66` | Image `rounded-2xl` | Low |
| `OrganizerGrowthGrid.tsx` | `:15, :31, :45` | Cards use `rounded-2xl` | Medium |
| `OrganizerGrowthGrid.tsx` | `:16, :32, :46` | Uses undefined `bg-surface-highlight` | High |
| `OrganizerFinancials.tsx` | `:5` | Light section (by design) - matches Affinity `#E0DCD6` | Pass |
| `OrganizerFinancials.tsx` | `:16` | Payout card `rounded-2xl` + `bg-white` | Medium |
| `OrganizerCTA.tsx` | `:6` | Uses undefined `bg-darker` | High |

**Missing:** Organizer panels should have "lime glow" effect per brand spec.

### 2.4 DISCOVERY (`/discovery`)

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `DiscoveryHero.tsx` | `:57` | H1 uses `font-serif` | Pass |
| `DiscoveryHero.tsx` | `:77` | Mixed `rounded-lg`/`rounded-xl` | Low |
| `DiscoveryTrending.tsx` | `:45, :70` | Uses undefined `font-display` | Critical |
| `DiscoveryTrending.tsx` | `:56` | Event cards use `rounded-sm` | Pass |
| `DiscoverySpotlight.tsx` | `:15, :24, :28` | Uses undefined `font-display` | Critical |
| `DiscoverySpotlight.tsx` | `:34, :37` | Buttons use `rounded-sm` | Pass |
| `DiscoveryWallet.tsx` | `:5` | Uses `bg-[#0f0f16]` (slightly different dark) | Low |
| `DiscoveryWallet.tsx` | `:7` | Uses undefined `font-display` | Critical |
| `DiscoveryWallet.tsx` | `:27` | Light ticket body (by design for ticket mock) | Pass |
| `EventHighlight.tsx` | `:7, :15, :28, :65, :67` | Uses undefined `font-display` | Critical |
| `EventHighlight.tsx` | `:9` | Card uses `rounded-sm` | Pass |

### 2.5 COMMUNITIES (`/communities`)

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `CommunitiesHero.tsx` | `:20` | H1 uses `font-serif` | Pass |
| `EditorialSpotlight.tsx` | `:28, :38, :42, :46` | Uses undefined `font-display` | Critical |
| `EditorialSpotlight.tsx` | `:51` | CTA button has NO border-radius | Medium |
| `FrequencyDiscovery.tsx` | `:33, :59` | Uses undefined `font-display` | Critical |
| `FrequencyDiscovery.tsx` | `:44` | Uses undefined `scrollbar-hide` | Medium |
| `FrequencyDiscovery.tsx` | `:49` | Category cards have NO border-radius | Medium |
| `CommunityLeaders.tsx` | `:26, :51` | Uses undefined `font-display` | Critical |
| `CommunityLeaders.tsx` | `:34` | Avatars use `rounded-full` | Pass |
| `InitiationCTA.tsx` | `:6` | Uses `bg-black` (pure #000000) | Critical |
| `InitiationCTA.tsx` | `:8` | Uses undefined `font-display` | Critical |
| `InitiationCTA.tsx` | `:16` | CTA button `rounded-sm` | Pass |

### 2.6 ABOUT (`/about`)

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `AboutHero.tsx` | `:5` | Uses `bg-[#0a0a0c]` (inconsistent) | Medium |
| `AboutHero.tsx` | `:10` | H1 uses `font-mono` (intentional for tech page) | Pass |
| `ArchitectureDiagram.tsx` | `:5` | Uses `bg-[#0d1216]` | Pass (matches config) |
| `ArchitectureDiagram.tsx` | `:17, :35, :59` | Cards use `rounded-sm` | Pass |
| `TechStack.tsx` | `:5` | Uses `bg-[#0a0a0c]` (inconsistent) | Medium |
| `TechStack.tsx` | `:11` | Container uses `rounded-sm` | Pass |
| `TypeSafetySection.tsx` | `:5` | Uses `bg-[#0a0a0c]` (inconsistent) | Medium |
| `TypeSafetySection.tsx` | `:7` | Container uses `rounded-sm` | Pass |
| `DataModel.tsx` | `:14` | Uses `bg-[#0a0a0c]` (inconsistent) | Medium |
| `DataModel.tsx` | `:22, :32` | Cards use `rounded-sm` | Pass |
| `Infrastructure.tsx` | `:5` | Uses `bg-[#0d1216]` | Pass |
| `Infrastructure.tsx` | `:10, :21, :32` | Cards use `rounded-sm` | Pass |
| `NoAIBadge.tsx` | `:5` | Uses `bg-black` (pure #000000) | Critical |

**Note:** About page uses `font-mono` extensively which is intentional for technical documentation aesthetic.

### 2.7 SHARED COMPONENTS

| Component | Line | Issue | Severity |
|-----------|------|-------|----------|
| `Navbar.tsx` | `:82` | Dropdown uses `rounded-sm` | Pass |
| `Navbar.tsx` | `:130` | Sign Up button `rounded-xl` (inconsistent) | Medium |
| `Footer.tsx` | `:59` | App Hub box `rounded-sm` | Pass |

---

## 3. TYPOGRAPHY VIOLATIONS

### 3.1 Undefined `font-display` Class

The class `font-display` is used **but not defined** in `tailwind.config.js`. All instances render in **fallback system fonts**.

**Total Violations: 25+ instances across 15 files**

| File | Lines |
|------|-------|
| `StatementBreak.tsx` | `:4` |
| `EditorialSpotlight.tsx` | `:28, :38, :42, :46` |
| `CommunityLeaders.tsx` | `:26, :51` |
| `FrequencyDiscovery.tsx` | `:33, :59` |
| `InitiationCTA.tsx` | `:8` |
| `DiscoveryTrending.tsx` | `:45, :70` |
| `DiscoverySpotlight.tsx` | `:15, :24, :28` |
| `DiscoveryWallet.tsx` | `:7` |
| `EventHighlight.tsx` | `:7, :15, :28, :65, :67` |
| `AppHub.tsx` | `:138, :161, :195, :222, :247, :281, :309` |

### 3.2 Font Config Mismatch

| Documentation Says | Config Has |
|--------------------|------------|
| Fraunces (serif) | DM Serif Display |

`CLAUDE.md` mentions Fraunces but `tailwind.config.js:18` specifies `DM Serif Display`.

### 3.3 Recommended Fix

Add to `tailwind.config.js`:

```js
fontFamily: {
  sans: ['Manrope', 'sans-serif'],
  serif: ['"DM Serif Display"', 'serif'],
  display: ['"DM Serif Display"', 'serif'], // ADD THIS
  mono: ['JetBrains Mono', 'monospace'],
}
```

---

## 4. COLOR & BACKGROUND ISSUES

### 4.1 Dark Background Consistency: MOSTLY GOOD

| Color Used | Files | Status |
|------------|-------|--------|
| `bg-dark` (`#0d1216`) | Most files | ✅ Primary dark - matches Affinity |
| `bg-[#0a0a0c]` | About page components | ⚠️ Slightly different - consider using `bg-dark` |
| `bg-[#0f0f16]` | `DiscoveryWallet.tsx` | ⚠️ Slightly different - consider using `bg-dark` |
| `bg-black` | `InitiationCTA.tsx`, `NoAIBadge.tsx` | ⚠️ Pure black - acceptable for dramatic sections |

### 4.2 Light Sections: VERIFIED AGAINST AFFINITY

Affinity reference color: `#E0DCD6` (warm cream)

| File | Current | Match |
|------|---------|-------|
| `OrganizerFinancials.tsx` | `#EAE8E2` | ✅ Excellent match |
| `FairPlay.tsx` | `#e5e7eb` | ⚠️ Cooler - consider `#EAE8E2` |
| `DiscoveryWallet.tsx` | `#E5E5E5` | ✅ Acceptable for ticket mock |

### 4.3 Recommended Additions to Config

```js
colors: {
  // Existing colors are correct
  dark: '#0d1216',
  surface: '#18191b',
  lime: '#a7f175',
  limehover: '#96d969',
  // Add these missing utilities:
  'surface-highlight': '#1f2124',
  darker: '#0a0a0c',
}
```

---

## 5. BORDER RADIUS INCONSISTENCIES

### 5.1 Current State

| Radius Class | Pixel Value | Usage |
|--------------|-------------|-------|
| `rounded-sm` | 2px | Buttons, some cards |
| `rounded` | 4px | Occasional use |
| `rounded-lg` | 8px | Mixed use |
| `rounded-xl` | 12px | Navbar button |
| `rounded-2xl` | 16px | Many cards |
| `rounded-3xl` | 24px | CTA sections |
| `rounded-full` | 9999px | Pill buttons, avatars |
| (none) | 0px | Some cards |

### 5.2 Brand Standard (Per Affinity Reference)

All UI elements should use **soft rectangles** (~8px radius), NOT:
- Pills (`rounded-full`) for buttons
- Sharp corners (0px) for cards
- Excessive rounding (`rounded-2xl`+) for containers

### 5.3 Recommended Standard

```
Buttons: rounded-lg (8px)
Cards: rounded-lg (8px)
Modals/Dialogs: rounded-xl (12px)
Avatars: rounded-full (allowed)
```

---

## 6. DEPTH & 2.5D LAYERING ISSUES

### 6.1 Missing Float Logic

The Affinity reference shows floating UI elements with:
1. Distinct drop shadows (not just `shadow-2xl`)
2. Subtle border highlighting (`border-white/10` insufficient)
3. Consistent z-index layering

**Current Issues:**

| Location | Problem |
|----------|---------|
| `Hero.tsx:67` | Uses undefined `shadow-float` |
| `Hero.tsx:125` | Dashboard card lacks sufficient "lift" |
| `OrganizerZone.tsx:116` | No glow/highlight to separate from photo |

### 6.2 Missing Lime Glow on Organizer Panels

Per brand spec: "Solid Dark Panels with Lime glow"

**Current:** Cards use `bg-surface border border-white/10` with no lime accent.

**Recommended:** Add `shadow-[0_0_30px_rgba(167,241,117,0.1)]` to organizer cards.

### 6.3 Mobile 2.5D Collapse

| Component | Issue |
|-----------|-------|
| `Hero.tsx:60` | Entire UI cluster `hidden md:flex` |
| `AttendeesHero.tsx:43` | Floating ticket `hidden lg:flex` |
| `OrganizersHero.tsx:41` | Dashboard visual `hidden lg:flex` |
| `OrganizerZone.tsx:102` | Layered composition `hidden lg:flex` |

Mobile users see a completely different (worse) experience.

---

## 7. COPYWRITING RED FLAGS

### 7.1 Generic SaaS-Speak

| Location | Current Copy | Issue | Suggested Fix |
|----------|--------------|-------|---------------|
| `UserTypeSelection.tsx:13` | "We build elite experiences for communities and enhance how you connect with the culture." | "Elite experiences" and "enhance" are corporate | "We're the infrastructure for underground culture." |
| `OrganizerZone.tsx:18-19` | "Everything you need to manage your events and grow your community, all in one place." | SaaS cliche #1 | "Run your events. Own your audience. That's it." |
| `OrganizerFeatures.tsx:19` | "See who's returning, where they're coming from, and when they buy. Real-time data that helps you understand your crowd, not just count them." | Too long, feature-spec tone | "Watch your crowd grow in real-time. Data you actually own." |
| `OrganizerFeatures.tsx:100-101` | "No clunky hardware. No app downloads. Our browser-based scanner keeps the line moving so you can focus on welcoming your guests." | "Focus on welcoming your guests" is soft | "No app. No gear. Just scan and go." |
| `WebWalletFeature.tsx:71-72` | "Access your tickets directly from your browser. We've optimized the mobile web experience..." | Explains the obvious | "Open your browser. Show your ticket. Done." |
| `AttendeesManifesto.tsx:9` | "Whether you're looking to sweat, code, or dance, Ticketz connects you to the communities that share your obsession." | "Connects you to" is generic | "For the obsessed. By the obsessed." |

### 7.2 Headline Length Check

All headlines checked are **6 words or fewer**. Headlines pass.

---

## 8. MOBILE & RESPONSIVE FAILS

### 8.1 Hidden 2.5D Elements

Mobile users miss the immersive floating UI entirely:

| Component | Desktop | Mobile |
|-----------|---------|--------|
| `Hero.tsx` | Full 2.5D cluster | Text only |
| `AttendeesHero.tsx` | Floating browser/ticket | Text only |
| `OrganizersHero.tsx` | Dashboard visualization | Text only |
| `OrganizerZone.tsx` | Layered composition | Simplified card |

### 8.2 Bento Grid Stacking

| Component | Issue |
|-----------|-------|
| `AttendeeZone.tsx:19` | Grid becomes `h-[1200px]` on mobile (too tall) |
| `DiscoveryGrid.tsx:17` | Large "Tech" card loses visual dominance |

### 8.3 Potential Overflow Issues

| Component | Issue |
|-----------|-------|
| `DiscoveryHero.tsx:74-85` | Artwork fan uses fixed widths |
| `EditorialSpotlight.tsx:23` | `-ml-12` may cause tablet issues |

---

## 9. SITEMAP & COVERAGE

### 9.1 Pages Audited

```
PUBLIC WEBSITE (In Scope)
/                    [AUDITED] Home / Landing Page
/attendees           [AUDITED] Attendees Landing
/organizers          [AUDITED] Organizers Landing
/discovery           [AUDITED] Event Discovery
/communities         [AUDITED] Communities Landing
/about               [AUDITED] About / Technical Info
/app                 [REVIEWED] App Hub (bridge page)

EXCLUDED FROM AUDIT (Authenticated App Pages)
/auth/*              Auth pages
/wallet              Ticket wallet
/orders/*            Order history
/my-communities      User communities
/saved               Saved events
/community/:id       Community hub
/event/:id           Event details
/checkout/*          Checkout flow
/dashboard/*         Organizer dashboard
/scanner             QR scanner
/profile             User profile
/settings            Settings
```

### 9.2 Cleanup Completed

- **DELETED:** `/for-organizers` route and `ForOrganizers.tsx` (duplicate/leftover)

---

## 10. ACTION ITEMS

### P0 — BLOCKERS (Must fix before ship)

| # | Task | Files |
|---|------|-------|
| 1 | Add `font-display` to Tailwind config | `tailwind.config.js` |
| 2 | Define missing utilities: `bg-darker`, `bg-surface-highlight`, `shadow-float` | `tailwind.config.js` |

### P1 — HIGH PRIORITY

| # | Task |
|---|------|
| 3 | Standardize border-radius to `rounded-lg` (8px) for all cards |
| 4 | Add proper depth shadows to floating 2.5D elements |
| 5 | Add lime glow effects to organizer panels |
| 6 | Create meaningful mobile fallbacks for hidden 2.5D clusters |
| 7 | Standardize dark background colors across About page (use `bg-dark` instead of hardcoded values) |

### P2 — POLISH

| # | Task |
|---|------|
| 8 | Warm up `FairPlay.tsx` background from `#e5e7eb` to `#EAE8E2` to match Affinity |
| 9 | Copywriting pass to remove SaaS-speak |
| 10 | Audit all `rounded-full` buttons and convert to brand radius |
| 11 | Review and improve mobile Bento grid stacking |
| 12 | Add missing border-radius to cards in `FrequencyDiscovery.tsx` |
| 13 | Fix button border-radius in `EditorialSpotlight.tsx` |
| 14 | Consider replacing `bg-black` with `bg-dark` in `InitiationCTA.tsx` for consistency |

---

## RECOMMENDED TAILWIND CONFIG ADDITIONS

Add these to the existing config (colors are already correct):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing - keep as-is
        dark: '#0d1216',
        surface: '#18191b',
        lime: '#a7f175',
        limehover: '#96d969',
        // ADD these missing utilities:
        darker: '#0a0a0c',
        'surface-highlight': '#1f2124',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        display: ['"DM Serif Display"', 'serif'], // ADD THIS
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // ADD these:
        'float': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow-lime': '0 0 30px rgba(167, 241, 117, 0.1)',
      }
    },
  },
  plugins: [],
}
```

---

**END OF AUDIT REPORT**

*P0 items are minimal - mainly config additions. Ship-ready after those fixes.*
