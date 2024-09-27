import React from "react";

const ProjectCards = ({ project }) => {
  console.log(project)
  
  return (

    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{project.projectName}</h3>
          <p className="text-gray-500 mt-1">{project.tagline}</p>
        </div>
        <span className="bg-gray-200 text-sm px-2 py-1 rounded">{project.teamName}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-gray-500">
          <p>Views: {project.views}</p>
          <p>Likes: {project.likes}</p>
        </div>
     
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Last updated: {project.createdAt}
      </div>
      <div className="mt-2 flex space-x-4">
        <a href="#" className="text-blue-600 hover:underline">
          Copy Devfolio Link
        </a>
        <a href="#" className="text-blue-600 hover:underline">
          Share it on LinkedIn
        </a>
        <a href="#" className="text-blue-600 hover:underline">
          Tweet
        </a>
      </div>
    </div>
  );
};

export default ProjectCards;
