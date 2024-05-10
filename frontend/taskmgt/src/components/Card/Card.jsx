import React, { useState } from 'react';
import { UpdateTaskModal } from '..';
import moment from 'moment';

const Card = ({ item }) => {
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

  return (
    <>
      <div className="w-[90%] h-48 md:w-64 lg:w-80 lg:h-64 bg-gray-800 rounded-lg relative mt-5">
        <div className="text-lg ml-3 p-3">{item.title}</div>
        <div className="flex justify-around">
          {item.priority && <div className="bg-red-500 p-2 rounded-lg text-xs">{item.priority}</div>}
          {item.deadline && <div className="bg-violet-500 p-2 text-xs rounded-lg">{getDeadlineText(item.deadline)}</div>}
        </div>
        <div className="text-xs mt-3 ml-2 mr-2">{item.content}</div>
        <div className="flex bottom-2 right-2 absolute">
          <button className="hover:cursor-pointer" onClick={() => setShowModal(true)}>
            <img src="/edit.svg" alt="Edit" />
          </button>
          <button className="hover:cursor-pointer">
            <img src="/delete.svg" alt="Delete" />
          </button>
        </div>
        <UpdateTaskModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Card;