---
version: 1.0
name: MCP Beacon
description: AI Agent monitoring platform — Modern SaaS, clean minimalism, vibrant energy. Hexagon beacon mark with warm orange identity.
colors:
  primary: "#F97316"
  primary-dark: "#EA580C"
  primary-light: "#FDBA74"
  primary-ghost: "#FFF7ED"
  surface-dark: "#1A1A2E"
  surface-mid: "#16213E"
  surface-hover: "#1C2A4A"
  surface-card: "#FFFFFF"
  surface-dashboard: "#0F1629"
  bg-page: "#F5F5F5"
  bg-dark: "#0A0E1A"
  text-primary: "#1A1A2E"
  text-secondary: "#6B7280"
  text-muted: "#9CA3AF"
  text-on-dark: "#F5F5F5"
  text-on-primary: "#FFFFFF"
  border: "#E5E7EB"
  border-dark: "#2D3748"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
  info: "#3B82F6"
typography:
  h1:
    fontFamily: Outfit
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Outfit
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  h3:
    fontFamily: Outfit
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.3
  h4:
    fontFamily: Outfit
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
  mono:
    fontFamily: "JetBrains Mono"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  "4xl": 96px
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
shadows:
  sm: "0 1px 2px rgba(0,0,0,0.05)"
  md: "0 4px 6px -1px rgba(0,0,0,0.07)"
  lg: "0 10px 25px -3px rgba(0,0,0,0.1)"
  xl: "0 20px 50px -6px rgba(0,0,0,0.15)"
  glow: "0 0 30px rgba(249,115,22,0.3)"
breakpoints:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
animation:
  fadeUp: "fadeUp 0.6s ease-out"
  fadeIn: "fadeIn 0.3s ease-out"
  hoverLift: "transform 0.2s ease, box-shadow 0.2s ease"
  colorTransition: "color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease"
logo:
  primary: logo-v4-horizontal.svg
  icon: logo-v1-minimal.svg
  abstract: logo-v5-abstract.svg
  lettermark: logo-v2-lettermark.svg
  lighthouse: logo-v3-lighthouse.svg
  favicon: favicon.svg
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    typography: "{typography.body-md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  tag:
    backgroundColor: "{colors.primary-ghost}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.xl}"
    shadows: "{shadows.md}"
    padding: "{spacing.lg}"
  input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
---

## Overview

MCP Beacon is an AI Agent monitoring platform that brings clarity to complex
multi-agent systems. The brand identity draws from the lighthouse metaphor:
a reliable signal cutting through noise, guiding operators to what matters.

**Brand personality:** Professional yet warm. Technical but not cold. Reliable
with energy. The hexagon beacon mark signals structure, precision, and the
lighthouse heritage — every edge points toward actionable insight.

**Tagline:** "AI Agent Monitoring, Illuminated."

**Brand voice:** Clear, confident, and helpful. We speak like an experienced
engineer who genuinely wants to help — direct but never dismissive, technical
but never opaque. Use active voice. Prefer short sentences. Lead with the
benefit, follow with the detail.

**Design principles:**

- **Clarity over decoration** — every element must aid understanding
- **Warmth in data** — orange energy balances dark analytical surfaces
- **Speed of recognition** — hierarchy ensures the important is immediate
- **Consistency across surfaces** — from landing page to SDK docs, one voice
- **Stateful design** — every component has defined loading, empty, error, and success states

---

## Logo & Brand Mark

### Primary Logo (Horizontal)

`logo-v4-horizontal.svg` — The canonical logo. Hexagon beacon icon on the
left, "BEACON" wordmark in Outfit 42px/700 with 4px letter-spacing, and
"MCP MONITORING" subtitle in Inter 14px/500 below. Use this on the landing
page hero, marketing materials, and official communications.

**Clear space:** Minimum 1x the icon width (60px) on all sides.
**Minimum size:** 120px wide for digital, 30mm for print.
**Color rules:** Icon uses navy (#1A1A2E) fill with orange (#F97316) stroke
  and accent. Wordmark is always navy on light backgrounds, white on dark.
  Never recolor the logo — it only appears in its canonical palette or solid
  white on dark backgrounds.

### Icon Mark

`logo-v1-minimal.svg` — Hexagon with beacon dot and radiating signal lines.
Used as favicon, app icon, and loading spinners. The purest expression of
the brand. Minimum size 16×16px (favicon). At sizes below 24px, remove the
radiating lines and use only the hexagon + dot.

### Alternate Marks

- **Lettermark** (`logo-v2-lettermark.svg`) — Hexagon with a bold "B" inside.
  Use in tightly constrained spaces: social media avatars, browser tabs,
  mobile app icons.
- **Lighthouse** (`logo-v3-lighthouse.svg`) — Hexagon with lighthouse tower
  and beacon beam. Use in storytelling contexts, About pages, and swag.
  The richest conceptual mark.
- **Abstract** (`logo-v5-abstract.svg`) — Segmented hexagon with gradient
  opacity slices. Use as a decorative background texture at 2-6% opacity,
  hero section ambient elements, and loading states.

### What NOT to Do with the Logo

- Never stretch, skew, or rotate the logo
- Never change the logo colors (exception: all-white on dark backgrounds)
- Never place the logo on a busy background without sufficient contrast
- Never use the logo as a replacement for the word "Beacon" in body copy
- Never add drop shadows, gradients, or effects to the logo

---

## Colors

The palette is built on three pillars:

- **Warm Orange (#F97316)** — the brand anchor. Used for primary CTAs, the
  logo mark, key data highlights, and interactive accents. Its warmth counters
  the analytical cold of monitoring dashboards.
- **Deep Navy (#1A1A2E)** — the analytical foundation. Used for text on light
  backgrounds and as the dark mode surface. Grounds the vibrant orange.
- **Light Gray (#F5F5F5)** — breathing room. The primary page background for
  light mode. Keeps layouts airy and scannable.

### Full Palette

| Token | Value | Usage |
|---|---|---|
| `primary` | #F97316 | Primary buttons, logo, key accents |
| `primary-dark` | #EA580C | Button hover, pressed states |
| `primary-light` | #FDBA74 | Subtle orange highlights, chart fills |
| `primary-ghost` | #FFF7ED | Tag backgrounds, feature icon backgrounds |
| `surface-dark` | #1A1A2E | Dark mode text, footer background |
| `surface-mid` | #16213E | Dark mode cards |
| `surface-hover` | #1C2A4A | Dark mode hover states |
| `surface-card` | #FFFFFF | Light mode cards, inputs |
| `surface-dashboard` | #0F1629 | Dashboard page background |
| `bg-page` | #F5F5F5 | Light mode page background |
| `bg-dark` | #0A0E1A | Dark mode page background |
| `text-primary` | #1A1A2E | Body text on light |
| `text-secondary` | #6B7280 | Supporting text |
| `text-muted` | #9CA3AF | Disabled, placeholder, tertiary |
| `text-on-dark` | #F5F5F5 | Text on dark surfaces |
| `text-on-primary` | #FFFFFF | Text on orange buttons |
| `border` | #E5E7EB | Light mode borders |
| `border-dark` | #2D3748 | Dark mode borders |
| `success` | #10B981 | Positive metrics, success states |
| `warning` | #F59E0B | Warnings, budget alerts |
| `error` | #EF4444 | Errors, critical alerts |
| `info` | #3B82F6 | Informational, links |

### Semantic Color Usage

- **Success (#10B981):** Agent online, deployment healthy, metric trending up
  (good), checkmarks, confirmation toasts
- **Warning (#F59E0B):** Budget at 80%, agent degraded, metric trending flat,
  "needs attention" badges
- **Error (#EF4444):** Agent offline, deployment failed, metric spiking
  (bad), destructive button hover, validation errors
- **Info (#3B82F6):** Links, tooltips, "new feature" badges, secondary chart
  series

### Dark Mode

Dashboard surfaces use `#0F1629` (slightly blue-tinted dark) for reduced eye
strain during extended monitoring sessions. Cards lift to `#16213E`, hover
states to `#1C2A4A`. Dark mode elevates through luminosity, not shadow —
cards use `surface-mid` against `surface-dark` rather than shadow casting.

In dark mode, the orange primary remains unchanged (#F97316). Text inverts:
body text becomes #F5F5F5, secondary becomes #9CA3AF, muted becomes #6B7280.
The orange ghost background shifts from #FFF7ED to rgba(249,115,22,0.1).

### Accessibility

Primary orange (#F97316) on white achieves WCAG AA for large text (3.1:1).
For small body text, use #1A1A2E on white (14.5:1, AAA). Primary buttons
always use white text — the contrast is 3.5:1 (AA for large text, close to
AA for body). In dark mode, #F5F5F5 on #0F1629 achieves 13.2:1 (AAA).

---

## Typography

**Outfit** for headings — geometric sans-serif with distinct character.
Its rounded terminals echo the hexagon's soft corners, and its tall x-height
gives headings authority without shouting.

**Inter** for body — the workhorse of modern SaaS. Highly readable at small
sizes, excellent hinting for screen use, and a neutral personality that lets
Outfit own the headlines.

**JetBrains Mono** for code — in SDK docs, dashboard code snippets, and
technical labels. Matches the precision of the monitoring domain.

### Type Scale

| Token | Family | Size | Weight | Line | Letter | Use |
|---|---|---|---|---|---|---|
| `h1` | Outfit | 56px/3.5rem | 700 | 1.1 | -0.02em | Page titles |
| `h2` | Outfit | 40px/2.5rem | 700 | 1.2 | -0.01em | Section headings |
| `h3` | Outfit | 28px/1.75rem | 600 | 1.3 | 0 | Card titles |
| `h4` | Outfit | 20px/1.25rem | 600 | 1.4 | 0 | Subsection titles |
| `body-lg` | Inter | 18px/1.125rem | 400 | 1.7 | 0 | Hero paragraphs, lead text |
| `body-md` | Inter | 16px/1rem | 400 | 1.6 | 0 | Body copy, form labels |
| `body-sm` | Inter | 14px/0.875rem | 400 | 1.5 | 0 | Secondary text, nav links |
| `caption` | Inter | 12px/0.75rem | 500 | 1.4 | 0.05em | Labels, meta, badges |
| `mono` | JetBrains Mono | 14px/0.875rem | 400 | 1.6 | 0 | Code, metrics, timestamps |

### Font Loading

Google Fonts import:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
```

CSS variables:
```css
--font-heading: 'Outfit', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Typography Rules

- Headings: Outfit exclusively. Never use Inter for h1-h4.
- Body: Inter exclusively. Never use Outfit for paragraphs.
- Maximum 2 type families on any single surface (Outfit + Inter).
- JetBrains Mono counts as a utility face — it may appear alongside the main
  two in docs and dashboards.
- Never center-align body text longer than 2 lines.
- Use `text-secondary` (#6B7280) for body copy — pure `text-primary` is reserved
  for headings and key data points.

---

## Iconography

MCP Beacon uses a consistent icon system built on three tiers:

### Tier 1: Feature Icons (48×48px)
Used in feature cards and marketing sections. Rendered as emoji in HTML
prototypes (📡💰🔔📊🔌🔐). Production should use a custom SVG icon set with
the following properties:
- 48×48px viewBox
- 2px stroke weight, rounded caps and joins
- Orange (#F97316) fill on orange-ghost (#FFF7ED) background
- 12px border radius on the icon container

### Tier 2: UI Icons (18-24px)
Used in navigation, buttons, and inline actions. Use a consistent 24×24px
viewBox, 1.5px stroke weight. Color inherits from parent text color.
Common icons: dashboard, agents, cost, settings, search, bell, user, chevron.

### Tier 3: Status Indicators (8-10px)
Small colored dots indicating agent or deployment status:
- Green (#10B981): active, healthy, online
- Yellow (#F59E0B): degraded, warning, paused
- Red (#EF4444): error, offline, failed
- Gray (#9CA3AF): inactive, unknown, disconnected

### Icon Rules
- Always pair icons with text labels in navigation — never icon-only
- Feature icons must sit on an orange-ghost background
- Status dots are 8px minimum, always circular
- Never use the beacon hexagon as a generic bullet or list marker

---

## Spacing & Layout

### Grid
12-column, 1280px max-width container with 24px gutters. The asymmetric
option (8+4 or 7+5 split) is preferred for content-heavy sections to avoid
the "symmetrical SaaS card grid" trap.

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Icon-to-label gaps, tight inline spacing |
| `sm` | 8px | Related element groups, list item gaps |
| `md` | 16px | Card padding, form field gaps, standard rhythm |
| `lg` | 24px | Section element gaps, card grid gutters |
| `xl` | 32px | Major content separation |
| `2xl` | 48px | Section title to content distance |
| `3xl` | 64px | Section padding (tablet) |
| `4xl` | 96px | Section padding (desktop) |

### Vertical Rhythm
- Section padding: 96px desktop, 64px tablet, 48px mobile
- Card gaps: 24px (grid), 16px (stacked)
- Content groups within cards: 16px separation
- Hero section: 160px top padding (to clear fixed nav) + 96px bottom

### Breakpoints

| Token | Width | Layout Change |
|---|---|---|
| `sm` | 640px | Single column, sidebar collapses |
| `md` | 768px | Landing page collapses to single column |
| `lg` | 1024px | Pricing/how-to grids go single column |
| `xl` | 1280px | Full desktop layout, max-width container |

### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
```

---

## Elevation & Depth

Flat design with subtle elevation cues:

| Surface | Light Mode | Dark Mode |
|---|---|---|
| Page background | #F5F5F5, no shadow | #0F1629, no shadow |
| Cards | #FFFFFF, 1px border + shadows.md | #16213E, 1px border-dark |
| Navigation | rgba(255,255,255,0.85), backdrop-blur | rgba(10,14,26,0.9), backdrop-blur |
| Modals/Dialogs | #FFFFFF, shadows.xl + backdrop blur | #16213E, 1px border + shadows.xl |
| Tooltips | #1A1A2E, shadows.md | #1C2A4A, 1px border |

### Elevation Interactions

- **Hover cards:** scale(1.01) + shadows.lg, border-color shifts to orange-light
- **Hover nav items:** background shifts to orange-ghost, text becomes orange
- **Dashboard widgets:** flat, no shadow, separated by 1px borders
- **Active/pressed:** no scale, background darkens to primary-dark

### Dark Mode Elevation
Dark mode elevates through luminosity, not shadow — cards use `surface-mid`
against `surface-dark`. The progression is:
bg-dark → surface-dashboard → surface-mid → surface-hover

---

## Shapes & Border Radius

No sharp corners in the MCP Beacon design language — the logo's hexagon
uses rounded corners, and every UI element follows suit.

### Radius Scale

| Token | Value | Usage |
|---|---|---|
| `sm` | 4px | Code blocks, inline code, chart bars, small badges |
| `md` | 8px | Buttons, inputs, dropdowns, nav items, sidebar items |
| `lg` | 12px | Cards, panels, chart containers (dashboard) |
| `xl` | 16px | Modals, hero cards, pricing cards, CTA sections |
| `full` | 9999px | Pills, tags, status badges, avatars |

### Radius Rules
- Default: 8px (md). This is the most common radius.
- Cards: 12px (lg) for dashboard, 16px (xl) for landing page
- The only 0px radius elements: none visible to the user. Even code blocks
  have 4px (sm) radius in the SDK docs.

---

## Motion & Animation

### Principles
- **Quick, not flashy.** Animations should complete in 150-600ms.
- **Purposeful.** Every motion communicates state change.
- **Consistent easing.** Use ease-out for entrances, ease for interactions.

### Animation Tokens

| Token | Value | Usage |
|---|---|---|
| `fadeUp` | fadeUp 0.6s ease-out | Section entrance animations |
| `fadeIn` | fadeIn 0.3s ease-out | Modal appearances, toast notifications |
| `hoverLift` | transform 0.2s ease, box-shadow 0.2s ease | Card hover effects |
| `colorTransition` | 0.15s ease | Color, background, and border transitions |

### Keyframe Definitions

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Animation Patterns

| Pattern | Duration | Easing | Trigger |
|---|---|---|---|
| Page section entrance | 0.6s | ease-out | Scroll into view |
| Hero elements stagger | 0.6s + 0.1s/child delay | ease-out | Page load |
| Card hover lift | 0.2s | ease | Mouse enter |
| Button hover glow | 0.2s | ease | Mouse enter |
| Modal open | 0.3s | ease-out | Trigger click |
| Toast/snackbar | 0.3s slide-up + auto-dismiss 4s | ease-out | Event |
| Loading spinner | infinite 1.5s | linear | Async operation |
| Skeleton pulse | infinite 1.5s | ease-in-out | Data loading |
| Chart bar grow | 0.4s | ease-out | Data load |

### Staggered Animations
Landing page hero uses staggered fadeUp with 0.1s delays between children:
- h1: 0s delay
- p: 0.1s delay
- CTA buttons: 0.2s delay
- Hero visual/card: 0.3s delay

---

## Components

### button-primary
Full orange fill (#F97316), white text, 8px radius, 12px 24px padding.
The only high-emphasis action on any given screen. Use sparingly — one per
section maximum. Hover deepens to #EA580C with translateY(-1px) and glow
shadow. Font: Inter 15px/600.

**States:**
- Default: #F97316 background, white text
- Hover: #EA580C, translateY(-1px), shadow-glow
- Active/Pressed: #EA580C, translateY(0), no shadow
- Focus: 2px orange outline, 2px offset
- Disabled: #FDBA74, cursor not-allowed
- Loading: Show spinner (16px) + "Loading..." text, maintain width

### button-secondary
Outline style: transparent background, 1.5px orange border, orange text.
Used for secondary actions, "Learn more" links, cancel operations. Same
padding and typography as primary. Hover fills with orange-ghost background.

**States:**
- Default: transparent, orange border + text
- Hover: orange-ghost background
- Active: orange-ghost background, border darkens
- Focus: Same as primary
- Disabled: border #D1D5DB, text #D1D5DB

### tag / badge
Pill shape (9999px radius), 4px 12px padding. Orange-ghost background with
orange text. Used for feature labels, status indicators, and category badges.
Font: Inter 12px/500, uppercase 0.1em letter-spacing.

**Status variants:**
- Default: orange-ghost bg, orange text
- Success: rgba(16,185,129,0.15) bg, #10B981 text
- Warning: rgba(245,158,11,0.15) bg, #F59E0B text
- Error: rgba(239,68,68,0.15) bg, #EF4444 text
- Info: rgba(59,130,246,0.15) bg, #3B82F6 text

### card
White surface (light) or surface-mid (dark), 12-16px radius, 1px border +
soft shadow. Used for feature cards, pricing tiers, dashboard widgets.
Hover lifts 2px with shadow-lg and orange-light border.

**Dashboard card:** #16213E background, 1px border-dark, 12px radius, 20-24px
padding. Hover shifts border to orange.

**Pricing card:** #FFFFFF, 16px radius, 32px padding, shadow-md. Highlighted
card has 2px orange border and shadow-glow.

### input
White background (light) or surface-mid (dark), 1px border, 8px radius,
10px 16px padding. Font: Inter 16px/400.

**States:**
- Default: 1px #E5E7EB border
- Hover: border shifts to #D1D5DB
- Focus: 2px orange ring (#F97316), 2px offset from border
- Error: 1px #EF4444 border + red helper text below
- Disabled: bg #F9FAFB, text #9CA3AF, cursor not-allowed
- Placeholder: #9CA3AF

### section-label
Monospace label used above section titles. Font: JetBrains Mono 12px/500,
orange text, uppercase 0.1em letter-spacing, pill background (orange-ghost),
4px 12px padding. Example: "FEATURES", "HOW IT WORKS", "PRICING".

### navigation
**Landing nav:** Fixed top, 64px height, rgba(255,255,255,0.85) with
backdrop-blur(12px), 1px bottom border. Logo on left (32px icon + Outfit
20px/700 wordmark), links in center (Inter 14px/500, text-secondary,
hover → orange), CTA button on right.

**Dashboard sidebar:** Fixed left, 240px width, surface-mid (#16213E)
background, 1px right border. Logo at top (28px icon + Outfit 18px/700),
nav links with 18px icons + Inter 14px text, active state uses orange-ghost
bg + orange text. User section at bottom with 32px orange avatar circle.

**SDK docs topnav:** Fixed top, 56px height, navy (#1A1A2E) background.
Logo left, search center (320px), theme toggle + links right.

---

## Page Templates & Layouts

### Landing Page

```
┌──────────────────────────────────────────┐
│  NAV (fixed, 64px)                       │
├──────────────────────────────────────────┤
│  HERO (160px top, 96px bottom)           │
│  - Large hexagon bg (4% opacity)         │
│  - h1 + span.orange + p + CTA buttons    │
│  - Hero visual: dashboard preview card   │
├──────────────────────────────────────────┤
│  FEATURES (white/dark bg, 96px sections) │
│  - 6-card grid, 3×2 desktop, 1-col mob  │
│  - Icon (48px) + h3 + p per card         │
├──────────────────────────────────────────┤
│  HOW IT WORKS (gray/dark bg)             │
│  - 3-step horizontal flow                │
│  - Number circles (72px, orange border)  │
│  - Connector lines between steps         │
├──────────────────────────────────────────┤
│  PRICING (white/dark bg)                 │
│  - 3-card grid, center card highlighted  │
│  - Highlight: 2px orange border + glow   │
│  - Badge on highlighted: orange pill     │
├──────────────────────────────────────────┤
│  FAQ (gray/dark bg)                      │
│  - Accordion, max-width 720px            │
│  - +/- toggle in orange                  │
├──────────────────────────────────────────┤
│  CTA (white/dark bg)                     │
│  - Navy gradient banner, 64px padding    │
│  - White button on navy, orange ghost bg │
├──────────────────────────────────────────┤
│  FOOTER (navy bg, 64px top padding)      │
│  - 4-column grid: brand + 3 link cols    │
│  - Bottom bar: copyright + legal links   │
└──────────────────────────────────────────┘
```

### Dashboard Layout

```
┌──────────┬───────────────────────────────────┐
│ SIDEBAR  │  TOP BAR                          │
│ 240px    │  h1 (24px) + time range selector  │
│ ┌──────┐ │                                    │
│ │ LOGO │ ├───────────────────────────────────┤
│ └──────┘ │  METRIC CARDS (4-col, 16px gap)   │
│          │  ┌──────┐ ┌──────┐ ┌──────┐ ┌───┐ │
│ NAV      │  │Active│ │Calls │ │Error │ │$  │ │
│ ──────── │  └──────┘ └──────┘ └──────┘ └───┘ │
│ Overview │                                    │
│ Agents   ├───────────────────────────────────┤
│ Cost     │  CONTENT ROW (2:1 split)          │
│ Alerts   │  ┌──────────────┐ ┌────────────┐  │
│ Settings │  │  CHART       │ │ AGENT LIST │  │
│          │  │  bar chart   │ │ live list  │  │
│ ──────── │  │  + summary   │ │ + status   │  │
│ USER     │  └──────────────┘ └────────────┘  │
└──────────┴───────────────────────────────────┘
```

### Cost Panel Layout

```
┌──────────────────────────────────────────────┐
│  HEADER: h1 + p subtitle                     │
├──────────────────────────────────────────────┤
│  SUMMARY CARDS (4-col: Total, Today, MTD, Δ) │
├──────────────────────────────────────────────┤
│  MAIN GRID (2-col)                           │
│  ┌─────────────────┐ ┌──────────────────┐   │
│  │ DONUT CHART     │ │ BAR CHART        │   │
│  │ cost breakdown  │ │ per-agent cost   │   │
│  └─────────────────┘ └──────────────────┘   │
├──────────────────────────────────────────────┤
│  BUDGET SECTION (2-col)                      │
│  ┌─────────────────┐ ┌──────────────────┐   │
│  │ Monthly Budget  │ │ Per-Agent Cap    │   │
│  └─────────────────┘ └──────────────────┘   │
├──────────────────────────────────────────────┤
│  DETAIL TABLE (full width)                   │
└──────────────────────────────────────────────┘
```

### SDK Documentation Layout

```
┌──────────────────────────────────────────────┐
│  TOPNAV (navy, 56px): Logo · Search · Links  │
├───────────┬──────────────────────────────────┤
│ SIDEBAR   │  MAIN CONTENT                    │
│ 280px     │  Breadcrumb                      │
│           │  h1 page title                   │
│ Guides    │  p intro                         │
│ ────────  │                                   │
│ API Ref   │  ## Section (bordered bottom)    │
│ ────────  │  prose + inline code             │
│ SDKs      │                                   │
│ ────────  │  ```code blocks```               │
│ Resources │  (navy bg, mono font)            │
│           │                                   │
│           │  !!! callout (orange left border) │
└───────────┴──────────────────────────────────┘
```

### Responsive Adaptations

At **md (768px)** and below:
- Landing: Single column, nav collapses (hamburger menu), hero padding reduces
- Dashboard: Sidebar collapses to bottom tab bar
- Docs: Sidebar becomes a toggle overlay
- Pricing/How-to: Single column, max 400px centered
- Footer: 1-2 column grid

At **sm (640px)** and below:
- All layouts single column
- Section padding: 48px
- Hero padding: 120px top
- Cards stack vertically with 16px gap

---

## Data Visualization

### Chart Color Palette

| Series | Color | Usage |
|---|---|---|
| Primary | #F97316 | Main metric, call volume |
| Secondary | #3B82F6 | Comparison metric, secondary series |
| Tertiary | #8B5CF6 | Third series (cost breakdowns) |
| Success | #10B981 | Positive deltas, health metrics |
| Warning | #F59E0B | Threshold warnings, budget usage |
| Error | #EF4444 | Error rates, anomaly spikes |
| Neutral | #6B7280 | Baselines, targets, reference lines |

### Chart Types & Styling

**Bar Charts (Dashboard):**
- Bar width: max 36px, flex-1 for responsiveness
- Border radius: 4px top corners only
- Gap between bars: 8px
- Hover: opacity 0.85, scaleY 1.02
- Dark mode: bars on #16213E surface
- X-axis labels: JetBrains Mono 10px, text-muted
- Summary stats below: Outfit 20px/700 values + Inter 11px labels

**Donut/Pie Charts (Cost Panel):**
- 160px diameter donut, rotated -90deg
- Center: Outfit 24px/700 total + Inter 11px label
- Legend: 10px color dots, Inter 13px name, Mono 12px cost, Mono 13px pct
- Segment colors follow chart palette

**Budget Progress Bars:**
- Track: 10px height, bg color (dark: #0F1629, light: #F5F5F5), 5px radius
- Fill: height 100%, 5px radius, color scales with percentage:
  - 0-60%: #10B981 (green)
  - 60-85%: #F59E0B (yellow)
  - 85-100%: #EF4444 (red)
- Status badge: 11px/600, uppercase, matching color

**Line/Area Charts (if introduced):**
- Line width: 2px
- Area fill: 10% opacity of line color
- Data points: 4px circles on hover
- Grid lines: 1px border-dark/light

### Chart Rules
- Always label axes with JetBrains Mono
- Always include a legend for multi-series charts
- Use bar charts for discrete time periods, donut for proportions
- Never use 3D or skeuomorphic chart styles
- Animate chart data changes with 0.4s ease-out transitions

---

## UI States

Every component must handle these states — no exceptions.

### Loading States

**Skeleton screens:** Gray placeholder blocks (#E5E7EB light / #2D3748 dark)
that pulse with opacity animation (1.5s infinite ease-in-out). Match the
approximate size and shape of the content they replace.

**Spinners:** 24-32px circular spinner with orange (#F97316) stroke, 3px
stroke width, 25% dash length. Animates with `spin 0.8s linear infinite`.
Use for inline loading (buttons, search) and full-page loading screens.

**Progressive loading:** Show metric card skeletons first (fast), then chart
skeletons, then detail lists. Prioritize above-the-fold content.

### Empty States

When there's no data to show:
- **Icon:** 80px circle, orange-ghost background, 2px dashed orange border,
  32px emoji/SVG icon centered
- **Title:** Outfit 20px/700
- **Description:** Inter 14px, text-secondary, max 280px
- **Action:** Primary or secondary button below description
- **Code hint (onboarding):** If applicable, show a code snippet in a navy
  code block (JetBrains Mono 12px, orange text) with the setup command

Example empty states:
- "No agents connected" — shows setup code snippet
- "No cost data yet" — shows "Start monitoring to see costs"
- "No alerts" — positive empty state, "All clear! 🎉"

### Error States

When something goes wrong:
- **Icon:** 48px error indicator (red circle with exclamation)
- **Title:** Outfit 18px/600
- **Description:** Inter 14px, text-secondary
- **Actions:** "Retry" primary button + "Contact support" secondary link
- **Error detail (optional):** Collapsible code block with error message
  in JetBrains Mono on navy background

### Success States

Brief confirmation after user action:
- Toast notification: 4px left orange border, white/surface-mid background,
  12px radius, slides in from top-right over 0.3s
- Checkmark icon (green #10B981) + message in Inter 14px
- Auto-dismiss after 4 seconds
- Stack toasts if multiple (max 3 visible)

---

## Photography & Imagery

MCP Beacon is a technical product — avoid generic stock photography of
people in offices or exaggerated "AI" imagery (glowing brains, robot hands).

### Acceptable Imagery
- Abstract geometric patterns based on the hexagon motif (2-6% opacity)
- Dashboard and UI screenshots (real product, not mockups)
- Technical diagrams and architecture illustrations
- Code snippets styled as visual elements
- Dark, atmospheric backgrounds with orange accent lighting

### Unacceptable Imagery
- Generic stock photos of people
- AI clichés: glowing brains, robot hands, circuit board patterns
- Overly colorful or playful illustrations
- Gradients that don't use the brand palette
- Unsplash-style "startup office" photos

---

## Brand Voice & Copywriting

### Tone of Voice
We are an experienced engineer explaining things to a peer. We are:
- **Clear** — no jargon without explanation
- **Confident** — we know this domain, no hedging
- **Helpful** — every sentence should either inform or guide action
- **Warm** — not cold or robotic; "we" and "you" are welcome

### Copy Patterns

**Headlines:** Short, benefit-driven. Prefer active verbs.
- ✓ "Monitor Your AI Agents With Clarity"
- ✓ "Three steps to clarity"
- ✓ "Everything you need to keep agents on track"
- ✗ "A Comprehensive Solution for AI Agent Monitoring and Observability"

**Body copy:** One idea per paragraph. Lead with the benefit, follow with the
detail. Keep paragraphs under 3 sentences.
- ✓ "Watch every agent call, tool invocation, and response in real time.
  Spot issues before they become incidents."
- ✗ "Our platform provides comprehensive real-time monitoring capabilities
  that enable you to observe..."

**CTAs:** Action verb + clear outcome. 2-4 words.
- ✓ "Start Free Trial"
- ✓ "See How It Works"
- ✓ "Contact Sales"
- ✗ "Click Here to Get Started With Our Platform Today"

**Error messages:** Say what happened, why, and what to do.
- ✓ "Agent connection lost. Check your MCP server is running, then retry."
- ✗ "Error 500: Internal Server Error"

**Empty states:** Be encouraging. Show the path forward.
- ✓ "No agents connected yet. Add the Beacon proxy URL to get started."
- ✗ "No data available."

---

## Do's and Don'ts

### Layout & Spacing

| Do | Don't |
|---|---|
| Use 1280px max-width container | Let content stretch edge-to-edge on wide screens |
| Use asymmetric column splits (7+5, 8+4) | Default to equal-width columns everywhere |
| Section padding: 96/64/48px (desk/tab/mob) | Use arbitrary padding per section |
| One primary button per section | Multiple competing orange buttons |
| Generous white space around cards | Cramped layouts with tight margins |

### Color

| Do | Don't |
|---|---|
| Pair warm orange with generous white/navy space | Saturate a page with orange |
| Use orange for ONE accent per component | Use orange for borders, text, bg, and icon all at once |
| Dark mode: use luminosity for elevation | Use box-shadows in dark mode |
| Semantic colors only for their meaning | Green for a "delete" button, red for "success" |
| Text-secondary (#6B7280) for body copy | Pure black or pure navy for paragraphs |

### Typography

| Do | Don't |
|---|---|
| Outfit for headings only | Outfit in body text or UI labels |
| Inter for all body, UI, and labels | Mix more than 2 type families on one surface |
| Use the type scale tokens | Invent custom font sizes |
| Left-align body text | Center-align body text longer than 2 lines |
| JetBrains Mono for code and metrics | Monospace for marketing headlines |

### Logo

| Do | Don't |
|---|---|
| Maintain clear space (1× icon width) | Crowd the logo with other elements |
| Use canonical colors or all-white on dark | Tint, recolor, or add effects to the logo |
| Use appropriate variant for the context | Use the horizontal logo as a favicon |
| Hexagon mark at 2-6% opacity as bg texture | Use the logo as a decorative pattern |

### Components

| Do | Don't |
|---|---|
| Define loading, empty, and error states | Ship a component that only handles happy path |
| Round all corners (4px minimum) | Use sharp 0px corners anywhere visible |
| Use consistent shadow tokens | Mix hard and soft shadows arbitrarily |
| Hover states on all interactive elements | Static cards that don't respond to cursor |
| Focus rings on all inputs and buttons | Rely on default browser focus styles |

### Motion

| Do | Don't |
|---|---|
| Animations under 600ms | Slow, elaborate animations |
| Stagger entrance animations (0.1s delays) | Animate everything at once |
| ease-out for entrances, ease for interactions | Linear or ease-in for UI animations |
| Animate chart data changes | Jump-cut between data states |

### Data Visualization

| Do | Don't |
|---|---|
| Label axes with JetBrains Mono | Unlabeled or decorative charts |
| Use consistent chart color palette | Ad-hoc colors per chart |
| Bar charts for discrete time, donut for proportions | 3D charts, pie charts with 6+ segments |
| 0.4s ease-out transitions on data change | Instant or jittery data updates |

---

## File Inventory

All design assets live in `design/`:

| File | Description |
|---|---|
| `DESIGN.md` | This brand guide |
| `logo-v1-minimal.svg` | Icon mark — hexagon + beacon dot |
| `logo-v2-lettermark.svg` | Lettermark — hexagon + "B" |
| `logo-v3-lighthouse.svg` | Lighthouse concept variant |
| `logo-v4-horizontal.svg` | Primary horizontal logo |
| `logo-v5-abstract.svg` | Abstract segmented hexagon |
| `favicon.svg` | 32×32px favicon |
| `apple-touch-icon.svg` | Apple touch icon |
| `og-image.svg` | Open Graph social preview |
| `landing-page.html` | Landing page reference implementation |
| `dashboard-overview.html` | Dashboard layout reference |
| `cost-panel.html` | Cost analysis panel reference |
| `all-states-ui.html` | UI state patterns (loading, empty, error) |
| `sdk-docs-style.html` | Documentation site style reference |
