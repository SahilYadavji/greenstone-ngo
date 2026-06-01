import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function EventManager() {

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");

  const [events, setEvents] = useState([]);

  // Fetch Events
  const fetchEvents = async () => {

    const querySnapshot = await getDocs(
      collection(db, "events")
    );

    const eventData = [];

    querySnapshot.forEach((docItem) => {

      eventData.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setEvents(eventData);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add Event
  const addEvent = async () => {

    if (!title || !date) {
      alert("Fill all fields");
      return;
    }

    await addDoc(
      collection(db, "events"),
      {
        title,
        date,
      }
    );

    alert("Event Added!");

    setTitle("");
    setDate("");

    fetchEvents();
  };

  // Delete Event
  const deleteEvent = async (id) => {

    await deleteDoc(
      doc(db, "events", id)
    );

    fetchEvents();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl mt-10">

      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Event Management
      </h2>

      {/* Add Event Form */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-4 rounded-xl"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-4 rounded-xl"
        />

        <button
          onClick={addEvent}
          className="bg-green-700 text-white rounded-xl"
        >
          Add Event
        </button>

      </div>

      {/* Event List */}
      <div className="space-y-4">

        {events.map((item) => (

          <div
            key={item.id}
            className="flex justify-between items-center bg-green-50 p-5 rounded-2xl"
          >

            <div>

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.date}
              </p>

            </div>

            <button
              onClick={() => deleteEvent(item.id)}
              className="bg-red-500 text-white px-5 py-2 rounded-xl"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}