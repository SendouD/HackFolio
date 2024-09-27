import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatSelectionWindow from "./ChatSelectionWindow";
import ChatOpenWindow from "./ChatOpenWindow";
const token = localStorage.getItem('data');

function ChatComponent(props) {
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
        console.log(socket);

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

    },[socket,props.currUser]);

    async function msgstatus() {
        try {
            const response = await fetch(`/api/chat/changeReadStatus/${props.currUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }



    return (
        <div className="flex justify-center items-center">
            <div className="h-[800px] w-[300px] bg-white rounded-s-[10px] shadow">
                <ChatSelectionWindow setCurrUser={props.setCurrUser}/>
            </div>
            <div className="h-[800px] w-[1000px] bg-white rounded-e-[10px] shadow">
                <ChatOpenWindow currUser={props.currUser} newMessage={newMessage} socket={socket}/>
            </div>
        </div>
    );
}

export default ChatComponent;
