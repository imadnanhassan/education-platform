import React from 'react';

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'ড. মোহাম্মদ রহমান',
            nameEn: 'Dr. Mohammad Rahman',
            position: 'প্রতিষ্ঠাতা ও পরিচালক',
            image: '/assets/images/team/founder.jpg',
            bio: 'শিক্ষা ক্ষেত্রে ২০ বছরের অভিজ্ঞতা সম্পন্ন। ঢাকা বিশ্ববিদ্যালয় থেকে পিএইচডি।'
        },
        {
            id: 2,
            name: 'প্রফেসর সারা খান',
            nameEn: 'Professor Sara Khan',
            position: 'একাডেমিক পরিচালক',
            image: '/assets/images/team/academic-director.jpg',
            bio: 'গণিত বিভাগের প্রাক্তন প্রধান। আন্তর্জাতিক অলিম্পিয়াড কোচ।'
        },
        {
            id: 3,
            name: 'মাহমুদ হাসান',
            nameEn: 'Mahmud Hasan',
            position: 'প্রযুক্তি পরিচালক',
            image: '/assets/images/team/tech-director.jpg',
            bio: 'সফটওয়্যার ইঞ্জিনিয়ারিং এ মাস্টার্স। EdTech এ ১০ বছরের অভিজ্ঞতা।'
        }
    ];

    const milestones = [
        {
            year: '২০১৮',
            title: 'প্রতিষ্ঠা',
            description: 'গ্র্যাভিটন একাডেমির যাত্রা শুরু মাত্র ৫০ জন শিক্ষার্থী নিয়ে'
        },
        {
            year: '২০১৯',
            title: 'অনলাইন প্ল্যাটফর্ম',
            description: 'ডিজিটাল শিক্ষা প্ল্যাটফর্ম চালু করা হয়'
        },
        {
            year: '২০২০',
            title: 'আন্তর্জাতিক সম্প্রসারণ',
            description: 'IELTS এবং SAT প্রস্তুতি কোর্স চালু'
        },
        {
            year: '২০২১',
            title: 'পুরস্কার প্রাপ্তি',
            description: 'সেরা শিক্ষা প্রতিষ্ঠান হিসেবে জাতীয় পুরস্কার'
        },
        {
            year: '২০২২',
            title: 'ক্লাব কার্যক্রম',
            description: 'বিভিন্ন ক্লাব এবং সহশিক্ষা কার্যক্রম চালু'
        },
        {
            year: '২০২৩',
            title: '১০০০+ শিক্ষার্থী',
            description: 'শিক্ষার্থী সংখ্যা ১০০০ ছাড়িয়ে গেছে'
        }
    ];

    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: 'গুণগত শিক্ষা',
            description: 'আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থী সর্বোচ্চ মানের শিক্ষা পাওয়ার অধিকার রাখে।'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: 'উদ্ভাবনী পদ্ধতি',
            description: 'আধুনিক প্রযুক্তি এবং উদ্ভাবনী শিক্ষা পদ্ধতি ব্যবহার করে শেখানো।'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'সহযোগিতা',
            description: 'শিক্ষার্থী, শিক্ষক এবং অভিভাবকদের মধ্যে সহযোগিতামূলক সম্পর্ক।'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'বৈশ্বিক দৃষ্টিভঙ্গি',
            description: 'আন্তর্জাতিক মানের শিক্ষা এবং বিদেশে উচ্চশিক্ষার প্রস্তুতি।'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আমাদের সম্পর্কে
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            শিক্ষার মাধ্যমে জীবন পরিবর্তনের স্বপ্ন নিয়ে আমাদের যাত্রা
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    আমাদের লক্ষ্য ও উদ্দেশ্য
                                </span>
                            </h2>
                            <div className="space-y-8">
                                <div className="bg-white p-6 border border-gray-100">
                                    <h3 className="text-xl font-semibold text-emerald-600 mb-3">আমাদের মিশন</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        প্রতিটি শিক্ষার্থীকে সর্বোচ্চ মানের শিক্ষা প্রদান করে তাদের একাডেমিক উৎকর্ষতা 
                                        এবং ব্যক্তিত্ব বিকাশে সহায়তা করা। আমরা চাই প্রতিটি শিক্ষার্থী তাদের স্বপ্ন 
                                        পূরণের জন্য প্রয়োজনীয় জ্ঞান ও দক্ষতা অর্জন করুক।
                                    </p>
                                </div>
                                <div className="bg-white p-6 border border-gray-100">
                                    <h3 className="text-xl font-semibold text-emerald-600 mb-3">আমাদের ভিশন</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        বাংলাদেশের শিক্ষা ক্ষেত্রে একটি অগ্রণী প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া 
                                        এবং আন্তর্জাতিক মানের শিক্ষা প্রদানের মাধ্যমে দেশের শিক্ষার্থীদের বিশ্বব্যাপী 
                                        প্রতিযোগিতায় এগিয়ে রাখা।
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-8 text-center">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-4xl font-bold text-emerald-600">৫+</div>
                                    <div className="text-gray-600">বছরের অভিজ্ঞতা</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-emerald-600">১০০০+</div>
                                    <div className="text-gray-600">সফল শিক্ষার্থী</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-emerald-600">৫০+</div>
                                    <div className="text-gray-600">কোর্স ও প্রোগ্রাম</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-emerald-600">৯৮%</div>
                                    <div className="text-gray-600">সফলতার হার</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আমাদের মূল্যবোধ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            যে মূল্যবোধগুলো আমাদের প্রতিটি কাজে প্রতিফলিত হয়
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-4 text-white">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline - White */}
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
                                আমাদের যাত্রাপথ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            প্রতিষ্ঠার পর থেকে আজ পর্যন্ত আমাদের অর্জনসমূহ
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className="inline-block bg-white border border-gray-100 p-6">
                                            <div className="text-2xl font-bold text-emerald-600 mb-2">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="relative z-10 w-4 h-4 bg-emerald-600 border-4 border-white"></div>
                                    
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আমাদের নেতৃত্ব
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            অভিজ্ঞ ও দক্ষ নেতৃত্বে পরিচালিত আমাদের প্রতিষ্ঠান
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 text-center">
                                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 mx-auto mb-4 flex items-center justify-center">
                                        <div className="text-3xl">👨‍🏫</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-2">{member.nameEn}</p>
                                    <p className="text-emerald-300 font-medium mb-3">
                                        {member.position}
                                    </p>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আমাদের সাথে যুক্ত হন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        আপনার শিক্ষার যাত্রায় আমরা আপনার সাথী হতে চাই
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                            কোর্সে ভর্তি হন
                        </button>
                        <button className="border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold transition-all duration-300">
                            যোগাযোগ করুন
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;