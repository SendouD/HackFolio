import { useState, useEffect, useRef } from "react";
import HackathonsDisplayCard from "../../components/HackathonComponents/HackathonsDisplayCard";
import Header from "../../components/Header";
import "../../styles/hack_card.css"
import ReactingNavBar from "../../components/ReactingNavBar";
import { Navigate, useNavigate } from "react-router-dom";

function AllHackathonsDisplay() {
    const [data,setData] = useState([]);
    const [totalPages,setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const searchRef = useRef();
    const navigate = useNavigate();

    async function getData(pageNo) {
        if(pageNo < 1) return;
        if(pageNo > totalPages) return;
        try {
            const response = await fetch(`/api/hackathon?page=${pageNo}&limit=20`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(response.status === 403) navigate('/Error403');
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setData(data.hackathons);
            setPage(data.currentPage);
            setTotalPages(data.totalPages);
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    } 

    useEffect(()=> {
        getData(1);
    },[]);

    async function handleSearch(e) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/hackathon?search=${searchRef.current.value}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data.hackathons);
            setPage(1);
            setTotalPages(data.totalPages);
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function PageNumbers() {
        let pages = [];
        for(let i=0;i<totalPages;i++) pages.push(i+1);
        console.log(pages);

        return (
            <div className="flex justify-center mt-[40px]">
                <button 
                    onClick={() => getData(page-1)}
                    className="py-1 px-2 bg-indigo-600 text-white rounded mr-2 hover:bg-indigo-700"
                >
                    {"< prev"}
                </button>
              {pages.map((ele,i) => (
                <button 
                    key={i} 
                    onClick={() => getData(i+1)} 
                    className={(page === i+1) ? "py-1 px-2 bg-indigo-600 text-white rounded mr-2" : "py-1 px-2 rounded text-gray-600 underline mr-2"}
                >
                  {ele}
                </button>
              ))}
              <button 
                    onClick={() => getData(page+1)}
                    className="py-1 px-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    {"Next >"}
                </button>
            </div>
          );
    }

    function SearchBar() {


        return(
            <>
                <div className="flex justify-center mt-[40px] mb-[20px]">
                    <form onSubmit={(e) => handleSearch(e)} className="flex">
                        <input type="text" className="border border-gray-600 rounded-s-[5px] w-[500px] pl-[20px] text-[20px]" ref={searchRef} placeholder="Search for hackathons"/>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-e">Search</button>
                    </form>
                </div>
            </>
        );
    }

    if(data.length === 0) {
        return(
            <>
                <Header />
                <SearchBar />
                <div className="flex justify-center mt-[80px] text-6xl text-gray-600">
                    No hackathons to display in this page!
                </div>
                <PageNumbers />
            </>
        );
    }

    return(
        <>
            <div className="flex">
                <ReactingNavBar/>
                <div className="space-y-3 size-full">
                <div className="bg-gray-100">
                <Header />
                <SearchBar />
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center w-4/5">
                        {
                            data.map((element,i) => {
                                return <HackathonsDisplayCard key={i} data={element}/>
                            })
                        }
                    </div>
                </div>
            </div>
                </div>
                <div>
                    <PageNumbers />
                </div>
            </div>
            <div>
                <PageNumbers />
            </div>        
        </>

    );
}

export default AllHackathonsDisplay