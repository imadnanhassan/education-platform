'use client';

import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import IconBook from '@/components/icon/icon-book';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import Link from 'next/link';

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: '1',
      title: 'HSC পদার্থবিজ্ঞান',
      instructor: 'ড. আহমেদ হাসান',
      duration: '6 মাস',
      price: 5000,
      enrolledStudents: 45,
      status: 'active',
      category: 'HSC',
    },
    {
      id: '2',
      title: 'SSC গণিত',
      instructor: 'প্রফেসর রহিমা খাতুন',
      duration: '4 মাস',
      price: 3500,
      enrolledStudents: 67,
      status: 'active',
      category: 'SSC',
    },
  ];

  const columns = [
    {
      key: 'title' as keyof typeof courses[0],
      label: 'কোর্সের নাম',
      render: (value: any, course: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor}</p>
        </div>
      ),
    },
    {
      key: 'category' as keyof typeof courses[0],
      label: 'ক্যাটেগরি',
      render: (value: any, course: any) => (
        <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {course.category}
        </span>
      ),
    },
    {
      key: 'enrolledStudents' as keyof typeof courses[0],
      label: 'শিক্ষার্থী',
      render: (value: any, course: any) => course.enrolledStudents,
    },
    {
      key: 'price' as keyof typeof courses[0],
      label: 'মূল্য',
      render: (value: any, course: any) => `৳${course.price.toLocaleString()}`,
    },
    {
      key: 'status' as keyof typeof courses[0],
      label: 'অবস্থা',
      render: (value: any, course: any) => (
        <StatusBadge 
          status={course.status === 'active' ? 'সক্রিয়' : 'খসড়া'} 
          variant={course.status === 'active' ? 'success' : 'warning'} 
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconBook className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">কোর্স ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল কোর্সের তালিকা এবং তথ্য</p>
          </div>
        </div>
        <Link 
          href="/admin-courses/create"
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <IconPlus className="w-4 h-4" />
          <span>নতুন কোর্স</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">কোর্স তালিকা</h2>
        </div>
        <DataTable
          data={courses}
          columns={columns}
          actions={[
            {
              label: 'দেখুন',
              onClick: (course) => console.log('View course:', course),
              icon: <IconEye className="w-4 h-4" />,
              className: 'text-blue-600 hover:text-blue-900',
            },
            {
              label: 'সম্পাদনা',
              onClick: (course) => window.location.href = `/admin-courses/${course.id}/edit`,
              icon: <IconEdit className="w-4 h-4" />,
              className: 'text-emerald-600 hover:text-emerald-900',
            },
            {
              label: 'মুছুন',
              onClick: (course) => console.log('Delete course:', course),
              icon: <IconTrash className="w-4 h-4" />,
              className: 'text-red-600 hover:text-red-900',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CoursesPage;