<script lang="ts">
	import { parseRichText, type ParsedNode } from './unityText';

	const { text } = $props();

	function tokenize(t: string) {
		return parseRichText(t);
	}

	function icons(t) {
		return t
			.replace(/\\n/g, '<br />')
			.replace(/\\r/g, '')
			.replace(/\{([A-Z]+)\}/g, '<span class="gic $1"></span>');
		// .replaceAll(`\\\\r`, '')
	}

	const node = $derived(tokenize(text));
</script>

{#snippet content(node: ParsedNode)}
	<svelte:element this={node.tag || 'span'} style={node.style}>
		{#if Array.isArray(node.content)}
			{#each node.content as child}
				{@render content(child)}
			{/each}
		{:else}
			{@html icons(node.content)}
		{/if}
	</svelte:element>
{/snippet}

{@render content(node)}

<style>
	:global(.gic) {
		display: inline-block;
		width: 1em;
		height: 1em;
		margin: 0 0.1em;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
		vertical-align: baseline;
		position: relative;
		top: 0.2em;
	}

	:global(.COIN) {
		background-image: url(/images/items/coin.png);
	}

	:global(.GEM) {
		background-image: url(/images/items/gem.png);
	}

	:global(.WATER) {
		background-image: url(/images/items/water.png);
	}

	:global(.DICE) {
		background-image: url(/images/items/dice.png);
	}

	:global(.STEP) {
		background-image: url(/images/items/steps.png);
	}

	:global(.KEY) {
		background-image: url(/images/items/key.png);
	}
</style>
