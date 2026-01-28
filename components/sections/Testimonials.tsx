'use client';
import React, { useState, useEffect } from 'react';
import { testimonialsData } from '@/data/homeData';

const Testimonials: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            সফলতার গল্প
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        আমাদের শিক্ষার্থীদের সফলতার অভিজ্ঞতা ও মতামত
                    </p>
                </div>

                {/* Main Slider Container */}
                <div 
                    className="relative mb-12"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Slider Wrapper */}
                    <div className="overflow-hidden rounded-2xl">
                        <div 
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {testimonialsData.map((testimonial, index) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0">
                                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 lg:p-12 mx-4">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                            {/* Quote & Message */}
                                            <div className="lg:col-span-2 space-y-6">
                                                {/* Quote Icon */}
                                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-emerald-400/30">
                                                    <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                                    </svg>
                                                </div>

                                                {/* Message */}
                                                <blockquote className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-medium">
                                                    "{testimonial.message}"
                                                </blockquote>

                                                {/* Rating */}
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                        </svg>
                                                    ))}
                                                    <span className="ml-2 text-gray-300 font-medium">৫.০ রেটিং</span>
                                                </div>
                                            </div>

                                            {/* Student Info */}
                                            <div className="text-center lg:text-left">
                                                {/* Profile Image */}
                                                <div className="relative inline-block mb-6">
                                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-400/50 shadow-lg">
                                                        <img 
                                                            src={testimonial.image} 
                                                            alt={testimonial.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Student Details */}
                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="text-2xl font-bold text-white">
                                                            {testimonial.name}
                                                        </h4>
                                                        <p className="text-emerald-400 font-semibold">
                                                            {testimonial.designation}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="space-y-2 text-sm text-gray-300">
                                                        <p className="flex items-center justify-center lg:justify-start">
                                                            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            {testimonial.course}
                                                        </p>
                                                        <p className="flex items-center justify-center lg:justify-start">
                                                            <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {testimonial.year}
                                                        </p>
                                                    </div>

                                                    <div className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                                        {testimonial.designation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center items-center space-x-3 mb-16">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-emerald-400 w-8' 
                                    : 'bg-white/30 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {testimonialsData.map((testimonial, index) => (
                        <div 
                            key={testimonial.id} 
                            className={`cursor-pointer transition-all duration-300 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 ${
                                index === currentSlide 
                                    ? 'ring-2 ring-emerald-400 bg-white/15' 
                                    : ''
                            }`}
                            onClick={() => goToSlide(index)}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-2 border-emerald-400/50">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h5 className="font-bold text-white mb-1">
                                    {testimonial.name}
                                </h5>
                                <p className="text-sm text-emerald-400 mb-2 font-medium">
                                    {testimonial.designation}
                                </p>
                                <div className="inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
                                    {testimonial.course}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">৯৮%</div>
                        <div className="text-gray-300 font-medium">সন্তুষ্ট শিক্ষার্থী</div>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl font-bold text-green-400 mb-2">৫০০+</div>
                        <div className="text-gray-300 font-medium">পজিটিভ রিভিউ</div>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl font-bold text-emerald-500 mb-2">৪.৯</div>
                        <div className="text-gray-300 font-medium">গড় রেটিং</div>
                    </div>
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl font-bold text-green-500 mb-2">১০০%</div>
                        <div className="text-gray-300 font-medium">সাপোর্ট কোয়ালিটি</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;