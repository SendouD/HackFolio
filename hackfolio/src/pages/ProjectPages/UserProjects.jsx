import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ProjectCard from '../../components/ProjectComponents/UserProjectCard';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

function UserProjects() {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("/api/project/userprojects");
        setProjects(response.data);
        setLoading(false);
      }catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects("No projects found"); // Set message directly
        } else {
          console.error("Error fetching project:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <section className="text-center my-8">
          <h1 className="text-3xl font-bold">Share what you built</h1>
          <p className="text-gray-500 mt-2">Give your weekend projects, side projects, serious ventures a place to breathe, invite collaborators and inspire others.</p>
          <div className="mt-6">
            <span className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500" onClick={()=>{navigate('/projectForm')}}> 
              ADD A NEW SIDE PROJECT
            </span>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold">Public Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {Array.isArray(projects) && projects.length > 0 ? (
                  projects.map((project) => (
                    <Link key={project.id} to={`/ProjectDisplay/${project._id}`}>
                    <ProjectCard project={project} />
                  </Link>
                  ))
                ) : (
                  <p>{projects}</p> // Display the message directly
                )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserProjects;
