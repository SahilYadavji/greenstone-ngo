import { useState } from "react";

import qrImage from "../assets/qr.jpg";

import { useTranslation } from "react-i18next";

import { db } from "../firebase";

import {
  addDoc,
  collection,
} from "firebase/firestore";

export default function Donation() {

  const { t } = useTranslation();

  const [selectedAmount, setSelectedAmount] = useState(500);
const saveDonation = async () => {

  try {

    await addDoc(
      collection(db, "donations"),
      {
        amount: Number(selectedAmount),
        createdAt: new Date(),
      }
    );

    alert("Donation saved successfully!");

  } catch (error) {

    console.error(
      "Donation Save Error:",
      error
    );

    alert(
      "Error: " + error.message
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
            onClick={saveDonation}
            href={`upi://pay?pa=9817696408@ptyes&pn=Sahil&am=${selectedAmount}`}
            className="inline-block mt-6 bg-green-700 text-white px-8 py-4 rounded-2xl text-lg hover:bg-green-800 transition"
          >

            {t("payViaUpi")} ₹{selectedAmount}

          </a>

        </div>

      </div>

    </section>

  );
}