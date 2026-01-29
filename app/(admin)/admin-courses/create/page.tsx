'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import IconBook from '@/components/icon/icon-book';
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import Link from 'next/link';

const courseSchema = z.object({
  title: z.string().min(1, 'কোর্সের নাম আবশ্যক'),
  description: z.string().min(10, 'কমপক্ষে ১০ অক্ষরের বিবরণ প্রয়োজন'),
  category: z.string().min(1, 'ক্যাটেগরি নির্বাচন করুন'),
  price: z.number().min(0, 'মূল্য ০ বা তার বেশি হতে হবে'),
});

type CourseFormData = z.infer<typeof courseSchema>;

const CreateCoursePage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Course data:', data);
      router.push('/admin-courses');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            href="/admin-courses"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconBook className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">নতুন কোর্স তৈরি করুন</h1>
            <p className="text-gray-600 dark:text-gray-400">কোর্সের সম্পূর্ণ তথ্য পূরণ করুন</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                কোর্সের নাম <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="যেমন: HSC পদার্থবিজ্ঞান"
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ক্যাটেগরি <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                <option value="SSC">SSC (মাধ্যমিক)</option>
                <option value="HSC">HSC (উচ্চ মাধ্যমিক)</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                মূল্য (টাকা) <span className="text-red-500">*</span>
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="৫০০০"
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              কোর্সের বিবরণ <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="কোর্সের সম্পূর্ণ বিবরণ লিখুন..."
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin-courses"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'কোর্স তৈরি করুন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;