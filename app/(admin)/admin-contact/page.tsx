'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import IconMessage from '@/components/icon/icon-message';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSearch from '@/components/icon/icon-search';
import IconFilter from '@/components/icon/icon-filter';
import IconPhone from '@/components/icon/icon-phone';
import IconMail from '@/components/icon/icon-mail';
import IconMapPin from '@/components/icon/icon-map-pin';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: 'inquiry' | 'complaint' | 'suggestion' | 'support' | 'admission';
  status: 'new' | 'read' | 'replied' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  repliedAt?: string;
}

interface ContactInfo {
  id: string;
  type: 'phone' | 'email' | 'address' | 'social';
  label: string;
  value: string;
  icon: string;
  isActive: boolean;
  order: number;
}

const AdminContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data for messages
  const [messages] = useState<ContactMessage[]>([
    {
      id: '1',
      name: 'আহমেদ হাসান',
      email: 'ahmed@example.com',
      phone: '০১৭১২৩৪৫৬৭৮',
      subject: 'HSC কোর্স সম্পর্কে জানতে চাই',
      message: 'আমি HSC পদার্থবিজ্ঞান কোর্স নিতে চাই। কোর্সের ফি এবং সময়সূচী জানাবেন।',
      type: 'inquiry',
      status: 'new',
      priority: 'medium',
      createdAt: '২০২৪-০৩-১৫ ১০:৩০',
    },
    {
      id: '2',
      name: 'ফাতিমা খাতুন',
      email: 'fatima@example.com',
      phone: '০১৮৯৮৭৬৫৪৩২',
      subject: 'ভর্তি প্রক্রিয়া',
      message: 'আমার মেয়ে ক্লাস ১০ এ পড়ে। ভর্তির জন্য কী কী কাগজপত্র লাগবে?',
      type: 'admission',
      status: 'read',
      priority: 'high',
      createdAt: '২০২৪-০৩-১৪ ১৪:২০',
    },
    {
      id: '3',
      name: 'করিম উদ্দিন',
      email: 'karim@example.com',
      subject: 'ওয়েবসাইটে সমস্যা',
      message: 'লগইন করতে পারছি না। পাসওয়ার্ড রিসেট করার পরেও একই সমস্যা।',
      type: 'support',
      status: 'replied',
      priority: 'urgent',
      createdAt: '২০২৪-০৩-১৩ ০৯:১৫',
      repliedAt: '২০২৪-০৩-১৩ ১১:৩০',
    },
    {
      id: '4',
      name: 'রহিমা বেগম',
      email: 'rahima@example.com',
      subject: 'কোর্সের মান উন্নতির পরামর্শ',
      message: 'গণিত কোর্সে আরও বেশি অনুশীলনী যোগ করলে ভালো হয়।',
      type: 'suggestion',
      status: 'resolved',
      priority: 'low',
      createdAt: '২০২৪-০৩-১২ ১৬:৪৫',
    }
  ]);

  // Dummy data for contact info
  const [contactInfo] = useState<ContactInfo[]>([
    {
      id: '1',
      type: 'phone',
      label: 'প্রধান ফোন',
      value: '+৮৮০ ১৭১২-৩৪৫৬৭৮',
      icon: '📞',
      isActive: true,
      order: 1
    },
    {
      id: '2',
      type: 'phone',
      label: 'হটলাইন',
      value: '+৮৮০ ১৮৯৮-৭৬৫৪ৣ২',
      icon: '🔥',
      isActive: true,
      order: 2
    },
    {
      id: '3',
      type: 'email',
      label: 'প্রধান ইমেইল',
      value: 'info@education.com',
      icon: '📧',
      isActive: true,
      order: 3
    },
    {
      id: '4',
      type: 'email',
      label: 'সাপোর্ট ইমেইল',
      value: 'support@education.com',
      icon: '🛠️',
      isActive: true,
      order: 4
    },
    {
      id: '5',
      type: 'address',
      label: 'প্রধান ঠিকানা',
      value: '১২৩ শিক্ষা ভবন, ঢাকা-১২০০, বাংলাদেশ',
      icon: '📍',
      isActive: true,
      order: 5
    }
  ]);

  const typeNames = {
    inquiry: 'অনুসন্ধান',
    complaint: 'অভিযোগ',
    suggestion: 'পরামর্শ',
    support: 'সাপোর্ট',
    admission: 'ভর্তি'
  };

  const statusNames = {
    new: 'নতুন',
    read: 'পড়া হয়েছে',
    replied: 'উত্তর দেওয়া হয়েছে',
    resolved: 'সমাধান হয়েছে',
    closed: 'বন্ধ'
  };

  const priorityNames = {
    low: 'কম',
    medium: 'মাঝারি',
    high: 'বেশি',
    urgent: 'জরুরি'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  const statusColors = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    read: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    replied: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    resolved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
    closed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || message.type === filterType;
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleReply = (id: string) => {
    toast.success('উত্তর পাঠানো হয়েছে!', {
      description: 'বার্তার উত্তর সফলভাবে পাঠানো হয়েছে।',
      duration: 3000,
    });
  };

  const handleMarkAsRead = (id: string) => {
    toast.success('পড়া হয়েছে হিসেবে চিহ্নিত!', {
      description: 'বার্তাটি পড়া হয়েছে হিসেবে চিহ্নিত করা হয়েছে।',
      duration: 3000,
    });
  };

  const handleDelete = (id: string) => {
    toast.success('বার্তা মুছে ফেলা হয়েছে!', {
      description: 'বার্তাটি সফলভাবে মুছে ফেলা হয়েছে।',
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 rounded-lg dark:bg-teal-900/20">
            <IconMessage className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">যোগাযোগ ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">বার্তা এবং যোগাযোগের তথ্য পরিচালনা করুন</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট বার্তা</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
            </div>
            <div className="p-3 bg-teal-100 rounded-full dark:bg-teal-900/20">
              <IconMessage className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">নতুন বার্তা</p>
              <p className="text-2xl font-bold text-green-600">{messages.filter(m => m.status === 'new').length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
              <IconMessage className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">জরুরি বার্তা</p>
              <p className="text-2xl font-bold text-red-600">{messages.filter(m => m.priority === 'urgent').length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/20">
              <IconMessage className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সমাধান হয়েছে</p>
              <p className="text-2xl font-bold text-blue-600">{messages.filter(m => m.status === 'resolved').length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <IconMessage className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'messages'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              বার্তাসমূহ
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'info'
                  ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              যোগাযোগের তথ্য
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="বার্তা খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <IconFilter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">সব ধরনের বার্তা</option>
                    <option value="inquiry">অনুসন্ধান</option>
                    <option value="complaint">অভিযোগ</option>
                    <option value="suggestion">পরামর্শ</option>
                    <option value="support">সাপোর্ট</option>
                    <option value="admission">ভর্তি</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="all">সব স্ট্যাটাস</option>
                    <option value="new">নতুন</option>
                    <option value="read">পড়া হয়েছে</option>
                    <option value="replied">উত্তর দেওয়া হয়েছে</option>
                    <option value="resolved">সমাধান হয়েছে</option>
                    <option value="closed">বন্ধ</option>
                  </select>
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{message.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[message.priority]}`}>
                            {priorityNames[message.priority]}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[message.status]}`}>
                            {statusNames[message.status]}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="flex items-center space-x-1">
                            <IconMail className="w-4 h-4" />
                            <span>{message.email}</span>
                          </span>
                          {message.phone && (
                            <span className="flex items-center space-x-1">
                              <IconPhone className="w-4 h-4" />
                              <span>{message.phone}</span>
                            </span>
                          )}
                          <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs dark:bg-teal-900/20 dark:text-teal-400">
                            {typeNames[message.type]}
                          </span>
                        </div>
                        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">{message.subject}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{message.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span>পাঠানো: {message.createdAt}</span>
                        {message.repliedAt && (
                          <span className="ml-4">উত্তর: {message.repliedAt}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleReply(message.id)}
                          className="px-3 py-1 bg-teal-100 text-teal-700 rounded hover:bg-teal-200 dark:bg-teal-900/20 dark:text-teal-400 transition-colors text-sm"
                        >
                          উত্তর দিন
                        </button>
                        <button 
                          onClick={() => handleMarkAsRead(message.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 transition-colors text-sm"
                        >
                          পড়া হয়েছে
                        </button>
                        <button 
                          onClick={() => handleDelete(message.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors text-sm"
                        >
                          মুছুন
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <IconMessage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">কোনো বার্তা পাওয়া যায়নি</h3>
                  <p className="text-gray-600 dark:text-gray-400">অনুসন্ধান পরিবর্তন করুন।</p>
                </div>
              )}
            </div>
          )}

          {/* Contact Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">যোগাযোগের তথ্য</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <IconPlus className="w-4 h-4" />
                  <span>নতুন তথ্য যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info) => (
                  <div key={info.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{info.icon}</div>
                        <div>
                          <h4 className="text-md font-semibold text-gray-900 dark:text-white">{info.label}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{info.type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        info.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {info.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">{info.value}</p>

                    <div className="flex items-center space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 dark:bg-teal-900/20 dark:text-teal-400 transition-colors">
                        <IconEdit className="w-4 h-4" />
                        <span>সম্পাদনা</span>
                      </button>
                      <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors">
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContactPage;