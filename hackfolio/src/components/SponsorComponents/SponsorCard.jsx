import React from 'react';

const SponsorCard = ({ sponsor }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <img
        src={sponsor.logo}
        alt={`${sponsor.companyName} logo`}
        className="h-24 w-24 object-cover rounded-full mx-auto"
      />
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">{sponsor.companyName}</h2>
        <p className="mt-2 text-gray-600">{sponsor.description}</p>
      </div>
    </div>
  );
};

export default SponsorCard;
