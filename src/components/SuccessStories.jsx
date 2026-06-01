import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { db } from "../firebase";

import { translateText } from "../utils/translate";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function SuccessStories() {

  const { t, i18n } = useTranslation();

  const [stories, setStories] = useState([]);

  // Fetch Stories
  const fetchStories = async () => {

    const querySnapshot = await getDocs(
      collection(db, "successStories")
    );

    const storyData = await Promise.all(

      querySnapshot.docs.map(async (docItem) => {

        const data = docItem.data();

        let translatedTitle = data.title;

        let translatedDescription =
          data.description;

        // Translate only for Hindi
        if (i18n.language === "hi") {

          translatedTitle =
            await translateText(
              data.title,
              "hi"
            );

          translatedDescription =
            await translateText(
              data.description,
              "hi"
            );

        }

        return {

          id: docItem.id,

          ...data,

          translatedTitle,

          translatedDescription,

        };

      })

    );

    setStories(storyData);
  };

  useEffect(() => {

    fetchStories();

  }, [i18n.language]);

  return (

    <section
      id="success"
      className="py-20 bg-green-50 px-6"
    >

      {/* Heading */}
      <h2 className="text-5xl font-bold text-center text-green-700 mb-14">

        {t("successStories")}

      </h2>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {stories.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
          >

            {/* Story Image */}
            <img
              src={item.image}
              alt={item.translatedTitle}
              className="h-64 w-full object-cover"
            />

            {/* Story Content */}
            <div className="p-6">

              <h3 className="text-2xl font-bold mb-4 text-green-700">

                {item.translatedTitle}

              </h3>

              <p className="text-gray-700 leading-relaxed">

                {item.translatedDescription}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}