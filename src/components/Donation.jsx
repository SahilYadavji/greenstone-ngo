import { useState } from "react";

import qrImage from "../assets/qr.jpg";

import { useTranslation } from "react-i18next";


export default function Donation() {

  const { t } = useTranslation();

  const [selectedAmount, setSelectedAmount] = useState(500);
  console.log(
  "Razorpay Key:",
  import.meta.env
    .VITE_RAZORPAY_KEY_ID
);

console.log(
  "Razorpay Object:",
  window.Razorpay
);
const handleRazorpayPayment = async () => {
console.log("Razorpay Key:",
  import.meta.env.VITE_RAZORPAY_KEY_ID);

console.log("Razorpay Object:",
  window.Razorpay);
  try {

    const orderResponse = await fetch(
  "/.netlify/functions/createOrder",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Number(selectedAmount),
    }),
  }
);

const responseText =
  await orderResponse.text();

console.log(
  "Create Order Response:",
  responseText
);

const order =
  JSON.parse(responseText);

    const options = {
      key:
        import.meta.env
          .VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency:
        order.currency,

      name:
        "Greenstone NGO",

      description:
        "Donation",

      order_id: order.id,

      handler:
        async function (response) {

          const verifyResponse =
            await fetch(
              "/.netlify/functions/verifyPayment",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  {
                    ...response,
                    amount:
                      selectedAmount,
                  }
                ),
              }
            );

          const result =
            await verifyResponse.json();

          if (
            result.success
          ) {

            alert(
              "Thank you for your donation!"
            );

          } else {

            alert(
              "Payment verification failed."
            );

          }

        },
    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

  } catch (error) {

  console.error(
    "Razorpay Error:",
    error
  );

  alert(
    "Payment failed: " +
      error.message
  );

}

};

  return (

    <section
      id="donate"
      className="py-20 px-6 bg-green-50"
    >

      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-green-700 mb-6">

          {t("donationTitle")}

        </h2>

        {/* Description */}
        <p className="text-lg mb-12">

          {t("donationText")}

        </p>

        {/* Donation Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {[100, 500, 1000, 5000].map((amount) => (

            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`p-8 rounded-3xl shadow-xl transition hover:scale-105

              ${
                selectedAmount === amount
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-700"
              }`}
            >

              <h3 className="text-3xl font-bold">

                ₹{amount}

              </h3>

            </button>

          ))}

        </div>

        {/* Custom Amount */}
        <div className="max-w-md mx-auto mb-12">

          <input
            type="number"
            placeholder={t("enterAmount")}
            value={selectedAmount}
            onChange={(e) =>
              setSelectedAmount(
                e.target.value
              )
            }
            className="w-full border p-5 rounded-2xl text-center text-2xl shadow-lg"
          />

        </div>

        {/* QR Section */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md mx-auto">

          <h3 className="text-3xl font-bold text-green-700 mb-6">

            {t("scanAndPay")}

          </h3>

          <img
            src={qrImage}
            alt="UPI QR"
            className="mx-auto rounded-2xl shadow-xl"
          />

          <p className="mt-6 text-xl font-semibold">

            {t("upiId")}

          </p>

          {/* Same UPI */}
          <p className="text-green-700 text-2xl font-bold mt-2">

            9817696408@ptyes

          </p>

          {/* Selected Amount */}
          <p className="mt-6 text-2xl font-bold text-black">

            {t("selectedAmount")} ₹{selectedAmount}

          </p>

          

          

          {/* UPI Button */}
          <a
          
            href={`upi://pay?pa=9817696408@ptyes&pn=Sahil&am=${selectedAmount}`}
            className="inline-block mt-6 bg-green-700 text-white px-8 py-4 rounded-2xl text-lg hover:bg-green-800 transition"
          >

            {t("payViaUpi")} ₹{selectedAmount}

          </a>
          <button
  onClick={
    handleRazorpayPayment
  }
  className="block w-full mt-6 bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg hover:bg-blue-700 transition"
>

  Donate via Razorpay ₹
  {selectedAmount}

</button>

        </div>

      </div>

    </section>

  );
}