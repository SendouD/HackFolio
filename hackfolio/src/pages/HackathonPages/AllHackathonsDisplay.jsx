import { useState, useEffect, useRef } from "react";
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import ReactingNavBar from "../../components/ReactingNavBar";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AllHackathonsDisplay() {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const shapesRef = useRef(null);

    async function getData(pageNo) {
        if (pageNo < 1 || pageNo > totalPages) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?page=${pageNo}&limit=6`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.status === 403) navigate("/Error403");
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            console.log(data.hackathons)
            setData(data.hackathons);
            setPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => { getData(1); }, []);

    async function handleSearch(query) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon?search=${query}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            });
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            setData(data.hackathons);
            setPage(1);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) handleSearch(searchQuery);
            else getData(1);
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    useEffect(() => {
        if (shapesRef.current) {
            gsap.to(".shape", {
                y: "random(-40,40)",
                scale: "random(1,1.5)",
                rotation: "random(-30,30)",
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }
    }, []);

    return (
        <>
            <div className="flex relative min-h-screen bg-gradient-to-tr from-purple-200 via-blue-100 to-white overflow-hidden">             

                <ReactingNavBar />
                <div className="w-full px-1">
                    <Header />
                    <div className="flex justify-center my-6">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border py-3 px-5 rounded-lg w-[500px] text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
                            placeholder="Search for hackathons"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        {data.map((element, i) => (
                            <div key={i} className="hackathon-card">
                                <HackathonsDisplayCard data={element} />
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center my-10">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => getData(i + 1)}
                                className={`py-2 px-4 mx-1 rounded-lg ${page === i + 1 ? "bg-indigo-600 text-white" : "bg-white border-gray-500 border hover:bg-gray-200"}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllHackathonsDisplay;
