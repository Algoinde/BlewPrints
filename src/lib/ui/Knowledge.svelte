<script lang="ts">
	import type { KnowledgeInstance } from '$lib/data/knowledge';
	import type { Snippet } from 'svelte';

	let {
		children,
		instance,
		link = false,
		hide = false,
		big = false
	}: {
		children?: Snippet;
		instance: KnowledgeInstance;
		link?: boolean;
		hide?: boolean;
		big?: boolean;
	} = $props();

	let page = $state(0);

	const image = $derived(instance.getImage(page));
</script>

<svelte:element
	this={link ? 'a' : 'figure'}
	class="Knowledge"
	href={link ? instance.link : null}
	style="--image: url({image})"
	title={instance.name}
	class:hide
>
	<div
		class="left"
		onclick={() => {
			if (page > 0) {
				page -= 1;
			}
		}}
	></div>
	<div
		class="right"
		onclick={() => {
			if (page < instance.pageNum - 1) {
				page += 1;
			}
		}}
	></div>
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
		position: relative;
	}

	.left {
		position: absolute;
		top: 0;
		left: 0;
		width: 50%;
		height: 100%;
	}

	.right {
		position: absolute;
		top: 0;
		right: 0;
		width: 50%;
		height: 100%;
	}

	.hide {
		filter: blur(4px);
	}
</style>
