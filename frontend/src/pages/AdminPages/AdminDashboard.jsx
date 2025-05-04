import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import HackathonList from "./HackathonList";
import ProjectList from "./ProjectList";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [ongoingHackathons, setOngoingHackathons] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchOngoingHackathons();
    fetchAdminStats();
  }, []);

  const fetchOngoingHackathons = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hackathons/all?status=ongoing"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOngoingCount(data.length);
      setOngoingHackathons(data);
    } catch (error) {
      console.error("Error fetching ongoing hackathons:", error);
    }
  };

  const fetchAdminStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/hackathons/stats"
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Non-OK response fetching stats:",
          response.status,
          errorText
        );
        throw new Error("Failed to fetch admin stats");
      }
      const data = await response.json();
      console.log("✅ Stats Fetched:", data); // Log the stats data
      setStats(data);
    } catch (err) {
      console.error("Error fetching admin stats:", err);
    }
  };

  // Prepare the PieChart data from stats
  const pieChartData = stats?.domains
    ? Object.entries(stats.domains).map(([domain, values]) => ({
        name: domain.replace("_", " "),
        value: values.total,
      }))
    : [];

  // Pie chart colors (optional)
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8B78E6",
    "#D87093",
  ];

  return (
    <div className="relative flex min-h-screen bg-gradient-to-tr from-purple-200 via-blue-100 to-white overflow-hidden">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ReactingNavBar />
      </motion.div>

      <motion.div
        className="flex flex-col w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Header />
        <motion.div
          className="bg-[#3a3a6a] text-white w-full flex flex-col items-center justify-center py-16 shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold tracking-wide text-center mt-4">
            ADMIN DASHBOARD
          </h1>
        </motion.div>

        {/* STATS SECTION */}
        {stats && (
          <div className="mt-10 mx-auto w-[90%] md:w-[80%] lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Hackathons
              </h3>
              <p className="text-3xl font-bold text-indigo-700 mt-2">
                {stats.totalHackathons}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Participants
              </h3>
              <p className="text-3xl font-bold text-green-700 mt-2">
                {stats.totalParticipants}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Completed Hackathons
              </h3>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.completedHackathons}
              </p>
            </div>
          </div>
        )}

        {/* Pie Chart Section */}
        {pieChartData.length > 0 && (
          <div className="mt-10 mx-auto w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Hackathon Domains Distribution
            </h2>

            {/* Center the chart itself */}
            <div className="flex justify-center">
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />

                {/* Center the legend */}
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ marginTop: 20 }}
                />
              </PieChart>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-[90%] md:w-[80%] lg:w-[70%] mt-12">
          {/* Sponsor Details */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              📢 Sponsor Details
            </h2>
            <p className="text-gray-600 mt-2">
              View and manage sponsor requests for upcoming hackathons.
            </p>
            <motion.button
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/sponsor-applications")}
            >
              View Sponsor Applications
            </motion.button>
          </motion.div>

          {/* Hackathons Section */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              🏆 Hackathons
            </h2>
            <p className="text-gray-600 mt-2">
              Check hackathons and track participants.
            </p>
            <motion.button
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-indigo-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection("hackathons")}
            >
              Explore
            </motion.button>
          </motion.div>

          {/* Ongoing Hackathons Section */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              🏆 Ongoing Hackathons
            </h2>
            <p className="text-gray-600 mt-2">
              Currently ongoing hackathons:{" "}
              <span className="text-xl font-semibold text-green-600">
                {ongoingCount}
              </span>
            </p>
            <motion.button
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-indigo-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection("stats")}
            >
              View Ongoing Hackathons
            </motion.button>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              🚀 Projects
            </h2>
            <p className="text-gray-600 mt-2">
              Browse and manage projects submitted for hackathons.
            </p>
            <motion.button
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-green-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection("projects")}
            >
              Explore Projects
            </motion.button>
          </motion.div>
        </div>

        {/* Conditional Sections */}
        {activeSection === "hackathons" && (
          <motion.div
            className="mt-8 p-6 w-[90%] md:w-[70%] lg:w-[60%] mx-auto bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HackathonList />
            <motion.button
              onClick={() => setActiveSection(null)}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Hide List
            </motion.button>
          </motion.div>
        )}

        {activeSection === "projects" && (
          <motion.div
            className="mt-8 p-6 w-[90%] md:w-[70%] lg:w-[60%] mx-auto bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectList />
            <motion.button
              onClick={() => setActiveSection(null)}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Hide List
            </motion.button>
          </motion.div>
        )}

        {activeSection === "stats" && (
          <motion.div
            className="mt-8 p-6 w-[90%] md:w-[80%] lg:w-[40%] mx-auto bg-white rounded-xl shadow-lg shadow-blue-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Ongoing Hackathon Details
            </h2>
            {ongoingHackathons.length > 0 ? (
              ongoingHackathons.map((hackathon) => (
                <div
                  key={hackathon._id}
                  className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md shadow-black transition"
                >
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {hackathon.hackathonName}
                  </h3>
                  <p className="text-gray-700">
                    UNIVERSITY:{" "}
                    <span className="font-medium">{hackathon.uniName}</span>
                  </p>
                  <p className="text-gray-700">
                    Domain:{" "}
                    <span className="font-medium">{hackathon.tech}</span>
                  </p>
                  <p className="text-gray-700">
                    EventMode:{" "}
                    <span className="font-medium">{hackathon.eventMode}</span>
                  </p>
                  <p className="text-gray-700">
                    From:{" "}
                    <span className="font-medium">{hackathon.fromDate}</span> —
                    To: <span className="font-medium">{hackathon.toDate}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No ongoing hackathons found.</p>
            )}
            <motion.button
              onClick={() => setActiveSection(null)}
              className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Hide List
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
