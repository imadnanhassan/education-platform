'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IRootState } from '@/store';

const ClubDetailPage = () => {
    const params = useParams();
    const clubId = params.clubId as string;
    
    const { clubs } = useSelector((state: IRootState) => state.clubs);
    const club = clubs.find(c => c.id === clubId);

    const [activeTab, setActiveTab] = useState<'intro' | 'activities' | 'notices' | 'gallery'>('intro');

    if (!club) {
        return (
            <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">ক্লাব খুঁজে পাওয়া যায়নি</h1>
                    <p className="text-gray-400 mb-8">দুঃখিত, আপনার অনুরোধকৃত ক্লাবটি পাওয়া যায়নি।</p>
                    <Link href="/clubs" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                        সকল ক্লাব দেখুন
                    </Link>
                </div>
            </div>
        );
    }

    const getClubIcon = (clubId: string) => {
        const icons: { [key: string]: string } = {
            'science-club': '🔬',
            'debate-club': '🎤',
            'cultural-club': '🎭',
            'sports-club': '⚽',
            'computer-club': '💻',
            'literature-club': '📚',
            'environment-club': '🌱'
        };
        return icons[clubId] || '🏛️';
    };

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
                                <Link href="/clubs" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    ক্লাব সমূহ
                                </Link>
                            </li>
                            <li>
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </li>
                            <li>
                                <span className="text-white font-medium">{club.name}</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Club Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-xl border border-emerald-400/30 mb-6 text-4xl">
                            {getClubIcon(club.id)}
                        </div>
                        
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                {club.name}
                            </span>
                        </h1>
                        <p className="text-2xl text-gray-300 mb-4">{club.nameEn}</p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">৫০+</div>
                                <div className="text-gray-300">সক্রিয় সদস্য</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-green-400 mb-2">{club.activities.length}</div>
                                <div className="text-gray-300">কার্যক্রম</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">{club.gallery.length}</div>
                                <div className="text-gray-300">গ্যালারি</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Tabs - White */}
            <section className="relative py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 justify-center">
                        <button
                            onClick={() => setActiveTab('intro')}
                            className={`px-6 py-3 font-medium transition-all duration-300 ${
                                activeTab === 'intro'
                                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                                    : 'text-gray-600 hover:text-emerald-600'
                            }`}
                        >
                            ক্লাব পরিচিতি
                        </button>
                        <button
                            onClick={() => setActiveTab('activities')}
                            className={`px-6 py-3 font-medium transition-all duration-300 ${
                                activeTab === 'activities'
                                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                                    : 'text-gray-600 hover:text-emerald-600'
                            }`}
                        >
                            কার্যক্রম
                        </button>
                        <button
                            onClick={() => setActiveTab('notices')}
                            className={`px-6 py-3 font-medium transition-all duration-300 ${
                                activeTab === 'notices'
                                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                                    : 'text-gray-600 hover:text-emerald-600'
                            }`}
                        >
                            নোটিশ
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`px-6 py-3 font-medium transition-all duration-300 ${
                                activeTab === 'gallery'
                                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                                    : 'text-gray-600 hover:text-emerald-600'
                            }`}
                        >
                            গ্যালারি
                        </button>
                    </nav>
                </div>
            </section>

            {/* Content Sections */}
            {activeTab === 'intro' && (
                <section className="relative py-20 bg-white overflow-hidden">
                    {/* Light Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                        <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                             radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    ক্লাব পরিচিতি
                                </span>
                            </h2>
                        </div>

                        <div className="bg-white border border-gray-100 p-8 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">আমাদের সম্পর্কে</h3>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                {club.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">আমাদের লক্ষ্য</h4>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                                            শিক্ষার্থীদের দক্ষতা ও প্রতিভা বিকাশ
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                                            সৃজনশীলতা ও উদ্ভাবনী চিন্তা উৎসাহিত করা
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                                            দলীয় কাজের মনোভাব গড়ে তোলা
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-emerald-500 mt-2 mr-3 flex-shrink-0"></div>
                                            নেতৃত্বের গুণাবলী বিকাশ করা
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">সদস্যপদের সুবিধা</h4>
                                    <ul className="space-y-3 text-gray-600">
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                                            বিনামূল্যে প্রশিক্ষণ ও ওয়ার্কশপ
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                                            সার্টিফিকেট ও পুরস্কার প্রাপ্তির সুযোগ
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                                            জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণ
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-2 h-2 bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                                            নেটওয়ার্কিং ও বন্ধুত্বের সুযোগ
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                                সদস্য হতে চাই
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === 'activities' && (
                <section className="relative py-20 bg-white overflow-hidden">
                    {/* Light Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                        <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                             radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>

                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    আমাদের কার্যক্রম
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {club.name} এর নিয়মিত ও বিশেষ কার্যক্রম সমূহ
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {club.activities.map((activity, index) => (
                                <div key={index} className="bg-white border border-gray-100 p-6 transition-all duration-300 hover:border-emerald-200">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{activity}</h3>
                                            <p className="text-gray-600 text-sm">
                                                এই কার্যক্রমে শিক্ষার্থীরা সক্রিয়ভাবে অংশগ্রহণ করে দক্ষতা বিকাশের সুযোগ পায়।
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {activeTab === 'notices' && (
                <section className="relative py-20 bg-white overflow-hidden">
                    {/* Light Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                        <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                             radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    নোটিশ বোর্ড
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                সাম্প্রতিক ঘোষণা ও গুরুত্বপূর্ণ তথ্য
                            </p>
                        </div>

                        <div className="space-y-6">
                            {club.notices.map((notice) => (
                                <div key={notice.id} className={`bg-white border p-6 transition-all duration-300 hover:border-emerald-200 ${
                                    notice.isImportant ? 'border-red-200 bg-red-50' : 'border-gray-100'
                                }`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            {notice.isImportant && (
                                                <div className="w-3 h-3 bg-red-500 animate-pulse"></div>
                                            )}
                                            <h3 className="text-xl font-bold text-gray-900">{notice.title}</h3>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1">
                                            {new Date(notice.date).toLocaleDateString('bn-BD')}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {notice.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {activeTab === 'gallery' && (
                <section className="relative py-20 bg-white overflow-hidden">
                    {/* Light Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                        <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                             radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>

                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    ফটো ও ভিডিও গ্যালারি
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                আমাদের কার্যক্রম ও অর্জনের স্মৃতি
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {club.gallery.map((item) => (
                                <div key={item.id} className="bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:border-emerald-200">
                                    <div className="aspect-video bg-gray-200 relative">
                                        <img 
                                            src={item.url} 
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {item.type === 'video' && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-emerald-500 flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                        {item.description && (
                                            <p className="text-gray-600 text-sm">{item.description}</p>
                                        )}
                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-xs text-gray-500">
                                                {new Date(item.createdAt).toLocaleDateString('bn-BD')}
                                            </span>
                                            <span className={`text-xs px-2 py-1 ${
                                                item.type === 'video' 
                                                    ? 'bg-red-100 text-red-600' 
                                                    : 'bg-blue-100 text-blue-600'
                                            }`}>
                                                {item.type === 'video' ? 'ভিডিও' : 'ছবি'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section - Dark */}
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
                            আমাদের সাথে যোগ দিন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        {club.name} এ যোগ দিয়ে আপনার দক্ষতা বিকাশ করুন এবং নতুন অভিজ্ঞতা অর্জন করুন
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            সদস্যপদের জন্য আবেদন
                        </Link>
                        <Link href="/clubs" className="inline-block px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-medium transition-all duration-300 hover:bg-emerald-400/10">
                            অন্যান্য ক্লাব দেখুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClubDetailPage;