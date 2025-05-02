<script lang="ts">
	import { ItemInstance } from '$lib/data/item';
	import Item from './Item.svelte';
	import UnityTextRenderer from './UnityTextRenderer.svelte';

	let {
		instance,
		short = false,
		link = false,
		big = false
	}: { instance: ItemInstance; short?: boolean; link?: boolean; big?: boolean } = $props();
</script>

<div class="ItemView" class:short class:big>
	<div class="left">
		<Item {instance} {link} />
	</div>
	<div class="right">
		<h2>{instance.name}</h2>
		<p><UnityTextRenderer text={instance.description} /></p>
	</div>
</div>

<style>
	.ItemView {
		display: flex;
		gap: 2em;
	}

	.big {
		font-size: 1.2em;
	}

	.left :global(.Item) {
		margin-bottom: 0.5em;
	}

	.short {
		font-size: 0.8em;
	}

	.tags {
		margin-bottom: 0.5em;
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.5em;
	}
</style>
