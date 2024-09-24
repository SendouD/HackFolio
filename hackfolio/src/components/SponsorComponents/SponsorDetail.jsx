import React ,{useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header";
const SponsorDetail = () => {
    const { companyName } = useParams(); // Get the sponsor ID from the URL
    const [sponsor, setSponsor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchSponsor = async () => {
        try {
          const response = await axios.get(`/api/sponsors/user/${companyName}`);
          setSponsor(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching sponsor details:", err);
          setError("Error fetching sponsor details");
          setLoading(false);
        }
      };
  
      fetchSponsor();
    }, [companyName]);
  
    if (loading) return <div>Loading sponsor details...</div>;
    if (error) return <div>{error}</div>;
  return (
    <>
    <Header/>

    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{sponsor.companyName}</h1>
          <p className="text-gray-600 mt-2">{sponsor.userName}</p>
        </div>

        {/* Logo Section */}
        {sponsor.logo && (
          <div className="mb-6">
            <img
              src={sponsor.logo}
              alt={`${sponsor.companyName} logo`}
              className="h-24 w-24 rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Website */}
        {sponsor.website && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Website</h2>
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {sponsor.website}
            </a>
          </div>
        )}

        {/* Contact Details */}
        {(sponsor.email || sponsor.phoneNumber) && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            {sponsor.email && (
              <p>
                Email:{" "}
                <a
                  href={`mailto:${sponsor.email}`}
                  className="text-blue-500 underline"
                >
                  {sponsor.email}
                </a>
              </p>
            )}
            {sponsor.phoneNumber && <p>Phone: {sponsor.phoneNumber}</p>}
          </div>
        )}

        {/* Address Section */}
        {sponsor.address && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <p>{sponsor.address.street}</p>
            <p>
              {`${sponsor.address.city}, ${sponsor.address.state}, ${sponsor.address.zip}, ${sponsor.address.country}`}
            </p>
          </div>
        )}

        {/* Description */}
        {sponsor.description && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{sponsor.description}</p>
          </div>
        )}
      </div>

    </div>
    </>
  );
};

export default SponsorDetail;
