<script lang="ts">
	import type { RoomInstance } from '$lib/data/room';

	let { instance, link = false }: { instance: RoomInstance; link?: boolean } = $props();
</script>

{#snippet inner(instance: RoomInstance)}
	<div class="number">{String(instance.number).padStart(3, '0')}</div>
	<img src={instance.image} alt="" />
{/snippet}

{#if link}
	<a class="Room" href={instance.link} style="--image: url({instance.image})">
		{@render inner(instance)}
	</a>
{:else}
	<div class="Room" style="--image: url({instance.image})">
		{@render inner(instance)}
	</div>
{/if}

<style>
	.Room {
		display: flex;
		width: 10em;
		height: 10em;
		text-decoration: none;
		background: #080b0e;
		/* border: 6px solid #11171e; */
		justify-content: center;
		align-items: center;
		background-image: var(--image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		box-shadow: 0px 0px 0px 6px #11171e inset;
	}

	.number {
		font-size: 4em;
		color: rgba(255, 255, 255, 0.2);
		text-align: center;
	}

	img {
		margin: 0;
		border: none;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: none;
	}
</style>
