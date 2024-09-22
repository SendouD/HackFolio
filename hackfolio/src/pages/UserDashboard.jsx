import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserDashBoardProject from "../components/UserDashboardProject";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const {username}=useParams()

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUserdetails] = useState("");



  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectResponse = await axios.get(`/api/project/userprojects/${username}`);
        setProjects(projectResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects("No projects found"); // Set message directly
        } else {
          console.error("Error fetching project:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }

      try {
        const userResponse = await axios.get(`/api/user/${username}`);
        setUserdetails(userResponse.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (username) {
      fetchProject();
    }
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-3/4">
          <div className="flex justify-between items-center">
            <div>
              <img
                src="https://via.placeholder.com/100"
                alt="User Avatar"
                className="rounded-full w-24 h-24 mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">{user.firstName}</h1>
              <p className="text-gray-600 mb-4">{user.bio}</p>

              <div>
                <h2 className="font-semibold text-lg mb-2">Projects</h2>
                {Array.isArray(projects) && projects.length > 0 ? (
                  projects.map((project) => (
                    <UserDashBoardProject key={project.id} project={project} />
                  ))
                ) : (
                  <p>{projects}</p> // Display the message directly
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex space-x-3 mb-4">
                {/* Social Media Links */}
                <a href="#" className="bg-gray-200 rounded-full p-3 hover:bg-gray-300">
                  <i className="fab fa-github text-gray-600"></i>
                </a>
                <a href="#" className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-gray-300 rounded-full p-3 hover:bg-gray-400">
                  <i className="fas fa-globe"></i>
                </a>
              </div>

              <div className="w-full">
                <h2 className="font-semibold text-lg mb-2">Skills</h2>
                <ul className="text-gray-600">
                  {user.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))
                  ) : (
                    <li>No skills available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;



