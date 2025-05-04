import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function Education() {
    const [formData, setFormData] = useState({
        degreeType: '',
        institution: '',
        fieldOfStudy: '',
        graduationMonth: '',
        graduationYear: '',
        dateofgraduation: '',
        certificationLinks: []
    });

    const [editableField, setEditableField] = useState(null);
    const [errors, setErrors] = useState({});
    const { id: userId } = useParams();

    const degreeOptions = ["Associate", "Bachelor", "Master", "PhD"];
    const months = [...Array(12)].map((_, i) => new Date(0, i).toLocaleString('en', { month: 'long' }));
    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 1950 + index);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/2`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching education data:", error);
                alert("Failed to fetch education data");
            }
        };
        fetchData();
    }, [userId]);

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: value ? '' : `${name} cannot be empty.` }));
    };

    const handleSave = async (name) => {
        if (errors[name]) {
            alert("Please fix the validation errors before saving.");
            return;
        }

        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/userProfile/${userId}/2`, {
                [name]: formData[name]
            });
            alert(`${name} updated successfully!`);
            setEditableField(null);
        } catch (error) {
            console.error(`Error updating ${name}:`, error);
            alert(`Failed to update ${name}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="bg-white p-6 shadow-md rounded-lg text-black">
                <h2 className="text-3xl font-bold mb-4">Edit Education Details:</h2>
                <motion.div className="space-y-4">
                    {[{ key: 'degreeType', label: 'Degree Type:', type: 'select', options: degreeOptions },
                      { key: 'institution', label: 'Institution:', type: 'text' },
                      { key: 'fieldOfStudy', label: 'Field of Study:', type: 'text' },
                      { key: 'graduationMonth', label: 'Graduation Month:', type: 'select', options: months },
                      { key: 'graduationYear', label: 'Graduation Year:', type: 'select', options: years }
                    ].map(({ key, label, type, options }, index) => (
                        <div key={index} className="mt-4">
                            <label className="block">{label}</label>
                            <div className="flex items-center">
                                {type === 'select' ? (
                                    <select
                                        value={formData[key]}
                                        disabled={editableField !== key}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                        className="border rounded py-2 px-3 w-full"
                                    >
                                        <option value="">Select {label}</option>
                                        {options.map((option, i) => (
                                            <option key={i} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        value={formData[key]}
                                        disabled={editableField !== key}
                                        onChange={(e) => handleChange(key, e.target.value)}
                                        className="border rounded py-2 px-3 w-full"
                                    />
                                )}
                                <button
                                    onClick={() => editableField === key ? handleSave(key) : setEditableField(key)}
                                    className="ml-2 bg-[#5f3abd] text-white px-4 py-2 rounded hover:bg-[#4b2d91]"
                                >
                                    {editableField === key ? 'Save' : 'Edit'}
                                </button>
                            </div>
                            {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Education;