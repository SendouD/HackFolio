import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import ReactingNavBar from "../../components/ReactingNavBar";

function OrganizedHackathonsDisplay() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await fetch(`/api/hackathon/organizedHackathons`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 403) navigate("/Error403");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const array = await response.json();
            console.log(array);
            setData(array);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    function navFunction(completelyFilled, hackathonName) {
        if (completelyFilled) {
            navigate(`/organizedHackathons/${hackathonName}`);
        } else {
            navigate(`/completeHackathonCreation/${hackathonName}`);
        }
    }

    async function handleClick(hackathonName) {
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${hackathonName}/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 403) navigate("/Error403");
            const data = await response.json();

            navFunction(data.completelyFilled, data.hackathonName);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className="body">
            <div className="flex">
                <ReactingNavBar />
                <div className="space-y-3 size-full">
                    <Header />
                    <div className="flex-grow bg-[#0f172a] min-h-screen py-10 px-4 relative">
                        {/* Animated Shapes */}
                        <div className="bubbles">
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                        </div>
                        <div className="spheres">
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                            <div className="sphere"></div>
                        </div>

                        {/* Heading Section */}
                        <div className="text-4xl font-medium text-center text-white my-6">
                            Organized Hackathons:
                        </div>

                        {/* Cards Section */}
                        <div className="flex flex-wrap gap-6 justify-center px-4">
                            {data.map((element, i) => (
                                <MyHackathonsCard
                                    key={i}
                                    data={element}
                                    handleClick={handleClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizedHackathonsDisplay;
