'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const MembershipPage = () => {
    const [activePlan, setActivePlan] = useState<'basic' | 'premium' | 'elite'>('premium');

    const membershipPlans = [
        {
            id: 'basic',
            name: 'বেসিক মেম্বারশিপ',
            nameEn: 'Basic Membership',
            price: '৫০০',
            duration: 'মাসিক',
            icon: '🥉',
            color: 'blue',
            description: 'শুরুর জন্য আদর্শ প্যাকেজ',
            features: [
                'সকল অনলাইন ক্লাসে অ্যাক্সেস',
                'বেসিক স্টাডি ম্যাটেরিয়াল',
                'সাপ্তাহিক কুইজ ও টেস্ট',
                'কমিউনিটি ফোরাম অ্যাক্সেস',
                'ইমেইল সাপোর্ট',
                'মাসিক প্রোগ্রেস রিপোর্ট'
            ],
            limitations: [
                'লাইভ সেশন সীমিত',
                'ডাউনলোড সুবিধা নেই',
                'ব্যক্তিগত মেন্টরিং নেই'
            ],
            popular: false
        },
        {
            id: 'premium',
            name: 'প্রিমিয়াম মেম্বারশিপ',
            nameEn: 'Premium Membership',
            price: '১২০০',
            duration: 'মাসিক',
            icon: '🥈',
            color: 'emerald',
            description: 'সবচেয়ে জনপ্রিয় প্যাকেজ',
            features: [
                'সকল অনলাইন ও লাইভ ক্লাস',
                'প্রিমিয়াম স্টাডি ম্যাটেরিয়াল',
                'আনলিমিটেড টেস্ট ও কুইজ',
                'ভিডিও ডাউনলোড সুবিধা',
                'লাইভ Q&A সেশন',
                'মাসিক ১:১ মেন্টরিং',
                'প্রায়োরিটি সাপোর্ট',
                'সার্টিফিকেট প্রোগ্রাম'
            ],
            limitations: [
                'এক্সক্লুসিভ ওয়ার্কশপ নেই',
                'ক্যারিয়ার কাউন্সেলিং সীমিত'
            ],
            popular: true
        },
        {
            id: 'elite',
            name: 'এলিট মেম্বারশিপ',
            nameEn: 'Elite Membership',
            price: '২৫০০',
            duration: 'মাসিক',
            icon: '🥇',
            color: 'gold',
            description: 'সর্বোচ্চ মানের সেবা',
            features: [
                'সকল প্রিমিয়াম সুবিধা',
                'এক্সক্লুসিভ মাস্টারক্লাস',
                'সাপ্তাহিক ১:১ মেন্টরিং',
                'ক্যারিয়ার কাউন্সেলিং',
                'ইন্ডাস্ট্রি এক্সপার্ট সেশন',
                'প্রায়োরিটি জব প্লেসমেন্ট',
                '২৪/৭ ডেডিকেটেড সাপোর্ট',
                'কাস্টম লার্নিং প্ল্যান',
                'নেটওয়ার্কিং ইভেন্ট',
                'এলুমনাই নেটওয়ার্ক অ্যাক্সেস'
            ],
            limitations: [],
            popular: false
        }
    ];

    const memberBenefits = [
        {
            title: 'এক্সক্লুসিভ কন্টেন্ট',
            description: 'শুধুমাত্র সদস্যদের জন্য বিশেষ কোর্স ও ম্যাটেরিয়াল',
            icon: '🎯'
        },
        {
            title: 'লাইভ সেশন',
            description: 'বিশেষজ্ঞ শিক্ষকদের সাথে সরাসরি ইন্টারঅ্যাক্টিভ ক্লাস',
            icon: '📹'
        },
        {
            title: 'পার্সোনালাইজড লার্নিং',
            description: 'আপনার প্রয়োজন অনুযায়ী কাস্টমাইজড শিক্ষা পরিকল্পনা',
            icon: '🎨'
        },
        {
            title: 'কমিউনিটি সাপোর্ট',
            description: 'সমমনা শিক্ষার্থীদের সাথে যোগাযোগ ও সহযোগিতা',
            icon: '🤝'
        },
        {
            title: 'প্রোগ্রেস ট্র্যাকিং',
            description: 'আপনার অগ্রগতি পর্যবেক্ষণ ও বিশ্লেষণ',
            icon: '📊'
        },
        {
            title: 'সার্টিফিকেশন',
            description: 'কোর্স সম্পন্ন করার পর স্বীকৃত সার্টিফিকেট',
            icon: '🏆'
        }
    ];

    const testimonials = [
        {
            name: 'আহমেদ হাসান',
            nameEn: 'Ahmed Hasan',
            membership: 'Premium Member',
            duration: '১ বছর',
            rating: 5,
            comment: 'প্রিমিয়াম মেম্বারশিপ নিয়ে আমার পড়াশোনায় অসাধারণ উন্নতি হয়েছে। লাইভ সেশনগুলো খুবই কার্যকর।',
            image: '/assets/images/profile-34.jpeg',
            achievement: 'BUET Admission'
        },
        {
            name: 'ফাতিমা খান',
            nameEn: 'Fatima Khan',
            membership: 'Elite Member',
            duration: '৮ মাস',
            rating: 5,
            comment: 'এলিট মেম্বারশিপের ক্যারিয়ার কাউন্সেলিং আমাকে সঠিক পথ দেখিয়েছে। এখন আমি আত্মবিশ্বাসী।',
            image: '/assets/images/user-profile.jpeg',
            achievement: 'Medical Admission'
        },
        {
            name: 'রাকিব রহমান',
            nameEn: 'Rakib Rahman',
            membership: 'Basic Member',
            duration: '৬ মাস',
            rating: 4,
            comment: 'বেসিক মেম্বারশিপ দিয়েই ভালো ফলাফল পেয়েছি। অর্থের তুলনায় চমৎকার সেবা।',
            image: '/assets/images/profile-16.jpeg',
            achievement: 'DU Admission'
        }
    ];

    const faqData = [
        {
            question: 'মেম্বারশিপ কীভাবে কিনবো?',
            answer: 'অনলাইনে পেমেন্ট করে সহজেই মেম্বারশিপ নিতে পারবেন। বিকাশ, নগদ, কার্ড সব পেমেন্ট মেথড গ্রহণযোগ্য।'
        },
        {
            question: 'মেম্বারশিপ বাতিল করা যাবে?',
            answer: 'হ্যাঁ, যেকোনো সময় মেম্বারশিপ বাতিল করতে পারবেন। তবে পেইড অ্যামাউন্ট রিফান্ড হবে না।'
        },
        {
            question: 'একাধিক ডিভাইসে ব্যবহার করা যাবে?',
            answer: 'একটি অ্যাকাউন্ট সর্বোচ্চ ৩টি ডিভাইসে ব্যবহার করা যাবে। তবে একসাথে একটি ডিভাইসেই লগইন থাকতে পারবেন।'
        },
        {
            question: 'মেম্বারশিপ আপগ্রেড করা যাবে?',
            answer: 'হ্যাঁ, যেকোনো সময় উচ্চতর প্ল্যানে আপগ্রেড করতে পারবেন। পার্থক্যের টাকা পরিশোধ করলেই হবে।'
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
                        <span className="text-emerald-400">মেম্বারশিপ</span>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-8">
                            <span className="text-3xl">👑</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                মেম্বারশিপ প্রোগ্রাম
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                            বিশেষ সুবিধা ও এক্সক্লুসিভ কন্টেন্টের জন্য আমাদের মেম্বারশিপ প্রোগ্রামে যোগ দিন
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৩০০০+</div>
                                <div className="text-gray-300">সক্রিয় সদস্য</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৯৫%</div>
                                <div className="text-gray-300">সন্তুষ্ট সদস্য</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">২৪/৭</div>
                                <div className="text-gray-300">সাপোর্ট সেবা</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Membership Plans - Light Section */}
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
                                মেম্বারশিপ প্ল্যান
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আপনার প্রয়োজন অনুযায়ী উপযুক্ত মেম্বারশিপ প্ল্যান বেছে নিন
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {membershipPlans.map((plan) => (
                            <div key={plan.id} className={`group relative ${plan.popular ? 'transform scale-105' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 text-sm font-semibold">
                                        সবচেয়ে জনপ্রিয়
                                    </div>
                                )}
                                
                                <div className={`bg-white border-2 ${plan.popular ? 'border-emerald-500' : 'border-gray-100'} p-8 transition-all duration-300 hover:shadow-xl`}>
                                    {/* Plan Header */}
                                    <div className="text-center mb-8">
                                        <div className="text-5xl mb-4">{plan.icon}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                        <p className="text-emerald-600 font-medium mb-4">{plan.nameEn}</p>
                                        <div className="mb-4">
                                            <span className="text-4xl font-bold text-gray-900">৳{plan.price}</span>
                                            <span className="text-gray-600">/{plan.duration}</span>
                                        </div>
                                        <p className="text-gray-600">{plan.description}</p>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-gray-900 mb-4">যা পাবেন:</h4>
                                        <div className="space-y-3">
                                            {plan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-gray-600">
                                                    <div className="w-2 h-2 bg-emerald-500 mr-3"></div>
                                                    <span className="text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Limitations */}
                                    {plan.limitations.length > 0 && (
                                        <div className="mb-8">
                                            <h4 className="font-semibold text-gray-900 mb-4">সীমাবদ্ধতা:</h4>
                                            <div className="space-y-2">
                                                {plan.limitations.map((limitation, idx) => (
                                                    <div key={idx} className="flex items-center text-gray-500">
                                                        <div className="w-2 h-2 bg-gray-400 mr-3"></div>
                                                        <span className="text-sm">{limitation}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <button className={`w-full py-3 font-semibold transition-all duration-300 ${
                                        plan.popular 
                                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                                            : 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                                    }`}>
                                        {plan.popular ? 'এখনই শুরু করুন' : 'প্ল্যান নির্বাচন করুন'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Comparison Note */}
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">সকল প্ল্যানে ৭ দিনের মানি-ব্যাক গ্যারান্টি</p>
                        <button className="text-emerald-600 font-medium hover:text-emerald-700">
                            বিস্তারিত তুলনা দেখুন →
                        </button>
                    </div>
                </div>
            </section>

            {/* Member Benefits - Dark Section */}
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
                                সদস্যদের বিশেষ সুবিধা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            মেম্বারশিপের মাধ্যমে পান অতিরিক্ত সুবিধা ও এক্সক্লুসিভ কন্টেন্ট
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memberBenefits.map((benefit, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                                    <div className="text-4xl mb-6">{benefit.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Benefits */}
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">এক্সক্লুসিভ সুবিধা</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">১</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">প্রায়োরিটি সাপোর্ট</h4>
                                            <p className="text-gray-300 text-sm">২৪ ঘন্টার মধ্যে সাপোর্ট রেসপন্স</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">২</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">আর্লি অ্যাক্সেস</h4>
                                            <p className="text-gray-300 text-sm">নতুন কোর্স ও ফিচার আগে পাবেন</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mr-4 mt-1">
                                            <span className="text-emerald-400 font-bold text-sm">৩</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">স্পেশাল ডিসকাউন্ট</h4>
                                            <p className="text-gray-300 text-sm">বিশেষ ইভেন্ট ও কোর্সে ছাড়</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">কমিউনিটি সুবিধা</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">প্রাইভেট গ্রুপ</div>
                                        <div className="text-gray-300 text-sm">এক্সক্লুসিভ ফেসবুক গ্রুপ অ্যাক্সেস</div>
                                    </div>
                                    <div className="p-4 bg-green-500/20 border border-green-400/30">
                                        <div className="font-semibold text-white mb-2">নেটওয়ার্কিং</div>
                                        <div className="text-gray-300 text-sm">অন্যান্য সদস্যদের সাথে যোগাযোগ</div>
                                    </div>
                                    <div className="p-4 bg-emerald-500/20 border border-emerald-400/30">
                                        <div className="font-semibold text-white mb-2">মেন্টরশিপ</div>
                                        <div className="text-gray-300 text-sm">সিনিয়র সদস্যদের গাইডেন্স</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Light Section */}
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
                                সদস্যদের মতামত
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আমাদের সদস্যরা কী বলছেন তাদের অভিজ্ঞতা সম্পর্কে
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="group relative">
                                <div className="bg-white p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
                                    <div className="flex items-center mb-6">
                                        <img 
                                            src={testimonial.image} 
                                            alt={testimonial.name}
                                            className="w-16 h-16 object-cover mr-4 border-2 border-emerald-500"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                                            <p className="text-emerald-600 font-medium text-sm">{testimonial.membership}</p>
                                            <p className="text-gray-500 text-sm">{testimonial.duration} সদস্য</p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <blockquote className="text-gray-600 text-sm italic leading-relaxed mb-4">
                                        "{testimonial.comment}"
                                    </blockquote>

                                    <div className="bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 border border-emerald-200">
                                        <span className="text-emerald-800 font-semibold text-sm">{testimonial.achievement}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Member Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 text-center border border-emerald-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">৩০০০+</div>
                            <div className="text-gray-600 text-sm font-medium">সক্রিয় সদস্য</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">৯৫%</div>
                            <div className="text-gray-600 text-sm font-medium">সন্তুষ্ট সদস্য</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 text-center border border-emerald-100">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">৮৫%</div>
                            <div className="text-gray-600 text-sm font-medium">লক্ষ্য অর্জন</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">২৪/৭</div>
                            <div className="text-gray-600 text-sm font-medium">সাপোর্ট সেবা</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ - Dark Section */}
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
                                সচরাচর জিজ্ঞাসা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            মেম্বারশিপ সম্পর্কে আপনার প্রশ্নের উত্তর
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {faqData.map((faq, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                        <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Now CTA - Light Section */}
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
                        <span className="text-3xl">👑</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আজই যোগ দিন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        বিশেষ সুবিধা ও এক্সক্লুসিভ কন্টেন্টের জন্য আমাদের মেম্বারশিপ প্রোগ্রামে যোগ দিন
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            প্রিমিয়াম মেম্বার হন
                        </button>
                        <button className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-emerald-50">
                            ফ্রি ট্রায়াল শুরু করুন
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">নিরাপদ পেমেন্ট</h3>
                            <p className="text-gray-600 text-sm">SSL এনক্রিপ্টেড নিরাপদ পেমেন্ট সিস্টেম</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">৭ দিন গ্যারান্টি</h3>
                            <p className="text-gray-600 text-sm">সন্তুষ্ট না হলে সম্পূর্ণ টাকা ফেরত</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 mx-auto mb-4 flex items-center justify-center border border-emerald-200">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">২৪/৭ সাপোর্ট</h3>
                            <p className="text-gray-600 text-sm">যেকোনো সময় সাহায্যের জন্য যোগাযোগ করুন</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MembershipPage;