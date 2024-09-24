import React, { useState } from "react";

const About = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        tshirtSize: '',
        bio: '',
        readMe: '',
        isPreview: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePreview = () => {
        setFormData(prev => ({ ...prev, isPreview: !prev.isPreview }));
    };

    return (
        <div className="flex space-x-8 p-6">
            {/* Left Section */}
            <div className="w-1/2 bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">I identify as:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Non-binary</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-700">T-shirt Size:</label>
                    <select
                        id="tshirtSize"
                        name="tshirtSize"
                        value={formData.tshirtSize}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select</option>
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                    </select>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-white shadow-md rounded p-6">
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Add Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="readMe" className="block text-sm font-medium text-gray-700">Read Me:</label>
                    {!formData.isPreview ? (
                        <textarea
                            id="readMe"
                            name="readMe"
                            value={formData.readMe}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                        />
                    ) : (
                        <div className="border p-2 rounded text-gray-700 bg-gray-50">
                            {formData.readMe || "No content to preview"}
                        </div>
                    )}
                </div>

                <button
                    onClick={togglePreview}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {formData.isPreview ? "Write" : "Preview"}
                </button>
            </div>
        </div>
    );
};

export default About;
