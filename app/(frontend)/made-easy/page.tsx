'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';
import Card from '@/components/ui/Card';

const MadeEasyPage = () => {
    const { subjects } = useSelector((state: IRootState) => state.subjects);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Made Easy
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            বিষয়ভিত্তিক অধ্যায়, MCQ প্র্যাকটিস, PDF নোটস এবং ভিডিও ক্লাসের মাধ্যমে সহজ শিক্ষা পদ্ধতি
                        </p>
                    </div>
                </div>
            </div>

            {/* Subjects Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {subjects.map((subject) => (
                        <Link key={subject.id} href={`/made-easy/${subject.id}`}>
                            <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white">
                                <div className="aspect-w-16 aspect-h-9 mb-4">
                                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                        <div className="text-6xl text-primary-600 opacity-20">
                                            📚
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                            {subject.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {subject.nameEn}
                                        </p>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {subject.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                {subject.totalChapters} অধ্যায়
                                            </span>
                                        </div>
                                        
                                        <div className="text-primary-600 group-hover:text-primary-700 font-medium text-sm">
                                            শুরু করুন →
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Made Easy এর বিশেষত্ব
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">MCQ প্র্যাকটিস</h3>
                            <p className="text-gray-600">প্রতিটি অধ্যায়ে বিস্তৃত MCQ প্র্যাকটিস</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">ভিডিও ক্লাস</h3>
                            <p className="text-gray-600">অভিজ্ঞ শিক্ষকদের ভিডিও লেকচার</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF নোটস</h3>
                            <p className="text-gray-600">সহজবোধ্য PDF নোটস ডাউনলোড</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MadeEasyPage;