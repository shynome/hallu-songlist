<script>
	import Songs from './songs.svelte'
	import Search from './search.svelte'
	import Intro from './intro.svelte'
</script>

<svelte:head>
	<title>哈鹿hallu的歌单</title>
</svelte:head>

<div class="container">
	<Intro />
	<Search />
	<Songs />
</div>
