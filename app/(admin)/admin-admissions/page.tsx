'use client';

import React from 'react';
import IconInbox from '@/components/icon/icon-inbox';

const AdmissionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconInbox className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ভর্তি আবেদন</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল ভর্তি আবেদনের তালিকা এবং পর্যালোচনা</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">ভর্তি আবেদন ব্যবস্থাপনা পেজ তৈরি করা হচ্ছে...</p>
      </div>
    </div>
  );
};

export default AdmissionsPage;