import React from 'react';
import { NavLink } from 'react-router';
import bannerImg from '../../assets/banner.jpg'

const Banner = () => {
  return (
    <div className="hero min-h-[50vh] bg-accent">
      <div className="hero-content flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Discover and Create Unforgettable Events
          </h1>
          <p className="text-base md:text-lg text-neutral mb-6">
            Join the community, plan your next event with EventSphere
          </p>
          <NavLink to="/events" className="btn bg-secondary text-neutral hover:bgn hover:text-accent">
            Explore Events
          </NavLink>
        </div>
        {/* Banner Photo */}
        <div className="mt-8 lg:mt-0 w-full lg:w-1/2">
          <img
            src={bannerImg}
            alt="EventSphere Banner"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;