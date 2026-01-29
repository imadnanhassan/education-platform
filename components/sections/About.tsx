'use client';
import React from 'react';
import { aboutInfo } from '@/data/homeData';
import { cn } from '@/utils/cn';

const About: React.FC = () => {
    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Light Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                     radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আমাদের সম্পর্কে
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {aboutInfo.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Mission & Vision */}
                    <div className="space-y-8">
                        {/* Mission */}
                        <div className="group relative mb-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">আমাদের লক্ষ্য</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {aboutInfo.mission}
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="group relative">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">আমাদের স্বপ্ন</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {aboutInfo.vision}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Founder Message & Stats */}
                    <div className="space-y-8">
                        {/* Founder Message */}
                        <div className="group relative mb-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="flex items-center mb-6">
                                    <img 
                                        src={aboutInfo.founderMessage.image} 
                                        alt={aboutInfo.founderMessage.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 mr-4"
                                    />
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">{aboutInfo.founderMessage.name}</h4>
                                        <p className="text-emerald-600">{aboutInfo.founderMessage.designation}</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-600 italic leading-relaxed">
                                    "{aboutInfo.founderMessage.message}"
                                </blockquote>
                            </div>
                        </div>

                        {/* Achievement Stats */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 text-center border border-emerald-100">
                                <div className="text-3xl font-bold text-emerald-600 mb-2">{aboutInfo.achievements.students}+</div>
                                <div className="text-gray-600 text-sm font-medium">সফল শিক্ষার্থী</div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
                                <div className="text-3xl font-bold text-green-600 mb-2">{aboutInfo.achievements.courses}+</div>
                                <div className="text-gray-600 text-sm font-medium">কোর্স ও প্রোগ্রাম</div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 text-center border border-emerald-100">
                                <div className="text-3xl font-bold text-emerald-600 mb-2">{aboutInfo.achievements.successRate}%</div>
                                <div className="text-gray-600 text-sm font-medium">সফলতার হার</div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
                                <div className="text-3xl font-bold text-green-600 mb-2">{aboutInfo.achievements.experience}+</div>
                                <div className="text-gray-600 text-sm font-medium">বছরের অভিজ্ঞতা</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Established Year */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200">
                        <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-800 font-medium">প্রতিষ্ঠিত: {aboutInfo.established}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;