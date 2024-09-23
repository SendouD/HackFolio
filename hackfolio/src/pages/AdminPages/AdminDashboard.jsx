import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SponsorDetail from "../../components/SponsorComponents/SponsorDetail";
import axios from "axios";

const AdminDashboard = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("/api/sponsors/adminDash");
        setSponsors(response.data); // Assume the API returns an array of sponsors
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sponsors. Please try again later.");
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
      setSponsors(response.data); // Update the state with the new list of sponsors
    } catch (error) {
      console.error("Error fetching updated sponsors:", error);
    }
  };
  

  if (loading) {
    return <div className="text-center">Loading sponsors...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Sponsor Applications</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="border border-gray-300 p-4 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => handleSponsorClick(sponsor)}
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
        {selectedSponsor && (
          <SponsorDetail
            sponsor={selectedSponsor}
            onClose={handleCloseDetail}
            onUpdate={handleUpdateSponsors}
          />
        )}
      </div> 
    </>
  );
};

export default AdminDashboard;
