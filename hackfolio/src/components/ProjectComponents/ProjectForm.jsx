import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../loading";
import { useNavigate } from "react-router-dom";
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
  images: z.any().optional(),
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
    const uploadPreset = "projectform"; // Replace with your Cloudinary upload preset
    const cloudName = "dv1a0uvfm"; // Replace with your Cloudinary cloud name
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data with Zod
    const validationResult = projectFormSchema.safeParse({
      ...formData,
      logo,
      coverimage,
      images,
    });
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
      const response = await axios.post("/api/project/submitproject", projectData);
      console.log("Server response:", response.data);
      navigate("/uploadsuccess");
    } catch (error) {
      console.error("Error sending data to /api/project:", error.response ? error.response.data : error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="bg-[#0f172a] text-white min-h-screen p-8 flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold uppercase tracking-wide">
              Submit Your <span className="text-[#5f3abd]">Project</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Share your innovation and let the world see your incredible work.
            </p>
          </div>
          <div className="w-full max-w-4xl bg-[#1e293b] p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* Input Fields */}
              {[
                { name: "projectName", label: "Project Name", type: "text", placeholder: "Name your project", maxLength: 50 },
                { name: "tagline", label: "Tagline", type: "text", placeholder: "Brief description or slogan", maxLength: 200 },
                { name: "problem", label: "The Problem It Solves", type: "textarea", placeholder: "What issue does it address?", maxLength: 2000 },
                { name: "challenges", label: "Challenges I Ran Into", type: "textarea", placeholder: "Any obstacles?", maxLength: 2000 },
                { name: "technologies", label: "Technologies Used", type: "text", placeholder: "e.g., React, Node.js", maxLength: 100 },
                { name: "links", label: "Relevant Links", type: "text", placeholder: "e.g., GitHub or live demo link" },
                { name: "videoDemo", label: "Video Demo", type: "text", placeholder: "e.g., YouTube demo link" },
              ].map((field, index) => (
                <div key={index} className="mb-6">
                  <label className="block text-sm font-bold mb-2">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#3f40bb] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#3f40bb] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]._errors[0]}</p>
                  )}
                </div>
              ))}

              {/* File Inputs */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Project Logo</label>
                <input
                  type="file"
                  name="logo"
                  onChange={(e) => handleFileChange(e, setLogo)}
                  className="w-full px-4 py-2 bg-[#3f40bb] text-white rounded-lg focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Cover Image</label>
                <input
                  type="file"
                  name="coverimage"
                  onChange={(e) => handleFileChange(e, setCoverimage)}
                  className="w-full px-4 py-2 bg-[#3f40bb] text-white rounded-lg focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Project Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleMultipleFileChange}
                  className="w-full px-4 py-2 bg-[#3f40bb] text-white rounded-lg focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#5f3abd] text-white rounded-lg font-bold uppercase tracking-wide hover:bg-[#3f40bb] transition duration-200"
              >
                Submit Project
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectForm;
