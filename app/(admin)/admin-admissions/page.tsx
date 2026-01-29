'use client';

import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import IconInbox from '@/components/icon/icon-inbox';
import IconEye from '@/components/icon/icon-eye';
import IconCheck from '@/components/icon/icon-check';
import IconX from '@/components/icon/icon-x';
import IconFilter from '@/components/icon/icon-filter';
import IconDownload from '@/components/icon/icon-download';

const AdminAdmissionsPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy admissions data
  const admissions = [
    {
      id: '1',
      applicationId: 'ADM-2024-001',
      studentName: 'রাহুল আহমেদ',
      email: 'rahul@example.com',
      phone: '01712345678',
      course: 'HSC পদার্থবিজ্ঞান',
      appliedDate: '2024-01-15',
      status: 'pending',
      documents: ['SSC Certificate', 'Photo', 'ID Card'],
      guardianName: 'মোহাম্মদ আহমেদ',
      guardianPhone: '01798765432',
    },
    {
      id: '2',
      applicationId: 'ADM-2024-002',
      studentName: 'সারা খাতুন',
      email: 'sara@example.com',
      phone: '01823456789',
      course: 'SSC গণিত',
      appliedDate: '2024-01-14',
      status: 'approved',
      documents: ['JSC Certificate', 'Photo', 'Birth Certificate'],
      guardianName: 'আব্দুল করিম',
      guardianPhone: '01687654321',
    },
    {
      id: '3',
      applicationId: 'ADM-2024-003',
      studentName: 'তানভীর হাসান',
      email: 'tanvir@example.com',
      phone: '01934567890',
      course: 'HSC রসায়ন',
      appliedDate: '2024-01-13',
      status: 'rejected',
      documents: ['SSC Certificate', 'Photo'],
      guardianName: 'মোহাম্মদ হাসান',
      guardianPhone: '01576543210',
    },
    {
      id: '4',
      applicationId: 'ADM-2024-004',
      studentName: 'ফাতিমা আক্তার',
      email: 'fatima@example.com',
      phone: '01645678901',
      course: 'HSC জীববিজ্ঞান',
      appliedDate: '2024-01-12',
      status: 'pending',
      documents: ['SSC Certificate', 'Photo', 'Medical Certificate'],
      guardianName: 'আবুল কাশেম',
      guardianPhone: '01465432109',
    },
    {
      id: '5',
      applicationId: 'ADM-2024-005',
      studentName: 'নাফিস রহমান',
      email: 'nafis@example.com',
      phone: '01756789012',
      course: 'SSC ইংরেজি',
      appliedDate: '2024-01-11',
      status: 'approved',
      documents: ['JSC Certificate', 'Photo', 'ID Card', 'Guardian ID'],
      guardianName: 'আব্দুর রহমান',
      guardianPhone: '01354321098',
    },
  ];

  const filteredAdmissions = statusFilter === 'all' 
    ? admissions 
    : admissions.filter(admission => admission.status === statusFilter);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'info';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'অনুমোদিত';
      case 'rejected': return 'প্রত্যাখ্যাত';
      case 'pending': return 'অপেক্ষমাণ';
      default: return status;
    }
  };

  const columns = [
    {
      key: 'applicationId' as keyof typeof admissions[0],
      label: 'আবেদন নম্বর',
      render: (value: any, admission: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{admission.applicationId}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{admission.appliedDate}</p>
        </div>
      ),
    },
    {
      key: 'studentName' as keyof typeof admissions[0],
      label: 'শিক্ষার্থীর তথ্য',
      render: (value: any, admission: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{admission.studentName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{admission.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{admission.phone}</p>
        </div>
      ),
    },
    {
      key: 'course' as keyof typeof admissions[0],
      label: 'কোর্স',
      render: (value: any, admission: any) => (
        <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {admission.course}
        </span>
      ),
    },
    {
      key: 'guardianName' as keyof typeof admissions[0],
      label: 'অভিভাবক',
      render: (value: any, admission: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{admission.guardianName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{admission.guardianPhone}</p>
        </div>
      ),
    },
    {
      key: 'documents' as keyof typeof admissions[0],
      label: 'ডকুমেন্ট',
      render: (value: any, admission: any) => (
        <div className="flex flex-wrap gap-1">
          {admission.documents.map((doc: string, index: number) => (
            <span key={index} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {doc}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'status' as keyof typeof admissions[0],
      label: 'অবস্থা',
      render: (value: any, admission: any) => (
        <StatusBadge 
          status={getStatusText(admission.status)} 
          variant={getStatusVariant(admission.status)} 
        />
      ),
    },
  ];

  const stats = [
    { label: 'মোট আবেদন', value: admissions.length, color: 'bg-blue-500' },
    { label: 'অপেক্ষমাণ', value: admissions.filter(a => a.status === 'pending').length, color: 'bg-yellow-500' },
    { label: 'অনুমোদিত', value: admissions.filter(a => a.status === 'approved').length, color: 'bg-green-500' },
    { label: 'প্রত্যাখ্যাত', value: admissions.filter(a => a.status === 'rejected').length, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconInbox className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ভর্তি আবেদন ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল ভর্তি আবেদনের তালিকা এবং অনুমোদন</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <IconDownload className="w-4 h-4" />
            <span>রিপোর্ট ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <IconInbox className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">আবেদন তালিকা</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <IconFilter className="w-4 h-4 text-gray-500" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">সব অবস্থা</option>
                <option value="pending">অপেক্ষমাণ</option>
                <option value="approved">অনুমোদিত</option>
                <option value="rejected">প্রত্যাখ্যাত</option>
              </select>
            </div>
          </div>
        </div>

        <DataTable
          data={filteredAdmissions}
          columns={columns}
          actions={[
            {
              label: 'বিস্তারিত',
              onClick: (admission) => console.log('View admission:', admission),
              icon: <IconEye className="w-4 h-4" />,
              className: 'text-blue-600 hover:text-blue-900',
            },
            {
              label: 'অনুমোদন',
              onClick: (admission: any) => console.log('Approve admission:', admission),
              icon: <IconCheck className="w-4 h-4" />,
              className: 'text-green-600 hover:text-green-900',
              condition: (admission: any) => admission.status === 'pending',
            },
            {
              label: 'প্রত্যাখ্যান',
              onClick: (admission: any) => console.log('Reject admission:', admission),
              icon: <IconX className="w-4 h-4" />,
              className: 'text-red-600 hover:text-red-900',
              condition: (admission: any) => admission.status === 'pending',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminAdmissionsPage;