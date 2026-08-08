import { For } from 'solid-js';
import { ASSIGNMENTS } from '../data';
import { DifficultyBadge, SectionLabel } from './ui';

export function Assignments() {
  return (
    <section id="tugas" class="scroll-mt-24 border-t border-line-soft">
      <div class="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <SectionLabel index="03">// tugas belajar</SectionLabel>
        <h2 class="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Sembilan tugas. Satu aturan:<br class="hidden md:block" /> pipeline harus hijau.
        </h2>
        <p class="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">
          Urut dari T-00. Setiap tugas punya bukti lulus yang bisa diperiksa — screenshot build,
          log stage, atau badge yang hijau. Detail langkah ada di README.
        </p>

        <div class="mt-10 overflow-hidden rounded-xl border border-line">
          <For each={ASSIGNMENTS}>
            {(a) => (
              <div class="grid gap-2 px-4 py-5 transition-colors duration-150 hover:bg-surface-800/60 md:grid-cols-[auto_1fr_auto] md:gap-6 md:px-6">
                <span class="font-mono text-sm text-accent">[{a.index}]</span>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-base font-semibold tracking-tight text-ink">{a.title}</h3>
                    <DifficultyBadge level={a.difficulty} />
                  </div>
                  <p class="mt-1.5 max-w-prose text-sm leading-relaxed text-ink-soft">{a.goal}</p>
                  <p class="mt-2 font-mono text-xs text-ink-faint">
                    <span class="text-success">bukti lulus:</span> {a.evidence}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}