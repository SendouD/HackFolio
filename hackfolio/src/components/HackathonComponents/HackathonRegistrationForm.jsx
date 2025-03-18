import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function HackathonRegistrationForm() {
    const { name } = useParams();
    const navigate = useNavigate();

    const urlRegex = /^(http:\/\/|https?:\/\/)?([\w\-]+(\.[\w\-]+)+\/?)\S*$/;
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/; // Ensures it starts with an alphabet
    const phoneRegex = /^[6-9]\d{9}$/; // Ensures it starts with 6-9 and is 10 digits long

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
        setFormData({ ...formData, [name]: e.target.value });
    }

    function validateForm() {
        let newErrors = {};

        if (!nameRegex.test(formData.aliasname)) 
            newErrors.aliasname = "Alias name must start with an alphabet and contain only letters and spaces.";
        
        if (!nameRegex.test(formData.firstname)) 
            newErrors.firstname = "First name must start with an alphabet and contain only letters and spaces.";
        
        if (!nameRegex.test(formData.lastname)) 
            newErrors.lastname = "Last name must start with an alphabet and contain only letters and spaces.";

        if (!phoneRegex.test(formData.phoneno)) 
            newErrors.phoneno = "Phone number must start with 6-9 and be exactly 10 digits long.";

        if (!urlRegex.test(formData.githubprofile)) 
            newErrors.githubprofile = "Enter a valid GitHub URL.";

        if (!urlRegex.test(formData.linkednprofile)) 
            newErrors.linkednprofile = "Enter a valid LinkedIn URL.";

        if (!urlRegex.test(formData.portfoliowebsite)) 
            newErrors.portfoliowebsite = "Enter a valid portfolio URL.";

        if (!nameRegex.test(formData.skills)) 
            newErrors.skills = "Skills must start with an alphabet and contain only letters and spaces.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit() {
        if (!validateForm()) {
            alert("Please fix the errors before submitting.");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: "value" }),
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
            <>
                <label className="mt-[20px] font-light">{label}</label>
                <input
                    type={type}
                    onChange={(e) => handleChange(e, name)}
                    value={formData[name]}
                    className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                />
                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </>
        );
    }

    return (
        <div className="w-full p-6 border rounded-[10px]">
            <div>
                <div className="text-4xl text-gray-500 mb-[40px]">Application Form :</div>
                {inputComponent("What should people call you:", "aliasname")}
                {inputComponent("First Name:", "firstname")}
                {inputComponent("Last Name:", "lastname")}
                {inputComponent("Phone No.:", "phoneno", "tel")}

                {/* Gender Dropdown */}
                <label className="mt-[20px] font-light">Gender:</label>
                <select
                    value={formData.gender}
                    onChange={(e) => handleChange(e, "gender")}
                    className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {inputComponent("Github URL:", "githubprofile")}
                {inputComponent("LinkedIn URL:", "linkednprofile")}
                {inputComponent("Portfolio Website URL:", "portfoliowebsite")}
                {inputComponent("Skills:", "skills")}

                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="edit-inp w-auto bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-3 px-6 rounded-[5px] focus:outline-none focus:shadow-outline edit-btn mt-4"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Background Animations */}
            <div className=" inset-0 -z-10">
                <motion.div
                    className="absolute top-[400px] left-[30px] w-32 h-32 -z-10"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                >
                    <motion.svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <motion.path d="M10 10 L 50 50 L 90 10" fill="transparent" stroke="#3b82f6" strokeWidth="4" />
                    </motion.svg>
                </motion.div>
                
                <motion.div
                    className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                />
            </div>
        </div>
    );
}

export default HackathonRegistrationForm;
