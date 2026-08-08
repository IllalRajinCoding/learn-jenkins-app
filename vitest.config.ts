import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test-file kita murni logika (lib/), tanpa DOM — environment node saja.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});