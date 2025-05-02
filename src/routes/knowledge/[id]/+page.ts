import Objects from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const id = params.id as keyof typeof Objects.know.map;

	if (!(id in Objects.know.map)) {
		throw error(404, `Knowledge ${id} not found`);
	}

	return {
		know: Objects.know.map[id]
	};
};
