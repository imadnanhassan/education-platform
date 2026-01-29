'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const IELTSPage = () => {
    const [activeTab, setActiveTab] = useState<'academic' | 'general'>('academic');

    const modules = [
        {
            name: 'Listening',
            nameEn: 'Listening',
            icon: '👂',
            description: 'বিভিন্ন accent ও context এর অডিও বোঝা এবং তথ্য সংগ্রহ',
            skills: ['Conversation বোঝা', 'Lecture ও Monologue', 'Detail Information', 'Main Ideas'],
            duration: '৩০ মিনিট',
            questions: '৪০টি প্রশ্ন'
        },
        {
            name: 'Reading',
            nameEn: 'Reading',
            icon: '📖',
            description: 'Academic ও General text comprehension এবং বিশ্লেষণ',
            skills: ['Skimming & Scanning', 'Detail Reading', 'Inference', 'Vocabulary in Context'],
            duration: '৬০ মিনিট',
            questions: '৪০টি প্রশ্ন'
        },
        {
            name: 'Writing',
            nameEn: 'Writing',
            icon: '✍️',
            description: 'Task 1 ও Task 2 এর কৌশল এবং Academic Writing',
            skills: ['Task 1 (Graph/Letter)', 'Task 2 (Essay)', 'Grammar & Vocabulary', 'Coherence & Cohesion'],
            duration: '৬০ মিনিট',
            questions: '২টি Task'
        },
        {
            name: 'Speaking',
            nameEn: 'Speaking',
            icon: '🗣️',
            description: 'Fluency ও pronunciation উন্নতি এবং আত্মবিশ্বাস বৃদ্ধি',
            skills: ['Part 1 (Introduction)', 'Part 2 (Cue Card)', 'Part 3 (Discussion)', 'Fluency & Pronunciation'],
            duration: '১১-১৪ মিনিট',
            questions: '৩টি Part'
        }
    ];

    const bandScores = [
        {
            band: '6.5',
            level: 'Competent User',
            description: 'বেশিরভাগ বিশ্ববিদ্যালয়ের জন্য যথেষ্ট',
            color: 'yellow',
            universities: ['Most UK Universities', 'Canadian Universities', 'Australian Universities'],
            percentage: '৬৫%'
        },
        {
            band: '7.0',
            level: 'Good User',
            description: 'ভাল বিশ্ববিদ্যালয়ের জন্য আদর্শ',
            color: 'green',
            universities: ['Russell Group UK', 'Top Canadian Unis', 'Group of Eight Australia'],
            percentage: '৮০%'
        },
        {
            band: '8.0+',
            level: 'Very Good/Expert User',
            description: 'সর্বোচ্চ মানের প্রতিষ্ঠানের জন্য',
            color: 'blue',
            universities: ['Oxford, Cambridge', 'Harvard, MIT', 'Top Global Universities'],
            percentage: '৯৫%'
        }
    ];

    const courseFeatures = [
        {
            title: 'ব্যক্তিগত মূল্যায়ন',
            description: 'প্রাথমিক টেস্টের মাধ্যমে আপনার বর্তমান স্তর নির্ধারণ',
            icon: '📊'
        },
        {
            title: 'কাস্টমাইজড স্টাডি প্ল্যান',
            description: 'আপনার দুর্বলতা অনুযায়ী বিশেষ পড়াশোনার পরিকল্পনা',
            icon: '📋'
        },
        {
            title: 'নেটিভ স্পিকার সেশন',
            description: 'ব্রিটিশ ও আমেরিকান শিক্ষকদের সাথে Speaking Practice',
            icon: '🎯'
        },
        {
            title: 'সাপ্তাহিক মক টেস্ট',
            description: 'প্রকৃত IELTS পরীক্ষার মতো পরিবেশে নিয়মিত অনুশীলন',
            icon: '📝'
        },
        {
            title: 'বিস্তারিত ফিডব্যাক',
            description: 'প্রতিটি টেস্টের পর বিস্তারিত মূল্যায়ন ও উন্নতির পরামর্শ',
            icon: '💬'
        },
        {
            title: 'স্কোর গ্যারান্টি',
            description: 'নির্দিষ্ট ব্যান্ড স্কোর অর্জনের গ্যারান্টি বা ফ্রি রিপিট',
            icon: '🎖️'
        }
    ];

    const successStats = [
        { label: '৭+ ব্যান্ড অর্জন', value: '৮৫%', color: 'emerald' },
        { label: '৭.৫+ ব্যান্ড অর্জন', value: '৬০%', color: 'green' },
        { label: '৮+ ব্যান্ড অর্জন', value: '৩৫%', color: 'blue' },
        { label: 'প্রথম চেষ্টায় সফল', value: '৯২%', color: 'purple' }
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
                        <span className="text-emerald-400">IELTS প্রস্তুতি</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">🌍</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                IELTS প্রস্তুতি কোর্স
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            আন্তর্জাতিক ইংরেজি ভাষা পরীক্ষায় উচ্চ ব্যান্ড স্কোর অর্জনের জন্য সম্পূর্ণ প্রস্তুতি
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৮৫০+</div>
                                <div className="text-gray-300">সফল শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৭.২</div>
                                <div className="text-gray-300">গড় ব্যান্ড স্কোর</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৯২%</div>
                                <div className="text-gray-300">প্রথম চেষ্টায় সফল</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* IELTS Modules - White */}
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
                                IELTS এর ৪টি মডিউল
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            প্রতিটি মডিউলে বিশেষায়িত প্রশিক্ষণ এবং কৌশল শিক্ষা
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {modules.map((module, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-2xl mr-4">
                                        {module.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{module.name}</h3>
                                        <p className="text-gray-500">{module.nameEn}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {module.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-3 text-center">
                                        <div className="text-lg font-bold text-emerald-600">{module.duration}</div>
                                        <div className="text-gray-600 text-sm">সময়কাল</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-3 text-center">
                                        <div className="text-lg font-bold text-green-600">{module.questions}</div>
                                        <div className="text-gray-600 text-sm">প্রশ্ন সংখ্যা</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900">মূল দক্ষতা সমূহ:</h4>
                                    {module.skills.map((skill, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 text-sm">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Band Score Goals - Dark */}
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
                                ব্যান্ড স্কোর লক্ষ্য
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            আপনার স্বপ্নের বিশ্ববিদ্যালয়ের জন্য প্রয়োজনীয় ব্যান্ড স্কোর অর্জন করুন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {bandScores.map((band, index) => (
                            <div key={index} className={`backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center`}>
                                <div className={`text-5xl font-bold text-${band.color}-400 mb-4`}>{band.band}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{band.level}</h3>
                                <p className="text-gray-300 mb-6">{band.description}</p>
                                
                                <div className="space-y-2 mb-6">
                                    <h4 className="font-semibold text-white text-sm">উপযুক্ত বিশ্ববিদ্যালয়:</h4>
                                    {band.universities.map((uni, idx) => (
                                        <div key={idx} className="text-gray-300 text-sm">{uni}</div>
                                    ))}
                                </div>

                                <div className={`bg-${band.color}-500 text-white py-2 px-4 font-semibold`}>
                                    {band.percentage} শিক্ষার্থী অর্জন করেছেন
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Success Statistics */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">আমাদের সাফল্যের পরিসংখ্যান</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {successStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>{stat.value}</div>
                                    <div className="text-gray-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Features - White */}
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
                                কোর্সের বিশেষ বৈশিষ্ট্য
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আমাদের IELTS প্রস্তুতি কোর্সে যা যা পাবেন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {courseFeatures.map((feature, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-6 text-center">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Course Types */}
                    <div className="bg-white border border-gray-100 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">কোর্সের ধরন</h3>
                        
                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-8">
                            <div className="flex border border-gray-200">
                                <button
                                    onClick={() => setActiveTab('academic')}
                                    className={`px-8 py-3 font-medium transition-colors ${
                                        activeTab === 'academic'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-emerald-50'
                                    }`}
                                >
                                    Academic IELTS
                                </button>
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`px-8 py-3 font-medium transition-colors ${
                                        activeTab === 'general'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-white text-gray-700 hover:bg-emerald-50'
                                    }`}
                                >
                                    General Training
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {activeTab === 'academic' ? (
                                <>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">Academic IELTS</h4>
                                        <p className="text-gray-600 mb-4">
                                            বিশ্ববিদ্যালয়ে ভর্তি এবং উচ্চশিক্ষার জন্য বিশেষভাবে ডিজাইন করা
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">বিশ্ববিদ্যালয় ভর্তির জন্য</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">Academic Writing Task 1 (Graph/Chart/Diagram)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">Complex Academic Reading Passages</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">Formal Academic Speaking Topics</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-6">
                                        <h5 className="font-semibold text-gray-900 mb-3">কোর্স সময়কাল ও ফি</h5>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">সময়কাল:</span>
                                                <span className="font-semibold">৩ মাস (৪৮ ক্লাস)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">সাপ্তাহিক ক্লাস:</span>
                                                <span className="font-semibold">৪টি (২ ঘন্টা করে)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">কোর্স ফি:</span>
                                                <span className="font-semibold text-emerald-600">৳১৮,০০০</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-4">General Training IELTS</h4>
                                        <p className="text-gray-600 mb-4">
                                            ইমিগ্রেশন, কাজ এবং সাধারণ উদ্দেশ্যে ইংরেজি দক্ষতা প্রমাণের জন্য
                                        </p>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">ইমিগ্রেশন ও কাজের জন্য</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">Letter Writing (Formal/Informal/Semi-formal)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">Everyday Reading Materials</span>
                                            </li>
                                            <li className="flex items-start">
                                                <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">Practical Speaking Situations</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6">
                                        <h5 className="font-semibold text-gray-900 mb-3">কোর্স সময়কাল ও ফি</h5>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">সময়কাল:</span>
                                                <span className="font-semibold">২.৫ মাস (৪০ ক্লাস)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">সাপ্তাহিক ক্লাস:</span>
                                                <span className="font-semibold">৪টি (২ ঘন্টা করে)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">কোর্স ফি:</span>
                                                <span className="font-semibold text-blue-600">৳১৫,০০০</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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
                                আপনার IELTS যাত্রা শুরু করুন
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            বিশ্বের সেরা বিশ্ববিদ্যালয়গুলোতে ভর্তির জন্য আজই IELTS প্রস্তুতি শুরু করুন
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    ফ্রি ডেমো ক্লাস বুক করুন
                                </button>
                            </Link>
                            <Link href="/fly-to-abroad">
                                <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/20 px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    অন্যান্য প্রোগ্রাম দেখুন
                                </button>
                            </Link>
                        </div>

                        {/* Guarantees */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">৭+ ব্যান্ড</div>
                                <div className="text-gray-300 text-sm">স্কোর গ্যারান্টি</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">১০০% রিফান্ড</div>
                                <div className="text-gray-300 text-sm">অসন্তুষ্ট হলে</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">লাইফটাইম</div>
                                <div className="text-gray-300 text-sm">সাপোর্ট</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IELTSPage;