import { RoomTagEnum } from './room';

export interface SidebarItem {
	id: string;
	title: string;
	route: string;
	children?: SidebarItem[];
}

export default [
	{
		id: 'r',
		title: 'Rooms',
		route: '/room',
		children: [
			...RoomTagEnum._values
				.filter((v) => v < 100)
				.map((tag) => ({
					id: String(tag),
					title: RoomTagEnum[tag],
					route: `/room/${tag}`
				})),
			{
				id: '500',
				title: 'Zones',
				route: '/room/500'
			}
		]
	},
	{
		id: 'i',
		title: 'Items',
		route: '/item'
	},
	{
		id: 't',
		title: 'Interactables',
		route: '/interactable'
	},
	{
		id: 'c',
		title: 'Knowledge items',
		route: '/knowledge'
	},
	{
		id: 'b',
		title: 'Books',
		route: '/book'
	}
] as const satisfies SidebarItem[];
