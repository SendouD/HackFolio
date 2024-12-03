import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import UserDashBoardProject from "../../components/ProjectComponents/UserDashboardProject";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Import Link for navigation
import ReactingNavBar from "../../components/ReactingNavBar";
import "../../styles/userDahboard.css"; // Import custom CSS for background animation

const UserDashboard = () => {
  const { username } = useParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUserdetails] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

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

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <>
      <div className="flex">
        <ReactingNavBar />

        <div className="space-y-3 size-full">
          <Header />
          <div className="min-h-screen bg-dark-blue flex flex-col items-center relative overflow-hidden">
            <div className="animated-shapes">
              {/* Additional animated shapes in the background */}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-3/4 z-10 relative card-shapes">
              <div className="flex justify-between items-center relative">
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

                <div className="flex flex-col items-center relative">
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

                  {/* Button to Edit Profile */}
                  <Link
                    to={`/editprofile/${username}`} // Assuming edit profile path includes username
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit Profile
                  </Link>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
