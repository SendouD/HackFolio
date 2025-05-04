import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingPage from "../loading";

const DisplaySponsor = () => {
  // Initialize as empty array
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchSponsors() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors`);
      console.log("Sponsors response:", response.data);
      
      // Ensure we're setting an array, even if the API returns null or undefined
      setSponsors(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching sponsors:", err);
      setError("Error fetching sponsors");
      // Set to empty array on error to prevent .map() issues
      setSponsors([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleSponsorClick = (sponsor) => {
    navigate(`/sponsors/${sponsor.companyName}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-10 text-red-500 bg-red-50 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-slate-50 to-blue-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Our Sponsors
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're grateful to these amazing organizations for supporting our mission.
          </p>
        </div>

        {sponsors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor._id || `sponsor-${index}`}
                onClick={() => handleSponsorClick(sponsor)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full border border-gray-200">
                  <div className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {sponsor.logo ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">
                          {sponsor.companyName?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {sponsor.companyName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {sponsor.description || "Proud supporter of our organization"}
                    </p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">No Sponsors Available</h3>
            <p className="text-gray-600">
              We currently don't have any sponsors to display. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplaySponsor;