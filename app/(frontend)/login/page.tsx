'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const LoginPage = () => {
    const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login attempt:', { ...formData, type: loginType });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <img 
                            src="/assets/images/logo.svg" 
                            alt="গ্র্যাভিটন একাডেমি" 
                            className="h-12 w-auto mx-auto"
                        />
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        আপনার অ্যাকাউন্টে প্রবেশ করুন
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        অথবা{' '}
                        <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            নতুন অ্যাকাউন্ট তৈরি করুন
                        </Link>
                    </p>
                </div>

                <Card className="p-8">
                    {/* Login Type Selector */}
                    <div className="mb-6">
                        <div className="flex rounded-lg bg-gray-100 p-1">
                            <button
                                type="button"
                                onClick={() => setLoginType('student')}
                                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                                    loginType === 'student'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                শিক্ষার্থী লগইন
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginType('admin')}
                                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                                    loginType === 'admin'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                অ্যাডমিন লগইন
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                ইমেইল ঠিকানা
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="আপনার ইমেইল লিখুন"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                পাসওয়ার্ড
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                placeholder="আপনার পাসওয়ার্ড লিখুন"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                    আমাকে মনে রাখুন
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                                    পাসওয়ার্ড ভুলে গেছেন?
                                </Link>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            {loginType === 'student' ? 'শিক্ষার্থী হিসেবে প্রবেশ' : 'অ্যাডমিন হিসেবে প্রবেশ'}
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">ডেমো অ্যাকাউন্ট:</h4>
                        <div className="text-xs text-gray-600 space-y-1">
                            {loginType === 'student' ? (
                                <>
                                    <p><strong>শিক্ষার্থী:</strong> student@graviton.com</p>
                                    <p><strong>পাসওয়ার্ড:</strong> student123</p>
                                </>
                            ) : (
                                <>
                                    <p><strong>অ্যাডমিন:</strong> admin@graviton.com</p>
                                    <p><strong>পাসওয়ার্ড:</strong> admin123</p>
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
                                <span className="px-2 bg-white text-gray-500">অথবা</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>

                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="ml-2">Facebook</span>
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Footer Links */}
                <div className="text-center text-sm text-gray-600">
                    <p>
                        লগইন করার মাধ্যমে আপনি আমাদের{' '}
                        <Link href="/terms" className="text-primary-600 hover:text-primary-500">
                            শর্তাবলী
                        </Link>{' '}
                        এবং{' '}
                        <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
                            গোপনীয়তা নীতি
                        </Link>{' '}
                        সম্মত হচ্ছেন।
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;