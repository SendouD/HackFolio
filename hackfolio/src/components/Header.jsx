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
  const [searchUsers, setSearchUsers] = useState([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const logout = async () => {
    const response = await axios.get("/api/userlogin/logout");

    localStorage.removeItem("data");
    setUsername("");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/jwtverify");

        setRoles(response.data.roles);
        
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

  useEffect(() => {
    console.log(searchUsers);
  }, [searchUsers]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function searchUser(e) {
    const query = e.target.value;
    try {
      const response = await fetch(`/api/user/getUsers/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) navigate("/Error403");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchUsers(data.users);
      setIsSearchDropdownOpen(data.users.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="space-x-8">
          <a href="/hackathons" className="text-gray-600 hover:text-gray-900">
            Hackathons
          </a>
          <a href="/sponsors" className="text-gray-600 hover:text-gray-900">
            Sponsors
          </a>
          <a href="/userProjects" className="text-gray-600 hover:text-gray-900">
            Projects
          </a>
        </div>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => searchUser(e)}
            onFocus={() => setIsSearchDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchDropdownOpen(false), 200)}
            placeholder="Search users..."
            className="px-3 py-2 border rounded-md"
          />
          {isSearchDropdownOpen && searchUsers.length > 0 && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {searchUsers.map((user) => (
                  <li
                    key={user._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/@/${user.username}`)}
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
              <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <MenuItem text="My Portfolio" href={`/@/${username}`} />
                  {roles.includes("Admin") && (
                    <MenuItem text="Admin Dashboard" href="/adminDashboard" />
                  )}
                  <MenuItem text="Edit Profile" href={`/editprofile/${username}`} />
                  <MenuItem text="Create Hackathon" href="/createHackathon" />
                  <MenuItem text="Organized Hackathons" href="/organizedHackathons" />
                  <MenuItem text="Registered Hackathons" href="/registeredHackathons" />
                  <MenuItem text="My Projects" href="/userProjects" />
                  {roles.includes("Sponsor") ? (
                    <MenuItem
                      text="Sponsor Dashboard"
                      href="/sponsorDashboard"
                    />
                  ) : (
                    <MenuItem text="Become a sponsor" href="/sponsorForm" />
                  )}
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

