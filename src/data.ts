import type { StageStatus } from './lib/pipeline';

export interface PipelineStage {
  id: string;
  name: string;
  durationMs: number;
  status: StageStatus;
}

/** 6 stage yang dijalankan setiap push — sama persis di Jenkinsfile & GitHub Actions. */
export const PIPELINE_STAGES: PipelineStage[] = [
  { id: 'checkout', name: 'checkout', durationMs: 2100, status: 'success' },
  { id: 'deps', name: 'deps', durationMs: 8400, status: 'success' },
  { id: 'typecheck', name: 'typecheck', durationMs: 11200, status: 'warn' },
  { id: 'build', name: 'build', durationMs: 9800, status: 'success' },
  { id: 'test', name: 'test', durationMs: 2600, status: 'success' },
  { id: 'deploy', name: 'deploy', durationMs: 1400, status: 'success' },
];

export interface TermLine {
  time: string;
  prompt?: boolean;
  command?: string;
  stage?: string;
  status?: StageStatus;
  durationMs?: number;
  note?: string;
}

export const TERMINAL_LINES: TermLine[] = [
  { time: '07:12:31', prompt: true, command: 'git push origin main' },
  { time: '07:12:33', stage: 'checkout', status: 'success', durationMs: 2100 },
  { time: '07:12:35', stage: 'deps', status: 'success', durationMs: 8400, note: 'frozen lockfile' },
  { time: '07:12:43', stage: 'typecheck', status: 'warn', durationMs: 11200, note: 'cache miss' },
  { time: '07:12:54', stage: 'build', status: 'success', durationMs: 9800 },
  { time: '07:13:04', stage: 'test', status: 'success', durationMs: 2600 },
  { time: '07:13:06', stage: 'deploy', status: 'success', durationMs: 1400 },
];

export interface Module {
  index: string;
  title: string;
  description: string;
}

export const MODULES: Module[] = [
  {
    index: 'M-01',
    title: 'Pipeline 101',
    description:
      'Baca Jenkinsfile dari atas ke bawah: agent, environment, stages, post. Paham kenapa urutan stage itu keputusan.',
  },
  {
    index: 'M-02',
    title: 'Build & Artifact',
    description:
      'bun install + bun run build menghasilkan dist/. Pipeline mengarsipkan artifact yang bisa diunduh & di-deploy.',
  },
  {
    index: 'M-03',
    title: 'Test di dalam pipeline',
    description:
      'Stage test menjalankan vitest. Pipeline berhenti dan merah kalau ada test yang gagal — itu yang kamu mau lihat.',
  },
  {
    index: 'M-04',
    title: 'Deploy',
    description:
      'Dockerfile multi-stage membangun image nginx dari dist/. Container = target deploy yang sama di mana pun.',
  },
  {
    index: 'M-05',
    title: 'Observability & notifikasi',
    description:
      'Status build, log console, dan notifikasi webhook (Slack/Telegram/email) — tahu apa yang terjadi tanpa buka Jenkins.',
  },
  {
    index: 'M-06',
    title: 'Dua mesin CI, satu alur',
    description:
      'Jenkinsfile (self-hosted) dan GitHub Actions (cloud) menjalankan stage yang sama. Bandingkan log keduanya.',
  },
];

export type Difficulty = 'pemula' | 'menengah' | 'lanjut';

export interface Assignment {
  index: string;
  title: string;
  difficulty: Difficulty;
  goal: string;
  evidence: string;
}

export const ASSIGNMENTS: Assignment[] = [
  {
    index: 'T-00',
    title: 'Setup lokal',
    difficulty: 'pemula',
    goal: 'bun install, bun run dev, bun run build. Kenali struktur repo dan DESIGN.md.',
    evidence: 'bun run build selesai tanpa error.',
  },
  {
    index: 'T-01',
    title: 'Jalankan Jenkins di Docker',
    difficulty: 'pemula',
    goal: 'docker compose up jenkins, install plugin Pipeline, buat credential local.',
    evidence: 'Jenkins terbuka di http://localhost:8080 dan dashboard siap.',
  },
  {
    index: 'T-02',
    title: 'Job pipeline dari Jenkinsfile',
    difficulty: 'pemula',
    goal: 'Buat pipeline job yang membaca Jenkinsfile dari repo (SCM). Jalankan build pertama.',
    evidence: 'Build pertama berwarna hijau: 6/6 stage passed.',
  },
  {
    index: 'T-03',
    title: 'Rusakkan build dengan sengaja',
    difficulty: 'menengah',
    goal: 'Commit perubahan yang mematahkan typecheck. Baca log stage yang merah, lalu fix dan lihat pipeline hijau lagi.',
    evidence: 'Satu build merah dengan log stage yang kamu bisa tunjuk, lalu build hijau setelah fix.',
  },
  {
    index: 'T-04',
    title: 'Stage test yang beneran',
    difficulty: 'menengah',
    goal: 'Tambahkan unit test baru di src/lib, lihat stage test menjalankan file-mu di Jenkins dan GitHub Actions.',
    evidence: 'Test baru muncul di output vitest kedua pipeline.',
  },
  {
    index: 'T-05',
    title: 'Build & deploy image Docker',
    difficulty: 'menengah',
    goal: 'docker build dari Dockerfile multi-stage, jalankan container, buka landing page dari container.',
    evidence: 'docker compose up app dan halaman tampil di http://localhost:3001.',
  },
  {
    index: 'T-06',
    title: 'Notifikasi pipeline',
    difficulty: 'menengah',
    goal: 'Kirim status build ke Slack/Telegram (webhook) atau email saat build selesai.',
    evidence: 'Satu notifikasi "build #N passed" yang kamu terima.',
  },
  {
    index: 'T-07',
    title: 'Jalur kedua: GitHub Actions',
    difficulty: 'menengah',
    goal: 'Push repo ke GitHub, lihat .github/workflows/ci.yml berjalan di cloud. Bandingkan stage & log dengan Jenkins.',
    evidence: 'Badge GitHub Actions hijau (passing) di halaman repo.',
  },
  {
    index: 'T-08',
    title: 'Pipeline lanjutan',
    difficulty: 'lanjut',
    goal: 'Pilih satu: parallel stage, trigger antar-job, artifact publish ke Pages, atau blue/green deploy sederhana.',
    evidence: 'Skenario berjalan di pipeline dengan dokumentasi singkat di README-mu.',
  },
];

export const QUICKSTART_STEPS = [
  { command: 'bun install', hint: 'pasang semua dependency' },
  { command: 'bun run dev', hint: 'buka http://localhost:3000' },
  { command: 'bun run typecheck', hint: 'stage typecheck — wajib hijau' },
  { command: 'bun run test', hint: 'stage test — vitest' },
  { command: 'bun run build', hint: 'menghasilkan dist/ — artifact pipeline' },
];

export const NAV_LINKS = [
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#modul', label: 'Modul' },
  { href: '#tugas', label: 'Tugas' },
  { href: '#quickstart', label: 'Quickstart' },
];
