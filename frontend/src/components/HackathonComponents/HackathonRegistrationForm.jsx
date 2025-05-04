import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HackathonRegistrationForm() {
    const { name } = useParams();
    const navigate = useNavigate();
    const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.(com|in)\/?.*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?!0{10,}$)\d{10}$/;

    const [formData, setFormData] = useState({
        aliasname: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneno: '',
        gender: '',
        githubprofile: '',
        linkednprofile: '',
        portfoliowebsite: '',
        skills: '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(e, name) {
        setFormData(prev => ({ ...prev, [name]: e.target.value }));
    }

    function validateForm() {
        let newErrors = {};
        
        const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    
        if (!nameRegex.test(formData.firstname)) {
            newErrors.firstname = "First name cannot contain numbers or special characters!";
        }
    
        if (!nameRegex.test(formData.lastname)) {
            newErrors.lastname = "Last name cannot contain numbers or special characters!";
        }
    
        if (!emailRegex.test(formData.email) || formData.email === "0.0@0.0") {
            newErrors.email = "Enter a valid email!";
        }
    
        if (!phoneRegex.test(formData.phoneno)) {
            newErrors.phoneno = "Enter a valid 10-digit phone number!";
        }
    
        if (![formData.githubprofile, formData.linkednprofile, formData.portfoliowebsite].every(url => 
            url === "" || (urlRegex.test(url) && !/^https?:\/\/a\.aa$/i.test(url))
        )) {
            newErrors.urls = "Enter valid URLs!";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    
    async function handleSubmit() {
        if (!validateForm()) return;
        try {
            const response = await fetch(`${__BACKEND_URL__}/api/hackathon/registerForHackathon/${name}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({formData}),
                credentials: 'include',
            });

            if (response.status === 403) navigate('/Error403');
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(await response.json());
            navigate(`/hackathon/${name}/editRegistrationDetails`);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function inputComponent(label, name, type = "text") {
        return (
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                {name === "gender" ? (
                    <select
                        onChange={(e) => handleChange(e, name)}
                        value={formData[name]}
                        className="w-full px-4 py-2.5 bg-white rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                ) : (
                    <input
                        type={type}
                        onChange={(e) => handleChange(e, name)}
                        value={formData[name]}
                        className="w-full px-4 py-2.5 bg-white rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300"
                        placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                )}
                {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
            </div>
        );
    }    

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg border border-gray-100 p-8">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">Hackathon Registration</h1>
            
            <div className="grid gap-4">
                {inputComponent("What should people call you", "aliasname")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inputComponent("First Name", "firstname")}
                    {inputComponent("Last Name", "lastname")}
                </div>
                {inputComponent("Email", "email", "email")}
                {inputComponent("Phone Number", "phoneno", "tel")}
                {inputComponent("Gender", "gender")}
                {inputComponent("GitHub URL", "githubprofile")}
                {inputComponent("LinkedIn URL", "linkednprofile")}
                {inputComponent("Portfolio Website", "portfoliowebsite")}
                
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Skills</label>
                    <textarea
                        onChange={(e) => handleChange(e, "skills")}
                        value={formData.skills}
                        className="w-full px-4 py-2.5 bg-white rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300"
                        placeholder="Enter your skills (separated by commas)"
                        rows="3"
                    />
                </div>
                
                {errors.urls && <p className="text-sm text-red-500 mb-4">{errors.urls}</p>}
                
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 px-4 bg-[#5f3abd] hover:bg-[#4f2fa0] text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f3abd]"
                >
                    Submit Application
                </button>
            </div>
        </div>
    );
}

export default HackathonRegistrationForm;