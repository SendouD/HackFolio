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
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="w-50">
                    <div className="flex justify-end">
                        <button onClick={props.setFalse} className="text-red-600 text-3xl font-bold transition-all">&#215;</button>
                    </div>
                    <div className="block">
                        <input name="hackName" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" placeholder="Hackathon Name: " onChange={(e)=>setHackName(e.target.value)}/>
                        <input name="uniName" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" placeholder="University you are representing?" onChange={(e)=>setUniName(e.target.value)}/>
                        <button className="block" onClick={handleClick}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Org_form;
