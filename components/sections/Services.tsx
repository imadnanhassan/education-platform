'use client';
import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/homeData';
import { cn } from '@/utils/cn';

const Services: React.FC = () => {
    const getIcon = (iconName: string) => {
        const icons = {
            book: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            ),
            globe: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            users: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            ),
            award: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            )
        };
        return icons[iconName as keyof typeof icons] || icons.book;
    };

    const getColorClasses = (color: string) => {
        const colorMap = {
            emerald: {
                gradient: 'from-emerald-400 to-emerald-600',
                bg: 'from-emerald-400/20 to-emerald-600/20',
                text: 'text-emerald-400',
                border: 'border-emerald-400/30'
            },
            green: {
                gradient: 'from-green-400 to-green-600',
                bg: 'from-green-400/20 to-green-600/20',
                text: 'text-green-400',
                border: 'border-green-400/30'
            },
            teal: {
                gradient: 'from-teal-400 to-teal-600',
                bg: 'from-teal-400/20 to-teal-600/20',
                text: 'text-teal-400',
                border: 'border-teal-400/30'
            },
            cyan: {
                gradient: 'from-cyan-400 to-cyan-600',
                bg: 'from-cyan-400/20 to-cyan-600/20',
                text: 'text-cyan-400',
                border: 'border-cyan-400/30'
            }
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
    };

    return (
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            আমাদের সেবাসমূহ
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        শিক্ষার প্রতিটি ক্ষেত্রে আমাদের বিশেষায়িত সেবা ও প্রোগ্রাম
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {servicesData.map((service, index) => {
                        const colors = getColorClasses(service.color);
                        return (
                            <div key={service.id} className={cn(
                                "group relative opacity-0 animate-scaleIn",
                                index === 0 && "animation-delay-1000",
                                index === 1 && "animation-delay-1500",
                                index === 2 && "animation-delay-2000",
                                index === 3 && "animation-delay-2500"
                            )}>
                                {/* Glow Effect */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300",
                                    colors.bg
                                )}></div>
                                
                                {/* Card */}
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 h-full">
                                    {/* Icon */}
                                    <div className={cn(
                                        "w-16 h-16 bg-gradient-to-r rounded-2xl flex items-center justify-center mb-6 mx-auto",
                                        colors.gradient
                                    )}>
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {getIcon(service.icon)}
                                        </svg>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-300 text-center mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-300">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full mr-3",
                                                    colors.text.replace('text-', 'bg-')
                                                )}></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link href={service.link} className="block">
                                        <button className={cn(
                                            "w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 border-2",
                                            "bg-transparent hover:bg-white/10",
                                            colors.text,
                                            colors.border,
                                            "hover:scale-105 hover:shadow-lg"
                                        )}>
                                            বিস্তারিত দেখুন
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link href="/courses">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-0">
                            <span className="relative z-10">সকল কোর্স দেখুন</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;