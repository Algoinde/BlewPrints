import { readFileSync, writeFileSync, readdirSync } from "fs";
import { optimize } from "svgo";

function renderIcons(directoryPath, prefix = "svg") {
	let icons = {};
	let files = readdirSync(directoryPath);
	files
		.filter((file) => file.includes(".svg"))
		.forEach((file) => {
			let icon = readFileSync(directoryPath + file, "utf-8");
			icon = optimize(icon, {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								inlineStyles: false,
								minifyStyles: false,
								removeViewBox: false,
							},
						},
					},
					{
						name: "prefixIds",
						params: {
							prefix: `${prefix}-${file.replace(".svg", "")}`,
							prefixClassNames: false,
						},
					},
				],
			}).data;
			icons[file.replace(".svg", "")] = {
				viewBox: (/viewBox="(.*?)"/.exec(icon) || ["", "0 0 14 14"])[1],
				svg: icon.replace(/<svg.*?>/g, "").replace(/<\/svg>/g, ""),
			};
		});

	prefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);

	let template = `<script>
		export let name;
		export let focusable = false;
		let icons = ${JSON.stringify(icons, "\t", 4)};
		$: displayIcon = icons[name];
	</script>
	{#if displayIcon}
		{@html \`<svg xmlns="http://www.w3.org/2000/svg" class="\$\{$$props.class || name}" style="\$\{$$props.style}" viewBox="\$\{
			displayIcon?.viewBox
		}">\` +
			displayIcon?.svg +
			'</svg>\'}
	{/if}`;

	writeFileSync(`src/lib/ui/icon/${prefix}Icon.svelte`, template);
}
renderIcons("static/svg/");

readdirSync("static/svg/", { withFileTypes: true })
	.filter((item) => item.isDirectory())
	.forEach((item) => {
		renderIcons(`static/svg/${item.name}/`, item.name);
	});
