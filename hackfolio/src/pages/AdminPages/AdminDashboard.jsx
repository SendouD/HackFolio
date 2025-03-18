"use client"
import React, { useState } from 'react'
import SponsorComp from '@/components/AdminDashboard/SponsorComp'
import AdminHackathonsComp from '@/components/AdminDashboard/HackathonsComponent'
import Header from '@/components/Header'
import ReactingNavBar from '@/components/ReactingNavBar'

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('hackathons')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='fixed'>
        <ReactingNavBar />
      </div>
      <Header />
      <div className="px-4 py-6">
        <div className="mb-6">
          <div className="flex rounded-md shadow-sm justify-center" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                activeComponent === 'hackathons' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setActiveComponent('hackathons')}
            >
              Hackathons
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                activeComponent === 'sponsors' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setActiveComponent('sponsors')}
            >
              Sponsors
            </button>
          </div>
        </div>

        {activeComponent === 'hackathons' && <AdminHackathonsComp />}
        {activeComponent === 'sponsors' && <SponsorComp />}
      </div>
    </div>
  )
}

export default AdminDashboard