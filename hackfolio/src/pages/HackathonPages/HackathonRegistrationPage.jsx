import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';
import HackathonRegistrationForm from '../../components/HackathonComponents/HackathonRegistrationForm';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';

function HackathonRegistrationPage() {
    const { name } = useParams();

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
                                Register for {name.split('-').join(' ')}
                            </motion.h1>
                            <motion.p 
                                className="text-gray-600 mt-1"
                                variants={itemVariants}
                            >
                                Complete the form below to register for this hackathon
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
                                        <HackathonRegistrationForm />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Sidebar */}
                            <motion.div 
                                className="space-y-6"
                                variants={itemVariants}
                            >
                                <div className="sticky top-6">
                                    <HackathonTimingsDisplay id={name} flag={2} />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

export default HackathonRegistrationPage;