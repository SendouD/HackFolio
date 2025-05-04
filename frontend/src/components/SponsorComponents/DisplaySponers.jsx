import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingPage from "../loading";

const DisplaySponsor = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchSponsors() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors`);
      setSponsors(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching sponsors:", err);
      setError("Error fetching sponsors");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleSponsorClick = (sponsor) => {
    navigate(`/sponsors/${sponsor.companyName}`);
  };

  if (loading) return <LoadingPage />;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative min-h-screen py-10 bg-gray-100 dark:bg-gray-900 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-200">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400 rounded-full z-[-1]" animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }} transition={{ repeat: Infinity, duration: 6 }} />
        <motion.div className="absolute top-40 right-20 w-28 h-28 bg-blue-300 rounded-full z-[-1]" animate={{ y: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 7 }} />
        <motion.div className="absolute bottom-20 left-20 w-20 h-20 bg-purple-400 rounded-full z-[-1]" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }} />
        
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="wave"></div>
        </div>
        <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.7, scale: 0.7 }}
                  transition={{ duration: 3 }}
                  className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full z-[-10]"
                />
                <motion.div
                  initial={{ opacity: 0, x: -500 }}
                  animate={{ opacity: 1, scale: 0.7 }}
                  transition={{ duration: 3 }}
                  className="absolute top-40 right-10 w-28 h-28 bg-blue-300"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 0.7 }}
                  transition={{ duration: 3 }}
                  className="absolute bottom-20 left-20 w-20 h-20 bg-purple-400 rounded-full"
                />
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, scale: 0.7 }}
                  transition={{ duration: 3 }}
                  className="absolute bottom-0 right-0 w-40 h-40 bg-green-300"
                />
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
                    className="line-animation absolute top-[100px]  left-1/4 w-32 h-32"
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
      
      <motion.div
        className="featured-sponsors py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-800 dark:text-white mb-10">
          Our Sponsors
        </h2>
        
        {/* Sponsor Cards */}
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleSponsorClick(sponsor)}
              className="cursor-pointer"
            >
              <Card className="hover:shadow-lg transition duration-200">
                <CardHeader className="text-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.companyName}
                    className="h-16 w-16 mb-4 mx-auto"
                  />
                  <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                    {sponsor.companyName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="mx-auto block text-blue-500">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DisplaySponsor;
