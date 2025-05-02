<script lang="ts">
	import { RoomRarityEnum, type RoomRarityEnumType } from '$lib/data/room';
	let { rarity }: { rarity: RoomRarityEnumType } = $props();
	const name = $derived(RoomRarityEnum[rarity]);
</script>

<div class="RoomRarity">
	<span>
		{#each Array(rarity + 1) as _, i}
			<i data-rarity={i}></i>
		{/each}
	</span>
	<span data-rarity={rarity}>{name}</span>
</div>

<style>
	.RoomRarity {
		display: inline-flex;
		gap: 0.3em;
		align-items: center;
		font-size: 1.5em;
		font-weight: 200;
		font-family: 'DK Formosa', cursive;
	}

	i {
		display: inline-block;
		width: 0.4em;
		height: 0.4em;
		margin: 0 0.1em;
		border-radius: 50%;
		position: relative;
		top: -0.1em;
		background: var(--color);
	}
	span {
		color: var(--color);
	}
	[data-rarity='0'] {
		--color: #796569;
	}
	[data-rarity='1'] {
		--color: #9d636f;
	}
	[data-rarity='2'] {
		--color: #cf5772;
	}
	[data-rarity='3'] {
		--color: #ff3b66;
	}
</style>
