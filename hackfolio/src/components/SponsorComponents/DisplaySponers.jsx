import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import "../../styles/Homepage.css"; // Assuming the custom styles are available
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";

const DisplaySponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch sponsors on component mount
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("/api/sponsors");
        setSponsors(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setError("Error fetching sponsors");
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  // Handle click on a sponsor card (Redirect to sponsor detail page)
  const handleSponsorClick = (sponsor) => {
    navigate(`/sponsors/${sponsor.companyName}`); // Redirect to the sponsor detail page
  };

  // Loading and error states
  if (loading) return <div>Loading sponsors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      <motion.div
        className="featured-sponsors py-20 bg-[#1f2937] dark:bg-[#2e1065] dark:text-white text-white "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white pb-10">
          Our Sponsors
        </h2>

        {/* Container with horizontal scrolling enabled */}
        <div className="overflow-x-auto">
          <div
            className={`container mx-auto p-6 flex gap-6 ${sponsors.length < 4 ? "justify-center" : ""}`}
          >
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor._id}
                className="sponsor-card rounded-xl shadow-2xl p-6 bg-[#c4b5fd] hover:bg-[#3a4c60] transition duration-300 cursor-pointer inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => handleSponsorClick(sponsor)}
                style={{ width: "200px", height: "200px" }} // Set fixed size for the square cards
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.companyName}
                  className="h-16 w-16 mb-4 mx-auto" // Adjust size of the logo inside the square card
                />
                <h3 className="font-semibold text-[#1f2937] text-xl text-center">{sponsor.companyName}</h3>
              </motion.div>
            ))}
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default DisplaySponsor;
