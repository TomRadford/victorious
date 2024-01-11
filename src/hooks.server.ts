import { env } from '$env/dynamic/private';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies } = event;

	const userToken = cookies.get('pass');

	if (event.url.pathname.startsWith('/admin'))
		if (userToken !== env.PASS) {
			throw redirect(307, `/auth?redir=${event.url.pathname}`);
		}

	const response = await resolve(event); // Stage 2

	// Stage 3

	return response;
};
