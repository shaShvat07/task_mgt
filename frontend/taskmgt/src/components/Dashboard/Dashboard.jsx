import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar, Main } from '..';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  // Handle window resize event
  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide sidebar when device width is less than a certain value
  const isSidebarVisible = deviceWidth >= 768; // Adjust the breakpoint as needed

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div
        className='flex w-full h-[100vh] overflow-y-hidden overflow-x-hidden text-white'
        style={{ backgroundColor: '#18181b' }}
      >
        {isSidebarVisible && <Sidebar />}
        <div className={`${isSidebarVisible ? 'w-4/5' : 'w-full'}`}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Main />
        </div>
        {!isSidebarVisible && isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          >
            <div
              className="absolute left-0 top-0 h-full w-4/5 max-w-xs bg-gray-800 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;