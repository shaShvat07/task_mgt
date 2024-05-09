import React, { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';

const Home = () => {
  const Auth = false;
  const [bgColor, setBgColor] = useState('bg-white');
  const handleButton1Hover = () => {
    setBgColor('bg-fuchsia-500');
  };

  const handleButton2Hover = () => {
    setBgColor('bg-orange-400');
  };

  return (
    <div className='h-full'>
      {Auth ? <Dashboard /> :
        <>
          <div className={`w-full ${bgColor}  h-16 flex text-2xl`}>
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