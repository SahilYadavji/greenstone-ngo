const Razorpay = require("razorpay");

exports.handler = async (event) => {

  try {

    console.log("EVENT BODY:", event.body);

    const { amount } = JSON.parse(event.body);

    console.log("AMOUNT:", amount);

    console.log(
      "KEY ID EXISTS:",
      !!process.env.RAZORPAY_KEY_ID
    );

    console.log(
      "SECRET EXISTS:",
      !!process.env.RAZORPAY_KEY_SECRET
    );

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order =
      await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt:
          `receipt_${Date.now()}`,
      });

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };

  } catch (error) {

    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
    };

  }

};