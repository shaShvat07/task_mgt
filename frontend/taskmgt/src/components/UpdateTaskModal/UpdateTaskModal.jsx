import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const UpdateTaskModal = ({ showModal, setShowModal, item, listId }) => {
    const [taskName, setTaskName] = useState(item.title);
    const [dueDate, setDueDate] = useState(item.deadline ? moment(item.deadline).format('YYYY-MM-DD') : '');
    const [priority, setPriority] = useState(item.priority);
    const [status, setStatus] = useState(item.status ? 'Done' : 'Not Done');
    const [description, setDescription] = useState(item.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dueDateInDateTimeFormat = dueDate ? new Date(`${dueDate}T00:00:00`) : null;
            const token = localStorage.getItem('token');
            const updatedTask = {
                title: taskName,
                content: description,
                priority: priority,
                status: status === 'Done', // Convert status to boolean
                deadline: dueDateInDateTimeFormat,
            };

            await axios.patch(`http://localhost:3000/lists/${listId}/tasks/${item.task_id}`, updatedTask, {
                headers: {
                    Authorization: `Bearer ${token}`, // Make sure the token is correctly formatted
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Task updated successfully');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
            
            setShowModal(false);
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task');
        }
    };

    const minDate = new Date().toISOString().split('T')[0];

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
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="taskName"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Task
                                            </label>
                                            <input
                                                type="text"
                                                name="taskName"
                                                id="taskName"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Type task name"

                                                value={taskName}
                                                onChange={(e) => setTaskName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="dueDate"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                id="dueDate"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                                                value={dueDate}
                                                onChange={(e) => setDueDate(e.target.value)}
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
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}

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
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}

                                            >
                                                <option value="Not Done"> Not Done</option>
                                                <option value="Done"> Done</option>
                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="description"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Write task description here"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                        </svg>
                                        &nbsp; Update task
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

export default UpdateTaskModal;