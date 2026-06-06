import { useEffect, useState } from "react";

import {
  useParams,
  Link,
  useLocation,
} from "react-router-dom";

import { db } from "../firebase";

import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import { useTranslation } from "react-i18next";

export default function ActivityDetails() {

  const { id } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();

  const [activity, setActivity] = useState(null);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
});

  const fetchActivity = async () => {

    const docRef = doc(
      db,
      "activities",
      id
    );

    const docSnap = await getDoc(
      docRef
    );

    if (docSnap.exists()) {

      setActivity({
        id: docSnap.id,
        ...docSnap.data(),
      });

    }

  };
  const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};

const registerVolunteer = async (e) => {

  e.preventDefault();

  try {

    await addDoc(
      collection(db, "activityRegistrations"),
      {
        activityId: activity.id,
        activityTitle: activity.title,
        activityTitleHindi: activity.titleHindi,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,

        status: "pending",
        createdAt: new Date(),
      }
    );

    alert(
  i18n.language === "hi"
    ? "पंजीकरण सफल रहा"
    : "Registration Successful"
);

    setFormData({
      name: "",
      email: "",
      phone: "",
    });

  } catch (error) {

    console.error(error);

   alert(
  i18n.language === "hi"
    ? "पंजीकरण विफल रहा"
    : "Registration Failed"
);

  }

};

  useEffect(() => {

    fetchActivity();

  }, [id]);
  useEffect(() => {

  if (location.hash === "#activity-registration") {

    setTimeout(() => {

      document
        .getElementById("activity-registration")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 500);

  }

}, [location]);
  if (!activity) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
  {i18n.language === "hi"
    ? "लोड हो रहा है..."
    : "Loading..."}
</h1>

      </div>

    );

  }

  return (

    <section className="min-h-screen bg-green-50 py-20 px-6">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Banner Image */}
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-[500px] object-cover"
        />

        <div className="p-10">

          {/* Title */}
          <h1 className="text-5xl font-bold text-green-700 mb-6">

            {i18n.language === "hi"
              ? activity.titleHindi
              : activity.title}

          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 leading-relaxed mb-10">

            {i18n.language === "hi"
              ? activity.descriptionHindi
              : activity.description}

          </p>

          {/* Objectives */}
          <div className="bg-green-100 p-8 rounded-3xl mb-10">

            <h2 className="text-3xl font-bold text-green-700 mb-4">

              {i18n.language === "hi"
                ? "हमारे उद्देश्य"
                : "Our Objectives"}

            </h2>

            <ul className="list-disc pl-6 space-y-3 text-lg">

              <li>
                {i18n.language === "hi"
                  ? "समुदाय की सहायता करना"
                  : "Support local communities"}
              </li>

              <li>
                {i18n.language === "hi"
                  ? "सामाजिक जागरूकता बढ़ाना"
                  : "Increase social awareness"}
              </li>

              <li>
                {i18n.language === "hi"
                  ? "वॉलंटियर्स को जोड़ना"
                  : "Engage volunteers"}
              </li>

              <li>
                {i18n.language === "hi"
                  ? "सकारात्मक बदलाव लाना"
                  : "Create positive impact"}
              </li>

            </ul>

          </div>

          {/* Impact Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-green-50 p-6 rounded-3xl text-center">

              <h3 className="text-4xl font-bold text-green-700">

                1000+

              </h3>

              <p>

                {i18n.language === "hi"
                  ? "लाभार्थी"
                  : "Beneficiaries"}

              </p>

            </div>

            <div className="bg-green-50 p-6 rounded-3xl text-center">

              <h3 className="text-4xl font-bold text-green-700">

                200+

              </h3>

              <p>

                {i18n.language === "hi"
                  ? "वॉलंटियर्स"
                  : "Volunteers"}

              </p>

            </div>

            <div className="bg-green-50 p-6 rounded-3xl text-center">

              <h3 className="text-4xl font-bold text-green-700">

                50+

              </h3>

              <p>

                {i18n.language === "hi"
                  ? "कार्यक्रम"
                  : "Events"}

              </p>

            </div>

          </div>

          {/* CTA */}
          <div className="text-center">


            <Link
              to="/"
              className="inline-block bg-gray-700 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
            >

              {i18n.language === "hi"
                ? "होम वापस जाएं"
                : "Back Home"}

            </Link>

          </div>
          {/* Activity Registration Form */}
<div
  id="activity-registration"
  className="mt-16 bg-green-50 p-8 rounded-3xl"
>

  <h2 className="text-3xl font-bold text-green-700 mb-6">
  {i18n.language === "hi"
    ? "इस गतिविधि के लिए पंजीकरण करें"
    : "Register For This Activity"}
</h2>

  <form
    onSubmit={registerVolunteer}
    className="space-y-4"
  >

   <input
  type="text"
  name="name"
  placeholder={
    i18n.language === "hi"
      ? "पूरा नाम"
      : "Full Name"
  }
  value={formData.name}
  onChange={handleChange}
  className="w-full border p-3 rounded-xl"
  required
/>
   <input
  type="email"
  name="email"
  placeholder={
    i18n.language === "hi"
      ? "ईमेल"
      : "Email"
  }
  value={formData.email}
  onChange={handleChange}
  className="w-full border p-3 rounded-xl"
  required
/>

    <input
  type="text"
  name="phone"
  placeholder={
    i18n.language === "hi"
      ? "फोन नंबर"
      : "Phone Number"
  }
  value={formData.phone}
  onChange={handleChange}
  className="w-full border p-3 rounded-xl"
  required
/>
    <button
  type="submit"
  className="bg-green-700 text-white px-8 py-3 rounded-xl"
>
  {i18n.language === "hi"
    ? "पंजीकरण करें"
    : "Register"}
</button>

  </form>

</div>

        </div>

      </div>

    </section>

  );
}