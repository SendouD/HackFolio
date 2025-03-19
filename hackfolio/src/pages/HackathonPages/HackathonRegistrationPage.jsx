import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import HackathonRegistrationForm from '../../components/HackathonComponents/HackathonRegistrationForm';
import HackathonLinks from '../../components/HackathonComponents/HackathonLinks';
import HackathonTimelineDescription from '../../components/HackathonComponents/HackathonTimelineDescription';
import HackathonPrizesDescription from '../../components/HackathonComponents/HackathonPrizesDescription';
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';

function HackathonRegistrationPage() {
    const [selection, setSelection] = useState(0);
    const { name } = useParams();

    return (
        <div className="flex h-screen bg-gradient-to-tr from-purple-200 via-blue-100 to-white">
            <ReactingNavBar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Content Panel */}
                            <div className="lg:col-span-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                                >
                                    <div className="p-6 bg-white">
                                        <h1 className="text-2xl font-semibold mb-4 text-gray-800">{name}</h1>
                                         <HackathonRegistrationForm />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Sidebar */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                                >
                                    <div className="p-6">
                                        <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                            <span className="mr-2">⏱️</span> Hackathon Timeline
                                        </h2>
                                        <HackathonTimingsDisplay id={name} flag={2} />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default HackathonRegistrationPage;
