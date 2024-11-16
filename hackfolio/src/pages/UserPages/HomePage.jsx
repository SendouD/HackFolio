import React from "react";
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import "../../styles/Homepage.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ReactingNavBar from "../../components/ReactingNavBar";
import ParticalZoom from "../../components/HomeComponents/ParticleZoom"



// import { Typewriter } from 'react-simple-typewriter';
// import cityImg from '../../assets/code.jpg';



const HomePage = () => {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
    const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

    const texts = [
        "Join us to innovate!",
        "Collaborate with like-minded individuals!",
        "Create projects that matter!",
        "Challenge yourself and learn new skills!"
    ];

    return (
        <div className="body">
            <div className="flex">
                <ReactingNavBar  />
                <div className="space-y-3 size-full">
                    <Header />
                    <div className="min">
                        <ParticalZoom />
                    </div>
                    <div className="">
                        <h1 className="text-3xl font-bold text-center text-white pb-10 pt-10">
                            Now Happening!!
                        </h1>
                        <div className="pb-10">
                            {/* <HackList/> */}
                        </div>
                    </div>
                    <div>
                        <main id="welcome-content"></main>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
