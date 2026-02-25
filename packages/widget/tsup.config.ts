import { defineConfig } from 'tsup'

export default defineConfig([
	{
		entry: ['src/index.ts'],
		format: ['esm', 'cjs'],
		dts: true,
		clean: true,
		minify: true,
		sourcemap: true,
		target: 'es2020',
	},
	{
		entry: { 'flotify.global': 'src/index.ts' },
		format: ['iife'],
		globalName: 'Flotify',
		clean: false,
		minify: true,
		sourcemap: true,
		target: 'es2020',
		footer: {
			js: 'Flotify = Flotify.default || Flotify;',
		},
	},
])
