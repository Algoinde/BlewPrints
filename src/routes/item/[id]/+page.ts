import Objects from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const id = params.id as keyof typeof Objects.item.map;

	if (!(id in Objects.item.map)) {
		throw error(404, `Item ${id} not found`);
	}

	return {
		item: Objects.item.map[id]
	};
};
