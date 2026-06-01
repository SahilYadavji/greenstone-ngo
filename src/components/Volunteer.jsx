import { useState } from "react";

import { useTranslation } from "react-i18next";

import { db } from "../firebase";

import {
  addDoc,
  collection,
} from "firebase/firestore";

export default function Volunteer() {

  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addDoc(
        collection(db, "volunteers"),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: "pending",
          createdAt: new Date(),
        }
      );

      alert(t("volunteerSuccess"));

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {

      console.error(error);

      alert("Failed to register volunteer");

    }

  };

  return (

    <section
      id="volunteer"
      className="py-20 px-6 bg-white"
    >

      <div className="max-w-3xl mx-auto bg-green-50 p-10 rounded-3xl shadow-xl">

        <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">

          {t("volunteerTitle")}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder={t("fullName")}
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder={t("phone")}
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl"
            required
          />

          <textarea
            name="message"
            placeholder={t("whyJoin")}
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl h-40"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-green-700 text-white px-8 py-4 rounded-2xl w-full hover:bg-green-800 transition"
          >

            {t("registerNow")}

          </button>

        </form>

      </div>

    </section>

  );
}