<script lang="ts">
	import Room from '$lib/ui/Room.svelte';
	import RoomRarity from '$lib/ui/RoomRarity.svelte';
	import RoomTag from '$lib/ui/RoomTag.svelte';
	import { RoomInstance } from '$lib/data/room';
	import UnityTextRenderer from './UnityTextRenderer.svelte';

	let {
		instance,
		short = false,
		link = false
	}: { instance: RoomInstance; short?: boolean; link?: boolean } = $props();
</script>

{#snippet meta(instance: RoomInstance)}
	<div class="rarity">
		<RoomRarity rarity={instance.defaultRarity} />
	</div>
	<div class="tags">
		{#each [...instance.tags.values()].sort() as tag, index}
			<RoomTag {tag} comma={index < instance.tags.size - 1} />
		{/each}
	</div>
{/snippet}

<div class="RoomView" class:short>
	<div class="left">
		<Room {instance} {link} />
	</div>
	<div class="right">
		<h2>{String(instance.number).padStart(3, '0')} | {instance.name}</h2>
		{@render meta(instance)}
		{#if !short}<p><UnityTextRenderer text={instance.description} /></p>{/if}
	</div>
</div>

<style>
	.RoomView {
		display: flex;
		gap: 2em;
		flex-wrap: wrap;
	}

	.right {
		flex-basis: 60%;
	}

	.short {
		font-size: 0.8em;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0 0.5em;
	}
</style>
