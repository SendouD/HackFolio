import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function HackathonRegistrationForm() {
    const { name } = useParams();

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

    function handleChange(e,name) {
        const temp = { ...formData };
        temp[name] = e.target.value;
        setFormData(temp);
    }


    function inputComponent(label,name) {

        return(
            <>
                <label htmlFor="" className="mt-[20px] font-light">{label}</label>
                <input type="text" onChange={(e) => handleChange(e,name)} value={formData[name]} className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"/>
            </>
        );
    }

    async function handleSubmit() {
        try {
            const response = await fetch(`/api/hackathon/registerForHackathon/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(await response.json())
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return(
        <div className="w-full p-6 border rounded-[10px]">
            <div className="">
                <div className="text-4xl text-gray-500 mb-[40px]">Application Form :</div>
                {inputComponent("What should people call you:","aliasname")}
                {inputComponent("First Name:","firstname")}
                {inputComponent("Last Name:","lastname")}
                {inputComponent("Email: ","email")}
                {inputComponent("Phone No.:","phoneno")}
                {inputComponent("Gender:","gender")}
                {inputComponent("Github URL:","githubprofile")}
                {inputComponent("Linkedn URL:","linkednprofile")}
                {inputComponent("Portfolio Website URL:","portfoliowebsite")}
                {inputComponent("Skills:","skills")}
                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="edit-inp w-auto bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-[5px] focus:outline-none focus:shadow-outline edit-btn mt-4"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HackathonRegistrationForm