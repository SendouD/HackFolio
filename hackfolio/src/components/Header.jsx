import React, { useEffect, useState } from "react";
import MenuItem from "./MenuDropdowns";
import axios from "axios";
import DefaultUserIcon from "/DefaultUserIcon.jpeg";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    const response = await axios.get('/api/userlogin/logout');
    localStorage.removeItem("data");
    setUsername("");
    navigate("/")
  };


  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUsername(parsedData?.username);
    }
  }, []);
  const UserDashboard=()=>{
    navigate(`/@/${username}`);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold" onClick={()=>{
          navigate("/")
        }}>Hackfolio</div>
        <div className="space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Profile</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Hackathons</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Badges</a>
          <a href="#" className="text-blue-600 hover:text-blue-800">Projects</a>
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
                className="rounded-full mr-2 w-10 h-10 object-cover" // Updated the size here
              />
              {username}
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <div onClick={UserDashboard}>
                  <MenuItem text="My Devfolio"/>

                  </div>
                  <MenuItem text="Edit Profile" href="#" />
                  <MenuItem text="My Hackathons" href="#" />
                  <div  onClick={()=>{
                    navigate("/userProjects")
                  }}><MenuItem text="My Projects" /></div>
                  
                  <MenuItem text="My Badges" href="#" />
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
          <a href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
 