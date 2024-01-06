import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	name: z.string().default('Hello world!'),
	email: z.string().email()
});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};
