<script lang="ts">
	import { RoomTagEnum, type RoomTagEnumType } from '$lib/data/room';
	import _static from '$lib/data/static';

	let { tag, comma = false }: { tag: RoomTagEnumType; comma?: boolean } = $props();

	const color = $derived(_static.tags[tag]?.color);
	const shadow = $derived(_static.tags[tag]?.shadow);
</script>

<div class="RoomTag" style="color: {color}; text-shadow: 0px 0px 7px {shadow || 'transparent'}">
	{RoomTagEnum[tag]}{comma ? ',' : ''}
</div>

<style>
	.RoomTag {
		display: inline-flex;
		font-family: cursive, sans-serif;
		font-size: 1.5em;
		font-family: 'DK Formosa', cursive;
	}
</style>
