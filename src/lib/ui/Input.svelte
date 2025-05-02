<script context="module">
	export const Status = {
		ERROR: -1,
		NONE: 0,
		OK: 1,
		LOADING: 2
	};
	export const Variant = Enum('Variant', {
		NEUTRAL: 0,
		PRIMARY: 1,
		WARNING: 2,
		DANGER: 3,
		SUCCESS: 4,
		FADED: 5,
		HALF: 6,
		DARK: 7,
		0: 'NEUTRAL',
		1: 'PRIMARY',
		2: 'WARNING',
		3: 'DANGER',
		4: 'SUCCESS',
		5: 'FADED',
		6: 'HALF',
		7: 'DARK'
	});
</script>

<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import TextMeasure from '$lib/ui/TextMeasure.svelte';
	import enter from '$lib/use/enter';
	import escape from '$lib/use/escape';
	import { getContext, onMount } from 'svelte';
	import { Enum } from '$lib/enum';
	export let value = '';
	export let placeholder = '';
	export let status = undefined;
	export let dynamic = false;
	export let label = '';
	export let variant = Variant.NEUTRAL;
	export let name = '';
	const uuid = uuidv4();
	export let input: HTMLInputElement | null = null;
	export let limit = 500;
	export let stopPropagation = false;
	let width = 0;

	$: value = (value || '').substring(0, limit);

	export let focus = false;

	onMount(() => {
		if (focus) setTimeout(() => input.focus(), 1);
	});

	const dirty = getContext('dirty');

	function block(e) {
		if (stopPropagation) e.stopPropagation();
	}
</script>

<div class="Input" class:status>
	{#if dynamic}
		<TextMeasure element={input} bind:width text={value || placeholder || ''} />
	{/if}
	{#if label}
		<label for={uuid}>{label}</label>
	{/if}
	<div class="group">
		<input
			data-variant={Variant[variant]}
			id={uuid}
			use:enter
			use:escape
			on:enter
			on:escape
			on:input
			on:input={() => {
				if (dirty) $dirty = true;
			}}
			on:blur
			on:change
			on:focus
			on:keydown={block}
			bind:value
			bind:this={input}
			{placeholder}
			{name}
			style="width: {dynamic ? Math.max(100, width) : '-'}px; {$$props.style}"
		/>
		{#if status == Status.OK}
			<span data-icon="check" />
		{:else if status == Status.ERROR}
			<span data-icon="clear" />
		{:else if status == Status.LOADING}
			<span data-icon="loading" />
		{/if}
	</div>
</div>

<style>
	.Input {
		display: inline-flex;
		flex-direction: column;
	}
	.group {
		display: flex;
	}
	input {
		border: 0;
		background: rgba(0, 0, 0, 0.3);
		padding: 0 1em 0 1em;
		height: calc(2.5em - 2px);
		border: 1px solid transparent;
		border-radius: 0.2em;
		color: white;
		font-weight: normal;
		font-size: inherit;
		box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.4) inset;
		outline: none;
		font: inherit;
		min-width: 0;
		width: 100%;
	}
	input {
		padding-right: 2.3em;
	}
	span {
		width: 1.7em;
		font-size: 1.3em;
		margin-left: -1.7em;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		align-self: stretch;
	}
	span[data-icon='check'] {
		color: #96d85c;
	}
	span[data-icon='clear'] {
		color: #d85c5c;
	}
	label {
		display: block;
		margin-bottom: 0.4em;
		font-size: 0.85em;
		opacity: 0.8;
	}
	/* .disabled {
	pointer-events: none;
	opacity: 0.4;
} */

	input[data-variant='PRIMARY'] {
		border-color: #4579aa;
	}
	input[data-variant='WARNING'] {
		border-color: #e99b43;
	}
	input[data-variant='DANGER'] {
		border-color: #dd6161;
	}
	input[data-variant='SUCCESS'] {
		border-color: #6ae943;
	}
	input[data-variant='FADED'] {
		border-color: rgba(255, 255, 255, 0.2);
	}
	input[data-variant='HALF'] {
		border-color: rgba(255, 255, 255, 0.5);
	}
</style>
