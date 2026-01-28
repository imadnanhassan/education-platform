import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ম্যাগাজিন - গ্র্যাভিটন একাডেমি',
    description: 'Educational articles and magazine content from Graviton Academy',
};

const MagazinePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        গ্র্যাভিটন ম্যাগাজিন
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        শিক্ষামূলক প্রবন্ধ, টিপস এবং গাইডলাইন
                    </p>
                </div>

                {/* Featured Article */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <div className="h-64 bg-gray-200"></div>
                        </div>
                        <div className="md:w-2/3 p-8">
                            <div className="text-sm text-green-600 font-semibold mb-2">ফিচার্ড আর্টিকেল</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                কীভাবে পড়াশোনায় মনোযোগ বাড়াবেন
                            </h2>
                            <p className="text-gray-600 mb-4">
                                পড়াশোনায় মনোযোগ বৃদ্ধির জন্য কার্যকর কৌশল এবং পদ্ধতি সম্পর্কে বিস্তারিত আলোচনা...
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span>প্রকাশিত: ১৫ জানুয়ারি, ২০২৪</span>
                                <span className="mx-2">•</span>
                                <span>৫ মিনিট পড়ার সময়</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((article) => (
                        <div key={article} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-6">
                                <div className="text-sm text-green-600 font-semibold mb-2">শিক্ষা</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    আর্টিকেল শিরোনাম {article}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    এটি একটি নমুনা আর্টিকেলের সংক্ষিপ্ত বিবরণ যা পাঠকদের আকৃষ্ট করবে...
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <span>১০ জানুয়ারি, ২০২৪</span>
                                    <span>৩ মিনিট</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        বিষয়ভিত্তিক আর্টিকেল
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'ইংরেজি', 'বাংলা', 'ক্যারিয়ার গাইড', 'পরীক্ষার টিপস'].map((category) => (
                            <div key={category} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
                                <h3 className="font-semibold text-gray-900">{category}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MagazinePage;