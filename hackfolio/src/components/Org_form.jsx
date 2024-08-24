import { useState } from "react"

function Org_form(props) {
    const [hackName,setHackName] = useState("")
    const [uniName,setUniName] = useState("") 

    async function handleClick() {
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({hackName,uniName}),
            });
            console.log(response);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <div className="font-bold text-4xl mb-4">Lets get you started</div>
                        <button onClick={props.setFalse} className="text-red-600 text-3xl font-bold transition-transform duration-300 transform hover:scale-110">
                            &#215;
                        </button>
                    </div>
                    <div className="space-y-4">
                        <input 
                            name="hackName" 
                            className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text"
                            placeholder="Hackathon Name" 
                            onChange={(e) => setHackName(e.target.value)} 
                        />
                        <input 
                            name="uniName" 
                            className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text" 
                            placeholder="University you are representing?" 
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
