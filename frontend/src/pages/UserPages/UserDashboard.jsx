"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import UserDashBoardProject from "../../components/ProjectComponents/UserDashboardProject";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactingNavBar from "../../components/ReactingNavBar";
import "../../styles/userboard.css";
import { motion } from "framer-motion";
import LoadingPage from "../../components/loading";

const UserDashboard = () => {
  const { username } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUserdetails] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectResponse = await axios.get(
          `${__BACKEND_URL__}/api/project/userprojects/${username}`
        );
        setProjects(projectResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setProjects([]); // Set empty array instead of error
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }

      try {
        const userResponse = await axios.get(
          `${__BACKEND_URL__}/api/user/${username}`
        );
        setUserdetails(userResponse.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (username) {
      fetchProject();
    }
  }, [username]);

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <ReactingNavBar />

        <div className="size-full">
          <Header />
          <div className="min-h-[95vh] flex flex-col items-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-100 to-purple-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.div
              className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8 mt-8 w-3/4 z-10 relative border border-slate-200"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.img
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`}
                      alt="User Avatar"
                      className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h1 className="text-3xl font-bold text-slate-800">{user.firstName}</h1>
                      <p className="text-slate-600 text-sm">{user.bio || "No bio available"}</p>
                    </div>
                  </div>

                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                      {user.education?.institution || "Institution not available"},
                      {user.education?.degreeType || "Degree not specified"}
                    </h1>
                    <p className="text-slate-600 text-sm mb-1">
                      {user.githubProfile ? (
                        <a href={user.githubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          GitHub Profile
                        </a>
                      ) : (
                        "Github link not available"
                      )}
                    </p>
                    <p className="text-slate-600 text-sm mb-1">
                      {user.linkedinProfile ? (
                        <a href={user.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          LinkedIn Profile
                        </a>
                      ) : (
                        "LinkedIn not available"
                      )}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="w-full md:w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg shadow-sm border border-slate-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full mb-3">
                    <h2 className="font-semibold text-lg text-slate-800 mb-4 border-b border-slate-400 pb-2">
                      Skills
                    </h2>
                    {user.skills && user.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            className="bg-white px-3 py-1 rounded-full text-sm font-medium text-slate-700 shadow-sm border border-slate-200"
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-center">No skills available</p>
                    )}
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-slate-100 mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-slate-800 font-medium">Total Projects</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-800 mt-2">
                      {projects.length}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-6 w-3/4 mt-8 z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-100"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="font-semibold text-lg text-slate-800 mb-4 border-b border-slate-200 pb-2">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <UserDashBoardProject key={project.id} project={project} />
                    ))
                  ) : (
                    <div className="bg-slate-50 rounded-lg p-4 text-slate-500 text-center">
                      No projects yet
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
