import { useState, useEffect } from "react";
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css";
import ReactingNavBar from "../../components/ReactingNavBar";
import { useNavigate } from "react-router-dom";

function AllHackathonsDisplay() {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    async function getData(pageNo) {
        if (pageNo < 1 || pageNo > totalPages) return;
        try {
            const response = await fetch(`/api/hackathon?page=${pageNo}&limit=8`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 403) navigate("/Error403");

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setData(data.hackathons);
            setPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData(1);
    }, []);

    async function handleSearch(query) {
        try {
            const response = await fetch(`/api/hackathon?search=${query}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
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
            if (searchQuery.trim()) {
                handleSearch(searchQuery);
            } else {
                getData(1);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    function PageNumbers() {
        let pages = [];
        for (let i = 0; i < totalPages; i++) pages.push(i + 1);

        return (
            <div className="flex justify-center mt-[40px]">
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

    return (
        <>
            <div className="flex">
                <ReactingNavBar />
                <div className="space-y-3 size-full">
                    <div className="bg-gray-100">
                        <Header />
                        <div className="flex justify-center mt-[40px] mb-[20px]">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border border-gray-600 rounded-s-[5px] w-[500px] pl-[20px] text-[20px]"
                                placeholder="Search for hackathons"
                            />
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-wrap justify-center w-4/5">
                                {data.map((element, i) => (
                                    <HackathonsDisplayCard key={i} data={element} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <PageNumbers />
            </div>
        </>
    );
}

export default AllHackathonsDisplay;
