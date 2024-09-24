import { useEffect, useRef, useState } from "react";
const token = localStorage.getItem('data');
import io from 'socket.io-client';

function ChatOpenWindow(props) {
    const inpRef = useRef(null);
    const [messages,setMessages] = useState([]);
    const msgsEndRef = useRef(null);

    useEffect(() => {
        getMessages();
    },[props.currUser]);

    useEffect(() => {
        if (props.newMessage) {
            setMessages(prevMessages => [...prevMessages, props.newMessage]);
        }
    }, [props.newMessage]);

    useEffect(() => {
        if (msgsEndRef.current) msgsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function getMessages() {
        try {
            const response = await fetch(`/api/chat/messages/${props.currUser}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            console.log(data);
            setMessages(data.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function sendMessage(e) {
        e.preventDefault();
        const message = inpRef.current.value;
        inpRef.current.value = ""
        try {
            const response = await fetch(`/api/chat/messages/${props.currUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(await response.json())
            const msg = {
                from: JSON.parse(token).email,
                to: props.currUser,
                message: message,
                timestamp: Date.now(),
                readStatus: false,
            }
            if(msg.from !== msg.to) setMessages(prev => [...prev,msg]);
            props.socket.emit('chatMessage', msg);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    
    function ChatBox(props) {
        let milliseconds = Number(props.message.timestamp);
        let date = new Date(milliseconds);
        let utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        let istOffset = 5 * 60 + 30;
        let istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);

        let time = (istDate.getHours())%12 + ":" + istDate.getMinutes();
        if(istDate.getHours() >= 12) time += " pm";
        else time+=" am";
        
        return(
            <div className={(JSON.parse(token).email === props.message.from) ? 'flex justify-end items-center' : ''}>
                {
                    (JSON.parse(token).email === props.message.from) ? <div className="bg-white h-[30px] w-[30px] rounded-[20px] text-center mr-[5px] cursor-pointer">...</div> : <></>
                }
                <span className="bg-white p-4 pb-2 inline-block rounded mt-[10px] max-w-[43vw] text-wrap break-words">
                    <div>
                        <div className={`text-xl font-bold flex justify-start`}>
                            {props.message.from}
                        </div>
                        {props.message.message}
                    </div>
                    <div className="flex justify-end font-medium">
                        {time}
                    </div>
                </span>
            </div>

        );
    }

    return(
        <>
            <div className="h-full flex flex-col justify-between">
                <div className="bg-white p-4 rounded-bl-[5px] rounded-br-[5px] rounded-tr-[5px] text-2xl font-bold">
                    {props.currUser}
                </div>
                <div className="h-full p-4 overflow-y-scroll">
                    {
                        messages.map((message,i) => {
                            return <ChatBox key={i} message={message}/>;
                        })
                    }
                    <div ref={msgsEndRef} />
                </div>
                <form onSubmit={(e) => sendMessage(e)} className="flex justify-center items-center">
                    <input
                        type="text"
                        className="w-[89%] text-2xl py-2 px-4 mb-4 rounded-s"
                        ref={inpRef}
                    />
                    <button className="mb-4 bg-gray-600  text-white px-6 py-3 rounded-e-[10px]" type="submit">{'>'}</button>
                </form>
            </div>
        </>
    );
}

export default ChatOpenWindow