import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function HackathonDetailsForm(props) {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [hackName, setHackName] = useState("");
    const [uniName, setUniName] = useState("");
    const [eventMode, setEventMode] = useState("Online");
    const [tech, setTech] = useState("");
    const [teamSize, setTeamSize] = useState("4");
    const [partProf, setPartProf] = useState("");
    const [contactLinks, setContactLinks] = useState([""]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [prizesDesc, setPrizesDesc] = useState("");
    const navigate = useNavigate();
    const { name } = useParams();

    useEffect(() => {
        getDetails();
    },[])

    function nextStep() {
        if (step < totalSteps) setStep(step + 1);
    }

    function prevStep() {
        if (step > 1) setStep(step - 1);
    }

    const progressBarWidth = `${(step / totalSteps) * 100}%`;

    function handleContactLinkChange(index, value) {
        const newLinks = [...contactLinks];
        newLinks[index] = value;
        setContactLinks(newLinks);
    }

    function addContactLink() {
        setContactLinks([...contactLinks, ""]);
    }

    function removeContactLink(index) {
        const newLinks = contactLinks.filter((_, i) => i !== index);
        setContactLinks(newLinks);
    }

    async function getDetails() {
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${name}/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let data = await response.json();
            setHackName(data.hackathonName);
            setUniName(data.uniName);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function handleSubmit(e) {
        const payload = { hackName, uniName, tech, teamSize, partProf, contactLinks, fromDate, toDate, prizesDesc };
        console.log(payload);
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${name}/1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hackName, uniName, eventMode, tech, teamSize, partProf, contactLinks, fromDate, toDate, prizesDesc }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            props.setCompleted(1);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <>
            <div className="card bg-white p-20 rounded-md border-solid border-gray-200 border-2 mb-4 w-12/12">
                <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold text-3xl text-gray-950/80">Let’s get you started!</div>
                </div>
                <div className="mb-6">
                    <div className="h-2 bg-gray-200 rounded">
                        <div className="h-full bg-indigo-600 rounded" style={{ width: progressBarWidth }}></div>
                    </div>
                </div>

                {step === 1 && (
                    <div>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Hackathon Name</label>
                        <input 
                            name="hackName" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Hackathon Name"
                            value={hackName}
                            onChange={(e) => setHackName(e.target.value)}
                            disabled
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">University Name</label>
                        <input 
                            name="universityName" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="University Name" 
                            value={uniName}
                            onChange={(e) => setUniName(e.target.value)}
                            disabled
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">Technology Stack</label>
                        <select 
                            name="techStack" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setEventMode(e.target.value)}
                            value={eventMode}
                        >
                            <option value="" disabled>Select technology</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Technology Stack</label>
                        <select 
                            name="techStack" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setTech(e.target.value)}
                            value={tech}
                        >
                            <option value="" disabled>Select technology</option>
                            <option value="blockchain">Blockchain</option>
                            <option value="vr/ar">VR/AR</option>
                            <option value="web-dev">Web Development</option>
                            <option value="design">Design</option>
                            <option value="ai/ml">AI/ML</option>
                            <option value="iot">IoT</option>
                        </select>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Team Size Allowed</label>
                        <input 
                            name="teamSize" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="number"
                            placeholder="e.g. 4-6 members"
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">Required Participant Fields</label>
                        <select 
                            name="participantFields" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setPartProf(e.target.value)}
                            value={partProf}
                        >
                            <option value="" disabled>Select fields</option>
                            <option value="linkedin">LinkedIn Profile</option>
                            <option value="github">GitHub Profile</option>
                            <option value="portfolio">Portfolio Website</option>
                        </select>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Contact Links</label>
                        {contactLinks.map((link, index) => (
                            <div className="flex items-center mb-2" key={index}>
                                <input 
                                    name={`contactLink${index}`} 
                                    className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    type="text"
                                    placeholder="Contact Link"
                                    value={link}
                                    onChange={(e) => handleContactLinkChange(index, e.target.value)}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => removeContactLink(index)} 
                                    className="ml-2 text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={addContactLink} 
                            className="mt-2 text-indigo-600 hover:text-indigo-800"
                        >
                            + Add Another Contact Link
                        </button>
                        <div className="flex justify-between mt-4">
                            <div className="w-5/12">
                                <label className="block text-gray-500 font-medium text-sm mt-4">From:</label>
                                <input 
                                    name="eventStartDate" 
                                    className="w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </div>
                            <div className='w-5/12'>
                                <label className="block text-gray-500 font-medium text-sm mt-4">To:</label>
                                <input 
                                    name="eventEndDate" 
                                    className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Prizes Description</label>
                        <textarea
                            name="prizesDescription"
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            rows={3}
                            placeholder="Describe the prizes"
                            value={prizesDesc}
                            onChange={(e) => setPrizesDesc(e.target.value)}
                        />
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    {step > 1 && (
                        <button type="button" onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Previous
                        </button>
                    )}
                    {step < totalSteps ? (
                        <button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    ) : (
                        <button type="submit" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default HackathonDetailsForm;
