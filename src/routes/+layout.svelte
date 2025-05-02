<script>
	import '$lib/style.css';
	import '@fontsource/vollkorn';
	import '$lib/../assets/fonts/fonts.css';
	import Sidebar from '$lib/ui/Sidebar.svelte';

	import '$lib/data/room.ts';
	import '$lib/data/item.ts';
	import '$lib/data/book.ts';
	import '$lib/data/interactable.ts';
	import '$lib/data/knowledge.ts';
</script>

<main>
	<Sidebar />
	<content>
		<slot />
	</content>
</main>

<style>
	:global(body, html) {
		background: #101112;
		font-family: 'Vollkorn', sans-serif;
		height: 100%;
	}

	main {
		--page-padding-x: calc((100vw - min(85vw, 1300px)) / 2);
		font-family: 'Vollkorn', serif;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	@media (max-width: 700px) {
		main {
			padding-top: 3.5rem;
		}
	}
	content {
		padding: 2em 2em;
		flex-grow: 1;
		height: 100vh;
		overflow-y: auto;
		padding-right: var(--page-padding-x);
	}
</style>
