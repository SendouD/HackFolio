import { useState } from 'react';
import EditHackathonDetails from "../components/EditHackathonDetails";
import EditHackathonWebsite from "../components/EditHackathonWebsite";
import Header from '../components/Header';
import "../styles/edit_hack_page.css";

function EditOrganizedHackathonDetails() {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <Header></Header>
            <div className='flex justify-center mt-2'>
                <div className="edit-selection-card">
                    <div className='edit-choice-card'>
                        <button onClick={() => selected === 1 && setSelected(0)} className='edit-choice-btn text-2xl font-thin block mt-5 px-5'>
                            Details
                        </button>
                        <button onClick={() => selected === 0 && setSelected(1)} className='edit-choice-btn text-2xl font-thin block mt-5 px-5'>
                            Webpage
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    {selected === 0 ? (
                        <div className='editCard'>
                            <EditHackathonDetails />
                        </div>
                    ) : (
                        <div className='editCard bg-[rgb(251,251,251)]'>
                            <EditHackathonWebsite />
                        </div>
                    )}
                </div>    
            </div>

        </>
    );
}

export default EditOrganizedHackathonDetails;
