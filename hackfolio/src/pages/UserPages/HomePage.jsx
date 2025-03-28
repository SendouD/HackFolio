"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import gsap from "gsap"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ReactingNavBar from "../../components/ReactingNavBar"
import HackList from "../../components/HomeComponents/Hacklist"
import DisplaySponsor from "../../components/SponsorComponents/DisplaySponers"
import ProjectsHackathonsSection from "../../components/HomeComponents/ProjectsHackathonsSection"

import "../../styles/Homepage.css"

const HomePage = () => {
  useEffect(() => {
    // GSAP ScrollTrigger Animations
    gsap.fromTo(
      ".scroll-section",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".scroll-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      },
    )
  }, [])

  return (
    <div className="body min-h-screen">
      <div className="flex">
        <ReactingNavBar />
        <div className="w-full bg-gradient-to-tr from-purple-200 via-blue-100 to-white overflow-hidden">
          {/* Header */}
          <Header />

          {/* Hero Section */}
          <motion.section
            className=" h-150 scroll-section py-20 px-6 sm:px-10 bg-gradient-to-tr from-purple-300 via-blue-100 to-purple-200  text-[#0f172a]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left Section: Text Content */}
                <div className="flex flex-col justify-center text-center md:text-left z-10">
                  <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-tight tracking-tight text-[#0f172a]">
                    Create and Join Hackathons with <span className="text-[#5f3abd]">HackQuest</span>
                  </h1>
                  <p className="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-400 dark:text-gray-400 text-gray-500">
                    Collaborate, innovate, and bring your ideas to life by creating or participating in hackathons.
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
                    <a
                      href="/userProjects"
                      className="rounded-lg p-4 text-center bg-[#5f3abd] text-white font-bold uppercase text-sm tracking-widest hover:bg-[#3f40bb] transition ease-in-out duration-300 shadow-lg hover:shadow-xl"
                    >
                      Create a Project
                    </a>
                    <a
                      href="/hackathons"
                      className="rounded-lg p-4 text-center border-2 border-[#5f3abd] text-[#5f3abd] font-bold uppercase text-sm tracking-widest hover:bg-[#5f3abd] hover:text-white transition ease-in-out duration-300 shadow-lg hover:shadow-xl"
                    >
                      Join a Hackathon
                    </a>
                  </div>
                </div>

                {/* Right Section: Visual Block */}
                <motion.div
                  className="relative flex items-center sm:m-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-10 md:-top-20 -left-10 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-[#5f3abd] rotate-12 rounded-lg border-[#3f40bb] border-b-4 border-r-8 max-sm:hidden"></div>
                  <div className="relative z-10 bg-[#3f40bb] p-4 sm:p-6 -right-1/2 -translate-x-1/2 grow text-center shadow-2xl -rotate-2 rounded-xl text-nowrap border-slate-950 border-b-4 border-r-8">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">Innovate & Collaborate</h2>
                    <p className="mt-1 text-sm sm:text-base font-light text-gray-200">
                      Empower your team with hackathons that challenge and shape the future.
                    </p>
                  </div>
                  <div className="absolute -bottom-10 md:-bottom-20 -right-16 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-[#5f3abd] -rotate-12 rounded-lg border-[#3f40bb] border-r-4 border-b-8 max-sm:hidden"></div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Now Happening Section */}
          <motion.section
            className="py-20 px-6 sm:px-10 bg-gradient-to-b from-[#a5b4fc] via-white to-[#a5b4fc]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-center text-[#0f172a] pb-10 text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold uppercase leading-tight tracking-tight">
                Now Happening!!
              </h1>
              <div className="pb-10">
                <HackList />
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link className="relative" to="/hackathons">
                  <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-[black]"></span>
                  <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-[#a1a1aa] hover:text-gray-900">
                    See More...
                  </span>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            className="py-10 px-3 sm:px-5 bg-gradient-to-tr from-purple-200 via-blue-100 to-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <ProjectsHackathonsSection />
            </div>
          </motion.section>

          {/* Sponsors Section */}
          <motion.section
            className=" bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-h-5xl mx-auto">
              <DisplaySponsor />
            </div>
          </motion.section>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default HomePage

