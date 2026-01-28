'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';

const MadeEasyPage = () => {
    const { subjects } = useSelector((state: IRootState) => state.subjects);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                Made Easy
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            বিষয়ভিত্তিক অধ্যায়, MCQ প্র্যাকটিস, PDF নোটস এবং ভিডিও ক্লাসের মাধ্যমে সহজ শিক্ষা পদ্ধতি
                        </p>
                        
                        {/* Quick Stats */}
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১০+</div>
                                <div className="text-gray-300">বিষয়</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১০০+</div>
                                <div className="text-gray-300">অধ্যায়</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৫০০০+</div>
                                <div className="text-gray-300">MCQ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subjects Grid - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                বিষয় সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আপনার পছন্দের বিষয় নির্বাচন করুন এবং শুরু করুন আপনার পড়াশোনা
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {subjects.map((subject, index) => (
                            <Link key={subject.id} href={`/made-easy/${subject.id}`}>
                                <div className={`group cursor-pointer bg-white border border-gray-100 p-6 hover:border-emerald-200 transition-all duration-300 opacity-0 animate-scaleIn ${
                                    index === 0 ? 'animation-delay-1000' :
                                    index === 1 ? 'animation-delay-1500' :
                                    index === 2 ? 'animation-delay-2000' :
                                    index === 3 ? 'animation-delay-2500' :
                                    'animation-delay-3000'
                                }`}>
                                    {/* Subject Icon */}
                                    <div className="aspect-w-16 aspect-h-9 mb-6">
                                        <div className="w-full h-48 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 flex items-center justify-center">
                                            <div className="text-6xl text-emerald-500 opacity-30">
                                                {subject.id === '1' && '🧮'}
                                                {subject.id === '2' && '⚗️'}
                                                {subject.id === '3' && '🔬'}
                                                {subject.id === '4' && '🌍'}
                                                {!['1', '2', '3', '4'].includes(subject.id) && '📚'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                                                {subject.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {subject.nameEn}
                                            </p>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {subject.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                {subject.totalChapters} অধ্যায়
                                            </div>
                                            
                                            <div className="text-emerald-600 group-hover:text-emerald-700 font-medium text-sm flex items-center">
                                                শুরু করুন
                                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                Made Easy এর বিশেষত্ব
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            আমাদের অনন্য শিক্ষা পদ্ধতি যা আপনার পড়াশোনাকে করবে আরও সহজ ও কার্যকর
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                ),
                                title: 'MCQ প্র্যাকটিস',
                                description: 'প্রতিটি অধ্যায়ে বিস্তৃত MCQ প্র্যাকটিস এবং তাৎক্ষণিক ফলাফল'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                ),
                                title: 'ভিডিও ক্লাস',
                                description: 'অভিজ্ঞ শিক্ষকদের ভিডিও লেকচার এবং ব্যাখ্যামূলক টিউটোরিয়াল'
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                ),
                                title: 'PDF নোটস',
                                description: 'সহজবোধ্য PDF নোটস ডাউনলোড এবং অফলাইন পড়াশোনা'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group relative text-center">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-6 text-white">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                কিভাবে কাজ করে
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            সহজ ৪টি ধাপে শুরু করুন আপনার পড়াশোনা
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: '১', title: 'বিষয় নির্বাচন', description: 'আপনার পছন্দের বিষয় বেছে নিন' },
                            { step: '২', title: 'অধ্যায় পড়ুন', description: 'অধ্যায়ভিত্তিক নোটস পড়ুন' },
                            { step: '৩', title: 'ভিডিও দেখুন', description: 'বিষয়ভিত্তিক ভিডিও ক্লাস দেখুন' },
                            { step: '৪', title: 'MCQ সমাধান', description: 'প্র্যাকটিস MCQ সমাধান করুন' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            আজই শুরু করুন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Made Easy এর সাথে আপনার পড়াশোনাকে করুন আরও সহজ ও কার্যকর
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                            বিষয় নির্বাচন করুন
                        </button>
                        <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                            আরও জানুন
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MadeEasyPage;