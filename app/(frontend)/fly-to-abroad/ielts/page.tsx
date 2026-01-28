import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'IELTS প্রস্তুতি - গ্র্যাভিটন একাডেমি',
    description: 'Complete IELTS preparation for international education',
};

const IELTSPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        IELTS প্রস্তুতি কোর্স
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আন্তর্জাতিক শিক্ষার জন্য IELTS এ উচ্চ ব্যান্ড স্কোর অর্জন করুন
                    </p>
                </div>

                {/* IELTS Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { module: 'Listening', icon: '👂', description: 'বিভিন্ন accent ও context এর অডিও বোঝা' },
                        { module: 'Reading', icon: '📖', description: 'Academic ও General text comprehension' },
                        { module: 'Writing', icon: '✍️', description: 'Task 1 ও Task 2 এর কৌশল' },
                        { module: 'Speaking', icon: '🗣️', description: 'Fluency ও pronunciation উন্নতি' }
                    ].map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.module}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Band Score Goals */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        ব্যান্ড স্কোর লক্ষ্য
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                            <div className="text-3xl font-bold text-yellow-600 mb-2">6.5</div>
                            <div className="font-semibold text-gray-900 mb-2">Good User</div>
                            <p className="text-gray-600 text-sm">বেশিরভাগ বিশ্ববিদ্যালয়ের জন্য যথেষ্ট</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                            <div className="text-3xl font-bold text-green-600 mb-2">7.5</div>
                            <div className="font-semibold text-gray-900 mb-2">Very Good User</div>
                            <p className="text-gray-600 text-sm">টপ বিশ্ববিদ্যালয়ের জন্য আদর্শ</p>
                        </div>
                        <div className="text-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                            <div className="text-3xl font-bold text-blue-600 mb-2">8.5+</div>
                            <div className="font-semibold text-gray-900 mb-2">Expert User</div>
                            <p className="text-gray-600 text-sm">সর্বোচ্চ মানের প্রতিষ্ঠানের জন্য</p>
                        </div>
                    </div>
                </div>

                {/* Course Structure */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic IELTS</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                বিশ্ববিদ্যালয় ভর্তির জন্য
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                Academic Writing Task 1 (Graph/Chart)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                Complex Reading Passages
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                Formal Speaking Topics
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">General Training</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                ইমিগ্রেশন ও কাজের জন্য
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Letter Writing (Task 1)
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Everyday Reading Materials
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Practical Speaking Situations
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Success Rate */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">আমাদের সফলতার হার</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">৮৫%</div>
                            <div className="text-purple-100">7+ ব্যান্ড অর্জন</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">৬০%</div>
                            <div className="text-purple-100">7.5+ ব্যান্ড অর্জন</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">৩০০+</div>
                            <div className="text-purple-100">সফল শিক্ষার্থী</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">৯৫%</div>
                            <div className="text-purple-100">পাস রেট</div>
                        </div>
                    </div>
                </div>

                {/* Mock Test Schedule */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        মক টেস্ট সময়সূচী
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">সাপ্তাহিক মক টেস্ট</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>Full Mock Test</span>
                                    <span className="text-purple-600 font-semibold">শনিবার</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>Speaking Practice</span>
                                    <span className="text-purple-600 font-semibold">মঙ্গলবার</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span>Writing Workshop</span>
                                    <span className="text-purple-600 font-semibold">বৃহস্পতিবার</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">বিশেষ সেশন</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                                    <div className="font-semibold text-gray-900">One-on-One Speaking</div>
                                    <div className="text-gray-600 text-sm">সপ্তাহে ২ বার</div>
                                </div>
                                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                                    <div className="font-semibold text-gray-900">Writing Feedback</div>
                                    <div className="text-gray-600 text-sm">বিস্তারিত মূল্যায়ন</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IELTSPage;