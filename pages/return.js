import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { render } from '@react-email/render';
import EmailTemplate from './templates/email';
import Image from 'next/image';

export default function Return() {
  const [status, setStatus] = useState('loading');
  const [customerEmail, setCustomerEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { session_id, p, d, cn } = router.query;

    if (session_id) {
      fetch(`/api/checkout_sessions?session_id=${session_id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setCustomerEmail(data.customer_email);

          if (data.status === 'complete') {
            const time = new Date();
            const id = d.slice(23, 28);
            const product = d.slice(0, 21);
            const from = 'payments@ugcmixtape.com';
            const to = data.customer_email;
            const subject = 'Payment Successful';
            const client = cn;
            const html = render(
              <EmailTemplate 
                customerName={client} 
                orderID={id} 
                orderDate={time.toDateString()} 
                narrative={product} 
                description={p} 
                customerEmail={data.customer_email} 
                price={data.price} 
              />
            );

            fetch('/api/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ from, to, subject, html }),
            })
              .then((response) => response.json())
              .then((result) => {
                // Email sent successfully
              })
              .catch((error) => {
                console.error('Error sending email:', error);
              });

            setStatus('complete');
          } else {
            setStatus('failed');
          }
        })
        .catch((error) => {
          console.error('Error fetching session:', error);
          setStatus('failed');
        });
    }
  }, [router.query]);

  if (status === 'loading') {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (status === 'complete') {
    return (
      <section id="success" style={styles.container}>
        <Image src='/ugcmixtape.svg' alt='logo' width={200} height={100} style={{marginTop: '4rem'}} />
        <Image src='/success.svg' alt='success' width={300} height={300} style={{marginTop: '1rem'}} />
        <h1 style={styles.heading}>Payment Successful</h1>
        <p style={styles.paragraph}>
          Your payment was successful and a receipt has been sent to {customerEmail}.
          Your order is on its way...
        </p>
        <a href='https://www.ugcmixtape.com/login'>
          <button style={styles.button}>
            Back to Login
          </button>
        </a>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section id="failed" style={styles.container}>
        <Image src='/ugcmixtape.svg' alt='logo' width={200} height={100} style={{marginTop: '4rem'}} />
        <Image src='/failure.svg' alt='failure' width={300} height={300} style={{marginTop: '1rem'}} />
        <h1 style={styles.heading}>Payment Failed</h1>
        <p style={styles.paragraph}>
          Ooops... there was something wrong with your payment.
          Please try again...
        </p>
        <a href='https://www.ugcmixtape.com/login'>
          <button style={styles.button}>
            Back to Login
          </button>
        </a>
      </section>
    );
  }

  return null;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '320px',
    maxWidth: '475px',
    height: '60vh',
    margin: '6rem auto',
    padding: '0',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  paragraph: {
    fontSize: '1rem',
    marginTop: '0',
    maxWidth: '95%',
    textAlign: 'center',
    height: 'fit-content'
  },
  button: {
    padding: '1.2rem',
    borderRadius: '12px',
    color: 'white',
    backgroundColor: '#000000',
    border: 'none',
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: "1rem",
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(135deg, #e83b95 0%, #6250fe 33%, #00aeef 66%, #1fba9c 100%)',
  }
  ,

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTop: '4px solid #000000',
    borderRadius: '50%',
    animation: 'spin 3s linear infinite',
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
};
