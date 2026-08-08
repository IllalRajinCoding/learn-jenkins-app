# learn-jenkins Design System

## 1. Atmosphere & Identity

A live development console. Dark, quiet, and technical — like the terminal tab you keep open while a pipeline runs. The signature is **the green pipeline line**: a mono-type stage log (`STAGE · 12.4s`) rendered on near-black zinc, with exactly one accent color for "passing". Content is dense where it matters (log lines, assignment numbers) and breathable in between (hero, section gaps). Nothing glows; nothing is animated for its own sake. Every element reads like it belongs in a build log.

## 2td Color

### Palette

Dark is the shipped theme. Light values are declared for future work and must not drift from these hexes.

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/app | `--color-surface-950` | `#FFFFFF` | `#0A0A0D` | Page background |
| Surface/panel | `--color-surface-900` | `#FAFAFA` | `#101013` | Panels, terminal body, code blocks |
| Surface/elevated | `--color-surface-800` | `#F4F4F5` | `#17171B` | Raised cards, hover backgrounds |
| Surface/raised | `--color-surface-700` | `#ECECEE` | `#1F1F25` | Active rows, input fills |
| Text/primary | `--color-ink` | `#09090B` | `#F4F4F5` | Headlines, code foreground |
| Text/secondary | `--color-ink-soft` | `#52525B` | `#A1A1AA` | Body, captions |
| Text/tertiary | `--color-ink-faint` | `#8F8F98` | `#71717A` | De-emphasised meta, placeholders |
| Border/default | `--color-line` | `#E4E4E7` | `#26262E` | Dividers, panel outlines, table rows |
| Border/subtle | `--color-line-soft` | `#F0F0F2` | `#1A1A20` | Soft separations |
| Accent/primary | `--color-accent` | `#4D7C0F` | `#A3E635` | CTAs, hit- marks, links, focus ring |
| Accent/strong | `--color-accent-strong` | `#3F6212` | `#BEF264` | Hover/focus of accent |
| Accent/ink | `--color-accent-ink` | `#FFFFFF` | `#0C0D06` | Text on accent-fill surfaces |
| Status/success | `--color-success` | `#15803D` | `#4ADE80` | Passing stage, confirma-input |
| Status/warning | `--color-warn` | `#B45309` | `#FBBD1C` | Cautions, degraded output |
| Status/error | `--color-danger` | `#B91C1C` | `#F87171` | Failed stage, destructive |
| Status/info | `--color-info` | `#1D4ED8` | `#60A5FA` | Information, branches |

### Rules

- The page is dark. Accent appears only on interactive elements and pipeline status marks — never as decoration.
- `danger` / `warn` / `success` only signal pipeline state. Do not reuse them for generic styling.
- Do not mix `#0A0A`-family grays with warm grays; the system is zinc-based end to end.
- No color outside this table. Extend the table first, then use it.

## 3. Typography

### Scale

| Level | Tailwind | Weight | Line Height | Tracking | Usage |
|-------|----------|--------|-------------|----------|-------|
| Display | `text-5xl md:text-6xl` | 700 | none (`leading-none`) | `tracking-tighter` | Hero headline |
| H2 | `text-3xl md:text-4xl` | 700 | `leading-tight` | `-tracking-tight` | Section headers |
| H3 | `text-xl md:text-2xl` | 600 | `leading-snug` | `-tracking-tight` | Card / group titles |
| Body/lg | `text-lg` | 400 | `leading-relaxed` | 0 | Lead paragraphs |
| Body | `text-base` | 400 | `leading-relaxed` | 0 | Default text |
| Body/sm | `text-sm` | 400 | `leading-relaxed` | 0 | Secondary info |
| Caption | `text-xs` | 500 | `leading-5` | 0 | Metadata, counts |
| Overline | `text-xs uppercase` | 600 | `leading-4` | `tracking-[0.18em]` | Section labels |

### Font Stack

- Primary: `"Space Grotesk Variable", "Space Grotesk", system-ui, sans-serif`
- Mono: `"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace`

### Rules

- Mono is the voice of the build log: stage names, terminal output, commands, hash-like decorations, pipeline numbers. Sans is everything else.
- Mono-adjacent UI at rest (numbers in pipelines) stays mono for continuous scanning.
- Headings that wrap to 3+ lines are too large — reduce size.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a **4px** base — Tailwind's default scale.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight: icon-to-label gaps |
| `--space-2` | 8px | Compact: inline groups, badge padding |
| `--space-3` | 12px | Default: input/button padding |
| `--space-4` | 16px | Standard: terminal line gaps, card padding |
| `--space-5` | 20px | Comfortable: list item padding |
| `--space-6` | 24px | Generous: card padding, form gaps |
| `--space-8` | 32px | Between card groups |
| `--space-10` | 40px | Section internal rhythm |
| `--space-12` | 48px | Sections within a page |
| `--space-16` | 64px | Major section breaks |
| `--space-24` | 96px | Page-level vertical rhythm |

### Grid

- Max content width: **1152px** (`max-w-6xl`). Hero grids may use `max-w-7xl` tall.
- Breakpoints (defaults): `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
- Pair: CSS Grid over flex-math. 12-grid where needed; 2-col asymmetric (2fr/1fr) for feature groupings.
- Mobile override: every asymmetric layout collapses to a single Let column with `px-4` page padding.

### Rules

- Magic numbers are not allowed; every spacing maps to the scale.
- Terminal monospace columns use `gap-x-4` rhythm and align via grid columns, never `white-space: pre` padding tricks.

## 5. Components

### Button

- **Structure**: `button`/`a` with inline-flex, `gap-2`, `px-4 h-10` (or `h-9` compact), `text-sm font-semibold`.
- **Variants**: `primary` (accent fill, accent-ink text, `hover:accent-strong`), `ghost` (transparent, `border-line`, ink text, `hover:surface-800`), `link` (text-accent underline-offset).
- **States**: hover (variant shift), `active:scale-[0.98]` press, `focus-visible:ring-2 ring-accent/60 ring-offset-2 ring-offset-surface-950`.
- **Motion**: 150ms `ease-out` on `transform`/`background-color` only.

### Terminal Panel

- **Structure**: `surface-900`, `border-line` radius `rounded-xl`, header bar (`h-9`, traffic-light dots as bordered squares), body mono `text-[13px]` leading-6, `overflow-x-auto`.
- **States**: content reveals as log lines (staggered `opacity`/`translate-y` on mount). Blinking cursor `▍` at last line while "running"; becomes check when complete.
- **Accessibility**: reveal animation disabled under `prefers-reduced-motion`.

### PipelineStage

> The stage badge: `(index, name, status, duration)` pair rendered inline-terminal.

- **Structure**: `code` w/ mono: `[` + number + `]` + name, right-aligned duration, status glyph (`✓` success / `!` warn / `x` error), colored by status.
- **States**: success (accent), warn, error. Idle stages render `ink-faint`.
- v-garde: satisfies screen-reader camelCase of status text.

### StatusBadge

> Small pill for difficulty / status labels.

- **Structure**: `inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium`.
- **Variants**: by token — `success` (green border/ink), `warning` (warn border), `ink` (line border, ink-soft).
- **Motion**: no motion; `transition-colors` only if interactive later.

### TaskRow

> Assignment list item, used 2+ times (task + task step).

- **Structure**: `grid gap-2 md:grid-cols-[auto_1fr_auto]` row between `divide-y divide-line` or `border-t` rows; index in mono (`[T-01]`), title, difficulty badge, "bila" checktext.
- **States**: hover raises surface to `surface-800` only when the row is a link.

### CodeBlock

- **Structure**: `bg-950 w/ inner panel`, `border-line rounded-lg`, top chrome row with filename in mono `text-xs ink-faint`, body `font-mono text-[13px] leading-6 overflow-x-auto`.
- **State**: optional `data-copy` button dormant for now.

### SectionLabel

- **Structure**: overline mono `text-xs uppercase tracking-[0.18em]` with `08` prefix decor (`// 01`), paired with H1/H2 white.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150ms | `ease-out` | Button press, badge hover, cursor blink |
| Standard | 250ms | `ease-out` | Nav → section scroll, panel appear |
| Emphasis | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entry, log-line reveal, marquee |
| Loop | 1.1s step | `steps(2)` | Cursor blink / pulse "running" dot |

### Rules

- Transform + opacity only. Never animate `top/left/width/height/buttom/ margin`.
- Every interactive element carries: hover, `:active (scale 0.98 + translateY up to 1)`, `:focus-visible` ring, disabled state where relevant.
- Log reveal uses staggered `animation-delay` on children with `opacity` + `translateY(6px)`.
- `prefers-reduced-motion`: reveal animations and blink are disabled; states still work.
- No scroll listeners; no scrolljacking (page content has no scroll-driven visuals).

## 7. Depth & Surface

### Strategy: **borders-only + tonal shift to edges**

- Surfaces separate by `border-line` and slight tone steps (950 → 900 → 800). No box-shadows anywhere on the page; one `bg-neutral/blur-sm` only on the sticky nav.
- Interactive elements signal state by background tone change (`surface-800 → 700`), not shadow.
- The terminal bevel is a 1px `border-line` against surface-900 which sits on surface-950 — tonal shift does the lifting.
- Rounded: `rounded-xl` (lg panels) / `rounded-lg` (code, inputs) / `rounded-full` (pills, dots). Never rounded-2xl+ architectural shapes.

### Compliance rule

Every audit step asserts: no `box-shadow`, no raw hex outside this file, every font-size/spacing value traceable, components reused twice documented here. A component borrowed from another project is adapted to these tokens — never `as any`.