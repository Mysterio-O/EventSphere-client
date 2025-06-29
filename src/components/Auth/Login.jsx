import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Login = () => {

    const [inputErr, setInputErr] = useState('');

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
            body: JSON.stringify(loginInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
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