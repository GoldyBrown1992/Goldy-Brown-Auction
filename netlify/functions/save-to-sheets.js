exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, amount, paymentIntentId } = JSON.parse(event.body);
    
    const bid = {
      timestamp: new Date().toISOString(),
      name,
      email,
      amount,
      paymentIntentId,
      status: 'authorized'
    };
    
    console.log('NEW BID PLACED:', bid);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Bid recorded successfully'
      })
    };
  } catch (error) {
    console.error('Error saving bid:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({ 
        error: 'Failed to record bid' 
      })
    };
  }
};
