import ChatComponent from "../../components/ChatComponents/ChatComponent";
import NotificationsComponent from "../../components/ChatComponents/NotificationsComponent";
import Header from "../../components/Header"

function ChatPage() {


    return (
        <>
            <Header/>
            <div className="flex justify-end mt-[40px]">
                    <ChatComponent/>

                    <NotificationsComponent />
            </div>
        </>
    );
}

export default ChatPage