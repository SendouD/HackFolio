import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Contacts = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        city: '',
        country: ''
    });

    const [editableFields, setEditableFields] = useState({
        phoneNumber: false,
        email: false,
        city: false,
        country: false
    });

    const { id: userId } = useParams();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error('No userId provided!');
                return;
            }

            try {
                const response = await axios.get(`/api/userProfile/${userId}/1`);
                console.log("Fetched user data:", response.data);
                let userData;

                if (response.data.user) {
                    userData = response.data.user;
                } else {
                    userData = response.data;
                }

                setFormData({
                    phoneNumber: userData.phoneNumber || '',
                    email: userData.email || '',
                    city: userData.city || '',
                    country: userData.country || ''
                });
            } catch (error) {
                console.error("Error fetching contact details:", error.response || error.message);
                alert("Failed to fetch contact details.");
            }
        };

        fetchData();
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEdit = (field) => {
        if (editableFields[field]) {
            updateUser(); // Update before toggling back to non-edit mode
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const updateUser = async () => {
        try {
            const response = await axios.put(`/api/userProfile/${userId}/1`, formData);
            if (response.status === 200) {
                alert("Contact details updated successfully!");
            }
        } catch (error) {
            console.error("Error updating contact details:", error);
            alert("Failed to update contact details.");
        }
    };

    useEffect(() => {
        console.log(formData);
    },[formData]);

    const renderEditableField = (label, name) => (
        <div className='mt-4'>
            <label htmlFor={name}>{label}: </label>
            <div className='flex items-center'>
                <input
                    id={name}
                    name={name}
                    value={formData[name]}
                    disabled={!editableFields[name]}
                    onChange={handleChange}
                    className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button 
                    onClick={() => toggleEdit(name)} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="">
            <h2 className='text-3xl bold mb-4'>Contacts Section:</h2>
            
            {renderEditableField("Phone Number", "phoneNumber")}
            {renderEditableField("Email", "email")}
            {renderEditableField("City", "city")}
            {renderEditableField("Country", "country")}
        </div>
    );
};

export default Contacts;
