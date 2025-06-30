import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import MyEventCard from './MyEventCard';

const MyEvents = () => {

    const { user } = useContext(AuthContext);

    const [myEvents, setMyEvents] = useState([]);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/events?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyEvents(data?.events)
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: 'Failed!',
                    text: 'Failed to load your products!',
                    showConfirmButton: true,
                    toast: true,
                    timer: 2000,
                    position: 'top',
                    customClass: {
                        popup: 'bg-accent text-neutral',
                        title: 'text-primary',
                        confirmButton: 'bg-highlight hover:bg-secondary text-neutral',
                    },

                })
            })
    }, [user]);

    // console.log(myEvents);

    const filteredEvents = myEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(filteredEvents);

    
    return (
        <div className='px-4 py-8 max-w-7xl mx-auto'>
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
            </div>
            <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
{
    filteredEvents.map((event,idx) => <MyEventCard key={event?._id} event={event} idx={idx}/>)
}
            </div>
        </div>
    );
};

export default MyEvents;