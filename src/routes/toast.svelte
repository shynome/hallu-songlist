<script context="module" lang="ts">
	import type { Action } from 'svelte/action'
	import bootstrap from '$lib/bootstrap'
	import { writable } from 'svelte/store'
	const toast: Action = function toast(node) {
		let inst = new bootstrap.Toast(node)
		inst.show()
		return {
			destroy() {
				inst.dispose()
			},
		}
	}
	let n = 0
	type Item = {
		id: number
		msg: string
	}
	const msgs = writable<Item[]>([])
	export function push(song: string) {
		msgs.update((msgs) => {
			return msgs
				.concat({
					id: n++,
					msg: song,
				})
				.slice(-3)
		})
	}
</script>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
	{#each $msgs as { msg, id } (id)}
		<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" use:toast>
			<div class="toast-header">
				<strong class="me-auto">复制成功</strong>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" />
			</div>
			<div class="toast-body">
				已复制"点歌 {msg}"<br />
				去直播间发弹幕点歌吧
			</div>
		</div>
	{/each}
</div>
