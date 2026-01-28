'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IRootState } from '@/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const SubjectChaptersPage = () => {
    const params = useParams();
    const subjectId = params.subject as string;
    
    const { subjects, chapters } = useSelector((state: IRootState) => state.subjects);
    const subject = subjects.find(s => s.id === subjectId);
    const subjectChapters = chapters.filter(c => c.subjectId === subjectId);

    if (!subject) {
        return <div>Subject not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <Link href="/made-easy" className="text-gray-500 hover:text-primary-600">
                                    Made Easy
                                </Link>
                            </li>
                            <li>
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                            <li>
                                <span className="text-gray-900 font-medium">{subject.name}</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Subject Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">{subject.name}</h1>
                        <p className="text-xl text-primary-100 mb-6">{subject.nameEn}</p>
                        <p className="text-lg text-primary-200 max-w-2xl mx-auto mb-8">
                            {subject.description}
                        </p>
                        
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{subject.totalChapters}</div>
                                <div className="text-primary-200">অধ্যায়</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">৫০০+</div>
                                <div className="text-primary-200">MCQ</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">২০+</div>
                                <div className="text-primary-200">ভিডিও</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chapters Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">অধ্যায় সমূহ</h2>
                    <p className="text-gray-600">নিচের অধ্যায়গুলো থেকে আপনার পছন্দের অধ্যায় নির্বাচন করুন</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {subjectChapters.map((chapter) => (
                        <Link key={chapter.id} href={`/made-easy/${subjectId}/${chapter.id}`}>
                            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary-500">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                {chapter.order}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                    {chapter.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{chapter.nameEn}</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                            {chapter.description}
                                        </p>
                                        
                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                {chapter.mcqCount} MCQ
                                            </div>
                                            
                                            {chapter.hasVideo && (
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    ভিডিও
                                                </div>
                                            )}
                                            
                                            {chapter.hasPdf && (
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    PDF
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="ml-4">
                                        <Button variant="ghost" size="sm" className="group-hover:bg-primary-50 group-hover:text-primary-700">
                                            শুরু করুন
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {subjectChapters.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">কোন অধ্যায় পাওয়া যায়নি</h3>
                        <p className="text-gray-500">এই বিষয়ের জন্য শীঘ্রই অধ্যায় যোগ করা হবে।</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectChaptersPage;