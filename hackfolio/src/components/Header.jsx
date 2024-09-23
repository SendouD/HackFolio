import React, { useEffect, useState } from "react";
import MenuItem from "./MenuDropdowns";
import axios from "axios";
import DefaultUserIcon from "/DefaultUserIcon.jpeg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  const logout = async () => {
    const response = await axios.get("/api/userlogin/logout");
    console.log(response);
    localStorage.removeItem("data");
    setUsername("");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/jwtverify");

        setRoles(response.data.roles);
        console.log(response.data.roles)

        const storedData = localStorage.getItem("data");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUsername(parsedData?.username);
        }
      } catch (error) {
        console.error("Error fetching JWT verification data:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div
          className="text-3xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Hackfolio
        </div>
        <div className="space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Profile
          </a>
          <a href="/hackathons" className="text-gray-600 hover:text-gray-900">
            Hackathons
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Badges
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Projects
          </a>
        </div>
        {username ? (
          <div className="relative">
            <div
              onClick={toggleMenu}
              className="text-gray-600 cursor-pointer flex items-center"
            >
              <img
                src={DefaultUserIcon}
                alt="User avatar"
                className="rounded-full mr-2 w-10 h-10 object-cover"
              />
              {username}
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <MenuItem text="My Devfolio" href={`/@/${username}`} />
                  {roles.includes("Admin") && (
                    <MenuItem text="Admin Dashboard" href="/adminDashboard" />
                  )}
                  <MenuItem text="Edit Profile" href="#" />
                  <MenuItem text="Create Hackathon" href="/createHackathon" />
                  <MenuItem text="My Hackathons" href="/organizedHackathons" />
                  <MenuItem text="My Projects" href="/userProjects" />
                  {roles.includes("Sponsor") ? (
                    <MenuItem
                      text="Sponsor Dashboard"
                      href="/sponsorDashboard"
                    />
                  ) : (
                    <MenuItem text="Become a sponsor" href="/sponsorForm" />
                  )}

                  <MenuItem text="My Claims" href="#" />
                  <MenuItem text="Organizer Dashboard" href="#" />
                  <MenuItem text="Account Settings" href="#" />
                  <div onClick={logout}>
                    <MenuItem text="Log Out" />
                  </div>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <a
            href="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
