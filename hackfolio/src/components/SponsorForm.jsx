import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "./loading";
import { useNavigate } from 'react-router-dom';

function SponsorForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    email: "",
    phoneNumber: "",
    verificationStatus: "Pending", // Default value
    registrationNumber: "",
    taxId: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    description: ""
  });

  const [logo, setLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (file) => {
    const uploadPreset = 'sponsor'; // Replace with your Cloudinary upload preset
    const cloudName = 'dv1a0uvfm'; // Replace with your Cloudinary cloud name
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData,      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false, 
      });
      console.log(response.data)
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Upload logo and collect URL
    const logoUrl = logo ? await handleImageUpload(logo) : null;

    // Prepare data for API request
    const sponsorData = {
      ...formData,
      logo: logoUrl,
    };

    try {
      // Send data to /api/sponsor
      console.log(sponsorData);
      const response = await axios.post('/api/sponsor', sponsorData);
      console.log('Server response:', response.data);
      navigate('/sponsoruploadsuccess');
    } catch (error) {
      console.error('Error sending data to /api/sponsor:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="bg-gray-100 p-6">
          <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Sponsor Submission Form
          </div>
          <br />
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Submit Sponsor Details</h1>
            <form onSubmit={handleSubmit}>
              {/* Company Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                  required
                />
              </div>

              {/* Website */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company website"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact email"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact phone number"
                  required
                />
              </div>

              {/* Registration Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration number"
                  required
                />
              </div>

              {/* Tax ID */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Tax ID</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax identification number"
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Street"
                />
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  placeholder="City"
                />
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  placeholder="State"
                />
                <input
                  type="text"
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  placeholder="ZIP Code"
                />
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  placeholder="Country"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the company"
                />
              </div>

              {/* Logo Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SponsorForm;
