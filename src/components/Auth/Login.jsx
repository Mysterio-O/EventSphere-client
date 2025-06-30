import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {

    const [inputErr, setInputErr] = useState('');

    const location = useLocation();
    console.log(location);

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        let loginInfo = {};
        if (email && password) {
            loginInfo = {
                email, password
            }
        }

        if (!loginInfo) {
            return setInputErr('Fill the fields to login.')
        }

        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginInfo),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {

                if (data?.message === 'No user found with the email address!') {
                   return Swal.fire({
                        title: 'Failed!',
                        text: 'No account found with this email. Create a new account.',
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

                if (data?.message === 'Unauthorized! Password didnt match') {
                    return Swal.fire({
                        title: 'Failed!',
                        text: 'Password didnt match. Try again.',
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
                console.log(data);
                setUser(data?.user);
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Welcome to EventSphere!.',
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
                navigate(`${location?.state ? location.state : '/'}`);
            })
            .catch(err => {
                console.log(err);

                Swal.fire({
                    title: 'Failed!',
                    text: 'Login failed!',
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

    return (
        <div className="min-h-screen bg-accent flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-lg p-6">
                <h2 className="text-3xl font-bold text-primary text-center mb-6">Login to EventSphere</h2>
                <form
                    onSubmit={handleLogin}
                >
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
                    <div className="form-control mb-6">
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
                    <button className="btn w-full bg-highlight text-neutral hover:bg-black hover:text-white transition-colors duration-300">
                        Login
                    </button>

                    {
                        inputErr && <p className="text-red-500">{inputErr}</p>
                    }

                </form>
                <p className="text-center text-neutral mt-4">
                    Don’t have an account?{' '}
                    <NavLink to="/auth/register" className="text-highlight hover:underline">
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;