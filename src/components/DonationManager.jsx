import { useEffect, useState } from "react";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function DonationManager() {

  const [donations, setDonations] = useState([]);

  const fetchDonations = async () => {

    const querySnapshot = await getDocs(
      collection(db, "donations")
    );

    const data = [];

    querySnapshot.forEach((docItem) => {

      data.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setDonations(data);
  };

  const approveDonation = async (id) => {

    await updateDoc(
      doc(db, "donations", id),
      {
        status: "Approved",
      }
    );

    fetchDonations();
  };

  const rejectDonation = async (id) => {

    await updateDoc(
      doc(db, "donations", id),
      {
        status: "Rejected",
      }
    );

    fetchDonations();
  };

  useEffect(() => {

    fetchDonations();

  }, []);

  return (

    <div className="bg-white p-6 rounded-3xl shadow-xl mt-10">

      <h2 className="text-3xl font-bold text-green-700 mb-6">

        Donation Requests

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>

              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Screenshot</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {donations.map((item) => (

              <tr key={item.id} className="border-b">

                <td className="p-3">
                  {item.donorName}
                </td>

                <td className="p-3">
                  {item.email}
                </td>

                <td className="p-3">
                  ₹{item.amount}
                </td>

                <td className="p-3">

                  <a
                    href={item.screenshotUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>

                </td>

                <td className="p-3">
                  {item.status}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      approveDonation(item.id)
                    }
                    className="bg-green-600 text-white px-3 py-2 rounded-xl mr-2"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectDonation(item.id)
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded-xl"
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}