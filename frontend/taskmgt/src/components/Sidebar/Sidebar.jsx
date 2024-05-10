// Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ListItem({ label, listId, onSelect }) {

    const handleClick = () => {
        onSelect({ label, listId });
    };

    return (
        <li className={`flex w-full justify-center p-3 hover:cursor-pointer hover:bg-gray-800`}
            onClick={handleClick}>
            <img src='/planner.svg' alt='icon' className='ml-5' />
            <div className='w-4/5 ml-4'>{label}</div>
        </li>
    );
}

const Sidebar = ({ onListSelect }) => {
    const [lists, setLists] = useState([]);
    const [title, setListName] = useState('');
    const [err, setError] = useState('');
    const [triggerEffect, setTriggerEffect] = useState(false);
    const inputRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/lists', {
                title
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success('List added successfully');
            setTriggerEffect(!triggerEffect);
            console.log('List added successfully:', response.data);
            // Reset form field
            setListName('');
            // Clear any previous error
            setError('');
            inputRef.current.value = '';
        } catch (error) {
            toast.error('Error adding list!');
            console.error('Error adding list:', error.response.data);
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch all lists
            axios.get('http://localhost:3000/lists/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    setLists(response.data);
                })
                .catch(error => {
                    console.error('Error fetching lists:', error);
                });
        }
    }, [triggerEffect]);
    // console.log(lists);
    return (
        <>
            <div className='sticky lg:w-1/5 left-0 h-full mb-5 top-0 border-r border-gray-500 overflow-y-scroll'>
                <div className='h-16 flex items-center justify-center'>
                    <img src='/taskmgt_logo.png' className='w-12 h-12' />
                    <div className='ml-2 text-3xl'>
                        TaskMgt
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex-row relative'>
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
                            <ul className='flex-row w-full border-b border-gray-500 mt-2'>
                                <ListItem
                                    label="My Tasks"
                                    listId={-1}
                                    onSelect={onListSelect}
                                />
                                <ListItem
                                    label="My Day"
                                    listId={-1}
                                    onSelect={onListSelect}
                                />
                                <ListItem
                                    label="Planned"
                                    listId={-1}
                                    onSelect={onListSelect}
                                />
                                <ListItem
                                    label="Important"
                                    listId={-1}
                                    onSelect={onListSelect}
                                />
                            </ul>
                        </div>
                        <div>
                            <ul className='flex-row w-full'>
                                {lists && lists.length > 0 && lists.map(item => (
                                    <ListItem
                                        key={item.list_id}
                                        label={item.title}
                                        listId={item.list_id}
                                        onSelect={onListSelect} />
                                ))}
                            </ul>
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <form class="flex items-center justify-center mt-3 w-[90%] " onSubmit={handleSubmit}>
                                <label htmlFor="title" class="sr-only">Add a List </label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                        {/* <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                        </svg> */}
                                    </div>
                                    <input ref={inputRef} type="text" onChange={(e) => setListName(e.target.value)} id="title" class="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="+       Add a List" required="" />
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
