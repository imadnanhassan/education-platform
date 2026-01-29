'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/auth/AuthLayout';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';
import { cn } from '@/utils/cn';

const ForgotPasswordPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            console.log('Forgot password attempt:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitted(true);
        } catch (error) {
            console.error('Forgot password error:', error);
        }
    };

    if (isSubmitted) {
        return (
            <AuthLayout
                title="ইমেইল পাঠানো হয়েছে"
                subtitle="আপনার ইমেইল চেক করুন এবং পাসওয়ার্ড রিসেট করার জন্য নির্দেশাবলী অনুসরণ করুন"
            >
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-primary-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            আমরা <strong>{getValues('email')}</strong> এ একটি পাসওয়ার্ড রিসেট লিংক পাঠিয়েছি।
                        </p>
                        <p className="text-sm text-gray-500">
                            ইমেইল না পেলে স্প্যাম ফোল্ডার চেক করুন।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button 
                            onClick={() => setIsSubmitted(false)}
                            className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                        >
                            আবার চেষ্টা করুন
                        </Button>
                        
                        <Link 
                            href="/login"
                            className="block w-full py-3 px-4 text-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            লগইনে ফিরে যান
                        </Link>
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>
                            ইমেইল না পেলে{' '}
                            <button 
                                onClick={() => onSubmit(getValues())}
                                className="text-primary-600 hover:text-primary-500 font-medium"
                            >
                                আবার পাঠান
                            </button>
                        </p>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="পাসওয়ার্ড ভুলে গেছেন?"
            subtitle="চিন্তা করবেন না! আপনার ইমেইল ঠিকানা দিন এবং আমরা আপনাকে পাসওয়ার্ড রিসেট করার লিংক পাঠাবো।"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        ইমেইল ঠিকানা
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <input
                            {...register('email')}
                            type="email"
                            className={cn(
                                'w-full pl-10 pr-4 py-3 border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                                errors.email ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            পাঠানো হচ্ছে...
                        </div>
                    ) : (
                        'রিসেট লিংক পাঠান'
                    )}
                </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
                <Link 
                    href="/login"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    লগইনে ফিরে যান
                </Link>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">সাহায্য প্রয়োজন?</h4>
                <div className="text-sm text-gray-600 space-y-1">
                    <p>• নিশ্চিত করুন যে আপনি সঠিক ইমেইল ঠিকানা দিয়েছেন</p>
                    <p>• স্প্যাম বা জাঙ্ক ফোল্ডার চেক করুন</p>
                    <p>• সমস্যা অব্যাহত থাকলে আমাদের সাথে যোগাযোগ করুন</p>
                </div>
                <div className="mt-3">
                    <Link 
                        href="/contact" 
                        className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                    >
                        সাপোর্ট টিমের সাথে যোগাযোগ করুন
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;