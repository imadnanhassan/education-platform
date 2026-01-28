import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'শিক্ষকবৃন্দ - গ্র্যাভিটন একাডেমি',
    description: 'Meet our experienced and qualified teachers at Graviton Academy',
};

const TeachersPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        আমাদের শিক্ষকবৃন্দ
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        অভিজ্ঞ ও দক্ষ শিক্ষকমণ্ডলী যারা আপনার সফলতার জন্য নিবেদিত
                    </p>
                </div>

                {/* Teachers Grid - Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((teacher) => (
                        <div key={teacher} className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                শিক্ষক {teacher}
                            </h3>
                            <p className="text-gray-600 mb-2">বিষয়: গণিত</p>
                            <p className="text-gray-500 text-sm">
                                ১০+ বছরের অভিজ্ঞতা
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeachersPage;