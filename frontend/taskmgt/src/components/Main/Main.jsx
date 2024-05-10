import React, { useState, useEffect } from 'react';
import { Card, TaskModal } from '..';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const Main = ({ selectedList }) => {
  useEffect(() => {
    setSearchResults([]);
    setSearchStatus('');
  }, [selectedList])
  
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: '',
    status: false,
    deadline: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    done: false,
    notDone: false,
    highPriority: false,
    mediumPriority: false,
    lowPriority: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchTasks = async () => {
        try {
          let response;
          if (selectedList.listId === -1) {
            response = await axios.get(`https://task-mgt-three.vercel.app/mytask/tasks`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            setTasks(response.data);
            setFilteredTasks(response.data);
          } else {
            response = await axios.get(`https://task-mgt-three.vercel.app/lists/${selectedList.listId}/tasks`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            setTasks(response.data);
            setFilteredTasks(response.data);
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      fetchTasks();
    }
  }, [selectedList.listId]);

  useEffect(() => {
    filterTasks();
  }, [filterOptions, tasks]);

  const filterTasks = () => {
    let filtered = [...tasks];

    if (filterOptions.done) {
      filtered = filtered.filter((task) => task.status);
    }

    if (filterOptions.notDone) {
      filtered = filtered.filter((task) => !task.status);
    }

    if (filterOptions.highPriority) {
      filtered = filtered.filter((task) => task.priority === 'High');
    }

    if (filterOptions.mediumPriority) {
      filtered = filtered.filter((task) => task.priority === 'Medium');
    }

    if (filterOptions.lowPriority) {
      filtered = filtered.filter((task) => task.priority === 'Low');
    }

    setFilteredTasks(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setFilteredTasks((prevFilteredTasks) => [...prevFilteredTasks, newTask]);
    setFormData({
      title: '',
      content: '',
      priority: '',
      status: false,
      deadline: null,
    });
  };

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleFilterChange = (filter) => {
    setFilterOptions((prevFilterOptions) => ({
      ...prevFilterOptions,
      done: filter === 'done' ? true : false,
      notDone: filter === 'notDone' ? true : false,
      highPriority: filter === 'highPriority' ? true : false,
      mediumPriority: filter === 'mediumPriority' ? true : false,
      lowPriority: filter === 'lowPriority' ? true : false,
    }));
  };
  

  // Comment: Added state variables for search functionality
  const [searchStatus, setSearchStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Comment: Added function to handle search form submission
  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://task-mgt-three.vercel.app/search', // Remove the backticks and dollar signs
        { query: searchQuery },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use template literals for string interpolation
            'Content-Type': 'application/json',
          },
        }
      );
      setSearchResults(response.data);
      setSearchStatus(response.data.length > 0 ? 'found' : 'not-found');
    } catch (error) {
      console.error('Error searching tasks:', error);
      toast.error('Failed to search tasks');
    }
  };

  return (
    <>
      <div className="h-full w-full overflow-y-scroll">
        <TaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          formData={formData}
          listId={selectedList.listId}
        />
        <section className="flex items-start mt-5">
          <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
            <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center" onSubmit={handleSubmitSearch}>
                    <label htmlFor="simple-search" className="sr-only">
                      Search Tasks ..
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="search"
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add Task
                  </button>
                  <button
                    id="filterDropdownButton"
                    data-dropdown-toggle="filterDropdown"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                    onClick={toggleFilterDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="w-4 h-4 mr-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Filter
                    <svg
                      className="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>

                  <div
                    id="filterDropdown"
                    className={`z-10 ${isFilterDropdownOpen ? 'block' : 'hidden'
                      } w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700 absolute top-[120%]`}
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Filter by
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="dropdownDefault"
                    >
                      <li className="flex items-center">
                        <input
                          id="done"
                          type="checkbox"
                          value="done"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          checked={filterOptions.done}
                          onChange={() => handleFilterChange('done')}
                        />
                        <label
                          htmlFor="done"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Done
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="notDone"
                          type="checkbox"
                          value="notDone"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          checked={filterOptions.notDone}
                          onChange={() => handleFilterChange('notDone')}
                        />
                        <label
                          htmlFor="notDone"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Not Done
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="highPriority"
                          type="checkbox"
                          value="highPriority"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          checked={filterOptions.highPriority}
                          onChange={() => handleFilterChange('highPriority')}
                        />
                        <label
                          htmlFor="highPriority"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          High Priority
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="mediumPriority"
                          type="checkbox"
                          value="mediumPriority"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          checked={filterOptions.mediumPriority}
                          onChange={() => handleFilterChange('mediumPriority')}
                        />
                        <label
                          htmlFor="mediumPriority"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Medium Priority
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="lowPriority"
                          type="checkbox"
                          value="lowPriority"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          checked={filterOptions.lowPriority}
                          onChange={() => handleFilterChange('lowPriority')}
                        />
                        <label
                          htmlFor="lowPriority"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Low Priority
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mb-20 w-full relative flex justify-evenly items-start flex-wrap" style={{ height: 'fit-content' }}>
          {searchResults.length > 0 && searchStatus === 'found' ? (
            searchResults.map((item) => <Card key={item.task_id} item={item} listId={selectedList.listId} />)
          ) : searchStatus === 'not-found' ? (
            <p>No search results found.</p>
          ) : (
            filteredTasks.map((item) => <Card key={item.task_id} item={item} listId={selectedList.listId} />)
          )}
        </div>
      </div>
    </>
  )
};

export default Main;
