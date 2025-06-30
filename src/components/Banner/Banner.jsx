import React from 'react';
import { NavLink } from 'react-router';
import bannerImg from '../../assets/banner.jpg'
import { motion } from 'motion/react';

const Banner = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeIn' }}
      className="hero min-h-[50vh] bg-accent">
      <div className="hero-content flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 overflow-hidden">
        {/* Text Content */}
        <motion.div
        initial={{x:800}}
        animate={{x:0}}
        transition={{duration:0.7,ease:'backInOut'}}
        className="text-center lg:text-left max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Discover and Create Unforgettable Events
          </h1>
          <p className="text-base md:text-lg text-neutral mb-6">
            Join the community, plan your next event with EventSphere
          </p>
          <NavLink to="/events" className="btn bg-secondary text-neutral hover:bgn hover:text-accent">
            Explore Events
          </NavLink>
        </motion.div>
        {/* Banner Photo */}
        <motion.div
        initial={{x:400}}
        animate={{x:0}}
        transition={{duration:0.5,ease:'backInOut'}}
        className="mt-8 lg:mt-0 w-full lg:w-1/2">
          <img
            src={bannerImg}
            alt="EventSphere Banner"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;