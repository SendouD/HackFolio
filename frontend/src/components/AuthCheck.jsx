import { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from "../components/loading";

function AuthCheck() {
  const [isExp, setIsExp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get(`${__BACKEND_URL__}/api/jwtverify`);
        if(response.status === 201) {
            if(response.data.error ==='Token expired') {
                localStorage.removeItem("data");
            }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingPage/>;
  }

  return <Outlet />
}

export default AuthCheck