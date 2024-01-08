import EmailTemplate from '$lib/emails/CustomerEmailTemplate.svelte';
import { render } from 'svelte-email';

export function GET() {
	const html = render({
		template: EmailTemplate
	});

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html'
		}
	});
}
