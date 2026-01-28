import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'শিক্ষকবৃন্দ - গ্র্যাভিটন একাডেমি',
    description: 'Meet our experienced and qualified teachers at Graviton Academy',
};

const TeachersPage = () => {
    const teachers = [
        {
            id: 1,
            name: 'ড. আহমেদ হাসান',
            nameEn: 'Dr. Ahmed Hasan',
            subject: 'গণিত',
            subjectEn: 'Mathematics',
            experience: '১৫+ বছর',
            qualification: 'পিএইচডি, ঢাকা বিশ্ববিদ্যালয়',
            specialization: 'উচ্চতর গণিত, ক্যালকুলাস',
            achievements: ['জাতীয় গণিত অলিম্পিয়াড কোচ', 'আন্তর্জাতিক পুরস্কার প্রাপ্ত']
        },
        {
            id: 2,
            name: 'প্রফেসর সারা খান',
            nameEn: 'Professor Sara Khan',
            subject: 'পদার্থবিজ্ঞান',
            subjectEn: 'Physics',
            experience: '১২+ বছর',
            qualification: 'এমএসসি, বুয়েট',
            specialization: 'কোয়ান্টাম ফিজিক্স, মেকানিক্স',
            achievements: ['সেরা শিক্ষক পুরস্কার ২০২২', 'গবেষণা প্রকাশনা ৫০+']
        },
        {
            id: 3,
            name: 'মোহাম্মদ রহিম',
            nameEn: 'Mohammad Rahim',
            subject: 'রসায়ন',
            subjectEn: 'Chemistry',
            experience: '১০+ বছর',
            qualification: 'এমএসসি, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
            specialization: 'জৈব রসায়ন, বিশ্লেষণী রসায়ন',
            achievements: ['বিজ্ঞান মেলা বিচারক', 'শিক্ষার্থী সফলতার হার ৯৮%']
        },
        {
            id: 4,
            name: 'ফাতিমা আক্তার',
            nameEn: 'Fatima Akter',
            subject: 'ইংরেজি',
            subjectEn: 'English',
            experience: '৮+ বছর',
            qualification: 'এমএ, ঢাকা বিশ্ববিদ্যালয়',
            specialization: 'IELTS, SAT প্রস্তুতি',
            achievements: ['IELTS ৮.৫ স্কোর', 'আন্তর্জাতিক সার্টিফিকেশন']
        },
        {
            id: 5,
            name: 'ড. নাসির উদ্দিন',
            nameEn: 'Dr. Nasir Uddin',
            subject: 'জীববিজ্ঞান',
            subjectEn: 'Biology',
            experience: '১৪+ বছর',
            qualification: 'পিএইচডি, চট্টগ্রাম বিশ্ববিদ্যালয়',
            specialization: 'মলিকুলার বায়োলজি, জেনেটিক্স',
            achievements: ['মেডিকেল ভর্তি বিশেষজ্ঞ', 'গবেষণা পত্র ৩০+']
        },
        {
            id: 6,
            name: 'রাশিদা বেগম',
            nameEn: 'Rashida Begum',
            subject: 'বাংলা',
            subjectEn: 'Bengali',
            experience: '১১+ বছর',
            qualification: 'এমএ, রাজশাহী বিশ্ববিদ্যালয়',
            specialization: 'সাহিত্য, ব্যাকরণ',
            achievements: ['সাহিত্য পুরস্কার প্রাপ্ত', 'লেখক ও কবি']
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                আমাদের শিক্ষকবৃন্দ
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            অভিজ্ঞ ও দক্ষ শিক্ষকমণ্ডলী যারা আপনার সফলতার জন্য নিবেদিত
                        </p>
                    </div>
                </div>
            </section>

            {/* Teachers Grid - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teachers.map((teacher) => (
                            <div key={teacher.id} className="bg-white border border-gray-100 p-8 text-center hover:border-emerald-200 transition-all duration-300">
                                {/* Teacher Avatar */}
                                <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 border border-emerald-200 mx-auto mb-6 flex items-center justify-center">
                                    <div className="text-4xl">👨‍🏫</div>
                                </div>

                                {/* Teacher Info */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{teacher.nameEn}</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 p-3">
                                        <p className="text-emerald-700 font-semibold">{teacher.subject}</p>
                                        <p className="text-emerald-600 text-sm">{teacher.subjectEn}</p>
                                    </div>

                                    <div className="text-left space-y-2">
                                        <div className="flex items-center text-sm">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-600">অভিজ্ঞতা: {teacher.experience}</span>
                                        </div>
                                        
                                        <div className="flex items-start text-sm">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            <span className="text-gray-600">{teacher.qualification}</span>
                                        </div>

                                        <div className="flex items-start text-sm">
                                            <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="text-gray-600">{teacher.specialization}</span>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <div className="text-left">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">বিশেষ অর্জন:</h4>
                                        <ul className="space-y-1">
                                            {teacher.achievements.map((achievement, index) => (
                                                <li key={index} className="flex items-start text-xs text-gray-600">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Dark */}
            <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-green-500/10 filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                                শিক্ষকদের পরিসংখ্যান
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            আমাদের শিক্ষকমণ্ডলীর অভিজ্ঞতা ও যোগ্যতার পরিসংখ্যান
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: '১৫+', label: 'অভিজ্ঞ শিক্ষক', description: 'বিভিন্ন বিষয়ে বিশেষজ্ঞ' },
                            { number: '৯৮%', label: 'সফলতার হার', description: 'শিক্ষার্থীদের পরীক্ষায় উত্তীর্ণ' },
                            { number: '১০+', label: 'গড় অভিজ্ঞতা', description: 'বছরের শিক্ষাদান অভিজ্ঞতা' },
                            { number: '৫০০+', label: 'সফল শিক্ষার্থী', description: 'প্রতি বছর পাস করা শিক্ষার্থী' }
                        ].map((stat, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 text-center">
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{stat.label}</h3>
                                    <p className="text-gray-300 text-sm">{stat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - White */}
            <section className="relative py-20 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                         radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            আমাদের শিক্ষকদের সাথে যুক্ত হন
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        অভিজ্ঞ শিক্ষকদের তত্ত্বাবধানে আপনার শিক্ষার যাত্রা শুরু করুন
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                            কোর্সে ভর্তি হন
                        </button>
                        <button className="border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold transition-all duration-300">
                            শিক্ষকদের সাথে কথা বলুন
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeachersPage;