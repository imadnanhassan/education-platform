'use client';

import React from 'react';
import IconNotes from '@/components/icon/icon-notes';
import IconPlus from '@/components/icon/icon-plus';

const AdminMagazinePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconNotes className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ম্যাগাজিন ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">ডিজিটাল ম্যাগাজিন প্রকাশ ও ব্যবস্থাপনা</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          <IconPlus className="w-4 h-4" />
          <span>নতুন ম্যাগাজিন</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">ম্যাগাজিন ব্যবস্থাপনা পেজ তৈরি করা হচ্ছে...</p>
      </div>
    </div>
  );
};

export default AdminMagazinePage;