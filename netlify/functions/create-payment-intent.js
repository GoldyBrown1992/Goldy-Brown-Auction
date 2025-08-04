const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, name, email } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      capture_method: 'manual',
      metadata: {
        bidder_name: name,
        bidder_email: email,
        bid_amount: amount,
        auction_name: 'Goldy Brown Auction'
      },
      description: `Auction bid by ${name} for $${amount}`
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({ 
        error: 'Payment processing failed. Please try again.' 
      })
    };
  }
};
