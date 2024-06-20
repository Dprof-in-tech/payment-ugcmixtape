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
            style={{ objectFit: 'cover' }}
          />
        </Section>
        <Section style={styles.orderInfo}>
          <Text>ORDER</Text>
          <Text>{orderID}</Text>
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
    <Column><Text>{label}</Text></Column>
    <Column><Text style={isAmount ? styles.amount : styles.orderDetailValue}>{value}</Text></Column>
  </Row>
);

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '65%',
    margin: 'auto',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '5px',
    fontWeight: '550',
  },
  subHeading: {
    lineHeight: '1.6',
    marginTop: '-2px',
    textAlign: 'center',
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2px',
    padding: '0px',
  },
  orderDetailValue: {
    textAlign: 'right',
    fontWeight: '900',
  },
  amount: {
    textAlign: 'right',
    fontWeight: '900',
    fontSize: '25px',
  },
};

export default EmailTemplate;