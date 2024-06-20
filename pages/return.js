import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import emailTemplate from './templates/email';
import Image from 'next/image';

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { session_id } = router.query;
    const {p} = router.query;
    const {d} = router.query;
    const {cn} = router.query;

    if (session_id) {
      fetch(`/api/checkout_sessions?session_id=${session_id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);

          if (data.status === 'complete') {
            const time = new Date(data.time);
            const id = d.slice(23, 28);
            const product = d.slice(0, 21);
            const from = 'payments@ugcmixtape.com';
            const to = data.customer_email;
            const subject = 'Payment Successful';
            const client = cn;
            const html = emailTemplate(client, id, time, product, p, data.customer_email, data.price );

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
    return router.push('/');
  }

  if (status === 'complete') {
    return (
      <section id="success" style={{width: '475px'}}>
        <Image src='/ugcmixtape.svg' alt='logo' width={300} height={50} />
        <Image src='/success.svg' alt='success' width={300} height={300} style={{marginTop: '3rem'}} />
        <h1 style={{fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem'}}>Payment Successful</h1>
        <p style={{fontSize: '1.2rem', marginTop: '0', maxWidth: '100%', textAlign: 'center'}}>
          Your payment was successful and a reciept has been sent to {customerEmail}.
          Your order is on its way...
        </p>
        <a href='https://www.ugcmixtape.com/login'>
        <button style={{padding: '1.2rem', borderRadius: '4px', color: 'white', backgroundColor: '#000000', border: 'none', fontSize: '1.2rem'}}>
          Back to Login
        </button>
        </a>
      </section>
    );
  }

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
  //       <button style={{padding: '1.2rem', borderRadius: '4px', color: 'white', backgroundColor: '#000000', border: 'none', fontSize: '1.2rem'}}>
  //         Back to Login
  //       </button>
  //       </a>
  //     </section>
  //   );

  // }

  return null;
}
