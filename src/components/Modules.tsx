import { For } from 'solid-js';
import { MODULES, PIPELINE_STAGES } from '../data';
import { formatDuration, summarizeRun } from '../lib/pipeline';
import { Icon, SectionLabel } from './ui';

const run = summarizeRun(PIPELINE_STAGES);

export function Modules() {
  return (
    <section id="modul" class="scroll-mt-24 border-t border-line-soft">
      <div class="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <SectionLabel index="02">// modul latihan</SectionLabel>
        <h2 class="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Enam hal yang kamu latih,<br class="hidden md:block" /> bukan enam slide.
        </h2>

        <div class="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ol class="border-t border-line">
            <For each={MODULES}>
              {(m) => (
                <li class="grid gap-1.5 border-b border-line py-5 md:grid-cols-[5.5rem_1fr] md:gap-6">
                  <span class="pt-1 font-mono text-xs text-accent">{m.index}</span>
                  <div>
                    <h3 class="text-lg font-semibold tracking-tight text-ink">{m.title}</h3>
                    <p class="mt-1.5 max-w-prose text-sm leading-relaxed text-ink-soft">
                      {m.description}
                    </p>
                  </div>
                </li>
              )}
            </For>
          </ol>

          <aside class="flex flex-col gap-6">
            <div class="rounded-xl border border-line bg-surface-900 p-6">
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                alur nyata
              </p>
              <ol class="mt-5 flex flex-col gap-5">
                <li class="flex gap-3">
                  <span class="grid size-8 shrink-0 place-items-center rounded-md border border-line text-info">
                    <Icon name="git-branch" class="h-4 w-4" />
                  </span>
                  <div>
                    <p class="text-sm font-semibold text-ink">git push origin main</p>
                    <p class="mt-0.5 text-xs leading-relaxed text-ink-soft">
                      Webhook memicu job di Jenkins / GitHub Actions.
                    </p>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="grid size-8 shrink-0 place-items-center rounded-md border border-line text-accent">
                    <Icon name="play" class="h-4 w-4" />
                  </span>
                  <div>
                    <p class="text-sm font-semibold text-ink">Jenkinsfile terbaca</p>
                    <p class="mt-0.5 text-xs leading-relaxed text-ink-soft">
                      6 stage berjalan berurutan di agent Docker.
                    </p>
                  </div>
                </li>
                <li class="flex gap-3">
                  <span class="grid size-8 shrink-0 place-items-center rounded-md border border-line text-success">
                    <Icon name="shield-check" class="h-4 w-4" />
                  </span>
                  <div>
                    <p class="text-sm font-semibold text-ink">Hijau atau merah</p>
                    <p class="mt-0.5 text-xs leading-relaxed text-ink-soft">
                      Gagal satu stage, sisa pipeline berhenti. Kamu baca log, kamu perbaiki.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div class="rounded-xl border border-line bg-surface-900 p-6">
              <div class="flex items-center justify-between font-mono text-xs">
                <span class="text-ink-faint">build #142 · main</span>
                <span class="text-success">passing</span>
              </div>
              <p class="mt-5 font-mono text-2xl font-bold tracking-tight text-success">
                PASSED
              </p>
              <p class="mt-1 font-mono text-xs text-ink-soft">
                {formatDuration(run.totalMs)} · {run.greenCount}/{run.stageCount} stage hijau
              </p>
              <p class="mt-4 border-t border-line-soft pt-4 font-mono text-xs text-ink-faint">
                1 stage warn: typecheck (cache miss) — pipeline tetap lolos.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}