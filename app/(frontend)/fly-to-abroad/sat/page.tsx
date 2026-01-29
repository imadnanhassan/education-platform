'use client';
import React from 'react';
import Link from 'next/link';

const SATPage = () => {
    const sections = [
        {
            name: 'Math Section',
            nameEn: 'Mathematics',
            icon: '📊',
            description: 'Algebra, Geometry, Trigonometry এবং Data Analysis এর সম্পূর্ণ প্রস্তুতি',
            topics: ['Algebra & Functions', 'Geometry & Trigonometry', 'Statistics & Probability', 'Data Analysis'],
            duration: '৮০ মিনিট',
            questions: '৫৮টি প্রশ্ন',
            maxScore: '৮০০'
        },
        {
            name: 'English Section',
            nameEn: 'Evidence-Based Reading and Writing',
            icon: '📚',
            description: 'Reading Comprehension এবং Writing & Language এর বিশেষ প্রস্তুতি',
            topics: ['Reading Comprehension', 'Grammar & Usage', 'Vocabulary in Context', 'Command of Evidence'],
            duration: '১০০ মিনিট',
            questions: '৯৬টি প্রশ্ন',
            maxScore: '৮০০'
        }
    ];

    const scoreTargets = [
        {
            score: '1200+',
            level: 'Good Score',
            description: 'বেশিরভাগ কলেজের জন্য যথেষ্ট',
            universities: ['State Universities', 'Community Colleges', 'Regional Universities'],
            percentage: '৭৫%'
        },
        {
            score: '1400+',
            level: 'Excellent Score',
            description: 'টপ বিশ্ববিদ্যালয়ের জন্য প্রতিযোগিতামূলক',
            universities: ['Top State Universities', 'Private Universities', 'Ivy League (Lower Tier)'],
            percentage: '৯৫%'
        },
        {
            score: '1500+',
            level: 'Outstanding Score',
            description: 'সর্বোচ্চ মানের প্রতিষ্ঠানের জন্য',
            universities: ['Harvard, MIT, Stanford', 'Ivy League Universities', 'Top Liberal Arts Colleges'],
            percentage: '৯৯%'
        }
    ];

    const courseFeatures = [
        {
            title: 'Diagnostic Assessment',
            description: 'প্রাথমিক পরীক্ষার মাধ্যমে দুর্বলতা চিহ্নিতকরণ',
            icon: '🎯'
        },
        {
            title: 'Personalized Study Plan',
            description: 'ব্যক্তিগত প্রয়োজন অনুযায়ী কাস্টমাইজড পড়াশোনার পরিকল্পনা',
            icon: '📋'
        },
        {
            title: 'Official Practice Tests',
            description: 'College Board এর অফিসিয়াল প্র্যাকটিস টেস্ট ব্যবহার',
            icon: '📝'
        },
        {
            title: 'Score Improvement Guarantee',
            description: '২০০+ পয়েন্ট স্কোর বৃদ্ধির গ্যারান্টি',
            icon: '📈'
        },
        {
            title: 'College Application Guidance',
            description: 'বিশ্ববিদ্যালয় নির্বাচন ও আবেদন প্রক্রিয়ায় সহায়তা',
            icon: '🎓'
        },
        {
            title: 'Scholarship Information',
            description: 'Merit-based বৃত্তির তথ্য ও আবেদন গাইডেন্স',
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
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
                        <Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link>
                        <span>/</span>
                        <Link href="/fly-to-abroad" className="hover:text-emerald-400 transition-colors">বিদেশে পড়াশোনা</Link>
                        <span>/</span>
                        <span className="text-emerald-400">SAT প্রস্তুতি</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">🎓</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                SAT প্রস্তুতি কোর্স
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            আমেরিকার টপ বিশ্ববিদ্যালয়ে ভর্তির জন্য SAT এ উচ্চ স্কোর অর্জনের সম্পূর্ণ প্রস্তুতি
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৪২০+</div>
                                <div className="text-gray-300">সফল শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১৪৮০</div>
                                <div className="text-gray-300">গড় স্কোর</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৯০%</div>
                                <div className="text-gray-300">সফলতার হার</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SAT Sections - White */}
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
                                SAT এর ২টি প্রধান সেকশন
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Math এবং Evidence-Based Reading and Writing সেকশনে বিশেষায়িত প্রশিক্ষণ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {sections.map((section, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-2xl mr-4">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{section.name}</h3>
                                        <p className="text-gray-500">{section.nameEn}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {section.description}
                                </p>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-3 text-center">
                                        <div className="text-lg font-bold text-emerald-600">{section.duration}</div>
                                        <div className="text-gray-600 text-sm">সময়কাল</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-3 text-center">
                                        <div className="text-lg font-bold text-green-600">{section.questions}</div>
                                        <div className="text-gray-600 text-sm">প্রশ্ন সংখ্যা</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-3 text-center">
                                        <div className="text-lg font-bold text-emerald-600">{section.maxScore}</div>
                                        <div className="text-gray-600 text-sm">সর্বোচ্চ স্কোর</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900">মূল বিষয়সমূহ:</h4>
                                    {section.topics.map((topic, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 text-sm">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Score Targets - Dark */}
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
                                স্কোর লক্ষ্য ও বিশ্ববিদ্যালয়
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            আপনার স্বপ্নের আমেরিকান বিশ্ববিদ্যালয়ের জন্য প্রয়োজনীয় SAT স্কোর অর্জন করুন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {scoreTargets.map((target, index) => (
                            <div key={index} className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                <div className="text-5xl font-bold text-emerald-400 mb-4">{target.score}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{target.level}</h3>
                                <p className="text-gray-300 mb-6">{target.description}</p>
                                
                                <div className="space-y-2 mb-6">
                                    <h4 className="font-semibold text-white text-sm">উপযুক্ত বিশ্ববিদ্যালয়:</h4>
                                    {target.universities.map((uni, idx) => (
                                        <div key={idx} className="text-gray-300 text-sm">{uni}</div>
                                    ))}
                                </div>

                                <div className="bg-emerald-500 text-white py-2 px-4 font-semibold">
                                    {target.percentage} Percentile
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Score Improvement Stats */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">স্কোর উন্নতির গ্যারান্টি</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-4xl font-bold text-emerald-400 mb-2">২০০+</div>
                                <div className="text-gray-300 text-sm">গড় স্কোর বৃদ্ধি</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">১৫০০+</div>
                                <div className="text-gray-300 text-sm">টার্গেট স্কোর</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-emerald-400 mb-2">৯০%</div>
                                <div className="text-gray-300 text-sm">সফলতার হার</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">৮৫%</div>
                                <div className="text-gray-300 text-sm">১৪০০+ অর্জনকারী</div>
                            </div>
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
                            আমাদের SAT প্রস্তুতি কোর্সে যা যা পাবেন
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

                    {/* Course Details */}
                    <div className="bg-white border border-gray-100 p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">কোর্সের বিস্তারিত তথ্য</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">কোর্স কাঠামো</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
                                        <span className="text-gray-700">সময়কাল:</span>
                                        <span className="font-semibold text-emerald-600">৬ মাস</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                        <span className="text-gray-700">সাপ্তাহিক ক্লাস:</span>
                                        <span className="font-semibold text-green-600">৩টি (২ ঘন্টা করে)</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
                                        <span className="text-gray-700">মোট ক্লাস:</span>
                                        <span className="font-semibold text-emerald-600">৭২টি ক্লাস</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                                        <span className="text-gray-700">কোর্স ফি:</span>
                                        <span className="font-semibold text-green-600">৳২৫,০০০</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">অতিরিক্ত সুবিধা</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">সাপ্তাহিক ফুল লেংথ প্র্যাকটিস টেস্ট</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">বিস্তারিত স্কোর অ্যানালাইসিস ও ফিডব্যাক</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">College Application গাইডেন্স</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">Scholarship তথ্য ও আবেদন সহায়তা</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">অনলাইন স্টাডি ম্যাটেরিয়াল ও রিসোর্স</span>
                                    </li>
                                </ul>
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
                                আপনার SAT যাত্রা শুরু করুন
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            আমেরিকার টপ বিশ্ববিদ্যালয়ে ভর্তির জন্য আজই SAT প্রস্তুতি শুরু করুন
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                            <Link href="/contact">
                                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    ফ্রি ডায়াগনস্টিক টেস্ট
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
                                <div className="text-2xl font-bold text-emerald-400 mb-1">২০০+ পয়েন্ট</div>
                                <div className="text-gray-300 text-sm">স্কোর বৃদ্ধি গ্যারান্টি</div>
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

export default SATPage;