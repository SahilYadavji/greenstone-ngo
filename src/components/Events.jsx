import { useEffect, useState } from "react";

import { db } from "../firebase";

import { useTranslation } from "react-i18next";

import { translateText } from "../utils/translate";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function Events() {

  const { t, i18n } = useTranslation();

  const [events, setEvents] = useState([]);

  // Fetch Events
  const fetchEvents = async () => {

    const querySnapshot = await getDocs(
      collection(db, "events")
    );

    const eventData = await Promise.all(

      querySnapshot.docs.map(async (docItem) => {

        const data = docItem.data();

        let translatedTitle = data.title;

        // Translate only for Hindi
        if (i18n.language === "hi") {

          translatedTitle =
            await translateText(
              data.title,
              "hi"
            );

        }

        return {

          id: docItem.id,

          ...data,

          translatedTitle,

        };

      })

    );

    setEvents(eventData);
  };

  useEffect(() => {

    fetchEvents();

  }, [i18n.language]);

  return (

    <section
      id="events"
      className="py-20 px-6 bg-white"
    >

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">

        {t("eventsTitle")}

      </h2>

      {/* Events Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {events.map((item) => (

          <div
            key={item.id}
            className="bg-green-100 p-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
          >

            {/* Event Title */}
            <h3 className="text-2xl font-bold mb-4 text-green-700">

              {item.translatedTitle}

            </h3>

            {/* Event Date */}
            <p className="text-lg text-gray-700">

              {item.date}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}