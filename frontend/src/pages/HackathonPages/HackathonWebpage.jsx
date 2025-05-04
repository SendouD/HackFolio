"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import HackathonDetailsDisplay from "../../components/HackathonComponents/HackathonDetailsDisplay"
import HackathonTimingsDisplay from "../../components/HackathonComponents/HackathonTimingsDisplay"
import Header from "../../components/Header"
import ReactingNavBar from "../../components/ReactingNavBar"

function HackathonWebpage() {
  const { name } = useParams()

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const decorativeLineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ReactingNavBar />
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <Header />

        {/* Decorative elements */}
        <div className="fixed bottom-20 right-20 opacity-20 pointer-events-none z-0">
          <motion.svg
            className="w-40 h-40"
            viewBox="0 0 100 100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M10 10 Q 50 50, 90 10"
              fill="transparent"
              stroke="#6366f1"
              strokeWidth="2"
              variants={decorativeLineVariants}
            />
          </motion.svg>
        </div>

        <div className="fixed bottom-40 right-40 opacity-20 pointer-events-none z-0">
          <motion.svg
            className="w-40 h-40"
            viewBox="0 0 100 100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.path
              d="M10 90 C 30 60, 70 60, 90 90"
              fill="transparent"
              stroke="#8b5cf6"
              strokeWidth="2"
              variants={decorativeLineVariants}
            />
          </motion.svg>
        </div>

        {/* Main content */}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <HackathonDetailsDisplay name={name} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <HackathonTimingsDisplay id={name} flag={1} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HackathonWebpage