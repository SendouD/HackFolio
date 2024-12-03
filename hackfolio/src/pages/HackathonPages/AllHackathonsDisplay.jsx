import { useState, useEffect, useRef } from "react";
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "animate.css";
import ReactingNavBar from "../../components/ReactingNavBar";

function AllHackathonsDisplay() {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const searchRef = useRef();
    const navigate = useNavigate();

    const shapeVariants = {
        animate: {
            y: [0, 20, 0],
            rotate: [0, 360],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        },
    };

    async function getData(pageNo) {
        if (pageNo < 1 || pageNo > totalPages) return;

        try {
            const response = await fetch(`/api/hackathon?page=${pageNo}&limit=8`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 403) {
                navigate("/Error403");
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch hackathon data");
            }

            const result = await response.json();
            setData(result.hackathons);
            setPage(result.currentPage);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error("Error fetching hackathon data:", error);
        }
    }

    useEffect(() => {
        getData(1); // Fetch the first page of hackathons on component mount
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const query = searchRef.current.value.trim();

        if (!query) return;

        try {
            const response = await fetch(`/api/hackathon/search?query=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }

            const result = await response.json();
            setData(result.hackathons);
            setPage(1); // Reset page to 1
            setTotalPages(result.totalPages || 1); // Update total pages if available
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    function PageNumbers() {
        let pages = [];
        for (let i = 0; i < totalPages; i++) pages.push(i + 1);

        return (
            <div className="flex justify-center mt-[40px] bg-[#0f172a] max-w-full">
                {pages.length !== 0 && (
                    <button
                        onClick={() => getData(page - 1)}
                        className="py-1 px-2 bg-indigo-600 text-white rounded mr-2 hover:bg-indigo-700"
                    >
                        {"< prev"}
                    </button>
                )}
                {pages.map((ele, i) => (
                    <button
                        key={i}
                        onClick={() => getData(i + 1)}
                        className={
                            page === i + 1
                                ? "py-1 px-2 bg-indigo-600 text-white rounded mr-2"
                                : "py-1 px-2 rounded text-gray-600 underline mr-2"
                        }
                    >
                        {ele}
                    </button>
                ))}
                {pages.length !== 0 && (
                    <button
                        onClick={() => getData(page + 1)}
                        className="py-1 px-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        {"Next >"}
                    </button>
                )}
            </div>
        );
    }

    function SearchBar() {
        return (
            <div className="flex justify-center mt-[40px] mb-[20px] z-10">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        className="border border-gray-600 rounded-s-[5px] w-[500px] pl-[20px] text-[20px]"
                        ref={searchRef}
                        placeholder="Search for hackathons"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-e"
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }

    return (
        <>
        
      <div className="body">
        <div className="flex">
        <ReactingNavBar />
        <div className="space-y-1 size-full">
            {/* Wrapper with background color #0f172a */}
            <div className="relative z-0 bg-[#0f172a] min-h-screen">
                {/* Header */}
                <div className="relative z-20">
                    <Header />
                </div>

                {/* Search Bar */}
                <div className="relative z-20">
                    <SearchBar />
                </div>

                {/* Animated Background Shapes */}
                <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-0">
                    {/* Spheres */}
                    <motion.div
                        className="absolute bg-blue-400 rounded-full w-40 h-40 opacity-50"
                        style={{ top: "10%", left: "10%" }}
                        variants={shapeVariants}
                        animate="animate"
                    />
                    <motion.div
                        className="absolute bg-[#c084fc] rounded-full w-32 h-32 opacity-50"
                        style={{ top: "30%", right: "20%" }}
                        variants={shapeVariants}
                        animate="animate"
                    />

                    {/* Triangles */}
                    <motion.div
                        className="absolute bg-blue-400 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[60px] border-b-purple opacity-50"
                        style={{ top: "40%", right: "10%" }}
                        variants={shapeVariants}
                        animate="animate"
                    />
                    <motion.div
                        className="absolute bg-pink-400 w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[70px] border-b-pink-400 opacity-50"
                        style={{ bottom: "10%", left: "5%" }}
                        variants={shapeVariants}
                        animate="animate"
                    />

                    {/* Squares */}
                    <motion.div
                        className="absolute bg-indigo-400 w-20 h-20 opacity-50"
                        style={{ top: "50%", left: "25%" }}
                        variants={shapeVariants}
                        animate="animate"
                    />
                    <motion.div
                        className="absolute bg-[#a5b4fc] w-24 h-24 opacity-50"
                        style={{ bottom: "30%", right: "15%" }}
                        variants={shapeVariants}
                        animate="animate"
                    />
                </div>

                {/* Hackathon Cards */}
                <div className="relative flex justify-center mt-[40px] z-10">
                    {data.length === 0 ? (
                        <div className="text-6xl text-gray-600">No hackathons to display!</div>
                    ) : (
                        <div className="flex flex-wrap justify-center w-4/5 space-y-4 z-10">
                            {data.map((hackathon, i) => (
                                <HackathonsDisplayCard key={i} data={hackathon} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <PageNumbers />
            </div>
            </div> 
            </div>
        </>
    );
}

export default AllHackathonsDisplay;
