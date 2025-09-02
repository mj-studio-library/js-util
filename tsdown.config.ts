import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
});
