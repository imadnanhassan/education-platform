'use client';
import React from 'react';
import Link from 'next/link';
import { galleryData } from '@/data/homeData';
import { cn } from '@/utils/cn';

const Gallery: React.FC = () => {
    const getCategoryColor = (category: string) => {
        const colors = {
            campus: 'bg-emerald-500',
            events: 'bg-green-500',
            activities: 'bg-teal-500',
            achievements: 'bg-cyan-500'
        };
        return colors[category as keyof typeof colors] || colors.campus;
    };

    const getCategoryText = (category: string) => {
        const texts = {
            campus: 'ক্যাম্পাস',
            events: 'ইভেন্ট',
            activities: 'কার্যক্রম',
            achievements: 'অর্জন'
        };
        return texts[category as keyof typeof texts] || texts.campus;
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
                            গ্যালারি
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        আমাদের ক্যাম্পাস, ইভেন্ট ও কার্যক্রমের ছবি দেখুন
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {galleryData.map((item, index) => (
                        <div key={item.id} className={cn(
                            "group relative opacity-0 animate-scaleIn cursor-pointer",
                            index === 0 && "animation-delay-1000 md:col-span-2 md:row-span-2",
                            index === 1 && "animation-delay-1500",
                            index === 2 && "animation-delay-2000",
                            index === 3 && "animation-delay-2500"
                        )}>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            
                            {/* Image Card */}
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 h-full">
                                <div className={cn(
                                    "relative overflow-hidden",
                                    index === 0 ? "h-96 md:h-full" : "h-64"
                                )}>
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md",
                                            getCategoryColor(item.category)
                                        )}>
                                            {getCategoryText(item.category)}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                                        <span className="text-white text-xs">
                                            {new Date(item.date).toLocaleDateString('bn-BD')}
                                        </span>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-200 text-sm">
                                            {item.titleEn}
                                        </p>
                                    </div>

                                    {/* View Icon */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Category Filter (Optional) */}
                <div className="flex justify-center mt-12">
                    <div className="flex flex-wrap gap-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
                        {['সব', 'ক্যাম্পাস', 'ইভেন্ট', 'কার্যক্রম', 'অর্জন'].map((category, index) => (
                            <button 
                                key={category}
                                className={cn(
                                    "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                                    index === 0 
                                        ? "bg-emerald-500 text-white shadow-md" 
                                        : "text-gray-300 hover:text-emerald-400 hover:bg-white/10"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link href="/gallery">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-0">
                            <span className="relative z-10 flex items-center">
                                সম্পূর্ণ গ্যালারি দেখুন
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

export default Gallery;