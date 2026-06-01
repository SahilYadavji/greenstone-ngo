import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function SuccessManager() {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");

  const [stories, setStories] = useState([]);

  // Fetch Stories
  const fetchStories = async () => {

    const querySnapshot = await getDocs(
      collection(db, "successStories")
    );

    const storyData = [];

    querySnapshot.forEach((docItem) => {

      storyData.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setStories(storyData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Add Story
  const addStory = async () => {

    if (!title || !description || !image) {
      alert("Fill all fields");
      return;
    }

    await addDoc(
      collection(db, "successStories"),
      {
        title,
        description,
        image,
      }
    );

    alert("Story Added!");

    setTitle("");
    setDescription("");
    setImage("");

    fetchStories();
  };

  // Delete Story
  const deleteStory = async (id) => {

    await deleteDoc(
      doc(db, "successStories", id)
    );

    fetchStories();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">

      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Success Stories
      </h2>

      {/* Form */}
      <div className="space-y-4 mb-10">

        <input
          type="text"
          placeholder="Story Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-4 rounded-2xl"
        />

        <textarea
          placeholder="Story Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-4 rounded-2xl h-32"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-4 rounded-2xl"
        />

        <button
          onClick={addStory}
          className="bg-green-700 text-white px-8 py-4 rounded-2xl"
        >
          Add Story
        </button>

      </div>

      {/* Stories */}
      <div className="grid md:grid-cols-2 gap-8">

        {stories.map((item) => (

          <div
            key={item.id}
            className="bg-green-50 rounded-3xl overflow-hidden shadow-lg"
          >

            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-700 mb-4">
                {item.description}
              </p>

              <button
                onClick={() => deleteStory(item.id)}
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}