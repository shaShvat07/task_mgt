import React from 'react'
import { Navbar, Sidebar, Main } from '..';
const Dashboard = () => {
  return (
    <>
      <div className='flex w-full h-full text-white' style={{backgroundColor: '#18181b'}}>
          <Sidebar />
        <div className='w-4/5'>
          <Navbar />
          <Main />
        </div>
      </div>
    </>
  )
}

export default Dashboard;