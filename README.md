# learn-jenkins

> Latihan CI/CD dengan kasus nyata. Landing page [Solid.js](https://solidjs.com) + Tailwind
> CSS yang dibangun oleh pipeline 6 stage. Kamu merusak build dengan sengaja, membaca log
> merah, dan memperbaikinya — itu kurikulumnya.

**Pipeline**: `Jenkinsfile` (self-hosted) + `.github/workflows/ci.yml` (cloud) — dua mesin CI,
satu alur stage yang sama.

**Stack:** Vite · Solid.js · Tailwind CSS v4 · Bun · Vitest · Docker · Jenkins

---

## Daftar Isi

- [Struktur repo](#struktur-repo)
- [Prasyarat](#prasyarat)
- [Quickstart](#quickstart)
- [Pipeline: 6 stage per push](#pipeline-6-stage-per-push)
- [Tugas belajar](#tugas-belajar)
  - [T-00 Setup lokal](#t-00-setup-lokal)
  - [T-01 Jalankan Jenkins di Docker](#t-01-jalankan-jenkins-di-docker)
  - [T-02 Job pipeline dari Jenkinsfile](#t-02-job-pipeline-dari-jenkinsfile)
  - [T-03 Rusakkan build dengan sengaja](#t-03-rusakkan-build-dengan-sengaja)
  - [T-04 Stage test yang beneran](#t-04-stage-test-yang-beneran)
  - [T-05 Build & deploy image Docker](#t-05-build--deploy-image-docker)
  - [T-06 Notifikasi pipeline](#t-06-notifikasi-pipeline)
  - [T-07 Jalur kedua: GitHub Actions](#t-07-jalur-kedua-github-actions)
  - [T-08 Pipeline lanjutan](#t-08-pipeline-lanjutan)
- [Troubleshooting](#troubleshooting)

---

## Struktur repo

```
learn-jenkins/
├── .github/workflows/ci.yml   # CI kedua di cloud (GitHub Actions)
├── src/
│   ├── App.tsx                # landing page (Solid)
│   ├── components/            # Nav, Terminal, Modules, Assignments, dst.
│   ├── data.ts                # isi konten halaman (stage, tugas, modul)
│   └── lib/pipeline.ts        # util pipeline — DIUJI oleh vitest
├── Jenkinsfile                # pipeline Jenkins (6 stage)
├── Dockerfile                 # multi-stage: bun build → nginx
├── docker-compose.yml         # Jenkins + app dalam 1 perintah
├── DESIGN.md                  # design system halaman (baca sebelum styling)
└── bun.lock                   # lockfile — wajib di-commit untuk CI
```

## Prasyarat

| Tool | Untuk apa | Cek |
|------|-----------|-----|
| [Bun](https://bun.sh) ≥ 1.1 | runtime & package manager | `bun --version` |
| [Docker](https://docker.com) | Jenkins + container app | `docker --version` |
| Git | push commit | `git --version` |

---

## Quickstart

```bash
git clone <url-repo-mu> learn-jenkins
cd learn-jenkins
bun install
bun run dev        # http://localhost:3000
```

Jalur yang sama persis digunakan stage pipeline:

```bash
bun run typecheck  # stage Typecheck
bun run test       # stage Test
bun run build      # stage Build → dist/
```

---

## Pipeline: 6 stage per push

Setiap `git push origin main` memicu kedua pipeline secara paralel. Urutan stage
didefinisikan di [Jenkinsfile](./Jenkinsfile) dan
[ci.yml](./.github/workflows/ci.yml):

| # | Stage | Perintah | Gagal kalau… |
|---|-------|----------|--------------|
| 1 | checkout | — | repo tidak bisa di-clone |
| 2 | deps | `bun install --frozen-lockfile` | dependency tidak resolvable |
| 3 | typecheck | `bun run typecheck` | ada type error |
| 4 | build | `bun run build` | bundle gagal dihasilkan |
| 5 | test | `bun run test` (vitest) | ada test yang gagal |
| 6 | deploy | archive `dist/` + `docker build` | artifact hilang (main saja) |

Kunci konsep yang langsung kelihatan: **satu stage gagal, sisa pipeline berhenti**.
Build kamu jadi merah, dan dari log stage mana yang error kamu langsung tahu bagian mana
yang rusak.

---

## Tugas belajar

Aturan main:

- Kerjakan urut. Setiap tugas **sengaja** menyentuh minimal satu file CI/CD.
- **Bukti lulus** bisa ditunjukkan (screenshot/log) — patokan "bukti lulus" ada di bawah
  setiap tugas.
- Ampas asa tugas = pipeline hijau **dan** kamu bisa menjelaskan kenapa.

### T-00 Setup lokal

**Tujuan:** repo jalan di laptop-mu, dan kamu paham struktur project.
**Level:** pemula

Langkah:

1. `bun install` sampai sukses.
2. `bun run dev` → buka http://localhost:3000 → landing page tampil.
3. Baca `src/data.ts` dan `src/App.tsx`. Ubah satu kalimat di hero (`src/App.tsx`), lihat
   hot-reload otomatis.
4. `bun run build` → folder `dist/` muncul. Folder ini yang dipakai oleh pipeline + nginx.

**Bukti lulus:** `bun run build` selesai tanpa error, `dist/` ada, dan kamu bisa menunjuk
3 file yang isinya terkait landing page.

---

### T-01 Jalankan Jenkins di Docker

**Level:** pemula

Langkah:

1. Jalankan Jenkins: `docker compose up -d jenkins`.
2. Buka http://localhost:8080, ambil password awal: `docker exec learn-jenkins-master cat
   /var/jenkins_home/secrets/initialAdminPassword`.
3. Setup wizard → "Install suggested plugins" → buat user admin pertama.
4. Di **Manage Jenkins → Plugins → Available**, pastikan terpasang:
   - **Pipeline**
   - **Docker Pipeline** (untuk agent `docker { image 'oven/bun:1' }`)
   - **Git** (biasanya sudah default)

**Bukti lulus:** dashboard Jenkins terbuka dan **Manage Jenkins** tidak error.

---

### T-02 Job pipeline dari Jenkinsfile

**Inti tugas ini:** Jenkins menarik Jenkinsfile langsung dari repo — bukan menyalin
isinya ke dalam UI.

Langkah:

1. Di Jenkins: **New Item → Pipeline → name: `learn-jenkins`**.
2. Bagian **Pipeline → Definition: Pipeline script from SCM**.
3. SCM: **Git** → Repository URL: lokasi repo ini. Kalau repo masih lokal, buat repo
   bare (`git clone --bare`) atau push dulu ke GitHub dan pakai URL itu.
4. **Script path**: `Jenkinsfile`.
5. **Save → Build Now.**

**Bukti lulus:** build pertama **hijau**, 6/6 stage passed. Buka *Stage View* — kamu
harus melihat CHECKOUT, DEPS, TYPECHECK, BUILD, TEST, DEPLOY semua centang hijau.

---

### T-03 Rusakkan build dengan sengaja

**Misi:** pipeline yang pernah merah lebih berguna daripada yang selalu hijau.

Langkah:

1. Ubah `src/lib/pipeline.ts` — contoh: paksa `formatDuration` melempar error, atau ubah
   tipe `StageStatus` sehingga typecheck pecah.
2. Commit & push (atau **Build Now** di Jenkins).
3. Perhatikan: hanya **Typecheck** (atau Build) yang merah, stage sesudahnya **tidak
   dijalankan**.
4. Baca log: baris error yang paling bawah menyebut file & nomor baris mana? Catat.
5. Perbaiki, commit, push lagi → pipeline hijau kembali.

**Bukti lulus:** 1 build merah (screenshot log stage) + 1 build hijau setelah fix.
Kamu harus bisa menjawab: *"Kenapa stage setelah Typecheck tidak dijalankan?"*

---

### T-04 Stage test yang beneran

**Level:** menengah

Langkah:

1. Buka `src/lib/pipeline.test.ts` — test-file yang sudah ada, dijalankan vitest di
   stage Test.
2. Tambahkan **unit test baru** untuk fungsi yang kamu buat sendiri, misal tambah
   helper `pipelineLabel(buildNumber)` di `src/lib/pipeline.ts` + test-nya.
3. `bun run test` lokal → test-mu muncul di daftar yang berjalan.
4. Push → lihat **stage Test** di Jenkins dan GitHub Actions menjalankan test-mu.

**Bukti lulus:** nama test-mu muncul di console output kedua pipeline.

> Catatan: kalau kamu hapus semua test, stage Test tetap hijau — karena `vitest run`
> dengan 0 test tetap exit 0. Itu sebabnya T-08 menyinggung coverage threshold.

---

### T-05 Build & deploy image Docker

**Level:** menengah

Langkah:

1. `docker compose up -d app` (atau `docker build -t learn-jenkins . && docker run
   -p 3001:80 learn-jenkins`).
2. Buka http://localhost:3001 — landing page di-serve nginx di dalam container.
3. Edit satu kata di `src/App.tsx`, lalu `bun install && bun run build` dan ulangi
   langkah 1 — perhatikan bahwa ini **siklus yang dijalankan pipeline setiap push**.

**Bukti lulus:** halaman tampil dari container, dan kamu bisa menjelaskan kenapa
`Dockerfile` punya 2 `FROM`.

---

### T-06 Notifikasi pipeline

**Tujuan:** pipeline memberi tahu kamu — bukan sebaliknya. Pilih satu:

- **Slack/Telegram:** buat webhook, tambahkan step di blok `post { success/failure }`
  Jenkinsfile (contoh `slackSend` sudah dikomentari di Jenkinsfile).
- **Email:** setup SMTP di **Jenkins → System → E-mail Notification**.

**Bukti lulus:** kamu menerima pesan "build #N passing" saat push berhasil.

---

### T-07 Jalur kedua: GitHub Actions

**Tujuan:** bandingkan Jenkins vs cloud CI.

Langkah:

1. Push repo ke GitHub.
2. Tab **Actions** → workflow `ci` berjalan otomatis (sudah didefinisikan di
   `.github/workflows/ci.yml`).
3. Tambahkan badge di README (sesuaikan OWNER/REPO):

```markdown
[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)
```

4. Bandingkan: perbedaan definisi stage, kecepatan startup (agent Docker vs runner
   GitHub), cara melihat log, dan biaya.

**Bukti lulus:** badge hijau + catatan perbandingan minimal 5 baris.

---

### T-08 Pipeline lanjutan (pilih SATU)

- **Parallel stage:** buat `typecheck` dan `test` berjalan bersamaan di Jenkinsfile
  (baca `parallel` di declarative pipeline).
- **Trigger antar job:** pipeline B di-build otomatis setelah pipeline A sukses
  (`build job: 'deploy', wait: false`).
- **Artifact publish:** upload `dist/` ke GitHub Pages / Netlify setelah build sukses.
- **Blue/green sederhana:** dua container app, traffic swap saat health check lulus.

**Bukti lulus:** skenario berjalan + dokumentasi singkat (5-15 baris) di README-mu.

---

## Troubleshooting

| Gejala | Kemungkinan sebab | Solusi |
|--------|-------------------|--------|
| `bun install --frozen-lockfile` gagal | `bun.lock` tidak sinkron dengan package.json | jalankan `bun install` (tanpa flag), commit lock baru |
| Jenkins "invalid stage name" | nama stage mengandung karakter terlarang | gunakan huruf/angka saja, spasi boleh |
| Agent `oven/bun:1` gagal pull | daemon Docker tidak terpasang di agent | install plugin Docker Pipeline; atau ganti `agent any` + pasang Bun manual |
| Port 8080 sudah dipakai | service lain | ganti mapping di `docker-compose.yml` → `8081:8080` |
| GitHub Actions tidak jalan | workflow off | `Settings → Actions → General → Allow`; pastikan file `.yml` valid |
| Halaman kosong di produksi | rute SPA tanpa fallback | halaman single-route aman; kalau nambah rute → tambah `try_files` di nginx |

---

## Bacaan lanjut

- [Jenkins Pipeline syntax (declarative)](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [GitHub Actions docs](https://docs.github.com/en/actions)
- [Bun docs](https://bun.sh/docs)
- Desain & token: **[DESIGN.md](./DESIGN.md)**

> Dibuat untuk belajar: sengaja gagal, baca log, dan perbaiki. Pipeline yang pernah
> merah itu lebih berguna dari yang selalu hijau.
