"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import LoadingPage from "../loading"

function HackathonTimingsDisplay(props) {
  const { name } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isJudge, setIsJudge] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [flag, setFlag] = useState(0)

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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/hackathonProject/${name}`, {
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
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/getHackDetails/${name}`, {
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
    }
  }

  async function checkIfRegistered() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/checkRegistration/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (response.status === 403) navigate("/Error403")
      if (!response.ok) throw new Error("Network response was not ok")
      const data1 = await response.json()
      if (new Date(data.fromDate) < new Date() && !data1.flag && flag < 7) setFlag(7)
      setRegistered(data1.flag)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  async function checkIfJudge() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/judge/isjudge/${name}`, {
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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/create`, {
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
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/project/getProject/${name}`, {
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

  if (data === null) return <LoadingPage />

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className=" rounded-lg shadow p-6 bg-gradient-to-tr from-blue via-blue-100 to-white">
      <div className="flex items-center gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <h2 className="text-lg font-medium">Hackathon Timeline</h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-center bg-purple-100 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-700"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Start Date</p>
              <p className="font-medium text-gray-800">{formatDate(data.fromDate)}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-6 w-px bg-gray-200"></div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-center bg-purple-100 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-700"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">End Date</p>
              <p className="font-medium text-gray-800">{formatDate(data.toDate)}</p>
            </div>
          </div>
        </div>

        {props.flag === 1 && (
          <div className="space-y-3 pt-4">
            <button
              className="w-full bg-[#5f3abd] hover:bg-[#4d2f97] text-white py-4 px-4 rounded font-semibold transition-colors"
              onClick={handleClick}
              disabled={flag === 10 || flag === 7}
            >
              {flag === 10
                ? "Hackathon Ended"
                : flag === 7
                  ? "Registration Ended"
                  : flag === 2
                    ? "Edit project"
                    : flag === 1
                      ? "Submit project"
                      : registered
                        ? "Go to dashboard"
                        : "Apply now"}
            </button>

            {isJudge && (
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded font-semibold transition-colors mt-4"
                onClick={() => navigate(`/hackathon/${name}/judgeDashboard`)}
              >
                Judge Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HackathonTimingsDisplay

