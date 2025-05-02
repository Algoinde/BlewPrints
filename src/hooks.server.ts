import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const perf = performance.now();
	const response = await resolve(event);

	return response;
};
