'use client';
import React from 'react';
import Link from 'next/link';
import { teachersData } from '@/data/homeData';
import { cn } from '@/utils/cn';

const Teachers: React.FC = () => {
    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Simple Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.05) 2px, transparent 0), 
                                 radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.05) 2px, transparent 0)`,
                backgroundSize: '100px 100px'
            }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আমাদের শিক্ষকমণ্ডলী
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        অভিজ্ঞ ও দক্ষ শিক্ষকদের নিয়ে গঠিত আমাদের শিক্ষকমণ্ডলী
                    </p>
                </div>

                {/* Teachers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {teachersData.map((teacher, index) => (
                        <div key={teacher.id} className={cn(
                            "group relative opacity-0 animate-scaleIn",
                            index === 0 && "animation-delay-1000",
                            index === 1 && "animation-delay-1500",
                            index === 2 && "animation-delay-2000"
                        )}>
                            {/* Card */}
                            <div className="bg-white overflow-hidden border border-gray-100 h-full">
                                {/* Teacher Image */}
                                <div className="relative">
                                    <div className="h-64 overflow-hidden">
                                        <img 
                                            src={teacher.image} 
                                            alt={teacher.name}
                                            className="w-full h-full object-cover transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </div>

                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1">
                                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-gray-800 text-sm font-medium">{teacher.rating}</span>
                                    </div>

                                    {/* Experience Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1">
                                            {teacher.experience} বছর অভিজ্ঞতা
                                        </span>
                                    </div>
                                </div>

                                {/* Teacher Info */}
                                <div className="p-6">
                                    {/* Name & Designation */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-emerald-600 font-medium">
                                            {teacher.designation}
                                        </p>
                                    </div>

                                    {/* Subjects */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">বিষয়সমূহ:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {teacher.subjects.map((subject, idx) => (
                                                <span key={idx} className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 border border-green-200">
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">শিক্ষাগত যোগ্যতা:</h4>
                                        <ul className="space-y-1">
                                            {teacher.education.map((edu, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-center">
                                                    <div className="w-2 h-2 bg-emerald-500 mr-2"></div>
                                                    {edu}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="text-center bg-emerald-50 p-3">
                                            <div className="text-2xl font-bold text-emerald-600">{teacher.studentsCount}+</div>
                                            <div className="text-xs text-gray-600">শিক্ষার্থী</div>
                                        </div>
                                        <div className="text-center bg-green-50 p-3">
                                            <div className="text-2xl font-bold text-green-600">{teacher.experience}</div>
                                            <div className="text-xs text-gray-600">বছর অভিজ্ঞতা</div>
                                        </div>
                                    </div>

                                    {/* Contact Button */}
                                    <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 font-semibold transition-all duration-300">
                                        যোগাযোগ করুন
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link href="/teachers">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 border-0">
                            <span className="relative z-10 flex items-center">
                                সকল শিক্ষক দেখুন
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

export default Teachers;