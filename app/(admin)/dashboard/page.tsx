'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import StatusBadge from '@/components/ui/StatusBadge';
import IconUsers from '@/components/icon/icon-users';
import IconBook from '@/components/icon/icon-book';
import IconUser from '@/components/icon/icon-user';
import IconInbox from '@/components/icon/icon-inbox';

const AdminDashboard: React.FC = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const { notifications } = useSelector((state: IRootState) => state.dashboard);

  // Dummy statistics data
  const stats = [
    {
      title: 'মোট শিক্ষার্থী',
      titleEn: 'Total Students',
      value: '1,234',
      change: '+12%',
      changeType: 'increase' as const,
      icon: IconUsers,
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
      lightGradient: 'bg-gradient-to-r from-blue-50 to-blue-100',
    },
    {
      title: 'মোট কোর্স',
      titleEn: 'Total Courses',
      value: '45',
      change: '+3',
      changeType: 'increase' as const,
      icon: IconBook,
      gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      lightGradient: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
    },
    {
      title: 'মোট শিক্ষক',
      titleEn: 'Total Teachers',
      value: '28',
      change: '+2',
      changeType: 'increase' as const,
      icon: IconUser,
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
      lightGradient: 'bg-gradient-to-r from-purple-50 to-purple-100',
    },
    {
      title: 'নতুন আবেদন',
      titleEn: 'New Applications',
      value: '15',
      change: '+5',
      changeType: 'increase' as const,
      icon: IconInbox,
      gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
      lightGradient: 'bg-gradient-to-r from-orange-50 to-orange-100',
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'student_enrolled',
      message: 'রাহুল আহমেদ HSC পদার্থবিজ্ঞান কোর্সে ভর্তি হয়েছেন',
      time: '৫ মিনিট আগে',
      status: 'success' as const,
    },
    {
      id: '2',
      type: 'course_created',
      message: 'নতুন কোর্স "উচ্চ মাধ্যমিক রসায়ন" তৈরি করা হয়েছে',
      time: '১ ঘন্টা আগে',
      status: 'info' as const,
    },
    {
      id: '3',
      type: 'admission_approved',
      message: 'সারা খাতুনের ভর্তির আবেদন অনুমোদিত হয়েছে',
      time: '২ ঘন্টা আগে',
      status: 'success' as const,
    },
    {
      id: '4',
      type: 'content_uploaded',
      message: 'পদার্থবিজ্ঞান অধ্যায় ৩-এ নতুন ভিডিও আপলোড করা হয়েছে',
      time: '৩ ঘন্টা আগে',
      status: 'info' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-black rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              স্বাগতম, {user?.firstName} {user?.lastName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              আজকের তারিখ: {new Date().toLocaleDateString('bn-BD')}
            </p>
          </div>
          <div className="text-right">
            <StatusBadge status="অনলাইন" variant="success" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              শেষ লগইন: {user?.lastLogin ? new Date(user.lastLogin).toLocaleString('bn-BD') : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className={`${stat.lightGradient} dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg border border-white/20 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  <div className="flex items-center mt-3">
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      stat.changeType === 'increase' 
                        ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30' 
                        : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">গত মাস থেকে</span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${stat.gradient} shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-black rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">সাম্প্রতিক কার্যক্রম</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-black rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">দ্রুত কার্যক্রম</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                <div className="flex items-center space-x-3">
                  <IconUsers className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">নতুন শিক্ষার্থী</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">যোগ করুন</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                <div className="flex items-center space-x-3">
                  <IconBook className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">নতুন কোর্স</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">তৈরি করুন</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                <div className="flex items-center space-x-3">
                  <IconUser className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">নতুন শিক্ষক</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">যোগ করুন</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                <div className="flex items-center space-x-3">
                  <IconInbox className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">ভর্তি আবেদন</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">পর্যালোচনা করুন</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;