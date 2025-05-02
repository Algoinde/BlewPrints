<script>
	import { tick } from 'svelte';

	export let text = '';
	export let width = 0;
	export let height = 0;
	export let element;
	export let newlines = false;
	export let maxWidth = '';
	let measure;
	function getFontShorthand(element) {
		if (!element) return;
		let style = getComputedStyle(element);
		return style.getPropertyValue('font-weight') + ' ' + style.getPropertyValue('font-size') + ' ' + style.getPropertyValue('font-family');
	}

	let lineHeight = '1';
	$: font = getFontShorthand(element);
	$: if (element) lineHeight = getComputedStyle(element).getPropertyValue('line-height');
	$: if (text !== undefined && measure)
		tick().then(() => {
			if (!measure) return;
			width = measure.offsetWidth;
			height = measure.offsetHeight;
		});
	let textChunks = [];
	$: if (newlines) {
		textChunks = text.split('\n');
	} else {
		textChunks = [text.replace(/\s/g, '\xa0')];
	}
</script>

<div
	bind:this={measure}
	style="font: {font}; line-height: {lineHeight}; max-width: {maxWidth}; {newlines
		? 'white-space: pre-wrap; word-wrap: anywhere;'
		: 'white-space: nowrap'} {$$props.style}"
>
	{#each textChunks as chunk, index}{#if index > 0}<br />{/if}
		<span>{chunk || 'b'}</span>{/each}
</div>

<style>
	div {
		position: absolute !important;
		visibility: hidden !important;
		pointer-events: none !important;
		display: inline-block;
		flex-grow: 0;
		align-self: flex-start;
	}
</style>
