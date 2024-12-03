import { useState } from "react";
import ChatPage from "../ChatPages/ChatPage";
import Header from "../../components/Header";
import EditSponsorsDetails from "../../components/SponsorComponents/EditSponsorsDetails";
import ReactingNavBar from "../../components/ReactingNavBar";
const token = localStorage.getItem('data');

function SponsorsDashboard() {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <div className="flex">

                <ReactingNavBar />

                <div className="space-y-3 size-full">
                    <Header />
                    <div className='flex justify-center mt-2 min-h-screen bg-[#0f172a]'>
                        <div className="edit-selection-card mt-[40px]">
                            <div className='edit-choice-card'>
                                <button
                                    onClick={() => setSelected(0)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 0 ? 'active' : ''}`}>
                                    Details
                                </button>
                                <button
                                    onClick={() => setSelected(1)}
                                    className={`edit-choice-btn text-2xl font-thin block mt-5 px-5 ${selected === 2 ? 'active' : ''}`}>
                                    Chatbox
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            {selected === 0 && (
                                <div className='editCard mt-[40px]'>
                                    <EditSponsorsDetails />
                                </div>
                            )}
                            {selected === 1 && (
                                <ChatPage flag="true" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SponsorsDashboard