<script>
	import Button from '$lib/ui/Button.svelte';
	import SvgIcon from '$lib/ui/icon/SvgIcon.svelte';
	import Input from '$lib/ui/Input.svelte';

	let { content, title } = $props();

	let search = $state('');
</script>

<header>
	<Button
		component={SvgIcon}
		icon="chevron-left"
		on:click={() => {
			history.back();
		}}
	/>
	<h2>{@render title()}</h2>
	<!-- <Input placeholder="Search" bind:value={search} /> -->
</header>
{@render content?.()}

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		gap: 0.5em;
	}

	h2 {
		margin-right: auto;
	}
</style>
