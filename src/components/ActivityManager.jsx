import { useEffect, useState } from "react";

import { db } from "../firebase";
import { translateText } from "../utils/translate";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ActivityManager() {

  const [activities, setActivities] = useState([]);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  image: "",
});

  const fetchActivities = async () => {

    const querySnapshot = await getDocs(
      collection(db, "activities")
    );

    const data = [];

    querySnapshot.forEach((docItem) => {

      data.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setActivities(data);

  };

  useEffect(() => {

    fetchActivities();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const addActivity = async (e) => {

    e.preventDefault();

    const titleHindi =
  await translateText(
    formData.title,
    "hi"
  );

const descriptionHindi =
  await translateText(
    formData.description,
    "hi"
  );

await addDoc(
  collection(db, "activities"),
  {
    title: formData.title,

    titleHindi,

    description:
      formData.description,

    descriptionHindi,

    image: formData.image,
  }
);
    setFormData({
  title: "",
  description: "",
  image: "",
});

    fetchActivities();

  };

  const deleteActivity = async (id) => {

    await deleteDoc(
      doc(db, "activities", id)
    );

    fetchActivities();

  };

  return (

    <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">

      <h2 className="text-3xl font-bold text-green-700 mb-6">

        Activity Manager

      </h2>

      <form
        onSubmit={addActivity}
        className="grid md:grid-cols-2 gap-4 mb-8"
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded-xl"
          required
        />

        

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-xl"
          required
        />

       
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-3 rounded-xl md:col-span-2"
          required
        />

        <button
          type="submit"
          className="bg-green-700 text-white py-3 rounded-xl md:col-span-2"
        >

          Add Activity

        </button>

      </form>

      <div className="space-y-4">

        {activities.map((item) => (

          <div
            key={item.id}
            className="border p-4 rounded-xl flex justify-between items-center"
          >

            <div>

              <h3 className="font-bold">

                {item.title}

              </h3>

              <p>

                {item.titleHindi}

              </p>

            </div>

            <button
              onClick={() =>
                deleteActivity(item.id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>

  );
}