import { resolve } from '.';

export class ItemInstance {
	data: any;
	constructor(o: any) {
		this.data = o;
	}

	get id() {
		return this.data.id;
	}
	get prefix() {
		return this.data.prefix;
	}
	get name() {
		return this.data.name;
	}
	get description() {
		return this.data.description;
	}
	get comment() {
		return this.data.location;
	}
	get tier() {
		return this.data.tier;
	}
	get craftedFrom() {
		return this.data._craftedFrom?.map(resolve) || [];
	}
	get reagentFor() {
		return Objects.item.table.filter((i) => i.craftedFrom.includes(this));
	}
	get foundIn() {
		return Objects.room.table.filter(
			(r) => r.alwaysSpawns.includes(this) || r.randomSpawnPool.includes(this)
		);
	}
	get tradeable() {
		return this.data.tradeable;
	}
	get image() {
		return `/images/items/${this.id}.png`;
	}
	get link() {
		return `/item/${this.id}/`;
	}
}

import excel from './excel/items.csv?raw';
import { ExcelSchema } from './lib/parse';

import Objects from '.';
Objects.item = new ExcelSchema<ItemInstance>(
	excel,
	[
		{ key: 'id', type: String },
		{ key: 'prefix', type: String },
		{ key: 'name', type: String },
		{ key: 'description', type: String },
		{
			key: '_craftedFrom',
			type: (c: string) =>
				c
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
		},
		{
			key: 'tradeable',
			type: (c: string) => c === 'TRUE'
		},
		{
			key: 'comment',
			type: String
		},
		{
			key: 'tier',
			type: Number
		}
	],
	ItemInstance
);
