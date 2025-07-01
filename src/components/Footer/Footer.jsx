import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'motion/react';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0,scale:0.85 }}
            whileInView={{ opacity: 1, scale:1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-base-300 text-base-content py-10 mt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">EventSphere</h3>
                    <p>Your one-stop platform to discover, join, and create amazing events.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><button onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        } className="hover:underline">Home</button></li>
                        <li><a href="#topEvents" className="hover:underline">Top Events</a></li>
                        <li><a href="#upcomingEvents" className="hover:underline">Upcoming Events</a></li>
                        <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Contact Us</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2"><FaEnvelope /> support@eventify.com</li>
                        <li className="flex items-center gap-2"><FaPhoneAlt /> +1 234 567 890</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Follow Us</h4>
                    <div className="flex gap-4 text-2xl">
                        <a href="https://www.facebook.com" 
                        target="_blank"
                        className="hover:text-primary"><FaFacebook /></a>
                        <a href="https://x.com" 
                        target='_blank'
                        className="hover:text-primary"><FaTwitter /></a>
                        <a href="https://www.instagram.com" 
                        target='_blank'
                        className="hover:text-primary"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-10 border-t pt-6 text-sm">
                © {new Date().getFullYear()} Eventify. All rights reserved.
            </div>
        </motion.footer>
    );
};

export default Footer;
