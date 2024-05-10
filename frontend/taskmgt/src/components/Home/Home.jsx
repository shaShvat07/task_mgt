import React, { useState, useEffect } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';
import axios from 'axios';

const Home = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data === "ok") {
            setAuth(true); // Token is valid
          } else {
            setAuth(false); // Token is not valid
          }
        })
        .catch(error => {
          console.error('Error validating token:', error);
          setAuth(false); // Error occurred, token is considered invalid
        });
    } else {
      setAuth(false); // No token found, user is not authenticated
    }
  }, []);

  const [bgColor, setBgColor] = useState('bg-white');
  const handleButton1Hover = () => {
    setBgColor('bg-fuchsia-500');
  };

  const handleButton2Hover = () => {
    setBgColor('bg-orange-400');
  };

  return (
    <div className='h-full'>
      {auth ? <Dashboard /> :
        <>
          <div className={`w-full ${bgColor} h-16 flex text-2xl`}>
            <a
              className="w-1/2 flex justify-end items-center pr-5 hover:cursor-pointer"
              onMouseEnter={handleButton1Hover}
              onMouseLeave={() => setBgColor('bg-white')}
              href='/login'
            >
              Sign In
            </a>
            <a
              className="w-1/2 flex justify-start items-center pl-5 hover:cursor-pointer"
              onMouseEnter={handleButton2Hover}
              onMouseLeave={() => setBgColor('bg-white')}
              href='register'
            >
              Register
            </a>
          </div>
          <LandingPage />
        </>
      }
    </div>
  )
}

export default Home;