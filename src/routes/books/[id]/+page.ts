import Objects from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const id = params.id as keyof typeof Objects.book.map;

	if (!(id in Objects.book.map)) {
		throw error(404, `bookledge ${id} not found`);
	}

	return {
		know: Objects.book.map[id]
	};
};
