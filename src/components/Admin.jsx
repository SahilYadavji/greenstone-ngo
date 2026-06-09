import { signOut } from "firebase/auth";

import { auth, db } from "../firebase";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import DonationManager from "./DonationManager";
import EventManager from "./EventManager";

import Analytics from "./Analytics";

import SuccessManager from "./SuccessManager";

import BlogManager from "./BlogManager";
import ActivityVolunteerManager from "./ActivityVolunteerManager";
import jsPDF from "jspdf";
import ActivityManager from "./ActivityManager";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Admin() {

  const [volunteers, setVolunteers] = useState([]);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const [totalFunds, setTotalFunds] = useState(0);

  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {

    await signOut(auth);

    navigate("/login");

  };

  // Certificate Generator
  const generateCertificate = (name) => {

    const doc = new jsPDF("landscape");

    // Outer Border
    doc.setDrawColor(22, 101, 52);

    doc.setLineWidth(4);

    doc.rect(10, 10, 277, 190);

    // Inner Border
    doc.setLineWidth(1);

    doc.rect(15, 15, 267, 180);

    // Watermark
    doc.setTextColor(220);

    doc.setFontSize(60);

    doc.text(
      "GREENSTONE NGO",
      60,
      110,
      {
        angle: 25,
      }
    );

    // NGO Name
    doc.setFont("times", "bold");

    doc.setTextColor(22, 101, 52);

    doc.setFontSize(30);

    doc.text(
      "Greenstone Welfare Club",
      95,
      40
    );

    // Title
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(26);

    doc.text(
      "Certificate of Appreciation",
      85,
      65
    );

    // Subtitle
    doc.setFontSize(16);

    doc.text(
      "This certificate is proudly presented to",
      82,
      90
    );

    // Volunteer Name
    doc.setFontSize(30);

    doc.setTextColor(22, 101, 52);

    doc.text(
      name,
      115,
      115
    );

    // Description
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(16);

    doc.text(
      "For outstanding contribution and support towards NGO activities",
      45,
      145
    );

    // Signature
    doc.line(200, 165, 260, 165);

    doc.setFontSize(14);

    doc.text(
      "Authorized Signature",
      210,
      175
    );

    // Date
    const today = new Date().toLocaleDateString();

    doc.text(
      `Date: ${today}`,
      30,
      175
    );

    // Save
    doc.save(`${name}-certificate.pdf`);
  };

  // Fetch Volunteers
  const fetchVolunteers = async () => {

    const querySnapshot = await getDocs(
      collection(db, "volunteers")
    );

    const volunteerData = [];

    querySnapshot.forEach((docItem) => {

      volunteerData.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setVolunteers(volunteerData);
  };

  // Fetch Total Funds
  const fetchTotalFunds = async () => {

    const querySnapshot = await getDocs(
      collection(db, "donations")
    );

    let total = 0;

    querySnapshot.forEach((docItem) => {

      if (docItem.data().status === "Approved") {
        total += Number(docItem.data().amount || 0);
      }

    });

    setTotalFunds(total);
  };

  // Approve Volunteer
  const approveVolunteer = async (id) => {

    await updateDoc(
      doc(db, "volunteers", id),
      {
        status: "approved",
      }
    );

    fetchVolunteers();
  };

  // Delete Volunteer
  const deleteVolunteer = async (id) => {

    await deleteDoc(
      doc(db, "volunteers", id)
    );

    fetchVolunteers();
  };

  // Filter Logic
  const filteredVolunteers = volunteers.filter((item) => {

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all"
        ? true
        : item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {

  fetchVolunteers();

  fetchTotalFunds();

  const interval = setInterval(() => {

    fetchVolunteers();

    fetchTotalFunds();

  }, 5000);

  return () => {

    clearInterval(interval);

  };

}, []);

  return (

    <section className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-green-700">

          NGO Admin Dashboard

        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-2xl"
        >

          Logout

        </button>
        <button
  onClick={() => {

    fetchVolunteers();

    fetchTotalFunds();

  }}
  className="bg-green-600 text-white px-6 py-3 rounded-2xl ml-4"
>
  Refresh Data
</button>

      </div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow-xl text-center">

          <h2 className="text-2xl font-bold text-green-700 mb-2">

            Total Volunteers

          </h2>

          <p className="text-4xl font-bold">

            {volunteers.length}

          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl text-center">

          <h2 className="text-2xl font-bold text-green-700 mb-2">

            Approved

          </h2>

          <p className="text-4xl font-bold">

            {
              volunteers.filter(
                (v) => v.status === "approved"
              ).length
            }

          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl text-center">

          <h2 className="text-2xl font-bold text-yellow-600 mb-2">

            Pending

          </h2>

          <p className="text-4xl font-bold">

            {
              volunteers.filter(
                (v) => v.status !== "approved"
              ).length
            }

          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl text-center">

          <h2 className="text-2xl font-bold text-green-700 mb-2">

            Total Funds

          </h2>

          <p className="text-4xl font-bold">

            ₹{totalFunds}

          </p>

        </div>

      </div>

      {/* Managers */}
      <ActivityManager />
      <ActivityVolunteerManager />
      <EventManager />
      

      <BlogManager />

      <SuccessManager />
      <DonationManager />

      {/* Search & Filter */}
      <div className="bg-white p-6 rounded-3xl shadow-xl mt-10 mb-10">

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Search Volunteer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-4 rounded-2xl"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-4 rounded-2xl"
          >

            <option value="all">

              All Volunteers

            </option>

            <option value="approved">

              Approved

            </option>

            <option value="pending">

              Pending

            </option>

          </select>

        </div>

      </div>

      {/* Volunteer Table */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-3xl font-bold text-green-700">

            Volunteer Registrations

          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-700 text-white">

              <tr>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Phone</th>

                <th className="p-4 text-left">Message</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredVolunteers.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">{item.name}</td>

                  <td className="p-4">{item.email}</td>

                  <td className="p-4">{item.phone}</td>

                  <td className="p-4">{item.message}</td>

                  <td className="p-4">

                    {item.status === "approved" ? (

                      <span className="bg-green-500 text-white px-4 py-2 rounded-xl">

                        Approved

                      </span>

                    ) : (

                      <span className="bg-yellow-500 text-white px-4 py-2 rounded-xl">

                        Pending

                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => approveVolunteer(item.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl mr-2"
                    >

                      Approve

                    </button>

                    <button
                      onClick={() => generateCertificate(item.name)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl mr-2"
                    >

                      Certificate

                    </button>

                    <button
                      onClick={() => deleteVolunteer(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}