<script lang="ts">
	import type { KnowledgeInstance } from '$lib/data/knowledge';
	import type { Snippet } from 'svelte';

	let {
		children,
		instance,
		link = false,
		hide = false
	}: { children?: Snippet; instance: KnowledgeInstance; link?: boolean; hide?: boolean } = $props();
</script>

<svelte:element
	this={link ? 'a' : 'figure'}
	class="Knowledge"
	href={link ? instance.link : null}
	style="--image: url({instance.image})"
	title={instance.name}
	class:hide
>
	{@render children?.()}
</svelte:element>

<style>
	.Knowledge {
		display: flex;
		gap: 1.5em;
		flex: 0 0 auto;
		margin: 0;
		width: 6em;
		height: 6em;
		font-size: 2em;
		background-image: var(--image);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
	}

	.hide {
		filter: blur(4px);
	}
</style>
