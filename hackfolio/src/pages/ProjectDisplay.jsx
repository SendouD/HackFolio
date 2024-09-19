import React, { useEffect, useState } from "react";
import ProjectDetails from "../components/ProjectDetails";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams to extract route params
import Header from "../components/header";

const Project_display = () => {
  const { projectId } = useParams(); // Extract projectId from the URL
  const [project, setProject] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProject = async () => {
      try {
        const response = await axios.get(`/api/projectfinder/${projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserProject();
  }, [projectId]); // Fetch project data when projectId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    <Header/>
      {project ? (
        <ProjectDetails project={project} />
      ) : (
        <div>No project details available</div>
      )}
    </div>
  );
};

export default Project_display;
