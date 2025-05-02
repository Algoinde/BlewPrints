<script>
		export let name;
		export let focusable = false;
		let icons = {
    "chevron-left": {
        "viewBox": "0 0 24 24",
        "svg": "<path d=\"M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6z\"/>"
    }
};
		$: displayIcon = icons[name];
	</script>
	{#if displayIcon}
		{@html `<svg xmlns="http://www.w3.org/2000/svg" class="${$$props.class || name}" style="${$$props.style}" viewBox="${
			displayIcon?.viewBox
		}">` +
			displayIcon?.svg +
			'</svg>'}
	{/if}