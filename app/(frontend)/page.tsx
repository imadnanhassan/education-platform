import { Metadata } from 'next';
// Home page components
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import Teachers from '@/components/sections/Teachers';
import OnlineBatch from '@/components/sections/OnlineBatch';
import Gallery from '@/components/sections/Gallery';
import NewsUpdates from '@/components/sections/NewsUpdates';
import Contact from '@/components/sections/Contact';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import Courses from '@/components/sections/Courses';
import AdmissionProcess from '@/components/sections/AdmissionProcess';

export const metadata: Metadata = {
    title: 'গ্র্যাভিটন একাডেমি - শিক্ষার নতুন দিগন্ত',
    description: 'Complete education platform for academic excellence and abroad preparation. Made Easy System, Study Abroad Programs, Clubs & Activities.',
    keywords: 'education, academy, HSC, SSC, IELTS, SAT, study abroad, Bangladesh education',
};

const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Spotlight */}
            <Hero />
            
            {/* About Section */}
            <About />
            
            {/* Services Overview */}
            <Services />
            
            {/* Features Section */}
            <Features />
            
            {/* Popular Courses */}
            <Courses />
            
            {/* Success Stories */}
            <Testimonials />
            
            {/* Expert Teachers */}
            <Teachers />
            
            {/* Online Batch */}
            <OnlineBatch />
            
            {/* Admission Process */}
            <AdmissionProcess />
            
            {/* Gallery Preview */}
            <Gallery />
            
            {/* News & Updates */}
            <NewsUpdates />
            
            {/* Stats Section */}
            <Stats />
            
            {/* Contact & Location */}
            <Contact />
        </div>
    );
};

export default HomePage;