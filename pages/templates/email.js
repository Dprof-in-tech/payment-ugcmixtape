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
          <OrderId label="ORDER ID:" value={orderID} />
        </Section>
        <Text style={styles.heading}>Thank you, {customerName}</Text>
        <Text style={styles.subHeading}>Your order is on its way</Text>
        
        <OrderDetail label="ORDER DATE:" value={orderDate} />
        <OrderDetail label="CUSTOMER EMAIL:" value={customerEmail} />
        <OrderDetail label="NARRATIVE NAME:" value={narrative} />
        <OrderDetail label="PRODUCT NAME:" value={description} />
        <OrderDetail label="PRODUCT PRICE:" value={`$${price}`} isAmount />
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

const OrderId = ({ label, value}) => (
    <Row style={styles.orderId}>
      <Column style={styles.orderIdColumn}><Text style={styles.orderIdLabel}>{label}</Text></Column>
      <Column style={styles.orderIdColumn}><Text style={styles.orderIdValue}>{value}</Text></Column>
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
    maxWidth: '700px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '10px',
    marginTop: '6rem',
    marginLeft: '40%'
  },
  orderId: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  orderIdColumn: {
    flex: 1,
  },
  orderIdLabel: {
    fontSize: '18px',
    color: '#333',
    width: '14rem',
    fontWeight: 'Bold'
  },
  orderIdValue: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    marginLeft: '2rem',
    width: '200px'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '2.5rem',
  },
  subHeading: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px',
    fontSize: '18px',
  },
  orderDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    padding: '10px 0',
  },
  orderDetailColumn: {
    flex: 1,
  },
  orderDetailLabel: {
    fontSize: '14px',
    color: '#333',
    width: '14rem'
  },
  orderDetailValue: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    marginLeft: '2rem',
    width: '200px'
  },
  amount: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '16px',
    marginLeft: '2rem',
    width: '200px'
  },
};

export default EmailTemplate;
