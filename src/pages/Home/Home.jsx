import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import TopEvents from '../../components/TopEvents/TopEvents';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import CalendarTestimonials from '../../components/Testimonials/CalendarTestimonials';
import Footer from '../../components/Footer/Footer';

const Home = () => {

    useEffect(() => {
        document.title = "EventSphere || Home"
    }, []);

    return (
        <div>
            <div>
                <Banner/>
            </div>
            <div id='topEvents'>
                <TopEvents/>
            </div>
            <div id='upcomingEvents'>
                <UpcomingEvents/>
            </div>
            <div id='testimonials'>
                <CalendarTestimonials/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Home;