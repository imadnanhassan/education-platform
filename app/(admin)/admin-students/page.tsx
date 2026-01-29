'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import IconUsers from '@/components/icon/icon-users';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import Link from 'next/link';

const StudentsPage: React.FC = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy student data
  const students = [
    {
      id: '1',
      name: 'রাহুল আহমেদ',
      email: 'rahul@example.com',
      phone: '01712345678',
      class: 'HSC 2024',
      subjects: ['পদার্থবিজ্ঞান', 'রসায়ন', 'গণিত'],
      status: 'active',
      enrolledDate: '2024-01-15',
      avatar: null,
    },
    {
      id: '2',
      name: 'সারা খাতুন',
      email: 'sara@example.com',
      phone: '01812345678',
      class: 'SSC 2024',
      subjects: ['বাংলা', 'ইংরেজি', 'গণিত'],
      status: 'active',
      enrolledDate: '2024-01-20',
      avatar: null,
    },
    {
      id: '3',
      name: 'করিম উদ্দিন',
      email: 'karim@example.com',
      phone: '01912345678',
      class: 'HSC 2024',
      subjects: ['জীববিজ্ঞান', 'রসায়ন'],
      status: 'inactive',
      enrolledDate: '2024-02-01',
      avatar: null,
    },
  ];

  const columns = [
    {
      key: 'name' as keyof typeof students[0],
      label: 'নাম',
      render: (value: any, student: any) => (
        <div className="flex items-center space-x-3">
          {student.avatar ? (
            <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {student.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone' as keyof typeof students[0],
      label: 'ফোন',
      render: (value: any, student: any) => student.phone,
    },
    {
      key: 'class' as keyof typeof students[0],
      label: 'ক্লাস',
      render: (value: any, student: any) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900 dark:text-blue-200">
          {student.class}
        </span>
      ),
    },
    {
      key: 'subjects' as keyof typeof students[0],
      label: 'বিষয়সমূহ',
      render: (value: any, student: any) => (
        <div className="flex flex-wrap gap-1">
          {student.subjects.slice(0, 2).map((subject: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300">
              {subject}
            </span>
          ))}
          {student.subjects.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300">
              +{student.subjects.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'status' as keyof typeof students[0],
      label: 'অবস্থা',
      render: (value: any, student: any) => (
        <StatusBadge 
          status={student.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} 
          variant={student.status === 'active' ? 'success' : 'error'} 
        />
      ),
    },
    {
      key: 'enrolledDate' as keyof typeof students[0],
      label: 'ভর্তির তারিখ',
      render: (value: any, student: any) => new Date(student.enrolledDate).toLocaleDateString('bn-BD'),
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconUsers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">শিক্ষার্থী ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল শিক্ষার্থীর তালিকা এবং তথ্য</p>
          </div>
        </div>
        <Link 
          href="/admin-students/create"
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <IconPlus className="w-4 h-4" />
          <span>নতুন শিক্ষার্থী</span>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">মোট শিক্ষার্থী</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{students.length}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <IconUsers className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">সক্রিয় শিক্ষার্থী</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                {students.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <IconUsers className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">HSC শিক্ষার্থী</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                {students.filter(s => s.class.includes('HSC')).length}
              </p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <IconUsers className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">SSC শিক্ষার্থী</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-1">
                {students.filter(s => s.class.includes('SSC')).length}
              </p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <IconUsers className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">শিক্ষার্থী তালিকা</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
        <DataTable
          data={filteredStudents}
          columns={columns}
          actions={[
            {
              label: 'দেখুন',
              onClick: (student) => console.log('View student:', student),
              icon: <IconEye className="w-4 h-4" />,
              className: 'text-blue-600 hover:text-blue-900',
            },
            {
              label: 'সম্পাদনা',
              onClick: (student) => window.location.href = `/admin-students/${student.id}/edit`,
              icon: <IconEdit className="w-4 h-4" />,
              className: 'text-emerald-600 hover:text-emerald-900',
            },
            {
              label: 'মুছুন',
              onClick: (student) => console.log('Delete student:', student),
              icon: <IconTrash className="w-4 h-4" />,
              className: 'text-red-600 hover:text-red-900',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StudentsPage;