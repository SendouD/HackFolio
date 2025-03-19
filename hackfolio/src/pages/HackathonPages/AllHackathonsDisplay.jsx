"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard"
import Header from "../../components/Header"
import ReactingNavBar from "../../components/ReactingNavBar"

function AllHackathonsDisplay() {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  async function getData(pageNo) {
    if (pageNo < 1 || pageNo > totalPages) return
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?page=${pageNo}&limit=6`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.status === 403) navigate("/Error403")
      if (!response.ok) throw new Error("Network response was not ok")

      const data = await response.json()
      setData(data.hackathons)
      setPage(data.currentPage)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData(1)
  }, [])

  async function handleSearch(query) {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?search=${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      if (!response.ok) throw new Error("Network response was not ok")

      const data = await response.json()
      setData(data.hackathons)
      setPage(1)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error searching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) handleSearch(searchQuery)
      else getData(1)
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-neutral-600">No hackathons found</h3>
            <p className="text-neutral-500 mt-2">Try a different search term or check back later</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {data.map((element, i) => (
              <motion.div key={i} variants={itemVariants}>
                <HackathonsDisplayCard data={element} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => getData(page - 1)}
                disabled={page === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-neutral-200 bg-white text-sm font-medium ${page === 1 ? "text-neutral-300 cursor-not-allowed" : "text-neutral-700 hover:bg-neutral-50"}`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => getData(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === i + 1
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => getData(page + 1)}
                disabled={page === totalPages}
                className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-neutral-200 bg-white text-sm font-medium ${page === totalPages ? "text-neutral-300 cursor-not-allowed" : "text-neutral-700 hover:bg-neutral-50"}`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllHackathonsDisplay