import React from 'react';
import Header from '../components/header';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Navbar */}
      <Header/>
     
     
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-3/4">
        <div className="flex justify-between items-center">
          {/* Left Column: Profile Info */}
          <div>
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="rounded-full w-24 h-24 mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">Jananathan M</h1>
            <p className="text-gray-600 mb-4">Aspiring developer in solidity and interested in NFT mining.</p>

            {/* Projects */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Projects</h2>
              <div className="mb-4">
                <h3 className="text-blue-600 text-xl font-semibold">Connectit</h3>
                <p className="text-gray-600">
                  Online Blockchain based certificate generation and validation system for government organization
                </p>
                <p className="text-gray-500">Solidity, IPFS, MetaMask, JavaScript, ethers.js, ERC721, React.js, Soulbound NFT</p>
              </div>
              <div>
                <h3 className="text-blue-600 text-xl font-semibold">SAVE X ROSS</h3>
                <p className="text-gray-600">
                  Making both pedestrians and the driver come forward to rescue animals without negligence
                </p>
                <p className="text-gray-500">Solidity, React, OpenZeppelin, MetaMask, ethers.js, Remix (IDE), Hardhat</p>
              </div>
            </div>
          </div>

          {/* Right Column: Skills & Social Links */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-3 mb-4">
              {/* Add your social media icons here */}
              <a href="#" className="bg-gray-200 rounded-full p-3 hover:bg-gray-300">
                {/* Icon for GitHub */}
                <i className="fab fa-github text-gray-600"></i>
              </a>
              <a href="#" className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700">
                {/* Icon for LinkedIn */}
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600">
                {/* Icon for Twitter */}
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-gray-300 rounded-full p-3 hover:bg-gray-400">
                {/* Icon for Website */}
                <i className="fas fa-globe"></i>
              </a>
            </div>

            <div className="w-full">
              <h2 className="font-semibold text-lg mb-2">Skills</h2>
              <ul className="text-gray-600">
                <li>Solidity</li>
                <li>JavaScript</li>
                <li>Node.js</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
