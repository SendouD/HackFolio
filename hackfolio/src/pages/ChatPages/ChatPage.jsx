"use client"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import ChatComponent from "../../components/ChatComponents/ChatComponent"
import NotificationsComponent from "../../components/ChatComponents/NotificationsComponent"
import Header from "../../components/Header"
import ReactingNavBar from "../../components/ReactingNavBar"

const ChatPage = (props) => {
  const location = useLocation()
  const token = localStorage.getItem("data")
  const storedToken = token ? JSON.parse(token).email : null
  const initialUser = location.state?.currUser || storedToken
  const [currUser, setCurrUser] = useState(initialUser)
  const [flag, setFlag] = useState(false)

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar Navigation */}
      <ReactingNavBar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        {!props.flag && <Header />}
        
        {/* Main Chat Area */}
        <main className="flex-1 p-4 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row gap-4">
            <div className="flex-grow lg:w-3/4 h-[calc(100vh-200px)] lg:h-auto">
              <ChatComponent 
                currUser={currUser} 
                setCurrUser={setCurrUser} 
                setFlag={setFlag} 
                flag={flag} 
              />
            </div>
            <div className="lg:w-1/4 h-[calc(100vh-200px)] lg:h-auto">
              <NotificationsComponent 
                flag={flag} 
                currUser={currUser} 
                setCurrUser={setCurrUser} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ChatPage