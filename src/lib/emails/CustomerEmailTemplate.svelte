<script lang="ts">
	import { formatCurrency } from '$lib/utils/formatCurrency';
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

	export let orderId = 1;
	export let customerName = 'Customer';

	const orderRef = `VA${orderId.toString().padStart(4, '0')}`;

	const previewText = `Order VA${orderRef} has been placed!`;

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
		backgroundColor: '#54A2D3',
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

			<Heading style={heading}>Thanks for your order: {orderRef}</Heading>
			<Text style={paragraph}
				>Dear {customerName},<br /> We hope this message finds you well. Thank you for choosing Victorious
				Audio for your recent purchase. We are pleased to confirm your order and the PDF invoice is attached
				to this email.</Text
			>
			<Text style={{ ...paragraph, fontWeight: '700' }}>Payment Details:</Text>
			<Text style={review}
				>Account Holder: Benjamin Radford<br />
				Bank Name: TymeBank<br />
				Type: Savings <br />
				Branch Code: 678910 <br />
				Account Number: 51082354245 <br />
				Reference number: {orderRef}<br />
				Payment Amount: {formatCurrency(199)}
			</Text>
			<Text style={paragraph}
				>If you have any questions or need further assistance, please don't hesitate to reach out to
				our customer service at <Link href="mailto:ben@victoriousaudio.co.za "
					>ben@victoriousaudio.co.za</Link
				> <br /> Your satisfaction is our priority, and we appreciate your business. For information
				on what to do next, please visit: <Link href={`https://${baseUrl}/how-to-order`}
					>victoriousaudio.co.za/how-to-order
				</Link></Text
			>

			<Button pY={19} style={button} href={`https://${baseUrl}/how-to-order`}
				>Take the next steps</Button
			>

			<Text style={paragraph}>Thank you for choosing Victorious Audio!</Text>

			<Hr style={hr} />
			<Text style={footer}>Victorious Audio, Gqeberha, South Africa, 6001</Text>
		</Container>
	</Section>
</Html>
