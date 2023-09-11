import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import dsv from '@rollup/plugin-dsv'
import { isoImport } from 'vite-plugin-iso-import'

export default defineConfig({
	build: {
		target: 'es2015',
	},
	plugins: [isoImport(), dsv(), sveltekit()],
})
