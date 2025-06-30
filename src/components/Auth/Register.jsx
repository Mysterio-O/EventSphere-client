import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {

    const [passErr, setPassErr] = useState('');
    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();

        const date = new Date();
        const createdAt = date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const time = { createdAt };

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photoURL.value;
        // console.log(name, email, password, photo, time);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !password) {
            return Swal.fire({
                title: 'Error!',
                text: 'Please fill in all required fields',
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
        if (!emailRegex.test(email)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email address',
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
        if (!/.{6,}/.test(password)) {
            setPassErr("Password must be at least 6 characters");
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setPassErr("Password must contain at least 1 lowercase letter");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setPassErr('Password must contain at least one uppercase letter');
            return;
        }
        else {
            setPassErr('');
        }

        const userInfo = {
            displayName: name,
            email,
            password,
            photoURL: photo || '',
            accountCreated: time
        }
        console.log(userInfo);

        if (userInfo) {
            fetch('http://localhost:3000/register', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => res.json())
                .then(data => {

                    if (data?.message === 'Email already in use!') {
                        return Swal.fire({
                            title: 'Registration filed!',
                            text: 'Email is already in use! Try another one.',
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

                    if (data?.result?.insertedId) {
                        Swal.fire({
                            title: 'Registration Successful!',
                            text: 'Welcome to EventSphere! You can now log in.',
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
                        navigate('/auth/login');
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'Registration Failed!',
                        text: 'Registration failed!',
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
                })
        }
    }


    return (
        <div className="min-h-screen bg-accent flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
                <h2 className="text-3xl font-bold text-primary text-center mb-6">Sign Up for EventSphere</h2>
                <form
                    onSubmit={handleRegister}
                >
                    <div className="mb-4">
                        <label className="label text-neutral">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full bg-accent text-neutral"
                            placeholder="Enter your name"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="label text-neutral">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full bg-accent text-neutral"
                            placeholder="Enter your email"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="label text-neutral">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full bg-accent text-neutral"
                            placeholder="Enter your password"

                        />
                    </div>
                    <div className="mb-6">
                        <label className="label text-neutral">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="url"
                            name="photoURL"
                            className="input input-bordered w-full bg-accent text-neutral"
                            placeholder="Enter your photo URL"
                        />
                    </div>
                    {
                        passErr && <p className='text-red-500 text-sm'>{passErr}</p>
                    }
                    <button className="btn w-full bg-highlight text-neutral hover:bg-black hover:text-white transition-colors duration-300" >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-neutral mt-4">
                    Already have an account?{' '}
                    <NavLink to="/auth/login" className="text-highlight hover:underline">
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;