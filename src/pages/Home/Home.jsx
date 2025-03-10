import React from 'react';
import Banner from '../Banner/Banner';
import Services from './Services/Services';
import Testimonials from './Testimonials/Testimonials';
import Hero from './Hero/Hero';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>STAR-T | Home</title>
            </Helmet>
            <Banner/>
            <Services/>
            <Testimonials/>
            <Hero/>
        </div>
    );
};

export default Home;