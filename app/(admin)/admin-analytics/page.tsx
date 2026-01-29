'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import IconBarChart from '@/components/icon/icon-bar-chart';
import IconDownload from '@/components/icon/icon-download';
import IconFilter from '@/components/icon/icon-filter';
import IconUsers from '@/components/icon/icon-users';
import IconBook from '@/components/icon/icon-book';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import IconCalendar from '@/components/icon/icon-calendar';

const AdminAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Dummy analytics data
  const overviewStats = [
    {
      title: 'মোট শিক্ষার্থী',
      value: '1,234',
      change: '+12%',
      changeType: 'increase' as const,
      icon: IconUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'সক্রিয় কোর্স',
      value: '45',
      change: '+3',
      changeType: 'increase' as const,
      icon: IconBook,
      color: 'bg-emerald-500',
    },
    {
      title: 'মাসিক আয়',
      value: '৳২,৪৫,০০০',
      change: '+8%',
      changeType: 'increase' as const,
      icon: IconTrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'নতুন ভর্তি',
      value: '89',
      change: '+15%',
      changeType: 'increase' as const,
      icon: IconCalendar,
      color: 'bg-orange-500',
    },
  ];

  const enrollmentData = [
    { month: 'জানুয়ারি', students: 45, target: 50 },
    { month: 'ফেব্রুয়ারি', students: 52, target: 55 },
    { month: 'মার্চ', students: 38, target: 45 },
    { month: 'এপ্রিল', students: 61, target: 60 },
    { month: 'মে', students: 48, target: 50 },
    { month: 'জুন', students: 55, target: 55 },
  ];

  const coursePerformance = [
    {
      course: 'HSC পদার্থবিজ্ঞান',
      enrolled: 67,
      completed: 58,
      rating: 4.8,
      revenue: '৳১,৮৫,০০০',
    },
    {
      course: 'SSC গণিত',
      enrolled: 89,
      completed: 76,
      rating: 4.6,
      revenue: '৳২,২৩,০০০',
    },
    {
      course: 'HSC রসায়ন',
      enrolled: 45,
      completed: 39,
      rating: 4.7,
      revenue: '৳১,৫৬,০০০',
    },
    {
      course: 'SSC ইংরেজি',
      enrolled: 78,
      completed: 65,
      rating: 4.5,
      revenue: '১,৯৮,০০০',
    },
  ];

  const teacherPerformance = [
    {
      name: 'ড. আহমেদ হাসান',
      subject: 'পদার্থবিজ্ঞান',
      students: 67,
      rating: 4.9,
      classes: 24,
      attendance: '95%',
    },
    {
      name: 'প্রফেসর রহিমা খাতুন',
      subject: 'গণিত',
      students: 89,
      rating: 4.7,
      classes: 28,
      attendance: '92%',
    },
    {
      name: 'মোহাম্মদ করিম',
      subject: 'রসায়ন',
      students: 45,
      rating: 4.8,
      classes: 22,
      attendance: '98%',
    },
  ];

  const recentActivities = [
    {
      type: 'enrollment',
      message: '৫টি নতুন ভর্তি সম্পন্ন হয়েছে',
      time: '২ ঘন্টা আগে',
      status: 'success' as const,
    },
    {
      type: 'payment',
      message: '৳১৫,০০০ পেমেন্ট গৃহীত হয়েছে',
      time: '৪ ঘন্টা আগে',
      status: 'success' as const,
    },
    {
      type: 'course',
      message: 'নতুন কোর্স "HSC জীববিজ্ঞান" চালু হয়েছে',
      time: '৬ ঘন্টা আগে',
      status: 'info' as const,
    },
    {
      type: 'system',
      message: 'সিস্টেম ব্যাকআপ সম্পন্ন হয়েছে',
      time: '৮ ঘন্টা আগে',
      status: 'info' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconBarChart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">অ্যানালিটিক্স ও রিপোর্ট</h1>
            <p className="text-gray-600 dark:text-gray-400">পারফরম্যান্স ট্র্যাকিং ও ডেটা বিশ্লেষণ</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <IconFilter className="w-4 h-4 text-gray-500" />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="week">এই সপ্তাহ</option>
              <option value="month">এই মাস</option>
              <option value="quarter">এই কোয়ার্টার</option>
              <option value="year">এই বছর</option>
            </select>
          </div>
          <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            <IconDownload className="w-4 h-4" />
            <span>রিপোর্ট ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
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
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">মাসিক ভর্তির পরিসংখ্যান</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {enrollmentData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full" 
                          style={{ width: `${(data.students / data.target) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {data.students}/{data.target}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">সাম্প্রতিক কার্যক্রম</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
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
      </div>

      {/* Course Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">কোর্স পারফরম্যান্স</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  কোর্স
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ভর্তি
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  সম্পন্ন
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  রেটিং
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  আয়
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {coursePerformance.map((course, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{course.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{course.enrolled}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{course.completed}</div>
                    <div className="text-xs text-gray-500">
                      {Math.round((course.completed / course.enrolled) * 100)}% সম্পন্ন
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 dark:text-white">{course.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{course.revenue}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">শিক্ষক পারফরম্যান্স</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  শিক্ষক
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  বিষয়
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  শিক্ষার্থী
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  রেটিং
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ক্লাস
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  উপস্থিতি
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teacherPerformance.map((teacher, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{teacher.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{teacher.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 dark:text-white">{teacher.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{teacher.classes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={teacher.attendance} 
                      variant={parseInt(teacher.attendance) > 95 ? 'success' : 'warning'} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;