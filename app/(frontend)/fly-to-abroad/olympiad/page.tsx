import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'অলিম্পিয়াড প্রস্তুতি - গ্র্যাভিটন একাডেমি',
    description: 'Complete preparation for Math, Physics, Chemistry and Biology Olympiad',
};

const OlympiadPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        অলিম্পিয়াড প্রস্তুতি
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আন্তর্জাতিক অলিম্পিয়াডে অংশগ্রহণের জন্য বিশেষ প্রস্তুতি
                    </p>
                </div>

                {/* Olympiad Subjects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { subject: 'গণিত অলিম্পিয়াড', icon: '📐', color: 'blue' },
                        { subject: 'পদার্থবিজ্ঞান অলিম্পিয়াড', icon: '⚛️', color: 'green' },
                        { subject: 'রসায়ন অলিম্পিয়াড', icon: '🧪', color: 'purple' },
                        { subject: 'জীববিজ্ঞান অলিম্পিয়াড', icon: '🧬', color: 'orange' }
                    ].map((item, index) => (
                        <div key={index} className={`bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-${item.color}-500`}>
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.subject}</h3>
                            <p className="text-gray-600 text-sm">বিশেষ প্রস্তুতি কোর্স</p>
                        </div>
                    ))}
                </div>

                {/* Course Features */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        কোর্সের বৈশিষ্ট্য
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'আন্তর্জাতিক মানের প্রশ্ন',
                                description: 'বিগত বছরের IMO, IPhO, IChO, IBO প্রশ্ন সমাধান',
                                icon: '🌍'
                            },
                            {
                                title: 'অভিজ্ঞ শিক্ষকমণ্ডলী',
                                description: 'অলিম্পিয়াড মেডেলিস্ট ও বিশেষজ্ঞ শিক্ষকদের গাইডেন্স',
                                icon: '👨‍🏫'
                            },
                            {
                                title: 'নিয়মিত মক টেস্ট',
                                description: 'সাপ্তাহিক মক টেস্ট ও পারফরমেন্স ট্র্যাকিং',
                                icon: '📊'
                            },
                            {
                                title: 'সমস্যা সমাধান কৌশল',
                                description: 'জটিল সমস্যা সমাধানের বিশেষ কৌশল শেখানো',
                                icon: '🧩'
                            },
                            {
                                title: 'ব্যক্তিগত মেন্টরিং',
                                description: 'প্রতিটি শিক্ষার্থীর জন্য আলাদা গাইডেন্স',
                                icon: '🎯'
                            },
                            {
                                title: 'প্রতিযোগিতার প্রস্তুতি',
                                description: 'জাতীয় ও আন্তর্জাতিক প্রতিযোগিতার জন্য বিশেষ প্রস্তুতি',
                                icon: '🏆'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center p-4">
                                <div className="text-3xl mb-3">{feature.icon}</div>
                                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Statistics */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">আমাদের সফলতা</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">৫০+</div>
                            <div className="text-blue-100">জাতীয় পর্যায়ে নির্বাচিত</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">১৫+</div>
                            <div className="text-blue-100">আন্তর্জাতিক মেডেল</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">২০০+</div>
                            <div className="text-blue-100">সফল শিক্ষার্থী</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">৯৫%</div>
                            <div className="text-blue-100">সফলতার হার</div>
                        </div>
                    </div>
                </div>

                {/* Training Schedule */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        প্রশিক্ষণ সময়সূচী
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">সাপ্তাহিক ক্লাস</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>গণিত অলিম্পিয়াড</span>
                                    <span className="text-blue-600 font-semibold">শনি ও মঙ্গল</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>পদার্থবিজ্ঞান অলিম্পিয়াড</span>
                                    <span className="text-green-600 font-semibold">রবি ও বুধ</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>রসায়ন অলিম্পিয়াড</span>
                                    <span className="text-purple-600 font-semibold">সোম ও বৃহস্পতি</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>জীববিজ্ঞান অলিম্পিয়াড</span>
                                    <span className="text-orange-600 font-semibold">শুক্র ও শনি</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">বিশেষ কার্যক্রম</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                                    <div className="font-semibold text-gray-900">সাপ্তাহিক মক টেস্ট</div>
                                    <div className="text-gray-600 text-sm">প্রতি শুক্রবার</div>
                                </div>
                                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                                    <div className="font-semibold text-gray-900">মাসিক ওয়ার্কশপ</div>
                                    <div className="text-gray-600 text-sm">বিশেষ টপিকের উপর</div>
                                </div>
                                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                                    <div className="font-semibold text-gray-900">ব্যক্তিগত মেন্টরিং</div>
                                    <div className="text-gray-600 text-sm">সপ্তাহে ১ ঘন্টা</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enrollment CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        অলিম্পিয়াড যাত্রা শুরু করুন
                    </h2>
                    <p className="text-gray-600 mb-6">
                        আন্তর্জাতিক পর্যায়ে প্রতিযোগিতার জন্য প্রস্তুত হন
                    </p>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        ভর্তি হন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OlympiadPage;