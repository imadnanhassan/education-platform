'use client';
import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface FormData {
    studentName: string;
    fatherName: string;
    motherName: string;
    class: string;
    address: string;
    schoolName: string;
    mobileNumber: string;
    course: string;
    paymentMethod: string;
    transactionId: string;
    photo: File | null;
    totalFee: string;
    discount: string;
    cashPayment: string;
    duePayment: string;
}

const AdmissionPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        studentName: '',
        fatherName: '',
        motherName: '',
        class: '',
        address: '',
        schoolName: '',
        mobileNumber: '',
        course: '',
        paymentMethod: '',
        transactionId: '',
        photo: null,
        totalFee: '',
        discount: '',
        cashPayment: '',
        duePayment: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const classes = [
        'Six', 'Seven', 'Eight', 'Nine-Ten', '11th-12th', 'Others'
    ];

    const courses = [
        'Pre-Primary Course',
        'Kids Programming',
        'Kids Spoken',
        'Junior Spoken',
        'Senior Spoken',
        'IELTS',
        'SAT',
        'Digital Marketing',
        'SSC-2026(Science)',
        'SSC-2026(Arts & Business)',
        'Class Six(English-Math & Science)',
        'Class Seven(English-Math & Science)',
        'Class Eight(English-Math & Science)',
        'Class Nine & Ten(English-Math & Science)',
        'Class Nine & Ten(Science Finishing Course)',
        'HSC(Science Finishing Course)',
        'HSC ICT(হাতে-কলমে HTML ও Programming)',
        'HSC English & University Admission English',
        'DAKHIL(Arabic 1st & 2nd)',
        'ALIM(Arabic 1st & 2nd)',
        'Class Eight(Arabic 1st & 2nd)',
        'Digital Marketting',
        'Graphic Design'
    ];

    const paymentMethods = [
        'Cash',
        'Bkash-01855166339(Send Money)',
        'Nagad-01855166339(Send Money)',
        'Membership Card'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                alert('ফাইলের সাইজ ১০MB এর বেশি হতে পারবে না');
                return;
            }
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                alert('শুধুমাত্র JPG, PNG, GIF, WEBP ফাইল আপলোড করা যাবে');
                return;
            }
        }
        setFormData(prev => ({
            ...prev,
            photo: file
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Create FormData for file upload
            const submitData = new FormData();
            
            // Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'photo' && value) {
                    submitData.append(key, value);
                } else if (key !== 'photo') {
                    submitData.append(key, value as string);
                }
            });

            // Submit to API
            const response = await fetch('/api/admission', {
                method: 'POST',
                body: submitData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitMessage(`${result.message} আপনার আবেদন নম্বর: ${result.applicationId}`);
                
                // Reset form
                setFormData({
                    studentName: '',
                    fatherName: '',
                    motherName: '',
                    class: '',
                    address: '',
                    schoolName: '',
                    mobileNumber: '',
                    course: '',
                    paymentMethod: '',
                    transactionId: '',
                    photo: null,
                    totalFee: '',
                    discount: '',
                    cashPayment: '',
                    duePayment: ''
                });

                // Reset file input
                const fileInput = document.getElementById('photo') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
            } else {
                setSubmitMessage(result.error || 'আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitMessage('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Graviton Academy
                        </span>
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">ভর্তির আবেদনপত্র</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        আপনার শিক্ষার যাত্রা শুরু করতে নিচের ফর্মটি সম্পূর্ণ করুন। সকল তথ্য সঠিকভাবে পূরণ করুন।
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white border border-gray-200 p-8 lg:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-emerald-500">
                                ব্যক্তিগত তথ্য
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                                        শিক্ষার্থীর নাম *
                                    </label>
                                    <input
                                        type="text"
                                        id="studentName"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="শিক্ষার্থীর পূর্ণ নাম লিখুন"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-2">
                                        পিতার নাম *
                                    </label>
                                    <input
                                        type="text"
                                        id="fatherName"
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="পিতার পূর্ণ নাম লিখুন"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-2">
                                        মাতার নাম *
                                    </label>
                                    <input
                                        type="text"
                                        id="motherName"
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="মাতার পূর্ণ নাম লিখুন"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                                        শ্রেণী *
                                    </label>
                                    <select
                                        id="class"
                                        name="class"
                                        value={formData.class}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                    >
                                        <option value="">শ্রেণী নির্বাচন করুন</option>
                                        {classes.map((cls) => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-emerald-500">
                                যোগাযোগের তথ্য
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        ঠিকানা *
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300 resize-none"
                                        placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                                        স্কুল/কলেজের নাম *
                                    </label>
                                    <input
                                        type="text"
                                        id="schoolName"
                                        name="schoolName"
                                        value={formData.schoolName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="প্রতিষ্ঠানের নাম লিখুন"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                        মোবাইল নম্বর *
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="০১৭xxxxxxxx"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course Selection */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-emerald-500">
                                কোর্স নির্বাচন
                            </h3>
                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                                    আমাদের কোর্স *
                                </label>
                                <select
                                    id="course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                >
                                    <option value="">কোর্স নির্বাচন করুন</option>
                                    {courses.map((course) => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-emerald-500">
                                পেমেন্ট তথ্য
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                                        পেমেন্ট পদ্ধতি *
                                    </label>
                                    <select
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        value={formData.paymentMethod}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                    >
                                        <option value="">পেমেন্ট পদ্ধতি নির্বাচন করুন</option>
                                        {paymentMethods.map((method) => (
                                            <option key={method} value={method}>{method}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                                        Transaction Id/Last 3Digit Phone Number *
                                    </label>
                                    <input
                                        type="text"
                                        id="transactionId"
                                        name="transactionId"
                                        value={formData.transactionId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="Transaction ID অথবা ফোন নম্বরের শেষ ৩ সংখ্যা"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="totalFee" className="block text-sm font-medium text-gray-700 mb-2">
                                        মোট ফি *
                                    </label>
                                    <input
                                        type="number"
                                        id="totalFee"
                                        name="totalFee"
                                        value={formData.totalFee}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="টাকার পরিমাণ"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
                                        ছাড় *
                                    </label>
                                    <input
                                        type="number"
                                        id="discount"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="ছাড়ের পরিমাণ"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cashPayment" className="block text-sm font-medium text-gray-700 mb-2">
                                        নগদ পেমেন্ট *
                                    </label>
                                    <input
                                        type="number"
                                        id="cashPayment"
                                        name="cashPayment"
                                        value={formData.cashPayment}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="নগদ প্রদানের পরিমাণ"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="duePayment" className="block text-sm font-medium text-gray-700 mb-2">
                                        বকেয়া পেমেন্ট *
                                    </label>
                                    <input
                                        type="number"
                                        id="duePayment"
                                        name="duePayment"
                                        value={formData.duePayment}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300"
                                        placeholder="বকেয়া পরিমাণ"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-emerald-500">
                                ছবি আপলোড
                            </h3>
                            <div>
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                                    আপনার ছবি আপলোড করুন *
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed hover:border-emerald-400 transition-colors duration-300">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="photo" className="relative cursor-pointer bg-white font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                                <span>ফাইল আপলোড করুন</span>
                                                <input
                                                    id="photo"
                                                    name="photo"
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                    onChange={handleFileChange}
                                                    required
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">অথবা drag and drop করুন</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            সর্বোচ্চ ফাইল সাইজ: ১০MB। অনুমোদিত ফরম্যাট: JPG, PNG, GIF, WEBP
                                        </p>
                                        {formData.photo && (
                                            <p className="text-sm text-emerald-600 font-medium">
                                                নির্বাচিত ফাইল: {formData.photo.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold text-white transition-all duration-300",
                                    isSubmitting
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                                )}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        জমা দেওয়া হচ্ছে...
                                    </div>
                                ) : (
                                    'আবেদন জমা দিন'
                                )}
                            </button>
                        </div>

                        {/* Success/Error Message */}
                        {submitMessage && (
                            <div className={cn(
                                "p-4 border-l-4 text-sm",
                                submitMessage.includes('সফলভাবে')
                                    ? "bg-green-50 border-green-400 text-green-700"
                                    : "bg-red-50 border-red-400 text-red-700"
                            )}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                </div>

                {/* Contact Information */}
                <div className="mt-12 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        সহায়তার প্রয়োজন?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        ভর্তি সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:01855166339" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors duration-300">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            ০১৮৫৫১৬৬৩৩৯
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border-2 border-emerald-500 text-emerald-700 font-medium hover:bg-emerald-50 transition-colors duration-300">
                            যোগাযোগ পাতা
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionPage;