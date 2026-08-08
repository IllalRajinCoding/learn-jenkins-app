export type StageStatus = 'idle' | 'success' | 'warn' | 'error';

/**
 * Sebuah stage dianggap "passing" jika statusnya success atau warn
 * (warn = lolos dengan peringatan, mis. cache miss — pipeline tetap hijau).
 */
export function isStageGreen(status: StageStatus): boolean {
  return status === 'success' || status === 'warn';
}

/** Format durasi stage agar konsisten di UI & log pipeline. */
export function formatDuration(ms: number): string {
  if (ms < 0) return '0ms';
  if (ms < 1000) return `${ms}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return `${minutes}m ${rest}s`;
}

/** Ringkasan sebuah run: total durasi + jumlah stage hijau. */
export function summarizeRun(stages: { status: StageStatus; durationMs: number }[]): {
  totalMs: number;
  greenCount: number;
  stageCount: number;
} {
  return {
    totalMs: stages.reduce((sum, s) => sum + s.durationMs, 0),
    greenCount: stages.filter((s) => isStageGreen(s.status)).length,
    stageCount: stages.length,
  };
}
