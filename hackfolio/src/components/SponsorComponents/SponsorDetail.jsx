import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import Header from "../Header";
import ReactingNavBar from "../../components/ReactingNavBar"; // Assuming ReactingNavBar is the Navbar component

// Get the token from localStorage
const token = localStorage.getItem('data');

const SponsorDetail = () => {
  const { companyName } = useParams();
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const inpRef = useRef(null);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      auth: {
        token: token,
      },
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('disconnect', async () => {
      try {
        const response = await fetch(`/api/chat/disconnect`);
        if (!response.ok) throw new Error('Network response was not ok');
        await response.json();
      } catch (error) {
        console.error('Error during disconnection:', error);
      }
    });

    return () => {
      newSocket.off('chatMessage'); // Clean up socket event listeners on unmount
      newSocket.disconnect(); // Disconnect socket when the component is unmounted
    };
  }, []);

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await axios.get(`/api/sponsors/user/${companyName}`);
        setSponsor(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sponsor details:", err);
        setError("Error fetching sponsor details");
        setLoading(false);
      }
    };

    fetchSponsor();
  }, [companyName]);

  // Send message function
  async function sendMessage(e) {
    e.preventDefault();
    const message = inpRef.current.value;
    inpRef.current.value = ""; // Clear input after sending message

    try {
      const response = await fetch(`/api/chat/messages/${sponsor.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const msg = {
        from: JSON.parse(token).email,
        to: sponsor.email,
        message: message,
        timestamp: Date.now(),
        readStatus: false,
      };
      socket.emit('chatMessage', msg); // Emit message to socket

      navigate('/chat', { state: { currUser: sponsor.email } }); // Redirect to chat
    } catch (error) {
      console.error('Error posting message:', error);
    }
  }

  if (loading) return <div>Loading sponsor details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex">
        <ReactingNavBar /> {/* Navbar component */}
        <div className="space-y-3 size-full">
          <Header />

          <div className="container mx-auto p-6 bg-[#0f172a]">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Header Section */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-4xl font-bold text-[#5f3abd]">{sponsor.companyName}</h1>
                <p className="text-gray-600 mt-2">{sponsor.userName}</p>
              </motion.div>

              {/* Logo Section */}
              {sponsor.logo && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.companyName} logo`}
                    className="h-24 w-24 rounded-lg shadow-lg"
                  />
                </motion.div>
              )}

              {/* Website */}
              {sponsor.website && (
                <motion.div
                  className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Website</h2>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {sponsor.website}
                  </a>
                </motion.div>
              )}

              {/* Contact Details */}
              {(sponsor.email || sponsor.phoneNumber) && (
                <motion.div
                  className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  {sponsor.email && (
                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${sponsor.email}`}
                        className="text-blue-500 underline"
                      >
                        {sponsor.email}
                      </a>
                    </p>
                  )}
                  {sponsor.phoneNumber && <p>Phone: {sponsor.phoneNumber}</p>}
                </motion.div>
              )}

              {/* Address Section */}
              {sponsor.address && (
                <motion.div
                  className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Address</h2>
                  <p>{sponsor.address.street}</p>
                  <p>
                    {`${sponsor.address.city}, ${sponsor.address.state}, ${sponsor.address.zip}, ${sponsor.address.country}`}
                  </p>
                </motion.div>
              )}

              {/* Description */}
              {sponsor.description && (
                <motion.div
                  className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p>{sponsor.description}</p>
                </motion.div>
              )}

              {/* Random Shape Animation */}
              <motion.div
                className="absolute top-20 right-20 bg-[#5f3abd] rounded-full w-32 h-32 opacity-60"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              ></motion.div>

              {/* Contact Us Form */}
              <div className="font-bold text-3xl my-[20px] text-indigo-300">Contact Us</div>

              <form onSubmit={sendMessage} className="items-center w-[60%] rounded">
                <textarea
                  type="text"
                  className="w-[100%] h-[200px] text-xl py-4 px-8 mb-4 rounded-s border"
                  ref={inpRef}
                  placeholder="Got questions? Don't hesitate—reaching out is never too much! We're just a message away, ready to help."
                />
                <button
                  className="mb-4 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorDetail;
