import React, { useState } from 'react';

function Experience() {
    const [description, setDescription] = useState('');
    const [techSkills, setTechSkills] = useState(['', '', '', '', '']);
    const [resume, setResume] = useState(null);
    const [workExperience, setWorkExperience] = useState([{
        employer: '',
        role: '',
        fromMonth: '',
        fromYear: '',
        toMonth: '',
        toYear: '',
        description: ''
    }]);

    const suggestedSkills = [
        "Rust", "Solidity", "TypeScript", "Python", 
        "JavaScript", "React.js", "Shell", "Kotlin", 
        "Go", "Node.js"
    ];

    const handleSkillChange = (index, value) => {
        const newSkills = [...techSkills];
        newSkills[index] = value;
        setTechSkills(newSkills);
    };

    const handleAddSkill = (index) => {
        if (index < techSkills.length - 1) return; // Prevent adding skill if not at the last slot
        setTechSkills(prev => [...prev, '']);
    };

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
            description: ''
        }]);
    };

    const handleRemoveExperience = (index) => {
        const newWorkExperience = workExperience.filter((_, i) => i !== index);
        setWorkExperience(newWorkExperience);
    };

    return (
        <div className="">
            <h2 className='text-3xl bold mb-4'>Experience Details:</h2>

            <div className='mb-5'>
                <label htmlFor="description">Which of the following describes you best?</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Write your description here"
                />
            </div>

            <h3 className='text-2xl mb-2'>Rank your top 5 tech skills</h3>
            {techSkills.map((skill, index) => (
                <div key={index} className='flex items-center mb-2'>
                    <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Skill ${index + 1}`}
                    />
                    {index === techSkills.length - 1 && (
                        <button onClick={() => handleAddSkill(index)} className="add-skill-btn font-medium ml-2 py-2 px-4 bg-blue-500 text-white rounded">
                            Add Skill
                        </button>
                    )}
                </div>
            ))}

            <h3 className='text-2xl mb-2'>Suggested Skills</h3>
            <ul>
                {suggestedSkills.map((skill, index) => (
                    <li key={index} className='mb-1'>{skill}</li>
                ))}
            </ul>

            <div className='mt-5'>
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

            <h3 className='text-2xl mb-2'>Work Experience</h3>
            {workExperience.map((exp, index) => (
                <div key={index} className='border p-4 mb-4 rounded'>
                    <div className='flex mb-3'>
                        <input
                            type="text"
                            value={exp.employer}
                            onChange={(e) => handleWorkExperienceChange(index, 'employer', e.target.value)}
                            placeholder="Employer"
                            className="edit-inp shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        />
                        <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                            placeholder="Role"
                            className="edit-inp shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        />
                        <div className='flex flex-col'>
                            <label>From:</label>
                            <select
                                value={exp.fromMonth}
                                onChange={(e) => handleWorkExperienceChange(index, 'fromMonth', e.target.value)}
                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1"
                            >
                                <option value="">Month</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, i) => (
                                    <option key={i} value={month}>{month}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={exp.fromYear}
                                onChange={(e) => handleWorkExperienceChange(index, 'fromYear', e.target.value)}
                                placeholder="Year"
                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className='flex mb-3'>
                        <div className='flex flex-col'>
                            <label>To:</label>
                            <select
                                value={exp.toMonth}
                                onChange={(e) => handleWorkExperienceChange(index, 'toMonth', e.target.value)}
                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-1"
                            >
                                <option value="">Month</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, i) => (
                                    <option key={i} value={month}>{month}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={exp.toYear}
                                onChange={(e) => handleWorkExperienceChange(index, 'toYear', e.target.value)}
                                placeholder="Year"
                                className="edit-inp shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <textarea
                        value={exp.description}
                        onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                        placeholder="Description"
                        className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    />
                    <button onClick={() => handleRemoveExperience(index)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                        Delete
                    </button>
                </div>
            ))}
            <button onClick={handleAddExperience} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add another work experience
            </button>
        </div>
    );
}

export default Experience;
