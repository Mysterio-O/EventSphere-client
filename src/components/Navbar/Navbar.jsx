import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/logo.png'
import { AuthContext } from '../../provider/AuthProvider';
import { AnimatePresence, motion } from 'motion/react';

// Navigation links array
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Add Event', path: '/add-event' },
  { name: 'My Event', path: '/my-event' },
];

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);


  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  }

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
        <ul className="menu menu-horizontal px-1 overflow-hidden flex items-center justify-center">
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
          {!user ? (
            <li>
              <NavLink to="/auth/login" className="btn btn-secondary ml-4 hover:bg-black hover:text-white transition-colors duration-300">
                Sign In
              </NavLink>
            </li>
          ) : (
            <div>
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='bg-black p-1 rounded-full'>
                <img
                  className='w-12 h-12 rounded-full cursor-pointer'
                  src={user?.photoURL}
                  alt={`${user?.displayName}'s photo`} />
              </div>
            </div>
          )}
        </ul>
      </div>

      {
        user && <AnimatePresence>
          {
            isMenuOpen && <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='absolute right-10 
        top-25 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl flex gap-2 flex-col justify-center items-center'>
              <p className='text-black text-xl'>{user?.name}</p>
              <button
                onClick={logout}
                className="btn btn-block btn-secondary hover:bg-black hover:text-white transition-colors duration-300">
                Log Out
              </button>
            </motion.div>
          }
        </AnimatePresence>
      }

      {/* Mobile Drawer Menu */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 z-20 text-white bg-black h-full">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                onClick={() => {
                  document.getElementById('my-drawer').checked = false;
                }}
                to={link.path}
                className={({ isActive }) =>
                  `text-neutral hover:text-highlight ${isActive ? 'text-highlight font-semibold' : ''}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!user ? (
            <li>
              <NavLink to="/auth/login" className="btn btn-secondary mt-4">
                Sign In
              </NavLink>
            </li>
          ) : (
            <>
              <li className="disabled">
                <span className="text-white">{user?.name}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-block btn-secondary hover:bg-black hover:text-white transition-colors duration-300">
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;