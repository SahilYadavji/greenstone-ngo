import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function Activities() {

  const { t, i18n } = useTranslation();

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {

    const querySnapshot = await getDocs(
      collection(db, "activities")
    );

    const data = [];

    querySnapshot.forEach((doc) => {

      data.push({
        id: doc.id,
        ...doc.data(),
      });

    });

    setActivities(data);

  };

  useEffect(() => {

    fetchActivities();

  }, []);

  return (

    <section
      id="activities"
      className="py-20 px-6 bg-green-50"
    >

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">

          {t("activitiesTitle")}

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

        {activities.map((item) => (

  <div
    key={item.id}
    className="bg-white p-10 rounded-3xl shadow-lg text-center hover:scale-105 transition"
  >

    <img
      src={item.image}
      alt={item.title}
      width={800}
      height={500}
      onError={(e) => {
        e.target.src = "https://picsum.photos/800/500";
      }}
      className="h-48 w-full object-cover rounded-2xl mb-4"
    />

    <h3 className="text-2xl font-semibold mb-4">
      {i18n.language === "hi"
        ? item.titleHindi
        : item.title}
    </h3>

    <p className="text-gray-600 mb-6">
      {i18n.language === "hi"
        ? item.descriptionHindi
        : item.description}
    </p>

    <div className="flex gap-3 justify-center">

     <Link
  to={`/activity/${item.id}`}
  className="bg-gray-700 text-white px-4 py-2 rounded-xl"
>
  {t("viewDetails")}
</Link>

<Link
  to={`/activity/${item.id}#activity-registration`}
  className="bg-green-700 text-white px-4 py-2 rounded-xl"
>
  {t("becomeVolunteer")}
</Link>

    </div>

  </div>

))}

        </div>

      </div>

    </section>

  );
}