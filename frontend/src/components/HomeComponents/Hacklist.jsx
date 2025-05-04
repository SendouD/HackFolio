import { useState, useEffect } from "react";
import HackathonsDisplayCard from "../../components/HomeComponents/Hackcard";
import LoadingPage from "../loading";

function HackList() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHackathons() {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?page=1&limit=3`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                
                setData(Array.isArray(result.hackathons) ? result.hackathons : []);
            } catch (error) {
                console.error("Error fetching hackathon data:", error);
                setError(error.message);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchHackathons();
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (error) {
        return <div className="text-center p-10">Failed to load hackathons: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-10 p-10">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((element, i) => (
                    <HackathonsDisplayCard key={i} data={element} />
                ))
            ) : (
                <div className="col-span-3 text-center p-10">No hackathons available at the moment.</div>
            )}
        </div>
    );
}

export default HackList;