import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Extra Curricular Activities - গ্র্যাভিটন একাডেমি',
    description: 'Extra curricular activities and skill development programs',
};

const ExtraCurricularPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Extra Curricular Activities
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        একাডেমিক পড়াশোনার পাশাপাশি ব্যক্তিত্ব ও দক্ষতা উন্নয়নের প্রোগ্রাম
                    </p>
                </div>

                {/* Activity Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            title: 'Leadership Development',
                            icon: '👑',
                            description: 'নেতৃত্ব দক্ষতা ও টিম ম্যানেজমেন্ট',
                            activities: ['Student Council', 'Project Leadership', 'Event Management']
                        },
                        {
                            title: 'Research Projects',
                            icon: '🔬',
                            description: 'বৈজ্ঞানিক গবেষণা ও উদ্ভাবনী প্রকল্প',
                            activities: ['Science Fair', 'Research Paper', 'Innovation Contest']
                        },
                        {
                            title: 'Community Service',
                            icon: '🤝',
                            description: 'সমাজসেবা ও স্বেচ্ছাসেবী কার্যক্রম',
                            activities: ['Social Work', 'Environmental Projects', 'Charity Programs']
                        },
                        {
                            title: 'Arts & Culture',
                            icon: '🎨',
                            description: 'সাংস্কৃতিক কার্যক্রম ও শিল্পচর্চা',
                            activities: ['Drama Club', 'Music Band', 'Art Exhibition']
                        },
                        {
                            title: 'Sports & Fitness',
                            icon: '⚽',
                            description: 'খেলাধুলা ও শারীরিক সুস্থতা',
                            activities: ['Football Team', 'Cricket Club', 'Athletics']
                        },
                        {
                            title: 'Technology Club',
                            icon: '💻',
                            description: 'প্রযুক্তি ও প্রোগ্রামিং ক্লাব',
                            activities: ['Coding Contest', 'Robotics', 'App Development']
                        }
                    ].map((category, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4 text-center">{category.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{category.title}</h3>
                            <p className="text-gray-600 mb-4 text-center">{category.description}</p>
                            <ul className="space-y-2">
                                {category.activities.map((activity, idx) => (
                                    <li key={idx} className="flex items-center text-gray-600">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                        {activity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Benefits for University Applications */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">বিশ্ববিদ্যালয় ভর্তিতে সুবিধা</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">৮০%</div>
                            <div className="text-orange-100">Admission Rate বৃদ্ধি</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">৫০%</div>
                            <div className="text-orange-100">Scholarship সুযোগ</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">১০০+</div>
                            <div className="text-orange-100">Portfolio Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2">২৫+</div>
                            <div className="text-orange-100">Award Winners</div>
                        </div>
                    </div>
                </div>

                {/* Program Structure */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">প্রোগ্রাম কাঠামো</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">১</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Interest Assessment</h3>
                                    <p className="text-gray-600 text-sm">আগ্রহ ও দক্ষতা যাচাই</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">২</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Activity Selection</h3>
                                    <p className="text-gray-600 text-sm">উপযুক্ত কার্যক্রম নির্বাচন</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">৩</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Skill Development</h3>
                                    <p className="text-gray-600 text-sm">দক্ষতা উন্নয়ন ও প্রশিক্ষণ</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">৪</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Portfolio Building</h3>
                                    <p className="text-gray-600 text-sm">পোর্টফোলিও তৈরি ও উপস্থাপনা</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">সাপ্তাহিক সময়সূচী</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>Leadership Workshop</span>
                                <span className="text-orange-600 font-semibold">সোমবার</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>Research Project</span>
                                <span className="text-orange-600 font-semibold">বুধবার</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>Community Service</span>
                                <span className="text-orange-600 font-semibold">শুক্রবার</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>Sports & Arts</span>
                                <span className="text-orange-600 font-semibold">শনিবার</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                            <h3 className="font-semibold text-gray-900 mb-2">বিশেষ ইভেন্ট</h3>
                            <ul className="text-gray-600 text-sm space-y-1">
                                <li>• মাসিক প্রতিযোগিতা</li>
                                <li>• বার্ষিক প্রদর্শনী</li>
                                <li>• আন্তর্জাতিক এক্সচেঞ্জ প্রোগ্রাম</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Success Stories */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        সফলতার গল্প
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: 'আরিফ হাসান',
                                achievement: 'Harvard University',
                                activity: 'Research Project Leader'
                            },
                            {
                                name: 'ফাতিমা খান',
                                achievement: 'Stanford University',
                                activity: 'Community Service Champion'
                            },
                            {
                                name: 'রাকিব আহমেদ',
                                achievement: 'MIT',
                                activity: 'Robotics Team Captain'
                            }
                        ].map((student, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                                <h3 className="font-semibold text-gray-900 mb-2">{student.name}</h3>
                                <p className="text-orange-600 font-semibold mb-1">{student.achievement}</p>
                                <p className="text-gray-600 text-sm">{student.activity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enrollment CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        আপনার প্রতিভা বিকশিত করুন
                    </h2>
                    <p className="text-gray-600 mb-6">
                        বিশ্ববিদ্যালয় ভর্তিতে এগিয়ে থাকুন Extra Curricular Activities এর মাধ্যমে
                    </p>
                    <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                        যোগদান করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtraCurricularPage;