'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const { courses } = useSelector((state: IRootState) => state.courses);
    const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
    
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">কোর্স পাওয়া যায়নি</h3>
                    <p className="text-gray-500 mb-4">এই কোর্সটি বিদ্যমান নেই বা সরানো হয়েছে।</p>
                    <Link href="/courses">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 font-medium">
                            সকল কোর্স দেখুন
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'সংক্ষিপ্ত বিবরণ' },
        { id: 'curriculum', label: 'সিলেবাস' },
        { id: 'instructor', label: 'শিক্ষক' },
        { id: 'reviews', label: 'রিভিউ' }
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

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
                        <Link href="/" className="hover:text-emerald-400 transition-colors">হোম</Link>
                        <span>/</span>
                        <Link href="/courses" className="hover:text-emerald-400 transition-colors">কোর্স</Link>
                        <span>/</span>
                        <span className="text-emerald-400">{course.title}</span>
                    </div>

                    {/* Course Header */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center space-x-3 mb-6">
                            <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium">
                                {course.category}
                            </span>
                            <span className={`px-4 py-2 text-sm font-medium ${
                                course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                                course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {course.level === 'beginner' && 'শুরুর স্তর'}
                                {course.level === 'intermediate' && 'মধ্যম স্তর'}
                                {course.level === 'advanced' && 'উন্নত স্তর'}
                            </span>
                            {course.isPopular && (
                                <span className="px-4 py-2 bg-red-500 text-white text-sm font-medium">
                                    জনপ্রিয়
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                {course.title}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-6">{course.titleEn}</p>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            {course.description}
                        </p>
                    </div>

                    {/* Course Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">{course.totalStudents}</div>
                            <div className="text-gray-300 text-sm">শিক্ষার্থী</div>
                        </div>
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">{course.rating}</div>
                            <div className="text-gray-300 text-sm">রেটিং</div>
                        </div>
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">{course.totalLessons}</div>
                            <div className="text-gray-300 text-sm">লেসন</div>
                        </div>
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 text-center">
                            <div className="text-3xl font-bold text-emerald-400 mb-2">{course.totalHours}</div>
                            <div className="text-gray-300 text-sm">ঘন্টা</div>
                        </div>
                    </div>

                    {/* Price & Enrollment Section */}
                    <div className="max-w-4xl mx-auto">
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 text-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                {/* Price Info */}
                                <div>
                                    {course.originalPrice && (
                                        <div className="text-xl text-gray-400 line-through mb-2">৳{course.originalPrice.toLocaleString()}</div>
                                    )}
                                    <div className="text-5xl font-bold text-white mb-2">৳{course.price.toLocaleString()}</div>
                                    <div className="text-gray-300">সম্পূর্ণ কোর্স</div>
                                </div>

                                {/* Course Duration */}
                                <div className="flex flex-col items-center">
                                    <svg className="w-12 h-12 text-emerald-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-xl font-semibold text-white mb-1">কোর্সের মেয়াদ</div>
                                    <div className="text-emerald-400 font-medium">{course.duration}</div>
                                </div>

                                {/* Enrollment Buttons */}
                                <div className="space-y-3">
                                    <Link href="/admission">
                                        <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-8 text-lg font-semibold transition-all duration-300">
                                            এখনই ভর্তি হন
                                        </button>
                                    </Link>
                                    <button className="w-full border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/20 py-3 px-8 font-medium transition-all duration-300">
                                        ফ্রি ট্রায়াল নিন
                                    </button>
                                </div>
                            </div>

                            {/* Certificate Badge */}
                            {course.certificate && (
                                <div className="flex items-center justify-center text-gray-300 mt-6 pt-6 border-t border-white/20">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    <span className="text-lg font-medium">সার্টিফিকেট প্রদান করা হবে</span>
                                </div>
                            )}
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
                                কোর্সের বৈশিষ্ট্য সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            এই কোর্সে যা যা পাবেন এবং কেন এটি আপনার জন্য সেরা পছন্দ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {course.features?.map((feature, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-6 text-center hover:border-emerald-200 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature}</h3>
                                <p className="text-gray-600 text-sm">
                                    {index % 3 === 0 && 'বিশেষজ্ঞ শিক্ষকদের তত্ত্বাবধানে সম্পূর্ণ গাইডেন্স'}
                                    {index % 3 === 1 && 'ব্যবহারিক অভিজ্ঞতা এবং হ্যান্ডস-অন প্র্যাকটিস'}
                                    {index % 3 === 2 && 'আপডেটেড কন্টেন্ট এবং আধুনিক পদ্ধতি'}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* What You'll Learn */}
                    <div className="bg-white border border-gray-100 p-8">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">আপনি যা শিখবেন</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {course.whatYouWillLearn?.map((item, index) => (
                                <div key={index} className="flex items-start p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
                                    <div className="w-6 h-6 bg-emerald-500 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Details Tabs - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Soft Green Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                কোর্সের বিস্তারিত তথ্য
                            </span>
                        </h2>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-8 py-4 font-medium text-lg transition-all duration-300 mx-2 mb-4 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                                        : 'backdrop-blur-xl bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="max-w-5xl mx-auto">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">কোর্স সম্পর্কে বিস্তারিত</h3>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                    {course.fullDescription || course.description}
                                </p>

                                {/* Prerequisites */}
                                <div className="mb-8">
                                    <h4 className="text-xl font-semibold text-white mb-4">পূর্বশর্ত</h4>
                                    <div className="space-y-3">
                                        {course.prerequisites?.map((prerequisite, index) => (
                                            <div key={index} className="flex items-start">
                                                <svg className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-gray-300">{prerequisite}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Course Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-emerald-400">{course.totalLessons || 0}</div>
                                        <div className="text-gray-300 text-sm">মোট লেসন</div>
                                    </div>
                                    <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-emerald-400">{course.totalHours || 0}</div>
                                        <div className="text-gray-300 text-sm">মোট ঘন্টা</div>
                                    </div>
                                    <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-emerald-400">{course.level}</div>
                                        <div className="text-gray-300 text-sm">স্তর</div>
                                    </div>
                                    <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                        <div className="text-2xl font-bold text-emerald-400">{course.certificate ? 'হ্যাঁ' : 'না'}</div>
                                        <div className="text-gray-300 text-sm">সার্টিফিকেট</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Curriculum Tab */}
                        {activeTab === 'curriculum' && (
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">কোর্স সিলেবাস</h3>
                                <div className="space-y-4">
                                    {course.curriculum?.map((item, index) => (
                                        <div key={index} className="flex items-center p-4 backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-white">{item}</h4>
                                                <p className="text-gray-300 text-sm mt-1">
                                                    {index % 3 === 0 && 'তত্ত্বীয় ক্লাস এবং ব্যবহারিক প্রয়োগ'}
                                                    {index % 3 === 1 && 'হ্যান্ডস-অন প্র্যাকটিস এবং প্রজেক্ট ওয়ার্ক'}
                                                    {index % 3 === 2 && 'অ্যাসাইনমেন্ট এবং মূল্যায়ন'}
                                                </p>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Instructor Tab */}
                        {activeTab === 'instructor' && (
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">শিক্ষক পরিচিতি</h3>
                                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={course.instructorImage || '/assets/images/user-profile.jpeg'} 
                                            alt={course.instructor}
                                            className="w-40 h-40 object-cover border-4 border-emerald-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-3xl font-bold text-white mb-2">{course.instructor}</h4>
                                        <p className="text-emerald-400 font-medium text-lg mb-4">প্রধান শিক্ষক ও কোর্স ইন্সট্রাক্টর</p>
                                        <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                                            {course.instructorBio || 'অভিজ্ঞ শিক্ষক যিনি বছরের পর বছর ধরে শিক্ষার্থীদের সফল করে তুলেছেন।'}
                                        </p>
                                        
                                        {/* Instructor Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                                <div className="text-3xl font-bold text-emerald-400">{course.totalStudents}</div>
                                                <div className="text-gray-300">শিক্ষার্থী</div>
                                            </div>
                                            <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                                <div className="text-3xl font-bold text-emerald-400">{course.rating}</div>
                                                <div className="text-gray-300">রেটিং</div>
                                            </div>
                                            <div className="text-center p-4 backdrop-blur-xl bg-white/5 border border-white/10">
                                                <div className="text-3xl font-bold text-emerald-400">১৫+</div>
                                                <div className="text-gray-300">বছর অভিজ্ঞতা</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">শিক্ষার্থীদের রিভিউ</h3>
                                
                                {/* Rating Summary */}
                                <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 backdrop-blur-xl bg-white/5 border border-white/10">
                                    <div className="text-center md:text-left mb-6 md:mb-0">
                                        <div className="text-6xl font-bold text-emerald-400 mb-2">{course.rating}</div>
                                        <div className="flex items-center justify-center md:justify-start mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-6 h-6 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="text-gray-300">{course.totalStudents} জন শিক্ষার্থীর রিভিউ</div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <div key={star} className="flex items-center space-x-3">
                                                <span className="text-sm text-gray-300 w-8">{star} ★</span>
                                                <div className="w-32 bg-gray-600 h-2">
                                                    <div 
                                                        className="bg-yellow-400 h-2" 
                                                        style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 3 : star === 2 ? 1 : 1}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-300 w-8">
                                                    {star === 5 ? '80%' : star === 4 ? '15%' : star === 3 ? '3%' : star === 2 ? '1%' : '1%'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sample Reviews */}
                                <div className="space-y-6">
                                    {[
                                        {
                                            name: 'রাহুল আহমেদ',
                                            rating: 5,
                                            comment: 'অসাধারণ কোর্স! শিক্ষকের পড়ানোর পদ্ধতি খুবই ভালো। সব কিছু খুব সহজভাবে বুঝিয়ে দেন। আমি এই কোর্স করে অনেক উপকৃত হয়েছি।',
                                            date: '২ সপ্তাহ আগে'
                                        },
                                        {
                                            name: 'সারা খাতুন',
                                            rating: 5,
                                            comment: 'এই কোর্স করার পর আমার আত্মবিশ্বাস অনেক বেড়েছে। প্র্যাকটিস ম্যাটেরিয়াল গুলো খুবই কার্যকর। সবার জন্য সুপারিশ করি।',
                                            date: '১ মাস আগে'
                                        },
                                        {
                                            name: 'করিম উদ্দিন',
                                            rating: 4,
                                            comment: 'ভালো কোর্স। শিক্ষকের পড়ানোর স্টাইল চমৎকার। তবে আরো বেশি প্র্যাকটিস সেশন থাকলে আরো ভালো হতো।',
                                            date: '৩ সপ্তাহ আগে'
                                        }
                                    ].map((review, index) => (
                                        <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h5 className="font-semibold text-white text-lg">{review.name}</h5>
                                                    <div className="flex items-center mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-400">{review.date}</span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Courses - White */}
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
                                সম্পর্কিত কোর্স সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আরো কোর্স দেখুন যা আপনার আগ্রহের হতে পারে এবং আপনার দক্ষতা বৃদ্ধিতে সহায়ক
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {courses.filter(c => c.id !== course.id && c.category === course.category).slice(0, 3).map((relatedCourse) => (
                            <div key={relatedCourse.id} className="group cursor-pointer bg-white border border-gray-100 p-6 hover:border-emerald-200 transition-all duration-300">
                                {/* Course Image */}
                                <div className="w-full h-48 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 flex items-center justify-center mb-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-3 mx-auto">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div className="text-sm font-medium text-emerald-600">{relatedCourse.category}</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                                            {relatedCourse.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {relatedCourse.description}
                                        </p>
                                    </div>

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-emerald-600">{relatedCourse.totalStudents}</div>
                                            <div className="text-xs text-gray-500">শিক্ষার্থী</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-bold text-green-600">{relatedCourse.rating}</div>
                                            <div className="text-xs text-gray-500">রেটিং</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {relatedCourse.duration}
                                        </div>
                                        <div className="text-right">
                                            {relatedCourse.originalPrice && (
                                                <div className="text-xs text-gray-400 line-through">৳{relatedCourse.originalPrice.toLocaleString()}</div>
                                            )}
                                            <div className="text-lg font-bold text-emerald-600">
                                                ৳{relatedCourse.price.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    <Link href={`/courses/${relatedCourse.id}`}>
                                        <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 font-semibold transition-all duration-300">
                                            বিস্তারিত দেখুন
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Courses */}
                    <div className="text-center">
                        <Link href="/courses">
                            <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                                সকল কোর্স দেখুন
                            </button>
                        </Link>
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
                                এখনই শুরু করুন আপনার শিক্ষা যাত্রা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            আজই ভর্তি হয়ে যান এবং আপনার স্বপ্নের লক্ষ্য অর্জন করুন। হাজারো শিক্ষার্থীর মতো আপনিও সফল হন।
                        </p>
                        
                        {/* Final Price Display */}
                        <div className="mb-8">
                            {course.originalPrice && (
                                <div className="text-2xl text-gray-400 line-through mb-2">৳{course.originalPrice.toLocaleString()}</div>
                            )}
                            <div className="text-5xl font-bold text-white mb-2">৳{course.price.toLocaleString()}</div>
                            <div className="text-gray-300 text-lg">সম্পূর্ণ কোর্স - {course.duration}</div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/admission">
                                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    এখনই ভর্তি হন
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/20 px-10 py-4 text-xl font-semibold transition-all duration-300">
                                    যোগাযোগ করুন
                                </button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">৩০ দিন</div>
                                <div className="text-gray-300 text-sm">মানি ব্যাক গ্যারান্টি</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">২৪/৭</div>
                                <div className="text-gray-300 text-sm">সাপোর্ট সেবা</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">লাইফটাইম</div>
                                <div className="text-gray-300 text-sm">এক্সেস</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseDetailPage;