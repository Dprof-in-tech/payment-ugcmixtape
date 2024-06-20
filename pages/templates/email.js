import React from 'react';
import { useRouter } from 'next/router';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Text,
  Row,
  Column,
} from '@react-email/components';

const EmailTemplate = ({
  customerName,
  orderID,
  orderDate,
  narrative,
  description,
  customerEmail,
  price,
}) => (
  <Html>
    <Head />
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={logoStyle}>
          <Img
            src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png"
            alt="logo"
            width="200"
            height="120"
            style={{ objectFit: 'contain' }}
          />
        </Section>
        <Section style={orderInfoStyle}>
          <Text>ORDER</Text>
          <Text>{orderID}</Text>
        </Section>
        <Text style={headingStyle}>Thank you, {customerName}</Text>
        <Text style={subHeadingStyle}>Your order is on its way</Text>
        
        <OrderDetail label="Order Date" value={orderDate} />
        <OrderDetail label="Customer Email" value={customerEmail} />
        <OrderDetail label="Narrative Name" value={narrative} />
        <OrderDetail label="Product Name" value={description} />
        <OrderDetail label="Amount" value={`$${price}`} isAmount />
      </Container>
    </Body>
  </Html>
);

const OrderDetail = ({ label, value, isAmount = false }) => (
  <Row style={orderDetailStyle}>
    <Column><Text>{label}</Text></Column>
    <Column><Text style={isAmount ? amountStyle : valueStyle}>{value}</Text></Column>
  </Row>
);

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  width: '100%',
  margin: 'auto',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
};

const logoStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const orderInfoStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '20px',
  padding: '20px',
};

const headingStyle = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '5px',
  fontWeight: '550',
};

const subHeadingStyle = {
  lineHeight: '1.6',
  marginTop: '-2px',
  textAlign: 'center',
};

const orderDetailStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '2px',
  padding: '0px',
};

const valueStyle = {
  textAlign: 'right',
  fontWeight: '900',
};

const amountStyle = {
  ...valueStyle,
  fontSize: '25px',
};

export default function EmailPreview() {
  const router = useRouter();
  const { 
    customerName = 'John Doe',
    orderID = 'ORD123456',
    orderDate = '2024-06-20',
    narrative = 'Sample Narrative',
    description = 'Product Description',
    customerEmail = 'john@example.com',
    price = '99.99'
  } = router.query;

  return (
    <EmailTemplate
      customerName={customerName}
      orderID={orderID}
      orderDate={orderDate}
      narrative={narrative}
      description={description}
      customerEmail={customerEmail}
      price={price}
    />
  );
}