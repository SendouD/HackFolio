import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import About from "../../components/EditPageComponents/EditAbout";
import Education from "../../components/EditPageComponents/EditEducation";
import Links from "../../components/EditPageComponents/EditLinks";
import Contacts from "../../components/EditPageComponents/EditContacts";

import ReactingNavBar from "../../components/ReactingNavBar";

const EditPage = () => {
    const [activeTab, setActiveTab] = useState('about');

    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <About />;
            case 'education':
                return <Education />;
            case 'links':
                return <Links />;
            case 'contacts':
                return <Contacts />;
            default:
                return <About />;
        }
    };

    return (
        <>
            <div className="flex bg-slate-900 min-h-screen text-white">
                <ReactingNavBar />
                <div className="space-y-3 size-full w-full">
                    <div className="space-y-4">
                        {/* Header Component */}
                        <div>
                            <Header />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="bg-slate-800 shadow">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                                <div className="space-x-11">
                                    <button
                                        onClick={() => setActiveTab('about')}
                                        className={`p-2 ${activeTab === 'about' ? 'text-blue-500 font-bold border-b-2 border-blue-500' : ''}`}
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('education')}
                                        className={`p-2 ${activeTab === 'education' ? 'text-blue-500 font-bold border-b-2 border-blue-500' : ''}`}
                                    >
                                        Education
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('links')}
                                        className={`p-2 ${activeTab === 'links' ? 'text-blue-500 font-bold border-b-2 border-blue-500' : ''}`}
                                    >
                                        Links
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('contacts')}
                                        className={`p-2 ${activeTab === 'contacts' ? 'text-blue-500 font-bold border-b-2 border-blue-500' : ''}`}
                                    >
                                        Contacts
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content Rendering */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="bg-white p-6 shadow-md rounded-lg text-black">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPage;
