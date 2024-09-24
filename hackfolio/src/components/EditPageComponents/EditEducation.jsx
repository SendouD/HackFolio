import { useState, useEffect } from 'react';

function Education() {
    const [formData, setFormData] = useState({
        degreeType: '',
        institution: '',
        fieldOfStudy: '',
        graduationMonth: '',
        graduationYear: '',
        certificationLinks: []
    });

    const [editableFields, setEditableFields] = useState({
        degreeType: false,
        institution: false,
        fieldOfStudy: false,
        graduationMonth: false,
        graduationYear: false,
        certificationLinks: false
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 1950 + index);

    function handleEdit(field) {
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function addLink() {
        const newArr = [...formData.certificationLinks, "www.example.com"];
        setFormData(prev => ({ ...prev, certificationLinks: newArr }));
    }

    function removeLink(index) {
        const newArr = [...formData.certificationLinks.slice(0, index), ...formData.certificationLinks.slice(index + 1)];
        setFormData(prev => ({ ...prev, certificationLinks: newArr }));
    }

    function renderEditableField(label, name, value, options) {
        return (
            <div className='mt-4'>
                <label htmlFor={name}>{label}: </label>
                <div className='flex items-center'>
                    {options ? (
                        <select
                            id={name}
                            name={name}
                            value={formData[name]}
                            disabled={!editableFields[name]}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    )}
                    <button onClick={() => handleEdit(name)} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                        {editableFields[name] ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        );
    }

    async function submitHandle() {
        // Handle submit logic, such as sending to the backend
        console.log(formData);
    }

    return (
        <div className="">
            <h2 className='text-3xl bold mb-4'>Edit Education Details:</h2>
            <div className="">

                {renderEditableField("Degree Type", "degreeType", formData.degreeType, ["Associate", "Bachelor", "Master", "PhD"])}

                {renderEditableField("Institution Name", "institution", formData.institution)}

                {renderEditableField("Field of Study", "fieldOfStudy", formData.fieldOfStudy)}

                {renderEditableField("Month of Graduation", "graduationMonth", formData.graduationMonth, months)}

                {renderEditableField("Year of Graduation", "graduationYear", formData.graduationYear, years)}

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

                <button onClick={submitHandle} className="edit-inp w-auto bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded focus:outline-none focus:shadow-outline edit-btn mt-4">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default Education;
