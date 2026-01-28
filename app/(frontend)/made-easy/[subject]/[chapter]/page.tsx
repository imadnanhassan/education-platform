'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IRootState } from '@/store';
import PDFViewer from '@/components/ui/PDFViewer';

const ChapterDetailPage = () => {
    const params = useParams();
    const subjectId = params.subject as string;
    const chapterId = params.chapter as string;
    
    const { subjects, chapters, mcqs, videoClasses, pdfNotes } = useSelector((state: IRootState) => state.subjects);
    const subject = subjects.find(s => s.id === subjectId);
    const chapter = chapters.find(c => c.id === chapterId);
    const chapterMcqs = mcqs.filter(m => m.chapterId === chapterId);
    const chapterVideos = videoClasses.filter(v => v.chapterId === chapterId);
    const chapterPdfs = pdfNotes.filter(p => p.chapterId === chapterId);

    // PDF Viewer State
    const [selectedPdf, setSelectedPdf] = useState<{url: string, title: string} | null>(null);

    const openPdfViewer = (pdfUrl: string, title: string) => {
        setSelectedPdf({ url: pdfUrl, title });
    };

    const closePdfViewer = () => {
        setSelectedPdf(null);
    };

    if (!subject || !chapter) {
        return (
            <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">অধ্যায় খুঁজে পাওয়া যায়নি</h1>
                    <p className="text-gray-400 mb-8">দুঃখিত, আপনার অনুরোধকৃত অধ্যায়টি পাওয়া যায়নি।</p>
                    <Link href="/made-easy" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                        Made Easy এ ফিরে যান
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section - Dark */}
            <section className="relative bg-black/[0.96] overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {/* Breadcrumb */}
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <Link href="/made-easy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    Made Easy
                                </Link>
                            </li>
                            <li>
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                            <li>
                                <Link href={`/made-easy/${subjectId}`} className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    {subject.name}
                                </Link>
                            </li>
                            <li>
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                            <li>
                                <span className="text-white font-medium">{chapter.name}</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Chapter Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl border border-emerald-400/30 mb-6">
                            <span className="text-emerald-400 font-medium">অধ্যায় {chapter.order}</span>
                        </div>
                        
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                {chapter.name}
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 mb-4">{chapter.nameEn}</p>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                            {chapter.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">{chapterMcqs.length}</div>
                                <div className="text-gray-300">MCQ প্রশ্ন</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-green-400 mb-2">{chapterVideos.length}</div>
                                <div className="text-gray-300">ভিডিও ক্লাস</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">{chapterPdfs.length}</div>
                                <div className="text-gray-300">PDF নোট</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MCQ Section - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                {/* Light Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                MCQ প্রশ্ন সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            এই অধ্যায়ের গুরুত্বপূর্ণ বহুনির্বাচনী প্রশ্ন অনুশীলন করুন
                        </p>
                    </div>

                    {/* MCQ Grid */}
                    {chapterMcqs.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8">
                            {chapterMcqs.map((mcq, index) => (
                                <div key={mcq.id} className="bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-emerald-200">
                                    <div className="flex items-start mb-6">
                                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">{mcq.question}</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                {mcq.options.map((option, optionIndex) => (
                                                    <div 
                                                        key={optionIndex} 
                                                        className={`p-4 border transition-all duration-300 ${
                                                            optionIndex === mcq.correctAnswer 
                                                                ? 'border-emerald-500 bg-emerald-50' 
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <span className="w-6 h-6 bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-medium mr-3">
                                                                {String.fromCharCode(65 + optionIndex)}
                                                            </span>
                                                            <span className="text-gray-800">{option}</span>
                                                            {optionIndex === mcq.correctAnswer && (
                                                                <svg className="w-5 h-5 text-emerald-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {mcq.explanation && (
                                                <div className="bg-emerald-50 border border-emerald-200 p-4">
                                                    <div className="flex items-start">
                                                        <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <div>
                                                            <h4 className="font-medium text-emerald-800 mb-1">ব্যাখ্যা:</h4>
                                                            <p className="text-emerald-700">{mcq.explanation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="flex items-center justify-between mt-4">
                                                <span className={`px-3 py-1 text-sm font-medium ${
                                                    mcq.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                    mcq.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {mcq.difficulty === 'easy' ? 'সহজ' : 
                                                     mcq.difficulty === 'medium' ? 'মাধ্যম' : 'কঠিন'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">কোন MCQ প্রশ্ন পাওয়া যায়নি</h3>
                            <p className="text-gray-600">এই অধ্যায়ের জন্য শীঘ্রই MCQ প্রশ্ন যোগ করা হবে।</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Video Classes Section - Dark */}
            <section className="relative bg-black/[0.96] overflow-hidden py-20">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                ভিডিও ক্লাস
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            অভিজ্ঞ শিক্ষকদের তৈরি উচ্চমানের ভিডিও ক্লাস দেখুন
                        </p>
                    </div>

                    {chapterVideos.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {chapterVideos.map((video) => (
                                <div key={video.id} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                                        {/* Video Thumbnail */}
                                        <div className="relative mb-6 aspect-video bg-gray-800 overflow-hidden">
                                            <img 
                                                src={video.thumbnail} 
                                                alt={video.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-emerald-500 flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 px-2 py-1 bg-black/70 text-white text-sm">
                                                {video.duration} মিনিট
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                                        <p className="text-gray-300 mb-4">{video.description}</p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-400">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {video.instructor}
                                            </div>
                                            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                                                দেখুন
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-white/10 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">কোন ভিডিও ক্লাস পাওয়া যায়নি</h3>
                            <p className="text-gray-400">এই অধ্যায়ের জন্য শীঘ্রই ভিডিও ক্লাস যোগ করা হবে।</p>
                        </div>
                    )}
                </div>
            </section>

            {/* PDF Notes Section - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                {/* Light Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                PDF নোট সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            অধ্যায়ের সম্পূর্ণ নোট ডাউনলোড করে অফলাইনে পড়ুন
                        </p>
                    </div>

                    {chapterPdfs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {chapterPdfs.map((pdf) => (
                                <div key={pdf.id} className="bg-white border border-gray-100 p-6 transition-all duration-300 hover:border-emerald-200">
                                    <div className="flex items-start mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{pdf.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{pdf.description}</p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                                    <span>{pdf.pages} পৃষ্ঠা</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{pdf.fileSize} MB</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => openPdfViewer(pdf.fileUrl, pdf.title)}
                                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700"
                                                >
                                                    পড়ুন
                                                </button>
                                                <a
                                                    href={pdf.fileUrl}
                                                    download
                                                    className="px-4 py-2 border-2 border-emerald-500 text-emerald-600 font-medium transition-all duration-300 hover:bg-emerald-50"
                                                >
                                                    ডাউনলোড
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">কোন PDF নোট পাওয়া যায়নি</h3>
                            <p className="text-gray-600">এই অধ্যায়ের জন্য শীঘ্রই PDF নোট যোগ করা হবে।</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Navigation Section - Dark */}
            <section className="relative bg-black/[0.96] overflow-hidden py-20">
                {/* Grid Background */}
                <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]"></div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                            আরও অধ্যায় দেখুন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        {subject.name} বিষয়ের অন্যান্য অধ্যায়গুলো অধ্যয়ন করুন
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href={`/made-easy/${subjectId}`} className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            {subject.name} এর সব অধ্যায়
                        </Link>
                        <Link href="/made-easy" className="inline-block px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-medium transition-all duration-300 hover:bg-emerald-400/10">
                            অন্যান্য বিষয়
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* PDF Viewer Modal */}
            {selectedPdf && (
                <PDFViewer
                    pdfUrl={selectedPdf.url}
                    title={selectedPdf.title}
                    onClose={closePdfViewer}
                />
            )}
        </div>
    );
};

export default ChapterDetailPage;