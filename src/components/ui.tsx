import type { JSX } from 'solid-js';
import type { Difficulty } from '../data';

/* ---------- Icons (inline SVG, stroke 2, lucide-style) ---------- */

export type IconName =
  | 'arrow-right'
  | 'alert'
  | 'bell'
  | 'box'
  | 'check'
  | 'clock'
  | 'git-branch'
  | 'github'
  | 'layers'
  | 'menu'
  | 'play'
  | 'shield-check'
  | 'x';

const ICON_PATHS: Record<IconName, JSX.Element> = {
  check: <path d="M20 6 9 17l-5-5" />,
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  alert: (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  'git-branch': (
    <>
      <circle cx="6" cy="6" r="3" />
      <path d="M6 9v9a3 3 0 0 0 3 3h6" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 6h3a3 3 0 0 1 3 3v3" />
      <path d="M18 6h-3a3 3 0 0 0-3 3" />
    </>
  ),
  box: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="m3.27 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  'shield-check': (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  layers: (
    <>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  play: <path d="m5 3 14 9-14 9V3z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
};

export function Icon(props: { name: IconName; class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class={props.class ?? 'h-4 w-4'}
    >
      {ICON_PATHS[props.name]}
    </svg>
  );
}

/* ---------- Button ---------- */

export type ButtonVariant = 'primary' | 'ghost' | 'link';

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-strong',
  ghost: 'border border-line bg-transparent text-ink hover:bg-surface-800',
  link: 'text-ink-soft hover:text-ink',
};

const BUTTON_BASE =
  'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.98]';

export function Button(props: {
  href?: string;
  variant?: ButtonVariant;
  class?: string;
  children: JSX.Element;
}) {
  const cls = `${BUTTON_BASE} ${BUTTON_VARIANT[props.variant ?? 'primary']} ${props.class ?? ''}`;
  return (
    <a href={props.href ?? '#'} class={cls}>
      {props.children}
    </a>
  );
}

/* ---------- Status / difficulty badge ---------- */

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  pemula: 'border-success/40 text-success',
  menengah: 'border-warn/40 text-warn',
  lanjut: 'border-info/40 text-info',
};

export function DifficultyBadge(props: { level: Difficulty }) {
  return (
    <span
      class={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs ${DIFFICULTY_STYLE[props.level]}`}
    >
      {props.level}
    </span>
  );
}

/* ---------- Section label ---------- */

export function SectionLabel(props: { index: string; children: JSX.Element }) {
  return (
    <p class="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
      <span class="text-accent">{props.index}</span>
      <span class="text-line"> // </span>
      {props.children}
    </p>
  );
}

/* ---------- Code block ---------- */

export function CodeBlock(props: { filename?: string; children: JSX.Element }) {
  return (
    <figure class="overflow-hidden rounded-lg border border-line bg-surface-900">
      <figcaption class="flex h-9 items-center justify-between border-b border-line px-4">
        <span class="font-mono text-xs text-ink-faint">{props.filename ?? 'terminal'}</span>
        <span class="h-2 w-2 rounded-full bg-surface-700" />
      </figcaption>
      <pre class="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-ink">
        {props.children}
      </pre>
    </figure>
  );
}