<script context="module" lang="ts">
	export const Type = Enum('Type', {
		NONE: 0,
		OUTLINE: 1,
		FILL: 2,
		GRADIENT: 3,
		0: 'NONE',
		1: 'OUTLINE',
		2: 'FILL',
		3: 'GRADIENT'
	});
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

<script>
	import { Enum } from '$lib/enum';

	export let icon = '';
	export let label = '';
	export let active = false;
	export let type: (typeof Type._values)[number] = Type.NONE;
	export let variant: (typeof Variant._values)[number] = Variant.NEUTRAL;
	export let href = undefined;
	export let target = undefined;
	export let submit = false;
	export let component: ConstructorOfATypedSvelteComponent | null = null;

	export let button = null;
	export let anchor = 'ct';
	export let gravity = 'cb';

	export let mark = false;

	export let collapsible = false;

	const _ = { anchor: null };
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{target}
	style={$$props.style}
	on:click
	on:mouseenter
	on:mouseleave
	data-type={Type[type]}
	data-variant={Variant[variant]}
	class="Button {$$props.class}"
	class:label={label || $$slots.default}
	class:active
	class:icon
	class:collapsible
	class:mark
	data-icon={component ? undefined : icon}
	role="button"
	tabindex="0"
	bind:this={button}
>
	{#if icon}
		{#if !component}
			<img src={icon} alt="" />
		{:else}
			<svelte:component this={component} name={icon} />
		{/if}
	{/if}
	{#if label || $$slots.default}
		<span>
			{@html label}
			<slot />
		</span>
	{/if}
</svelte:element>

<style>
	.Button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		color: white;
		text-decoration: none;
		position: relative;
		transition:
			all 0.1s ease,
			top 0s linear;
		cursor: pointer;
		border-radius: 3px;
		vertical-align: middle;
		font-size: inherit;
		/* overflow: hidden; */
		box-sizing: border-box;
		height: 2.5em;
		z-index: 1;
		--success: #8fef71;
		user-select: none;
	}
	/* .Button + :global(.Button) {
		margin-left: 0.75em;
	} */

	.Button.icon {
		min-width: 2.5em;
	}
	.Button.label {
		padding: 0.6em 1.5em;
	}
	.Button.icon.label {
		padding-left: 0.8em;
		padding-right: 1.1em;
		gap: 0.2em 0.6em;
	}
	.Button.icon.mark:before {
		clip-path: polygon(
			0 100%,
			0 0,
			100% 0,
			100% 60%,
			87% 61%,
			77% 64%,
			70% 69%,
			64% 78%,
			61% 88%,
			60% 100%
		);
	}
	.Button.icon.mark:after {
		content: '';
		display: block;
		position: absolute;
		margin-bottom: -1em;
		margin-right: -1em;
		width: 0.4em;
		height: 0.4em;
		border-radius: 10em;
		background: #16a8ff;
		border: 1px solid;
		border-color: rgba(0, 0, 0, 0.4);
	}
	.Button.image.image {
		padding-left: 3.3em;
	}
	.Button:before {
		font-size: 1.2em;
	}
	.Button :global(img) {
		width: 1.35em;
		height: auto;
	}
	.Button :global(svg) {
		width: 1.2em;
		height: 1.2em;
	}
	.Button :global(svg *) {
		fill: white !important;
	}
	.Button span {
		font-size: 0.9em;
		white-space: nowrap;
	}
	.Button.icon span {
		display: inline-block;
		padding: 0 0 0 0em;
	}

	.Button:hover:hover:hover {
		box-shadow: 0 0 0 500px inset rgba(255, 255, 255, 0.1);
	}

	.Button.active {
		box-shadow: 0 0 0 500px inset rgba(0, 0, 0, 1);
	}

	.Button[data-type='OUTLINE'] {
		border: 1px solid;
	}
	.Button[data-type='NONE'][data-variant='PRIMARY'],
	.Button[data-type='OUTLINE'][data-variant='PRIMARY'] {
		color: #6baae5;
	}
	.Button[data-type='NONE'][data-variant='WARNING'],
	.Button[data-type='OUTLINE'][data-variant='WARNING'] {
		color: #e99b43;
	}
	.Button[data-type='NONE'][data-variant='DANGER'],
	.Button[data-type='OUTLINE'][data-variant='DANGER'] {
		color: #dd6161;
	}
	.Button[data-type='NONE'][data-variant='SUCCESS'],
	.Button[data-type='OUTLINE'][data-variant='SUCCESS'] {
		color: #8cdd74;
	}
	.Button[data-type='OUTLINE'][data-variant='FADED'] {
		border-color: rgba(255, 255, 255, 0.2);
	}
	.Button[data-type='OUTLINE'][data-variant='DARK'] {
		border-color: rgba(255, 255, 255, 0.1);
	}
	.Button[data-type='OUTLINE'][data-variant='HALF'] {
		border-color: rgba(255, 255, 255, 0.5);
	}

	.Button[data-type='FILL'][data-variant='PRIMARY'] {
		background-color: #4579aa;
	}
	.Button[data-type='FILL'][data-variant='WARNING'] {
		background-color: #aa7232;
	}
	.Button[data-type='FILL'][data-variant='DANGER'] {
		background-color: #dd6161;
	}
	.Button[data-type='FILL'][data-variant='SUCCESS'] {
		background-color: #4b9534;
	}
	.Button[data-type='FILL'][data-variant='FADED'] {
		background-color: rgba(255, 255, 255, 0.2);
	}
	.Button[data-type='FILL'][data-variant='HALF'] {
		background-color: rgba(255, 255, 255, 0.5);
	}
	.Button[data-type='FILL'][data-variant='DARK'] {
		background-color: rgba(0, 0, 0, 0.3);
	}
	.Button[data-type='FILL'][data-variant='DARK']:hover {
		box-shadow: 0 0 0 500px inset rgba(0, 0, 0, 0.3);
	}

	.Button[data-type='NONE'] {
		border: none;
		background-color: transparent;
	}

	.Button[data-variant='FADED'] {
		opacity: 0.4;
		pointer-events: none;
	}

	canvas {
		position: absolute;
		height: 100%;
		width: auto;
		opacity: 0.8;
		left: 0;
		top: 0;
		pointer-events: none;
	}

	.anchor {
		font-size: 1rem;
		position: absolute;
		left: var(--offsetX);
		top: var(--offsetY);
		z-index: 10;
		pointer-events: all;
	}

	.anchor > :global(*) {
		top: 0;
		left: 0;
		transform: var(--gravity);
	}
	@media (max-width: 500px) {
		.collapsible {
			padding: 0 !important;
		}
		.collapsible > span {
			display: none !important;
		}
	}
</style>
