import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ChatComponent from "../../components/ChatComponents/ChatComponent";
import NotificationsComponent from "../../components/ChatComponents/NotificationsComponent";
import Header from "../../components/Header"
import ReactingNavBar from '../../components/ReactingNavBar';
const token = localStorage.getItem('data');

function ChatPage(props) {
    const location = useLocation();
    const storedToken = token ? JSON.parse(token).email : null;
    const initialUser = location.state?.currUser || storedToken;
    const [currUser, setCurrUser] = useState(initialUser);
    const [flag, setFlag] = useState(false);

    return (
        <>
            <div className="flex">

                <ReactingNavBar />

                <div className="space-y-3 size-full">
                    {
                        (!props.flag) ?
                            <Header /> :
                            <></>
                    }
                    <div className="flex justify-end mt-[40px]">
                        <ChatComponent currUser={currUser} setCurrUser={setCurrUser} setFlag={setFlag} flag={flag} />

                        <NotificationsComponent flag={flag} currUser={currUser} setCurrUser={setCurrUser} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatPage