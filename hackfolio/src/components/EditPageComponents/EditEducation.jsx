import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Education() {
    const [formData, setFormData] = useState({
        degreeType: '',
        institution: '',
        fieldOfStudy: '',
        graduationMonth: '',
        graduationYear: '',
        dateofgraduation:'',
        certificationLinks: []
    });

    const [editableFields, setEditableFields] = useState({
        degreeType: false,
        institution: false,
        fieldOfStudy: false,
        graduationMonth: false,
        graduationYear: false,
        dateofgraduation:false,
        certificationLinks: false
    });

    const { id: userId } = useParams();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 1950 + index);

    // Fetch user education data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/userProfile/${userId}/2`);
                const userData = response.data;

                setFormData({
                    degreeType: userData.degreeType || '',
                    institution: userData.institution || '',
                    fieldOfStudy: userData.fieldOfStudy || '',
                    graduationMonth: userData.graduationMonth || '',
                    graduationYear: userData.graduationYear || '',
                    certificationLinks: userData.certificationLinks || []
                });
            } catch (error) {
                console.error("Error fetching education data:", error);
                alert("Failed to fetch education data");
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        console.log(formData);
    },[formData]);

    // Handle editing and saving functionality
    const handleEdit = (field) => {
        if (editableFields[field]) {
            updateEducation(); // Update data before disabling edit mode
        }
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    // Update education data
    const updateEducation = async () => {
        try {
            const response = await axios.put(`/api/userProfile/${userId}/2`, formData);
            if (response.status === 200) {
                alert("Education details updated successfully!");
            }
        } catch (error) {
            console.error("Error updating education data:", error);
            alert("Failed to update education data");
        }
    }

    // Handle form change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        console.log(formData);
    };

    // Add and remove certification links
    const addLink = () => {
        setFormData(prev => ({ ...prev, certificationLinks: [...prev.certificationLinks, ""] }));
    };

    const removeLink = (index) => {
        const newArr = formData.certificationLinks.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, certificationLinks: newArr }));
    };

    const renderEditableField = (label, name, options) => (
        <div className='mt-4'>
            <label htmlFor={name}>{label}: </label>
            <div className='flex items-center'>
                {options ? (
                    <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={(e) => handleChange(e)}
                        className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select {label}</option>
                        {options.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={name}
                        name={name}
                        value={formData[name]}
                        disabled={!editableFields[name]}
                        onChange={(e) => handleChange(e)}
                        className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                )}
                <button onClick={() => handleEdit(name)} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                    {editableFields[name] ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="">
            <h2 className='text-3xl font-bold mb-4'>Edit Education Details:</h2>
            <div className="">
                {renderEditableField("Degree Type", "degreeType", ["Associate", "Bachelor", "Master", "PhD"])}
                {renderEditableField("Institution Name", "institution")}
                {renderEditableField("Field of Study", "fieldOfStudy")}
                {renderEditableField("Month of Graduation", "graduationMonth", months)}
                {renderEditableField("Year of Graduation", "graduationYear", years)}
                {renderEditableField("Date Of Graduation","dateofgraduation")}

                <div className='mt-4'>
                    <label htmlFor="certificationLinks">Certification Links: </label>
                    {formData.certificationLinks.map((link, i) => (
                        <div key={i} className="flex items-center">
                            <input
                                value={link}
                                onChange={(e) => {
                                    const newLinks = [...formData.certificationLinks];
                                    newLinks[i] = e.target.value;
                                    setFormData(prev => ({ ...prev, certificationLinks: newLinks }));
                                }}
                                disabled={!editableFields.certificationLinks}
                                className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            />
                            <button onClick={() => removeLink(i)} className="font-medium edit-btn mt-2 mr-0 ml-2">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button onClick={addLink} className="add-link-btn font-medium edit-btn py-2 px-3">
                        Add
                    </button>
                    <button onClick={() => handleEdit('certificationLinks')} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline edit-btn">
                        {editableFields.certificationLinks ? 'Save' : 'Edit'}
                    </button>
                </div>

                <button onClick={updateEducation} className="edit-inp w-auto bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline edit-btn mt-4">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default Education;
