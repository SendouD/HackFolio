import React, { useEffect, useState } from "react";
import ProjectDetails from "../components/project_details";
import axios from "axios";

const Project_display = () => {
  const [project, setProject] = useState(null); // State to store project data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("/api/projectfinder/userproject");
        setProject(response.data); // Store the response data in state
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message); // Store error message
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProject();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {project ? (
        <ProjectDetails project={project[0]} />
      ) : (
        <div>No project details available</div>
      )}
    </div>
  );
};

export default Project_display;
