import React,{useState,useEffect} from 'react';
import Header from '../components/header';
import ProjectCard from '../components/project_disp_card';
import axios from 'axios';
function UserProjects() {
  const [projects, setProjects] = useState([]); 
  // State to store project data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get("/api/projectfinder/userproject");
        console.log(response);
        console.log(response.data);
        setProjects(response.data);
        console.log("pro"+projects); // Store the response data in state
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
    <div className="min-h-screen bg-gray-100">
        <Header />

      <main className="max-w-7xl mx-auto p-6">
        <section className="text-center my-8">
          <h1 className="text-3xl font-bold">Share what you built</h1>
          <p className="text-gray-500 mt-2">Give your weekend projects, side projects, serious ventures a place to breathe, invite collaborators and inspire others.</p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500">
              ADD A NEW SIDE PROJECT
            </button>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold">Public Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserProjects;
