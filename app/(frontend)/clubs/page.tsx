'use client';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';

const ClubsPage = () => {
    const { clubs } = useSelector((state: IRootState) => state.clubs);

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
                    <div className="text-center">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আমাদের ক্লাব সমূহ
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                            সহশিক্ষা কার্যক্রমের মাধ্যমে শিক্ষার্থীদের সর্বাঙ্গীণ বিকাশে আমাদের বিভিন্ন ক্লাব ও সংগঠন
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">{clubs.length}</div>
                                <div className="text-gray-300">সক্রিয় ক্লাব</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-green-400 mb-2">৫০০+</div>
                                <div className="text-gray-300">সদস্য</div>
                            </div>
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">১০০+</div>
                                <div className="text-gray-300">কার্যক্রম</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clubs Grid Section - White */}
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
                                সকল ক্লাব
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            আপনার আগ্রহ অনুযায়ী ক্লাব বেছে নিন এবং নতুন দক্ষতা অর্জন করুন
                        </p>
                    </div>

                    {/* Clubs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {clubs.map((club) => (
                            <Link key={club.id} href={`/clubs/${club.id}`} className="group">
                                <div className="bg-white border border-gray-100 p-8 transition-all duration-300 hover:border-emerald-200">
                                    {/* Club Header */}
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                                            {getClubIcon(club.id)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                                                {club.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">{club.nameEn}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {club.description.length > 120 
                                            ? `${club.description.substring(0, 120)}...` 
                                            : club.description
                                        }
                                    </p>

                                    {/* Activities */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3 text-sm">প্রধান কার্যক্রম:</h4>
                                        <div className="space-y-2">
                                            {club.activities.slice(0, 3).map((activity, index) => (
                                                <div key={index} className="flex items-center text-sm text-gray-600">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 mr-3 flex-shrink-0"></div>
                                                    {activity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Notice */}
                                    {club.notices.length > 0 && (
                                        <div className="mb-6">
                                            <div className="bg-emerald-50 border border-emerald-200 p-3">
                                                <div className="flex items-start space-x-2">
                                                    <div className="w-2 h-2 bg-emerald-500 mt-2 flex-shrink-0"></div>
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-emerald-900 text-sm mb-1">
                                                            সাম্প্রতিক নোটিশ
                                                        </h5>
                                                        <p className="text-emerald-700 text-xs leading-relaxed">
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {club.gallery.length} ছবি
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="text-center">
                                        <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 group-hover:from-emerald-600 group-hover:to-green-700">
                                            বিস্তারিত দেখুন
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section - Dark */}
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
                                ক্লাব সদস্যপদের সুবিধা
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            আমাদের ক্লাবে যোগ দিয়ে পান বিশেষ সুবিধা এবং দক্ষতা বিকাশের সুযোগ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                        {/* Benefit 1 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">দক্ষতা বিকাশ</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    বিভিন্ন কার্যক্রমের মাধ্যমে ব্যক্তিত্ব ও দক্ষতা বিকাশের সুযোগ
                                </p>
                            </div>
                        </div>

                        {/* Benefit 2 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">নেটওয়ার্কিং</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    সমমনা বন্ধুদের সাথে সম্পর্ক গড়ে তোলার সুযোগ
                                </p>
                            </div>
                        </div>

                        {/* Benefit 3 */}
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">সার্টিফিকেট</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    অংশগ্রহণ ও অর্জনের জন্য সার্টিফিকেট প্রদান
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
                            আজই যোগ দিন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        আপনার আগ্রহ অনুযায়ী ক্লাব বেছে নিন এবং নতুন অভিজ্ঞতা অর্জন করুন
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium transition-all duration-300 hover:from-emerald-600 hover:to-green-700">
                            সদস্যপদের জন্য আবেদন
                        </Link>
                        <Link href="/about" className="inline-block px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-medium transition-all duration-300 hover:bg-emerald-50">
                            আরও তথ্য জানুন
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClubsPage;