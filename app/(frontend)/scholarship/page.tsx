'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ScholarshipPage = () => {
    const [activeTab, setActiveTab] = useState<'merit' | 'need' | 'special'>('merit');

    const scholarshipTypes = [
        {
            id: 'merit',
            title: 'মেধা বৃত্তি',
            titleEn: 'Merit Scholarship',
            icon: '🏆',
            description: 'একাডেমিক ফলাফলের ভিত্তিতে প্রদানকৃত বৃত্তি',
            amount: '৫০% - ১০০%',
            eligibility: 'GPA 4.50+ (SSC/HSC)',
            duration: 'পূর্ণ কোর্স মেয়াদ',
            benefits: [
                'সম্পূর্ণ টিউশন ফি মওকুফ',
                'বিনামূল্যে স্টাডি ম্যাটেরিয়াল',
                'বিশেষ মেন্টরিং সাপোর্ট',
                'ক্যারিয়ার গাইডেন্স',
                'সার্টিফিকেট অব এক্সিলেন্স'
            ]
        },
        {
            id: 'need',
            title: 'আর্থিক সহায়তা',
            titleEn: 'Need-based Aid',
            icon: '🤝',
            description: 'আর্থিক অসচ্ছলতার ভিত্তিতে প্রদানকৃত সহায়তা',
            amount: '৩০% - ৮০%',
            eligibility: 'পারিবারিক আয় ২৫,০০০ টাকার নিচে',
            duration: 'বার্ষিক পর্যালোচনা সাপেক্ষে',
            benefits: [
                'আংশিক টিউশন ফি ছাড়',
                'বিনামূল্যে বই ও নোট',
                'পরীক্ষার ফি মওকুফ',
                'ক্যারিয়ার কাউন্সেলিং',
                'জব প্লেসমেন্ট সাপোর্ট'
            ]
        },
        {
            id: 'special',
            title: 'বিশেষ বৃত্তি',
            titleEn: 'Special Scholarship',
            icon: '⭐',
            description: 'বিশেষ প্রতিভা ও অর্জনের ভিত্তিতে প্রদানকৃত বৃত্তি',
            amount: '২৫% - ৭৫%',
            eligibility: 'অলিম্পিয়াড/প্রতিযোগিতায় অংশগ্রহণ',
            duration: 'প্রতিভা ভিত্তিক',
            benefits: [
                'বিশেষ কোর্স অ্যাক্সেস',
                'এক্সক্লুসিভ ওয়ার্কশপ',
                'ইন্ডাস্ট্রি এক্সপোজার',
                'নেটওয়ার্কিং সুযোগ',
                'রিসার্চ প্রজেক্ট সাপোর্ট'
            ]
        }
    ];

    const applicationProcess = [
        {
            step: 1,
            title: 'আবেদন ফর্ম',
            description: 'অনলাইন আবেদন ফর্ম পূরণ করুন',
            documents: ['একাডেমিক ট্রান্সক্রিপ্ট', 'পরিচয়পত্র', 'পাসপোর্ট সাইজ ছবি'],
            duration: '১৫ মিনিট'
        },
        {
            step: 2,
            title: 'ডকুমেন্ট যাচাই',
            description: 'প্রয়োজনীয় কাগজপত্র জমা দিন',
            documents: ['আয়ের সনদপত্র', 'শিক্ষাগত যোগ্যতার সনদ', 'চারিত্রিক সনদপত্র'],
            duration: '৩-৫ দিন'
        },
        {
            step: 3,
            title: 'মূল্যায়ন পরীক্ষা',
            description: 'লিখিত ও মৌখিক পরীক্ষায় অংশগ্রহণ',
            documents: ['প্রবেশপত্র', 'পরিচয়পত্র', 'কলম ও খাতা'],
            duration: '২ ঘন্টা'
        },
        {
            step: 4,
            title: 'ফলাফল ঘোষণা',
            description: 'বৃত্তি প্রাপ্তির চূড়ান্ত ফলাফল',
            documents: ['বৃত্তি সনদপত্র', 'শর্তাবলী', 'ভর্তির নির্দেশনা'],
            duration: '৭-১০ দিন'
        }
    ];

    const scholarshipRecipients = [
        {
            name: 'সাকিব আল হাসান',
            nameEn: 'Sakib Al Hasan',
            class: 'HSC 2023',
            scholarship: 'Merit Scholarship - 100%',
            achievement: 'GPA 5.00',
            university: 'BUET Admission',
            image: '/assets/images/profile-34.jpeg',
            quote: 'গ্র্যাভিটন একাডেমির মেধা বৃত্তি আমার স্বপ্ন পূরণে সহায়তা করেছে।'
        },
        {
            name: 'রুমানা আক্তার',
            nameEn: 'Rumana Akter',
            class: 'HSC 2023',
            scholarship: 'Need-based Aid - 80%',
            achievement: 'GPA 4.83',
            university: 'DU Admission',
            image: '/assets/images/user-profile.jpeg',
            quote: 'আর্থিক সহায়তার কারণে আমি মানসম্পন্ন শিক্ষা গ্রহণ করতে পেরেছি।'
        },
        {
            name: 'তানভীর রহমান',
            nameEn: 'Tanvir Rahman',
            class: 'HSC 2023',
            scholarship: 'Special Scholarship - 75%',
            achievement: 'Physics Olympiad Gold',
            university: 'MIT Admission',
            image: '/assets/images/profile-16.jpeg',
            quote: 'বিশেষ বৃত্তি আমাকে আন্তর্জাতিক পর্যায়ে প্রতিযোগিতার সুযোগ দিয়েছে।'
        }
    ];

    const eligibilityCriteria = {
        merit: [
            'SSC/HSC তে GPA 4.50 বা তার বেশি',
            'ভর্তি পরীক্ষায় ৮৫% বা তার বেশি নম্বর',
            'নিয়মিত উপস্থিতি ৯৫% বা তার বেশি',
            'কোনো বিষয়ে অকৃতকার্য নয়',
            'চারিত্রিক সনদপত্র প্রয়োজন'
        ],
        need: [
            'পারিবারিক মাসিক আয় ২৫,০০০ টাকার নিচে',
            'আয়ের সনদপত্র প্রয়োজন',
            'SSC/HSC তে GPA 3.50 বা তার বেশি',
            'স্থানীয় চেয়ারম্যান/মেম্বারের সুপারিশ',
            'আর্থিক অসচ্ছলতার প্রমাণপত্র'
        ],
        special: [
            'জাতীয়/আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ',
            'বিশেষ প্রতিভা বা দক্ষতার প্রমাণ',
            'সহশিক্ষা কার্যক্রমে সক্রিয় অংশগ্রহণ',
            'নেতৃত্বের গুণাবলী',
            'সামাজিক সেবায় অবদান'
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
                        <Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link>
                        <span>/</span>
                        <span className="text-emerald-400">বৃত্তি প্রোগ্রাম</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">🎓</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                বৃত্তি প্রোগ্রাম
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            মেধা ও আর্থিক সহায়তার ভিত্তিতে শিক্ষার্থীদের জন্য বিশেষ বৃত্তি প্রোগ্রাম
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৫০০+</div>
                                <div className="text-gray-300">বৃত্তি প্রাপ্ত শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৮৫%</div>
                                <div className="text-gray-300">সফলতার হার</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১০০%</div>
                                <div className="text-gray-300">মেধা বৃত্তি পর্যন্ত</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Scholarship Types - Light Section */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                বৃত্তির ধরন
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            বিভিন্ন ক্যাটাগরিতে শিক্ষার্থীদের জন্য বিশেষ বৃত্তি সুবিধা
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="flex bg-gray-100 p-1 border border-gray-200">
                            {scholarshipTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setActiveTab(type.id as 'merit' | 'need' | 'special')}
                                    className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                                        activeTab === type.id
                                            ? 'bg-emerald-500 text-white'
                                            : 'text-gray-600 hover:text-emerald-600'
                                    }`}
                                >
                                    {type.icon} {type.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Scholarship Details */}
                    {scholarshipTypes.map((type) => (
                        activeTab === type.id && (
                            <div key={type.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Scholarship Info */}
                                <div className="bg-white p-8 border border-gray-100">
                                    <div className="text-center mb-8">
                                        <div className="text-6xl mb-4">{type.icon}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.title}</h3>
                                        <p className="text-emerald-600 font-medium mb-4">{type.titleEn}</p>
                                        <p className="text-gray-600 leading-relaxed">{type.description}</p>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                            <span className="font-medium text-gray-900">বৃত্তির পরিমাণ:</span>
                                            <span className="text-emerald-600 font-bold">{type.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                            <span className="font-medium text-gray-900">যোগ্যতা:</span>
                                            <span className="text-gray-700">{type.eligibility}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                            <span className="font-medium text-gray-900">মেয়াদ:</span>
                                            <span className="text-gray-700">{type.duration}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">সুবিধাসমূহ:</h4>
                                        <div className="space-y-2">
                                            {type.benefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-center text-gray-600">
                                                    <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Eligibility Criteria */}
                                <div className="bg-white p-8 border border-gray-100">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">যোগ্যতার শর্তাবলী</h3>
                                    <div className="space-y-4">
                                        {eligibilityCriteria[activeTab].map((criteria, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <div className="w-6 h-6 bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center mr-4 mt-1 border border-emerald-200">
                                                    <span className="text-emerald-600 font-bold text-xs">{idx + 1}</span>
                                                </div>
                                                <p className="text-gray-600 flex-1">{criteria}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                                        <h4 className="font-semibold text-gray-900 mb-3">গুরুত্বপূর্ণ তথ্য</h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                                আবেদনের শেষ তারিখ: প্রতি মাসের ১৫ তারিখ
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                                ফলাফল ঘোষণা: আবেদনের ১০ দিনের মধ্যে
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                                বৃত্তি নবায়ন: বার্ষিক পর্যালোচনা সাপেক্ষে
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </section>

            {/* Application Process - Dark Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আবেদন প্রক্রিয়া
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            সহজ ও স্বচ্ছ প্রক্রিয়ায় বৃত্তির জন্য আবেদন করুন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {applicationProcess.map((process, index) => (
                            <div key={process.step} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto mb-6 flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">{process.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{process.title}</h3>
                                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">{process.description}</p>
                                    
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-emerald-400 mb-3">প্রয়োজনীয় কাগজপত্র:</h4>
                                        <div className="space-y-2">
                                            {process.documents.map((doc, idx) => (
                                                <div key={idx} className="text-xs text-gray-300 flex items-center">
                                                    <div className="w-1.5 h-1.5 bg-emerald-400 mr-2"></div>
                                                    {doc}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-2">
                                        <span className="text-emerald-300 text-sm font-medium">সময়: {process.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories - Light Section */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                সফলতার গল্প
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            বৃত্তি প্রাপ্ত শিক্ষার্থীদের অনুপ্রেরণামূলক সাফল্যের কাহিনী
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {scholarshipRecipients.map((recipient, index) => (
                            <div key={index} className="group relative">
                                <div className="bg-white p-8 border border-gray-100 text-center transition-all duration-300 hover:shadow-xl">
                                    <img 
                                        src={recipient.image} 
                                        alt={recipient.name}
                                        className="w-20 h-20 object-cover mx-auto mb-6 border-2 border-emerald-500"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{recipient.name}</h3>
                                    <p className="text-emerald-600 font-medium mb-2">{recipient.class}</p>
                                    <div className="bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 mb-4 border border-emerald-200">
                                        <span className="text-emerald-800 font-semibold text-sm">{recipient.scholarship}</span>
                                    </div>
                                    <p className="text-gray-600 font-medium mb-2">{recipient.achievement}</p>
                                    <p className="text-gray-700 font-semibold mb-4">{recipient.university}</p>
                                    <blockquote className="text-gray-600 text-sm italic leading-relaxed">
                                        "{recipient.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 text-center border border-emerald-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">৫০০+</div>
                            <div className="text-gray-600 text-sm font-medium">বৃত্তি প্রাপ্ত শিক্ষার্থী</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">৮৫%</div>
                            <div className="text-gray-600 text-sm font-medium">সফলতার হার</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 text-center border border-emerald-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">২৫ লক্ষ</div>
                            <div className="text-gray-600 text-sm font-medium">টাকা বৃত্তি প্রদান</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">৯৮%</div>
                            <div className="text-gray-600 text-sm font-medium">ভর্তি সফলতা</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Now CTA - Dark Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                        <span className="text-3xl">🎓</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            আজই আবেদন করুন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                        আপনার স্বপ্নের শিক্ষার পথে এগিয়ে যান বৃত্তির সহায়তায়
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            এখনই আবেদন করুন
                        </button>
                        <button className="border-2 border-emerald-400 text-emerald-400 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-emerald-400/10">
                            বিস্তারিত জানুন
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400/30 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">আর্থিক সহায়তা</h3>
                                <p className="text-gray-300 text-sm">১০০% পর্যন্ত টিউশন ফি মওকুফ</p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400/30 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">সহজ প্রক্রিয়া</h3>
                                <p className="text-gray-300 text-sm">অনলাইনে সহজ আবেদন পদ্ধতি</p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-400/30 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">দ্রুত ফলাফল</h3>
                                <p className="text-gray-300 text-sm">১০ দিনের মধ্যে ফলাফল ঘোষণা</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScholarshipPage;