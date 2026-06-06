import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function ActivityVolunteerManager() {

  const [groupedData, setGroupedData] = useState({});
  const [openActivity, setOpenActivity] = useState(null);

  useEffect(() => {

    fetchRegistrations();

  }, []);

  const fetchRegistrations = async () => {

    const snapshot = await getDocs(
      collection(db, "activityRegistrations")
    );

    const grouped = {};

    snapshot.forEach((doc) => {

      const data = doc.data();

      if (!grouped[data.activityTitle]) {

        grouped[data.activityTitle] = [];

      }

      grouped[data.activityTitle].push({
        id: doc.id,
        ...data,
      });

    });

    setGroupedData(grouped);

  };

  return (

    <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">

      <h2 className="text-3xl font-bold text-green-700 mb-6">

        Activity Volunteers

      </h2>

      {Object.keys(groupedData).map((activity) => (

        <div
          key={activity}
          className="border rounded-xl mb-4 p-4"
        >

          <div className="flex justify-between items-center">

            <h3 className="font-bold text-xl">

              {activity} (
              {groupedData[activity].length}
              {" "}
              Volunteers)

            </h3>

            <button
              onClick={() =>
                setOpenActivity(
                  openActivity === activity
                    ? null
                    : activity
                )
              }
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >

              {openActivity === activity
                ? "Hide"
                : "View Volunteers"}

            </button>

          </div>

          {openActivity === activity && (

            <div className="mt-4 space-y-3">

              {groupedData[activity].map((volunteer) => (

                <div
                  key={volunteer.id}
                  className="bg-gray-50 p-3 rounded-lg"
                >

                  <p>
                    <strong>Name:</strong>
                    {" "}
                    {volunteer.name}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    {" "}
                    {volunteer.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>
                    {" "}
                    {volunteer.phone}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    {" "}
                    {volunteer.status}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      ))}

    </div>

  );

}