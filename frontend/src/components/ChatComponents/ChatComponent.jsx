import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatSelectionWindow from "./ChatSelectionWindow";
import ChatOpenWindow from "./ChatOpenWindow";

function ChatComponent(props) {
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const token = localStorage.getItem('data');

    useEffect(() => {
        const newSocket = io(`${__BACKEND_URL__}`, {
            transports: ["websocket"],
            auth: { token },
            withCredentials: true
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('disconnect', async () => {
            try {
                const response = await fetch(`${__BACKEND_URL__}/api/chat/disconnect`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Network response was not ok');
                await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        return () => {
            newSocket.off('chatMessage');
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (msg) => {
            props.setFlag(prev => !prev);
            msgstatus();
            if (msg.to === JSON.parse(token).email && msg.from === props.currUser) {
                setNewMessage(msg);
            }
        };

        socket.on('chatMessage', handleMessage);

        return () => {
            socket.off('chatMessage', handleMessage);
        };
    }, [socket, props.currUser]);

    useEffect(() => {
        msgstatus();
    }, [socket, props.currUser]);

    async function msgstatus() {
        try {
            const response = await fetch(`${__BACKEND_URL__}/api/chat/changeReadStatus/${props.currUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Network response was not ok');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex-none bg-indigo-600 text-white p-3">
                <h2 className="text-xl font-medium">Chat</h2>
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/3 border-r border-gray-100 overflow-y-auto">
                    <ChatSelectionWindow setCurrUser={props.setCurrUser}/>
                </div>
                <div className="w-2/3 flex flex-col">
                    <ChatOpenWindow currUser={props.currUser} newMessage={newMessage} socket={socket}/>
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;