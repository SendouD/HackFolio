import React from "react";


const HackathonDashboard = () => {
  // Hardcoded data for the teams
  const TeamCard = ({ team }) => {
    return (
        <div className="team-card bg-white shadow-md rounded-lg p-6 my-6">
        <h2 className="text-2xl font-bold mb-4">{team.teamName}</h2>
        <p className="text-gray-700 text-lg mb-4"><strong>Members:</strong> {team.members.join(", ")}</p>
        <p className="text-gray-700 text-lg mb-6"><strong>Description:</strong> {team.description}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
          Approve
        </button>
      </div>
    );
  };
  
  const teams = [
    {
      teamName: "Code Warriors",
      projectTitle: "Decentralized Voting System",
      members: ["Alice", "Bob", "Charlie"],
      description: "Building a secure voting system using blockchain technology.",
    },
    {
      teamName: "Tech Titans",
      projectTitle: "AI-Powered Healthcare Assistant",
      members: ["Dave", "Eve", "Frank"],
      description: "Developing a healthcare assistant using machine learning algorithms.",
    },
    {
      teamName: "Innovators United",
      projectTitle: "Smart Energy Grid",
      members: ["Grace", "Heidi", "Isaac"],
      description: "Creating a smart energy grid to optimize power consumption using IoT.",
    },
  ];

  return (
    <div className="hackathon-dashboard-container bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Teams Applied</h1>
      <div className="teams-list">
        {teams.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
};

export default HackathonDashboard;
