const crypto = require("crypto");

const admin = require("./firebaseAdmin");

exports.handler = async (event) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = JSON.parse(event.body);

    const sign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    if (
      sign !== razorpay_signature
    ) {

      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
        }),
      };

    }

    await admin
      .firestore()
      .collection("donations")
      .add({
        amount: Number(amount),
        paymentId:
          razorpay_payment_id,
        createdAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };

  }

};