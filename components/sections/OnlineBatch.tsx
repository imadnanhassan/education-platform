'use client';
import React from 'react';
import Link from 'next/link';

const OnlineBatch: React.FC = () => {
    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                            আনলাইন ব্যাচের সিম্ফনীর পাঠশালা
                        </span>
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Live Class Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-3xl p-8 hover:bg-gray-800/90 transition-all duration-300 min-h-[280px] flex flex-col justify-center items-center text-center">
                            {/* Live Icon */}
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-1000"></div>
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-2000"></div>
                                </div>
                            </div>
                            
                            <div className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4">
                                ১০টি
                            </div>
                            <p className="text-white text-lg font-semibold">
                                সাপ্তাহিক লাইভ ক্লাস
                            </p>
                        </div>
                    </div>

                    {/* Recorded Class Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-3xl p-6 hover:bg-gray-800/90 transition-all duration-300 min-h-[280px] flex flex-col justify-center items-center text-center">
                            {/* Record Icon */}
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            
                            <div className="text-lg font-bold text-white mb-2">
                                রেকর্ডেড ক্লাস
                            </div>
                            <p className="text-blue-300 text-sm mb-4">
                                (তো আছেই)
                            </p>
                            <p className="text-gray-300 text-sm">
                                ক্লাস মিস? নো ইস্যু!
                            </p>
                        </div>
                    </div>

                    {/* MCQ Practice Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-3xl p-6 hover:bg-gray-800/90 transition-all duration-300 min-h-[280px] flex flex-col justify-center items-center text-center">
                            {/* Books Icon */}
                            <div className="flex space-x-2 mb-6">
                                <div className="w-8 h-12 bg-gradient-to-b from-pink-400 to-pink-600 rounded transform rotate-12 shadow-lg"></div>
                                <div className="w-8 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded transform -rotate-6 shadow-lg"></div>
                                <div className="w-8 h-12 bg-gradient-to-b from-green-400 to-green-600 rounded transform rotate-3 shadow-lg"></div>
                            </div>
                            
                            <div className="text-white text-base font-semibold mb-2">
                                প্রিন্টেড ম্যাটেরিয়াল ও
                            </div>
                            <div className="text-white text-base font-semibold">
                                সাথে প্রশ্নের নোটস
                            </div>
                        </div>
                    </div>

                    {/* SuperPrep Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-3xl p-6 hover:bg-gray-800/90 transition-all duration-300 min-h-[280px] flex flex-col justify-center items-center text-center">
                            <div className="text-2xl font-bold mb-2">
                                <span className="text-white">Super</span>
                                <span className="text-blue-400">Prep</span>
                            </div>
                            <p className="text-white text-sm mb-2">
                                আনলিমিটেড MCQ
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                                প্র্যাকটিসের সাথে এক্সাম
                            </p>
                            <p className="text-blue-300 text-sm">
                                প্রিপারেশন
                            </p>
                        </div>
                    </div>

                    {/* Homework Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-3xl p-6 hover:bg-gray-800/90 transition-all duration-300 min-h-[280px] flex flex-col justify-center items-center text-center">
                            {/* Student Image Placeholder */}
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            
                            <div className="text-white text-base font-semibold mb-2">
                                ক্লাসের পাশাপাশি
                            </div>
                            <div className="text-green-300 text-base font-semibold mb-2">
                                হোমওয়ার্ক ও
                            </div>
                            <div className="text-white text-base font-semibold">
                                সাপ্তাহিক পরীক্ষা
                            </div>
                        </div>
                    </div>

                    {/* SuperSolve Card */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/10 rounded-3xl p-6 hover:bg-gray-800/90 transition-all duration-300 min-h-[280px] flex flex-col justify-center items-center text-center">
                            <div className="text-2xl font-bold mb-4">
                                <span className="text-white">Super</span>
                                <span className="text-red-400">Solve</span>
                            </div>
                            <p className="text-white text-sm mb-2">
                                ২৪ ঘন্টা ডাউট সলভের জন্য
                            </p>
                            <p className="text-red-300 text-sm mb-2">
                                ডেডিকেটেড ১০টি শিক্ষকের
                            </p>
                            <div className="flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">TenTen</span>
                                <div className="w-6 h-6 bg-red-500 rounded-full ml-2 flex items-center justify-center">
                                    <span className="text-white text-xs">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-12 lg:mt-16">
                    <Link 
                        href="/courses"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
                    >
                        <span>এখনই যোগ দিন</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OnlineBatch;