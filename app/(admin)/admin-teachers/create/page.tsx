'use client';

import React from 'react';
import IconUser from '@/components/icon/icon-user';
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import Link from 'next/link';

const CreateTeacherPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            href="/admin-teachers"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconUser className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">নতুন শিক্ষক যোগ করুন</h1>
            <p className="text-gray-600 dark:text-gray-400">শিক্ষকের সম্পূর্ণ তথ্য পূরণ করুন</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">নতুন শিক্ষক যোগ করার ফর্ম তৈরি করা হচ্ছে...</p>
      </div>
    </div>
  );
};

export default CreateTeacherPage;