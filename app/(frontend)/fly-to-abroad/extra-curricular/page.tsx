'use client';
import React from 'react';
import Link from 'next/link';

const ExtraCurricularPage = () => {
    const activityCategories = [
        {
            id: 'leadership',
            title: 'নেতৃত্ব উন্নয়ন',
            titleEn: 'Leadership Development',
            icon: '👑',
            color: 'emerald',
            description: 'নেতৃত্ব দক্ষতা, টিম ম্যানেজমেন্ট এবং সিদ্ধান্ত গ্রহণের ক্ষমতা বিকাশ',
            activities: [
                'Student Council Leadership',
                'Project Management Training',
                'Event Organization & Management',
                'Public Speaking & Presentation',
                'Team Building Workshops',
                'Conflict Resolution Skills'
            ],
            benefits: ['Leadership Certificate', 'Portfolio Enhancement', 'University Recommendation'],
            duration: '৬ মাস',
            sessions: 'সপ্তাহে ২টি সেশন'
        },
        {
            id: 'research',
            title: 'গবেষণা প্রকল্প',
            titleEn: 'Research Projects',
            icon: '🔬',
            color: 'blue',
            description: 'বৈজ্ঞানিক গবেষণা, উদ্ভাবনী প্রকল্প এবং একাডেমিক পেপার লেখার দক্ষতা',
            activities: [
                'Science Fair Projects',
                'Research Paper Writing',
                'Innovation Contests',
                'Laboratory Experiments',
                'Data Analysis Training',
                'Academic Publication'
            ],
            benefits: ['Research Publication', 'Science Fair Awards', 'University Credits'],
            duration: '৮ মাস',
            sessions: 'সপ্তাহে ৩টি সেশন'
        },
        {
            id: 'community',
            title: 'সমাজসেবা',
            titleEn: 'Community Service',
            icon: '🤝',
            color: 'green',
            description: 'সমাজসেবা, স্বেচ্ছাসেবী কার্যক্রম এবং সামাজিক দায়বদ্ধতা বোধ গড়ে তোলা',
            activities: [
                'Social Work Programs',
                'Environmental Projects',
                'Charity Fundraising',
                'Community Outreach',
                'Volunteer Coordination',
                'Social Impact Assessment'
            ],
            benefits: ['Service Hours Certificate', 'Community Recognition', 'Social Impact Portfolio'],
            duration: '১ বছর',
            sessions: 'সপ্তাহে ১টি সেশন'
        },
        {
            id: 'arts',
            title: 'শিল্প ও সংস্কৃতি',
            titleEn: 'Arts & Culture',
            icon: '🎨',
            color: 'purple',
            description: 'সাংস্কৃতিক কার্যক্রম, শিল্পচর্চা এবং সৃজনশীল দক্ষতা উন্নয়ন',
            activities: [
                'Drama & Theater',
                'Music & Dance',
                'Art Exhibitions',
                'Creative Writing',
                'Photography Club',
                'Cultural Events'
            ],
            benefits: ['Performance Certificates', 'Art Portfolio', 'Cultural Awards'],
            duration: '৬ মাস',
            sessions: 'সপ্তাহে ২টি সেশন'
        },
        {
            id: 'sports',
            title: 'খেলাধুলা ও ফিটনেস',
            titleEn: 'Sports & Fitness',
            icon: '⚽',
            color: 'orange',
            description: 'খেলাধুলা, শারীরিক সুস্থতা এবং টিমওয়ার্ক দক্ষতা বিকাশ',
            activities: [
                'Football & Cricket Teams',
                'Athletics Training',
                'Swimming Programs',
                'Fitness Coaching',
                'Sports Tournaments',
                'Health & Nutrition'
            ],
            benefits: ['Sports Certificates', 'Team Captain Experience', 'Fitness Records'],
            duration: '১ বছর',
            sessions: 'সপ্তাহে ৩টি সেশন'
        },
        {
            id: 'technology',
            title: 'প্রযুক্তি ক্লাব',
            titleEn: 'Technology Club',
            icon: '💻',
            color: 'indigo',
            description: 'প্রযুক্তি, প্রোগ্রামিং এবং ডিজিটাল দক্ষতা উন্নয়ন',
            activities: [
                'Coding Competitions',
                'Robotics Projects',
                'App Development',
                'Web Design',
                'AI & Machine Learning',
                'Tech Innovation'
            ],
            benefits: ['Coding Certificates', 'Tech Projects Portfolio', 'Innovation Awards'],
            duration: '৮ মাস',
            sessions: 'সপ্তাহে ২টি সেশন'
        }
    ];

    const successStories = [
        {
            name: 'আরিফ হাসান',
            nameEn: 'Arif Hasan',
            activity: 'Research Project Leader',
            achievement: 'Harvard University Admission',
            university: 'Harvard University, USA',
            image: '/assets/images/profile-34.jpeg',
            quote: 'গবেষণা প্রকল্পের মাধ্যমে আমি বৈজ্ঞানিক চিন্তাভাবনা ও সমস্যা সমাধানের দক্ষতা অর্জন করেছি।',
            scholarship: '$50,000 Merit Scholarship'
        },
        {
            name: 'ফাতিমা খান',
            nameEn: 'Fatima Khan',
            activity: 'Community Service Champion',
            achievement: 'Stanford University Admission',
            university: 'Stanford University, USA',
            image: '/assets/images/user-profile.jpeg',
            quote: 'সমাজসেবার মাধ্যমে আমি নেতৃত্ব ও সামাজিক দায়বদ্ধতার গুণাবলী অর্জন করেছি।',
            scholarship: '$45,000 Need-based Aid'
        },
        {
            name: 'রাকিব আহমেদ',
            nameEn: 'Rakib Ahmed',
            activity: 'Robotics Team Captain',
            achievement: 'MIT Admission',
            university: 'MIT, USA',
            image: '/assets/images/profile-16.jpeg',
            quote: 'রোবোটিক্স প্রকল্পের মাধ্যমে আমি প্রযুক্তিগত দক্ষতা ও উদ্ভাবনী চিন্তাভাবনা গড়ে তুলেছি।',
            scholarship: 'Full Merit Scholarship'
        }
    ];

    const programStructure = [
        {
            step: 1,
            title: 'Interest Assessment',
            titleBn: 'আগ্রহ যাচাই',
            description: 'শিক্ষার্থীর আগ্রহ ও দক্ষতা মূল্যায়ন করে উপযুক্ত কার্যক্রম নির্বাচন',
            duration: '১ সপ্তাহ'
        },
        {
            step: 2,
            title: 'Activity Selection',
            titleBn: 'কার্যক্রম নির্বাচন',
            description: 'ব্যক্তিগত লক্ষ্য ও ভবিষ্যৎ পরিকল্পনা অনুযায়ী কার্যক্রম বেছে নেওয়া',
            duration: '১ সপ্তাহ'
        },
        {
            step: 3,
            title: 'Skill Development',
            titleBn: 'দক্ষতা উন্নয়ন',
            description: 'নিয়মিত প্রশিক্ষণ ও অনুশীলনের মাধ্যমে দক্ষতা বিকাশ',
            duration: '৬-১২ মাস'
        },
        {
            step: 4,
            title: 'Portfolio Building',
            titleBn: 'পোর্টফোলিও তৈরি',
            description: 'অর্জন ও অভিজ্ঞতার ভিত্তিতে শক্তিশালী পোর্টফোলিও প্রস্তুতি',
            duration: 'চলমান'
        }
    ];

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
                        <Link href="/fly-to-abroad" className="hover:text-emerald-400 transition-colors">বিদেশে পড়াশোনা</Link>
                        <span>/</span>
                        <span className="text-emerald-400">Extra Curricular Activities</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">🌟</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                Extra Curricular Activities
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            একাডেমিক পড়াশোনার পাশাপাশি ব্যক্তিত্ব ও দক্ষতা উন্নয়নের মাধ্যমে বিশ্ববিদ্যালয় ভর্তিতে এগিয়ে থাকুন
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৮০%</div>
                                <div className="text-gray-300">Admission Rate বৃদ্ধি</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৫০%</div>
                                <div className="text-gray-300">Scholarship সুযোগ</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১০০+</div>
                                <div className="text-gray-300">Portfolio Projects</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activity Categories - Light Section */}
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
                                কার্যক্রমের ধরন
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            বিভিন্ন ক্ষেত্রে দক্ষতা উন্নয়ন ও ব্যক্তিত্ব বিকাশের জন্য বিশেষায়িত প্রোগ্রাম
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activityCategories.map((category, index) => (
                            <div key={category.id} className="group relative">
                                <div className="bg-white p-8 border border-gray-100 text-center transition-all duration-300 hover:shadow-xl">
                                    <div className="text-5xl mb-6">{category.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                                    <p className="text-emerald-600 font-medium mb-4">{category.titleEn}</p>
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{category.description}</p>
                                    
                                    <div className="space-y-3 text-sm mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">সময়কাল:</span>
                                            <span className="text-gray-900 font-medium">{category.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">সেশন:</span>
                                            <span className="text-gray-900 font-medium">{category.sessions}</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">মূল কার্যক্রম:</h4>
                                        <div className="space-y-1">
                                            {category.activities.slice(0, 4).map((activity, idx) => (
                                                <div key={idx} className="text-xs text-gray-600 flex items-center">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 mr-2"></div>
                                                    {activity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">সুবিধাসমূহ:</h4>
                                        <div className="space-y-1">
                                            {category.benefits.map((benefit, idx) => (
                                                <div key={idx} className="text-xs text-emerald-600 flex items-center">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 mr-2"></div>
                                                    {benefit}
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

            {/* Benefits for University Applications - Dark Section */}
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
                                বিশ্ববিদ্যালয় ভর্তিতে সুবিধা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Extra Curricular Activities এর মাধ্যমে আন্তর্জাতিক বিশ্ববিদ্যালয়ে ভর্তির সুযোগ বৃদ্ধি
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                <div className="text-4xl font-bold text-emerald-400 mb-4">৮০%</div>
                                <div className="text-gray-300 font-medium">Admission Rate বৃদ্ধি</div>
                                <p className="text-gray-400 text-sm mt-2">Strong Profile এর কারণে</p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                <div className="text-4xl font-bold text-emerald-400 mb-4">৫০%</div>
                                <div className="text-gray-300 font-medium">Scholarship সুযোগ</div>
                                <p className="text-gray-400 text-sm mt-2">Merit-based Awards</p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                <div className="text-4xl font-bold text-emerald-400 mb-4">১০০+</div>
                                <div className="text-gray-300 font-medium">Portfolio Projects</div>
                                <p className="text-gray-400 text-sm mt-2">Documented Activities</p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                <div className="text-4xl font-bold text-emerald-400 mb-4">২৫+</div>
                                <div className="text-gray-300 font-medium">Award Winners</div>
                                <p className="text-gray-400 text-sm mt-2">Recognition & Honors</p>
                            </div>
                        </div>
                    </div>

                    {/* Why Extra Curricular Activities Matter */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">কেন গুরুত্বপূর্ণ?</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">১</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">Holistic Development</h4>
                                            <p className="text-gray-300 text-sm">সর্বাঙ্গীণ ব্যক্তিত্ব ও দক্ষতা বিকাশ</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">২</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">Leadership Skills</h4>
                                            <p className="text-gray-300 text-sm">নেতৃত্ব ও টিমওয়ার্ক দক্ষতা অর্জন</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">৩</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">Global Perspective</h4>
                                            <p className="text-gray-300 text-sm">আন্তর্জাতিক দৃষ্টিভঙ্গি ও সামাজিক দায়বদ্ধতা</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">University Requirements</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">Harvard University</div>
                                        <div className="text-gray-300 text-sm">Leadership & Community Service Required</div>
                                    </div>
                                    <div className="p-4 bg-green-500/20 border border-green-400/30">
                                        <div className="font-semibold text-white mb-2">Stanford University</div>
                                        <div className="text-gray-300 text-sm">Innovation & Research Experience</div>
                                    </div>
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">MIT</div>
                                        <div className="text-gray-300 text-sm">Technical Projects & Problem Solving</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Structure - Light Section */}
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
                                প্রোগ্রাম কাঠামো
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            পদ্ধতিগত ও পরিকল্পিত উপায়ে Extra Curricular Activities এ অংশগ্রহণ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Program Steps */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">বাস্তবায়ন পদ্ধতি</h3>
                            <div className="space-y-6">
                                {programStructure.map((step, index) => (
                                    <div key={step.step} className="flex items-start">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center mr-6 mt-1 border border-emerald-200">
                                            <span className="text-emerald-600 font-bold">{step.step}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.titleBn}</h4>
                                            <p className="text-emerald-600 font-medium text-sm mb-2">{step.title}</p>
                                            <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                                            <div className="text-xs text-gray-500">সময়কাল: {step.duration}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Weekly Schedule */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">সাপ্তাহিক সময়সূচী</h3>
                            <div className="bg-white border border-gray-100 p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                        <span className="font-medium text-gray-900">Leadership Workshop</span>
                                        <span className="text-emerald-600 font-semibold">সোমবার</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                        <span className="font-medium text-gray-900">Research Project</span>
                                        <span className="text-emerald-600 font-semibold">বুধবার</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                        <span className="font-medium text-gray-900">Community Service</span>
                                        <span className="text-emerald-600 font-semibold">শুক্রবার</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                                        <span className="font-medium text-gray-900">Sports & Arts</span>
                                        <span className="text-emerald-600 font-semibold">শনিবার</span>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200">
                                    <h4 className="font-semibold text-gray-900 mb-4">বিশেষ ইভেন্ট</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            মাসিক প্রতিযোগিতা ও প্রদর্শনী
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            বার্ষিক Achievement Awards
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                            আন্তর্জাতিক এক্সচেঞ্জ প্রোগ্রাম
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories - Dark Section */}
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
                                সফলতার গল্প
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Extra Curricular Activities এর মাধ্যমে বিশ্বমানের বিশ্ববিদ্যালয়ে ভর্তি পাওয়া শিক্ষার্থীদের অভিজ্ঞতা
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {successStories.map((story, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                    <img 
                                        src={story.image} 
                                        alt={story.name}
                                        className="w-20 h-20 object-cover mx-auto mb-6 border-2 border-emerald-400"
                                    />
                                    <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                                    <p className="text-emerald-400 font-medium mb-2">{story.activity}</p>
                                    <div className="bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 mb-4">
                                        <span className="text-emerald-300 font-semibold text-sm">{story.achievement}</span>
                                    </div>
                                    <p className="text-gray-300 font-medium mb-2">{story.university}</p>
                                    <div className="bg-green-500/20 border border-green-400/30 px-3 py-1 mb-4">
                                        <span className="text-green-300 text-xs">{story.scholarship}</span>
                                    </div>
                                    <blockquote className="text-gray-300 text-sm italic leading-relaxed">
                                        "{story.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}
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
                        <span className="text-3xl">🌟</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আপনার প্রতিভা বিকশিত করুন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        বিশ্ববিদ্যালয় ভর্তিতে এগিয়ে থাকুন Extra Curricular Activities এর মাধ্যমে
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            এখনই যোগদান করুন
                        </button>
                        <button className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-emerald-50">
                            বিস্তারিত জানুন
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">বিশেষজ্ঞ মেন্টর</h3>
                            <p className="text-gray-600 text-sm">অভিজ্ঞ মেন্টরদের গাইডেন্স ও সাপোর্ট</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">প্রমাণিত ফলাফল</h3>
                            <p className="text-gray-600 text-sm">৮০% বেশি University Admission Rate</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">সার্টিফিকেশন</h3>
                            <p className="text-gray-600 text-sm">আন্তর্জাতিকভাবে স্বীকৃত সার্টিফিকেট</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtraCurricularPage;