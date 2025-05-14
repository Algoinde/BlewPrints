<script lang="ts">
	import Page from '$lib/ui/Page.svelte';
	import ItemView from '$lib/ui/ItemView.svelte';

	import type { PageProps } from './$types';
	import Item from '$lib/ui/Item.svelte';
	import Room from '$lib/ui/Room.svelte';
	import KnowledgeView from '$lib/ui/KnowledgeView.svelte';
	import UnityTextRenderer from '$lib/ui/UnityTextRenderer.svelte';
	let { data }: PageProps = $props();

	const { know } = $derived(data);

	const foundIn = $derived(know.foundIn);
</script>

<Page>
	{#snippet title()}
		Item
	{/snippet}

	{#snippet content()}
		<div class="PageItem">
			<KnowledgeView instance={know} big></KnowledgeView>

			{#if foundIn.length}
				<h3>Found in</h3>

				<div class="crafted">
					{#each foundIn as instance}
						<Room {instance} link />
					{/each}
				</div>
			{/if}

			{#if know.parsedText}
				<h3>Full text</h3>
				<p>
					<UnityTextRenderer text={know.parsedText} />
				</p>
			{/if}

			{#if know.magnifierParsedText}
				<h3>Hidden text</h3>
				<p>
					<UnityTextRenderer text={know.magnifierParsedText} />
				</p>
			{/if}
		</div>
	{/snippet}
</Page>

<style>
	.PageItem {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.crafted {
		display: flex;
		gap: 0.5em;
		flex-wrap: wrap;
	}

	h3 {
		margin-top: 1em;
	}
</style>
