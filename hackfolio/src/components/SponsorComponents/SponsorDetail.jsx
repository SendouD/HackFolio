import React ,{useEffect,useState,useRef} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
const token = localStorage.getItem('data');
import { io } from "socket.io-client";

const SponsorDetail = () => {
    const { companyName } = useParams();
    const [sponsor, setSponsor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inpRef = useRef(null);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const newSocket = io("http://localhost:5000",{
          transports: ["websocket"],
          auth: {
              token
          },
          withCredentials: true
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
          console.log('Connected to WebSocket server');
      });

      newSocket.on('disconnect', async () => {
          try {
              const response = await fetch(`/api/chat/disconnect`);
              if (!response.ok) throw new Error('Network response was not ok');
              const data = await response.json();
              setData(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      });

      return () => {
          newSocket.off('chatMessage');
          newSocket.disconnect();
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

  async function sendMessage(e) {
    e.preventDefault();
    const message = inpRef.current.value;
    inpRef.current.value = ""
    try {
        const response = await fetch(`/api/chat/messages/${sponsor.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message}),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        console.log(await response.json())
        const msg = {
            from: JSON.parse(token).email,
            to: sponsor.email,
            message: message,
            timestamp: Date.now(),
            readStatus: false,
        }
        socket.emit('chatMessage', msg);
        navigate('/chat', { state: { currUser: sponsor.email } });
    } catch (error) {
        console.error('Error posting data:', error);
    }
  }
  
  if (loading) return <div>Loading sponsor details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Header/>

    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{sponsor.companyName}</h1>
          <p className="text-gray-600 mt-2">{sponsor.userName}</p>
        </div>

        {/* Logo Section */}
        {sponsor.logo && (
          <div className="mb-6">
            <img
              src={sponsor.logo}
              alt={`${sponsor.companyName} logo`}
              className="h-24 w-24 rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Website */}
        {sponsor.website && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Website</h2>
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {sponsor.website}
            </a>
          </div>
        )}

        {/* Contact Details */}
        {(sponsor.email || sponsor.phoneNumber) && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
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
          </div>
        )}

        {/* Address Section */}
        {sponsor.address && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <p>{sponsor.address.street}</p>
            <p>
              {`${sponsor.address.city}, ${sponsor.address.state}, ${sponsor.address.zip}, ${sponsor.address.country}`}
            </p>
          </div>
        )}

        {/* Description */}
        {sponsor.description && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{sponsor.description}</p>
          </div>
        )}
        <div className="font-bold text-3xl my-[20px]">Contact Us</div>

        <form onSubmit={(e) => sendMessage(e)} className="items-center w-[60%] rounded">
          <textarea
              type="text"
              className="w-[100%] h-[200px] text-xl py-4 px-8 mb-4 rounded-s border"
              ref={inpRef}
              placeholder="Got questions? Don't hesitate—reaching out is never too much! We're just a message away, ready to help."
          />
          <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold" type="submit">{'Send Message'}</button>
        </form>
      </div>


    </div>
    </>
  );
};

export default SponsorDetail;
