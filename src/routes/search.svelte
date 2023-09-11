<script lang="ts">
	import { copy } from 'svelte-copy'
	import { search, items, tags as srcTags, okSongs } from './songs'
	import { push } from './toast.svelte'
	const tags = Object.entries(srcTags)
	function randomSong() {
		let i = Math.floor(Math.random() * okSongs.length)
		return okSongs[i].name
	}
	let song: string = randomSong()
	import { tick } from 'svelte'
</script>

<div class="my-3">
	<div class="input-group">
		<input
			class="form-control"
			type="search"
			bind:value={$search}
			list="songs-suggestions"
			placeholder="搜索歌曲"
		/>
		<datalist id="songs-suggestions">
			{#each $items as item}
				<option value={item.name} />
			{/each}
		</datalist>
		<button
			type="button"
			class="btn btn-outline-primary"
			use:copy={{ text: `点歌 ${song}`, events: ['do-svelte-copy'] }}
			on:svelte-copy={() => push(song)}
			on:click={function () {
				song = randomSong()
				tick().then(() => {
					// @ts-ignore
					this.dispatchEvent(new CustomEvent('do-svelte-copy'))
				})
			}}
		>
			随机一首
		</button>
	</div>
	<div class="my-2">
		{#each tags as [tag]}
			<button
				class="btn btn-sm btn-outline-primary"
				on:click={() => {
					$search += `|${tag}`
				}}>{tag}</button
			>
		{/each}
	</div>
</div>
