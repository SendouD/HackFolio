"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import HackathonProjectDispay from "./Hackathon_projects"

function HackathonDetailsDisplay() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    imageUrl: "",
    aboutHack: "",
    aboutPrize: "",
    otherFields: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWebInfo()
  }, [])

  async function getWebInfo() {
    setLoading(true)
    try {
      const response = await fetch(`${__BACKEND_URL__}/api/hackathon/getHackWebsite/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.status === 403) navigate("/Error403")
      if (!response.ok) throw new Error("Network response was not ok")

      const arr = await response.json()
      setData(arr.data)
      setFormData({
        imageUrl: arr.data.imageUrl,
        aboutHack: arr.data.aboutHack,
        aboutPrize: arr.data.aboutPrize,
        otherFields: arr.data.otherFields || [],
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "details" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
          {activeTab === "details" && (
            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" layoutId="activeTab" />
          )}
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "projects" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Submitted Projects
          {activeTab === "projects" && (
            <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" layoutId="activeTab" />
          )}
        </button>
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      <motion.div key={activeTab} initial="hidden" animate="visible" variants={contentVariants}>
        {activeTab === "details" ? (
          <div className="space-y-8">
            {formData.imageUrl && (
              <div className="flex justify-center">
                <img
                  src={formData.imageUrl || "/placeholder.svg"}
                  alt="Hackathon Poster"
                  className="max-h-96 object-contain rounded-lg shadow-sm"
                />
              </div>
            )}

            {formData.aboutHack && (
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800">About Hackathon</h2>
                <div className="prose prose-indigo max-w-none text-gray-600 whitespace-pre-wrap">
                  {formData.aboutHack}
                </div>
              </div>
            )}

            {formData.aboutPrize && (
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800">Prizes</h2>
                <div className="prose prose-indigo max-w-none text-gray-600 whitespace-pre-wrap">
                  {formData.aboutPrize}
                </div>
              </div>
            )}

            {formData.otherFields &&
              formData.otherFields.map((field, i) => (
                <div key={i} className="space-y-3">
                  <h2 className="text-2xl font-semibold text-gray-800">{field.key}</h2>
                  <div className="prose prose-indigo max-w-none text-gray-600 whitespace-pre-wrap">{field.value}</div>
                </div>
              ))}
          </div>
        ) : (
          <HackathonProjectDispay />
        )}
      </motion.div>
    </div>
  )
}

export default HackathonDetailsDisplay