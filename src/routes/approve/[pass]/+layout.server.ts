import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
	if (params.pass !== env.PASS) {
		throw redirect(307, '/');
	}
};
