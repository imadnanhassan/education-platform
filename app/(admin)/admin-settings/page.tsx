'use client';

import React from 'react';
import IconSettings from '@/components/icon/icon-settings';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconSettings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">সিস্টেম সেটিংস</h1>
            <p className="text-gray-600 dark:text-gray-400">প্রতিষ্ঠানের সাধারণ সেটিংস এবং কনফিগারেশন</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">সিস্টেম সেটিংস পেজ তৈরি করা হচ্ছে...</p>
      </div>
    </div>
  );
};

export default SettingsPage;