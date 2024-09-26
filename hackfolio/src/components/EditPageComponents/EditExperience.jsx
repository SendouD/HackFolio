import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Experience = () => {
    const [resume, setResume] = useState(null);
    const [workExperience, setWorkExperience] = useState([{
        employer: '',
        role: '',
        fromMonth: '',
        fromYear: '',
        toMonth: '',
        toYear: '',
        description: '',
        isEditing: false // New field to manage edit state
    }]);
    const [formData, setFormData] = useState({ skills: [] });
    const { id: userId } = useParams();

    // Fetch user experience data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error('No userId provided!');
                return;
            }
            try {
                const response = await axios.get(`/api/userProfile/${userId}/1`);
                let userData;

                // Handle different response formats
                if (response.data.user) {
                    userData = response.data.user;
                } else if (Array.isArray(response.data) && response.data.length > 0) {
                    userData = response.data[0];
                }

                // Set the initial work experience data
                if (userData && userData.workExperience) {
                    setWorkExperience(userData.workExperience.map(exp => ({ ...exp, isEditing: false }))); // Initialize edit state
                    setFormData(prev => ({ ...prev, skills: userData.skills || [] }));
                }
            } catch (error) {
                console.error("Error fetching user data:", error.response || error.message);
                alert("Failed to fetch user data: " + (error.response ? error.response.data.message : error.message));
            }
        };

        fetchData();
    }, [userId]);

    const handleResumeChange = (event) => {
        setResume(event.target.files[0]);
    };

    const handleWorkExperienceChange = (index, field, value) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index][field] = value;
        setWorkExperience(newWorkExperience);
    };

    const handleAddExperience = () => {
        setWorkExperience([...workExperience, {
            employer: '',
            role: '',
            fromMonth: '',
            fromYear: '',
            toMonth: '',
            toYear: '',
            description: '',
            isEditing: false // New entry will start in view mode
        }]);
    };

    const handleRemoveExperience = (index) => {
        const newWorkExperience = workExperience.filter((_, i) => i !== index);
        setWorkExperience(newWorkExperience);
    };

    const handleToggleEdit = (index) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index].isEditing = !newWorkExperience[index].isEditing; // Toggle edit state
        setWorkExperience(newWorkExperience);
    };

    const handleUpdateExperience = async (index) => {
        const expToUpdate = workExperience[index];

        try {
            const response = await axios.put(`/api/userProfile/${userId}`, { workExperience: [expToUpdate], skills: formData.skills });
            if (response.status === 200) {
                alert("Experience updated successfully!");
                handleToggleEdit(index); // Exit edit mode
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data");
        }
    };

    const years = Array.from({ length: 75 }, (_, i) => 1950 + i); // Creates an array from 1950 to 2024

    return (
        <div className="">
            <h2 className='text-3xl bold mb-4'>Experience Details:</h2>

            <div className='mt-5 space-y-4'>
                <label htmlFor="resume" className="block mb-2">Resume: </label>
                <input 
                    type="file"
                    id="resume"
                    accept=".pdf"
                    onChange={handleResumeChange}
                    className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-sm text-gray-500">Make sure your resume is in .pdf format only (5MB max)</p>
            </div>

            <div className='my-8'>
                <h3 className='text-2xl mb-2'>Work Experience</h3>
                {workExperience.map((exp, index) => (
                    <div key={index} className='border p-4 mb-4 rounded shadow'>
                        {exp.isEditing ? ( // Conditional rendering based on edit state
                            <div>
                                <div className='flex mb-3'>
                                    <input
                                        type="text"
                                        value={exp.employer}
                                        onChange={(e) => handleWorkExperienceChange(index, 'employer', e.target.value)}
                                        placeholder="Employer"
                                        className="edit-inp shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    />
                                    <input
                                        type="text"
                                        value={exp.role}
                                        onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                                        placeholder="Role"
                                        className="edit-inp shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                    />
                                </div>
                                <div className='flex mb-3'>
                                    <div className='flex flex-col w-1/2 pr-2'>
                                        <label>From:</label>
                                        <div className='flex'>
                                            <select
                                                value={exp.fromMonth}
                                                onChange={(e) => handleWorkExperienceChange(index, 'fromMonth', e.target.value)}
                                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1 mr-1"
                                            >
                                                <option value="">Month</option>
                                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, i) => (
                                                    <option key={i} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={exp.fromYear}
                                                onChange={(e) => handleWorkExperienceChange(index, 'fromYear', e.target.value)}
                                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-1/2 pl-2'>
                                        <label>To:</label>
                                        <div className='flex'>
                                            <select
                                                value={exp.toMonth}
                                                onChange={(e) => handleWorkExperienceChange(index, 'toMonth', e.target.value)}
                                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1 mr-1"
                                            >
                                                <option value="">Month</option>
                                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, i) => (
                                                    <option key={i} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={exp.toYear}
                                                onChange={(e) => handleWorkExperienceChange(index, 'toYear', e.target.value)}
                                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    value={exp.description}
                                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                                    placeholder="Description"
                                    className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                />
                                <button onClick={() => handleUpdateExperience(index)} className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                                    Save
                                </button>
                                <button onClick={() => handleToggleEdit(index)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ml-2">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h4 className="text-lg font-bold">{exp.role} at {exp.employer}</h4>
                                <p>{exp.fromMonth} {exp.fromYear} - {exp.toMonth} {exp.toYear}</p>
                                <p>{exp.description}</p>
                                <button onClick={() => handleToggleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                                    Edit
                                </button>
                                <button onClick={() => handleRemoveExperience(index)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ml-2">
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={handleAddExperience} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Work Experience
                </button>
            </div>
        </div>
    );
};

export default Experience;
