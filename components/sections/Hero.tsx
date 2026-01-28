'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Spotlight } from '@/components/ui/Spotlight';
import { cn } from '@/utils/cn';

const Hero: React.FC = () => {
    return (
        <section className="relative flex h-screen w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
            {/* Grid Background */}
            <div
                className={cn(
                    "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
                    "[background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]",
                )}
            />
            
            {/* Spotlight Effects */}
            <Spotlight
                className="-top-40 left-0 md:-top-20 md:left-60"
                fill="#10b981"
            />
            <Spotlight
                className="-top-40 right-0 md:-top-20 md:right-60"
                fill="#059669"
            />
            <Spotlight
                className="top-20 left-1/2 transform -translate-x-1/2"
                fill="#065f46"
            />

            {/* Soft Green Gradient Overlays */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-300/5 to-green-300/5 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
                {/* Animated Main Title */}
                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="opacity-0 animate-fadeInUp text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6 relative">
                        <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                            গ্র্যাভিটন একাডেমি
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl">
                            শিক্ষার নতুন দিগন্ত
                        </span>
                    </h1>
                    
                    {/* Typewriter Effect Subtitle */}
                    <div className="relative inline-block">
                        <p className="opacity-0 animate-fadeInUp animation-delay-1000 text-lg sm:text-xl lg:text-2xl text-neutral-300 font-medium overflow-hidden whitespace-nowrap border-r-2 border-emerald-400 animate-typewriter animate-blink">
                            একাডেমিক উৎকর্ষতা থেকে বিদেশে উচ্চশিক্ষা - সব এক প্ল্যাটফর্মে
                        </p>
                    </div>
                </div>

                {/* Animated Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
                    {/* Made Easy System */}
                    <div className="opacity-0 animate-scaleIn animation-delay-2000 group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Made Easy সিস্টেম</h3>
                            <p className="text-neutral-300 text-sm">বিষয়ভিত্তিক সহজ শিক্ষা পদ্ধতি</p>
                        </div>
                    </div>

                    {/* Fly to Abroad */}
                    <div className="opacity-0 animate-scaleIn animation-delay-2500 group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">বিদেশে পড়াশোনা</h3>
                            <p className="text-neutral-300 text-sm">SAT, IELTS, অলিম্পিয়াড প্রস্তুতি</p>
                        </div>
                    </div>

                    {/* Clubs & Activities */}
                    <div className="opacity-0 animate-scaleIn animation-delay-3000 group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">ক্লাব ও কার্যক্রম</h3>
                            <p className="text-neutral-300 text-sm">সহশিক্ষা কার্যক্রম ও দক্ষতা উন্নয়ন</p>
                        </div>
                    </div>

                    {/* Scholarship */}
                    <div className="opacity-0 animate-scaleIn animation-delay-3500 group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">বৃত্তি প্রোগ্রাম</h3>
                            <p className="text-neutral-300 text-sm">মেধা যাচাই ও বৃত্তি সুবিধা</p>
                        </div>
                    </div>
                </div>

                {/* Animated CTA Buttons */}
                <div className="opacity-0 animate-fadeInUp animation-delay-4000 flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12">
                    <Link href="/courses">
                        <Button 
                            size="lg" 
                            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 border-0"
                        >
                            <span className="relative z-10">কোর্স দেখুন</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>
                    </Link>
                    <Link href="/made-easy">
                        <Button 
                            variant="outline"
                            size="lg" 
                            className="group relative backdrop-blur-xl bg-white/10 border-2 border-emerald-400/50 text-white hover:bg-emerald-400/20 hover:border-emerald-400 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
                        >
                            <span className="relative z-10">Made Easy শুরু করুন</span>
                        </Button>
                    </Link>
                </div>

               
            </div>

            {/* Animated Scroll Indicator */}
            <div className="opacity-0 animate-fadeInUp animation-delay-5000 absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
                    <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;