import React from 'react';

const Stats: React.FC = () => {
    const stats = [
        {
            id: 1,
            number: '১০০০+',
            label: 'সফল শিক্ষার্থী',
            description: 'আমাদের প্ল্যাটফর্মে সফলভাবে শিক্ষা গ্রহণকারী',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            )
        },
        {
            id: 2,
            number: '৫০+',
            label: 'বিভিন্ন কোর্স',
            description: 'একাডেমিক এবং বিদেশে পড়াশোনার জন্য',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            id: 3,
            number: '৯৮%',
            label: 'সফলতার হার',
            description: 'আমাদের শিক্ষার্থীদের পরীক্ষায় উত্তীর্ণের হার',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        },
        {
            id: 4,
            number: '২৪/৭',
            label: 'সাপোর্ট সেবা',
            description: 'যেকোনো সময় শিক্ষার্থীদের সহায়তা',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            id: 5,
            number: '১৫+',
            label: 'অভিজ্ঞ শিক্ষক',
            description: 'বিশেষজ্ঞ শিক্ষকমণ্ডলী',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            id: 6,
            number: '৫০০+',
            label: 'বিদেশে পড়াশোনা',
            description: 'সফলভাবে বিদেশে পাঠানো শিক্ষার্থী',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            আমাদের অর্জন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        সংখ্যার মাধ্যমে দেখুন আমাদের সফলতার গল্প এবং শিক্ষার্থীদের প্রতি আমাদের অঙ্গীকার।
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div 
                            key={stat.id} 
                            className="group relative text-center"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                                {/* Icon */}
                                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center text-white transition-all duration-300">
                                    {stat.icon}
                                </div>
                                
                                {/* Number */}
                                <div className="text-4xl lg:text-5xl font-bold mb-2 text-white">
                                    {stat.number}
                                </div>
                                
                                {/* Label */}
                                <h3 className="text-xl font-semibold mb-3 text-emerald-300">
                                    {stat.label}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-gray-300 leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-20 text-center">
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 max-w-4xl mx-auto hover:bg-white/15 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                আপনিও হতে পারেন আমাদের সফল শিক্ষার্থীদের একজন
                            </h3>
                            <p className="text-gray-300 mb-6">
                                আমাদের প্রমাণিত শিক্ষা পদ্ধতি এবং অভিজ্ঞ শিক্ষকমণ্ডলীর সাথে 
                                গড়ে তুলুন আপনার উজ্জ্বল ভবিষ্যৎ।
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 font-semibold transition-all duration-300">
                                    আজই শুরু করুন
                                </button>
                                <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-8 py-3 font-semibold transition-all duration-300">
                                    আরও জানুন
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;