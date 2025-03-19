import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import HackathonLinks from "../../components/HackathonComponents/HackathonLinks";
import EditHackathonRegistrationForm from '../../components/HackathonComponents/EditHackathonRegistrationForm';
import HackathonTimelineDescription from "../../components/HackathonComponents/HackathonTimelineDescription";
import HackathonPrizesDescription from "../../components/HackathonComponents/HackathonPrizesDescription";
import TeamFormation from "../../components/HackathonComponents/TeamFormation";
import TeamDisplay from "../../components/HackathonComponents/TeamDisplay";
import Header from '../../components/Header';
import ReactingNavBar from '../../components/ReactingNavBar';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';
import LoadingPage from '@/components/loading';

function EditRegisteredHackathonDetails() {
    const [selection, setSelection] = useState(0);
    const [inTeam, setInTeam] = useState(false);
    const [isHackathonEnded, setIsHackathonEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { name } = useParams();

    useEffect(() => {
        checkHackathonStatus();
        handle();
    }, []);

    async function checkHackathonStatus() {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/details/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            
            if (!response.ok) throw new Error('Failed to fetch hackathon details');
            const result = await response.json();
            
            // Check if the hackathon has ended
            const endDate = new Date(result.data.endDate);
            const now = new Date();
            setIsHackathonEnded(now > endDate);
            setIsLoading(false);
        } catch (error) {
            console.error('Error checking hackathon status:', error);
            setIsLoading(false);
        }
    }

    async function handle() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: 'include',
              });
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            if (!arr.data.teamCode) setInTeam(false);
            else setInTeam(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <ReactingNavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Content Panel */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h1 className="text-4xl font-bold text-center mb-4 text-gray-800 uppercase">{name}</h1>
                    <EditHackathonRegistrationForm isHackathonEnded={isHackathonEnded} />
                    
                    {isHackathonEnded && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-center">
                        This hackathon has ended. Your registration details are shown in read-only mode.
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Timings Display */}
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

                {/* Team Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                      <span className="mr-2">👥</span>
                      {inTeam ? "Your Team" : "Join or Create Team"}
                    </h2>
                    <div className="mt-4">
                      {inTeam ? (
                        <TeamDisplay func={handle} readOnly={isHackathonEnded} />
                      ) : (
                        !isHackathonEnded && <TeamFormation func={handle} />
                      )}
                    </div>
                    
                    {isHackathonEnded && !inTeam && (
                      <p className="mt-4 text-amber-700">
                        This hackathon has ended. Team formation is no longer available.
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Empty Section (previously Friends Section) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    );
}

export default EditRegisteredHackathonDetails