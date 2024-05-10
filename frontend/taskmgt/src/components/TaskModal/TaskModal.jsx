import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TaskModal = ({ showModal, setShowModal, handleSubmit, handleInputChange, formData, listId }) => {
    const minDate = new Date().toISOString().split('T')[0];

    const submitTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (listId === -1) {
                toast.error('Please create a list first.');
                return;
            }

            const response = await axios.post(`http://localhost:3000/lists/${listId}/tasks`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            toast.success('Task added successfully');
            setShowModal(false);
            handleSubmit(response.data); // Pass the new task data to the parent component
        } catch (error) {
            toast.error('Error adding task!');
            console.error('Error adding task:', error.response.data);
        }
    };

    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" style={{ width: '100vw' }}></div>
                    <div
                        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="relative p-4 w-full max-w-2xl h-full md:h-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Add Task
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form onSubmit={submitTask}>
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="title"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Task
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type task name"
                                                required
                                                value={formData.title}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="deadline"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                name="deadline"
                                                id="deadline"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required
                                                value={formData.deadline}
                                                onChange={handleInputChange}
                                                min={minDate}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="priority"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Priority
                                            </label>
                                            <select
                                                id="priority"
                                                name="priority"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select priority</option>
                                                <option value="High">High Priority</option>
                                                <option value="Medium">Medium Priority</option>
                                                <option value="Low">Low Priority</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="status"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value={false}>Not Done</option>
                                                {/* <option value={true}>Done</option> */}
                                            </select>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="content"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id="content"
                                                name="content"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Write task description here"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        <svg
                                            className="mr-1 -ml-1 w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        Add new task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default TaskModal;