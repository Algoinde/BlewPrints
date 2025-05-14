<script lang="ts">
	import Objects from '$lib/data';
	import Knowledge from '$lib/ui/Knowledge.svelte';
	import Page from '$lib/ui/Page.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Page>
	{#snippet title()}
		Books
	{/snippet}

	{#snippet content()}
		<div class="PageKnowledge">
			<div class="list">
				{#each Objects.book.table as item (item.id)}
					<Knowledge instance={item} link hide />
				{/each}
			</div>
		</div>
	{/snippet}
</Page>

<style>
	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1em;
	}
</style>
