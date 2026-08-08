# Tahap 1: build aplikasi Solid.js dengan Bun.
FROM oven/bun:1 AS build

WORKDIR /app

# Cache layer: dependency di-copy & install dulu agar perubahan kode sumber
# tidak memicu re-install dependency (ini prinsip yang sama dengan caching
# pada stage "deps" kedua pipeline).
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Tahap 2: serve hasil build dengan nginx (image kecil).
FROM nginx:stable-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]