import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { render } from '@react-email/render';
import EmailTemplate from './templates/email';
import Image from 'next/image';

export default function Return() {
  const [status, setStatus] = useState(null);
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
          setStatus(data.status);
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
                //console.log(result);
              })
              .catch((error) => {
                console.error('Error sending email:', error);
              });
          }
        });
    }
  }, [router.query]);

  if (status === 'open') {
    router.push('/');
  }

  if (status === 'complete') {
    return (
      <section id="success" style={styles.container}>
          <Image src='/ugcmixtape.svg' alt='logo' width={300} height={150} />
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

  // Uncomment the following section if you want to handle the failed payment case
  // else if (status !== 'complete'){
  //   return (
  //     <section id="success" style={{width: '300px'}}>
  //       <Image src='/ugcmixtape.svg' alt='logo' width={300} height={50} />
  //       <Image src='/failure.svg' alt='success' width={300} height={300} style={{marginTop: '3rem'}} />
  //       <h1 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem'}}>Payment Failed</h1>
  //       <p style={{fontSize: '1.2rem', marginTop: '0', maxWidth: '100%', textAlign: 'center'}}>
  //         Ooops... there was something wrong with your payment.
  //         please try again...
  //       </p>
  //       <a href='https://www.ugcmixtape.com/login'>
  //         <button style={{padding: '1.2rem', borderRadius: '4px', color: 'white', backgroundColor: '#000000', border: 'none', fontSize: '1.2rem'}}>
  //           Back to Login
  //         </button>
  //       </a>
  //     </section>
  //   );
  // }

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
    margin: '0 auto',
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
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#000000',
    border: 'none',
    fontSize: '1.2rem',
    marginTop: '1rem',
    cursor: 'pointer',
  }
};