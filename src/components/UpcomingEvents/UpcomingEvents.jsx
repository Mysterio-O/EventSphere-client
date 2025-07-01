import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { Link } from 'react-router';

const UpcomingEvents = () => {

    const { user } = useContext(AuthContext);

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [joinedEventIds, setJoinedEventIds] = useState([]);

    useEffect(() => {
        fetch('https://event-sphere-server.vercel.app/upcomingEvents', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(async (data) => {
                console.log(data)
                setUpcomingEvents(data)
                const joined = data?.filter(ev => ev?.joinedMembers?.includes(user?.email))?.map(ev => ev._id?.toString());


                setJoinedEventIds(joined);
            })
            .catch(err => console.error('Error loading upcoming events:', err));
    }, [user]);

    const formatDateTime = (date, time) => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString('en-US', {
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

    console.log(joinedEventIds);

    return (
        <section className="bg-base-200 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-primary text-center mb-10"
                >
                    🎯 Don’t Miss These Upcoming Events
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, idx) => {
                        const isJoined = joinedEventIds.includes(event._id);
                        return (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                                className="bg-accent text-neutral p-5 rounded-xl shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-primary mb-2">
                                        {event.eventTitle}
                                    </h3>
                                    <p className="text-sm mb-1">🗓 {formatDateTime(event.eventDate, event.eventTime)}</p>
                                    <p className="text-sm mb-1">📍 {event.location}</p>
                                    <p className="text-sm mb-1">👤 Added by: {event.addedBy}</p>
                                    <p className="text-sm mb-1">👥 Attendees: {event.attendeeCount}</p>
                                </div>
                                {
                                    user ? <button
                                        disabled={isJoined}
                                        onClick={() => handleJoinEvent(event?._id, event?.eventTitle)}
                                        className={`px-4 py-2 rounded-md transition duration-200 
                                ${isJoined
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                                        {isJoined ? 'Joined' : 'Join Now'}
                                    </button>
                                        : <Link to="/auth/login">
                                            <p className='hover:underline-offset-1'>Sign In to join</p>
                                        </Link>
                                }
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
