import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const hackathonDomains = [
  { name: "web-dev", color: "bg-blue-500" },
  { name: "design", color: "bg-pink-500" },
  { name: "ai/ml", color: "bg-green-500" },
  { name: "iot", color: "bg-yellow-500" },
  { name: "blockchain", color: "bg-purple-500" },
  { name: "vr/ar", color: "bg-red-500" },
];
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

function HackathonList() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("all");
  const [domainStats, setDomainStats] = useState(null);
  const [statType, setStatType] = useState("total");

  useEffect(() => {
    fetchDomainStats();
  }, []);
  const fetchDomainStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hackathons/stats");
      const data = await res.json();
      setDomainStats(data);
    } catch (err) {
      console.error("Failed to fetch domain stats", err);
    }
  };

  const convertStatsToChartData = (type = "total") =>
    domainStats
      ? Object.entries(domainStats).map(([domain, values]) => ({
          name: domain.replace("_", "/"),
          value: values[type],
        }))
      : [];

  useEffect(() => {
    fetchHackathons(selectedDomain, status);
  }, [selectedDomain, status]);

  const fetchHackathons = async (domain, selectedStatus) => {
    setLoading(true);
    setError("");
    try {
      let url = `http://localhost:5000/api/hackathons/all?status=${selectedStatus}`;
      if (domain) {
        const formattedDomain = domain.replace("/", "_").toLowerCase();
        url = `http://localhost:5000/api/hackathons/domain/${encodeURIComponent(
          formattedDomain
        )}?status=${selectedStatus}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `HTTP Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Fetched Hackathons:", data); // Debugging

      // Ensure participants field exists
      const updatedHackathons = data.map((hack) => ({
        ...hack,
        participants: hack.participants || [], // Default to empty array if undefined
      }));

      setHackathons(updatedHackathons);
    } catch (err) {
      setError(err.message);
      setHackathons([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#33335d] text-white w-full flex flex-col items-center justify-center py-16">
        <motion.h1
          className="text-5xl font-extrabold tracking-wide text-center mt-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          HACKATHONS
        </motion.h1>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mt-12 px-6">
        {hackathonDomains.map((hackathon, index) => (
          <motion.div
            key={index}
            className={`cursor-pointer flex flex-col justify-between ${
              selectedDomain === hackathon.name ? "border-4 border-white" : ""
            } ${
              hackathon.color
            } text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300`}
            whileHover={{ scale: 1.03 }}
            onClick={() =>
              setSelectedDomain((prev) =>
                prev === hackathon.name ? null : hackathon.name
              )
            }
          >
            <h2 className="text-2xl font-semibold">{hackathon.name}</h2>
            <p className="mt-2 text-sm text-gray-200">
              Explore exciting challenges in {hackathon.name} hackathons.
            </p>
            <motion.button
              className="mt-4 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {selectedDomain === hackathon.name ? "Selected" : "View Details"}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Hackathons List */}
      <div className="max-w-6xl mx-auto mt-12 px-6 bg-white p-8 shadow-lg rounded-lg">
        {/* Show selected domain heading or "All Hackathons" */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedDomain
              ? `Hackathons in ${selectedDomain}`
              : "All Hackathons"}
          </h2>
          {selectedDomain && (
            <button
              onClick={() => setSelectedDomain(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Show All
            </button>
          )}
          <select
            className="p-2 border rounded-lg bg-white shadow"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {loading && (
          <p className="text-gray-600 text-center">Loading hackathons...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && hackathons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border px-4 py-3 text-left">Hackathon Name</th>
                  <th className="border px-4 py-3 text-left">University</th>
                  <th className="border px-4 py-3 text-left">Mode</th>
                  <th className="border px-4 py-3 text-left">Tech</th>
                  <th className="border px-4 py-3 text-left">Team Size</th>
                  <th className="border px-4 py-3 text-left">Participants</th>
                  <th className="border px-4 py-3 text-left">From</th>
                  <th className="border px-4 py-3 text-left">To</th>
                  <th className="border px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hackathons.map((hack, index) => (
                  <tr
                    key={index}
                    className="text-gray-700 odd:bg-gray-100 even:bg-white"
                  >
                    <td className="border px-4 py-3">{hack.hackathonName}</td>
                    <td className="border px-4 py-3">{hack.uniName}</td>
                    <td className="border px-4 py-3">{hack.eventMode}</td>
                    <td className="border px-4 py-3">{hack.tech}</td>
                    <td className="border px-4 py-3">{hack.teamSize}</td>
                    <td className="border px-4 py-3">
                      {hack.participants.length > 0
                        ? hack.participants.length
                        : "No participants"}
                    </td>

                    <td className="border px-4 py-3">{hack.fromDate}</td>
                    <td className="border px-4 py-3">{hack.toDate}</td>
                    <td className="border px-4 py-3">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => setSelectedHackathon(hack)}
                      >
                        View Participant Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No hackathons found.</p>
        )}
      </div>
      {selectedHackathon && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-4">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">
                Participants in {selectedHackathon.hackathonName}
              </h3>
              <button
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                onClick={() => setSelectedHackathon(null)}
              >
                Close
              </button>
            </div>

            {/* Scrollable participant content */}
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">

              {selectedHackathon.participants.length > 0 ? (
                <ul>
                  {selectedHackathon.participants.map((participant, i) => (
                    <li key={i} className="mb-3 border-b pb-3">
                      <p>
                        <strong>Name:</strong> {participant.firstname}{" "}
                        {participant.lastname}
                      </p>
                      <p>
                        <strong>Email:</strong> {participant.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {participant.phoneno}
                      </p>
                      <p>
                        <strong>GitHub:</strong>{" "}
                        <a
                          href={participant.githubprofile}
                          className="text-blue-500 underline"
                        >
                          {participant.githubprofile}
                        </a>
                      </p>
                      <p>
                        <strong>Portfolio:</strong>{" "}
                        <a
                          href={participant.portfoliowebsite}
                          className="text-blue-500 underline"
                        >
                          {participant.portfoliowebsite}
                        </a>
                      </p>
                      <p>
                        <strong>Skills:</strong> {participant.skills}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No participants available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HackathonList;
