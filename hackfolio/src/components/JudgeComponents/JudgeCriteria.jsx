import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CriteriaList from './Criterialist'; // Ensure this path is correct

const AddCriteria = () => {
    const { name } = useParams(); // Get the hackathon name from URL parameters
    const [criteria, setCriteria] = useState([{ name: '', maxMarks: '' }]); // Initial criteria state
    const [errors, setErrors] = useState([]); // Track validation errors
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Validation regex
    const criteriaRegex = /^[A-Za-z][A-Za-z0-9\s]*$/; // Starts with an alphabet, allows alphanumeric and spaces

    // Handle input change for criteria
    const handleCriteriaChange = (index, field, value) => {
        const updatedCriteria = [...criteria];
        const updatedErrors = [...errors];

        if (field === 'maxMarks') {
            const numValue = Number(value);
            updatedCriteria[index][field] = numValue;

            if (numValue > 100) {
                updatedErrors[index] = { ...updatedErrors[index], maxMarks: "Max marks should be only up to 100" };
            } else {
                updatedErrors[index] = { ...updatedErrors[index], maxMarks: "" };
            }
        } else {
            updatedCriteria[index][field] = value;

            if (!criteriaRegex.test(value)) {
                updatedErrors[index] = { ...updatedErrors[index], name: "Criteria must start with an alphabet and contain only letters, numbers, and spaces" };
            } else {
                updatedErrors[index] = { ...updatedErrors[index], name: "" };
            }
        }

        setCriteria(updatedCriteria);
        setErrors(updatedErrors);
    };

    // Add new criteria input field
    const addCriteriaField = () => {
        setCriteria([...criteria, { name: '', maxMarks: '' }]);
        setErrors([...errors, {}]); // Initialize new field's errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before submitting
        const hasErrors = criteria.some((criterion, index) => {
            return (
                !criteriaRegex.test(criterion.name) ||
                isNaN(criterion.maxMarks) ||
                criterion.maxMarks <= 0 ||
                criterion.maxMarks > 100
            );
        });

        if (hasErrors) {
            setErrorMessage('Please fix the validation errors before submitting.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/judge/addcriteria`, {
                name, // Use the hackathon name from params
                criteria
            });

            if (response.status === 200) {
                setSuccessMessage('Criteria added successfully!');
                setErrorMessage('');
                setCriteria([{ name: '', maxMarks: '' }]); // Reset the form
                setErrors([]); // Clear errors
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to add criteria. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='add-criteria-container'>
            <h2 className="text-2xl font-bold mb-4">Add Criteria for {name}</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-lg">Judging Criteria</label>
                    {criteria.map((criterion, index) => (
                        <div key={index} className="flex flex-col space-y-2 mb-4">
                            <input
                                type="text"
                                value={criterion.name}
                                onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
                                placeholder={`Criterion ${index + 1} Name`}
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                            {errors[index]?.name && <p className="text-red-500 text-sm">{errors[index].name}</p>}
                            
                            <input
                                type="number"
                                value={criterion.maxMarks}
                                onChange={(e) => handleCriteriaChange(index, 'maxMarks', e.target.value)}
                                placeholder="Max Marks (Up to 100)"
                                className="border rounded px-3 py-2 w-full"
                                required
                            />
                            {errors[index]?.maxMarks && <p className="text-red-500 text-sm">{errors[index].maxMarks}</p>}
                        </div>
                    ))}
                    <button type="button" onClick={addCriteriaField} className="text-[#5f3abd]">
                        + Add More Criteria
                    </button>
                </div>

                <button type="submit" className="bg-[#5f3abd] text-white rounded px-4 py-2 mt-4">
                    Submit
                </button>
            </form>
            {/* Render the existing criteria list */}
            <CriteriaList />
        </div>
    );
};

export default AddCriteria;
