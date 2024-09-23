import React from "react";

const SponsorDetail = ({ sponsor }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{sponsor.companyName}</h1>
          <p className="text-gray-600 mt-2">{sponsor.userName}</p>
        </div>

        {/* Logo Section */}
        {sponsor.logo && (
          <div className="mb-6">
            <img src={sponsor.logo} alt="logo" className="h-24 w-24 rounded-lg shadow-lg" />
          </div>
        )}

        {/* Website */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Website</h2>
          <a href={sponsor.website} className="text-blue-500 underline">
            {sponsor.website}
          </a>
        </div>

        {/* Contact Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p>Email: <a href={`mailto:${sponsor.email}`} className="text-blue-500">{sponsor.email}</a></p>
          <p>Phone: {sponsor.phoneNumber}</p>
        </div>

        {/* Address Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <p>{sponsor.address.street}</p>
          <p>{`${sponsor.address.city}, ${sponsor.address.state}, ${sponsor.address.zip}, ${sponsor.address.country}`}</p>
        </div>

        {/* Description */}
        {sponsor.description && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{sponsor.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorDetail;
