import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Contacts = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        city: '',
        country: ''
    });

    const [errors, setErrors] = useState({
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

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.error('No userId provided!');
                return;
            }

            try {
                const response = await axios.get(`${__BACKEND_URL__}/api/userProfile/${userId}/1`);
                console.log("Fetched user data:", response.data);
                let userData = response.data.user || response.data;

                setFormData({
                    phoneNumber: userData.phoneNumber || '',
                    email: userData.email || '',
                    city: userData.city || '',
                    country: userData.country || ''
                });

                setErrors({
                    phoneNumber: '',
                    email: '',
                    city: '',
                    country: ''
                });
            } catch (error) {
                console.error("Error fetching contact details:", error.response || error.message);
                alert("Failed to fetch contact details.");
            }
        };

        fetchData();
    }, [userId]);

    const validateField = (name, value) => {
        switch (name) {
            case 'phoneNumber':
                const phoneRegex = /^[+]?[0-9]{10,15}$/;
                if (!phoneRegex.test(value)) {
                    return 'Invalid phone number format';
                }
                if (/^0+$/.test(value.replace(/^\+/, ''))) {
                    return 'Phone number cannot be all zeros';
                }
                if (value.replace(/[^0-9]/g, '').length !== 10) {
                    return 'Phone number must be exactly 10 digits';
                }
                return '';

            case 'email':
                const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return strictEmailRegex.test(value) ? '' : 'Invalid email address format';

            case 'city':
            case 'country':
                const locationRegex = /^[a-zA-Z\s-]+$/;
                return locationRegex.test(value) ? '' : `${name} must contain only letters, spaces, and hyphens`;

            default:
                return '';
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        const error = validateField(name, value);

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const toggleEdit = async (field) => {
        if (editableFields[field]) {
            if (!errors[field] && formData[field].trim() !== '') {
                try {
                    await updateUser();
                } catch (error) {
                    console.error("Error updating:", error);
                }
            } else {
                alert("Please fix validation errors before saving.");
                return;
            }
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const updateUser = async () => {
        try {
            const response = await axios.put(`${__BACKEND_URL__}/api/userProfile/${userId}/1`, formData);
            if (response.status === 200) {
                alert("Contact details updated successfully!");
            }
        } catch (error) {
            console.error("Error updating contact details:", error);
            alert("Failed to update contact details.");
        }
    };

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
                    className={`edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors[name] ? 'border-red-500' : ''
                    }`}
                />
                <button 
                    onClick={() => toggleEdit(name)} 
                    className={`bg-[#5f3abd] hover:bg-[#5534a7] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 ${
                        errors[name] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={errors[name] !== ""}
                >
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
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
