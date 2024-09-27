import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../loading";
import { useNavigate } from 'react-router-dom';
import { z } from "zod";

// Define Zod schema for form validation
const projectFormSchema = z.object({
  projectName: z.string().min(1, "Project name is required").max(50, "Project name must be under 50 characters"),
  tagline: z.string().min(1, "Tagline is required").max(200, "Tagline must be under 200 characters"),
  problem: z.string().min(1, "Problem description is required").max(2000, "Problem description must be under 2000 characters"),
  challenges: z.string().min(1, "Challenges description is required").max(2000, "Challenges description must be under 2000 characters"),
  technologies: z.string().min(1, "Technologies used is required").max(100, "Technologies list must be under 100 characters"),
  links: z.string().url("Please enter a valid URL").optional(),
  videoDemo: z.string().url("Please enter a valid URL").optional(),
  logo: z.any().optional(),
  coverimage: z.any().optional(),
  images: z.any().optional()
});

function ProjectForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    problem: "",
    challenges: "",
    technologies: "",
    links: "",
    videoDemo: "",
  });
  
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [coverimage, setCoverimage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Store validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleMultipleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleImageUpload = async (file) => {
    const uploadPreset = 'projectform'; // Replace with your Cloudinary upload preset
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

    // Validate form data with Zod
    const validationResult = projectFormSchema.safeParse({...formData, logo, coverimage, images});
    if (!validationResult.success) {
      setErrors(validationResult.error.format()); // Set validation errors
      setIsLoading(false);
      return;
    }

    // Upload logo and collect URL
    const logoUrl = logo ? await handleImageUpload(logo) : null;
    const imageUrls = await Promise.all(Array.from(images).map(handleImageUpload));
    const coverUrl = coverimage ? await handleImageUpload(coverimage) : null;

    // Prepare data for API request
    const projectData = {
      ...formData,
      coverUrl,
      logoUrl,
      imageUrls,
    };

    try {
      // Send data to /api/project
      const response = await axios.post('/api/project/submitproject', projectData);
      console.log('Server response:', response.data);
      navigate('/uploadsuccess');
      
    } catch (error) {
      console.error('Error sending data to /api/project:', error.response ? error.response.data : error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
    {isLoading ? (<LoadingPage />) : (
      <div className="bg-gray-100 p-6">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Give more details about your project
        </div>
        <br />
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Project Submission Form</h1>
          <form onSubmit={handleSubmit}>
            {/* Project Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.projectName ? "border-red-500" : "focus:ring-blue-500"}`}
                placeholder="What are you calling it?"
                maxLength="50"
              />
              {errors.projectName && <p className="text-red-500">{errors.projectName._errors[0]}</p>}
            </div>

            {/* Tagline */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.tagline ? "border-red-500" : "focus:ring-blue-500"}`}
                placeholder="Brief description or slogan"
                maxLength="200"
              />
              {errors.tagline && <p className="text-red-500">{errors.tagline._errors[0]}</p>}
            </div>

            {/* Problem */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">The Problem it Solves</label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.problem ? "border-red-500" : "focus:ring-blue-500"}`}
                rows="4"
                placeholder="Describe the problem your project addresses"
                maxLength="2000"
              ></textarea>
              {errors.problem && <p className="text-red-500">{errors.problem._errors[0]}</p>}
            </div>

            {/* Challenges */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Challenges I Ran Into</label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.challenges ? "border-red-500" : "focus:ring-blue-500"}`}
                rows="4"
                placeholder="Describe any specific bug or hurdle and how you overcame it"
                maxLength="2000"
              ></textarea>
              {errors.challenges && <p className="text-red-500">{errors.challenges._errors[0]}</p>}
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Technologies I Used</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.technologies ? "border-red-500" : "focus:ring-blue-500"}`}
                placeholder="Comma-separated list of technologies"
                maxLength="100"
              />
              {errors.technologies && <p className="text-red-500">{errors.technologies._errors[0]}</p>}
            </div>

            {/* Links */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Links</label>
              <input
                type="text"
                name="links"
                value={formData.links}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any relevant project links (e.g., GitHub, live demo)"
              />
              {errors.links && <p className="text-red-500">{errors.links._errors[0]}</p>}
            </div>

            {/* Video Demo */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Video Demo</label>
              <input
                type="text"
                name="videoDemo"
                value={formData.videoDemo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add link to video demo"
              />
              {errors.videoDemo && <p className="text-red-500">{errors.videoDemo._errors[0]}</p>}
            </div>

            {/* Logo Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Logo</label>
              <input
                type="file"
                name="logo"
                onChange={(e) => handleFileChange(e, setLogo)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cover Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
              <input
                type="file"
                name="coverimage"
                onChange={(e) => handleFileChange(e, setCoverimage)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Multiple Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Project Images</label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleMultipleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
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

export default ProjectForm;
