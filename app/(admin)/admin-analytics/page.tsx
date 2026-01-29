'use client';

import React from 'react';
import IconBarChart from '@/components/icon/icon-bar-chart';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconBarChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">অ্যানালিটিক্স ও রিপোর্ট</h1>
            <p className="text-gray-600 dark:text-gray-400">ব্যবসায়িক পরিসংখ্যান এবং কর্মক্ষমতা বিশ্লেষণ</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">অ্যানালিটিক্স ও রিপোর্ট পেজ তৈরি করা হচ্ছে...</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;