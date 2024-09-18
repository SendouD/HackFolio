import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
      try {
        const response = await axios.get('/api/jwtverify');
        console.log(response);
        if (response.status === 200) {
          setIsUser(true);
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
    return <div>Loading...</div>;
  }

  return isUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
