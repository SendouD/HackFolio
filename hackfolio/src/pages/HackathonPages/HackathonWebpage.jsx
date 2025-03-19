import { useState,useEffect } from 'react'
import HackathonDetailsDisplay from '../../components/HackathonComponents/HackathonDetailsDisplay';
import HackathonTimingsDisplay from '../../components/HackathonComponents/HackathonTimingsDisplay';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import ReactingNavBar from '../../components/ReactingNavBar';
import { motion } from "framer-motion";


function HackathonWebpage() {
    const { name } = useParams();

    useEffect(() => {

    },[]);

    return(
        <>
        <div className='flex min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 '>
            <ReactingNavBar/>
            <div className='space-y-3 size-full'>
            <Header></Header>



            


<motion.div>
  <motion.svg
    className="line-animation fixed bottom-[50px] right-[500px] w-32 h-32"
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    transition={{ duration: 2 }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M10 10 Q 50 50, 90 10"
      fill="transparent"
      stroke="#3b82f6"
      strokeWidth="4"
    />
  </motion.svg>
</motion.div>



<motion.div>
  <motion.svg
    className="line-animation fixed bottom-[60px] right-[500px] w-32 h-32"
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    transition={{ duration: 2 }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M10 90 C 30 60, 70 60, 90 90"
      fill="transparent"
      stroke="#3b82f6"
      strokeWidth="4"
    />
  </motion.svg>
</motion.div>







            <div className=''style={{display:"flex", justifyContent:"center"}}>
                <div style={{marginTop:"30px"}}>
                    {/* <div style={{height:"300px",width:"100px"}}/> */}
                    <div className="flex">
                        <div className='bg-white rounded-xl shadow-sm overflow-hidden py-8 px-8'>
                            <HackathonDetailsDisplay name={name}/>
                        </div>
                        <div className="p-6">
                            <HackathonTimingsDisplay id={name} flag={1} />
                        </div>
                    </div>
                </div>
            </div> 
            </div>
        </div>
        </>
    );     

}

export default HackathonWebpage