import { describe, expect, it } from 'vitest';
import { formatDuration, isStageGreen, summarizeRun } from './pipeline';
import type { StageStatus } from './pipeline';

describe('isStageGreen', () => {
  it('success dan warn dianggap hijau (pipeline lolos)', () => {
    expect(isStageGreen('success')).toBe(true);
    expect(isStageGreen('warn')).toBe(true);
  });

  it('error dan idle tidak hijau', () => {
    expect(isStageGreen('error')).toBe(false);
    expect(isStageGreen('idle')).toBe(false);
  });
});

describe('formatDuration', () => {
  it('milidetik < 1s', () => {
    expect(formatDuration(420)).toBe('420ms');
  });

  it('detik dengan satu desimal', () => {
    expect(formatDuration(2100)).toBe('2.1s');
    expect(formatDuration(35500)).toBe('35.5s');
  });

  it('menit saat >= 60 detik', () => {
    expect(formatDuration(125_000)).toBe('2m 5s');
  });

  it('nilai negatif aman', () => {
    expect(formatDuration(-5)).toBe('0ms');
  });
});

describe('summarizeRun', () => {
  const stages = [
    { status: 'success' as StageStatus, durationMs: 2100 },
    { status: 'success' as StageStatus, durationMs: 8400 },
    { status: 'warn' as StageStatus, durationMs: 11200 },
    { status: 'error' as StageStatus, durationMs: 9800 },
  ];

  it('menghitung total durasi', () => {
    expect(summarizeRun(stages).totalMs).toBe(31_500);
  });

  it('menghitung stage hijau vs total', () => {
    expect(summarizeRun(stages).greenCount).toBe(3);
    expect(summarizeRun(stages).stageCount).toBe(4);
  });
});
