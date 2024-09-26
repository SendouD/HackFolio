import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../loading";
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// Define the Zod schema for validation
const sponsorSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string().url("Must be a valid URL").nonempty("Website is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  phoneNumber: z
  .string()
  .length(10, "Phone number must be exactly 10 digits long")
  .regex(/^[6-9]\d{9}$/, "Phone number must start with 6, 7, 8, or 9 and be followed by 9 digits"),// E.164 format validation
  verificationStatus: z.enum(["Pending", "Verified", "Rejected"]),
  registrationNumber: z.string().min(1, "Registration number is required"),
  taxId: z.string().min(1, "Tax ID is required"),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }),
  description: z.string().optional(),
});


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
  const [errors, setErrors] = useState({}); // State to store validation errors

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
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false, 
      });
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data using Zod schema
    try {
      await sponsorSchema.parseAsync(formData);
      // Upload logo and collect URL
      const logoUrl = logo ? await handleImageUpload(logo) : null;

      // Prepare data for API request
      const sponsorData = {
        ...formData,
        logo: logoUrl,
      };

      // Send data to /api/sponsor
      const response = await axios.post('/api/sponsors', sponsorData);
      console.log('Server response:', response.data);
      navigate('/sponsoruploadsuccess');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((issue) => {
          validationErrors[issue.path[0]] = issue.message; // Collect error messages by field
        });
        setErrors(validationErrors);
      } else {
        console.error('Error sending data to /api/sponsor:', error.response ? error.response.data : error.message);
      }
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
                {errors.companyName && <span className="text-red-500">{errors.companyName}</span>}
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
                {errors.website && <span className="text-red-500">{errors.website}</span>}
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
                {errors.email && <span className="text-red-500">{errors.email}</span>}
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
                {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
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
                {errors.registrationNumber && <span className="text-red-500">{errors.registrationNumber}</span>}
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
                {errors.taxId && <span className="text-red-500">{errors.taxId}</span>}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                />
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="State"
                />
                <input
                  type="text"
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ZIP Code"
                />
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  placeholder="Enter a brief description"
                />
              </div>

              {/* Logo Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Logo Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:bg-gray-50 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
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
