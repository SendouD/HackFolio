import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import HackathonDetailsDisplay from '../../components/HackathonComponents/HackathonDetailsDisplay';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';

function HackathonWebpage() {
    const { name } = useParams();

    useEffect(() => {}, []);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
            <ReactingNavBar />
            <div className="flex flex-col w-full p-6 space-y-6">
                <Header />
                
                {/* Animated Background Elements */}
                <motion.div
                    className="fixed top-20 left-20 h-24 w-24 rounded-full bg-blue-400 opacity-50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.div
                    className="fixed bottom-20 right-20 h-32 w-32 rounded-full bg-purple-500 opacity-50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {/* Main Content */}
                <div className="flex justify-center items-center mt-12">
                    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-700">Hackathon: {name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                className="p-4 bg-blue-100 rounded-lg shadow"
                                whileHover={{ scale: 1.05 }}
                            >
                                <HackathonDetailsDisplay name={name} />
                            </motion.div>
                            <motion.div
                                className="p-4 bg-purple-100 rounded-lg shadow"
                                whileHover={{ scale: 1.05 }}
                            >
                                <HackathonTimingsDisplay id={name} flag={1} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HackathonWebpage;
