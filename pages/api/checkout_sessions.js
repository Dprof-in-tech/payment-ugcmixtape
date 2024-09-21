const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        // Extract parameters from the request body or query string
        const { name, email, amount, id, client, couponCode } = req.body || req.query;

        // Create a new Checkout Session with dynamic line items
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          customer_email: email, // Use the email parameter from the request
          submit_type: 'pay',
          line_items: [
            {
              price_data: {
                currency: 'usd', // Replace with the desired currency
                product_data: {
                  name: name,
                  description: id, // Use the name parameter from the request
                },
                unit_amount: amount * 100, // Amount in cents (e.g., $10 = 1000)
              },
              quantity: 1,     
            },
          ],
          mode: 'payment',
          return_url: `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}&p=${name}&d=${id}&cn=${client}&ds=${couponCode}`,
          automatic_tax: { enabled: true }
        });

        res.send({ clientSecret: session.client_secret });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
      
        res.send({
          status: session.status,
          customer_email: session.customer_details.email,
          customer_name: session.customer_details.name,
          price: session.amount_total / 100,
          currency: session.currency,
          time: session.created,
        });
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
      break;
    default:
      res.setHeader('Allow', req.method);
      res.status(405).end('Method Not Allowed');
  }
}
