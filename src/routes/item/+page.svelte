<script lang="ts">
	import Objects from '$lib/data';
	import Item from '$lib/ui/Item.svelte';
	import Page from '$lib/ui/Page.svelte';
</script>

<Page>
	{#snippet title()}
		Items
	{/snippet}

	{#snippet content()}
		<div class="ItemList">
			{#each Objects.item.table as instance (instance.id)}
				<Item {instance} link />
			{/each}
		</div>
	{/snippet}
</Page>

<style>
	.ItemList {
		display: flex;
		flex-wrap: wrap;
		gap: 2em;
		justify-content: flex-start;
	}

	.ItemList > :global(.Item) {
		flex-shrink: 0;
	}
</style>
