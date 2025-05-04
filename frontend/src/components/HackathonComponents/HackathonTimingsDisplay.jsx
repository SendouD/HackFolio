"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Calendar, Clock, Award, ChevronRight } from "lucide-react"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )
}

function HackathonTimingsDisplay(props) {
  const { name } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isJudge, setIsJudge] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [flag, setFlag] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInfo()
  }, [])

  useEffect(() => {
    if (data) {
      checkIfJudge()
      getIfSubmitted()
      checkIfRegistered()
    }
  }, [data])

  async function getIfSubmitted() {
    try {
      const response = await fetch(`${__BACKEND_URL__}/api/project/hackathonProject/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (response.status === 403) navigate("/Error403")
      if (!response.ok) return
      const arr = await response.json()
      if (arr.flag === true && flag < 3) {
        setFlag(2)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  async function getInfo() {
    setLoading(true)
    try {
      const response = await fetch(`${__BACKEND_URL__}/api/hackathon/getHackDetails/${name}`, {
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
      const currTime = new Date()
      const fromTime = new Date(arr.data.fromDate)
      const toTime = new Date(arr.data.toDate)
      if (currTime > toTime && flag < 10) setFlag(10)
      else if (currTime > fromTime && flag < 2) setFlag(1)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  async function checkIfRegistered() {
    try {
      const response = await fetch(`${__BACKEND_URL__}/api/hackathon/checkRegistration/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (response.status === 403) navigate("/Error403")
      if (!response.ok) throw new Error("Network response was not ok")
      const data1 = await response.json()
      if (data && new Date(data.fromDate) < new Date() && !data1.flag && flag < 7) setFlag(7)
      setRegistered(data1.flag)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  async function checkIfJudge() {
    try {
      const response = await fetch(`${__BACKEND_URL__}/api/judge/isjudge/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (response.ok) {
        setIsJudge(true)
      } else {
        setIsJudge(false)
      }
    } catch (error) {
      console.error("Error checking judge status:", error)
    }
  }

  async function handleClick() {
    if (flag === true) {
      navigate(`/hackathon/${name}/projectSubmission`)
    } else {
      try {
        const response = await fetch(`${__BACKEND_URL__}/api/hackathon/hackathonTeam/${name}/create`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        if (response.status === 403) navigate("/Error403")
        if (!response.ok) throw new Error("Network response was not ok")
        const arr = await response.json()
        if (flag === 0) {
          if (arr.flag === true) {
            navigate(`/hackathon/${name}/editRegistrationDetails`)
          } else {
            navigate(`/hackathon/${name}/register`)
          }
        } else if (flag === 1) {
          navigate(`/hackathon/${name}/projectSubmission`)
        } else if (flag === 2) {
          console.log(name)
          const response = await fetch(`${__BACKEND_URL__}/api/project/getProject/${name}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
          const data = await response.json()
          navigate(`/editprojectdetails/${data.projectId}`)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  }

  if (loading) return <LoadingSpinner />
  if (!data) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get status text and color
  const getStatusInfo = () => {
    const now = new Date()
    const startDate = new Date(data.fromDate)
    const endDate = new Date(data.toDate)

    if (now < startDate) {
      return {
        text: "Registration Open",
        color: "bg-green-100 text-green-800",
      }
    } else if (now > endDate) {
      return {
        text: "Hackathon Ended",
        color: "bg-gray-100 text-gray-800",
      }
    } else {
      return {
        text: "In Progress",
        color: "bg-indigo-100 text-indigo-800",
      }
    }
  }

  const status = getStatusInfo()

  // Get button text and style
  const getButtonInfo = () => {
    if (flag === 10) {
      return {
        text: "Hackathon Ended",
        disabled: true,
        style: "bg-gray-400 cursor-not-allowed",
      }
    } else if (flag === 7) {
      return {
        text: "Registration Ended",
        disabled: true,
        style: "bg-gray-400 cursor-not-allowed",
      }
    } else if (flag === 2) {
      return {
        text: "Edit Project",
        disabled: false,
        style: "bg-indigo-600 hover:bg-indigo-700",
      }
    } else if (flag === 1) {
      return {
        text: "Submit Project",
        disabled: false,
        style: "bg-indigo-600 hover:bg-indigo-700",
      }
    } else if (registered) {
      return {
        text: "Go to Dashboard",
        disabled: false,
        style: "bg-indigo-600 hover:bg-indigo-700",
      }
    } else {
      return {
        text: "Apply Now",
        disabled: false,
        style: "bg-indigo-600 hover:bg-indigo-700",
      }
    }
  }

  const buttonInfo = getButtonInfo()

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Hackathon Timeline</h2>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>{status.text}</span>
        </div>

        <div className="space-y-6">
          <div className="relative pl-8 pb-8 border-l-2 border-indigo-100">
            <div className="absolute -left-2 top-0">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-600">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="mb-1 flex items-center">
              <Calendar className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-gray-500">Start Date</span>
            </div>
            <p className="text-base font-medium text-gray-800">{formatDate(data.fromDate)}</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-2 top-0">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-600">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="mb-1 flex items-center">
              <Clock className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-gray-500">End Date</span>
            </div>
            <p className="text-base font-medium text-gray-800">{formatDate(data.toDate)}</p>
          </div>
        </div>
      </div>

      {props.flag === 1 && (
        <div className="px-6 pb-6 pt-2 space-y-3">
          <button
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors flex items-center justify-center ${buttonInfo.style}`}
            onClick={handleClick}
            disabled={buttonInfo.disabled}
          >
            {buttonInfo.text}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>

          {isJudge && (
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
              onClick={() => navigate(`/hackathon/${name}/judgeDashboard`)}
            >
              <Award className="w-4 h-4 mr-2" />
              Judge Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default HackathonTimingsDisplay