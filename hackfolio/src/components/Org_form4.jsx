import React, { useState } from 'react';

function OrgForm4() {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const progressBarWidth = `${(step / totalSteps) * 100}%`;

    return (
        <>
            <div className="card w-1/2 bg-white p-20 rounded-md border-solid border-gray-200 border-2 mb-4">
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
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">University Name</label>
                        <input 
                            name="universityName" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="University Name" 
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">Technology Stack</label>
                        <input 
                            name="techStack" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Technology Stack" 
                        />
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
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">Required Participant Fields</label>
                        <select 
                            name="participantFields" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option>LinkedIn Profile</option>
                            <option>GitHub Profile</option>
                            <option>Portfolio Website</option>
                        </select>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Contact Links</label>
                        <input 
                            name="contactLinks" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Contact Links" 
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">Event Dates</label>
                        <input 
                            name="eventDates" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="date"
                        />
                        <label className="block text-gray-500 font-medium text-sm mt-4">Online or Offline</label>
                        <select 
                            name="eventType" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option>Online</option>
                            <option>Offline</option>
                        </select>
                        <label className="block text-gray-500 font-medium text-sm mt-4">Prizes Description</label>
                        <input 
                            name="prizesDescription" 
                            className="block w-full mt-2 rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Prizes Description" 
                        />
                    </div>
                )}
                <div className="mt-6 flex justify-between">
                    <button 
                        onClick={prevStep} 
                        disabled={step === 1}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                    >
                        Back
                    </button>
                    {step < totalSteps ? (
                        <button 
                            onClick={nextStep} 
                            className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Next
                        </button>
                    ) : (
                        <button 
                            className="bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default OrgForm4;
