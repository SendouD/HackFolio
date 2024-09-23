import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const token = localStorage.getItem('data');

function ChatComponent() {
    const [currUser, setCurrUser] = useState("");
    const [data, setData] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000",{
            transports: ["websocket"],
            auth: {
                token
            }
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
            newSocket.disconnect(); 
        };
    }, []);

    useEffect(() => {
        getInfo();
    }, []);

    async function getInfo() {
        // try {
        //     const response = await fetch(`/api/chat/initialize`);
        //     if (!response.ok) throw new Error('Network response was not ok');
        //     const data = await response.json();
        //     setData(data);
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
    }

    return (
        <div className="flex justify-center items-center mt-[20px]">
            <div className="h-[800px] w-[300px] bg-gray-200 rounded-s-[10px]">
                
            </div>
            <div className="h-[800px] w-[1000px] bg-gray-800 rounded-e-[10px]">
                
            </div>
        </div>
    );
}

export default ChatComponent;
