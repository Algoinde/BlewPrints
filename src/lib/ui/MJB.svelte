<script>
	function swap(a, b) {
		const c = board.tiles[b];
		board.tiles[b] = board.tiles[a];
		board.tiles[a] = c;
	}

	function rotate(positions) {
		const values = positions.map((p) => board.tiles[p]);
		values.unshift(values.pop());
		console.log(values);
		positions.forEach((i, j) => {
			board.tiles[i] = values[j];
		});
	}

	const Tile = {
		red: 0,
		green: 1,
		yellow: 2,
		violet: 3,
		orange: 4,
		black: 5,
		white: 6,
		gray: 7,
		blue: 8
	};

	const Tiles = [
		{
			color: 'red',
			rule: (i) => {
				board.tiles.forEach((tile, j) => {
					if (tile === Tile.black) {
						board.tiles[j] = Tile.red;
					}
					if (tile === Tile.white) {
						board.tiles[j] = Tile.black;
					}
				});
			}
		},
		{
			color: 'green',
			rule: (i) => {
				switch (i) {
					case 0:
					case 8:
						swap(0, 8);
						break;
					case 1:
					case 7:
						swap(1, 7);
						break;
					case 6:
					case 2:
						swap(2, 6);
						break;
					case 3:
					case 5:
						swap(3, 5);
						break;
				}
			}
		},
		{
			color: 'yellow',
			rule: (i) => {
				switch (i) {
					case 3:
						swap(3, 0);
						break;
					case 4:
						swap(4, 1);
						break;
					case 5:
						swap(5, 2);
						break;
					case 6:
						swap(6, 3);
						break;
					case 7:
						swap(7, 4);
						break;
					case 8:
						swap(8, 5);
						break;
				}
			}
		},
		{
			color: 'purple',
			rule: (i) => {
				switch (i) {
					case 0:
						rotate([3, 4, 1]);
						break;
					case 1:
						rotate([0, 3, 4, 5, 2]);
						break;
					case 2:
						rotate([1, 4, 5]);
						break;
					case 3:
						rotate([6, 7, 4, 1, 0]);
						break;
					case 4:
						rotate([0, 1, 2, 5, 8, 7, 6, 3]);
						break;
					case 5:
						rotate([2, 1, 4, 7, 8]);
						break;
					case 6:
						rotate([7, 4, 3]);
						break;
					case 7:
						rotate([8, 5, 4, 3, 6]);
						break;
					case 8:
						rotate([5, 4, 7]);
						break;
				}
			}
		},
		{ color: 'orange', rule: (i) => {} },
		{
			color: 'black',
			rule: (i) => {
				switch (i) {
					case 0:
					case 1:
					case 2:
						rotate([0, 1, 2]);
						break;
					case 3:
					case 4:
					case 5:
						rotate([3, 4, 5]);
						break;
					case 6:
					case 7:
					case 8:
						rotate([6, 7, 8]);
						break;
				}
			}
		},
		{ color: 'white', rule: (i) => {} },
		{ color: 'gray', rule: (i) => {} },
		{ color: 'blue', rule: (i) => {} },
		{ color: 'violet', rule: (i) => {} }
	];

	let board = $state({
		corners: [
			[1, 0],
			[2, 1],
			[3, 0],
			[4, 1]
		],
		tiles: [0, 1, 5, 3, 4, 5, 6, 2, 8]
	});
</script>

<div class="MJB">
	{#each board.corners as [corner, on] (corner)}
		<button class="corner" style="--color: {on ? Tiles[corner].color : 'black'}"></button>
	{/each}
	<div class="area">
		{#each board.tiles as tile, i}
			<button class="tile" style="--color: {Tiles[tile].color}" onclick={() => Tiles[tile].rule(i)}
				>{i}</button
			>
		{/each}
	</div>
</div>

<style>
	.MJB {
		width: 30em;
		height: 30em;
		background: #120e0e;
		border-radius: 1em;
		position: relative;
	}
	.corner {
		width: 4em;
		height: 4em;
		background-color: var(--color);
		position: absolute;
	}
	.corner:nth-child(1) {
		top: 1em;
		left: 1em;
	}
	.corner:nth-child(2) {
		top: 1em;
		right: 1em;
	}
	.corner:nth-child(3) {
		bottom: 1em;
		right: 1em;
	}
	.corner:nth-child(4) {
		bottom: 1em;
		left: 1em;
	}
	.area {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1em;
		position: absolute;
		top: 5.5em;
		left: 5.5em;
		right: 5.5em;
		bottom: 5.5em;
		background-color: #120e0e;
	}
	.tile {
		border: 2px solid rgba(0, 0, 0, 0.5);
		/* height: 5em;
		width: 5em; */
		font-size: 3em;
		background-color: var(--color);
	}
</style>
