'use client';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IRootState } from '@/store';

const SubjectChaptersPage = () => {
    const params = useParams();
    const subjectId = params.subject as string;
    
    const { subjects, chapters } = useSelector((state: IRootState) => state.subjects);
    const subject = subjects.find(s => s.id === subjectId);
    const subjectChapters = chapters.filter(c => c.subjectId === subjectId);

    if (!subject) {
        return (
            <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">বিষয় খুঁজে পাওয়া যায়নি</h1>
                    <p className="text-gray-400 mb-8">দুঃখিত, আপনার অনুরোধকৃত বিষয়টি পাওয়া যায়নি।</p>
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
                                <span className="text-white font-medium">{subject.name}</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Subject Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                {subject.name}
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 mb-4">{subject.nameEn}</p>
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                            {subject.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">{subject.totalChapters}</div>
                                <div className="text-gray-300">অধ্যায়</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-green-400 mb-2">৫০০+</div>
                                <div className="text-gray-300">MCQ প্রশ্ন</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">২০+</div>
                                <div className="text-gray-300">ভিডিও ক্লাস</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chapters Section - White */}
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
                                অধ্যায় সমূহ
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            নিচের অধ্যায়গুলো থেকে আপনার পছন্দের অধ্যায় নির্বাচন করে পড়াশোনা শুরু করুন
                        </p>
                    </div>

                    {/* Chapters Grid */}
                    {subjectChapters.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {subjectChapters.map((chapter) => (
                                <Link key={chapter.id} href={`/made-easy/${subjectId}/${chapter.id}`} className="group">
                                    <div className="bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-emerald-200">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                {/* Chapter Header */}
                                                <div className="flex items-center mb-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center text-lg font-bold mr-4">
                                                        {chapter.order}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                                                            {chapter.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">{chapter.nameEn}</p>
                                                    </div>
                                                </div>
                                                
                                                {/* Description */}
                                                <p className="text-gray-600 mb-6 leading-relaxed">
                                                    {chapter.description}
                                                </p>
                                                
                                                {/* Features */}
                                                <div className="grid grid-cols-3 gap-4 mb-6">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span>{chapter.mcqCount} MCQ</span>
                                                    </div>
                                                    
                                                    {chapter.hasVideo && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                            <span>ভিডিও</span>
                                                        </div>
                                                    )}
                                                    
                                                    {chapter.hasPdf && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span>PDF নোট</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Action Button */}
                                            <div className="ml-6">
                                                <div className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 group-hover:from-emerald-600 group-hover:to-green-700">
                                                    শুরু করুন
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">কোন অধ্যায় পাওয়া যায়নি</h3>
                            <p className="text-gray-600 mb-8">এই বিষয়ের জন্য শীঘ্রই অধ্যায় যোগ করা হবে। অন্যান্য বিষয় দেখুন।</p>
                            <Link href="/made-easy" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                                অন্যান্য বিষয় দেখুন
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Study Features Section - Dark */}
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
                                পড়াশোনার সুবিধা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Made Easy সিস্টেমে প্রতিটি অধ্যায়ে পাবেন সম্পূর্ণ শিক্ষা উপকরণ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* MCQ Feature */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mb-6 mx-auto">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 text-center">MCQ প্রশ্ন</h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    প্রতিটি অধ্যায়ে রয়েছে বহুনির্বাচনী প্রশ্ন যা আপনার দক্ষতা যাচাই করবে এবং পরীক্ষার জন্য প্রস্তুত করবে।
                                </p>
                            </div>
                        </div>

                        {/* Video Feature */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-6 mx-auto">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 text-center">ভিডিও ক্লাস</h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    অভিজ্ঞ শিক্ষকদের তৈরি উচ্চমানের ভিডিও ক্লাস যা জটিল বিষয়গুলো সহজভাবে বুঝিয়ে দেবে।
                                </p>
                            </div>
                        </div>

                        {/* PDF Feature */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center mb-6 mx-auto">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 text-center">PDF নোট</h3>
                                <p className="text-gray-300 text-center leading-relaxed">
                                    সুন্দরভাবে সাজানো PDF নোট যা আপনি ডাউনলোড করে অফলাইনেও পড়তে পারবেন।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                {/* Light Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আজই শুরু করুন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Made Easy সিস্টেমের সাহায্যে আপনার পড়াশোনাকে করুন আরও সহজ এবং কার্যকর
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/made-easy" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            অন্যান্য বিষয় দেখুন
                        </Link>
                        <Link href="/courses" className="inline-block px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-medium transition-all duration-300 hover:bg-emerald-50">
                            সকল কোর্স দেখুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SubjectChaptersPage;