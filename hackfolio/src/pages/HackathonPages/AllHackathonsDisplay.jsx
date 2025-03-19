"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard"
import Header from "../../components/Header"
import ReactingNavBar from "../../components/ReactingNavBar"

function AllHackathonsDisplay() {
  const [activeData, setActiveData] = useState([])
  const [endedData, setEndedData] = useState([])
  const [activeTotalPages, setActiveTotalPages] = useState(1)
  const [endedTotalPages, setEndedTotalPages] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const [endedPage, setEndedPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isActiveLoading, setIsActiveLoading] = useState(true)
  const [isEndedLoading, setIsEndedLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active") // To track which tab is active: "active" or "ended"
  const navigate = useNavigate()

  async function getActiveData(pageNo) {
    if (pageNo < 1 || pageNo > activeTotalPages) return
    setIsActiveLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?page=${pageNo}&limit=6`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 403) navigate("/Error403")
      if (!response.ok) throw new Error("Network response was not ok")

      const data = await response.json()
      setActiveData(data.hackathons)
      setActivePage(data.currentPage)
      setActiveTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching active hackathons:", error)
    } finally {
      setIsActiveLoading(false)
    }
  }

  async function getEndedData(pageNo) {
    if (pageNo < 1 || pageNo > endedTotalPages) return
    setIsEndedLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/endedHackathons?page=${pageNo}&limit=6`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 403) navigate("/Error403")
      if (!response.ok) throw new Error("Network response was not ok")

      const data = await response.json()
      setEndedData(data.hackathons)
      setEndedPage(data.currentPage)
      setEndedTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching ended hackathons:", error)
    } finally {
      setIsEndedLoading(false)
    }
  }

  useEffect(() => {
    getActiveData(1)
    getEndedData(1)
  }, [])

  async function handleSearch(query) {
    setIsActiveLoading(true)
    setIsEndedLoading(true)
    try {
      // Search active hackathons
      const activeResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?search=${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!activeResponse.ok) throw new Error("Network response was not ok")
      const activeData = await activeResponse.json()
      setActiveData(activeData.hackathons)
      setActivePage(1)
      setActiveTotalPages(activeData.totalPages)

      // Search ended hackathons
      const endedResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/endedHackathons?search=${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!endedResponse.ok) throw new Error("Network response was not ok")
      const endedData = await endedResponse.json()
      setEndedData(endedData.hackathons)
      setEndedPage(1)
      setEndedTotalPages(endedData.totalPages)
    } catch (error) {
      console.error("Error searching data:", error)
    } finally {
      setIsActiveLoading(false)
      setIsEndedLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) handleSearch(searchQuery)
      else {
        getActiveData(1)
        getEndedData(1)
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Animation variants for staggered card appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="flex relative min-h-screen bg-neutral-50">
      <ReactingNavBar />
      <div className="w-full px-4 md:px-6 lg:px-8 pb-12">
        <Header />

        {/* Search Bar */}
        <div className="flex justify-center my-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl text-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
              placeholder="Search for hackathons"
            />
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg border border-neutral-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "active"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Active Hackathons
            </button>
            <button
              onClick={() => setActiveTab("ended")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "ended"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Ended Hackathons
            </button>
          </div>
        </div>

        {/* Active Hackathons Section */}
        {activeTab === "active" && (
          <>
            {isActiveLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : activeData.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-neutral-600">No active hackathons found</h3>
                <p className="text-neutral-500 mt-2">Try a different search term or check back later</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {activeData.map((element, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <HackathonsDisplayCard data={element} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Active Hackathons Pagination */}
            {activeTotalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => getActiveData(activePage - 1)}
                    disabled={activePage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-neutral-200 bg-white text-sm font-medium ${activePage === 1 ? "text-neutral-300 cursor-not-allowed" : "text-neutral-700 hover:bg-neutral-50"}`}
                  >
                    Previous
                  </button>

                  {[...Array(activeTotalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => getActiveData(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        activePage === i + 1
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => getActiveData(activePage + 1)}
                    disabled={activePage === activeTotalPages}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-neutral-200 bg-white text-sm font-medium ${activePage === activeTotalPages ? "text-neutral-300 cursor-not-allowed" : "text-neutral-700 hover:bg-neutral-50"}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}

        {/* Ended Hackathons Section */}
        {activeTab === "ended" && (
          <>
            {isEndedLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : endedData.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-neutral-600">No ended hackathons found</h3>
                <p className="text-neutral-500 mt-2">Try a different search term or check back later</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {endedData.map((element, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <HackathonsDisplayCard data={element} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Ended Hackathons Pagination */}
            {endedTotalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => getEndedData(endedPage - 1)}
                    disabled={endedPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-neutral-200 bg-white text-sm font-medium ${endedPage === 1 ? "text-neutral-300 cursor-not-allowed" : "text-neutral-700 hover:bg-neutral-50"}`}
                  >
                    Previous
                  </button>

                  {[...Array(endedTotalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => getEndedData(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        endedPage === i + 1
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => getEndedData(endedPage + 1)}
                    disabled={endedPage === endedTotalPages}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-neutral-200 bg-white text-sm font-medium ${endedPage === endedTotalPages ? "text-neutral-300 cursor-not-allowed" : "text-neutral-700 hover:bg-neutral-50"}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AllHackathonsDisplay