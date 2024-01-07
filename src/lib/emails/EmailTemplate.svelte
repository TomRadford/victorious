<script lang="ts">
	import type { Customer, Order } from '@prisma/client';
	import {
		Button,
		Container,
		Head,
		Heading,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Section,
		Text
	} from 'svelte-email';

	const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

	export let order: Order;
	export let customer: Customer;

	const previewText = `Order ${order.id} has been placed!`;

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px',
		width: '580px'
	};

	const userImage = {
		margin: '0 auto',
		marginBottom: '16px',
		borderRadius: '50%'
	};

	const heading = {
		fontFamily,
		fontSize: '32px',
		lineHeight: '1.3',
		fontWeight: '700',
		color: '#484848'
	};

	const paragraph = {
		fontFamily,
		fontSize: '18px',
		lineHeight: '1.4',
		color: '#484848'
	};

	const review = {
		...paragraph,
		padding: '24px',
		backgroundColor: '#f2f3f3',
		borderRadius: '4px'
	};

	const button = {
		fontFamily,
		backgroundColor: '#ff5a5f',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '18px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block',
		width: '100%'
	};

	const link = {
		...paragraph,
		color: '#ff5a5f',
		display: 'block'
	};

	const reportLink = {
		fontFamily,
		fontSize: '14px',
		color: '#9ca299',
		textDecoration: 'underline'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#9ca299',
		fontSize: '14px',
		marginBottom: '10px'
	};
</script>

<Html>
	<Head />
	<Preview preview={previewText} />
	<Section style={main}>
		<Container style={container}>
			<Img src={`${baseUrl}/va-logo.jpg`} width="200" height="200" alt="Victorious Audio" />

			<Heading style={heading}>Thanks for your order! //here!!</Heading>
			<Text style={review}>Please find</Text>
			<Text style={paragraph}></Text>
			<Text style={paragraph}></Text>
			<!-- <Section style={{ padding: '16px 0 20px' }}>
				<Button pY={19} style={button} href="https://airbnb.com/">Send My Feedback</Button>
			</Section> -->

			<Hr style={hr} />
			<Text style={footer}>Victorious Audio, Gqeberha, South Africa, 6001</Text>
		</Container>
	</Section>
</Html>
