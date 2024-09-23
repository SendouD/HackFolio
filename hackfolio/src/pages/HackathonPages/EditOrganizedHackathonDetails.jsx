import { useState } from 'react';
import EditHackathonDetails from "../../components/HackathonComponents/EditHackathonDetails";
import EditHackathonWebsite from "../../components/HackathonComponents/EditHackathonWebsite";
import HackathonDashboard from '../../components/HackathonComponents/HackathonDashboard';
import Header from '../../components/Header';
import "../../styles/edit_hack_page.css";

function EditOrganizedHackathonDetails() {
    const [selected, setSelected] = useState(0); // 0: Details, 1: Webpage, 2: Dashboard

    return (
        <>
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
                </div>
            </div>
        </>
    );
}

export default EditOrganizedHackathonDetails;
