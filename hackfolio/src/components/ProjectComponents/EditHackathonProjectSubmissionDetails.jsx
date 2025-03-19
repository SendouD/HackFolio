import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header";
import ReactingNavBar from "../ReactingNavBar";

const EditHackathonProjectSubmissionDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchUserProject = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`);
        setProject(response.data);
        setEditedProject(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserProject();
  }, [projectId]);

  const validateForm = () => {
    let errors = {};
    
    const textValidationRegex = /^[A-Za-z][A-Za-z0-9\s]*$/;
    const urlValidationRegex = /^https?:\/\/[\w.-]+\.[a-z]{2,6}([\/\w .-]*)*\/?$/;

    if (!editedProject.projectName || !textValidationRegex.test(editedProject.projectName)) {
      errors.projectName = "Project name must start with a letter and should not start with numbers or special characters.";
    }
    if (!editedProject.tagline || !textValidationRegex.test(editedProject.tagline)) {
      errors.tagline = "Tagline must start with a letter and should not start with numbers or special characters.";
    }
    if (!editedProject.problem || !textValidationRegex.test(editedProject.problem)) {
      errors.problem = "Problem description must start with a letter and should not start with numbers or special characters.";
    }
    if (!editedProject.links || !urlValidationRegex.test(editedProject.links)) {
      errors.links = "Enter a valid GitHub URL.";
    }
    if (!editedProject.videoDemo || !urlValidationRegex.test(editedProject.videoDemo)) {
      errors.videoDemo = "Enter a valid Demo URL.";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedProject({ ...project });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name]: name === "technologies" ? value.split(", ") : value,
    }));
  };

  const handleSave = async (e) => {
    
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/project/${projectId}`, editedProject);
      setProject(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating project:", err);
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <ReactingNavBar />
      <div className="space-y-3 w-full">
        <Header />
        <div className="p-4">
          <button onClick={handleEditToggle} className="mb-4 px-4 py-2 bg-[#5f3abd] text-white rounded hover:bg-blue-600 transition-colors">
            {isEditing ? "Cancel Edit" : "Edit Project"}
          </button>
          {isEditing ? (
            <form onSubmit={handleSave} className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-6">
                <label>Project Name</label>
                <input type="text" name="projectName" value={editedProject.projectName} onChange={handleInputChange} className="form-input p-3 text-lg w-full border border-gray-300 rounded-lg" />
                {validationErrors.projectName && <p className="text-red-500">{validationErrors.projectName}</p>}
              </div>
              <div className="mb-6">
                <label>Tagline</label>
                <textarea name="tagline" value={editedProject.tagline} onChange={handleInputChange} className="form-input p-3 text-lg w-full border border-gray-300 rounded-lg"></textarea>
                {validationErrors.tagline && <p className="text-red-500">{validationErrors.tagline}</p>}
              </div>
              <div className="mb-6">
                <label>Problem It Solves</label>
                <textarea name="problem" value={editedProject.problem} onChange={handleInputChange} className="form-input p-3 text-lg w-full border border-gray-300 rounded-lg"></textarea>
                {validationErrors.problem && <p className="text-red-500">{validationErrors.problem}</p>}
              </div>
              <div className="mb-6">
                <label>GitHub URL</label>
                <input type="url" name="links" value={editedProject.links} onChange={handleInputChange} className="form-input p-3 text-lg w-full border border-gray-300 rounded-lg" />
                {validationErrors.links && <p className="text-red-500">{validationErrors.links}</p>}
              </div>
              <div className="mb-6">
                <label>Demo URL</label>
                <input type="url" name="videoDemo" value={editedProject.videoDemo} onChange={handleInputChange} className="form-input p-3 text-lg w-full border border-gray-300 rounded-lg" />
                {validationErrors.videoDemo && <p className="text-red-500">{validationErrors.videoDemo}</p>}
              </div>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{project.projectName}</h2>
              <p><strong>Tagline:</strong> {project.tagline}</p>
              <p><strong>Problem It Solves:</strong> {project.problem}</p>
              <p><strong>GitHub URL:</strong> <a href={project.links} className="text-[#5f3abd] hover:underline">{project.links}</a></p>
              <p><strong>Demo URL:</strong> <a href={project.videoDemo} className="text-[#5f3abd] hover:underline">{project.videoDemo}</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHackathonProjectSubmissionDetails;