'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/auth/AuthLayout';
import { otpSchema, type OtpFormData } from '@/lib/validations/auth';

const VerifyOtpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isResending, setIsResending] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const {
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        setError,
        clearErrors
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
    });

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (!emailParam) {
            router.push('/login');
            return;
        }
        setEmail(emailParam);
    }, [searchParams, router]);

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        
        // Update form value
        const otpString = newOtpValues.join('');
        setValue('otp', otpString);
        
        if (otpString.length === 6) {
            clearErrors('otp');
        }

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtpValues = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
        setOtpValues(newOtpValues);
        setValue('otp', pastedData);
        
        if (pastedData.length === 6) {
            clearErrors('otp');
        }
    };

    const onSubmit = async (data: OtpFormData) => {
        try {
            console.log('OTP verification attempt:', { otp: data.otp, email });
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Redirect to success page or dashboard
            router.push('/login?verified=true');
        } catch (error) {
            console.error('OTP verification error:', error);
            setError('otp', { message: 'অবৈধ OTP কোড। আবার চেষ্টা করুন।' });
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            console.log('Resending OTP to:', email);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setTimeLeft(300); // Reset timer
            setOtpValues(['', '', '', '', '', '']);
            setValue('otp', '');
            clearErrors('otp');
        } catch (error) {
            console.error('Resend OTP error:', error);
        } finally {
            setIsResending(false);
        }
    };

    if (!email) {
        return null; // Will redirect in useEffect
    }

    return (
        <AuthLayout
            title="ইমেইল যাচাই করুন"
            subtitle={`আমরা ${email} এ একটি ৬-সংখ্যার যাচাইকরণ কোড পাঠিয়েছি`}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* OTP Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                        যাচাইকরণ কোড লিখুন
                    </label>
                    <div className="flex justify-center space-x-3 mb-4">
                        {otpValues.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                        ))}
                    </div>
                </div>

                {/* Timer */}
                <div className="text-center">
                    {timeLeft > 0 ? (
                        <p className="text-sm text-gray-600">
                            কোডটি {formatTime(timeLeft)} এর মধ্যে মেয়াদ উত্তীর্ণ হবে
                        </p>
                    ) : (
                        <p className="text-sm text-red-600">
                            কোডের মেয়াদ উত্তীর্ণ হয়েছে
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isSubmitting || otpValues.join('').length !== 6}
                    className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            যাচাই করা হচ্ছে...
                        </div>
                    ) : (
                        'ইমেইল যাচাই করুন'
                    )}
                </Button>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
                {timeLeft > 0 ? (
                    <p className="text-sm text-gray-600">
                        কোড পাননি?{' '}
                        <span className="text-gray-400">
                            {formatTime(timeLeft)} পর আবার পাঠাতে পারবেন
                        </span>
                    </p>
                ) : (
                    <button
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors disabled:opacity-50"
                    >
                        {isResending ? 'পাঠানো হচ্ছে...' : 'নতুন কোড পাঠান'}
                    </button>
                )}
            </div>

            {/* Change Email */}
            <div className="mt-4 text-center">
                <Link 
                    href="/register"
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                    ভুল ইমেইল? পরিবর্তন করুন
                </Link>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">কোড পাচ্ছেন না?</h4>
                <div className="text-sm text-gray-600 space-y-1">
                    <p>• স্প্যাম বা জাঙ্ক ফোল্ডার চেক করুন</p>
                    <p>• ইন্টারনেট সংযোগ নিশ্চিত করুন</p>
                    <p>• কয়েক মিনিট অপেক্ষা করুন</p>
                </div>
                <div className="mt-3">
                    <Link 
                        href="/contact" 
                        className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                    >
                        সাহায্যের জন্য যোগাযোগ করুন
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default VerifyOtpPage;