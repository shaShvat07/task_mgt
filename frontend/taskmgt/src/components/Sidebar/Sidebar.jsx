import React from 'react'

const commonList = [
    { id: 1, label: 'List 1', imgSrc: '/planner.svg' },
    { id: 2, label: 'List 2', imgSrc: '/planner.svg' },
    { id: 3, label: 'List 3', imgSrc: '/planner.svg' },
    { id: 4, label: 'List 4', imgSrc: '/planner.svg' },
];

function ListItem({ label, imgSrc }) {
    return (
        <li className='flex w-full justify-center p-3 hover:cursor-pointer'>
            <img src={imgSrc} alt='icon' className='ml-5' />
            <div className='w-4/5 ml-4'>{label}</div>
        </li>
    );
}

const Sidebar = () => {
    return (
        <>
            <div className='sticky w-1/5 left-0 h-100vh top-0 border-r border-gray-500'>
                <div className='h-16 flex items-center justify-center'>
                    <img src='/taskmgt_logo.png' className='w-12 h-12' />
                    <div className='ml-2 text-3xl'>
                        TaskMgt
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex-row'>
                        <div className='flex justify-center'>
                            <form class="flex items-center justify-center mt-3 w-[90%] ">
                                <label for="simple-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
                                </div>
                            </form>
                        </div>
                        <div>
                            <ul className='flex-row w-full border-b border-gray-500'>
                                <li className='flex w-full justify-center mt-5 bg-gray-800 p-3 hover:cursor-pointer'>
                                    <img src='/home.svg' className='ml-5' />
                                    <div className='w-4/5 ml-4'>My Tasks </div>
                                </li>
                                <li className='flex w-full justify-center p-3 hover:cursor-pointer'>
                                    <img src='/sun.svg' className='ml-5' />
                                    <div className='w-4/5 ml-4'> My Day </div>
                                </li>
                                <li className='flex w-full justify-center p-3 hover:cursor-pointer'>
                                    <img src='/planner.svg' className='ml-5' />
                                    <div className='w-4/5 ml-4'> Planned </div>
                                </li>
                                <li className='flex w-full justify-center mb-5 p-3 hover:cursor-pointer'>
                                    <img src='/star.svg' className='ml-5' />
                                    <div className='w-4/5 ml-4'> Important </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className='flex-row w-full'>
                                {commonList.map(item => (
                                    <ListItem key={item.id} label={item.label} imgSrc={item.imgSrc} />
                                ))}
                            </ul>
                        </div>
                        <div className='absolute bottom-2 flex items-center justify-center w-full'>
                            <form class="flex items-center justify-center mt-3 w-[90%] ">
                                <label for="simple-search" class="sr-only">Add a List </label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                        {/* <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                        </svg> */}
                                    </div>
                                    <input type="text" id="simple-search" class="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="+       Add a List" required="" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;