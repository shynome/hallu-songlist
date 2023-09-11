import { derived, writable } from 'svelte/store'
import srcSongs from './songs.csv' // source https://xwe28mkudf2.feishu.cn/base/N5YzbqiV4awExJsxPmEcVYMPnBf
import type { Song } from './songs.csv'

import Fuse from 'fuse.js'

export const okSongs = srcSongs.map<Song>((t) => {
	return {
		name: t['\ufeffname'],
		tags: t.tags.split(' ').filter((x) => !!x),
		remark: t.remark,
	}
})

export const songs = (function songs() {
	const { subscribe, set } = writable(okSongs)
	function random() {
		let nsongs = okSongs.sort(() => {
			return Math.random() < 0.5 ? -1 : 1
		})
		set(nsongs)
	}
	return { subscribe, random }
})()

export const tags = okSongs
	.map((s) => s.tags)
	.reduce((t, v) => {
		for (let k of v) {
			t[k] = (t[k] ?? 0) + 1
		}
		return t
	}, {} as { [k: string]: number })

const db = derived([songs], ([songs]) => {
	return new Fuse<Song>(songs, {
		keys: ['name', 'tags', 'remark'],
		useExtendedSearch: true,
	})
})

export const search = writable(``)

export const items = derived([search, db, songs], ([keywords, db, songs]) => {
	keywords = keywords.trim()
	if (!keywords) {
		return songs
	}
	let y = db.search(keywords).map(({ item }) => item)
	return y
})
