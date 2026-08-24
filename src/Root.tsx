import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Navbar } from './components/Layout/navBar';
import { TopBanner } from './components/Layout/TopBanner';
import Footer from './components/Layout/Footer';
import type { PageId } from './interfaces';
import TestPage from './testPage';

function Root() {
  return (

   <div>
    <div className="bg-primary text-gray">Hello World</div>
    {/* the div above is  to be deleted */}
    
        <main>
        <PageHero
  title="Find Your Dream Property"
  description="Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and designed to inspire your life. With expert guidance to suit every dream and every journey."
/>
   <PageHero 
    title="Elevate Your Real Estate Experience"
    description="Welcome to Estatein, where your real estate aspirations meet expert guidance. Explore our comprehensive range of services, each designed to cater to your unique needs and dreams."
    />
    <PageHero 
    title="Get in Touch with Estatein"
    description="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
    />
            <JourneyToday/>
            <Outlet/>
        </main>
   </div>
  )
}

export default Root