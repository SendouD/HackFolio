import React, { useState } from "react";

function ProjectSubmissionForm() {
  const [projectName, setProjectName] = useState("");
  const [tagline, setTagline] = useState("");
  const [problem, setProblem] = useState("");
  const [challenges, setChallenges] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [links, setLinks] = useState("");
  const [videoDemo, setVideoDemo] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [logo, setLogo] = useState(null);
  const [platforms, setPlatforms] = useState([]);

  const handlePlatformChange = (platform) => {
    setPlatforms((prevPlatforms) =>
      prevPlatforms.includes(platform)
        ? prevPlatforms.filter((p) => p !== platform)
        : [...prevPlatforms, platform]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      projectName,
      tagline,
      problem,
      challenges,
      technologies,
      links,
      videoDemo,
      coverImage,
      pictures,
      logo,
      platforms,
    });
  };

  return (
    <div className="bg-gray-100 p-6">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Give more details about "janan"</div><br />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Project Submission Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What are you calling it?"
              maxLength="50"
            />
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description or slogan"
              maxLength="200"
            />
          </div>

          {/* The problem it solves */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              The Problem it Solves
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe the problem your project addresses"
              maxLength="2000"
            ></textarea>
          </div>

          {/* Challenges I ran into */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Challenges I Ran Into
            </label>
            <textarea
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe any specific bug or hurdle and how you overcame it"
              maxLength="2000"
            ></textarea>
          </div>

          {/* Technologies I used */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Technologies I Used
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comma-separated list of technologies"
              maxLength="100"
            />
          </div>

          {/* Links */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Links
            </label>
            <input
              type="text"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add links (e.g., GitHub, website)"
              maxLength="1000"
            />
          </div>

          {/* Video Demo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Video Demo
            </label>
            <input
              type="text"
              value={videoDemo}
              onChange={(e) => setVideoDemo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a link to a video demo"
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Cover Image
            </label>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pictures */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Pictures
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setPictures(Array.from(e.target.files))}
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Logo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Logo
            </label>
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Platforms */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Platforms
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={platforms.includes("Web")}
                onChange={() => handlePlatformChange("Web")}
                className="mr-2 text-blue-500"
              />
              <label className="text-gray-700">Web</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={platforms.includes("Mobile")}
                onChange={() => handlePlatformChange("Mobile")}
                className="mr-2 text-blue-500"
              />
              <label className="text-gray-700">Mobile</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={platforms.includes("Desktop")}
                onChange={() => handlePlatformChange("Desktop")}
                className="mr-2 text-blue-500"
              />
              <label className="text-gray-700">Desktop</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectSubmissionForm;
