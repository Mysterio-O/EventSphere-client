import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const TopEvents = () => {
    const [topEvents, setTopEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        // Fetch top 5 events sorted by attendeeCount descending
        fetch('http://localhost:3000/topEvents')
            .then(res => res.json())
            .then(data => {
                if (data?.message === "didn't found top events data") {
                    Swal.fire({
                        text: "didn't found top events data. refresh the page or check your internet connection.",
                        icon: 'error',
                        position: 'top',
                        toast: true,
                        timer: 3000
                    })
                } else {
                    setTopEvents(data?.topEvents);
                }
            })
            .catch(err => {
                console.error('Failed to fetch top events:', err);
                Swal.fire({
                    text: 'Failed to fetch events data. Server run timeout.',
                    icon: 'error',
                    toast: true,
                    timer: 3000,
                    position: top
                })
            });
    }, []);

    const formatDateTime = (date, time) => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <motion.section
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-base-100 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-3xl md:text-4xl font-bold text-primary text-center mb-10"
                >
                    Top 5 Trending Events
                </motion.h2>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {topEvents.map((event, idx) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.4, ease: 'easeOut' }}
                            className="bg-accent text-neutral rounded-xl overflow-hidden shadow-lg flex flex-col border-t-2 border-l-2"
                        >
                            <div className="h-40 bg-secondary/30 flex items-center justify-center text-3xl font-bold text-primary">
                                {event.eventTitle.slice(0, 1).toUpperCase()}
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between text-center">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-primary">
                                        {event.eventTitle}
                                    </h3>
                                    <p className="text-sm mb-1">📍 {event.location}</p>
                                    <p className="text-sm mb-1">🕒 {formatDateTime(event.eventDate, event.eventTime)}</p>
                                    <p className="text-sm mb-1">👥 Attendees: {event.attendeeCount}</p>
                                </div>
                                <button
                                    className="mt-4 btn bg-secondary text-neutral hover:bg-black hover:text-white transition-colors duration-300 w-full"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="bg-black text-white max-w-xl w-full mx-4 p-6 rounded-lg shadow-lg relative"
                        >
                            <h3 className="font-bold text-2xl text-primary mb-2">{selectedEvent.eventTitle}</h3>
                            <p className="text-sm mb-1">🗓 {formatDateTime(selectedEvent.eventDate, selectedEvent.eventTime)}</p>
                            <p className="text-sm mb-1">📍 {selectedEvent.location}</p>
                            <p className="text-sm mb-1">👤 Added By: {selectedEvent.addedBy}</p>
                            <p className="text-sm mb-1">📧 {selectedEvent.email}</p>
                            <p className="text-sm mb-1">👥 Attendees: {selectedEvent.attendeeCount}</p>
                            <p className="mt-4">{selectedEvent.eventDescription}</p>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="btn bg-secondary text-neutral hover:bgn hover:text-accent"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


        </motion.section>
    );
};

export default TopEvents;
