// src/components/MyEvents/EmptyState.jsx
import React from 'react';
import logo from '../../assets/empty.png';
const EmptyState = () => {
    return (
        <div className="text-center w-full col-span-full mt-20">
            <img
                src={logo}
                alt="No events"
                className="w-60 mx-auto mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-600">No Events Found</h2>
            <p className="text-gray-500 mt-2">You haven’t created or joined any events yet.</p>
        </div>
    );
};

export default EmptyState;
