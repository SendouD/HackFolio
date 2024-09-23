import React, { useEffect, useState } from "react";
import SponsorDetails from "../../components/SponsorComponents/SponsorDetails"; // Assuming this component exists
import axios from "axios";
import { useParams } from "react-router-dom"; // Extract route params
import Header from "../../components/Header";

const SponsorDetailsDisplay = () => {
  const { sponsorName } = useParams(); // Extract sponsorId from the URL
  const [sponsor, setSponsor] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsorData = async () => {
      try {
        const response = await axios.get(`/api/sponsor/${sponsorName}`);
        setSponsor(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sponsor:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSponsorData();
  }, [sponsorId]); // Fetch sponsor data when sponsorId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header/>
      {sponsor ? (
        <SponsorDetails sponsor={sponsor} />
      ) : (
        <div>No sponsor details available</div>
      )}
    </div>
  );
};

export default SponsorDetailsDisplay;
