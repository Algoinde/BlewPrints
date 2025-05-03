<script lang="ts">
	import { KnowledgeInstance } from '$lib/data/knowledge';
	import Knowledge from './Knowledge.svelte';
	import UnityTextRenderer from './UnityTextRenderer.svelte';

	let {
		instance,
		short = false,
		link = false,
		big = false
	}: { instance: KnowledgeInstance; short?: boolean; link?: boolean; big?: boolean } = $props();
</script>

{#if big}
	<div class="KnowView" class:short>
		<Knowledge {instance} {link} big />
		<figcaption>{instance.name}</figcaption>

		<p><UnityTextRenderer text={instance.description} /></p>
	</div>
{:else}
	<div class="ItemView" class:short>
		<div class="left">
			<Knowledge {instance} {link} />
		</div>
		<div class="right">
			<h2>{instance.name}</h2>
			<p><UnityTextRenderer text={instance.description} /></p>
		</div>
	</div>
{/if}

<style>
	.KnowView {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
		user-select: none;
	}

	.KnowView :global(.Knowledge) {
		width: 100%;
		height: 25em;
	}

	.ItemView {
		display: flex;
		gap: 2em;
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
