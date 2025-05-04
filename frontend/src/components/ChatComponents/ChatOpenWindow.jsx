import { useEffect, useRef, useState } from "react";

function ChatOpenWindow(props) {
    const inpRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const msgsEndRef = useRef(null);
    const token = localStorage.getItem('data');

    useEffect(() => {
        getMessages();
    }, [props.currUser]);

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/messages/${props.currUser}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            setMessages(data.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function sendMessage(e) {
        e.preventDefault();
        const message = inpRef.current.value;
        if (!message.trim()) return;
        
        inpRef.current.value = "";
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/messages/${props.currUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message}),
                credentials: 'include',
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

    function padZero(str, flag) {
        if(str === 0 && flag === 1) str = (12).toString();
        else if(str > 0 && str < 10 ) str = '0' + (str).toString();

        return str;
    }
    
    function ChatBox(props) {
        let milliseconds = Number(props.message.timestamp);
        let date = new Date(milliseconds);
        let utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        let istOffset = 5 * 60 + 30;
        let istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);

        let time = padZero((istDate.getHours())%12, 1) + ":" + padZero(istDate.getMinutes(), 2);
        if(istDate.getHours() >= 12) time += " pm";
        else time += " am";
        
        const isCurrentUser = JSON.parse(token).email === props.message.from;
        
        return (
            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-3`}>
                <div className={`max-w-[70%] rounded-lg px-4 py-2 ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <div className={`text-sm font-medium mb-1 ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {props.message.from}
                    </div>
                    <div className="break-words">
                        {props.message.message}
                    </div>
                    <div className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {time}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-50 p-3 border-b border-gray-100 font-medium">
                {props.currUser}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-white">
                {messages.map((message, i) => (
                    <ChatBox key={i} message={message} />
                ))}
                <div ref={msgsEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex p-3 border-t border-gray-100">
                <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded-l py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Type a message..."
                    ref={inpRef}
                />
                <button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r transition-colors"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatOpenWindow;