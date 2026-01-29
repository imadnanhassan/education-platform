'use client';

import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import IconUsers from '@/components/icon/icon-users';
import IconPlus from '@/components/icon/icon-plus';
import IconEye from '@/components/icon/icon-eye';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconUsersGroup from '@/components/icon/icon-users-group';
import Link from 'next/link';

const AdminClubsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy clubs data
  const clubs = [
    {
      id: '1',
      name: 'বিজ্ঞান ক্লাব',
      nameEn: 'Science Club',
      description: 'বিজ্ঞান বিষয়ক গবেষণা ও প্রতিযোগিতার জন্য',
      advisor: 'ড. আহমেদ হাসান',
      president: 'রাহুল আহমেদ',
      members: 45,
      establishedDate: '2020-03-15',
      status: 'active',
      category: 'Academic',
      activities: ['বিজ্ঞান মেলা', 'গবেষণা প্রতিযোগিতা', 'ওয়ার্কশপ'],
      meetingSchedule: 'প্রতি শুক্রবার ৩:০০ PM',
    },
    {
      id: '2',
      name: 'সাহিত্য সংসদ',
      nameEn: 'Literature Society',
      description: 'সাহিত্য চর্চা ও সৃজনশীল লেখালেখির জন্য',
      advisor: 'প্রফেসর রহিমা খাতুন',
      president: 'সারা খাতুন',
      members: 32,
      establishedDate: '2019-09-10',
      status: 'active',
      category: 'Cultural',
      activities: ['কবিতা আবৃত্তি', 'গল্প লেখা', 'সাহিত্য আলোচনা'],
      meetingSchedule: 'প্রতি বৃহস্পতিবার ২:৩০ PM',
    },
    {
      id: '3',
      name: 'ডিবেট ক্লাব',
      nameEn: 'Debate Club',
      description: 'বিতর্ক ও বক্তৃতা দক্ষতা উন্নয়নের জন্য',
      advisor: 'মোহাম্মদ করিম',
      president: 'তানভীর হাসান',
      members: 28,
      establishedDate: '2021-01-20',
      status: 'active',
      category: 'Academic',
      activities: ['বিতর্ক প্রতিযোগিতা', 'পাবলিক স্পিকিং', 'মডেল ইউএন'],
      meetingSchedule: 'প্রতি সোমবার ৪:০০ PM',
    },
    {
      id: '4',
      name: 'ফটোগ্রাফি ক্লাব',
      nameEn: 'Photography Club',
      description: 'ফটোগ্রাফি ও ভিজ্যুয়াল আর্ট চর্চার জন্য',
      advisor: 'আব্দুল রহমান',
      president: 'ফাতিমা আক্তার',
      members: 22,
      establishedDate: '2021-06-05',
      status: 'inactive',
      category: 'Creative',
      activities: ['ফটো ওয়াক', 'প্রদর্শনী', 'ওয়ার্কশপ'],
      meetingSchedule: 'প্রতি শনিবার ১০:০০ AM',
    },
    {
      id: '5',
      name: 'পরিবেশ ক্লাব',
      nameEn: 'Environment Club',
      description: 'পরিবেশ সংরক্ষণ ও সচেতনতার জন্য',
      advisor: 'ড. নাসির উদ্দিন',
      president: 'নাফিস রহমান',
      members: 38,
      establishedDate: '2020-08-12',
      status: 'active',
      category: 'Social',
      activities: ['বৃক্ষরোপণ', 'পরিচ্ছন্নতা অভিযান', 'সেমিনার'],
      meetingSchedule: 'প্রতি বুধবার ৩:৩০ PM',
    },
  ];

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.advisor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'success' : 'warning';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Cultural': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Creative': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'Social': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const columns = [
    {
      key: 'name' as keyof typeof clubs[0],
      label: 'ক্লাবের নাম',
      render: (value: any, club: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{club.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{club.nameEn}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{club.description}</p>
        </div>
      ),
    },
    {
      key: 'advisor' as keyof typeof clubs[0],
      label: 'উপদেষ্টা ও সভাপতি',
      render: (value: any, club: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">উপদেষ্টা: {club.advisor}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">সভাপতি: {club.president}</p>
        </div>
      ),
    },
    {
      key: 'category' as keyof typeof clubs[0],
      label: 'ক্যাটেগরি',
      render: (value: any, club: any) => (
        <span className={`px-2 py-1 text-sm rounded-full ${getCategoryColor(club.category)}`}>
          {club.category}
        </span>
      ),
    },
    {
      key: 'members' as keyof typeof clubs[0],
      label: 'সদস্য সংখ্যা',
      render: (value: any, club: any) => (
        <div className="flex items-center space-x-2">
          <IconUsersGroup className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{club.members}</span>
        </div>
      ),
    },
    {
      key: 'meetingSchedule' as keyof typeof clubs[0],
      label: 'সভার সময়',
      render: (value: any, club: any) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">{club.meetingSchedule}</span>
      ),
    },
    {
      key: 'status' as keyof typeof clubs[0],
      label: 'অবস্থা',
      render: (value: any, club: any) => (
        <StatusBadge 
          status={getStatusText(club.status)} 
          variant={getStatusVariant(club.status)} 
        />
      ),
    },
  ];

  const stats = [
    { label: 'মোট ক্লাব', value: clubs.length, color: 'bg-blue-500' },
    { label: 'সক্রিয় ক্লাব', value: clubs.filter(c => c.status === 'active').length, color: 'bg-green-500' },
    { label: 'মোট সদস্য', value: clubs.reduce((sum, club) => sum + club.members, 0), color: 'bg-purple-500' },
    { label: 'নিষ্ক্রিয় ক্লাব', value: clubs.filter(c => c.status === 'inactive').length, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconUsers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ক্লাব ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল ক্লাবের তালিকা এবং কার্যক্রম</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          <IconPlus className="w-4 h-4" />
          <span>নতুন ক্লাব</span>
        </button>
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
                <IconUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">ক্লাব তালিকা</h2>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="ক্লাব খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <DataTable
          data={filteredClubs}
          columns={columns}
          actions={[
            {
              label: 'বিস্তারিত',
              onClick: (club) => console.log('View club:', club),
              icon: <IconEye className="w-4 h-4" />,
              className: 'text-blue-600 hover:text-blue-900',
            },
            {
              label: 'সম্পাদনা',
              onClick: (club) => console.log('Edit club:', club),
              icon: <IconEdit className="w-4 h-4" />,
              className: 'text-emerald-600 hover:text-emerald-900',
            },
            {
              label: 'মুছুন',
              onClick: (club) => console.log('Delete club:', club),
              icon: <IconTrash className="w-4 h-4" />,
              className: 'text-red-600 hover:text-red-900',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminClubsPage;