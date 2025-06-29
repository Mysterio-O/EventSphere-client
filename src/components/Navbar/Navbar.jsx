import React, { useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/logo.png'

// Navigation links array
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Add Event', path: '/add-event' },
  { name: 'My Event', path: '/my-event' },
];

const Navbar = () => {
  // Mock authentication state (replace with your auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = {
    name: 'John Doe',
    photoURL: 'https://via.placeholder.com/40', // Replace with actual user photo URL
  };

  return (
    <div className="navbar bg-primary text-neutral shadow-lg px-4 md:px-6 lg:px-10">
      {/* Logo and Website Name */}
      <div className="flex-1">
        <NavLink to="/" className="text-xl font-bold flex items-center gap-2">
          <img
            src={logo}
            alt="EventSphere Logo"
            className="w-40 h-8"
          />
          
        </NavLink>
      </div>

      {/* Hamburger Menu for Small Devices */}
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1 overflow-hidden">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-neutral hover:scale-105 text-xl transition-all duration-300 ${isActive ? 'text-highlight font-bold' : ''}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!isLoggedIn ? (
            <li>
              <NavLink to="/auth/login" className="btn btn-secondary ml-4 hover:bg-black hover:text-white transition-colors duration-300">
                Sign In
              </NavLink>
            </li>
          ) : (
            <li>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt="Profile" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-accent text-neutral rounded-box w-52 shadow-lg"
                >
                  <li className="disabled">
                    <span className="text-neutral">{user.name}</span>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      className={({ isActive }) =>
                        `hover:bg-highlight hover:text-neutral ${isActive ? 'bg-highlight text-neutral' : ''}`
                      }
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Drawer Menu */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-accent text-neutral h-full">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-neutral hover:text-highlight ${isActive ? 'text-highlight font-semibold' : ''}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!isLoggedIn ? (
            <li>
              <NavLink to="/auth/login" className="btn btn-secondary mt-4">
                Sign In
              </NavLink>
            </li>
          ) : (
            <>
              <li className="disabled">
                <span className="text-neutral">{user.name}</span>
              </li>
              <li>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    `hover:bg-highlight hover:text-neutral ${isActive ? 'bg-highlight text-neutral' : ''}`
                  }
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;