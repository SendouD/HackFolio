import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import ReactingNavBar from "../ReactingNavBar";
import { motion } from "framer-motion";
import LoadingPage from "../loading";
import { useNavigate } from "react-router-dom";

const getRandomImage = () => {
    return `https://picsum.photos/seed/${Math.random() * 1000}/200/200`;
  };
  
const AdminHackathonCard = ({ hackathon, onClose, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleDelete = async () => {
      if (window.confirm("Are you sure you want to delete this hackathon?")) {
        try {
          setLoading(true);
          await axios.delete(
            `${__BACKEND_URL__}/api/deleteHackathon/${hackathon.hackathonName}`
          );
          setMessage("Hackathon deleted successfully!");
          setTimeout(() => {
            onUpdate();
            onClose();
          }, 2000);
        } catch (error) {
          setMessage("Failed to delete hackathon.");
          console.error("Error deleting hackathon:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
  
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={hackathon.image || getRandomImage()}
              alt={hackathon.hackathonName}
              className="w-32 h-32 rounded-lg object-cover"
            />
  
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {hackathon.hackathonName.split('-').join(' ')}
              </h2>
  
              <div className="space-y-3 mb-6 text-gray-700">
                <p><strong>Mode:</strong> {hackathon.eventMode}</p>
                <p><strong>Theme:</strong> {hackathon.tech}</p>
                <p><strong>From:</strong> {hackathon.fromDate}</p>
                <p><strong>To:</strong> {hackathon.toDate}</p>
              </div>
  
              {message && (
                <div className={`p-3 rounded mb-4 ${
                  message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {message}
                </div>
              )}
  
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  {loading ? "Deleting..." : "Delete Hackathon"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
};


const AdminHackathonsComp = () => {
    const [hackathons, setHackathons] = useState([]);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination and search states
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
    const fetchHackathons = async (page = 1, query = "") => {
      try {
        setLoading(true);
        
        let url = `${__BACKEND_URL__}/api/hackathon?page=${page}&limit=8`;
        if (query.trim()) {
          url += `&search=${query}`;
        }
        
        const response = await axios.get(url, {
          withCredentials: true
        });
        
        if (response.status === 403) {
          navigate("/Error403");
          return;
        }
        
        const data = response.data;

        console.log(response.data)
        setHackathons(data.hackathons);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hackathons.");
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchHackathons(1);
    }, []);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        fetchHackathons(1, searchQuery);
      }, 500);
  
      return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);
  
    const handleHackathonClick = (hackathon) => {
      setSelectedHackathon(hackathon);
    };
  
    const handleCloseDetail = () => {
      setSelectedHackathon(null);
    };
  
    const handleUpdateHackathons = async () => {
      fetchHackathons(currentPage, searchQuery);
    };
  
    const handlePageChange = (page) => {
      if (page < 1 || page > totalPages) return;
      fetchHackathons(page, searchQuery);
    };
  
    if (loading) {
      return <LoadingPage />;
    }
  
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }
  
    return (
      <>
        <div className="relative flex min-h-screen">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <div className="wave"></div>
          </div>
          
          {/* Animated background shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: 0.7 }}
            transition={{ duration: 3 }}
            className="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full z-[-10]"
          />
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, scale: 0.7 }}
            transition={{ duration: 3 }}
            className="absolute top-40 right-10 w-28 h-28 bg-blue-300"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 0.7 }}
            transition={{ duration: 3 }}
            className="absolute bottom-20 left-20 w-20 h-20 bg-yellow-400 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, scale: 0.7 }}
            transition={{ duration: 3 }}
            className="absolute bottom-0 right-0 w-40 h-40 bg-green-300"
          />
          
          {/* Line animations */}
          <motion.div>
            <motion.svg
              className="line-animation absolute bottom-1/4 left-1/2 w-32 h-32"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 10 C 20 20, 40 20, 50 10 S 90 10, 100 50"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="4"
              />
            </motion.svg>
          </motion.div>
          
          <motion.div>
            <motion.svg
              className="line-animation absolute top-[100px] left-1/4 w-32 h-32"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10 10 L 50 50 L 90 10"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="4"
              />
            </motion.svg>
          </motion.div>
          
          <div className="space-y-6 size-full text-white w-full z-20">
            <div className="container mx-auto px-8 py-8 relative z-30">
              {/* Title */}
              <motion.h1
                className="text-5xl font-extrabold text-center text-[#5f3abd] mb-8 tracking-wide"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Manage Hackathons
              </motion.h1>
  
              {/* Search Bar */}
              <div className="flex justify-center mt-4 mb-8">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border py-3 border-gray-500 rounded-lg w-[500px] pl-5 text-lg text-gray-800"
                  placeholder="Search for hackathons"
                />
              </div>
  
              {/* Hackathons grid */}
              {hackathons.length === 0 ? (
                <div className="text-center py-8 text-gray-700 bg-white rounded-lg shadow-lg">
                  No hackathons found.
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {hackathons.map((hackathon) => (
                    <motion.div
                      key={hackathon._id}
                      className="border border-[#5f3abd] p-6 rounded-xl cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#6d28d9] hover:bg-[#3f40bb] hover:text-white transition-all duration-500 ease-in-out transform hover:scale-105 shadow-xl"
                      onClick={() => handleHackathonClick(hackathon)}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Hackathon image */}
                      <img
                        src={hackathon.image || getRandomImage()}
                        alt={hackathon.hackathonName}
                        className="h-32 w-32 mb-6 mx-auto rounded-full border-4 border-[#ffffff] shadow-lg object-cover"
                      />
                      
                      {/* Hackathon name */}
                      <h2 className="font-semibold text-lg text-center text-white">
                        {hackathon.hackathonName.split('-').join(' ')}
                      </h2>
                      
                      {/* Dates */}
                      <p className="text-center text-white text-sm mt-2">
                        {hackathon.fromDate} - {hackathon.toDate}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
  
              {/* Pagination */}
              <div className="flex justify-center my-8">
                {totalPages > 0 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`py-1 px-3 bg-[#5f3abd] text-white rounded mr-2 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5635ac]"
                    }`}
                  >
                    {"< prev"}
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "py-1 px-3 bg-[#5f3abd] text-white rounded mr-2"
                        : "py-1 px-3 rounded text-gray-600 underline mr-2"
                    }
                  >
                    {page}
                  </button>
                ))}
                {totalPages > 0 && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`py-1 px-3 bg-[#5f3abd] text-white rounded ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5635ac]"
                    }`}
                  >
                    {"Next >"}
                  </button>
                )}
              </div>
  
              {/* Detail modal */}
              {selectedHackathon && (
                <AdminHackathonCard
                  hackathon={selectedHackathon}
                  onClose={handleCloseDetail}
                  onUpdate={handleUpdateHackathons}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

export default AdminHackathonsComp;