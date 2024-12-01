import { useState } from 'react';
import EditHackathonDetails from "../../components/HackathonComponents/EditHackathonDetails";
import EditHackathonWebsite from "../../components/HackathonComponents/EditHackathonWebsite";
import HackathonDashboard from '../../components/HackathonComponents/HackathonDashboard';
import AddJudge from '../../components/JudgeComponents/AddJudge';
import AddEvaluationCriteria from '../../components/JudgeComponents/JudgeCriteria';
import Header from '../../components/Header';
import "../../styles/edit_hack_page.css";
import ReactingNavBar from '../../components/ReactingNavBar';
import Stats from '../../components/HackathonComponents/Stats';

function EditOrganizedHackathonDetails() {
    const [selected, setSelected] = useState(0); 

    return (
        <>
            <div className='flex'>
                <ReactingNavBar/>
                <div className='space-y-3 size-full'>
                <Header />
            <div className='flex justify-center mt-2'>
                <div className="edit-selection-card">
                    <div className='edit-choice-card'>
                        <button
                            onClick={() => setSelected(0)}
                            className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 0 ? 'active' : ''}`}>
                            Details
                        </button>
                        <button
                            onClick={() => setSelected(1)}
                            className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 1 ? 'active' : ''}`}>
                            Webpage
                        </button>
                        <button
                            onClick={() => setSelected(2)}
                            className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 2 ? 'active' : ''}`}>
                            Dashboard
                        </button>
                        <button
                            onClick={() => setSelected(3)}
                            className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 3 ? 'active' : ''}`}>
                            Add Judges
                        </button>
                        <button
                            onClick={() => setSelected(4)} // New button for criteria
                            className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 4 ? 'active' : ''}`}>
                            Add Evaluation Criteria
                        </button>
                        <button                     onClick={()=>setSelected(5)}
                                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 5 ? 'active' : ''}`}>\
                                                    Stats
                            
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    {selected === 0 && (
                        <div className='editCard'>
                            <EditHackathonDetails />
                        </div>
                    )}
                    {selected === 1 && (
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <EditHackathonWebsite />
                        </div>
                    )}
                    {selected === 2 && (
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <HackathonDashboard />
                        </div>
                    )}
                    {selected === 3 && (
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <AddJudge />
                        </div>
                    )}
                    {selected === 4 && ( // Render new component when selected
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <AddEvaluationCriteria />
                        </div>
                    )}
                       {selected === 5 && ( // Render new component when selected
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <Stats />
                        </div>
                    )}
                </div>
            </div>
                </div>
            </div>
            
        </>
    );
}

export default EditOrganizedHackathonDetails;
