import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AuthContext } from '../../provider/AuthProvider';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

const UpdateEvent = () => {

    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState({});

    const id = useParams();
    // console.log(id)

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/event/${id?.id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setEvent(data?.event)
            })
            .catch(err => {
                console.log('error fetching event data!', err);
            })
    }, [id]);

    console.log(event)

    const handleUpdateEvent = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const eventData = Object.fromEntries(formData.entries());
        console.log(eventData);

        const { attendeeCount, date, description, email, location, name, time, title } = eventData;

        const updatedEvent = {
            eventTitle: title,
            addedBy: name,
            email,
            eventDate: date,
            eventTime: time,
            attendeeCount: parseInt(attendeeCount),
            eventDescription: description,
            location
        }

        Swal.fire({
            title: "Are uou sure to update?",
            icon: 'question',
            text: 'Your event will be updated.',
            confirmButtonText: 'Yes, update..',
            showCancelButton:true,
            cancelButtonText: 'Go back...',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/updateEvent/${id?.id}`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedEvent)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data?.message === 'Update successful.') {
                            Swal.fire({
                                title: "Update successful!",
                                icon: 'success',
                                text: `Successfully updated ${name}`,
                                confirmButtonText: 'Back to Events',
                                confirmButtonColor: '#FBBF24',
                            }).then(result => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Navigating...',
                                        text: 'Navigating to your events...',
                                        icon: 'success',
                                        iconColor: 'green',
                                        timer: 2000,
                                        toast: true,
                                        position: top,
                                    })
                                    setTimeout(() => {
                                        navigate('/my-event')
                                    }, 2100);
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    return (
        <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="min-h-screen bg-accent flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
                <h2 className="text-3xl font-bold text-primary text-center mb-6">Update your event</h2>
                <form
                    onSubmit={handleUpdateEvent}
                >

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* title */}
                        <div className="flex flex-col justify-around">
                            <label className="label text-neutral">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                                placeholder="Enter event title"
                                defaultValue={event?.eventTitle}
                                required
                            />
                        </div>

                        {/* name */}
                        <div className="flex flex-col justify-around">
                            <label className="label text-neutral">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                                value={user?.displayName}
                                readOnly
                            />
                        </div>

                        {/* email */}
                        <div className="flex flex-col justify-around">
                            <label className="label text-neutral">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                                value={user?.email}
                                readOnly
                            />
                        </div>

                        {/* date */}
                        <div className="flex flex-col justify-around">
                            <label className="label text-neutral">
                                <span className="label-text">Date</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                defaultValue={event?.eventDate}
                                required
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                            />
                        </div>

                        {/* time */}
                        <div className="flex flex-col justify-around">
                            <label className="label text-neutral">
                                <span className="label-text">Time</span>
                            </label>
                            <input
                                type="time"
                                name="time"
                                defaultValue={event?.eventTime}
                                required
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                            />
                        </div>

                        {/* count */}
                        <div className="flex flex-col justify-around">
                            <label className="label text-neutral">
                                <span className="label-text">Attendee Count</span>
                            </label>
                            <input
                                type="number"
                                name="attendeeCount"
                                required
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                                defaultValue={event?.attendeeCount}
                            />
                        </div>
                    </div>

                    {/* location */}
                    <div className="flex flex-col justify-around mt-2">
                        <label className="label text-neutral">
                            <span className="label-text">Event Location</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={event?.location}
                            required
                            name="location"
                            className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                        />
                    </div>

                    {/* description */}
                    <div className="flex flex-col justify-around mt-2">
                        <label className="label text-neutral">
                            <span className="label-text">Short Description</span>
                        </label>
                        <textarea
                            type="text"
                            rows={3}
                            defaultValue={event?.eventDescription}
                            required
                            name="description"
                            className="textarea textarea-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                        />
                    </div>
                    <button className="btn w-full bg-highlight text-neutral hover:bg-black hover:text-white transition-colors duration-300 mt-2" >
                        Update Event
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default UpdateEvent;