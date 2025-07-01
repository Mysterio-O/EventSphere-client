import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { AnimatePresence, motion } from 'motion/react';
import { HiOutlineSortDescending, HiOutlineSortAscending } from "react-icons/hi";
import EmptyPage from './EmptyPage';

const Events = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [joinedEventIds, setJoinedEventIds] = useState([]);
    const { user } = useContext(AuthContext);

    const [searchValue, setSearchValue] = useState('');

    const [sort, setSort] = useState('');

    const [isSortOpen, setIsSortOpen] = useState(false);

    useEffect(() => {
        fetch(`https://event-sphere-server.vercel.app/events?filterByDate=${sort}`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setAllEvents(data?.events || []);
                const joinedIds = data?.events
                    ?.filter(ev => ev?.joinedMembers?.includes(user?.email))
                    ?.map(ev => ev._id);
                setJoinedEventIds(joinedIds || []);
            })
            .catch(err => {
                console.log('Error fetching all events:', err);
            });
    }, [user?.email, sort]);

    const formatDateTime = (dateStr, timeStr) => {
        const date = new Date(`${dateStr}T${timeStr}`);
        return date.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    const handleJoinEvent = (id, title) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Join.",
            confirmButtonColor: '#FBBF24',
            customClass: {
                popup: 'bg-accent text-neutral',
                title: 'text-primary',
                confirmButton: 'bg-highlight hover:bg-secondary text-neutral',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://event-sphere-server.vercel.app/joinEvent/${id}?email=${user?.email}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: "Joined!",
                            text: `You successfully joined ${title}.`,
                            icon: "success",
                            toast: true,
                            timer: 2000,
                            position: 'top-right'
                        });
                        // Update joined events in state
                        setJoinedEventIds(prev => [...prev, id]);
                    })
                    .catch(err => {
                        console.log('Error joining event', err);
                        Swal.fire({
                            title: "Error!",
                            text: `Error joining ${title}.`,
                            icon: "error",
                            toast: true,
                            timer: 2000,
                            position: 'top-right'
                        });
                    });
            }
        });
    };

    const filteredEvents = allEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(filteredEvents);


    const handleSortThisWeek = () => {
        setSort('thisWeek');
    }

    const handleSortLastWeek = async () => {
        setSort('lastWeek');
    }

    const handleSortLastMonth = () => {
        setSort('lastMonth')
    }
    const handleSortCurrentMonth = () => {
        setSort('currentMonth');
    }

    const handleSortDefault = () => {
        setSort('')
    }

    console.log(sort);


    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">

            <div className='mb-20 flex justify-between items-start gap-4 flex-wrap'>
                {/* Search Input */}
                <label className="input bg-gray-300 rounded-xl flex items-center gap-2">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="search"
                        placeholder="Search"
                        className="bg-transparent outline-none"
                    />
                </label>

                {/* Sort Section */}
                <div className='flex flex-col items-end'>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="btn btn-primary px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-200 ease-in-out mb-3 text-xl flex items-center gap-2"
                    >
                        {!isSortOpen ? 'Sort' : 'Collapse'}
                        {!isSortOpen
                            ? <HiOutlineSortDescending size={24} />
                            : <HiOutlineSortAscending size={24} />
                        }
                    </button>

                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                            className={`${!isSortOpen ? 'hidden' : 'flex'} justify-center gap-2 absolute top-45`}>
                            <button
                                onClick={handleSortThisWeek}
                                className="btn btn-primary capitalize px-5 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 mb-2"
                            >
                                sort by this week
                            </button>
                            <button
                                onClick={handleSortLastWeek}
                                className="btn btn-primary capitalize px-5 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 mb-2"
                            >
                                sort by last week
                            </button>
                            <button
                                onClick={handleSortLastMonth}
                                className="btn btn-primary capitalize px-5 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 mb-2"
                            >
                                sort by last month
                            </button>
                            <button
                                onClick={handleSortCurrentMonth}
                                className="btn btn-primary capitalize px-5 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200"
                            >
                                sort by current month
                            </button>
                            <button
                                onClick={handleSortDefault}
                                className="btn btn-primary capitalize px-5 py-2.5 text-base font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200"
                            >
                                sort by default
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {
                filteredEvents.length < 1 ? <EmptyPage keywords={searchValue} />
                    : <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {filteredEvents.map((event, idx) => {
                            const isJoined = joinedEventIds.includes(event._id);
                            return (
                                <motion.div
                                    initial={{ scale: 1, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, ease: 'easeIn', delay: idx * 0.2 }}
                                    key={event._id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
                                    <h2 className="text-xl font-bold text-blue-600 mb-2">{event.eventTitle}</h2>
                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-semibold">Posted by:</span> {event.addedBy}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-semibold">Date & Time:</span> {formatDateTime(event.eventDate, event.eventTime)}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-semibold">Location:</span> {event.location}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-2">
                                        <span className="font-semibold">Attendees:</span> {event.attendeeCount}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        <span className='font-semibold'>Event Description:</span> {event.eventDescription}
                                    </p>
                                    <button
                                        disabled={isJoined}
                                        onClick={() => handleJoinEvent(event._id, event.eventTitle)}
                                        className={`px-4 py-2 rounded-md transition duration-200 
                                ${isJoined
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                    >
                                        {isJoined ? 'Joined' : 'Join Event'}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
            }

        </div>
    );
};

export default Events;
