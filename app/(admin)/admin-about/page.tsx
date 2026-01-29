'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import IconInfoCircle from '@/components/icon/icon-info-circle';
import IconPlus from '@/components/icon/icon-plus';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSave from '@/components/icon/icon-save';

interface AboutSection {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  type: 'mission' | 'vision' | 'history' | 'team' | 'values' | 'achievements';
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  order: number;
  isActive: boolean;
}

const AdminAboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sections');
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Dummy data for about sections
  const [aboutSections] = useState<AboutSection[]>([
    {
      id: '1',
      title: 'আমাদের লক্ষ্য',
      titleEn: 'Our Mission',
      content: 'আমাদের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে মানসম্পন্ন শিক্ষা প্রদান করা এবং তাদের ভবিষ্যৎ গড়তে সহায়তা করা। আমরা বিশ্বাস করি যে শিক্ষাই পারে একটি জাতিকে এগিয়ে নিয়ে যেতে।',
      type: 'mission',
      order: 1,
      isActive: true,
      createdAt: '২০২৪-০১-১০',
      updatedAt: '২০২৪-০৩-০৫'
    },
    {
      id: '2',
      title: 'আমাদের দৃষ্টিভঙ্গি',
      titleEn: 'Our Vision',
      content: 'আমাদের দৃষ্টিভঙ্গি হলো বাংলাদেশের শিক্ষা ক্ষেত্রে একটি বিপ্লব আনা এবং প্রতিটি শিক্ষার্থীর মধ্যে লুকিয়ে থাকা প্রতিভাকে বিকশিত করা।',
      type: 'vision',
      order: 2,
      isActive: true,
      createdAt: '২০২৪-০১-১০',
      updatedAt: '২০২৪-০৩-০৫'
    },
    {
      id: '3',
      title: 'আমাদের ইতিহাস',
      titleEn: 'Our History',
      content: '২০২০ সালে প্রতিষ্ঠিত আমাদের প্রতিষ্ঠান আজ হাজারো শিক্ষার্থীর স্বপ্ন পূরণের সাথী। আমরা শুরু করেছিলাম ছোট একটি স্বপ্ন নিয়ে, আজ সেই স্বপ্ন বাস্তবায়িত হচ্ছে।',
      type: 'history',
      order: 3,
      isActive: true,
      createdAt: '২০২৪-০১-১৫',
      updatedAt: '২০২৪-০২-২০'
    },
    {
      id: '4',
      title: 'আমাদের মূল্যবোধ',
      titleEn: 'Our Values',
      content: 'সততা, নিষ্ঠা, উৎকর্ষতা এবং উদ্ভাবন - এই চারটি মূল্যবোধের উপর ভিত্তি করে আমরা আমাদের সকল কার্যক্রম পরিচালনা করি।',
      type: 'values',
      order: 4,
      isActive: true,
      createdAt: '২০২৪-০১-২০',
      updatedAt: '২০২৪-০৩-০১'
    },
    {
      id: '5',
      title: 'আমাদের অর্জন',
      titleEn: 'Our Achievements',
      content: '৫০০০+ সফল শিক্ষার্থী, ৯৫% পাস রেট, ১০০+ অভিজ্ঞ শিক্ষক এবং দেশের সেরা শিক্ষা প্রতিষ্ঠানের স্বীকৃতি।',
      type: 'achievements',
      order: 5,
      isActive: true,
      createdAt: '২০২৪-০২-০১',
      updatedAt: '২০২৪-০৩-১০'
    }
  ]);

  // Dummy data for team members
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'ড. আহমেদ হাসান',
      nameEn: 'Dr. Ahmed Hasan',
      position: 'প্রতিষ্ঠাতা ও পরিচালক',
      positionEn: 'Founder & Director',
      bio: 'শিক্ষা ক্ষেত্রে ২০ বছরের অভিজ্ঞতা সম্পন্ন। ঢাকা বিশ্ববিদ্যালয় থেকে পিএইচডি।',
      image: '/assets/images/profile-34.jpeg',
      email: 'ahmed@education.com',
      phone: '+৮৮০ ১৭১২-৩৪৫৬৭৮',
      socialLinks: {
        facebook: 'https://facebook.com/ahmed',
        linkedin: 'https://linkedin.com/in/ahmed'
      },
      order: 1,
      isActive: true
    },
    {
      id: '2',
      name: 'প্রফেসর রহিমা খাতুন',
      nameEn: 'Professor Rahima Khatun',
      position: 'একাডেমিক পরিচালক',
      positionEn: 'Academic Director',
      bio: 'গণিত বিষয়ে বিশেষজ্ঞ। রাজশাহী বিশ্ববিদ্যালয়ের সাবেক অধ্যাপক।',
      image: '/assets/images/profile-16.jpeg',
      email: 'rahima@education.com',
      phone: '+৮৮০ ১৮৯৮-৭৬৫৪৩২',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/rahima'
      },
      order: 2,
      isActive: true
    },
    {
      id: '3',
      name: 'মোহাম্মদ করিম',
      nameEn: 'Mohammad Karim',
      position: 'প্রযুক্তি পরিচালক',
      positionEn: 'Technology Director',
      bio: 'সফটওয়্যার ইঞ্জিনিয়ারিং এ ১৫ বছরের অভিজ্ঞতা। বুয়েট থেকে স্নাতক।',
      image: '/assets/images/user-profile.jpeg',
      email: 'karim@education.com',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/karim',
        twitter: 'https://twitter.com/karim'
      },
      order: 3,
      isActive: true
    }
  ]);

  const sectionTypeNames = {
    mission: 'লক্ষ্য',
    vision: 'দৃষ্টিভঙ্গি',
    history: 'ইতিহাস',
    team: 'টিম',
    values: 'মূল্যবোধ',
    achievements: 'অর্জন'
  };

  const handleSaveSection = (id: string) => {
    setEditingSection(null);
    toast.success('বিভাগ সংরক্ষিত হয়েছে!', {
      description: 'পরিবর্তনগুলি সফলভাবে সংরক্ষণ করা হয়েছে।',
      duration: 3000,
    });
  };

  const handleDeleteSection = (id: string, title: string) => {
    toast.success('বিভাগ মুছে ফেলা হয়েছে!', {
      description: `"${title}" বিভাগটি সফলভাবে মুছে ফেলা হয়েছে।`,
      duration: 3000,
    });
  };

  const handleToggleTeamMember = (id: string) => {
    toast.success('টিম সদস্যের স্ট্যাটাস আপডেট হয়েছে!', {
      description: 'পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে।',
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900/20">
            <IconInfoCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">আমাদের সম্পর্কে ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">প্রতিষ্ঠানের তথ্য এবং টিম সদস্যদের পরিচালনা করুন</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট বিভাগ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{aboutSections.length}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full dark:bg-indigo-900/20">
              <IconInfoCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় বিভাগ</p>
              <p className="text-2xl font-bold text-green-600">{aboutSections.filter(s => s.isActive).length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/20">
              <IconInfoCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">টিম সদস্য</p>
              <p className="text-2xl font-bold text-blue-600">{teamMembers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/20">
              <IconInfoCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় সদস্য</p>
              <p className="text-2xl font-bold text-purple-600">{teamMembers.filter(m => m.isActive).length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900/20">
              <IconInfoCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('sections')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'sections'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              বিভাগসমূহ
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'team'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              টিম সদস্য
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Sections Tab */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">আমাদের সম্পর্কে বিভাগসমূহ</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <IconPlus className="w-4 h-4" />
                  <span>নতুন বিভাগ যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-4">
                {aboutSections.map((section) => (
                  <div key={section.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h4>
                          <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full dark:bg-indigo-900/20 dark:text-indigo-400">
                            {sectionTypeNames[section.type]}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            section.isActive 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {section.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{section.titleEn}</p>
                        
                        {editingSection === section.id ? (
                          <div className="space-y-3">
                            <textarea
                              defaultValue={section.content}
                              rows={4}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleSaveSection(section.id)}
                                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <IconSave className="w-4 h-4" />
                                <span>সংরক্ষণ</span>
                              </button>
                              <button 
                                onClick={() => setEditingSection(null)}
                                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                              >
                                বাতিল
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                        )}
                      </div>
                    </div>

                    {editingSection !== section.id && (
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span>তৈরি: {section.createdAt}</span>
                          <span className="ml-4">আপডেট: {section.updatedAt}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setEditingSection(section.id)}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors text-sm"
                          >
                            <IconEdit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteSection(section.id, section.title)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors text-sm"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">টিম সদস্যগণ</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <IconPlus className="w-4 h-4" />
                  <span>নতুন সদস্য যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          member.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {member.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </span>
                      </div>

                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{member.nameEn}</p>
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">{member.position}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{member.positionEn}</p>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">{member.bio}</p>

                      {(member.email || member.phone) && (
                        <div className="space-y-2 mb-4">
                          {member.email && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                              📧 {member.email}
                            </p>
                          )}
                          {member.phone && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                              📞 {member.phone}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-center space-x-2 mb-4">
                        {member.socialLinks.facebook && (
                          <a href={member.socialLinks.facebook} className="text-blue-600 hover:text-blue-700">
                            📘
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a href={member.socialLinks.linkedin} className="text-blue-700 hover:text-blue-800">
                            💼
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a href={member.socialLinks.twitter} className="text-blue-400 hover:text-blue-500">
                            🐦
                          </a>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 transition-colors">
                          <IconEdit className="w-4 h-4" />
                          <span>সম্পাদনা</span>
                        </button>
                        <button 
                          onClick={() => handleToggleTeamMember(member.id)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            member.isActive
                              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400'
                          }`}
                        >
                          {member.isActive ? 'বন্ধ' : 'চালু'}
                        </button>
                        <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 transition-colors">
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
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

export default AdminAboutPage;