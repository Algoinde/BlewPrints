import Objects from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const id = params.id as keyof typeof Objects.room.map;

	if (!(id in Objects.room.map)) {
		throw error(404, `Room ${id} not found`);
	}

	return {
		room: Objects.room.map[id]
	};
};
