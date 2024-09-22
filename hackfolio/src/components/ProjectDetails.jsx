import React from "react";

const ProjectDetails = ({ project, error }) => {
  // Function to check if the video link is valid and convert it to embed format
  const getEmbedUrl = (link) => {
    if (!link) return null;

    // Check for youtu.be link
    if (link.includes("youtu.be")) {
      return link.replace("youtu.be/", "www.youtube.com/embed/");
    }
    // Check for youtube.com/watch?v= link
    if (link.includes("watch?v=")) {
      return link.replace("watch?v=", "embed/");
    }
    return null;
  };

  const embedUrl = getEmbedUrl(project.videoDemo);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{project.projectName}</h1>
          <p className="text-gray-600 mt-2">{project.tagline}</p>
        </div>

        {/* Error Section */}
        {error && (
          <div className="mb-6 w-full max-w-4xl bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
            <h2 className="font-semibold">Error</h2>
            <p>{error.message || "An unexpected error occurred. Please try again later."}</p>
          </div>
        )}

        {/* Video Section */}
        <div className="mb-6">
          {embedUrl ? (
            <iframe
              width="600"
              height="400"
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              className="mb-4"
            ></iframe>
          ) : project.videoDemo ? (
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 shadow-lg p-4">
              <p className="text-lg font-semibold text-blue-700">The provided video link is invalid.</p>
              <span className="mt-2 text-blue-600">Please check the link and try again.</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 shadow-lg p-4">
              <p className="text-lg font-semibold text-blue-700">No video available</p>
              <span className="mt-2 text-blue-600">Please check back later.</span>
            </div>
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
