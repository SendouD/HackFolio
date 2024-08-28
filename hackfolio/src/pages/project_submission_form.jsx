import React from "react";
import axios from "axios";

function ProjectSubmissionForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    try {
      const result = await axios.post("/api/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Give more details about your project
      </div>
      <br />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Project Submission Form</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Project Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              name="projectName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What are you calling it?"
              maxLength="50"
            />
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description or slogan"
              maxLength="200"
            />
          </div>

          {/* The Problem it Solves */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">The Problem it Solves</label>
            <textarea
              name="problem"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe the problem your project addresses"
              maxLength="2000"
            ></textarea>
          </div>

          {/* Challenges I Ran Into */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Challenges I Ran Into</label>
            <textarea
              name="challenges"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe any specific bug or hurdle and how you overcame it"
              maxLength="2000"
            ></textarea>
          </div>

          {/* Technologies I Used */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Technologies I Used</label>
            <input
              type="text"
              name="technologies"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comma-separated list of technologies"
              maxLength="100"
            />
          </div>

          {/* Links */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Links</label>
            <input
              type="text"
              name="links"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add links (e.g., GitHub, website)"
              maxLength="1000"
            />
          </div>

          {/* Video Demo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Video Demo</label>
            <input
              type="text"
              name="videoDemo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a link to a video demo"
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Logo */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Logo</label>
            <input
              type="file"
              name="logo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pictures */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Pictures</label>
            <input
              type="file"
              name="pictures"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Platforms */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Platforms</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="platforms"
                value="Web"
                className="mr-2 text-blue-500"
              />
              <label className="text-gray-700">Web</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="platforms"
                value="Mobile"
                className="mr-2 text-blue-500"
              />
              <label className="text-gray-700">Mobile</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="platforms"
                value="Desktop"
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
