import React from 'react';
import logo from '../../assets/empty.png';

const EmptyPage = ({keywords}) => {
    return (
        <div className="text-center w-full col-span-full mt-20">
            <img
                src={logo}
                alt="No events"
                className="w-60 mx-auto mb-6"
            />
            <h2 className="text-4xl font-semibold text-gray-600">No Events Found</h2>
            <p className="text-gray-500 mt-2 text-2xl font-medium">Try some other keyword's. Nothing found by:- "{keywords}"</p>
        </div>
    );
};

export default EmptyPage;