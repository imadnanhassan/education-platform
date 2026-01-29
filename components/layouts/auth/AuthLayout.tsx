import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: React.ReactNode;
    showBackToHome?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
    children, 
    title, 
    subtitle,
    showBackToHome = true 
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>
                
                <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
                    <div className="max-w-md text-center">
                        <div className="mb-8">
                            <img 
                                src="/assets/images/logo.svg" 
                                alt="গ্র্যাভিটন একাডেমি" 
                                className="h-16 w-auto mx-auto filter brightness-0 invert"
                            />
                        </div>
                        <h1 className="text-4xl font-bold mb-6">
                            গ্র্যাভিটন একাডেমিতে স্বাগতম
                        </h1>
                        <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                            শিক্ষার্থীদের একাডেমিক উৎকর্ষতা এবং বিদেশে উচ্চশিক্ষার জন্য সম্পূর্ণ প্রস্তুতির প্ল্যাটফর্ম
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/10 backdrop-blur-sm p-4">
                                <div className="text-2xl font-bold">১০০০+</div>
                                <div className="text-primary-200">সফল শিক্ষার্থী</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4">
                                <div className="text-2xl font-bold">৫০+</div>
                                <div className="text-primary-200">কোর্স</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-sm sm:max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-4 sm:mb-6 lg:mb-8">
                        <Link href="/" className="inline-block">
                            <img 
                                src="/assets/images/logo.svg" 
                                alt="গ্র্যাভিটন একাডেমি" 
                                className="h-10 sm:h-12 w-auto mx-auto"
                            />
                        </Link>
                        <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-900">
                            গ্র্যাভিটন একাডেমি
                        </h2>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-gray-200 p-4 sm:p-6 lg:p-8">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-gray-600">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {children}
                    </div>

                    {/* Back to Home */}
                    {showBackToHome && (
                        <div className="mt-8 text-center">
                            <Link 
                                href="/" 
                                className="text-sm text-gray-600 hover:text-primary-600 transition-colors inline-flex items-center"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                হোমপেজে ফিরে যান
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;