// TestimonialSlider.jsx
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
    {
        name: 'John Doe',
        feedback: 'This platform has made organizing events so much easier and fun!'
    },
    {
        name: 'Jane Smith',
        feedback: 'A truly seamless experience from start to finish.'
    },
    {
        name: 'Ahmed Khan',
        feedback: 'Love the intuitive design and smooth interactions!'
    }
];

const TestimonialSlider = () => {
    const [index, setIndex] = useState(0);

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center h-32"
                >
                    <FaUserCircle className="text-5xl text-primary mb-2" />
                    <p className="text-lg italic mb-2">"{testimonials[index].feedback}"</p>
                    <p className="font-semibold text-gray-700">- {testimonials[index].name}</p>
                </motion.div>
            </AnimatePresence>
            <div className="flex justify-between mt-4">
                <button onClick={handlePrev} className="btn btn-sm btn-outline">Prev</button>
                <button onClick={handleNext} className="btn btn-sm btn-outline">Next</button>
            </div>
        </div>
    );
};

export default TestimonialSlider;
