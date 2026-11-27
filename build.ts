import plugin from 'bun-plugin-dtsx'

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'bun',
  format: 'esm',
  splitting: true,
  sourcemap: 'none',
  minify: false,
  plugins: [plugin()],
})

await Bun.build({
  entrypoints: ['./bin/cli.ts'],
  outdir: './dist/bin',
  target: 'bun',
  format: 'esm',
})

console.log('Build complete!')
