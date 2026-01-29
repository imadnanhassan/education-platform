'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import IconUsers from '@/components/icon/icon-users';
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import Link from 'next/link';

const studentSchema = z.object({
  firstName: z.string().min(1, 'প্রথম নাম আবশ্যক'),
  lastName: z.string().min(1, 'শেষ নাম আবশ্যক'),
  email: z.string().email('বৈধ ইমেইল ঠিকানা প্রয়োজন'),
  phone: z.string().min(11, 'বৈধ ফোন নম্বর প্রয়োজন'),
  class: z.string().min(1, 'ক্লাস নির্বাচন করুন'),
});

type StudentFormData = z.infer<typeof studentSchema>;

const CreateStudentPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Student data:', data);
      router.push('/admin-students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            href="/admin-students"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconUsers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">নতুন শিক্ষার্থী যোগ করুন</h1>
            <p className="text-gray-600 dark:text-gray-400">শিক্ষার্থীর সম্পূর্ণ তথ্য পূরণ করুন</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                প্রথম নাম <span className="text-red-500">*</span>
              </label>
              <input
                {...register('firstName')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="প্রথম নাম লিখুন"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                শেষ নাম <span className="text-red-500">*</span>
              </label>
              <input
                {...register('lastName')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="শেষ নাম লিখুন"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ইমেইল <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="ইমেইল ঠিকানা লিখুন"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ফোন নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="01XXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ক্লাস <span className="text-red-500">*</span>
              </label>
              <select
                {...register('class')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">ক্লাস নির্বাচন করুন</option>
                <option value="ssc-2024">SSC 2024</option>
                <option value="hsc-2024">HSC 2024</option>
              </select>
              {errors.class && (
                <p className="text-sm text-red-600">{errors.class.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin-students"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'শিক্ষার্থী যোগ করুন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudentPage;