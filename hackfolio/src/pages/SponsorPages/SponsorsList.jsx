import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const SponsorList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    navigate(`/sponsors/${sponsor.companyName}`); // Redirect to the sponsor detail page using the sponsor ID
  };

  // Loading and error states
  if (loading) return <div>Loading sponsors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="text-4xl text-center font-bold mt-6">Our Sponsors</h1>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className="border border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-50"
            onClick={() => handleSponsorClick(sponsor)} // Trigger redirection on click
          >
            <img
              src={sponsor.logo}
              alt={sponsor.companyName}
              className="h-20 mb-2"
            />
            <h2 className="font-bold">{sponsor.companyName}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default SponsorList;
