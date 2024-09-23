<h1 className="text-4xl text-center font-bold mt-6">Our Sponsors</h1>;
import React, { useState, useEffect } from "react";
import axios from "axios";
import SponsorCard from "../../components/SponsorComponents/SponsorCard"; // Assuming SponsorCard is in the same folder

const SponsorList = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading sponsors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="text-4xl text-center font-bold mt-6">Our Sponsors</h1>

      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor._id} sponsor={sponsor} />
        ))}
      </div>
    </>
  );
};

export default SponsorList;
