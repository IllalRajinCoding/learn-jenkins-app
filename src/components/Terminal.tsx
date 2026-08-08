import { For } from 'solid-js';
import { formatDuration } from '../lib/pipeline';
import type { StageStatus } from '../lib/pipeline';
import { PIPELINE_STAGES, TERMINAL_LINES } from '../data';
import type { TermLine } from '../data';
import { Icon, type IconName } from './ui';

const STATUS_GLYPH: Record<StageStatus, string> = {
  success: '✓',
  warn: '!',
  error: 'x',
  idle: '·',
};

const STATUS_TEXT: Record<StageStatus, string> = {
  success: 'ok',
  warn: 'warn',
  error: 'fail',
  idle: 'wait',
};

const STATUS_COLOR: Record<StageStatus, string> = {
  success: 'text-success',
  warn: 'text-warn',
  error: 'text-danger',
  idle: 'text-ink-faint',
};

const TOTAL_MS = PIPELINE_STAGES.reduce((sum, s) => sum + s.durationMs, 0);

export function Terminal() {
  return (
    <div class="overflow-hidden rounded-xl border border-line bg-surface-900">
      <div class="flex h-9 items-center gap-2 border-b border-line px-4">
        <span class="size-2.5 rounded-full border border-line" />
        <span class="size-2.5 rounded-full border border-line" />
        <span class="size-2.5 rounded-full border border-line" />
        <span class="ml-2 font-mono text-xs text-ink-faint">
          jenkins · pipeline #142 · main
        </span>
        <span class="ml-auto font-mono text-xs text-success">running…</span>
      </div>

      <div class="p-4 font-mono text-[13px] leading-7 sm:p-5">
        <For each={TERMINAL_LINES}>
          {(line, i) => <TerminalLine line={line} index={i()} />}
        </For>

        <p
          class="log-line mt-1 text-ink"
          style={{ 'animation-delay': `${TERMINAL_LINES.length * 120 + 120}ms` }}
        >
          <span class="text-accent">build #142 — PASSED</span>
          <span class="text-ink-faint"> in {formatDuration(TOTAL_MS)} · 6/6 stage hijau</span>
          <span class="cursor-blink text-accent">▍</span>
        </p>
      </div>
    </div>
  );
}

function TerminalLine(props: { line: TermLine; index: number }) {
  if (props.line.prompt) {
    return (
      <p class="log-line" style={{ 'animation-delay': `${props.index * 120}ms` }}>
        <span class="text-accent">$</span>
        <span class="ml-2 text-ink">{props.line.command}</span>
      </p>
    );
  }

  return (
    <p
      class="log-line grid grid-cols-[auto_1fr_auto] gap-x-4"
      style={{ 'animation-delay': `${props.index * 120}ms` }}
    >
      <span class="text-ink-faint">{props.line.time}</span>
      <span class="text-ink">
        <span class="text-ink-faint">[</span>
        {props.line.stage}
        <span class="text-ink-faint">]</span>
        {props.line.note && <span class="text-ink-faint"> · {props.line.note}</span>}
      </span>
      <span class={STATUS_COLOR[props.line.status ?? 'idle']}>
        {STATUS_GLYPH[props.line.status ?? 'idle']} {STATUS_TEXT[props.line.status ?? 'idle']}
        <span class="text-ink-faint"> ({formatDuration(props.line.durationMs ?? 0)})</span>
      </span>
    </p>
  );
}

export function PipelineStrip() {
  return (
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <For each={PIPELINE_STAGES}>
        {(stage, i) => (
          <div class="rounded-lg border border-line bg-surface-900 p-4">
            <div class="flex items-center justify-between font-mono text-xs">
              <span class="text-ink-faint">[{String(i() + 1).padStart(2, '0')}]</span>
              <Icon
                name={(stage.status === 'warn' ? 'alert' : 'check') as IconName}
                class={`h-3.5 w-3.5 ${stage.status === 'warn' ? 'text-warn' : 'text-accent'}`}
              />
            </div>
            <p class="mt-3 font-mono text-sm text-ink">{stage.name}</p>
            <p class="mt-0.5 font-mono text-xs text-ink-faint">
              {formatDuration(stage.durationMs)}
            </p>
          </div>
        )}
      </For>
    </div>
  );
}
