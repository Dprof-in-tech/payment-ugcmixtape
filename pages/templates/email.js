import React from 'react';
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
    <Head>
      <title>Order Confirmation</title>
    </Head>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.logo}>
          <Img
            src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png"
            alt="logo"
            width="200"
            height="120"
            style={{ objectFit: 'contain' }}
          />
        </Section>
        <Section style={styles.orderInfo}>
          <Text style={styles.orderLabel}>ORDER</Text>
          <Text style={styles.orderID}>{orderID}</Text>
        </Section>
        <Text style={styles.heading}>Thank you, {customerName}</Text>
        <Text style={styles.subHeading}>Your order is on its way</Text>
        
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
  <Row style={styles.orderDetails}>
    <Column style={styles.orderDetailColumn}><Text style={styles.orderDetailLabel}>{label}</Text></Column>
    <Column style={styles.orderDetailColumn}><Text style={isAmount ? styles.amount : styles.orderDetailValue}>{value}</Text></Column>
  </Row>
);

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    textAlign: 'center',
    margin: '20px, auto',
  },
  orderInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  orderLabel: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
  },
  orderID: {
    fontSize: '14px',
    color: '#666',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  subHeading: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px',
    fontSize: '14px',
  },
  orderDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    padding: '10px 0',
    width: '100%',
  },
  orderDetailColumn: {
    flex: 1,
  },
  orderDetailLabel: {
    fontSize: '14px',
    color: '#333',
    width: '50%'
  },
  orderDetailValue: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    width: '50%',
    marginLeft: '1rem',
  },
  orderDetailisAmount: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    width: '50%',
    marginLeft: '1rem',
  },
  amount: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '16px',
    width: '50%',
  },
};

export default EmailTemplate;
