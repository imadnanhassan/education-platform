import React from 'react';
import Link from 'next/link';
import { featuresData } from '@/data/homeData';

const Features: React.FC = () => {
    const getIcon = (iconName: string) => {
        const icons = {
            users: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            ),
            desktop: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            ),
            heart: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            ),
            award: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            )
        };
        return icons[iconName as keyof typeof icons] || icons.users;
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Simple Background Pattern */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.05) 2px, transparent 0), 
                                 radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.05) 2px, transparent 0)`,
                backgroundSize: '100px 100px'
            }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        কেন <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">গ্র্যাভিটন একাডেমি?</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আমরা শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষা এবং বিদেশে উচ্চশিক্ষার জন্য সম্পূর্ণ প্রস্তুতি প্রদান করি
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {featuresData.map((feature, index) => (
                        <div key={feature.id} className="group">
                            <div className="bg-white p-8 border border-gray-100 h-full">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {getIcon(feature.icon)}
                                    </svg>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Stats */}
                                {feature.stats && (
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-emerald-600">{feature.stats.value}</div>
                                            <div className="text-sm text-gray-500">{feature.stats.label}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-12 text-center text-white">
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                        আজই শুরু করুন আপনার শিক্ষা যাত্রা
                    </h3>
                    <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                        আমাদের সাথে যুক্ত হয়ে পেয়ে যান সর্বোচ্চ মানের শিক্ষা এবং বিদেশে উচ্চশিক্ষার সুযোগ
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login">
                            <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-colors duration-300">
                                এখনই যোগ দিন
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 text-lg font-semibold transition-colors duration-300">
                                যোগাযোগ করুন
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;