// RealtimeCalendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'motion/react';

const RealtimeCalendar = () => {
    const [date, setDate] = useState(new Date());

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg shadow-xl bg-white p-4 w-full max-w-xs"
        >
            <Calendar
                onChange={setDate}
                value={date}
                className="w-full text-center"
            />
            <p className="mt-4 text-center text-primary font-semibold">
                Selected Date: {date.toDateString()}
            </p>
        </motion.div>
    );
};

export default RealtimeCalendar;
