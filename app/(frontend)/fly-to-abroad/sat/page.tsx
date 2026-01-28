import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SAT প্রস্তুতি - গ্র্যাভিটন একাডেমি',
    description: 'Complete SAT preparation for US university admission',
};

const SATPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        SAT প্রস্তুতি কোর্স
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        আমেরিকার টপ বিশ্ববিদ্যালয়ে ভর্তির জন্য SAT এ উচ্চ স্কোর অর্জন করুন
                    </p>
                </div>

                {/* SAT Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Math Section</h2>
                        <p className="text-gray-600 mb-4">
                            Algebra, Geometry, Trigonometry এবং Data Analysis এর সম্পূর্ণ প্রস্তুতি
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Calculator ও No-Calculator অংশ</li>
                            <li>• Problem Solving কৌশল</li>
                            <li>• Time Management</li>
                            <li>• Practice Tests</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">English Section</h2>
                        <p className="text-gray-600 mb-4">
                            Reading Comprehension এবং Writing & Language এর বিশেষ প্রস্তুতি
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Reading Strategies</li>
                            <li>• Grammar & Usage</li>
                            <li>• Essay Writing (Optional)</li>
                            <li>• Vocabulary Building</li>
                        </ul>
                    </div>
                </div>

                {/* Score Improvement */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">স্কোর উন্নতির গ্যারান্টি</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">200+</div>
                            <div className="text-green-100">গড় স্কোর বৃদ্ধি</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">1500+</div>
                            <div className="text-green-100">টার্গেট স্কোর</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">৯০%</div>
                            <div className="text-green-100">সফলতার হার</div>
                        </div>
                    </div>
                </div>

                {/* Course Features */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        কোর্সের বৈশিষ্ট্য
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            'Diagnostic Test দিয়ে শুরু',
                            'Personalized Study Plan',
                            'Weekly Practice Tests',
                            'Score Analysis & Feedback',
                            'College Application Guide',
                            'Scholarship Information'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium text-gray-900">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SATPage;