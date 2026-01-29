import React from 'react';
import Link from 'next/link';

const MainFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Made Easy', href: '/made-easy' },
        { name: 'কোর্স সমূহ', href: '/courses' },
        { name: 'ক্লাব', href: '/clubs' },
        { name: 'বৃত্তি', href: '/scholarship' },
        { name: 'গ্যালারি', href: '/gallery' }
    ];

    const abroadLinks = [
        { name: 'অলিম্পিয়াড', href: '/fly-to-abroad/olympiad' },
        { name: 'SAT প্রস্তুতি', href: '/fly-to-abroad/sat' },
        { name: 'IELTS প্রস্তুতি', href: '/fly-to-abroad/ielts' },
        { name: 'Extra Curricular', href: '/fly-to-abroad/extra-curricular' }
    ];

    const companyLinks = [
        { name: 'আমাদের সম্পর্কে', href: '/about' },
        { name: 'শিক্ষকবৃন্দ', href: '/teachers' },
        { name: 'সদস্যপদ', href: '/membership' },
        { name: 'যোগাযোগ', href: '/contact' },
        { name: 'ম্যাগাজিন', href: '/magazine' }
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            href: '#',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        },
        {
            name: 'Twitter',
            href: '#',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            )
        },
        {
            name: 'Instagram',
            href: '#',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z"/>
                </svg>
            )
        },
        {
            name: 'YouTube',
            href: '#',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <img 
                                        src="/assets/images/logo.svg" 
                                        alt="গ্র্যাভিটন একাডেমি" 
                                        className="h-12 w-auto filter brightness-0 invert"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-white">
                                        গ্র্যাভিটন একাডেমি
                                    </h3>
                                    <p className="text-sm text-primary-300">
                                        Education & Abroad Preparation
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                শিক্ষার্থীদের একাডেমিক উৎকর্ষতা এবং বিদেশে উচ্চশিক্ষার জন্য সম্পূর্ণ প্রস্তুতির প্ল্যাটফর্ম। 
                                আমরা প্রতিটি শিক্ষার্থীর স্বপ্ন পূরণে প্রতিশ্রুতিবদ্ধ।
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm text-gray-300">
                                <svg className="h-5 w-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@gravitonacademy.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-300">
                                <svg className="h-5 w-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+880 1234-567890</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-300">
                                <svg className="h-5 w-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>ঢাকা, বাংলাদেশ</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-primary-300 uppercase tracking-wider">
                                আমাদের সাথে যুক্ত হন
                            </h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300 hover:scale-110"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-primary-300 border-b border-gray-700 pb-2">
                            দ্রুত লিংক
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-300 hover:text-primary-300 transition-colors text-sm flex items-center group"
                                    >
                                        <svg className="h-4 w-4 mr-2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Abroad Preparation */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-primary-300 border-b border-gray-700 pb-2">
                            বিদেশে পড়াশোনা
                        </h4>
                        <ul className="space-y-3">
                            {abroadLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-300 hover:text-primary-300 transition-colors text-sm flex items-center group"
                                    >
                                        <svg className="h-4 w-4 mr-2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-primary-300 border-b border-gray-700 pb-2">
                            প্রতিষ্ঠান
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className="text-gray-300 hover:text-primary-300 transition-colors text-sm flex items-center group"
                                    >
                                        <svg className="h-4 w-4 mr-2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Newsletter Signup */}
                        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <h5 className="text-sm font-semibold text-primary-300 mb-2">
                                নিউজলেটার সাবস্ক্রাইব করুন
                            </h5>
                            <p className="text-xs text-gray-400 mb-3">
                                সর্বশেষ আপডেট পেতে আমাদের নিউজলেটার সাবস্ক্রাইব করুন
                            </p>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    placeholder="আপনার ইমেইল"
                                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md transition-colors">
                                    সাবস্ক্রাইব
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                            <p className="text-gray-400 text-sm text-center sm:text-left">
                                © {currentYear} গ্র্যাভিটন একাডেমি। সকল অধিকার সংরক্ষিত।
                            </p>
                            <div className="flex space-x-4">
                                <Link href="/privacy" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">
                                    গোপনীয়তা নীতি
                                </Link>
                                <Link href="/terms" className="text-gray-400 hover:text-primary-300 text-sm transition-colors">
                                    শর্তাবলী
                                </Link>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>Made with</span>
                            <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>in Bangladesh</span>
        </div>
    </div>
</div>
</div>
</footer>
);
};

export default MainFooter;