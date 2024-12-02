import React from "react"; 
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import "../../styles/Homepage.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Typewriter } from 'react-simple-typewriter';
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
            <div className="space-y-3">
                <Header />

                <div>
                    <header
                        id="welcome-header"
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            position: 'relative',
                            height: '100vh', // Ensure it takes full height
                            backgroundImage: `url()`, // Set the background image
                            backgroundSize: 'cover', // Cover the entire header
                            backgroundPosition: 'center', // Center the background image
                        }}
                    >
                        <motion.div
                            id="welcome-header-content"
                            style={{
                                scale: scaleText,
                                transform: `translateY(${yText}px)`,
                                zIndex: 2, // Ensure this stays above the background
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <h1 style={{ fontSize: '3rem', textShadow: '0 0 6px rgba(0, 0, 0, 0.5)' }}>
                                Ready to Innovate?
                            </h1>
                            <Link id="cta-link" to="/hackathons" style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#0f61ef',
                                color: '#fff',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontFamily: 'Quicksand, sans-serif',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                Join a Hackathon
                            </Link>
                        </motion.div>
                    </header>

                    <main id="welcome-content">
                        <section>
                            <h2>Unleash Your Creativity at Hackathons</h2>
                            <p>
                                Hackathons are the perfect opportunity to showcase your skills, collaborate with others, and create impactful projects. Join us to participate in exciting hackathons that challenge you to innovate and think outside the box.
                            </p>
                        </section>

                        <section>
                            <h2>Why Participate in Hackathons?</h2>
                            <p>
                                Hackathons foster teamwork, enhance your problem-solving skills, and allow you to network with industry professionals. Whether you're a coder, designer, or entrepreneur, there’s a place for you to shine!
                            </p>
                        </section>
                    </main>

                    <div
                        style={{
                            width: '100%',
                            height: '260px',
                            background: 'linear-gradient(#111d32,#222c31, #2F4F4F, #222c31,#111d32)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            color: 'white',
                        }}
                    >
                        <Typewriter
                            words={texts} // Pass the texts array
                            loop={true} // Enable looping
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </div>

                    <main id="welcome-content">
                        <section>
                            <h2>Share and Showcase Your Projects</h2>
                            <p>
                                Our platform allows you to share your projects with the world. Create your project portfolio, receive feedback from peers, and gain visibility in the tech community. Let your work inspire others!
                            </p>
                        </section>

                        <section>
                            <h2>Join a Thriving Community</h2>
                            <p>
                                Connect with thousands of like-minded individuals who share your passion for technology and innovation. Join discussions, collaborate on projects, and take part in a vibrant community that thrives on creativity.
                            </p>
                        </section>
                    </main>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
