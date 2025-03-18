"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import ChatComponent from "../../components/ChatComponents/ChatComponent"
import NotificationsComponent from "../../components/ChatComponents/NotificationsComponent"
import Header from "../../components/Header"
import ReactingNavBar from "../../components/ReactingNavBar"
import { motion } from "framer-motion"

const ChatPage = (props) => {
  const location = useLocation()
  const token = localStorage.getItem("data")
  const storedToken = token ? JSON.parse(token).email : null
  const initialUser = location.state?.currUser || storedToken
  const [currUser, setCurrUser] = useState(initialUser)
  const [flag, setFlag] = useState(false)

  // Background decoration variants
  const decorationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 0.15,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        repeatDelay: 5,
      },
    }),
  }

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden bg-gradient-to-tr from-purple-200 via-blue-100 to-white">
      {/* Sidebar Navigation */}
      <ReactingNavBar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden ">
        {/* Header */}
        {!props.flag && <Header />}

        {/* Main Chat Area */}
        <main className="flex-1 p-4 md:p-6 overflow-hidden relative">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute rounded-full bg-blue-300/20 w-64 h-64"
              style={{ top: "5%", right: "10%" }}
              variants={decorationVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            />
            <motion.div
              className="absolute rounded-full bg-yellow-400/20 w-80 h-80"
              style={{ bottom: "10%", left: "5%" }}
              variants={decorationVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            />
            <motion.div
              className="absolute rounded-full bg-purple-400/20 w-40 h-40"
              style={{ top: "30%", left: "20%" }}
              variants={decorationVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            />
          </div>

          {/* Chat Container */}
          <motion.div
            className="chat-section relative z-10 h-full rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full flex flex-col lg:flex-row">
              {/* Chat and Notifications */}
              <div className="flex-1 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 p-6 overflow-hidden z-10">
                <div className="flex-grow lg:w-3/4 h-[calc(100vh-200px)] lg:h-auto">
                  <ChatComponent currUser={currUser} setCurrUser={setCurrUser} setFlag={setFlag} flag={flag} />
                </div>
                <div className="lg:w-1/4 h-[calc(100vh-200px)] lg:h-auto overflow-y-auto">
                  <NotificationsComponent flag={flag} currUser={currUser} setCurrUser={setCurrUser} />
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default ChatPage

