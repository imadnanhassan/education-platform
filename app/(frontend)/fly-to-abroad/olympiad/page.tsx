'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const OlympiadPage = () => {
    const [activeSubject, setActiveSubject] = useState<'math' | 'physics' | 'chemistry' | 'biology'>('math');

    const subjects = [
        {
            id: 'math',
            name: 'গণিত অলিম্পিয়াড',
            nameEn: 'Mathematics Olympiad',
            icon: '📐',
            color: 'blue',
            description: 'সংখ্যা তত্ত্ব, বীজগণিত, জ্যামিতি এবং কম্বিনেটরিক্সে বিশেষায়িত প্রশিক্ষণ',
            topics: ['Number Theory', 'Algebra & Inequalities', 'Geometry & Trigonometry', 'Combinatorics & Probability'],
            achievements: ['IMO Bronze Medal - 2023', 'National Champion - 5 students', 'Regional Winners - 25 students'],
            difficulty: 'Advanced Problem Solving',
            duration: '১২ মাস',
            sessions: 'সপ্তাহে ৩টি ক্লাস'
        },
        {
            id: 'physics',
            name: 'পদার্থবিজ্ঞান অলিম্পিয়াড',
            nameEn: 'Physics Olympiad',
            icon: '⚛️',
            color: 'green',
            description: 'ক্লাসিক্যাল মেকানিক্স, তাপগতিবিদ্যা, তড়িৎচুম্বকত্ব এবং আধুনিক পদার্থবিজ্ঞান',
            topics: ['Classical Mechanics', 'Thermodynamics', 'Electromagnetism', 'Modern Physics'],
            achievements: ['IPhO Silver Medal - 2023', 'National Team - 3 students', 'Regional Champions - 18 students'],
            difficulty: 'Theoretical & Experimental',
            duration: '১২ মাস',
            sessions: 'সপ্তাহে ৩টি ক্লাস'
        },
        {
            id: 'chemistry',
            name: 'রসায়ন অলিম্পিয়াড',
            nameEn: 'Chemistry Olympiad',
            icon: '🧪',
            color: 'purple',
            description: 'জৈব রসায়ন, অজৈব রসায়ন, ভৌত রসায়ন এবং বিশ্লেষণী রসায়নে দক্ষতা',
            topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
            achievements: ['IChO Bronze Medal - 2023', 'National Finalist - 4 students', 'Regional Winners - 20 students'],
            difficulty: 'Theory & Laboratory',
            duration: '১২ মাস',
            sessions: 'সপ্তাহে ৩টি ক্লাস'
        },
        {
            id: 'biology',
            name: 'জীববিজ্ঞান অলিম্পিয়াড',
            nameEn: 'Biology Olympiad',
            icon: '🧬',
            color: 'orange',
            description: 'কোষবিজ্ঞান, জেনেটিক্স, ইকোলজি এবং মলিকুলার বায়োলজিতে বিশেষজ্ঞতা',
            topics: ['Cell Biology', 'Genetics & Evolution', 'Ecology & Behavior', 'Molecular Biology'],
            achievements: ['IBO Bronze Medal - 2023', 'National Team - 2 students', 'Regional Champions - 15 students'],
            difficulty: 'Theory & Practical',
            duration: '১২ মাস',
            sessions: 'সপ্তাহে ৩টি ক্লাস'
        }
    ];

    const courseFeatures = [
        {
            title: 'আন্তর্জাতিক মানের প্রশ্ন',
            description: 'বিগত বছরের IMO, IPhO, IChO, IBO প্রশ্ন সমাধান ও বিশ্লেষণ',
            icon: '🌍'
        },
        {
            title: 'অভিজ্ঞ শিক্ষকমণ্ডলী',
            description: 'অলিম্পিয়াড মেডেলিস্ট ও বিশেষজ্ঞ শিক্ষকদের তত্ত্বাবধানে পড়াশোনা',
            icon: '👨‍🏫'
        },
        {
            title: 'নিয়মিত মক টেস্ট',
            description: 'সাপ্তাহিক মক টেস্ট ও পারফরমেন্স ট্র্যাকিং সিস্টেম',
            icon: '📊'
        },
        {
            title: 'সমস্যা সমাধান কৌশল',
            description: 'জটিল সমস্যা সমাধানের বিশেষ কৌশল ও ট্রিকস শেখানো',
            icon: '🧩'
        },
        {
            title: 'ব্যক্তিগত মেন্টরিং',
            description: 'প্রতিটি শিক্ষার্থীর জন্য আলাদা গাইডেন্স ও কাউন্সেলিং',
            icon: '🎯'
        },
        {
            title: 'প্রতিযোগিতার প্রস্তুতি',
            description: 'জাতীয় ও আন্তর্জাতিক প্রতিযোগিতার জন্য বিশেষ প্রস্তুতি',
            icon: '🏆'
        }
    ];

    const successStories = [
        {
            name: 'আরিফ রহমান',
            nameEn: 'Arif Rahman',
            subject: 'গণিত অলিম্পিয়াড',
            achievement: 'IMO Bronze Medal 2023',
            university: 'MIT, USA',
            image: '/assets/images/profile-34.jpeg',
            quote: 'গ্র্যাভিটন একাডেমির অলিম্পিয়াড প্রোগ্রাম আমাকে আন্তর্জাতিক পর্যায়ে প্রতিযোগিতা করার সুযোগ দিয়েছে।'
        },
        {
            name: 'সাবিনা খাতুন',
            nameEn: 'Sabina Khatun',
            subject: 'পদার্থবিজ্ঞান অলিম্পিয়াড',
            achievement: 'IPhO Silver Medal 2023',
            university: 'Cambridge University, UK',
            image: '/assets/images/user-profile.jpeg',
            quote: 'পদার্থবিজ্ঞানের জটিল সমস্যা সমাধানে আমার দক্ষতা এখানেই তৈরি হয়েছে।'
        },
        {
            name: 'তানভীর হাসান',
            nameEn: 'Tanvir Hasan',
            subject: 'রসায়ন অলিম্পিয়াড',
            achievement: 'IChO Bronze Medal 2023',
            university: 'Stanford University, USA',
            image: '/assets/images/profile-16.jpeg',
            quote: 'রসায়নের তত্ত্বীয় ও ব্যবহারিক উভয় দিকেই এখানে চমৎকার প্রশিক্ষণ পেয়েছি।'
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
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
                        <Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link>
                        <span>/</span>
                        <Link href="/fly-to-abroad" className="hover:text-emerald-400 transition-colors">বিদেশে পড়াশোনা</Link>
                        <span>/</span>
                        <span className="text-emerald-400">অলিম্পিয়াড প্রস্তুতি</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">🏆</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                অলিম্পিয়াড প্রস্তুতি
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            গণিত, পদার্থ, রসায়ন ও জীববিজ্ঞান অলিম্পিয়াডে জাতীয় ও আন্তর্জাতিক পর্যায়ে সফলতার জন্য বিশেষায়িত প্রস্তুতি
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১৮০+</div>
                                <div className="text-gray-300">প্রশিক্ষিত শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১৫+</div>
                                <div className="text-gray-300">আন্তর্জাতিক মেডেল</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৯৫%</div>
                                <div className="text-gray-300">জাতীয় পর্যায়ে উত্তীর্ণ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subject Selection - Light Section */}
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
                                অলিম্পিয়াড বিষয়সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            চারটি মূল বিষয়ে বিশেষায়িত প্রশিক্ষণ ও আন্তর্জাতিক মানের প্রস্তুতি
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {subjects.map((subject, index) => (
                            <div key={subject.id} className="group relative">
                                <div className="bg-white p-8 border border-gray-100 text-center transition-all duration-300 hover:shadow-xl">
                                    <div className="text-5xl mb-6">{subject.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{subject.name}</h3>
                                    <p className="text-emerald-600 font-medium mb-4">{subject.nameEn}</p>
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{subject.description}</p>
                                    
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">সময়কাল:</span>
                                            <span className="text-gray-900 font-medium">{subject.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">ক্লাস:</span>
                                            <span className="text-gray-900 font-medium">{subject.sessions}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">স্তর:</span>
                                            <span className="text-gray-900 font-medium">{subject.difficulty}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">মূল বিষয়সমূহ:</h4>
                                        <div className="space-y-1">
                                            {subject.topics.map((topic, idx) => (
                                                <div key={idx} className="text-xs text-gray-600 flex items-center">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 mr-2"></div>
                                                    {topic}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Features - Dark Section */}
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
                                কোর্সের বৈশিষ্ট্য
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            আন্তর্জাতিক মানের শিক্ষা ও প্রশিক্ষণের মাধ্যমে অলিম্পিয়াড সাফল্যের নিশ্চয়তা
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courseFeatures.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center transition-all duration-300 hover:bg-white/15">
                                    <div className="text-4xl mb-6">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
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
                            আমাদের শিক্ষার্থীদের আন্তর্জাতিক পর্যায়ে অর্জিত সাফল্যের কাহিনী
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {successStories.map((story, index) => (
                            <div key={index} className="group relative">
                                <div className="bg-white p-8 border border-gray-100 text-center transition-all duration-300 hover:shadow-xl">
                                    <img 
                                        src={story.image} 
                                        alt={story.name}
                                        className="w-20 h-20 object-cover mx-auto mb-6 border-2 border-emerald-500"
                                    />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h3>
                                    <p className="text-emerald-600 font-medium mb-2">{story.subject}</p>
                                    <div className="bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 mb-4 border border-emerald-200">
                                        <span className="text-emerald-800 font-semibold text-sm">{story.achievement}</span>
                                    </div>
                                    <p className="text-gray-600 font-medium mb-4">{story.university}</p>
                                    <blockquote className="text-gray-600 text-sm italic leading-relaxed">
                                        "{story.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Success Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 text-center border border-emerald-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">৫০+</div>
                            <div className="text-gray-600 text-sm font-medium">জাতীয় পর্যায়ে নির্বাচিত</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">১৫+</div>
                            <div className="text-gray-600 text-sm font-medium">আন্তর্জাতিক মেডেল</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 text-center border border-emerald-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">২০০+</div>
                            <div className="text-gray-600 text-sm font-medium">সফল শিক্ষার্থী</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">৯৫%</div>
                            <div className="text-gray-600 text-sm font-medium">সফলতার হার</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Schedule - Dark Section */}
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
                                প্রশিক্ষণ সময়সূচী
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            সুসংগঠিত ও নিয়মিত ক্লাসের মাধ্যমে পূর্ণাঙ্গ অলিম্পিয়াড প্রস্তুতি
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Weekly Classes */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-8 text-center">সাপ্তাহিক ক্লাস</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10">
                                        <span className="text-white font-medium">গণিত অলিম্পিয়াড</span>
                                        <span className="text-emerald-400 font-semibold">শনি ও মঙ্গল</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10">
                                        <span className="text-white font-medium">পদার্থবিজ্ঞান অলিম্পিয়াড</span>
                                        <span className="text-emerald-400 font-semibold">রবি ও বুধ</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10">
                                        <span className="text-white font-medium">রসায়ন অলিম্পিয়াড</span>
                                        <span className="text-emerald-400 font-semibold">সোম ও বৃহস্পতি</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10">
                                        <span className="text-white font-medium">জীববিজ্ঞান অলিম্পিয়াড</span>
                                        <span className="text-emerald-400 font-semibold">শুক্র ও শনি</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Special Programs */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-8 text-center">বিশেষ কার্যক্রম</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">সাপ্তাহিক মক টেস্ট</div>
                                        <div className="text-gray-300 text-sm">প্রতি শুক্রবার - আন্তর্জাতিক মানের প্রশ্ন</div>
                                    </div>
                                    <div className="p-4 bg-green-500/20 border border-green-400/30">
                                        <div className="font-semibold text-white mb-2">মাসিক ওয়ার্কশপ</div>
                                        <div className="text-gray-300 text-sm">বিশেষ টপিক ও সমস্যা সমাধান কৌশল</div>
                                    </div>
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">ব্যক্তিগত মেন্টরিং</div>
                                        <div className="text-gray-300 text-sm">সপ্তাহে ১ ঘন্টা - ব্যক্তিগত গাইডেন্স</div>
                                    </div>
                                    <div className="p-4 bg-green-500/20 border border-green-400/30">
                                        <div className="font-semibold text-white mb-2">প্রতিযোগিতা প্রস্তুতি</div>
                                        <div className="text-gray-300 text-sm">জাতীয় ও আন্তর্জাতিক প্রতিযোগিতার জন্য</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enrollment CTA - Light Section */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                        <span className="text-3xl">🏆</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            অলিম্পিয়াড যাত্রা শুরু করুন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        আন্তর্জাতিক পর্যায়ে প্রতিযোগিতার জন্য প্রস্তুত হন এবং বিশ্বমানের শিক্ষার সুযোগ গ্রহণ করুন
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            এখনই ভর্তি হন
                        </button>
                        <button className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-emerald-50">
                            বিস্তারিত জানুন
                        </button>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">বিশেষজ্ঞ শিক্ষক</h3>
                            <p className="text-gray-600 text-sm">অলিম্পিয়াড মেডেলিস্ট শিক্ষকদের গাইডেন্স</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">প্রমাণিত সাফল্য</h3>
                            <p className="text-gray-600 text-sm">১৫+ আন্তর্জাতিক মেডেল অর্জন</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">ব্যক্তিগত মেন্টরিং</h3>
                            <p className="text-gray-600 text-sm">প্রতিটি শিক্ষার্থীর জন্য আলাদা গাইডেন্স</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OlympiadPage;