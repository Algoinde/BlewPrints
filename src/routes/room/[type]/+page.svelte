<script lang="ts">
	import Objects from '$lib/data';
	import Room from '$lib/ui/Room.svelte';
	import Page from '$lib/ui/Page.svelte';
	import { page } from '$app/state';
	import type { RoomTagEnumType } from '$lib/data/room';

	const type = $derived(Number(page.params.type) as RoomTagEnumType);

	const roomsByTag = $derived(
		Objects.room.table.filter((room) => {
			return room.category == type && !room.isUpgrade;
		})
	);
</script>

<Page>
	{#snippet title()}
		Rooms
	{/snippet}

	{#snippet content()}
		<div class="RoomList">
			{#each Object.values(roomsByTag) as instance (instance.id)}
				<Room {instance} link />
			{/each}
		</div>
	{/snippet}
</Page>

<style>
	.RoomList {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}
</style>
