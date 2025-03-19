import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import HackathonDetailsForm from "../../components/HackathonComponents/HackathonDetailsForm";
import HackathonWebpageContentForm from "../../components/HackathonComponents/HackathonWebpageContentForm";
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import LoadingPage from "../../components/loading";

function FillFullHackathonDetails() {
  const [completed, setCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  
  useEffect(() => {
    getCompletionStatus();
  }, []);
  
  async function getCompletionStatus() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate/${name}/1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setCompleted(data.step);
    } catch (error) {
      console.error('Error fetching completion status:', error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ReactingNavBar />
      <div className="flex-1">
        <Header />
        
        {isLoading ? (
          <LoadingPage />
        ) : completed === 0 ? (
          <div className="flex items-center justify-center p-6 mt-8">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">
                  Complete Your Hackathon Setup
                </h1>
                <p className="text-gray-600 mt-2">Just two simple steps to launch your event</p>
              </div>
              <HackathonDetailsForm completed={completed} setCompleted={setCompleted} />
            </div>
          </div>
        ) : (
          <HackathonWebpageContentForm completed={completed} setCompleted={setCompleted} />
        )}
      </div>
    </div>
  );
}

export default FillFullHackathonDetails;