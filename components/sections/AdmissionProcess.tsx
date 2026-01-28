'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { admissionStepsData } from '@/data/homeData';
import { cn } from '@/utils/cn';

const AdmissionProcess: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    const getIcon = (iconName: string) => {
        const icons = {
            computer: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            ),
            edit: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            ),
            'check-circle': (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            'credit-card': (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            )
        };
        return icons[iconName as keyof typeof icons] || icons.computer;
    };

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Light Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.1) 2px, transparent 0), 
                                     radial-gradient(circle at 75px 75px, rgba(5, 150, 105, 0.1) 2px, transparent 0)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            ভর্তি প্রক্রিয়া
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        সহজ ৪টি ধাপে সম্পন্ন করুন আপনার ভর্তি প্রক্রিয়া এবং শুরু করুন আপনার সফলতার যাত্রা
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            {admissionStepsData.map((step, index) => (
                                <div key={step.id} className="flex flex-col items-center">
                                    <div 
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer",
                                            index <= activeStep 
                                                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg" 
                                                : "bg-gray-200 text-gray-500"
                                        )}
                                        onClick={() => setActiveStep(index)}
                                    >
                                        {index < activeStep ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            step.step
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-600 mt-2 hidden sm:block">{step.title.split(' ')[0]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${((activeStep + 1) / admissionStepsData.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Interactive Step Display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Step Navigation */}
                    <div className="space-y-4">
                        {admissionStepsData.map((step, index) => (
                            <div 
                                key={step.id}
                                className={cn(
                                    "group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer",
                                    index === activeStep 
                                        ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg" 
                                        : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
                                )}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Step Icon */}
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                                        index === activeStep 
                                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white" 
                                            : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                                    )}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {getIcon(step.icon)}
                                        </svg>
                                    </div>
                                    
                                    {/* Step Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className={cn(
                                                "text-sm font-bold px-2 py-1 rounded-full",
                                                index === activeStep 
                                                    ? "bg-emerald-500 text-white" 
                                                    : "bg-gray-200 text-gray-600"
                                            )}>
                                                ধাপ {step.step}
                                            </span>
                                            {index <= activeStep && (
                                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className={cn(
                                            "text-lg font-bold mb-2 transition-colors duration-300",
                                            index === activeStep ? "text-emerald-700" : "text-gray-900"
                                        )}>
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Active Step Details */}
                    <div className="lg:sticky lg:top-8">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {getIcon(admissionStepsData[activeStep].icon)}
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium opacity-90">ধাপ {admissionStepsData[activeStep].step}</div>
                                        <h3 className="text-2xl font-bold">{admissionStepsData[activeStep].title}</h3>
                                    </div>
                                </div>
                                <p className="text-emerald-100 leading-relaxed">
                                    {admissionStepsData[activeStep].description}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Requirements */}
                                {admissionStepsData[activeStep].requirements && (
                                    <div className="mb-8">
                                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                            <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            প্রয়োজনীয় কাগজপত্র
                                        </h4>
                                        <div className="space-y-3">
                                            {admissionStepsData[activeStep].requirements?.map((req, idx) => (
                                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    <span className="text-gray-700">{req}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button 
                                        className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                                        onClick={() => {
                                            if (activeStep < admissionStepsData.length - 1) {
                                                setActiveStep(activeStep + 1);
                                            }
                                        }}
                                    >
                                        {activeStep === admissionStepsData.length - 1 ? 'সম্পন্ন' : 'পরবর্তী ধাপ'}
                                    </button>
                                    {activeStep > 0 && (
                                        <button 
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                                            onClick={() => setActiveStep(activeStep - 1)}
                                        >
                                            পূর্ববর্তী
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-4 text-center">
                                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-sm font-bold text-emerald-700">৭-১০ দিন</div>
                                <div className="text-xs text-emerald-600">সম্পূর্ণ প্রক্রিয়া</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 text-center">
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="text-sm font-bold text-green-700">১০০% নিরাপদ</div>
                                <div className="text-xs text-green-600">স্বচ্ছ প্রক্রিয়া</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-3xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            আজই শুরু করুন আপনার ভর্তি প্রক্রিয়া
                        </h3>
                        <p className="text-gray-600 mb-6">
                            আমাদের বিশেষজ্ঞ টিম আপনাকে সম্পূর্ণ প্রক্রিয়ায় সহায়তা করবে
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/admission">
                                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300">
                                    এখনই আবেদন করুন
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                                    সহায়তা নিন
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdmissionProcess;