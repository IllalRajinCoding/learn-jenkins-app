import type { Component } from 'solid-js';
import { Nav } from './components/Nav';
import { Terminal, PipelineStrip } from './components/Terminal';
import { Modules } from './components/Modules';
import { Assignments } from './components/Assignments';
import { Quickstart } from './components/Quickstart';
import { Footer } from './components/Footer';
import { Button, Icon } from './components/ui';

const App: Component = () => {
  return (
    <div id="top" class="min-h-[100dvh] bg-surface-950 text-ink">
      <Nav />

      <main>
        {/* Hero — split: copy di kiri, terminal pipeline di kanan */}
        <section class="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
              <span class="text-accent">01</span> // repo latihan ci/cd
            </p>
            <h1 class="mt-4 text-5xl font-bold leading-[1.05] tracking-tighter md:text-6xl">
              Push. Pipeline jalan.
              <span class="block text-ink-soft">Perbaiki sendiri sampai hijau.</span>
            </h1>
            <p class="mt-6 max-w-[55ch] text-lg leading-relaxed text-ink-soft">
              Repositori ini landing page Solid.js + Tailwind yang nyata, dan CI/CD-nya juga
              nyata: 6 stage di Jenkinsfile dan GitHub Actions. Kamu clone, push, rusak,
              perbaiki — setiap commit diuji mesin, bukan di laptop.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#tugas" variant="primary">
                Mulai dari Tugas
                <Icon name="arrow-right" />
              </Button>
              <Button href="#pipeline" variant="ghost">
                Lihat pipeline
              </Button>
            </div>
            <dl class="mt-12 grid grid-cols-3 gap-6 border-t border-line-soft pt-6 font-mono text-xs">
              <div>
                <dt class="text-ink-faint">stack</dt>
                <dd class="mt-1 text-ink">Solid · Tailwind</dd>
              </div>
              <div>
                <dt class="text-ink-faint">pipeline</dt>
                <dd class="mt-1 text-ink">Jenkins + GH Actions</dd>
              </div>
              <div>
                <dt class="text-ink-faint">per push</dt>
                <dd class="mt-1 text-success">6 stage · passing</dd>
              </div>
            </dl>
          </div>

          <div class="log-line" style={{ 'animation-delay': '250ms' }}>
            <Terminal />
          </div>
        </section>

        {/* Pipeline — 6 stage per push */}
        <section id="pipeline" class="scroll-mt-24 border-t border-line-soft">
          <div class="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
            <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <p class="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                <span class="text-accent">02</span> <span class="text-line">//</span> yang terjadi tiap push
              </p>
              <p class="font-mono text-xs text-ink-faint">
                $ git push origin main → webhook → pipeline #143
              </p>
            </div>
            <div class="mt-8">
              <PipelineStrip />
            </div>
            <p class="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Urutan ini didefinisikan persis di{' '}
              <code class="rounded border border-line bg-surface-900 px-1.5 py-0.5 font-mono text-[13px] text-accent">
                Jenkinsfile
              </code>{' '}
              dan{' '}
              <code class="rounded border border-line bg-surface-900 px-1.5 py-0.5 font-mono text-[13px] text-accent">
                .github/workflows/ci.yml
              </code>
              . Kamu tidak menjalankan stage ini manual — mesin yang menjalankannya.
            </p>
          </div>
        </section>

        <Modules />
        <Assignments />
        <Quickstart />
      </main>

      <Footer />
    </div>
  );
};

export default App;