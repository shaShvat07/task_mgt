import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Modal({ onClose }) {
    const handleSignOut = () => {
        // Clear local storage
        toast.success('Logging you out!!');
        localStorage.clear();
        setTimeout(() => {
            window.location.reload(); // Refresh the page after 1 second
          }, 1000);
        onClose();  
    };

    return (
        <div className="absolute inset-0 flex justify-end h-12 mt-20 mr-5 z-10">
            <button onClick={handleSignOut} className="bg-red-500 flex items-center hover:bg-red-600 text-white text-xl py-4 px-4 rounded ">Sign Out</button>
        </div>
    );
}

const Navbar = ({ toggleSidebar, selectedList  }) => {
    const [user, setUser] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user
            axios.get('https://task-mgt-three.vercel.app/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleImageClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='h-16 border-b border-gray-500 flex justify-between items-center'>
                <div className='ml-5 text-2xs flex items-center lg:text-xl'>
                    <button
                        className="mr-4 focus:outline-none lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm1 6a1 1 0 100 2h16a1 1 0 100-2H4z"
                            />
                        </svg>
                    </button>
                    {selectedList.label}
                </div>
                <div className='mr-5 flex items-center'>
                    <div className='mr-4 w-10 h-10 lg:w-12 lg:h-12 bg-[#2568ef] text-lg lg:text-2xl rounded-full flex justify-center items-center'>
                        {user?.data?.first_name.charAt(0).toUpperCase()}
                    </div>
                    <div className='text-2xs lg:text-xl mr-2 lg:mr-4'>
                        {user?.data?.first_name + ' ' + user?.data?.last_name}
                    </div>
                    <div>
                        <img src="/down-arrow.svg" alt="Dropdown" className={`hover: cursor-pointer transform transition-transform ease-in-out duration-500 ${isModalOpen ? 'rotate-180' : ''}`} onClick={handleImageClick} />
                        {isModalOpen && <Modal onClose={handleCloseModal} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;