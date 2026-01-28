import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'বৃত্তি প্রোগ্রাম - গ্র্যাভিটন একাডেমি',
    description: 'Scholarship and talent hunt programs at Graviton Academy',
};

const ScholarshipPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        বৃত্তি প্রোগ্রাম
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        মেধাবী শিক্ষার্থীদের জন্য বিশেষ বৃত্তি ও সুবিধা
                    </p>
                </div>

                {/* Scholarship Programs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            মেধা বৃত্তি
                        </h2>
                        <p className="text-gray-600 mb-6">
                            পরীক্ষার ফলাফলের ভিত্তিতে ৫০% পর্যন্ত ছাড়
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• SSC/HSC তে A+ পেলে ৫০% ছাড়</li>
                            <li>• A গ্রেড পেলে ৩০% ছাড়</li>
                            <li>• B গ্রেড পেলে ২০% ছাড়</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            প্রতিভা অনুসন্ধান
                        </h2>
                        <p className="text-gray-600 mb-6">
                            বিশেষ প্রতিভা যাচাই পরীক্ষার মাধ্যমে বৃত্তি
                        </p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• মাসিক প্রতিভা যাচাই পরীক্ষা</li>
                            <li>• বিনামূল্যে কোর্সের সুযোগ</li>
                            <li>• বিশেষ মেন্টরিং সুবিধা</li>
                        </ul>
                    </div>
                </div>

                {/* Application Process */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        আবেদন প্রক্রিয়া
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">১</span>
                            </div>
                            <h3 className="font-semibold mb-2">আবেদন জমা দিন</h3>
                            <p className="text-gray-600 text-sm">অনলাইনে আবেদন ফর্ম পূরণ করুন</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">২</span>
                            </div>
                            <h3 className="font-semibold mb-2">পরীক্ষায় অংশগ্রহণ</h3>
                            <p className="text-gray-600 text-sm">মেধা যাচাই পরীক্ষায় অংশ নিন</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-green-600">৩</span>
                            </div>
                            <h3 className="font-semibold mb-2">ফলাফল পান</h3>
                            <p className="text-gray-600 text-sm">বৃত্তির ফলাফল জানুন</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipPage;