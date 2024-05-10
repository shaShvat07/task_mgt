import React, { useState } from 'react';
import { UpdateTaskModal } from '..';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const Card = ({ item, listId }) => {
    const [showModal, setShowModal] = useState(false);

    const getDeadlineText = (deadline) => {
        if (!deadline) return '';
        const today = moment().startOf('day');
        const deadlineDate = moment(deadline);
        const diffDays = deadlineDate.diff(today, 'days');

        if (diffDays === 0) {
            return 'Due today';
        } else if (diffDays < 0) {
            return `Due ${Math.abs(diffDays)} day(s) ago`;
        } else {
            return `Due in ${diffDays} day(s)`;
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/lists/${listId}/tasks/${item.task_id}`,{
                headers: {
                    Authorization: `Bearer ${token}`, // Make sure the token is correctly formatted
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Task deleted successfully');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
            // Optionally, you can refresh the tasks list or remove the deleted task from the UI
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task');
        }
    };

    return (
        <>
            <div className="w-[90%] h-48 md:w-64 lg:w-80 lg:h-64 bg-gray-800 rounded-lg relative mt-5">
                <div className="text-lg ml-3 p-3">{item.title}</div>
                <div className="flex justify-around">
                    {item.priority && <div className="bg-pink-500 p-2 rounded-lg text-xs">{item.priority}</div>}
                    {item.status && <div className="bg-green-500 p-2 rounded-lg text-xs">Done</div>}
                    {!item.status && <div className="bg-red-500 p-2 rounded-lg text-xs">Not Done</div>}
                    {item.deadline && <div className="bg-violet-500 p-2 text-xs rounded-lg">{getDeadlineText(item.deadline)}</div>}
                </div>
                <div className="text-xs mt-3 ml-2 mr-2">{item.content}</div>
                <div className="flex bottom-2 right-2 absolute">
                    <button className="hover:cursor-pointer" onClick={() => setShowModal(true)}>
                        <img src="/edit.svg" alt="Edit" />
                    </button>
                    <button className="hover:cursor-pointer" onClick={handleDelete}>
                        <img src="/delete.svg" alt="Delete" />
                    </button>
                </div>
                <UpdateTaskModal showModal={showModal} setShowModal={setShowModal} item={item} listId={listId} />
            </div>
        </>
    );
};

export default Card;