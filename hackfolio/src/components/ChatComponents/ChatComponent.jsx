import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatSelectionWindow from "./ChatSelectionWindow";
import ChatOpenWindow from "./ChatOpenWindow";
const token = localStorage.getItem('data');

function ChatComponent(props) {
    const {currUser,setCurrUser} = props;
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

        newSocket.on('chatMessage', (msg) => {
            console.log(msg.to === JSON.parse(token).email && msg.from === currUser);
            props.setFlag(prev => !prev);
            if(msg.to === JSON.parse(token).email && msg.from === currUser) setNewMessage(msg);
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

        async function msgstatus() {
            try {
                const response = await fetch(`/api/chat/changeReadStatus/${currUser}`, {
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

        msgstatus();

    },[socket,currUser]);



    return (
        <div className="flex justify-center items-center">
            <div className="h-[800px] w-[300px] bg-white rounded-s-[10px] shadow">
                <ChatSelectionWindow setCurrUser={setCurrUser}/>
            </div>
            <div className="h-[800px] w-[1000px] bg-white rounded-e-[10px] shadow">
                <ChatOpenWindow currUser={currUser} newMessage={newMessage} socket={socket}/>
            </div>
        </div>
    );
}

export default ChatComponent;
