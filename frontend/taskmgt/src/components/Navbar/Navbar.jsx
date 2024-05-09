import React, { useState } from 'react';

function Modal({ onClose }) {
    return (
        <div className="absolute inset-0 flex justify-end h-12 mt-20 mr-5 z-10">
            <button onClick={onClose} className="bg-red-500 flex items-center hover:bg-red-600 text-white text-xl py-4 px-4 rounded ">Sign Out</button>
        </div>
    );
}

const Navbar = () => {
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
                <div className='ml-5 text-xl'>My Tasks</div>
                <div className='mr-5 flex items-center'>
                    <div className='mr-4 w-12 h-12 bg-[#2568ef] text-2xl rounded-full flex justify-center items-center'>
                        S
                    </div>
                    <div className='text-xl mr-4'>
                        Shashvat Patel
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