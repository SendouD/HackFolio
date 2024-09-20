import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Org_form(props) {
    const [hackName, setHackName] = useState("");
    const [uniName, setUniName] = useState("");
    const navigate = useNavigate();

    async function handleClick() {
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hackName, uniName }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            const name = data.HackathonName;
            navigate(`/completeHackathonCreation/${hackName}`);
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function changeName(e) {
        const updatedName = e.target.value.split(' ').join('-');
        setHackName(updatedName);
    }
    

    return (
        <>
            <div className="hack-form">
                <div className="form-container w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <div className="font-semibold text-3xl text-gray-950/80">Let’s get you started!</div>
                        <button 
                            onClick={props.setFalse} 
                            className="text-black text-2xl font-bold transition-transform duration-300 transform"
                        >
                            &#10005;
                        </button>
                    </div>
                    <div className="">
                        <label htmlFor="hackName" className="block text-gray-500 font-medium text-sm mt-4">NAME</label>
                        <input 
                            name="hackName" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Hackathon Name" 
                            onChange={(e) => changeName(e)} 
                        />
                        <label htmlFor="uniName" className="block text-gray-500 font-medium text-sm mt-4">UNIVERSITY YOU'RE REPRESENTING?</label>
                        <input 
                            name="uniName" 
                            className="block w-full mt-2 mb-8 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text" 
                            placeholder="..." 
                            onChange={(e) => setUniName(e.target.value)} 
                        />
                        <button 
                            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                            onClick={handleClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Org_form;
