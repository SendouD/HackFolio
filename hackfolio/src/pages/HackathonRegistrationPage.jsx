import { useState } from 'react';
import HackathonRegistrationForm from "../components/HackathonRegistrationForm";
import HackathonLinks from "../components/HackathonLinks";
import HackathonTimelineDescription from "../components/HackathonTimelineDescription";
import HackathonPrizesDescription from "../components/HackathonPrizesDescription";
import Header from '../components/Header';

function HackathonRegistrationPage() {
    const [selection, setSelection] = useState(0);

    return(
        <>
            <Header></Header>
            <div className='flex justify-center items-center h-[150px] my-3 text-gray-500 text-xl'>
                <div className='bg-white p-6 rounded-[10px]'>
                    <div 
                        onClick={(e)=>setSelection(0)}
                        className={`cursor-pointer p-5 ${selection === 0 && 'text-blue-500 border p-[19px]'} rounded-[10px] hover:bg-gray-200`}
                    >
                        APPLICATION
                    </div>
                </div>
                <div className='flex bg-white p-6 ml-10 rounded-[10px]'>
                    <div 
                        onClick={(e)=>setSelection(1)}
                        className={`cursor-pointer p-5 ${selection === 1 && 'text-blue-500 border p-[19px]'} rounded-[10px] hover:bg-gray-200`}
                    >
                        LINKS
                    </div>
                    <div 
                        onClick={(e)=>setSelection(2)}
                        className={`cursor-pointer ml-10 p-5 ${selection === 2 && 'text-blue-500 border p-[19px]'} rounded-[10px] hover:bg-gray-200`}
                    >
                        TIMELINE
                    </div>
                    <div 
                        onClick={(e)=>setSelection(3)} 
                        className={`cursor-pointer ml-10 p-5 ${selection === 3 && 'text-blue-500 border p-[19px]'} rounded-[10px] hover:bg-gray-200`}
                    >
                        PRIZES
                    </div>      
                </div>
            </div>

            <div className='flex'>
                <div>
                    {selection === 0 && <HackathonRegistrationForm />}
                    {selection === 1 && <HackathonLinks />}
                    {selection === 2 && <HackathonTimelineDescription />}
                    {selection === 3 && <HackathonPrizesDescription />}
                </div>
                <div>
                    
                </div>
            </div>
        </>
    );
}

export default HackathonRegistrationPage