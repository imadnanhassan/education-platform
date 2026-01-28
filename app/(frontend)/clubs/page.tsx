'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const ClubsPage = () => {
    const { clubs } = useSelector((state: IRootState) => state.clubs);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            আমাদের ক্লাব সমূহ
                        </h1>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                            সহশিক্ষা কার্যক্রমের মাধ্যমে শিক্ষার্থীদের সর্বাঙ্গীণ বিকাশে আমাদের বিভিন্ন ক্লাব
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-3xl font-bold">{clubs.length}+</div>
                                <div className="text-primary-200">সক্রিয় ক্লাব</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">৫০০+</div>
                                <div className="text-primary-200">সদস্য</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">১০০+</div>
                                <div className="text-primary-200">কার্যক্রম</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clubs Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {clubs.map((club) => (
                        <Card key={club.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                            {/* Club Header */}
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <div className="text-2xl">
                                        {club.id === '1' && '🔬'}
                                        {club.id === '2' && '🎤'}
                                        {club.id === '3' && '🎭'}
                                        {club.id === '4' && '⚽'}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                                        {club.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">{club.nameEn}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {club.description}
                                    </p>
                                </div>
                            </div>

                            {/* Activities */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">প্রধান কার্যক্রম:</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {club.activities.slice(0, 4).map((activity, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0"></div>
                                            {activity}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Notice */}
                            {club.notices.length > 0 && (
                                <div className="mb-6">
                                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                                        <div className="flex items-start space-x-2">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h5 className="font-medium text-primary-900 text-sm mb-1">
                                                    সাম্প্রতিক নোটিশ
                                                </h5>
                                                <p className="text-primary-700 text-xs leading-relaxed">
                                                    {club.notices[0].title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        ৫০+ সদস্য
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-4h8v4z" />
                                        </svg>
                                        {club.gallery.length} ছবি
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <Link href={`/clubs/${club.id}`} className="flex-1">
                                    <Button className="w-full group-hover:bg-primary-700 transition-colors">
                                        বিস্তারিত দেখুন
                                    </Button>
                                </Link>
                                <Button variant="outline" size="md" className="px-4">
                                    যোগ দিন
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ক্লাব সদস্যপদের সুবিধা
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            আমাদের ক্লাবে যোগ দিয়ে পান বিশেষ সুবিধা এবং দক্ষতা বিকাশের সুযোগ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">দক্ষতা বিকাশ</h3>
                            <p className="text-gray-600">বিভিন্ন কার্যক্রমের মাধ্যমে ব্যক্তিত্ব ও দক্ষতা বিকাশ</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">নেটওয়ার্কিং</h3>
                            <p className="text-gray-600">সমমনা বন্ধুদের সাথে সম্পর্ক গড়ে তোলার সুযোগ</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">সার্টিফিকেট</h3>
                            <p className="text-gray-600">অংশগ্রহণ ও অর্জনের জন্য সার্টিফিকেট প্রদান</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        আজই যোগ দিন আমাদের ক্লাবে
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        আপনার আগ্রহ অনুযায়ী ক্লাব বেছে নিন এবং নতুন অভিজ্ঞতা অর্জন করুন
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg">
                            সদস্যপদের জন্য আবেদন
                        </Button>
                        <Button variant="outline" size="lg">
                            আরও তথ্য জানুন
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubsPage;