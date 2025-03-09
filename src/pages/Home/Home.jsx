import React from 'react';
import Banner from '../Banner/Banner';
import Services from './Services/Services';
import Testimonials from './Testimonials/Testimonials';
import Hero from './Hero/Hero';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Services/>
            <Testimonials/>
            <Hero/>
        </div>
    );
};

export default Home;