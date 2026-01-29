'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import IconUsers from '@/components/icon/icon-users';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSearch from '@/components/icon/icon-search';
import IconFilter from '@/components/icon/icon-filter';
import IconCreditCard from '@/components/icon/icon-credit-card';

interface MembershipPlan {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  duration: number; // in months
  features: string[];
  type: 'basic' | 'premium' | 'vip' | 'lifetime';
  totalMembers: number;
  isActive: boolean;
  createdAt: string;
}

const AdminMembershipPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data
  const [membershipPlans] = useState<MembershipPlan[]>([
    {
      id: '1',
      name: 'বেসিক সদস্যপদ',
      nameEn: 'Basic Membership',
      description: 'মৌলিক সুবিধাসহ সাশ্রয়ী সদস্যপদ',
      price: 500,
      duration: 1,
      features: [
        'সীমিত কোর্স অ্যাক্সেস',
        'বেসিক সাপোর্ট',
        'মাসিক ১০টি ডাউনলোড',
        'কমিউনিটি অ্যাক্সেস'
      ],
      type: 'basic',
      totalMembers: 1250,
      isActive: true,
      createdAt: '২০২৪-০১-১০'
    },
    {
      id: '2',
      name: 'প্রিমিয়াম সদস্যপদ',
      nameEn: 'Premium Membership',
      description: 'উন্নত সুবিধাসহ জনপ্রিয় সদস্যপদ',
      price: 1500,
      duration: 3,
      features: [
        'সব কোর্সে অ্যাক্সেস',
        'প্রাইভেট টিউটরিং',
        'আনলিমিটেড ডাউনলোড',
        'লাইভ ক্লাস অ্যাক্সেস',
        'প্রিমিয়াম সাপোর্ট'
      ],
      type: 'premium',
      totalMembers: 850,
      isActive: true,
      createdAt: '২০২৪-০১-১৫'
    },
    {
      id: '3',
      name: 'ভিআইপি সদস্যপদ',
      nameEn: 'VIP Membership',
      description: 'সর্বোচ্চ সুবিধাসহ এক্সক্লুসিভ সদস্যপদ',
      price: 3000,
      duration: 6,
      features: [
        'সব প্রিমিয়াম সুবিধা',
        'ওয়ান-অন-ওয়ান মেন্টরিং',
        'এক্সক্লুসিভ কন্টেন্ট',
        'ক্যারিয়ার গাইডেন্স',
        '২৪/৭ সাপোর্ট',
        'সার্টিফিকেট প্রাইওরিটি'
      ],
      type: 'vip',
      totalMembers: 320,
      isActive: true,
      createdAt: '২০২৪-০১-২০'
    },
    {
      id: '4',
      name: 'লাইফটাইম সদস্যপদ',
      nameEn: 'Lifetime Membership',
      description: 'একবার পেমেন্টে আজীবন সুবিধা',
      price: 15000,
      duration: 0, // lifetime
      features: [
        'সব ভিআইপি সুবিধা',
        'আজীবন অ্যাক্সেস',
        'নতুন কোর্স ফ্রি',
        'এক্সক্লুসিভ ইভেন্ট',
        'স্পেশাল ডিসকাউন্ট',
        'প্রাইভেট কমিউনিটি'
      ],
      type: 'lifetime',
      totalMembers: 150,
      isActive: false,
      createdAt: '২০২৪-০২-০১'
    }
  ]);

  const typeNames = {
    basic: 'বেসিক',
    premium: 'প্রিমিয়াম',
    vip: 'ভিআইপি',
    lifetime: 'লাইফটাইম'
  };

  const typeColors = {
    basic: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    premium: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    vip: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    lifetime: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
  };

  const filteredPlans = membershipPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || plan.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && plan.isActive) ||
                         (filterStatus === 'inactive' && !plan.isActive);
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    toast.success('সদস্যপদের স্ট্যাটাস আপডেট হয়েছে!', {
      description: 'পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে।',
      duration: 3000,
    });
  };

  const handleDelete = (id: string, name: string) => {
    toast.success('সদস্যপদ মুছে ফেলা হয়েছে!', {
      description: `"${name}" সদস্যপদটি সফলভাবে মুছে ফেলা হয়েছে।`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
            <IconUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">সদস্যপদ ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">বিভিন্ন সদস্যপদ প্ল্যান পরিচালনা করুন</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <IconPlus className="w-4 h-4" />
          <span>নতুন প্ল্যান যোগ করুন</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট প্ল্যান</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{membershipPlans.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
              <IconUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় প্ল্যান</p>
              <p className="text-2xl font-bold text-green-600">{membershipPlans.filter(p => p.isActive).length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
              <IconUsers className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট সদস্য</p>
              <p className="text-2xl font-bold text-blue-600">{membershipPlans.reduce((sum, p) => sum + p.totalMembers, 0).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <IconUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট আয়</p>
              <p className="text-2xl font-bold text-orange-600">
                ৳{membershipPlans.reduce((sum, p) => sum + (p.price * p.totalMembers), 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full dark:bg-orange-900/20">
              <IconCreditCard className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
                placeholder="সদস্যপদ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব ধরনের প্ল্যান</option>
              <option value="basic">বেসিক</option>
              <option value="premium">প্রিমিয়াম</option>
              <option value="vip">ভিআইপি</option>
              <option value="lifetime">লাইফটাইম</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">সব স্ট্যাটাস</option>
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>
        </div>
      </div>

      {/* Membership Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                    <IconUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{plan.nameEn}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    plan.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {plan.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[plan.type]}`}>
                    {typeNames[plan.type]}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>

              <div className="flex items-center justify-center mb-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ৳{plan.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {plan.duration === 0 ? 'আজীবন' : `${plan.duration} মাস`}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">সুবিধাসমূহ:</h4>
                <ul className="space-y-1">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 3 && (
                    <li className="text-xs text-purple-600 dark:text-purple-400">
                      +{plan.features.length - 3} আরও সুবিধা
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-4">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{plan.totalMembers}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">সক্রিয় সদস্য</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>তৈরি: {plan.createdAt}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-400 transition-colors">
                  <IconEye className="w-4 h-4" />
                  <span>দেখুন</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 transition-colors">
                  <IconEdit className="w-4 h-4" />
                  <span>সম্পাদনা</span>
                </button>
                <button 
                  onClick={() => handleToggleStatus(plan.id)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    plan.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                  }`}
                >
                  {plan.isActive ? 'বন্ধ' : 'চালু'}
                </button>
                <button 
                  onClick={() => handleDelete(plan.id, plan.name)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <IconUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">কোনো সদস্যপদ পাওয়া যায়নি</h3>
          <p className="text-gray-600 dark:text-gray-400">অনুসন্ধান পরিবর্তন করুন বা নতুন প্ল্যান যোগ করুন।</p>
        </div>
      )}
    </div>
  );
};

export default AdminMembershipPage;