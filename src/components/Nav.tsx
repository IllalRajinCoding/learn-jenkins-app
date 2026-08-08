import { For, createSignal } from 'solid-js';
import { NAV_LINKS } from '../data';
import { Button, Icon } from './ui';

export function Nav() {
  const [open, setOpen] = createSignal(false);

  return (
    <header class="sticky top-0 z-40 border-b border-line-soft bg-surface-950/85 backdrop-blur">
      <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6" aria-label="Navigasi utama">
        <a href="#top" class="flex items-center gap-2 rounded-md font-mono text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
          <span class="grid size-7 place-items-center rounded-md border border-line bg-surface-900 text-accent">
            <Icon name="play" class="h-3.5 w-3.5" />
          </span>
          learn-jenkins
        </a>

        <ul class="hidden items-center gap-1 md:flex">
          <For each={NAV_LINKS}>
            {(link) => (
              <li>
                <a
                  href={link.href}
                  class="rounded-md px-3 py-2 text-sm text-ink-soft transition-colors duration-150 hover:bg-surface-800 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {link.label}
                </a>
              </li>
            )}
          </For>
        </ul>

        <div class="hidden items-center gap-3 md:flex">
          <span class="inline-flex items-center gap-2 rounded-full border border-success/40 px-3 py-1 font-mono text-xs text-success">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            pipeline: passing
          </span>
          <Button href="#tugas" variant="ghost">
            Mulai
          </Button>
        </div>

        <button
          type="button"
          class="grid size-10 place-items-center rounded-md border border-line text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:hidden"
          aria-label={open() ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open()}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open() ? 'x' : 'menu'} />
        </button>
      </nav>

      {open() && (
        <div class="border-t border-line-soft bg-surface-950 px-4 pb-4 pt-2 md:hidden">
          <ul class="flex flex-col gap-1">
            <For each={NAV_LINKS}>
              {(link) => (
                <li>
                  <a
                    href={link.href}
                    class="block rounded-md px-3 py-2.5 text-sm text-ink-soft hover:bg-surface-800 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </header>
  );
}