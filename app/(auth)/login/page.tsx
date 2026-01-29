'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import AuthLayout from '@/components/layouts/auth/AuthLayout';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { cn } from '@/utils/cn';
import { demoLogin } from '@/store/slices/authSlice';
import { IRootState } from '@/store';
import store from '@/store';

const LoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, demoCredentials } = useSelector((state: IRootState) => state.auth);
    const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    // Load saved credentials from localStorage on component mount
    useEffect(() => {
        const savedCredentials = localStorage.getItem('rememberedCredentials');
        if (savedCredentials) {
            try {
                const { email, password, rememberMe, loginType: savedLoginType } = JSON.parse(savedCredentials);
                setValue('email', email);
                setValue('password', password);
                setValue('rememberMe', rememberMe);
                setLoginType(savedLoginType);
                toast.success('সংরক্ষিত তথ্য লোড করা হয়েছে', {
                    description: 'আপনার পূর্বের লগইন তথ্য স্বয়ংক্রিয়ভাবে পূরণ করা হয়েছে।'
                });
            } catch (error) {
                console.error('Error loading saved credentials:', error);
                localStorage.removeItem('rememberedCredentials');
            }
        }
    }, [setValue]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            // Save credentials to localStorage if remember me is checked
            if (data.rememberMe) {
                const credentialsToSave = {
                    email: data.email,
                    password: data.password,
                    rememberMe: data.rememberMe,
                    loginType: loginType
                };
                localStorage.setItem('rememberedCredentials', JSON.stringify(credentialsToSave));
                toast.success('তথ্য সংরক্ষিত হয়েছে', {
                    description: 'আপনার লগইন তথ্য পরবর্তী বারের জন্য সংরক্ষণ করা হয়েছে।'
                });
            } else {
                // Remove saved credentials if remember me is unchecked
                localStorage.removeItem('rememberedCredentials');
            }

            // Show loading toast
            const loadingToast = toast.loading('লগইন করা হচ্ছে...', {
                description: 'অনুগ্রহ করে অপেক্ষা করুন।'
            });

            // Use demo login for now
            dispatch(demoLogin({
                email: data.email,
                password: data.password
            }));
            
            // Check if login was successful and redirect based on role
            setTimeout(() => {
                const state = store.getState();
                if (state.auth.isAuthenticated) {
                    const user = state.auth.user;
                    
                    // Dismiss loading toast
                    toast.dismiss(loadingToast);
                    
                    // Show success toast
                    toast.success('সফলভাবে লগইন হয়েছে!', {
                        description: `স্বাগতম, ${user?.firstName} ${user?.lastName}!`,
                        duration: 3000,
                    });

                    // Redirect based on role
                    if (user?.role.name === 'super_admin' || user?.role.name === 'admin') {
                        router.push('/dashboard');
                    } else {
                        // For student or other roles, redirect to frontend
                        router.push('/');
                    }
                } else {
                    // Dismiss loading toast
                    toast.dismiss(loadingToast);
                    
                    // Show error toast
                    toast.error('লগইন ব্যর্থ হয়েছে', {
                        description: 'ইমেইল বা পাসওয়ার্ড ভুল। অনুগ্রহ করে আবার চেষ্টা করুন।',
                        duration: 4000,
                    });
                }
            }, 1000);
        } catch (error) {
            console.error('Login error:', error);
            toast.error('একটি ত্রুটি ঘটেছে', {
                description: 'লগইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
                duration: 4000,
            });
        }
    };

    const fillDemoCredentials = () => {
        if (loginType === 'student') {
            setValue('email', demoCredentials.student.email);
            setValue('password', demoCredentials.student.password);
        } else {
            setValue('email', demoCredentials.admin.email);
            setValue('password', demoCredentials.admin.password);
        }
        
        toast.info('ডেমো তথ্য পূরণ করা হয়েছে', {
            description: `${loginType === 'student' ? 'শিক্ষার্থী' : 'অ্যাডমিন'} ডেমো অ্যাকাউন্টের তথ্য পূরণ করা হয়েছে।`,
            duration: 2000,
        });
    };

    // Handle login type change
    const handleLoginTypeChange = (type: 'student' | 'admin') => {
        setLoginType(type);
        toast.info(`${type === 'student' ? 'শিক্ষার্থী' : 'অ্যাডমিন'} মোড নির্বাচিত`, {
            description: `আপনি ${type === 'student' ? 'শিক্ষার্থী' : 'অ্যাডমিন'} হিসেবে লগইন করবেন।`,
            duration: 1500,
        });
    };

    return (
        <AuthLayout
            title="আপনার অ্যাকাউন্টে প্রবেশ করুন"
            subtitle={
                <>
                    অথবা{' '}
                    <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                        নতুন অ্যাকাউন্ট তৈরি করুন
                    </Link>
                </>
            }
        >
            {/* Login Type Selector */}
            <div className="mb-6">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => handleLoginTypeChange('student')}
                        className={cn(
                            'flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 rounded-md',
                            loginType === 'student'
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        )}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>শিক্ষার্থী</span>
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLoginTypeChange('admin')}
                        className={cn(
                            'flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 rounded-md',
                            loginType === 'admin'
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                        )}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>অ্যাডমিন</span>
                        </div>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}
                
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
                                'w-full pl-10 pr-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                                errors.email ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="আপনার ইমেইল লিখুন"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        পাসওয়ার্ড
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
                                'w-full pl-10 pr-12 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                                errors.password ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            {...register('rememberMe')}
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            আমাকে মনে রাখুন
                        </label>
                    </div>

                    <Link 
                        href="/forgot-password" 
                        className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
                    >
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isSubmitting || loading}
                    className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {(isSubmitting || loading) ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            প্রবেশ করা হচ্ছে...
                        </div>
                    ) : (
                        loginType === 'student' ? 'শিক্ষার্থী হিসেবে প্রবেশ' : 'অ্যাডমিন হিসেবে প্রবেশ'
                    )}
                </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <svg className="h-4 w-4 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-sm font-medium text-primary-900">ডেমো অ্যাকাউন্ট</h4>
                    </div>
                    <button
                        type="button"
                        onClick={fillDemoCredentials}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors px-3 py-1 bg-white rounded-md hover:bg-primary-50"
                    >
                        ব্যবহার করুন
                    </button>
                </div>
                <div className="text-xs text-primary-700 space-y-1">
                    {loginType === 'student' ? (
                        <>
                            <p><strong>ইমেইল:</strong> {demoCredentials.student.email}</p>
                            <p><strong>পাসওয়ার্ড:</strong> {demoCredentials.student.password}</p>
                        </>
                    ) : (
                        <>
                            <p><strong>ইমেইল:</strong> {demoCredentials.admin.email}</p>
                            <p><strong>পাসওয়ার্ড:</strong> {demoCredentials.admin.password}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Social Login */}
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">অথবা</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                    </button>

                    <button
                        type="button"
                        className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                    </button>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
                <p>
                    লগইন করার মাধ্যমে আপনি আমাদের{' '}
                    <Link href="/terms" className="text-primary-600 hover:text-primary-500 transition-colors">
                        শর্তাবলী
                    </Link>{' '}
                    এবং{' '}
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-500 transition-colors">
                        গোপনীয়তা নীতি
                    </Link>{' '}
                    সম্মত হচ্ছেন।
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;