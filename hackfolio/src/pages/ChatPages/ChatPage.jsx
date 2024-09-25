import {useState} from 'react'
import ChatComponent from "../../components/ChatComponents/ChatComponent";
import NotificationsComponent from "../../components/ChatComponents/NotificationsComponent";
import Header from "../../components/Header"
const token = localStorage.getItem('data');

function ChatPage() {
    const [currUser, setCurrUser] = useState(JSON.parse(token).email);
    const [flag, setFlag] = useState(false);

    return (
        <>
            <Header/>
            <div className="flex justify-end mt-[40px]">
                    <ChatComponent currUser={currUser} setCurrUser={setCurrUser} setFlag={setFlag}/>

                    <NotificationsComponent flag={flag} currUser={currUser} setCurrUser={setCurrUser}/>
            </div>
        </>
    );
}

export default ChatPage