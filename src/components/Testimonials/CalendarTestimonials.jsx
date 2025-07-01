import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion } from 'motion/react';
import WallClock from './WallClock';
import RealtimeCalendar from './RealtimeCalendar';
import TestimonialSlider from './TestimonialSlider';

const CalendarTestimonials = () => {
    return (
        <section className="bg-base-200 py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Side - Real-Time Calendar and Wall Clock */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-8"
                >
                    <WallClock />
                    <RealtimeCalendar />
                </motion.div>

                {/* Right Side - Testimonials */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-primary mb-6 text-center">What People Are Saying</h2>
                    <TestimonialSlider />
                </motion.div>
            </div>
        </section>
    );
};

export default CalendarTestimonials;
