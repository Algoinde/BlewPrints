<script lang="ts">
	import type { ItemInstance } from '$lib/data/item';

	const {
		instance,
		link
	}: {
		instance: ItemInstance;
		link?: boolean;
	} = $props();
</script>

<svelte:element this={link ? 'a' : 'article'} class="Item" href={link ? instance.link : null}>
	<figure style="--image: url({instance.image})" title={instance.name}></figure>
</svelte:element>

<style>
	.Item {
		display: flex;
		gap: 1.5em;
	}

	figure {
		flex: 0 0 auto;
		margin: 0;
		width: 8.5em;
		height: 5em;
		background-image: var(--image);
		background-size: contain;
		border-top: 0.5em #1578c0 solid;
		border-bottom: 0.5em #1578c0 solid;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #1578c0;
		/* transform: skew(2deg); */
		border-radius: 3px;
	}
</style>
