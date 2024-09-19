import React from "react";

const Header=()=>{
    return(
        <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Hackfolio</div>
          <div className="space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Profile</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Hackathons</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Badges</a>
            <a href="#" className="text-blue-600 hover:text-blue-800">Projects</a>
          </div>
          <div className="text-gray-600">sendou</div>
        </nav>
      </header>


    )
}
export default Header