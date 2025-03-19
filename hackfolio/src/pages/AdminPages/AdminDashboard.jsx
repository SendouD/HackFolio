import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import HackathonList from "./HackathonList";
import ProjectList from "./ProjectList";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null); // 'hackathons' or 'projects'

  return (
    <div className="relative flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ReactingNavBar />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex flex-col w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Header />

        {/* Dashboard Hero Section */}
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

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-[90%] md:w-[80%] lg:w-[70%] mt-12">
          {/* Sponsor Details Card */}
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

          {/* Ongoing Hackathons Card */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              🏆  Hackathons
            </h2>
            <p className="text-gray-600 mt-2">
              Check  hackathons and track participants.
            </p>
            <motion.button
              className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-indigo-700 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveSection("hackathons")}
            >
              Explore
            </motion.button>
          </motion.div>

          {/* Projects Card */}
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

        {/* Dynamic Section Rendering */}
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
      </motion.div>
    </div>
  )}; 