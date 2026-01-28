'use client';
import React from 'react';
import Link from 'next/link';
import { coursesData } from '@/data/homeData';
import { cn } from '@/utils/cn';

const Courses: React.FC = () => {
    const getLevelColor = (level: string) => {
        const levelColors = {
            beginner: 'bg-green-500',
            intermediate: 'bg-yellow-500',
            advanced: 'bg-red-500'
        };
        return levelColors[level as keyof typeof levelColors] || levelColors.beginner;
    };

    const getLevelText = (level: string) => {
        const levelTexts = {
            beginner: 'শুরুর স্তর',
            intermediate: 'মধ্যম স্তর',
            advanced: 'উন্নত স্তর'
        };
        return levelTexts[level as keyof typeof levelTexts] || levelTexts.beginner;
    };

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Light Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                     radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            জনপ্রিয় কোর্সসমূহ
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আমাদের সবচেয়ে জনপ্রিয় ও কার্যকর কোর্সগুলো দেখুন
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coursesData.map((course, index) => (
                        <div key={course.id} className={cn(
                            "group relative opacity-0 animate-scaleIn",
                            index === 0 && "animation-delay-1000",
                            index === 1 && "animation-delay-1500",
                            index === 2 && "animation-delay-2000",
                            index === 3 && "animation-delay-2500"
                        )}>
                            {/* Popular Badge */}
                            {course.isPopular && (
                                <div className="absolute -top-3 -right-3 z-10">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        জনপ্রিয়
                                    </div>
                                </div>
                            )}

                            {/* Card */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full border border-gray-100">
                                {/* Course Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={course.image} 
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    
                                    {/* Level Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-semibold text-white",
                                            getLevelColor(course.level)
                                        )}>
                                            {getLevelText(course.level)}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-gray-800 text-xs font-medium">{course.rating}</span>
                                    </div>
                                </div>

                                {/* Course Content */}
                                <div className="p-6">
                                    {/* Category */}
                                    <div className="mb-3">
                                        <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30">
                                            {course.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {course.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    {/* Course Info */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            সময়কাল: {course.duration}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {course.students} জন শিক্ষার্থী
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-emerald-600">৳{course.price.toLocaleString()}</span>
                                            <span className="text-gray-500 text-sm ml-1">/মাস</span>
                                        </div>
                                        <Link href={`/courses/${course.id}`}>
                                            <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md">
                                                বিস্তারিত
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link href="/courses">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-0">
                            <span className="relative z-10 flex items-center">
                                সকল কোর্স দেখুন
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Courses;