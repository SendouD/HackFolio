import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';
import EditHackathonRegistrationForm from '../../components/HackathonComponents/EditHackathonRegistrationForm';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';
import TeamFormation from '../../components/HackathonComponents/TeamFormation';
import TeamDisplay from '../../components/HackathonComponents/TeamDisplay';
import LoadingPage from '@/components/loading';

function EditRegisteredHackathonDetails() {
    const [inTeam, setInTeam] = useState(false);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    useEffect(() => {
        checkTeamStatus();
    }, []);

    async function checkTeamStatus() {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const arr = await response.json();
            setInTeam(!!arr.data.teamCode);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <ReactingNavBar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <LoadingPage />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <ReactingNavBar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                    <motion.div 
                        className="max-w-7xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="mb-6">
                            <motion.h1 
                                className="text-2xl font-semibold text-gray-800"
                                variants={itemVariants}
                            >
                                Manage Your Registration
                            </motion.h1>
                            <motion.p 
                                className="text-gray-600 mt-1"
                                variants={itemVariants}
                            >
                                Update your details or manage your team for {name.split('-').join(' ')}
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Content Panel */}
                            <motion.div 
                                className="lg:col-span-2"
                                variants={itemVariants}
                            >
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                                            Registration Details
                                        </h2>
                                        <EditHackathonRegistrationForm />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Sidebar */}
                            <div className="space-y-6">
                                {/* Timings Display */}
                                <motion.div
                                    variants={itemVariants}
                                    className="sticky top-6"
                                >
                                    <HackathonTimingsDisplay id={name} flag={2} />
                                </motion.div>

                                {/* Team Section */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                                >
                                    <div className="p-6">
                                        <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                            <span className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-full mr-2 text-indigo-600">
                                                👥
                                            </span>
                                            {inTeam ? "Your Team" : "Join or Create Team"}
                                        </h2>
                                        <div className="mt-4">
                                            {inTeam ? 
                                                <TeamDisplay func={checkTeamStatus} /> : 
                                                <TeamFormation func={checkTeamStatus} />
                                            }
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

export default EditRegisteredHackathonDetails;