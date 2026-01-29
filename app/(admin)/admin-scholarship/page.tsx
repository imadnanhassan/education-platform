'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import IconAward from '@/components/icon/icon-award';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSearch from '@/components/icon/icon-search';
import IconFilter from '@/components/icon/icon-filter';
import IconDollarSign from '@/components/icon/icon-dollar-sign';

interface Scholarship {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  amount: number;
  currency: string;
  type: 'merit' | 'need' | 'sports' | 'academic' | 'special';
  eligibility: string;
  deadline: string;
  totalApplicants: number;
  awarded: number;
  isActive: boolean;
  createdAt: string;
}

const AdminScholarshipPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data
  const [scholarships] = useState<Scholarship[]>([
    {
      id: '1',
      title: 'মেধা বৃত্তি',
      titleEn: 'Merit Scholarship',
      description: 'উচ্চ মেধাবী শিক্ষার্থীদের জন্য বিশেষ বৃত্তি',
      amount: 50000,
      currency: 'BDT',
      type: 'merit',
      eligibility: 'GPA 5.00 এবং পারিবারিক আয় ৫ লক্ষের কম',
      deadline: '২০২৪-০৬-৩০',
      totalApplicants: 450,
      awarded: 25,
      isActive: true,
      createdAt: '২০২৪-০১-১৫'
    },
    {
      id: '2',
      title: 'অভাবী শিক্ষার্থী বৃত্তি',
      titleEn: 'Need-based Scholarship',
      description: 'আর্থিকভাবে অসচ্ছল পরিবারের মেধাবী শিক্ষার্থীদের জন্য',
      amount: 30000,
      currency: 'BDT',
      type: 'need',
      eligibility: 'পারিবারিক আয় ৩ লক্ষের কম এবং GPA 4.50+',
      deadline: '২০২৪-০৭-১৫',
      totalApplicants: 680,
      awarded: 40,
      isActive: true,
      createdAt: '২০২৪-০১-২০'
    },
    {
      id: '3',
      title: 'ক্রীড়া বৃত্তি',
      titleEn: 'Sports Scholarship',
      description: 'খেলাধুলায় পারদর্শী শিক্ষার্থীদের জন্য বিশেষ বৃত্তি',
      amount: 25000,
      currency: 'BDT',
      type: 'sports',
      eligibility: 'জাতীয় বা আন্তর্জাতিক পর্যায়ে খেলাধুলায় অংশগ্রহণ',
      deadline: '২০২৪-০৮-৩০',
      totalApplicants: 120,
      awarded: 15,
      isActive: true,
      createdAt: '২০২৪-০২-০১'
    },
    {
      id: '4',
      title: 'একাডেমিক এক্সিলেন্স বৃত্তি',
      titleEn: 'Academic Excellence Scholarship',
      description: 'একাডেমিক ক্ষেত্রে অসাধারণ কৃতিত্বের জন্য',
      amount: 75000,
      currency: 'BDT',
      type: 'academic',
      eligibility: 'বোর্ড পরীক্ষায় প্রথম ১০০ এর মধ্যে স্থান',
      deadline: '২০২৪-০৫-৩১',
      totalApplicants: 200,
      awarded: 10,
      isActive: false,
      createdAt: '২০২৪-০২-১০'
    },
    {
      id: '5',
      title: 'বিশেষ প্রতিভা বৃত্তি',
      titleEn: 'Special Talent Scholarship',
      description: 'বিজ্ঞান, প্রযুক্তি, শিল্পকলায় বিশেষ প্রতিভার জন্য',
      amount: 40000,
      currency: 'BDT',
      type: 'special',
      eligibility: 'বিশেষ প্রতিভার প্রমাণ এবং সুপারিশপত্র',
      deadline: '২০২৪-০৯-১৫',
      totalApplicants: 85,
      awarded: 8,
      isActive: true,
      createdAt: '২০২৪-০২-১৫'
    }
  ]);

  const typeNames = {
    merit: 'মেধা বৃত্তি',
    need: 'অভাবী বৃত্তি',
    sports: 'ক্রীড়া বৃত্তি',
    academic: 'একাডেমিক বৃত্তি',
    special: 'বিশেষ প্রতিভা বৃত্তি'
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.titleEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || scholarship.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && scholarship.isActive) ||
                         (filterStatus === 'inactive' && !scholarship.isActive);
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    toast.success('বৃত্তির স্ট্যাটাস আপডেট হয়েছে!', {
      description: 'পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে।',
      duration: 3000,
    });
  };

  const handleDelete = (id: string, title: string) => {
    toast.success('বৃত্তি মুছে ফেলা হয়েছে!', {
      description: `"${title}" বৃত্তিটি সফলভাবে মুছে ফেলা হয়েছে।`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900/20">
            <IconAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">বৃত্তি ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">শিক্ষার্থীদের জন্য বৃত্তি প্রোগ্রাম পরিচালনা করুন</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
          <IconPlus className="w-4 h-4" />
          <span>নতুন বৃত্তি যোগ করুন</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট বৃত্তি</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{scholarships.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full dark:bg-yellow-900/20">
              <IconAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় বৃত্তি</p>
              <p className="text-2xl font-bold text-green-600">{scholarships.filter(s => s.isActive).length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
              <IconAward className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট আবেদনকারী</p>
              <p className="text-2xl font-bold text-blue-600">{scholarships.reduce((sum, s) => sum + s.totalApplicants, 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <IconAward className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট বৃত্তিপ্রাপ্ত</p>
              <p className="text-2xl font-bold text-purple-600">{scholarships.reduce((sum, s) => sum + s.awarded, 0)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
              <IconAward className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                placeholder="বৃত্তি খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব ধরনের বৃত্তি</option>
              <option value="merit">মেধা বৃত্তি</option>
              <option value="need">অভাবী বৃত্তি</option>
              <option value="sports">ক্রীড়া বৃত্তি</option>
              <option value="academic">একাডেমিক বৃত্তি</option>
              <option value="special">বিশেষ প্রতিভা বৃত্তি</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((scholarship) => (
          <div key={scholarship.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900/20">
                    <IconAward className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{scholarship.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{scholarship.titleEn}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    scholarship.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {scholarship.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-900/20 dark:text-yellow-400">
                    {typeNames[scholarship.type]}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{scholarship.description}</p>

              <div className="flex items-center justify-center mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <IconDollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {scholarship.amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">টাকা</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">বৃত্তির পরিমাণ</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{scholarship.totalApplicants}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">আবেদনকারী</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{scholarship.awarded}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">বৃত্তিপ্রাপ্ত</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">যোগ্যতা:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{scholarship.eligibility}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>শেষ তারিখ: {scholarship.deadline}</span>
                <span>তৈরি: {scholarship.createdAt}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 transition-colors">
                  <IconEye className="w-4 h-4" />
                  <span>দেখুন</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 transition-colors">
                  <IconEdit className="w-4 h-4" />
                  <span>সম্পাদনা</span>
                </button>
                <button 
                  onClick={() => handleToggleStatus(scholarship.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    scholarship.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                  }`}
                >
                  {scholarship.isActive ? 'বন্ধ' : 'চালু'}
                </button>
                <button 
                  onClick={() => handleDelete(scholarship.id, scholarship.title)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <IconAward className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">কোনো বৃত্তি পাওয়া যায়নি</h3>
          <p className="text-gray-600 dark:text-gray-400">অনুসন্ধান পরিবর্তন করুন বা নতুন বৃত্তি যোগ করুন।</p>
        </div>
      )}
    </div>
  );
};

export default AdminScholarshipPage;