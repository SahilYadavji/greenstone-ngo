import { useState } from "react";
import { storage } from "../firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import qrImage from "../assets/qr.jpg";

import { useTranslation } from "react-i18next";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase";

export default function Donation() {

  const { t } = useTranslation();

  const [selectedAmount, setSelectedAmount] = useState(500);

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statusMessage, setStatusMessage] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const handleConfirmPayment = async () => {

    if (!utrNumber) {
      setStatusMessage("Please enter UTR number.");
      return;
    }

    if (!screenshot) {
      setStatusMessage("Please upload payment screenshot.");
      return;
    }

    setIsSubmitting(true);

    try {
      const storageRef = ref(
        storage,
        `donationScreenshots/${Date.now()}_${screenshot.name}`
      );

      await uploadBytes(storageRef, screenshot);

      const screenshotUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "donations"), {
        amount: Number(selectedAmount),
        utrNumber,
        paymentMethod: "UPI",
        screenshotUrl,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setStatusMessage(
        "Donation submitted successfully. Waiting for admin approval."
      );

      setUtrNumber("");
      setScreenshot(null);
      setShowPaymentOptions(false);
      setShowQR(false);

    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to submit donation.");
    } finally {
      setIsSubmitting(false);
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
              onClick={() => {
                setSelectedAmount(amount);
                setShowPaymentOptions(false);
                setShowQR(false);
                setStatusMessage("");
              }}
              className={`p-8 rounded-3xl shadow-xl transition hover:scale-105

              ${selectedAmount === amount
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
            onChange={(e) => {
              setSelectedAmount(e.target.value);
              setShowPaymentOptions(false);
              setShowQR(false);
              setStatusMessage("");
            }}
            className="w-full border p-5 rounded-2xl text-center text-2xl shadow-lg"
          />

        </div>

        <button
          onClick={() => {
            setShowPaymentOptions(true);
          }}
          className="bg-green-600 text-white px-10 py-4 rounded-2xl text-xl hover:bg-green-700"
        >
          Pay ₹{selectedAmount}
        </button>

        {showPaymentOptions && (
          <div className="mt-8 rounded-3xl border border-green-200 bg-white p-6 text-left shadow-lg max-w-md mx-auto">
            <h4 className="text-2xl font-bold text-green-800 mb-4">
              Complete Donation
            </h4>

            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full bg-green-600 text-white py-3 rounded-xl mb-4"
            >
              Show QR
            </button>

            {showQR && (
              <div className="mb-4">
                <img
                  src={qrImage}
                  alt="Donation QR code"
                  className="mx-auto w-72 h-72 object-contain"
                />
              </div>
            )}

            <input
              type="text"
              placeholder="UTR Number"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <button
              onClick={handleConfirmPayment}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </button>

            <button
              onClick={() => setShowPaymentOptions(false)}
              className="w-full mt-3 bg-gray-200 py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        )}

        {statusMessage && (
          <p className="mt-4 text-sm text-center text-green-700">
            {statusMessage}
          </p>
        )}

      </div>

    </section>

  );
}