'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import IconBook from '@/components/icon/icon-book';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSearch from '@/components/icon/icon-search';
import IconFilter from '@/components/icon/icon-filter';

interface Subject {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  totalChapters: number;
  totalStudents: number;
  isActive: boolean;
  createdAt: string;
}

const AdminMadeEasyPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data
  const [subjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'গণিত',
      nameEn: 'Mathematics',
      description: 'উচ্চ মাধ্যমিক গণিত সহজ করে শেখার জন্য',
      icon: '📐',
      totalChapters: 15,
      totalStudents: 1250,
      isActive: true,
      createdAt: '২০২৪-০১-১৫'
    },
    {
      id: '2',
      name: 'পদার্থবিজ্ঞান',
      nameEn: 'Physics',
      description: 'পদার্থবিজ্ঞানের জটিল বিষয়গুলো সহজভাবে',
      icon: '⚛️',
      totalChapters: 12,
      totalStudents: 980,
      isActive: true,
      createdAt: '২০২৪-০১-২০'
    },
    {
      id: '3',
      name: 'রসায়ন',
      nameEn: 'Chemistry',
      description: 'রসায়নের মৌলিক ধারণা থেকে উন্নত বিষয়',
      icon: '🧪',
      totalChapters: 18,
      totalStudents: 850,
      isActive: true,
      createdAt: '২০২৪-০১-২৫'
    },
    {
      id: '4',
      name: 'জীববিজ্ঞান',
      nameEn: 'Biology',
      description: 'জীববিজ্ঞানের সকল শাখার বিস্তারিত আলোচনা',
      icon: '🧬',
      totalChapters: 20,
      totalStudents: 720,
      isActive: false,
      createdAt: '২০২৪-০২-০১'
    },
    {
      id: '5',
      name: 'ইংরেজি',
      nameEn: 'English',
      description: 'ইংরেজি ব্যাকরণ ও সাহিত্য সহজ পদ্ধতিতে',
      icon: '📚',
      totalChapters: 10,
      totalStudents: 1100,
      isActive: true,
      createdAt: '২০২৪-০২-০৫'
    }
  ]);

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && subject.isActive) ||
                         (filterStatus === 'inactive' && !subject.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleToggleStatus = (id: string) => {
    toast.success('বিষয়ের স্ট্যাটাস আপডেট হয়েছে!', {
      description: 'পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে।',
      duration: 3000,
    });
  };

  const handleDelete = (id: string, name: string) => {
    toast.success('বিষয় মুছে ফেলা হয়েছে!', {
      description: `"${name}" বিষয়টি সফলভাবে মুছে ফেলা হয়েছে।`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
            <IconBook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Made Easy ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">বিষয়ভিত্তিক সহজ শিক্ষা কন্টেন্ট পরিচালনা করুন</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <IconPlus className="w-4 h-4" />
          <span>নতুন বিষয় যোগ করুন</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট বিষয়</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subjects.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <IconBook className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় বিষয়</p>
              <p className="text-2xl font-bold text-green-600">{subjects.filter(s => s.isActive).length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
              <IconBook className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট অধ্যায়</p>
              <p className="text-2xl font-bold text-purple-600">{subjects.reduce((sum, s) => sum + s.totalChapters, 0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
              <IconBook className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট শিক্ষার্থী</p>
              <p className="text-2xl font-bold text-orange-600">{subjects.reduce((sum, s) => sum + s.totalStudents, 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/20">
              <IconBook className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="বিষয় খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব বিষয়</option>
              <option value="active">সক্রিয় বিষয়</option>
              <option value="inactive">নিষ্ক্রিয় বিষয়</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{subject.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{subject.nameEn}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    subject.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {subject.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{subject.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{subject.totalChapters}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">অধ্যায়</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{subject.totalStudents}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">শিক্ষার্থী</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>তৈরি: {subject.createdAt}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 transition-colors">
                  <IconEye className="w-4 h-4" />
                  <span>দেখুন</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 transition-colors">
                  <IconEdit className="w-4 h-4" />
                  <span>সম্পাদনা</span>
                </button>
                <button 
                  onClick={() => handleToggleStatus(subject.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    subject.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                  }`}
                >
                  {subject.isActive ? 'বন্ধ' : 'চালু'}
                </button>
                <button 
                  onClick={() => handleDelete(subject.id, subject.name)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <IconBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">কোনো বিষয় পাওয়া যায়নি</h3>
          <p className="text-gray-600 dark:text-gray-400">অনুসন্ধান পরিবর্তন করুন বা নতুন বিষয় যোগ করুন।</p>
        </div>
      )}
    </div>
  );
};

export default AdminMadeEasyPage;