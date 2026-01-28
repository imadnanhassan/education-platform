'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            আমাদের কোর্স সমূহ
                        </h1>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                            একাডেমিক উৎকর্ষতা এবং বিদেশে উচ্চশিক্ষার জন্য বিশেষভাবে ডিজাইন করা কোর্স সমূহ
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold">৫০+</div>
                                <div className="text-primary-200">কোর্স</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">১০০০+</div>
                                <div className="text-primary-200">শিক্ষার্থী</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">৯৮%</div>
                                <div className="text-primary-200">সফলতার হার</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedLevel === level.value
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                                    }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                            {/* Course Image */}
                            <div className="aspect-w-16 aspect-h-9 mb-6">
                                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                                    {course.isPopular && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
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
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                            {course.title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                                    <div className="text-2xl font-bold text-primary-600">
                                        ৳{course.price.toLocaleString()}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-2">
                                    <h4 className="font-medium text-gray-900 text-sm">কোর্সে যা থাকছে:</h4>
                                    <ul className="space-y-1">
                                        {course.features.slice(0, 3).map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600">
                                                <svg className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                                    <Button className="w-full group-hover:bg-primary-700 transition-colors">
                                        ভর্তি হন
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">কোন কোর্স পাওয়া যায়নি</h3>
                        <p className="text-gray-500">এই ক্যাটেগরিতে কোন কোর্স নেই।</p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        আপনার পছন্দের কোর্স খুঁজে পাননি?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        আমাদের সাথে যোগাযোগ করুন। আমরা আপনার জন্য কাস্টমাইজড কোর্স তৈরি করতে পারি।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg">
                            যোগাযোগ করুন
                        </Button>
                        <Button variant="outline" size="lg">
                            সকল কোর্স দেখুন
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;