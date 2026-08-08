import { For } from 'solid-js';
import { QUICKSTART_STEPS } from '../data';
import { CodeBlock, SectionLabel } from './ui';

export function Quickstart() {
  return (
    <section id="quickstart" class="scroll-mt-24 border-t border-line-soft">
      <div class="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
        <SectionLabel index="04">// quickstart</SectionLabel>
        <h2 class="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Lima baris sebelum pipeline<br class="hidden md:block" /> mulai bekerja.
        </h2>

        <div class="mt-10 grid items-start gap-6 lg:grid-cols-2">
          <ol class="flex flex-col gap-1">
            <For each={QUICKSTART_STEPS}>
              {(step, i) => (
                <li class="flex gap-4 border-b border-line-soft py-4 last:border-b-0">
                  <span class="pt-0.5 font-mono text-xs text-ink-faint">
                    {String(i() + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <code class="rounded-md border border-line bg-surface-900 px-2 py-1 font-mono text-[13px] text-accent">
                      {step.command}
                    </code>
                    <p class="mt-1.5 text-sm text-ink-soft">{step.hint}</p>
                  </div>
                </li>
              )}
            </For>
          </ol>

          <CodeBlock filename="bash · project root">
            {`# 1. pasang dependency
bun install

# 2. halaman lokal (http://localhost:3000)
bun run dev

# 3. stage typecheck — wajib hijau
bun run typecheck

# 4. stage test — vitest
bun run test

# 5. stage build — menghasilkan dist/
bun run build`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}