import React from 'react';
import HackathonProjectCard from '../../components/HackathonComponents/HackathonProjectCard';

// Mock project data
const projects = [
  {
    title: "MyriadFlow's Phygital Future",
    by: "MyriadFlow",
    description: "Simplifying Web3 Transition for Brands, Creators, and Users",
    builtAt: "Build the New Internet",
    awards: ["Safe and Magic: First Place"],
    Likes: 3,
  },
  {
    title: "Notpump",
    by: "Vincent",
    description: "Empowers communities to grow new ERC-404 or DN-404 standard",
    builtAt: "Build the New Internet",
    awards: ["2 other prizes"],
    Likes: 6,
  },
  // Add more projects as needed
];

//

// ProjectList component
const ProjectList = ({ projects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      <HackathonProjectCard key={index} project={project} />
    ))}
  </div>
);

// Main App component
const HackathonProjectDispay = () => (
  <div className="container mx-auto px-4">
    <header className="my-8">
      <h1 className="text-3xl font-bold text-center">Projects</h1>
    </header>
    <ProjectList projects={projects} />
  </div>
);

export default HackathonProjectDispay;
