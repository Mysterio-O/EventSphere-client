import React from 'react';
import { motion } from 'motion/react';

const MyEventCard = ({event,idx}) => {

    const formatDateTime = (dateStr, timeStr) => {
        const date = new Date(`${dateStr}T${timeStr}`);
        return date.toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

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
            <div className='flex justify-end gap-2'>
                <button
                className='btn btn-primary rounded-xl hover:bg-black hover:text-white transition-colors duration-300'
                >Update</button>
                <button
                className='btn border-2 border-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors duration-300'
                >Delete</button>
            </div>
        </motion.div>
    );
};

export default MyEventCard;