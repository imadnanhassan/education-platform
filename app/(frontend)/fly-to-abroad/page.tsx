import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'বিদেশে পড়াশোনা - গ্র্যাভিটন একাডেমি',
    description: 'Complete preparation for studying abroad - SAT, IELTS, Olympiad and more',
};

const FlyToAbroadPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        বিদেশে পড়াশোনার প্রস্তুতি
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আন্তর্জাতিক মানের শিক্ষার জন্য সম্পূর্ণ প্রস্তুতি নিন আমাদের সাথে
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Olympiad */}
                    <Link href="/fly-to-abroad/olympiad">
                        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">অলিম্পিয়াড</h2>
                            <p className="text-gray-600 mb-4">
                                গণিত, পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞান অলিম্পিয়াডের জন্য বিশেষ প্রস্তুতি
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>• আন্তর্জাতিক মানের প্রশ্ন সমাধান</li>
                                <li>• অভিজ্ঞ শিক্ষকদের গাইডেন্স</li>
                                <li>• নিয়মিত মক টেস্ট</li>
                            </ul>
                        </div>
                    </Link>

                    {/* SAT */}
                    <Link href="/fly-to-abroad/sat">
                        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">SAT প্রস্তুতি</h2>
                            <p className="text-gray-600 mb-4">
                                আমেরিকার বিশ্ববিদ্যালয়ে ভর্তির জন্য SAT পরীক্ষার সম্পূর্ণ প্রস্তুতি
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Math ও English সেকশনের প্রস্তুতি</li>
                                <li>• প্র্যাকটিস টেস্ট ও স্কোর উন্নতি</li>
                                <li>• ভর্তি প্রক্রিয়ার গাইডেন্স</li>
                            </ul>
                        </div>
                    </Link>

                    {/* IELTS */}
                    <Link href="/fly-to-abroad/ielts">
                        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">IELTS প্রস্তুতি</h2>
                            <p className="text-gray-600 mb-4">
                                ইংরেজি ভাষার দক্ষতা প্রমাণের জন্য IELTS পরীক্ষার প্রস্তুতি
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Speaking, Writing, Reading, Listening</li>
                                <li>• ব্যান্ড স্কোর উন্নতির কৌশল</li>
                                <li>• মক টেস্ট ও ফিডব্যাক</li>
                            </ul>
                        </div>
                    </Link>

                    {/* Extra Curricular */}
                    <Link href="/fly-to-abroad/extra-curricular">
                        <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Extra Curricular</h2>
                            <p className="text-gray-600 mb-4">
                                সহশিক্ষা কার্যক্রম ও দক্ষতা উন্নয়নের মাধ্যমে প্রোফাইল শক্তিশালী করুন
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                <li>• লিডারশিপ ডেভেলপমেন্ট</li>
                                <li>• রিসার্চ প্রজেক্ট গাইডেন্স</li>
                                <li>• কমিউনিটি সার্ভিস প্রোগ্রাম</li>
                            </ul>
                        </div>
                    </Link>
                </div>

                {/* Success Stories */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        সফলতার গল্প
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'রাহুল আহমেদ', university: 'MIT, USA', score: 'SAT: 1580' },
                            { name: 'সারা খান', university: 'Oxford, UK', score: 'IELTS: 8.5' },
                            { name: 'তানভীর হাসান', university: 'Cambridge, UK', score: 'Physics Olympiad Gold' }
                        ].map((student, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                                <h3 className="font-semibold text-gray-900 mb-2">{student.name}</h3>
                                <p className="text-gray-600 text-sm mb-1">{student.university}</p>
                                <p className="text-green-600 text-sm font-semibold">{student.score}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        আজই শুরু করুন আপনার স্বপ্নের যাত্রা
                    </h2>
                    <p className="text-gray-600 mb-6">
                        বিশ্বমানের শিক্ষার জন্য প্রস্তুত হন আমাদের সাথে
                    </p>
                    <Link 
                        href="/contact"
                        className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        যোগাযোগ করুন
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FlyToAbroadPage;