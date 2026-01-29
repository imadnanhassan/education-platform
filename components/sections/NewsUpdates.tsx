'use client';
import React from 'react';
import Link from 'next/link';
import { newsUpdatesData } from '@/data/homeData';
import { cn } from '@/utils/cn';

const NewsUpdates: React.FC = () => {
    const getCategoryColor = (category: string) => {
        const colors = {
            announcement: 'bg-emerald-500',
            event: 'bg-green-500',
            notice: 'bg-yellow-500',
            blog: 'bg-blue-500'
        };
        return colors[category as keyof typeof colors] || colors.announcement;
    };

    const getCategoryText = (category: string) => {
        const texts = {
            announcement: 'ঘোষণা',
            event: 'ইভেন্ট',
            notice: 'নোটিশ',
            blog: 'ব্লগ'
        };
        return texts[category as keyof typeof texts] || texts.announcement;
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
                            সংবাদ ও আপডেট
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        সর্বশেষ ঘোষণা, ইভেন্ট ও গুরুত্বপূর্ণ তথ্য জানুন
                    </p>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsUpdatesData.map((news, index) => (
                        <article key={news.id} className={cn(
                            "group relative opacity-0 animate-scaleIn",
                            index === 0 && "animation-delay-1000",
                            index === 1 && "animation-delay-1500",
                            index === 2 && "animation-delay-2000"
                        )}>
                            {/* News Card */}
                            <div className="relative bg-white overflow-hidden border border-gray-100 h-full">
                                {/* News Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={news.image} 
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={cn(
                                            "px-3 py-1 text-xs font-semibold text-white",
                                            getCategoryColor(news.category)
                                        )}>
                                            {getCategoryText(news.category)}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                                        <span className="text-gray-800 text-sm font-medium">
                                            {new Date(news.date).toLocaleDateString('bn-BD')}
                                        </span>
                                    </div>
                                </div>

                                {/* News Content */}
                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">
                                        {news.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                        {news.excerpt}
                                    </p>

                                    {/* Author & Read More */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-500 text-xs">{news.author}</span>
                                        </div>
                                        
                                        <Link href={`/news/${news.id}`}>
                                            <button className="group/btn flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors duration-300">
                                                বিস্তারিত
                                                <svg className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Important Notice */}
                    <div className="group relative bg-white p-6 border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">জরুরি নোটিশ</h4>
                        <p className="text-gray-600 text-sm">সকল গুরুত্বপূর্ণ নোটিশ ও ঘোষণা</p>
                    </div>

                    {/* Academic Calendar */}
                    <div className="group relative bg-white p-6 border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">একাডেমিক ক্যালেন্ডার</h4>
                        <p className="text-gray-600 text-sm">পরীক্ষা ও ইভেন্টের তারিখ</p>
                    </div>

                    {/* Results */}
                    <div className="group relative bg-white p-6 border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">ফলাফল</h4>
                        <p className="text-gray-600 text-sm">পরীক্ষার ফলাফল ও মেরিট তালিকা</p>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link href="/news">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 border-0">
                            <span className="relative z-10 flex items-center">
                                সকল সংবাদ দেখুন
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

export default NewsUpdates;