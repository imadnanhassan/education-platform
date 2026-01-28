'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

const CoursesPage = () => {
    const { courses } = useSelector((state: IRootState) => state.courses);
    const [selectedLevel, setSelectedLevel] = useState<string>('all');

    const filteredCourses = selectedLevel === 'all' 
        ? courses 
        : courses.filter(course => course.level === selectedLevel);

    const levels = [
        { value: 'all', label: 'সকল কোর্স' },
        { value: 'beginner', label: 'শুরুর স্তর' },
        { value: 'intermediate', label: 'মধ্যম স্তর' },
        { value: 'advanced', label: 'উন্নত স্তর' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আমাদের কোর্স সমূহ
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            একাডেমিক উৎকর্ষতা এবং বিদেশে উচ্চশিক্ষার জন্য বিশেষভাবে ডিজাইন করা কোর্স সমূহ
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৫০+</div>
                                <div className="text-gray-300">কোর্স</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">১০০০+</div>
                                <div className="text-gray-300">শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-400">৯৮%</div>
                                <div className="text-gray-300">সফলতার হার</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section - White */}
            <section className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">কোর্স ফিল্টার</h2>
                            <p className="text-sm text-gray-600">আপনার পছন্দের কোর্স খুঁজে নিন</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {levels.map((level) => (
                                <button
                                    key={level.value}
                                    onClick={() => setSelectedLevel(level.value)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                                        selectedLevel === level.value
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                                    }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="group cursor-pointer bg-white border border-gray-100 p-6 hover:border-emerald-200 transition-all duration-300 overflow-hidden">
                                {/* Course Image */}
                                <div className="aspect-w-16 aspect-h-9 mb-6">
                                    <div className="w-full h-48 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 flex items-center justify-center relative overflow-hidden">
                                        {course.isPopular && (
                                            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                                                জনপ্রিয়
                                            </div>
                                        )}
                                        <div className="text-6xl opacity-20">
                                            {course.id === '1' && '🎓'}
                                            {course.id === '2' && '🌍'}
                                            {course.id === '3' && '📊'}
                                            {course.id === '4' && '🏆'}
                                        </div>
                                    </div>
                                </div>

                                {/* Course Content */}
                                <div className="space-y-4">
                                    {/* Title & Level */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                {course.title}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs font-medium ${
                                                course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                                                course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {course.level === 'beginner' && 'শুরুর স্তর'}
                                                {course.level === 'intermediate' && 'মধ্যম স্তর'}
                                                {course.level === 'advanced' && 'উন্নত স্তর'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{course.titleEn}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {course.description}
                                        </p>
                                    </div>

                                    {/* Course Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {course.duration}
                                        </div>
                                        <div className="text-2xl font-bold text-emerald-600">
                                            ৳{course.price.toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2">
                                        <h4 className="font-medium text-gray-900 text-sm">কোর্সে যা থাকছে:</h4>
                                        <ul className="space-y-1">
                                            {course.features.slice(0, 3).map((feature, index) => (
                                                <li key={index} className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                            {course.features.length > 3 && (
                                                <li className="text-xs text-gray-500 ml-5">
                                                    +{course.features.length - 3} আরও বৈশিষ্ট্য
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="pt-4">
                                        <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 font-semibold transition-all duration-300">
                                            ভর্তি হন
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">কোন কোর্স পাওয়া যায়নি</h3>
                            <p className="text-gray-500">এই ক্যাটেগরিতে কোন কোর্স নেই।</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            আপনার পছন্দের কোর্স খুঁজে পাননি?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        আমাদের সাথে যোগাযোগ করুন। আমরা আপনার জন্য কাস্টমাইজড কোর্স তৈরি করতে পারি।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                            যোগাযোগ করুন
                        </button>
                        <button className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                            সকল কোর্স দেখুন
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;