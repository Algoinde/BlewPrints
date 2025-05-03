import 'core-js/proposals/set-methods-v2';

import { Enum } from '$lib/enum';
import Objects, { resolve } from '.';

export const RoomTagEnum = Enum('RoomTag', {
	Blueprint: 0,
	Bedroom: 1,
	Hallway: 2,
	Green: 3,
	Shop: 4,
	Red: 5,
	Addition: 6,
	Found: 7,
	Outer: 8,

	Blackprint: 100,
	Puzzle: 101,
	Mechanical: 102,
	Drafting: 103,
	Spread: 104,
	Tomorrow: 105,
	Entry: 106,

	Permanent: 200,
	Upgrade: 201,
	Objective: 202,

	DeadEnd: 300,
	TwoWay: 301,
	ThreeWay: 302,
	FourWay: 303,
	Polymorphic: 304,
	BackAccess: 305,

	Right: 400,
	Left: 401,
	RightLeft: 402,
	LeftForward: 403,
	RightForward: 404,
	Through: 405,

	Zone: 500
});
export type RoomTagEnumType = (typeof RoomTagEnum._values)[number];

export const RoomColorEnum = Enum('RoomColor', {
	Blue: 0,
	Violet: 1,
	Orange: 2,
	Green: 3,
	Gold: 4,
	Red: 5,
	Black: 6
});
export type RoomColorEnumType = (typeof RoomColorEnum._values)[number];

export const RoomRarityEnum = Enum('Rarity', {
	Commonplace: 0,
	Standard: 1,
	Unusual: 2,
	Rare: 3
});
export type RoomRarityEnumType = (typeof RoomRarityEnum._values)[number];

export class RoomInstance extends Instance {
	namespace = 'room';
	constructor(o: any) {
		super();
		this.data = o;
		this.data.upgrades = this.data.upgrades || [];
	}

	get id() {
		return this.data.id;
	}
	get isUpgrade() {
		return this.data.baseRoomId !== undefined;
	}
	get baseRoomId() {
		return this.data.baseRoomId;
	}
	get name() {
		return this.data.name;
	}
	get description() {
		return this.data.description;
	}
	get number() {
		return this.data.number;
	}
	get tags() {
		return this.data.tags;
	}
	get cost() {
		return this.data.cost;
	}
	get defaultRarity() {
		return this.data.defaultRarity;
	}
	get category() {
		return this.data.category ?? resolve('room:' + this.baseRoomId)?.category;
	}
	get randomSpawnPool() {
		return this.data._randomSpawnPool.map(resolve).sort(Sort.by('tier')) || [];
	}
	get alwaysSpawns() {
		return this.data._alwaysSpawns.map(resolve) || [];
	}
	get conditionalSpawns() {
		return this.data._conditionalSpawns.map(resolve) || [];
	}
	get firstSpawns() {
		return this.data._firstSpawns.map(resolve) || [];
	}
	get image() {
		return `/images/rooms/${this.id}-n.png`;
	}
	get knowledgeItems() {
		return Objects.know.table.filter((k) => k.location.has(this.globalId));
	}
	get link() {
		return `/room/${this.category}/${this.id}/`;
	}
}
import { ExcelSchema, Field, Sort } from './lib/parse';

import roomsExcel from './excel/rooms.csv?raw';

export const roomData = new ExcelSchema<RoomInstance>(
	roomsExcel,
	[
		{
			key: 'id',
			type: String
		},
		{
			key: 'number',
			type: Number
		},
		{
			key: 'name',
			type: String
		},
		{
			key: 'description',
			type: String
		},
		{
			key: 'imageTitle',
			type: String
		},
		{
			key: 'imageDesc',
			type: String
		},
		{
			key: 'defaultRarity',
			type: (r: keyof typeof RoomRarityEnum) => RoomRarityEnum[r] || 0
		},
		{
			key: 'tags',
			type: (s: string) =>
				new Set(s.split(',').map((t) => RoomTagEnum[t.trim() as keyof typeof RoomTagEnum]))
		},
		{
			key: 'cost',
			type: Number
		},
		{
			key: '_randomSpawnPool',
			type: Field.commaSeparatedArray
		},
		{
			key: '_alwaysSpawns',
			type: Field.commaSeparatedArray
		},
		{
			key: '_conditionalSpawns',
			type: Field.commaSeparatedArray
		},
		{
			key: '_firstSpawns',
			type: Field.commaSeparatedArray
		},
		{
			key: 'comment',
			type: String
		},
		{
			key: 'category',
			type: Number
		}
	],
	RoomInstance
);

import upgradesExcel from './excel/upgrades.csv?raw';

export const upgradeData = new ExcelSchema<RoomInstance>(
	upgradesExcel,
	[
		{
			key: 'baseRoomId',
			type: String
		},
		{
			key: 'id',
			type: String
		},
		{
			key: 'number',
			type: Number
		},
		{
			key: '_',
			type: String
		},
		{
			key: 'name',
			type: String
		},
		{
			key: 'description',
			type: String
		},
		{
			key: 'imageTitle',
			type: String
		},
		{
			key: 'imageDesc',
			type: String
		},
		{
			key: 'defaultRarity',
			type: (r: keyof typeof RoomRarityEnum) => RoomRarityEnum[r] || 0
		},
		{
			key: 'tags',
			type: (s: string) =>
				new Set(s.split(',').map((t) => RoomTagEnum[t.trim() as keyof typeof RoomTagEnum]))
		},
		{
			key: 'cost',
			type: Number
		},
		{
			key: '_randomSpawnPool',
			type: Field.commaSeparatedArray
		},
		{
			key: '_alwaysSpawns',
			type: Field.commaSeparatedArray
		},
		{
			key: '_conditionalSpawns',
			type: Field.commaSeparatedArray
		},
		{
			key: '_firstSpawns',
			type: Field.commaSeparatedArray
		},
		{
			key: 'comment',
			type: String
		}
	],
	RoomInstance
);

// console.log('roomData', roomData);
// console.log('upgradeData', upgradeData);

import { Instance } from './lib';
Objects.room = roomData.merge(upgradeData);
