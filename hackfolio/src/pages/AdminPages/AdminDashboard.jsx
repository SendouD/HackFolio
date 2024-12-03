import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import AdminSponsorCard from "../../components/SponsorComponents/AdminSponsorCard";
import axios from "axios";
import ReactingNavBar from "../../components/ReactingNavBar";
import { motion } from "framer-motion";

// Function to get a random image URL from Picsum API
const getRandomImage = () => {
  return `https://picsum.photos/seed/${Math.random() * 1000}/200/200`;  // Random image size of 200x200
};

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
    return <div className="text-center text-[#5f3abd]">Loading sponsors...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="relative flex bg-[#0f172a] min-h-screen"> {/* Full page background */}
        {/* Wave animation for the background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#0f172a] z-0">
          <div className="wave"></div>
        </div>

        <ReactingNavBar />
        <div className="space-y-6 size-full bg-[#0f172a] text-white w-full z-20">
          <Header />
          <div className="container mx-auto px-8 py-12 relative z-30">
            {/* Title section with enhanced font styling */}
            <motion.h1
              className="text-5xl font-extrabold text-center text-[#5f3abd] mb-12 tracking-wide"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sponsor Applications
            </motion.h1>

            {/* Centered sponsor cards with refined grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor.id}
                  className="border border-[#5f3abd] p-6 rounded-xl cursor-pointer bg-gradient-to-r from-[#4f46e5] to-[#6d28d9] hover:bg-[#3f40bb] hover:text-white transition-all duration-500 ease-in-out transform hover:scale-105 shadow-xl"
                  onClick={() => handleSponsorClick(sponsor)}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Show sponsor's logo or a random placeholder image */}
                  <img
                    src={sponsor.logo || getRandomImage()}  // Use a random image if no logo
                    alt={sponsor.companyName}
                    className="h-32 w-32 mb-6 mx-auto rounded-full border-4 border-[#ffffff] shadow-lg"
                  />
                  <h2 className="font-semibold text-lg text-center">{sponsor.companyName}</h2>
                </motion.div>
              ))}
            </motion.div>

            {/* Display sponsor details if a sponsor is selected */}
            {selectedSponsor && (
              <AdminSponsorCard
                sponsor={selectedSponsor}
                onClose={handleCloseDetail}
                onUpdate={handleUpdateSponsors}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
