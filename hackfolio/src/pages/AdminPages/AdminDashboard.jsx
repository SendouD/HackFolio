import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import AdminSponsorCard from "../../components/SponsorComponents/AdminSponsorCard";
import axios from "axios";
import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("/api/sponsors/adminDash");
        setSponsors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sponsors.");
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const handleSponsorClick = (sponsor) => {
    setSelectedSponsor(sponsor);
  };

  const handleCloseDetail = () => {
    setSelectedSponsor(null);
  };

  const handleUpdateSponsors = async () => {
    try {
      const response = await axios.get("/api/sponsors/adminDash");
      setSponsors(response.data);
    } catch (error) {
      console.error("Error fetching updated sponsors:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
    
    <div className="relative flex min-h-screen overflow-hidden">
    <ReactingNavBar  className="z-60"/>

      {/* Animated Shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity:  1, scale: 1 }}
        transition={{ duration: 0.7}}
        className="absolute top-10 left-12 w-32 h-32 bg-yellow-400 rounded-full z-[-100]"
      />
      <motion.div
        initial={{ opacity: 0, x: -200}}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1}}
        className="absolute top-40 right-10 w-28 h-28 bg-blue-300"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1,}}
        className="absolute bottom-20 left-20 w-20 h-20 bg-purple-400 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 right-0 w-40 h-40 bg-green-300"
      />

      {/* Main Content */}
      <div className="space-y-3 w-full relative z-10">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="container mx-auto p-6"
        >
          <h1 className="text-3xl font-bold text-purple-700 mb-6">
            Sponsor Applications
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sponsors.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No sponsor requests
              </div>
            ) : (
              sponsors.map((sponsor) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={sponsor.id}
                  className="border border-gray-300 p-4 rounded-lg cursor-pointer bg-white shadow-lg"
                  onClick={() => handleSponsorClick(sponsor)}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.companyName}
                    className="h-20 w-auto mx-auto mb-4"
                  />
                  <h2 className="font-bold text-center text-gray-800">
                    {sponsor.companyName}
                  </h2>
                </motion.div>
              ))
            )}
          </motion.div>
          {selectedSponsor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              <AdminSponsorCard
                sponsor={selectedSponsor}
                onClose={handleCloseDetail}
                onUpdate={handleUpdateSponsors}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
