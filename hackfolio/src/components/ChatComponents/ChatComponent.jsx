import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatSelectionWindow from "./ChatSelectionWindow";
import ChatOpenWindow from "./ChatOpenWindow";
const token = localStorage.getItem('data');

function ChatComponent() {
    const [currUser, setCurrUser] = useState(JSON.parse(token).email);
    const [socket, setSocket] = useState(null);
    const [newMessage,setNewMessage] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000",{
            transports: ["websocket"],
            auth: {
                token
            },
            withCredentials: true
        });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('disconnect', async () => {
            try {
                const response = await fetch(`/api/chat/disconnect`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setData(data);
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
        if(socket) {
            socket.on('chatMessage', (msg) => {
                if(msg.from === currUser || msg.to === JSON.parse(token).email) setNewMessage(msg);
            });
        }

        return() => {
            
        }
    },[socket,currUser]);


    return (
        <div className="flex justify-center items-center mt-[40px]">
            <div className="h-[800px] w-[300px] bg-gray-200 rounded-s-[10px] shadow">
                <ChatSelectionWindow setCurrUser={setCurrUser}/>
            </div>
            <div className="h-[800px] w-[1000px] bg-gray-800 rounded-e-[10px] shadow">
                <ChatOpenWindow currUser={currUser} newMessage={newMessage} socket={socket}/>
            </div>
        </div>
    );
}

export default ChatComponent;
