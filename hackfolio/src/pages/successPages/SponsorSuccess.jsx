import React from 'react';
import { useNavigate } from 'react-router-dom';

const sponsorSuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = ({title,description}) => {
    navigate('/'); // Redirect to home or another page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Sponsor Request sent Successfully!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your Request has been sent successfully. You can view and manage your status in your dashboard.
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={handleGoHome}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default sponsorSuccessPage;
