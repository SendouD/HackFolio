import React, { useState } from "react";
import Header from "../components/Header";

const AdminDashboard = () => {
  // Hardcoded requests for demonstration
  const initialRequests = [
    {
      id: 1,
      name: "Hackathon 2023",
      description: "A hackathon focused on sustainability.",
    },
    {
      id: 2,
      name: "Code for Good",
      description: "A hackathon to develop solutions for social issues.",
    },
    {
      id: 3,
      name: "Tech Innovators",
      description: "An event for tech enthusiasts to showcase their skills.",
    },
  ];

  const [requests, setRequests] = useState(initialRequests);

  const handleResponse = (requestId, action) => {
    // Update the requests based on the action taken
    if (action === "accept") {
      alert(`Accepted: ${requestId}`);
    } else {
      alert(`Declined: ${requestId}`);
    }
    // Remove the request from the list after responding
    setRequests(requests.filter((req) => req.id !== requestId));
  };

  return (
    <>
    <Header/>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Hackathon Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{request.name}</td>
                  <td className="border border-gray-300 p-2">
                    {request.description}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleResponse(request.id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleResponse(request.id, "decline")}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
