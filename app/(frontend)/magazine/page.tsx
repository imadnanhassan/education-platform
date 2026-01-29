'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const MagazinePage = () => {
    const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'science' | 'literature' | 'current'>('all');

    const magazineIssues = [
        {
            id: 1,
            title: 'গ্র্যাভিটন একাডেমিক জার্নাল',
            titleEn: 'Graviton Academic Journal',
            category: 'academic',
            issue: 'ভলিউম ৫, সংখ্যা ৩',
            date: 'মার্চ ২০২৪',
            cover: '/assets/images/profile-34.jpeg',
            description: 'একাডেমিক গবেষণা, শিক্ষা পদ্ধতি এবং শিক্ষার্থীদের সাফল্যের গল্প নিয়ে বিশেষ সংখ্যা',
            articles: [
                'আধুনিক শিক্ষা পদ্ধতিতে প্রযুক্তির ভূমিকা',
                'গণিত অলিম্পিয়াডে সাফল্যের কৌশল',
                'বিজ্ঞান শিক্ষায় ব্যবহারিক পদ্ধতি',
                'শিক্ষার্থীদের মানসিক স্বাস্থ্য ও পড়াশোনা'
            ],
            pages: 48,
            downloads: 2500,
            featured: true
        },
        {
            id: 2,
            title: 'বিজ্ঞান ও প্রযুক্তি',
            titleEn: 'Science & Technology',
            category: 'science',
            issue: 'সংখ্যা ১২',
            date: 'ফেব্রুয়ারি ২০২৪',
            cover: '/assets/images/user-profile.jpeg',
            description: 'বিজ্ঞান ও প্রযুক্তির সর্বশেষ আবিষ্কার, গবেষণা এবং ভবিষ্যতের সম্ভাবনা নিয়ে আলোচনা',
            articles: [
                'কৃত্রিম বুদ্ধিমত্তার ভবিষ্যৎ',
                'কোয়ান্টাম কম্পিউটিং এর সম্ভাবনা',
                'জলবায়ু পরিবর্তন ও বিজ্ঞান',
                'মহাকাশ গবেষণার নতুন দিগন্ত'
            ],
            pages: 36,
            downloads: 1800,
            featured: false
        },
        {
            id: 3,
            title: 'সাহিত্য ও সংস্কৃতি',
            titleEn: 'Literature & Culture',
            category: 'literature',
            issue: 'বর্ষা সংখ্যা',
            date: 'জুলাই ২০২৩',
            cover: '/assets/images/profile-16.jpeg',
            description: 'বাংলা সাহিত্য, কবিতা, গল্প এবং সাংস্কৃতিক ঐতিহ্য নিয়ে বিশেষ প্রকাশনা',
            articles: [
                'আধুনিক বাংলা কবিতার ধারা',
                'রবীন্দ্রনাথের শিক্ষা দর্শন',
                'বাংলা সাহিত্যে নারী লেখকদের অবদান',
                'লোকসংস্কৃতি ও আধুনিকতা'
            ],
            pages: 52,
            downloads: 1200,
            featured: false
        },
        {
            id: 4,
            title: 'সমসাময়িক বিষয়াবলী',
            titleEn: 'Current Affairs',
            category: 'current',
            issue: 'জানুয়ারি ২০২৪',
            date: 'জানুয়ারি ২০২৪',
            cover: '/assets/images/profile-34.jpeg',
            description: 'জাতীয় ও আন্তর্জাতিক ঘটনাবলী, রাজনীতি, অর্থনীতি এবং সামাজিক বিষয়াদি',
            articles: [
                'বাংলাদেশের অর্থনৈতিক অগ্রগতি',
                'শিক্ষা ক্ষেত্রে ডিজিটাল বাংলাদেশ',
                'পরিবেশ সংরক্ষণে তরুণদের ভূমিকা',
                'আন্তর্জাতিক সম্পর্কে বাংলাদেশ'
            ],
            pages: 40,
            downloads: 2100,
            featured: true
        },
        {
            id: 5,
            title: 'শিক্ষার্থী সংকলন',
            titleEn: 'Student Compilation',
            category: 'academic',
            issue: 'বার্ষিক সংখ্যা ২০২৩',
            date: 'ডিসেম্বর ২০২৩',
            cover: '/assets/images/user-profile.jpeg',
            description: 'শিক্ষার্থীদের লেখা প্রবন্ধ, গবেষণা পত্র এবং সৃজনশীল রচনার সংকলন',
            articles: [
                'তরুণদের চোখে ভবিষ্যতের বাংলাদেশ',
                'বিজ্ঞান শিক্ষায় নতুন পদ্ধতি',
                'সামাজিক মাধ্যম ও শিক্ষা',
                'পরিবেশ বান্ধব জীবনযাত্রা'
            ],
            pages: 44,
            downloads: 1600,
            featured: false
        },
        {
            id: 6,
            title: 'গবেষণা পত্রিকা',
            titleEn: 'Research Journal',
            category: 'science',
            issue: 'ভলিউম ৩, সংখ্যা ১',
            date: 'নভেম্বর ২০২৩',
            cover: '/assets/images/profile-16.jpeg',
            description: 'শিক্ষক ও গবেষকদের মৌলিক গবেষণা এবং একাডেমিক প্রবন্ধের সংকলন',
            articles: [
                'শিক্ষায় কৃত্রিম বুদ্ধিমত্তার প্রয়োগ',
                'গণিত শিক্ষায় নতুন পদ্ধতি',
                'বিজ্ঞান শিক্ষায় পরীক্ষামূলক পদ্ধতি',
                'শিক্ষার মান উন্নয়নে প্রযুক্তি'
            ],
            pages: 56,
            downloads: 980,
            featured: false
        }
    ];

    const categories = [
        { id: 'all', name: 'সকল', nameEn: 'All', icon: '📚' },
        { id: 'academic', name: 'একাডেমিক', nameEn: 'Academic', icon: '🎓' },
        { id: 'science', name: 'বিজ্ঞান', nameEn: 'Science', icon: '🔬' },
        { id: 'literature', name: 'সাহিত্য', nameEn: 'Literature', icon: '📖' },
        { id: 'current', name: 'সমসাময়িক', nameEn: 'Current Affairs', icon: '📰' }
    ];

    const editorialTeam = [
        {
            name: 'ড. আবদুল করিম',
            nameEn: 'Dr. Abdul Karim',
            position: 'প্রধান সম্পাদক',
            positionEn: 'Chief Editor',
            qualification: 'পিএইচডি, ঢাকা বিশ্ববিদ্যালয়',
            image: '/assets/images/profile-34.jpeg',
            experience: '১৫ বছর'
        },
        {
            name: 'প্রফেসর সালমা খাতুন',
            nameEn: 'Professor Salma Khatun',
            position: 'সহযোগী সম্পাদক',
            positionEn: 'Associate Editor',
            qualification: 'এমএ, রাজশাহী বিশ্ববিদ্যালয়',
            image: '/assets/images/user-profile.jpeg',
            experience: '১২ বছর'
        },
        {
            name: 'মোহাম্মদ রহিম',
            nameEn: 'Mohammad Rahim',
            position: 'বিজ্ঞান সম্পাদক',
            positionEn: 'Science Editor',
            qualification: 'এমএসসি, বুয়েট',
            image: '/assets/images/profile-16.jpeg',
            experience: '১০ বছর'
        }
    ];

    const filteredMagazines = activeCategory === 'all' 
        ? magazineIssues 
        : magazineIssues.filter(magazine => magazine.category === activeCategory);

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
                        <span className="text-emerald-400">ম্যাগাজিন</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">📖</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                গ্র্যাভিটন ম্যাগাজিন
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            শিক্ষা, বিজ্ঞান, সাহিত্য ও সমসাময়িক বিষয়ে মানসম্পন্ন প্রকাশনা
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৫০+</div>
                                <div className="text-gray-300">প্রকাশিত সংখ্যা</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১০,০০০+</div>
                                <div className="text-gray-300">পাঠক</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">২০০+</div>
                                <div className="text-gray-300">প্রবন্ধ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Magazine Categories - Light Section */}
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
                                ম্যাগাজিন সংগ্রহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            বিভিন্ন বিষয়ে আমাদের প্রকাশিত ম্যাগাজিন ও জার্নাল সংগ্রহ
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex justify-center mb-12">
                        <div className="flex flex-wrap gap-2 bg-gray-100 p-2 border border-gray-200">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id as 'all' | 'academic' | 'science' | 'literature' | 'current')}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                        activeCategory === category.id
                                            ? 'bg-emerald-500 text-white'
                                            : 'text-gray-600 hover:text-emerald-600'
                                    }`}
                                >
                                    {category.icon} {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Magazine Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMagazines.map((magazine) => (
                            <div key={magazine.id} className="group relative">
                                <div className="bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                                    {/* Magazine Cover */}
                                    <div className="relative">
                                        <img 
                                            src={magazine.cover} 
                                            alt={magazine.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        {magazine.featured && (
                                            <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-xs font-semibold">
                                                ফিচার্ড
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 text-xs">
                                            {magazine.pages} পৃষ্ঠা
                                        </div>
                                    </div>

                                    {/* Magazine Info */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-emerald-600 text-sm font-medium">{magazine.issue}</span>
                                            <span className="text-gray-500 text-sm">{magazine.date}</span>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{magazine.title}</h3>
                                        <p className="text-emerald-600 font-medium text-sm mb-3">{magazine.titleEn}</p>
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{magazine.description}</p>

                                        {/* Articles List */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">এই সংখ্যায়:</h4>
                                            <div className="space-y-1">
                                                {magazine.articles.slice(0, 3).map((article, idx) => (
                                                    <div key={idx} className="text-xs text-gray-600 flex items-center">
                                                        <div className="w-1.5 h-1.5 bg-emerald-500 mr-2"></div>
                                                        {article}
                                                    </div>
                                                ))}
                                                {magazine.articles.length > 3 && (
                                                    <div className="text-xs text-gray-500 italic">
                                                        আরও {magazine.articles.length - 3}টি প্রবন্ধ...
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Download Info */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                {magazine.downloads} ডাউনলোড
                                            </div>
                                            <button className="bg-emerald-500 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-emerald-600">
                                                পড়ুন
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial Team - Dark Section */}
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
                                সম্পাদকীয় টিম
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            অভিজ্ঞ শিক্ষাবিদ ও গবেষকদের নিয়ে গঠিত আমাদের সম্পাদকীয় পরিষদ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {editorialTeam.map((member, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-20 h-20 object-cover mx-auto mb-6 border-2 border-emerald-400"
                                    />
                                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-emerald-400 font-medium mb-2">{member.position}</p>
                                    <p className="text-gray-300 text-sm mb-4">{member.qualification}</p>
                                    <div className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-2">
                                        <span className="text-emerald-300 text-sm">অভিজ্ঞতা: {member.experience}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Publication Guidelines */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">প্রকাশনা নীতিমালা</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">১</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">মৌলিকত্ব</h4>
                                            <p className="text-gray-300 text-sm">সকল প্রবন্ধ অবশ্যই মৌলিক ও অপ্রকাশিত হতে হবে</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">২</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">গুণগত মান</h4>
                                            <p className="text-gray-300 text-sm">উচ্চমানের গবেষণা ও তথ্যভিত্তিক লেখা</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">৩</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">পর্যালোচনা</h4>
                                            <p className="text-gray-300 text-sm">বিশেষজ্ঞদের দ্বারা কঠোর পর্যালোচনা প্রক্রিয়া</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">লেখা জমা দিন</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">প্রবন্ধের ধরন</div>
                                        <div className="text-gray-300 text-sm">গবেষণা পত্র, পর্যালোচনা, মতামত</div>
                                    </div>
                                    <div className="p-4 bg-green-500/20 border border-green-400/30">
                                        <div className="font-semibold text-white mb-2">শব্দ সীমা</div>
                                        <div className="text-gray-300 text-sm">১০০০-৩০০০ শব্দ</div>
                                    </div>
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">জমা দেওয়ার সময়</div>
                                        <div className="text-gray-300 text-sm">প্রতি মাসের ১৫ তারিখের মধ্যে</div>
                                    </div>
                                </div>
                                <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                                    লেখা পাঠান
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subscription & Archive - Light Section */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Subscription */}
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    সাবস্ক্রিপশন
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                নিয়মিত আপডেট পেতে আমাদের ম্যাগাজিন সাবস্ক্রাইব করুন
                            </p>

                            <div className="space-y-6">
                                <div className="bg-white p-6 border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">বিনামূল্যে সাবস্ক্রিপশন</h3>
                                        <span className="text-emerald-600 font-bold text-2xl">ফ্রি</span>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-gray-600">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            মাসিক ম্যাগাজিন ইমেইলে পাবেন
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            বিশেষ সংখ্যার আগাম নোটিফিকেশন
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            আর্কাইভ অ্যাক্সেস
                                        </div>
                                    </div>
                                    <button className="w-full bg-emerald-500 text-white py-3 font-semibold transition-colors hover:bg-emerald-600">
                                        সাবস্ক্রাইব করুন
                                    </button>
                                </div>

                                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 border border-emerald-200">
                                    <h4 className="font-semibold text-gray-900 mb-3">প্রিমিয়াম সুবিধা</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            প্রিন্ট কপি ডেলিভারি
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            এক্সক্লুসিভ কন্টেন্ট অ্যাক্সেস
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            লেখক ইন্টারভিউ ভিডিও
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Archive */}
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    আর্কাইভ
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                পুরাতন সংখ্যাগুলো ব্রাউজ করুন এবং ডাউনলোড করুন
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white p-4 border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">২০২৪ সংকলন</h4>
                                        <p className="text-gray-600 text-sm">১২টি সংখ্যা</p>
                                    </div>
                                    <button className="text-emerald-600 font-medium hover:text-emerald-700">
                                        ডাউনলোড
                                    </button>
                                </div>
                                <div className="bg-white p-4 border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">২০২৩ সংকলন</h4>
                                        <p className="text-gray-600 text-sm">১২টি সংখ্যা</p>
                                    </div>
                                    <button className="text-emerald-600 font-medium hover:text-emerald-700">
                                        ডাউনলোড
                                    </button>
                                </div>
                                <div className="bg-white p-4 border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">২০২২ সংকলন</h4>
                                        <p className="text-gray-600 text-sm">১২টি সংখ্যা</p>
                                    </div>
                                    <button className="text-emerald-600 font-medium hover:text-emerald-700">
                                        ডাউনলোড
                                    </button>
                                </div>
                                <div className="bg-white p-4 border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">বিশেষ সংখ্যা</h4>
                                        <p className="text-gray-600 text-sm">৮টি সংখ্যা</p>
                                    </div>
                                    <button className="text-emerald-600 font-medium hover:text-emerald-700">
                                        ডাউনলোড
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                                <h4 className="font-semibold text-gray-900 mb-3">পরিসংখ্যান</h4>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-emerald-600">৫০+</div>
                                        <div className="text-gray-600 text-sm">প্রকাশিত সংখ্যা</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-emerald-600">২০০+</div>
                                        <div className="text-gray-600 text-sm">প্রবন্ধ</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-emerald-600">১০০+</div>
                                        <div className="text-gray-600 text-sm">লেখক</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-emerald-600">১০K+</div>
                                        <div className="text-gray-600 text-sm">পাঠক</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MagazinePage;