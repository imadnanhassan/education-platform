'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/auth/AuthLayout';

const VerifyEmailPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
    const [email, setEmail] = useState<string>('');
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        const emailParam = searchParams.get('email');
        
        if (emailParam) {
            setEmail(emailParam);
        }

        if (!token) {
            setStatus('error');
            return;
        }

        // Simulate email verification
        const verifyEmail = async () => {
            try {
                console.log('Verifying email with token:', token);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Simulate different responses
                const random = Math.random();
                if (random > 0.8) {
                    setStatus('expired');
                } else if (random > 0.1) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Email verification error:', error);
                setStatus('error');
            }
        };

        verifyEmail();
    }, [searchParams]);

    const handleResendVerification = async () => {
        setIsResending(true);
        try {
            console.log('Resending verification email to:', email);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Show success message or redirect
        } catch (error) {
            console.error('Resend verification error:', error);
        } finally {
            setIsResending(false);
        }
    };

    if (status === 'loading') {
        return (
            <AuthLayout
                title="ইমেইল যাচাই করা হচ্ছে"
                subtitle="অনুগ্রহ করে অপেক্ষা করুন..."
                showBackToHome={false}
            >
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-primary-100 flex items-center justify-center">
                        <svg className="animate-spin w-8 h-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            আপনার ইমেইল যাচাই করা হচ্ছে...
                        </p>
                        <p className="text-sm text-gray-500">
                            এটি কয়েক সেকেন্ড সময় নিতে পারে।
                        </p>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    if (status === 'success') {
        return (
            <AuthLayout
                title="ইমেইল সফলভাবে যাচাই হয়েছে"
                subtitle="আপনার ইমেইল ঠিকানা সফলভাবে যাচাই করা হয়েছে। এখন আপনি লগইন করতে পারেন।"
            >
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            অভিনন্দন! আপনার ইমেইল ঠিকানা সফলভাবে যাচাই করা হয়েছে।
                        </p>
                        <p className="text-sm text-gray-500">
                            এখন আপনি আপনার অ্যাকাউন্টে লগইন করতে পারেন।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button 
                            onClick={() => router.push('/login')}
                            className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                        >
                            লগইন করুন
                        </Button>
                        
                        <Link 
                            href="/"
                            className="block w-full py-3 px-4 text-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            হোমপেজে যান
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    if (status === 'expired') {
        return (
            <AuthLayout
                title="যাচাইকরণ লিংকের মেয়াদ উত্তীর্ণ"
                subtitle="এই যাচাইকরণ লিংকের মেয়াদ উত্তীর্ণ হয়েছে। নতুন যাচাইকরণ লিংক পেতে নিচের বাটনে ক্লিক করুন।"
            >
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-yellow-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            এই যাচাইকরণ লিংকের মেয়াদ উত্তীর্ণ হয়েছে।
                        </p>
                        <p className="text-sm text-gray-500">
                            নতুন যাচাইকরণ ইমেইল পেতে নিচের বাটনে ক্লিক করুন।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button 
                            onClick={handleResendVerification}
                            disabled={isResending}
                            className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isResending ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    পাঠানো হচ্ছে...
                                </div>
                            ) : (
                                'নতুন যাচাইকরণ ইমেইল পাঠান'
                            )}
                        </Button>
                        
                        <Link 
                            href="/login"
                            className="block w-full py-3 px-4 text-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            লগইনে ফিরে যান
                        </Link>
                    </div>

                    {email && (
                        <div className="text-sm text-gray-500">
                            <p>যাচাইকরণ ইমেইল পাঠানো হবে: <strong>{email}</strong></p>
                        </div>
                    )}
                </div>
            </AuthLayout>
        );
    }

    // Error state
    return (
        <AuthLayout
            title="যাচাইকরণে সমস্যা"
            subtitle="ইমেইল যাচাইকরণে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
        >
            <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                
                <div className="space-y-2">
                    <p className="text-gray-600">
                        ইমেইল যাচাইকরণে সমস্যা হয়েছে।
                    </p>
                    <p className="text-sm text-gray-500">
                        লিংকটি অবৈধ বা ক্ষতিগ্রস্ত হতে পারে।
                    </p>
                </div>

                <div className="space-y-3">
                    <Button 
                        onClick={handleResendVerification}
                        disabled={isResending}
                        className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                পাঠানো হচ্ছে...
                            </div>
                        ) : (
                            'নতুন যাচাইকরণ ইমেইল পাঠান'
                        )}
                    </Button>
                    
                    <Link 
                        href="/register"
                        className="block w-full py-3 px-4 text-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        নতুন অ্যাকাউন্ট তৈরি করুন
                    </Link>
                </div>

                <div className="text-sm text-gray-500">
                    <p>
                        সমস্যা অব্যাহত থাকলে{' '}
                        <Link href="/contact" className="text-primary-600 hover:text-primary-500 font-medium">
                            সাপোর্ট টিমের সাথে যোগাযোগ করুন
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default VerifyEmailPage;