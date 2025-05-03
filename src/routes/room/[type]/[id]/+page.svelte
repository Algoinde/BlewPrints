<script lang="ts">
	import RoomView from '$lib/ui/RoomView.svelte';
	import Page from '$lib/ui/Page.svelte';
	import Objects from '$lib/data';

	import type { PageProps } from './$types';
	import Item from '$lib/ui/Item.svelte';
	import Knowledge from '$lib/ui/Knowledge.svelte';
	let { data }: PageProps = $props();

	const { room } = $derived(data);

	const upgrades = $derived(Objects.room.table.filter((upgrade) => upgrade.baseRoomId === room.id));
	const randomSpawnPool = $derived(room.randomSpawnPool);
	const alwaysSpawns = $derived(room.alwaysSpawns);
	const conditionalSpawns = $derived(room.conditionalSpawns);
	const knowledgeItems = $derived(room.knowledgeItems);
</script>

<Page>
	{#snippet title()}
		Room
	{/snippet}

	{#snippet content()}
		<div class="PageRoom">
			<RoomView instance={room}></RoomView>

			{#if randomSpawnPool.length}
				<h3>Random spawn pool</h3>
				<div class="items">
					{#each randomSpawnPool as instance}
						<Item {instance} link></Item>
					{/each}
				</div>
			{/if}
			{#if alwaysSpawns.length}
				<h3>Always spawns</h3>
				<div class="items">
					{#each alwaysSpawns as instance}
						<Item {instance} link></Item>
					{/each}
				</div>
			{/if}
			{#if conditionalSpawns.length}
				<h3>Conditional spawn</h3>
				<div class="items">
					{#each conditionalSpawns as instance}
						<Item {instance} link></Item>
					{/each}
				</div>
			{/if}
			{#if knowledgeItems.length}
				<h3>Knowledge items</h3>
				<div class="items">
					{#each knowledgeItems as instance}
						<Knowledge {instance} hide link></Knowledge>
					{/each}
				</div>
			{/if}
			{#if upgrades.length}
				<h3>Upgrades</h3>
				<div class="upgrades">
					{#each upgrades as instance}
						<RoomView {instance} short link></RoomView>
					{/each}
				</div>
			{/if}
		</div>
	{/snippet}
</Page>

<style>
	.PageRoom {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.upgrades {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-bottom: 2em;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		margin-bottom: 1em;
	}

	h3 {
		margin-top: 1em;
	}
</style>
