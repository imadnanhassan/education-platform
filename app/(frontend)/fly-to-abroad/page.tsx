'use client';
import React from 'react';
import Link from 'next/link';

const FlyToAbroadPage = () => {
    const programs = [
        {
            id: 'ielts',
            title: 'IELTS প্রস্তুতি',
            titleEn: 'IELTS Preparation',
            description: 'আন্তর্জাতিক ইংরেজি ভাষা পরীক্ষায় উচ্চ ব্যান্ড স্কোর অর্জনের জন্য সম্পূর্ণ প্রস্তুতি',
            features: ['Speaking, Writing, Reading, Listening', 'ব্যান্ড স্কোর ৭+ গ্যারান্টি', 'মক টেস্ট ও ফিডব্যাক'],
            students: 850,
            successRate: '৮৫%',
            icon: '🌍'
        },
        {
            id: 'sat',
            title: 'SAT প্রস্তুতি',
            titleEn: 'SAT Preparation',
            description: 'আমেরিকার টপ বিশ্ববিদ্যালয়ে ভর্তির জন্য SAT পরীক্ষায় উচ্চ স্কোর অর্জনের প্রস্তুতি',
            features: ['Math ও English সেকশন', '১৫০০+ স্কোর টার্গেট', 'College Application গাইড'],
            students: 420,
            successRate: '৯০%',
            icon: '🎓'
        },
        {
            id: 'olympiad',
            title: 'অলিম্পিয়াড প্রস্তুতি',
            titleEn: 'Olympiad Preparation',
            description: 'গণিত, পদার্থ, রসায়ন ও জীববিজ্ঞান অলিম্পিয়াডে জাতীয় ও আন্তর্জাতিক পর্যায়ে সফলতার প্রস্তুতি',
            features: ['৪টি বিষয়ে বিশেষায়িত কোর্স', 'আন্তর্জাতিক মানের প্রশ্ন', 'মেডেলিস্ট শিক্ষকদের গাইডেন্স'],
            students: 180,
            successRate: '৯৫%',
            icon: '🏆'
        },
        {
            id: 'extra-curricular',
            title: 'Extra Curricular',
            titleEn: 'Extra Curricular Activities',
            description: 'বিশ্ববিদ্যালয় ভর্তিতে এগিয়ে থাকার জন্য সহশিক্ষা কার্যক্রম ও ব্যক্তিত্ব উন্নয়ন প্রোগ্রাম',
            features: ['Leadership Development', 'Research Projects', 'Community Service'],
            students: 320,
            successRate: '৮০%',
            icon: '🌟'
        }
    ];

    const successStories = [
        {
            name: 'রাহুল আহমেদ',
            nameEn: 'Rahul Ahmed',
            university: 'Massachusetts Institute of Technology (MIT)',
            country: 'USA',
            score: 'SAT: 1580/1600',
            scholarship: '$50,000 Merit Scholarship',
            image: '/assets/images/profile-34.jpeg',
            quote: 'গ্র্যাভিটন একাডেমির SAT প্রস্তুতি কোর্স আমার স্বপ্নের বিশ্ববিদ্যালয়ে ভর্তির পথ সুগম করেছে।'
        },
        {
            name: 'সারা খাতুন',
            nameEn: 'Sara Khatun',
            university: 'University of Oxford',
            country: 'UK',
            score: 'IELTS: 8.5/9.0',
            scholarship: 'Rhodes Scholarship',
            image: '/assets/images/user-profile.jpeg',
            quote: 'IELTS প্রস্তুতিতে শিক্ষকদের ব্যক্তিগত যত্ন এবং নিয়মিত মক টেস্ট আমাকে সফল করেছে।'
        },
        {
            name: 'তানভীর হাসান',
            nameEn: 'Tanvir Hasan',
            university: 'University of Cambridge',
            country: 'UK',
            score: 'Physics Olympiad Gold Medal',
            scholarship: 'Gates Cambridge Scholarship',
            image: '/assets/images/profile-16.jpeg',
            quote: 'অলিম্পিয়াড প্রস্তুতির মাধ্যমে আমি শুধু পদক জিতিনি, বিশ্বের সেরা বিশ্ববিদ্যালয়ে সুযোগও পেয়েছি।'
        }
    ];

    const whyChooseUs = [
        {
            title: 'বিশেষজ্ঞ শিক্ষকমণ্ডলী',
            description: 'আন্তর্জাতিক সার্টিফিকেট ও অভিজ্ঞতাসম্পন্ন শিক্ষকদের তত্ত্বাবধানে পড়াশোনা',
            icon: '👨‍🏫'
        },
        {
            title: 'ব্যক্তিগত মেন্টরিং',
            description: 'প্রতিটি শিক্ষার্থীর জন্য আলাদা গাইডেন্স ও কাউন্সেলিং সেবা',
            icon: '🎯'
        },
        {
            title: 'আপডেটেড কারিকুলাম',
            description: 'সর্বশেষ পরীক্ষার প্যাটার্ন অনুযায়ী আপডেটেড সিলেবাস ও পড়াশোনা',
            icon: '📚'
        },
        {
            title: 'নিয়মিত মূল্যায়ন',
            description: 'সাপ্তাহিক মক টেস্ট ও বিস্তারিত পারফরমেন্স রিপোর্ট',
            icon: '📊'
        },
        {
            title: 'ভর্তি সহায়তা',
            description: 'বিশ্ববিদ্যালয় নির্বাচন থেকে ভিসা প্রক্রিয়া পর্যন্ত সম্পূর্ণ গাইডেন্স',
            icon: '🎓'
        },
        {
            title: 'বৃত্তি তথ্য',
            description: 'আন্তর্জাতিক বৃত্তির তথ্য ও আবেদন প্রক্রিয়ায় সহায়তা',
            icon: '💰'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Soft Green Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                বিদেশে পড়াশোনার
                            </span>
                            <br />
                            <span className="text-white">সম্পূর্ণ প্রস্তুতি</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            বিশ্বের সেরা বিশ্ববিদ্যালয়গুলোতে ভর্তির জন্য IELTS, SAT, অলিম্পিয়াড এবং Extra Curricular Activities এর বিশেষায়িত প্রস্তুতি
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১৮০০+</div>
                                <div className="text-gray-300">সফল শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৫০+</div>
                                <div className="text-gray-300">দেশে পড়াশোনা</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৮৮%</div>
                                <div className="text-gray-300">সফলতার হার</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section - White */}
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
                                আমাদের প্রোগ্রাম সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            বিশ্বমানের শিক্ষার জন্য বিশেষভাবে ডিজাইন করা প্রস্তুতিমূলক কোর্স সমূহ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {programs.map((program, index) => (
                            <Link key={program.id} href={`/fly-to-abroad/${program.id}`}>
                                <div className="group cursor-pointer bg-white border border-gray-100 p-8 hover:border-emerald-200 transition-all duration-300">
                                    {/* Program Header */}
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-2xl mr-4">
                                            {program.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                {program.title}
                                            </h3>
                                            <p className="text-gray-500">{program.titleEn}</p>
                                        </div>
                                    </div>

                                    {/* Program Description */}
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {program.description}
                                    </p>

                                    {/* Program Features */}
                                    <div className="space-y-3 mb-6">
                                        {program.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center">
                                                <svg className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Program Stats */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-emerald-600">{program.students}</div>
                                            <div className="text-gray-500 text-sm">শিক্ষার্থী</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">{program.successRate}</div>
                                            <div className="text-gray-500 text-sm">সফলতার হার</div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6">
                                        <div className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 text-center font-semibold transition-all duration-300">
                                            বিস্তারিত দেখুন
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Soft Green Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                কেন আমাদের বেছে নিবেন?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            আমাদের বিশেষত্ব এবং অভিজ্ঞতা যা আপনার সফলতা নিশ্চিত করে
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories - White */}
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
                                সফলতার গল্প
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আমাদের শিক্ষার্থীরা যেভাবে বিশ্বের সেরা বিশ্ববিদ্যালয়গুলোতে সফল হয়েছেন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {successStories.map((student, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-8 text-center">
                                <img 
                                    src={student.image} 
                                    alt={student.name}
                                    className="w-24 h-24 object-cover mx-auto mb-6 border-4 border-emerald-500"
                                />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h3>
                                <p className="text-gray-500 text-sm mb-1">{student.nameEn}</p>
                                <p className="text-emerald-600 font-semibold mb-2">{student.university}</p>
                                <p className="text-gray-600 text-sm mb-2">{student.country}</p>
                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-3 mb-4">
                                    <p className="text-emerald-700 font-semibold text-sm">{student.score}</p>
                                    <p className="text-green-600 text-xs">{student.scholarship}</p>
                                </div>
                                <blockquote className="text-gray-600 text-sm italic leading-relaxed">
                                    "{student.quote}"
                                </blockquote>
                            </div>
                        ))}
                    </div>

                    {/* Success Statistics */}
                    <div className="bg-white border border-gray-100 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">আমাদের সাফল্যের পরিসংখ্যান</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-emerald-600 mb-2">৫০০+</div>
                                <div className="text-gray-600">বিদেশী বিশ্ববিদ্যালয়ে ভর্তি</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600 mb-2">$২০M+</div>
                                <div className="text-gray-600">বৃত্তি অর্জন</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-emerald-600 mb-2">৯৫%</div>
                                <div className="text-gray-600">ভিসা সাকসেস রেট</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-600 mb-2">৮৮%</div>
                                <div className="text-gray-600">টপ ১০০ ইউনিভার্সিটি</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Soft Green Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-12">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আজই শুরু করুন আপনার স্বপ্নের যাত্রা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            বিশ্বের সেরা বিশ্ববিদ্যালয়গুলোতে ভর্তির জন্য আমাদের সাথে যোগ দিন এবং আপনার ভবিষ্যৎ গড়ুন
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    ফ্রি কাউন্সেলিং বুক করুন
                                </button>
                            </Link>
                            <Link href="/courses">
                                <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/20 px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    সকল কোর্স দেখুন
                                </button>
                            </Link>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">+৮৮০ ১৭১২-৩৪৫৬৭৮</div>
                                <div className="text-gray-300 text-sm">হটলাইন নম্বর</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">info@graviton.edu.bd</div>
                                <div className="text-gray-300 text-sm">ইমেইল ঠিকানা</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">সকাল ৯টা - রাত ৯টা</div>
                                <div className="text-gray-300 text-sm">অফিস সময়</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FlyToAbroadPage;