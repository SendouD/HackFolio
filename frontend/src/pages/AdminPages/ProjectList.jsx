import { useState, useEffect } from "react";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/projects/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomAvatar = () => `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;

  return (
    <div className="p-6 bg-gray-100 min-h-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Hackathon Projects</h2>
      
      {loading && <p className="text-center text-gray-600">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {(!loading && !error && projects.length === 0) && (
        <p className="text-center text-gray-500">No projects available</p>
      )}
      
      {!loading && !error && projects.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Project Name</th>
                <th className="p-3 text-left">Tagline</th>
                <th className="p-3 text-left">Problem Statement</th>
                <th className="p-3 text-left">Challenges</th>
                <th className="p-3 text-left">Technologies</th>
                <th className="p-3 text-left">Cover Image</th>
                <th className="p-3 text-left">Project Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">
                    <img src={project.logoUrl||getRandomAvatar()} alt="Logo" className="h-12 w-12 object-cover rounded-full border" />
                  </td>
                  <td className="p-3 font-medium text-gray-800">{project.projectName}</td>
                  <td className="p-3 text-gray-600">{project.tagline}</td>
                  <td className="p-3 text-gray-600 truncate max-w-xs">{project.problem}</td>
                  <td className="p-3 text-gray-600 truncate max-w-xs">{project.challenges}</td>
                  <td className="p-3 text-gray-600">
                    {Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "N/A"}
                  </td>
                  <td className="p-3">
                    <img src={project.coverUrl||getRandomAvatar()} alt="Cover" className="h-16 w-24 object-cover rounded-lg border" />
                  </td>
                  <td className="p-3">
                    <a
                      href={project.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      View Project
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;