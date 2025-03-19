import { useState } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function HackathonRegistrationForm() {
    const { name } = useParams();
    const navigate = useNavigate();
    const urlRegex = /^(https?:\/\/)(localhost|[\da-z.-]+)\.([a-z.]{2,6}|localhost)(:[0-9]{1,5})?(\/[^\s]*)?$/i;
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
        if (!emailRegex.test(formData.email) || formData.email === "0.0@0.0") {
            newErrors.email = 'Enter a valid email!';
        }
        if (!phoneRegex.test(formData.phoneno)) {
            newErrors.phoneno = 'Enter a valid 10-digit phone number!';
        }
        if (![formData.githubprofile, formData.linkednprofile, formData.portfoliowebsite].every(url => url === "" || (urlRegex.test(url) && !/^https?:\/\/a\.aa$/i.test(url)))) {
            newErrors.urls = 'Enter valid URLs!';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit() {
        if (!validateForm()) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.status === 403) navigate('/Error403');

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
                <input type={type} onChange={(e) => handleChange(e, name)} value={formData[name]} className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"/>
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
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
                {inputComponent("Email:", "email", "email")}
                {inputComponent("Phone No.:", "phoneno", "tel")}
                {inputComponent("Gender:", "gender")}
                {inputComponent("Github URL:", "githubprofile")}
                {inputComponent("LinkedIn URL:", "linkednprofile")}
                {inputComponent("Portfolio Website URL:", "portfoliowebsite")}
                {inputComponent("Skills:", "skills")}
                {errors.urls && <p className="text-red-500 text-sm mt-1">{errors.urls}</p>}
                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="edit-inp w-auto bg-[#5f3abd] hover:bg-[#5f3abd] text-white font-medium py-3 px-6 rounded-[5px] focus:outline-none focus:shadow-outline edit-btn mt-4"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HackathonRegistrationForm;
