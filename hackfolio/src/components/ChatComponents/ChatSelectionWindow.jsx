import { useEffect, useRef, useState } from "react";


function ChatSelectionWindow(props) {
    const [data,setData] = useState(null);
    const addInpRef = useRef(null);
    const msgsEndRef = useRef(null);

    useEffect(() => {
        getUsers();
    },[]);

    async function getUsers() {
        try {
            const response = await fetch(`/api/chat/getFriends`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setData(data.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleAdd(e) {
        e.preventDefault();
        const email = addInpRef.current.value;
        try {
            const response = await fetch(`/api/chat/addFriends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });
            console.log(await response.json())
            if (!response.ok) throw new Error('Network response was not ok');
            setData(prev => ({
                ...prev,
                interactedEmails: [...prev.interactedEmails, email]
            }));
            addInpRef.current.value = "";
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function SelectionCard(email,i) {

        return(
            <div className="flex justify-center items-center w-[95%] h-[70px] bg-white rounded mt-[10px] cursor-pointer hover:bg-gray-400 transition-all ease-in" key={i} onClick={() => props.setCurrUser(email)}>
                {email}
            </div>
        );
    }

    return(
        <div>
            <form onSubmit={(e) => handleAdd(e)} className="flex justify-center items-center">
                <input type="text" className="p-2 rounded text-xl w-[220px]" ref={addInpRef}/>
                <button className="text-4xl bg-white p-3 pt-[6px] rounded-[20px] m-[5px] hover:bg-gray-400 transition-all" type="submit">+</button>
            </form>
            <div className="flex justify-center overflow-y-scroll">
                <div className="w-[95%]">
                    {
                        data && data.interactedEmails.map((email,i) => {
                            return SelectionCard(email,i)
                        })
                    }
                    <div ref={msgsEndRef} />
                </div>
            </div>
        </div>
    );
}

export default ChatSelectionWindow