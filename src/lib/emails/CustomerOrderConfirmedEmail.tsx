import { formatCurrency } from '../utils/formatCurrency';
import type { Customer, Line, Order } from '@prisma/client';
import {
	Body,
	Container,
	Column,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
	Button
} from '@react-email/components';
import * as React from 'react';

const baseUrl = `https://victoriousaudio.co.za`;

export const CustomerOrderConfirmedEmail = ({
	order = {
		customerEmail: 'test@test.com',
		id: 3,
		createdAt: new Date(),
		updatedAt: new Date(),
		approved: true
	},
	lines = [
		{
			orderId: 3,
			price: 4499,
			productName: 'Triple Driver',
			productId: `triple-driver`,
			baseColour: 'blue',
			faceplateColour: 'green',
			id: '324234324',
			logoColourLeft: 'black',
			logoColourRight: 'black',
			logoTypeLeft: 'VA',
			logoTypeRight: 'None'
		},
		{
			orderId: 4,
			price: 4499,
			productName: 'Triple Driver',
			productId: `triple-driver`,
			baseColour: 'blue',
			faceplateColour: 'green',
			id: '324234324',
			logoColourLeft: 'black',
			logoColourRight: 'black',
			logoTypeLeft: 'VA',
			logoTypeRight: 'None'
		}
	],
	customer = {
		email: 'test@example.com',
		address1: '1 Road',
		address2: 'Area',
		city: 'Cape Town',
		name: 'Testy Testman',
		phone: '+278412345678',
		province: 'Western Cape',
		zipcode: '7001'
	}
}: {
	customer: Customer;
	order: Order;
	lines: Line[];
}) => {
	const orderRef = `VA${order.id.toString().padStart(4, '0')}`;
	const total = lines.reduce((acc, c) => acc + c.price, 0);
	return (
		<Html>
			<Head />
			<Preview>Victorious Audio Invoice</Preview>

			<Body style={main}>
				<Container style={container}>
					<Section>
						<Column>
							<Img
								src={`${baseUrl}/va-logo.jpg`}
								width="200"
								height="200"
								alt="Victorious Audio Logo"
							/>
						</Column>

						<Column align="right" style={tableCell}>
							<Text style={heading}>Invoice</Text>
						</Column>
					</Section>
					<Section>
						<Text style={stepsText}>
							Dear {customer.name},<br />
							Thank you for choosing Victorious Audio for your recent purchase. We are pleased to
							confirm your order. Please find <strong>EFT details</strong> to make payment below and
							the PDF invoice attached to this email.
						</Text>
					</Section>
					<Section style={titleTable}>
						<Text style={titleTableTitle}>Customer Details</Text>
					</Section>
					<Section style={informationTable}>
						<Row style={informationTableRow}>
							<Column colSpan={2}>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>EMAIL</Text>
										<Link
											style={{
												...informationTableValue,
												color: '#15c',
												textDecoration: 'underline'
											}}
										>
											{customer.email}
										</Link>
									</Column>
								</Row>

								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>INVOICE DATE</Text>
										<Text style={informationTableValue}>
											{order.createdAt.toLocaleDateString('en-ZA')}
										</Text>
									</Column>
								</Row>

								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>ORDER NO</Text>
										<Link
											style={{
												...informationTableValue,
												color: '#15c',
												textDecoration: 'underline'
											}}
										>
											{orderRef}
										</Link>
									</Column>
								</Row>
							</Column>
							<Column style={informationTableColumn} colSpan={2}>
								<Text style={informationTableLabel}>Address</Text>
								<Text style={informationTableValue}>{customer.address1}</Text>
								<Text style={informationTableValue}>{customer.address2}</Text>
								<Text style={informationTableValue}>{customer.city}</Text>
								<Text style={informationTableValue}>{customer.zipcode}</Text>
								<Text style={informationTableValue}>South Africa</Text>
							</Column>
						</Row>
					</Section>
					<Section style={titleTable}>
						<Text style={titleTableTitle}>Order</Text>
					</Section>
					<Section>
						<Column style={{}} colSpan={1}>
							{lines.map((line) => (
								<Row style={{ margin: '0px 0px 20px 0px' }}>
									<Column style={{ width: '64px' }}>
										<Img
											src={`${baseUrl}/emails/${line.productId}.png`}
											width="64"
											height="64"
											alt={line.productName}
											style={productIcon}
										/>
									</Column>
									<Column style={{ paddingLeft: '22px' }}>
										<Text style={productTitle}>{line.productName} </Text>
										<Text style={productDescription}>Base colour: {line.baseColour}</Text>
										<Text style={productDescription}>Faceplate colour: {line.faceplateColour}</Text>
										<Text style={productDescription}>
											Logo left ear: {line.logoTypeLeft}{' '}
											{line.logoTypeLeft === 'None' ? `` : `in ${line.logoColourRight}`}
										</Text>
										<Text style={productDescription}>
											Logo right ear: {line.logoTypeRight}{' '}
											{line.logoTypeRight === 'None' ? `` : `in ${line.logoColourRight}`}
										</Text>
									</Column>
									<Column style={productPriceWrapper} align="right">
										<Text style={productPrice}>{formatCurrency(line.price)}</Text>
									</Column>
								</Row>
							))}
						</Column>
					</Section>
					<Hr style={productPriceLine} />
					<Section align="right">
						<Column style={tableCell} align="right">
							<Text style={productPriceTotal}>TOTAL</Text>
						</Column>
						<Column style={productPriceVerticalLine}></Column>
						<Column style={productPriceLargeWrapper}>
							<Text style={productPriceLarge}>{formatCurrency(total)}</Text>
						</Column>
					</Section>
					<Hr style={productPriceLine} />

					<Section style={titleTable}>
						<Text style={titleTableTitle}>EFT Details</Text>
					</Section>
					<Section style={informationTable}>
						<Row style={informationTableRow}>
							<Column colSpan={2}>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Account Holder</Text>
										<Text style={informationTableValue}>Benjamin Radford</Text>
									</Column>
								</Row>

								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Bank Name</Text>
										<Text style={informationTableValue}>TymeBank</Text>
									</Column>
								</Row>

								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Account Type</Text>
										<Text style={informationTableValue}>Savings</Text>
									</Column>
								</Row>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Branch Code</Text>
										<Text style={informationTableValue}>678910</Text>
									</Column>
								</Row>
							</Column>
							<Column style={informationTableColumn} colSpan={2}>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Account Number</Text>
										<Text style={informationTableValue}>51082354245</Text>
									</Column>
								</Row>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Reference Number</Text>
										<Text style={informationTableValue}>{orderRef}</Text>
									</Column>
								</Row>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Payment Amount</Text>
										<Text style={informationTableValue}>{formatCurrency(total)}</Text>
									</Column>
								</Row>
								<Row>
									<Column style={informationTableColumn}>
										<Text style={informationTableLabel}>Proof of Payment</Text>
										<Text style={informationTableValue}>ben@victoriousaudio.co.za</Text>
									</Column>
								</Row>
							</Column>
						</Row>
					</Section>
					<Section style={{ width: '100%' }}>
						<Text style={{ textAlign: 'center' }}>
							LEAD TIME ON RECEIVING OF PAYMENT TO DELIVERY IS 21 DAYS.
						</Text>
					</Section>
					<Section>
						<Column align="center" style={ctaTitle}>
							<Text style={ctaText}>Next Steps</Text>
						</Column>
					</Section>
					<Section>
						<span style={stepsText}>
							If you have any questions or need further assistance, please don't hesitate to reach
							out to our customer service at{' '}
							<Link href="mailto:ben@victoriousaudio.co.za ">ben@victoriousaudio.co.za</Link>
							<br />
							<br /> Your satisfaction is our priority, and we appreciate your business. For
							information on what to do next, please visit:{' '}
							<Link href={`${baseUrl}/how-to-order`}>victoriousaudio.co.za/how-to-order</Link>
						</span>{' '}
						<br />
						<Button
							href={`${baseUrl}/how-to-order`}
							style={{
								backgroundColor: '#54A2D3',
								borderRadius: '3px',
								color: '#fff',
								fontSize: '18px',
								textDecoration: 'none',
								textAlign: 'center' as const,
								display: 'block',
								width: '100%',
								marginTop: '40px',
								padding: '10px 10px 10px 10px'
							}}
						>
							Take the next steps
						</Button>
					</Section>
					<Section>
						<Column align="center" style={footerIcon}>
							<Img
								src={`${baseUrl}/va-with-crown.png`}
								width="40"
								height="40"
								alt="Victorious Audio"
							/>
						</Column>
					</Section>
					<Text style={footerLinksWrapper}>
						<Link href={`${baseUrl}/how-to-order`}>Order Process</Link> •{' '}
						<Link href={`${baseUrl}/products`}>Products</Link>{' '}
					</Text>
					<Text style={footerCopyright}>
						Copyright © {new Date().getFullYear()} Victorious Audio - Gqeberha, South Africa, 6001{' '}
						<br /> <Link href={`${baseUrl}/`}>{baseUrl}</Link>
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

export default CustomerOrderConfirmedEmail;

const main = {
	fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
	backgroundColor: '#ffffff'
};

const resetText = {
	margin: '0',
	padding: '0',
	lineHeight: 1.4
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
	width: '660px'
};

const tableCell = { display: 'table-cell' };

const heading = {
	fontSize: '32px',
	fontWeight: '300',
	color: '#888888'
};

const cupomText = {
	textAlign: 'left' as const,
	margin: '36px 0 40px 0',
	fontSize: '14px',
	fontWeight: '500',
	color: '#111111'
};

const supStyle = {
	fontWeight: '300'
};

const informationTable = {
	borderCollapse: 'collapse' as const,
	borderSpacing: '0px',
	color: 'rgb(51,51,51)',
	backgroundColor: 'rgb(250,250,250)',
	borderRadius: '3px',
	fontSize: '12px'
};

const informationTableRow = {
	height: '46px'
};

const informationTableColumn = {
	paddingLeft: '20px',
	borderStyle: 'solid',
	borderColor: 'white',
	borderWidth: '0px 1px 1px 0px',
	height: '44px'
};

const informationTableLabel = {
	...resetText,
	color: 'rgb(102,102,102)',
	fontSize: '10px'
};

const informationTableValue = {
	fontSize: '12px',
	margin: '0',
	padding: '0',
	lineHeight: 1.4
};

const titleTable = {
	...informationTable,
	margin: '30px 0 15px 0',
	height: '24px'
};

const titleTableTitle = {
	background: '#fafafa',
	paddingLeft: '10px',
	fontSize: '14px',
	fontWeight: '500',
	margin: '0'
};

const productIcon = {
	margin: '0 0 0 20px',
	borderRadius: '14px',
	border: '1px solid rgba(128,128,128,0.2)'
};

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText };

const productDescription = {
	fontSize: '12px',
	color: 'rgb(102,102,102)',
	...resetText
};

const productLink = {
	fontSize: '12px',
	color: 'rgb(0,112,201)',
	textDecoration: 'none'
};

const divisor = {
	marginLeft: '4px',
	marginRight: '4px',
	color: 'rgb(51,51,51)',
	fontWeight: 200
};

const productPriceTotal = {
	margin: '0',
	color: 'rgb(102,102,102)',
	fontSize: '10px',
	fontWeight: '600',
	padding: '0px 30px 0px 0px',
	textAlign: 'right' as const
};

const productPrice = {
	fontSize: '12px',
	fontWeight: '600',
	margin: '0'
};

const productPriceLarge = {
	margin: '0px 20px 0px 0px',
	fontSize: '16px',
	fontWeight: '600',
	whiteSpace: 'nowrap' as const,
	textAlign: 'right' as const
};

const productPriceWrapper = {
	display: 'table-cell',
	padding: '0px 20px 0px 0px',
	width: '100px',
	verticalAlign: 'top'
};

const productPriceLine = { margin: '30px 0 0 0' };

const productPriceVerticalLine = {
	height: '48px',
	borderLeft: '1px solid',
	borderColor: 'rgb(238,238,238)'
};

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' };

const productPriceLineBottom = { margin: '0 0 75px 0' };

const block = { display: 'block' };

const ctaTitle = {
	display: 'block',
	margin: '15px 0 0 0'
};

const ctaText = { fontSize: '24px', fontWeight: '500' };

const stepsWrapper = { display: 'table-cell', margin: '10px 0 0 0' };

const walletLink = { color: 'rgb(0,126,255)', textDecoration: 'none' };

const walletImage = {
	display: 'inherit',
	paddingRight: '8px',
	verticalAlign: 'middle'
};

const walletBottomLine = { margin: '65px 0 20px 0' };

const footerText = {
	fontSize: '12px',
	color: 'rgb(102,102,102)',
	margin: '0',
	lineHeight: 'auto',
	marginBottom: '16px'
};

const footerTextCenter = {
	fontSize: '12px',
	color: 'rgb(102,102,102)',
	margin: '20px 0',
	lineHeight: 'auto',
	textAlign: 'center' as const
};

const footerLink = { color: 'rgb(0,115,255)' };

const footerIcon = { display: 'block', margin: '40px 0 0 0' };

const footerLinksWrapper = {
	margin: '8px 0 0 0',
	textAlign: 'center' as const,
	fontSize: '12px',
	color: 'rgb(102,102,102)'
};

const footerCopyright = {
	margin: '25px 0 0 0',
	textAlign: 'center' as const,
	fontSize: '12px',
	color: 'rgb(102,102,102)'
};

const stepsText = {
	fontSize: '14px',
	fontWeight: '400',
	textDecoration: 'none'
};
