import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

const AddEvent = () => {

    const { user } = useContext(AuthContext);
    console.log(user);

    const handleAddEvent = e => {
        e.preventDefault();

        const form = e.target;
        const title = form?.title.value;
        const name = form?.name.value;
        const email = form?.email.value;
        const date = form?.date.value;
        const time = form?.time.value;
        const attendeeCount = parseInt(form?.attendeeCount.value);
        const description = form?.description.value;

        const newEvent = {
            eventTitle: title,
            addedBy: name || user.displayName,
            email: email || user.email,
            eventDate: date,
            eventTime: time,
            attendeeCount,
            eventDescription: description
        }

        console.log(newEvent);

        if (newEvent) {
            fetch('http://localhost:3000/addEvent', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newEvent)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.result?.acknowledged || data?.result?.insertedId) {
                        return Swal.fire({
                            title: 'Added!',
                            text: 'Event added successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#FBBF24',
                            customClass: {
                                popup: 'bg-accent text-neutral',
                                title: 'text-primary',
                                confirmButton: 'bg-highlight hover:bg-secondary text-neutral',
                            },
                            didOpen: () => {
                                const popup = Swal.getPopup();
                                popup.style.borderRadius = '0.5rem';
                            },
                        });
                    } else {
                        return Swal.fire({
                            title: 'Failed',
                            text: 'Event adding failed!',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#FBBF24',
                            customClass: {
                                popup: 'bg-accent text-neutral',
                                title: 'text-primary',
                                confirmButton: 'bg-highlight hover:bg-secondary text-neutral',
                            },
                            didOpen: () => {
                                const popup = Swal.getPopup();
                                popup.style.borderRadius = '0.5rem';
                            },
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'Error!',
                        text: `An error ${err.message}`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#FBBF24',
                        customClass: {
                            popup: 'bg-accent text-neutral',
                            title: 'text-primary',
                            confirmButton: 'bg-highlight hover:bg-secondary text-neutral',
                        },
                        didOpen: () => {
                            const popup = Swal.getPopup();
                            popup.style.borderRadius = '0.5rem';
                        },
                    });
                })
        }

    }

    return (
        <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="min-h-screen bg-accent flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
                <h2 className="text-3xl font-bold text-primary text-center mb-6">Add your event in EventSphere</h2>
                <form
                    onSubmit={handleAddEvent}
                >

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* title */}
                        <div className="mb-4">
                            <label className="label text-neutral">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                                placeholder="Enter event title"
                                required
                            />
                        </div>

                        {/* name */}
                        <div className="mb-4">
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
                        <div className="mb-4">
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
                        <div className="mb-4">
                            <label className="label text-neutral">
                                <span className="label-text">Date</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                            />
                        </div>

                        {/* time */}
                        <div className="mb-6">
                            <label className="label text-neutral">
                                <span className="label-text">Time</span>
                            </label>
                            <input
                                type="time"
                                name="time"
                                required
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                            />
                        </div>

                        {/* count */}
                        <div className="mb-6">
                            <label className="label text-neutral">
                                <span className="label-text">Attendee Count</span>
                            </label>
                            <input
                                type="number"
                                name="attendeeCount"
                                required
                                className="input input-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                                defaultValue={0}
                            />
                        </div>
                    </div>


                    {/* description */}
                    <div className="mb-6">
                        <label className="label text-neutral">
                            <span className="label-text">Short Description</span>
                        </label>
                        <textarea
                            type="text"
                            rows={3}
                            required
                            name="description"
                            className="textarea textarea-bordered w-full bg-accent text-neutral outline-1 rounded-xs"
                        />
                    </div>
                    <button className="btn w-full bg-highlight text-neutral hover:bg-black hover:text-white transition-colors duration-300" >
                        Add Event
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddEvent;