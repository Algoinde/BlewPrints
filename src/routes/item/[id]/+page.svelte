<script lang="ts">
	import Page from '$lib/ui/Page.svelte';
	import ItemView from '$lib/ui/ItemView.svelte';

	import type { PageProps } from './$types';
	import Item from '$lib/ui/Item.svelte';
	import Room from '$lib/ui/Room.svelte';
	let { data }: PageProps = $props();

	const { item } = $derived(data);

	const craftedFrom = $derived(item.craftedFrom);
	const reagentFor = $derived(item.reagentFor);
	const foundIn = $derived(item.foundIn);
</script>

<Page>
	{#snippet title()}
		Item
	{/snippet}

	{#snippet content()}
		<div class="PageItem">
			<ItemView instance={item} big></ItemView>

			{#if craftedFrom.length}
				<h3>Crafted from</h3>

				<div class="crafted">
					{#each craftedFrom as instance}
						<Item {instance} link />
					{/each}
				</div>
			{/if}

			{#if reagentFor.length}
				<h3>Reagent for</h3>

				<div class="crafted">
					{#each reagentFor as instance}
						<Item {instance} link />
					{/each}
				</div>
			{/if}

			{#if foundIn.length}
				<h3>Found in</h3>

				<div class="crafted">
					{#each foundIn as instance}
						<Room {instance} link />
					{/each}
				</div>
			{/if}
		</div>
	{/snippet}
</Page>

<style>
	.PageItem {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.crafted {
		display: flex;
		gap: 0.5em;
		flex-wrap: wrap;
	}
</style>
