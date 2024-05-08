import React from 'react'
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';

const Home = () => {
  const Auth = true;
  return (
    <>
      {Auth ? <Dashboard /> : <LandingPage />}
    </>
  )
}

export default Home;