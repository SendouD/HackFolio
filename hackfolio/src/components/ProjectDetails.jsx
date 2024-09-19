import React from "react";

const ProjectDetails = ({ project }) => {
 
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{project.projectName}</h1>
          <p className="text-gray-600 mt-2">{project.tagline}</p>
        </div>

        {/* Video Section */}
        <div className="mb-6">
          {project.videoDemo && (
           <iframe
           width="600"
           height="400"
           src="https://www.youtube.com/embed/GiZ31VPFrs0"
           frameBorder="0"
           allow="autoplay; encrypted-media"
           allowFullScreen
           title="video"
           className="mb-4"
         ></iframe>
         
          )}
        </div>

        {/* Problem Statement */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">The problem {project.projectName} solves</h2>
          <p className="text-gray-700">{project.problem}</p>
        </div>

        {/* Challenges */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Challenges Faced</h2>
          <p className="text-gray-700">{project.challenges}</p>
        </div>

        {/* Technologies Used */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
          <p className="text-gray-700">{project.technologies}</p>
        </div>

        {/* Links Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Useful Links</h2>
          <a href={project.links} className="text-blue-500 underline">
            {project.links}
          </a>
        </div>

        {/* Cover Image */}
        {project.coverUrl && (
          <div className="mb-6">
            <img src={project.coverUrl} alt="cover" className="rounded-lg shadow-lg" />
          </div>
        )}

        {/* Logo Image */}
        {project.logoUrl && (
          <div className="mb-6">
            <img src={project.logoUrl} alt="logo" className="h-24 w-24 rounded-lg shadow-lg" />
          </div>
        )}

        {/* Gallery */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {project.imageUrls &&
            project.imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`image-${index}`}
                className="rounded-lg shadow-lg"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
