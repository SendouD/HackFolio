import { useState } from "react";
import ChatPage from "../ChatPages/ChatPage";
import Header from "../../components/Header";
import EditSponsorsDetails from "../../components/SponsorComponents/EditSponsorsDetails";
import ReactingNavBar from "../../components/ReactingNavBar";

const token = localStorage.getItem("data");

function SponsorsDashboard() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex bg-dark-blue min-h-screen">
        {/* Side Navigation */}
        <ReactingNavBar />

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6 text-white">
          <Header />

          <div className="flex flex-col items-center mt-4">
            {/* Card for Editing Options */}
            <div className="w-full max-w-4xl p-6 bg-purple-800 rounded-lg shadow-lg">
              <div className="flex justify-around">
                <button
                  onClick={() => setSelected(0)}
                  className={`px-6 py-2 text-xl font-semibold rounded-md transition ${
                    selected === 0 ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setSelected(1)}
                  className={`px-6 py-2 text-xl font-semibold rounded-md transition ${
                    selected === 1 ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  Chatbox
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-4xl mt-8 bg-dark-blue rounded-lg shadow-lg p-6">
              {selected === 0 && (
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-4"></h2>
                  <EditSponsorsDetails />
                </div>
              )}
              {selected === 1 && (
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-4">Chat with Sponsors</h2>
                  <ChatPage flag="true" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SponsorsDashboard;
