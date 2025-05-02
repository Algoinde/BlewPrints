<script lang="ts">
	import { page } from '$app/state';
	import sidebar, { type SidebarItem } from '$lib/data/sidebar';
	import Button from './Button.svelte';

	let open = $state(false);

	function toggle() {
		open = !open;
	}
</script>

{#snippet route(r: SidebarItem)}
	<li>
		<a href={r.route} class:s={page.url.pathname?.startsWith(r.route)} onclick={toggle}>{r.title}</a
		>
		{#if r.children}
			<ul>
				{#each r.children as child}
					{@render route(child)}
				{/each}
			</ul>
		{/if}
	</li>
{/snippet}

<div class="menu"><Button label="Menu" on:click={toggle} /></div>
<aside class="Sidebar" class:open>
	<h1><a href="/" onclick={toggle}>Holly Estate</a></h1>
	<ul>
		{#each sidebar as item}
			{@render route(item)}
		{/each}
	</ul>
</aside>

<style>
	.Sidebar {
		padding-left: var(--page-padding-x);
		background: rgba(0, 0, 0, 0.3);
		color: rgb(255, 252, 240);
		width: 15em;
		box-sizing: content-box;
		flex-shrink: 0;
		box-shadow: -1999px 0px 0px 2000px rgba(0, 0, 0, 0.3);
	}

	.menu {
		display: none;
	}

	@media (max-width: 700px) {
		.Sidebar {
			position: fixed;
			right: 0;
			top: 0;
			height: 100vh;
			transform: translateX(100%);
			z-index: 200;
			transition: transform 0.2s ease;
			background: black;
			box-shadow: none;
			padding-left: 1em;
			width: 100vw;
		}

		.Sidebar.open {
			transform: translateX(0);
		}
		.menu {
			display: block;
			position: fixed;
			right: 2em;
			top: 1.5em;
			z-index: 201;
		}
	}

	h1 {
		font-size: 2em;
		padding: 0.8em 0.5em;
		text-align: center;
	}

	ul {
		display: flex;
		flex-direction: column;
	}

	ul ul {
		padding-left: 1em;
	}

	ul a {
		display: block;
		padding: 0.5em 1em 0.5em 2em;
	}

	ul a:hover {
		background: rgba(255, 252, 240, 0.1);
		color: rgb(255, 255, 255);
	}

	.s {
		background: rgba(255, 252, 240, 0.1);
	}
</style>
