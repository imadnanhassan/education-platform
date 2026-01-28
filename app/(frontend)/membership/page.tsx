import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'সদস্যপদ - গ্র্যাভিটন একাডেমি',
    description: 'Membership plans and shareholder information for Graviton Academy',
};

const MembershipPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        সদস্যপদ প্রোগ্রাম
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        গ্র্যাভিটন একাডেমির সাথে যুক্ত হয়ে বিশেষ সুবিধা পান
                    </p>
                </div>

                {/* Membership Plans */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Silver Member */}
                    <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-gray-400">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-700 mb-2">
                                সিলভার মেম্বার
                            </h2>
                            <p className="text-gray-600">বিশেষ ছাড় ও সুবিধা</p>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>সকল কোর্সে ১৫% ছাড়</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>বিনামূল্যে স্টাডি ম্যাটেরিয়াল</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>প্রাইভেট গ্রুপ অ্যাক্সেস</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>মাসিক ওয়েবিনার</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-4">
                                ৫,০০০ টাকা
                                <span className="text-lg font-normal text-gray-600">/বছর</span>
                            </div>
                            <button className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                                সিলভার মেম্বার হন
                            </button>
                        </div>
                    </div>

                    {/* Shareholder */}
                    <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-yellow-400 relative">
                        <div className="absolute top-0 right-6 transform -translate-y-1/2">
                            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                                প্রিমিয়াম
                            </span>
                        </div>
                        
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-yellow-600 mb-2">
                                শেয়ারহোল্ডার
                            </h2>
                            <p className="text-gray-600">সর্বোচ্চ সুবিধা ও লাভভাগ</p>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>সকল কোর্সে ৫০% ছাড়</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>বার্ষিক লাভভাগ</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>একচেটিয়া ইভেন্ট অ্যাক্সেস</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>ব্যবসায়িক সিদ্ধান্তে অংশগ্রহণ</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>ব্যক্তিগত মেন্টরিং</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-4">
                                ৫০,০০০ টাকা
                                <span className="text-lg font-normal text-gray-600">/একবার</span>
                            </div>
                            <button className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                                শেয়ারহোল্ডার হন
                            </button>
                        </div>
                    </div>
                </div>

                {/* Benefits Comparison */}
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        সুবিধা তুলনা
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4">সুবিধা</th>
                                    <th className="text-center py-3 px-4">সাধারণ</th>
                                    <th className="text-center py-3 px-4">সিলভার</th>
                                    <th className="text-center py-3 px-4">শেয়ারহোল্ডার</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 px-4">কোর্স ছাড়</td>
                                    <td className="text-center py-3 px-4">০%</td>
                                    <td className="text-center py-3 px-4">১৫%</td>
                                    <td className="text-center py-3 px-4">৫০%</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4">স্টাডি ম্যাটেরিয়াল</td>
                                    <td className="text-center py-3 px-4">❌</td>
                                    <td className="text-center py-3 px-4">✅</td>
                                    <td className="text-center py-3 px-4">✅</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4">লাভভাগ</td>
                                    <td className="text-center py-3 px-4">❌</td>
                                    <td className="text-center py-3 px-4">❌</td>
                                    <td className="text-center py-3 px-4">✅</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;