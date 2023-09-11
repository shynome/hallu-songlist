<script>
	import { onMount } from 'svelte'
	import { items, songs, search } from './songs'
	import { copy } from 'svelte-copy'
	onMount(() => {
		songs.random()
	})
	import { push } from './toast.svelte'
</script>

<div>
	<small>点击歌名可以直接复制</small>
</div>
<table class="table table-striped table-hover align-middle">
	<thead>
		<th>
			歌曲 ({#if $items.length < $songs.length}{$items.length}/{/if}{$songs.length})
		</th>
		<th>标签</th>
		<th>备注</th>
	</thead>
	<tbody>
		{#each $items as item}
			<tr
				use:copy={{ text: `点歌 ${item.name}`, events: ['do-svelte-copy'] }}
				on:svelte-copy={() => push(item.name)}
				on:click={function () {
					this.dispatchEvent(new CustomEvent('do-svelte-copy'))
				}}
			>
				<td>
					<!-- <input type="text" class="form-control" value={item.name} readonly /> -->
					{item.name}
				</td>
				<td>
					{#each item.tags as tag}
						<button
							class="btn btn-sm btn-outline-primary"
							on:click|stopPropagation={(e) => {
								$search += `|${tag}`
							}}
						>
							{tag}
						</button>
					{/each}
				</td>
				<td>{item.remark}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	tbody tr {
		cursor: pointer;
	}
</style>
