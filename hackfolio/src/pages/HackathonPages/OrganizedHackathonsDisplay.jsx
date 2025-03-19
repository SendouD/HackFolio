import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard";
import Header from "../../components/Header";
import ReactingNavBar from "../../components/ReactingNavBar";
import "../../styles/hack_card.css";

function OrganizedHackathonsDisplay() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function getData() {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/organizedHackathons`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            
            if (response.status === 403) navigate("/Error403");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const array = await response.json();
            setData(array);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    async function handleClick(hackathonName) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonCreate/${hackathonName}/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            
            if (response.status === 403) navigate("/Error403");
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            if (data.completelyFilled) {
                navigate(`/organizedHackathons/${data.hackathonName}`);
            } else {
                navigate(`/completeHackathonCreation/${data.hackathonName}`);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Animation variants for staggered card appearance
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="flex relative min-h-screen bg-neutral-50">
            <ReactingNavBar />
            <div className="w-full px-4 md:px-6 lg:px-8 pb-12">
                <Header />

                <div className="mt-8 mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 text-center">
                        Organized Hackathons
                    </h1>
                    <p className="text-neutral-500 text-center mt-2">
                        Manage the hackathons you've organized
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-medium text-neutral-600">No hackathons found</h3>
                        <p className="text-neutral-500 mt-2">You haven't organized any hackathons yet</p>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {data.map((element, i) => (
                            <motion.div key={i} variants={itemVariants}>
                                <MyHackathonsCard
                                    data={element}
                                    handleClick={handleClick}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default OrganizedHackathonsDisplay;