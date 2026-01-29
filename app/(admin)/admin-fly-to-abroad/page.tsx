'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import IconGlobe from '@/components/icon/icon-globe';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSearch from '@/components/icon/icon-search';
import IconFilter from '@/components/icon/icon-filter';

interface Program {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  category: 'olympiad' | 'sat' | 'ielts' | 'extracurricular';
  totalStudents: number;
  successRate: number;
  isActive: boolean;
  createdAt: string;
}

const AdminFlyToAbroadPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data
  const [programs] = useState<Program[]>([
    {
      id: '1',
      name: 'অলিম্পিয়াড প্রস্তুতি',
      nameEn: 'Olympiad Preparation',
      description: 'আন্তর্জাতিক অলিম্পিয়াডের জন্য বিশেষ প্রস্তুতি',
      icon: '🏆',
      category: 'olympiad',
      totalStudents: 450,
      successRate: 85,
      isActive: true,
      createdAt: '২০২৪-০১-১০'
    },
    {
      id: '2',
      name: 'SAT প্রস্তুতি',
      nameEn: 'SAT Preparation',
      description: 'আমেরিকান বিশ্ববিদ্যালয়ে ভর্তির জন্য SAT প্রস্তুতি',
      icon: '📊',
      category: 'sat',
      totalStudents: 320,
      successRate: 78,
      isActive: true,
      createdAt: '২০২৪-০১-১৫'
    },
    {
      id: '3',
      name: 'IELTS প্রস্তুতি',
      nameEn: 'IELTS Preparation',
      description: 'ইংরেজি ভাষা দক্ষতা পরীক্ষার জন্য বিশেষ কোর্স',
      icon: '🗣️',
      category: 'ielts',
      totalStudents: 680,
      successRate: 92,
      isActive: true,
      createdAt: '২০২৪-০১-২০'
    },
    {
      id: '4',
      name: 'এক্সট্রা কারিকুলার',
      nameEn: 'Extra Curricular',
      description: 'বিদেশী বিশ্ববিদ্যালয়ের জন্য অতিরিক্ত কার্যক্রম',
      icon: '🎭',
      category: 'extracurricular',
      totalStudents: 280,
      successRate: 88,
      isActive: false,
      createdAt: '২০২৪-০২-০১'
    }
  ]);

  const categoryNames = {
    olympiad: 'অলিম্পিয়াড',
    sat: 'SAT',
    ielts: 'IELTS',
    extracurricular: 'এক্সট্রা কারিকুলার'
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && program.isActive) ||
                         (filterStatus === 'inactive' && !program.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    toast.success('প্রোগ্রামের স্ট্যাটাস আপডেট হয়েছে!', {
      description: 'পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে।',
      duration: 3000,
    });
  };

  const handleDelete = (id: string, name: string) => {
    toast.success('প্রোগ্রাম মুছে ফেলা হয়েছে!', {
      description: `"${name}" প্রোগ্রামটি সফলভাবে মুছে ফেলা হয়েছে।`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900/20">
            <IconGlobe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">বিদেশে পড়াশোনা ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">আন্তর্জাতিক শিক্ষা প্রোগ্রাম পরিচালনা করুন</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <IconPlus className="w-4 h-4" />
          <span>নতুন প্রোগ্রাম যোগ করুন</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট প্রোগ্রাম</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{programs.length}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full dark:bg-indigo-900/20">
              <IconGlobe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় প্রোগ্রাম</p>
              <p className="text-2xl font-bold text-green-600">{programs.filter(p => p.isActive).length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
              <IconGlobe className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট শিক্ষার্থী</p>
              <p className="text-2xl font-bold text-blue-600">{programs.reduce((sum, p) => sum + p.totalStudents, 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <IconGlobe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">গড় সফলতার হার</p>
              <p className="text-2xl font-bold text-purple-600">{Math.round(programs.reduce((sum, p) => sum + p.successRate, 0) / programs.length)}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
              <IconGlobe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                placeholder="প্রোগ্রাম খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব ক্যাটেগরি</option>
              <option value="olympiad">অলিম্পিয়াড</option>
              <option value="sat">SAT</option>
              <option value="ielts">IELTS</option>
              <option value="extracurricular">এক্সট্রা কারিকুলার</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{program.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{program.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{program.nameEn}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    program.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {program.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-900/20 dark:text-indigo-400">
                    {categoryNames[program.category]}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{program.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{program.totalStudents}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">শিক্ষার্থী</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{program.successRate}%</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">সফলতার হার</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>তৈরি: {program.createdAt}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors">
                  <IconEye className="w-4 h-4" />
                  <span>দেখুন</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 transition-colors">
                  <IconEdit className="w-4 h-4" />
                  <span>সম্পাদনা</span>
                </button>
                <button 
                  onClick={() => handleToggleStatus(program.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    program.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                  }`}
                >
                  {program.isActive ? 'বন্ধ' : 'চালু'}
                </button>
                <button 
                  onClick={() => handleDelete(program.id, program.name)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <IconGlobe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">কোনো প্রোগ্রাম পাওয়া যায়নি</h3>
          <p className="text-gray-600 dark:text-gray-400">অনুসন্ধান পরিবর্তন করুন বা নতুন প্রোগ্রাম যোগ করুন।</p>
        </div>
      )}
    </div>
  );
};

export default AdminFlyToAbroadPage;