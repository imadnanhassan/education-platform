'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/auth/AuthLayout';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations/auth';
import { cn } from '@/utils/cn';

const ResetPasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (!tokenParam) {
            router.push('/forgot-password');
            return;
        }
        setToken(tokenParam);
    }, [searchParams, router]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const password = watch('password');

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            console.log('Reset password attempt:', { ...data, token });
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch (error) {
            console.error('Reset password error:', error);
        }
    };

    if (isSuccess) {
        return (
            <AuthLayout
                title="পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে"
                subtitle="আপনার নতুন পাসওয়ার্ড দিয়ে এখন লগইন করতে পারেন"
            >
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            আপনার পাসওয়ার্ড সফলভাবে আপডেট হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।
                        </p>
                    </div>

                    <Button 
                        onClick={() => router.push('/login')}
                        className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                    >
                        লগইন করুন
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    if (!token) {
        return (
            <AuthLayout
                title="অবৈধ লিংক"
                subtitle="এই পাসওয়ার্ড রিসেট লিংকটি অবৈধ বা মেয়াদ উত্তীর্ণ"
            >
                <div className="text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            এই পাসওয়ার্ড রিসেট লিংকটি অবৈধ বা মেয়াদ উত্তীর্ণ হয়েছে।
                        </p>
                        <p className="text-sm text-gray-500">
                            অনুগ্রহ করে নতুন পাসওয়ার্ড রিসেট অনুরোধ করুন।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Link href="/forgot-password">
                            <Button className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200">
                                নতুন রিসেট লিংক পান
                            </Button>
                        </Link>
                        
                        <Link 
                            href="/login"
                            className="block w-full py-3 px-4 text-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            লগইনে ফিরে যান
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="নতুন পাসওয়ার্ড সেট করুন"
            subtitle="আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড তৈরি করুন"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        নতুন পাসওয়ার্ড
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            className={cn(
                                'w-full pl-10 pr-12 py-3 border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                                errors.password ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="নতুন পাসওয়ার্ড লিখুন"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        পাসওয়ার্ড নিশ্চিত করুন
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={cn(
                                'w-full pl-10 pr-12 py-3 border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Password Strength Indicator */}
                {password && (
                    <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">পাসওয়ার্ডের শক্তি:</div>
                        <div className="space-y-1">
                            <div className={cn(
                                'text-xs flex items-center',
                                password.length >= 8 ? 'text-green-600' : 'text-gray-400'
                            )}>
                                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                কমপক্ষে ৮ অক্ষর
                            </div>
                            <div className={cn(
                                'text-xs flex items-center',
                                /[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'
                            )}>
                                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                একটি বড় হাতের অক্ষর
                            </div>
                            <div className={cn(
                                'text-xs flex items-center',
                                /[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'
                            )}>
                                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                একটি ছোট হাতের অক্ষর
                            </div>
                            <div className={cn(
                                'text-xs flex items-center',
                                /\d/.test(password) ? 'text-green-600' : 'text-gray-400'
                            )}>
                                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                একটি সংখ্যা
                            </div>
                        </div>
                    </div>
                )}

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
                            পাসওয়ার্ড আপডেট করা হচ্ছে...
                        </div>
                    ) : (
                        'পাসওয়ার্ড আপডেট করুন'
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
        </AuthLayout>
    );
};

export default ResetPasswordPage;