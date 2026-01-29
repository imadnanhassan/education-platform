'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createCourseSchema, type CreateCourseFormData } from '@/lib/validations/course';
import IconBook from '@/components/icon/icon-book';
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import IconPlus from '@/components/icon/icon-plus';
import IconTrash from '@/components/icon/icon-trash';
import IconUpload from '@/components/icon/icon-upload';
import IconEye from '@/components/icon/icon-eye';
import IconSave from '@/components/icon/icon-save';
import Link from 'next/link';
import { cn } from '@/utils/cn';

const CreateCoursePage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);
  const [subjects, setSubjects] = useState([
    {
      title: '',
      titleEn: '',
      description: '',
      order: 1,
      chapters: [
        {
          title: '',
          titleEn: '',
          description: '',
          order: 1,
          materials: [
            {
              title: '',
              type: 'video' as const,
              content: '',
              order: 1,
              isRequired: true,
            }
          ]
        }
      ]
    }
  ]);
  const [learningOutcomes, setLearningOutcomes] = useState(['']);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      titleEn: '',
      description: '',
      category: '',
      level: 'beginner',
      duration: 1,
      price: 0,
      currency: 'BDT',
      thumbnail: '',
      instructor: '',
      subjects: subjects,
      tags: [],
      prerequisites: [],
      learningOutcomes: learningOutcomes,
      isPublic: true,
      allowEnrollment: true,
    },
  });

  // Dummy data for dropdowns
  const categories = [
    { id: 'ssc', name: 'SSC (মাধ্যমিক)', nameEn: 'SSC' },
    { id: 'hsc', name: 'HSC (উচ্চ মাধ্যমিক)', nameEn: 'HSC' },
    { id: 'admission', name: 'ভর্তি পরীক্ষা', nameEn: 'Admission' },
    { id: 'skill', name: 'দক্ষতা উন্নয়ন', nameEn: 'Skill Development' },
  ];

  const instructors = [
    { id: 'inst-1', name: 'ড. আহমেদ হাসান', subject: 'পদার্থবিজ্ঞান' },
    { id: 'inst-2', name: 'প্রফেসর রহিমা খাতুন', subject: 'গণিত' },
    { id: 'inst-3', name: 'মোহাম্মদ করিম', subject: 'রসায়ন' },
    { id: 'inst-4', name: 'ড. নাসির উদ্দিন', subject: 'জীববিজ্ঞান' },
  ];

  const materialTypes = [
    { value: 'video', label: 'ভিডিও', icon: '🎥' },
    { value: 'pdf', label: 'PDF ডকুমেন্ট', icon: '📄' },
    { value: 'mcq', label: 'MCQ পরীক্ষা', icon: '❓' },
    { value: 'assignment', label: 'অ্যাসাইনমেন্ট', icon: '📝' },
    { value: 'quiz', label: 'কুইজ', icon: '🧩' },
  ];

  const onSubmit = async (data: any) => {
    try {
      const loadingToast = toast.loading('কোর্স তৈরি করা হচ্ছে...', {
        description: 'অনুগ্রহ করে অপেক্ষা করুন।'
      });

      // Validate the data manually
      const formData = {
        ...data,
        subjects: subjects,
        learningOutcomes: learningOutcomes.filter(outcome => outcome.trim() !== ''),
      };

      // Basic validation
      if (!formData.title || !formData.titleEn || !formData.description || !formData.category || !formData.instructor) {
        toast.error('সব আবশ্যক ক্ষেত্র পূরণ করুন', {
          description: 'অনুগ্রহ করে সব তথ্য সঠিকভাবে দিন।',
          duration: 4000,
        });
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Course data:', formData);
      
      toast.dismiss(loadingToast);
      toast.success('কোর্স সফলভাবে তৈরি হয়েছে!', {
        description: `"${formData.title}" কোর্সটি সংরক্ষণ করা হয়েছে।`,
        duration: 3000,
      });
      
      router.push('/admin-courses');
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('কোর্স তৈরিতে ত্রুটি', {
        description: 'অনুগ্রহ করে আবার চেষ্টা করুন।',
        duration: 4000,
      });
    }
  };

  const addSubject = () => {
    const newSubject = {
      title: '',
      titleEn: '',
      description: '',
      order: subjects.length + 1,
      chapters: [
        {
          title: '',
          titleEn: '',
          description: '',
          order: 1,
          materials: [
            {
              title: '',
              type: 'video' as const,
              content: '',
              order: 1,
              isRequired: true,
            }
          ]
        }
      ]
    };
    setSubjects([...subjects, newSubject]);
    setValue('subjects', [...subjects, newSubject]);
  };

  const removeSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
    setValue('subjects', newSubjects);
  };

  const updateSubject = (index: number, field: string, value: any) => {
    const newSubjects = [...subjects];
    (newSubjects[index] as any)[field] = value;
    setSubjects(newSubjects);
    setValue('subjects', newSubjects);
  };

  const tabs = [
    { id: 'basic', label: 'মৌলিক তথ্য', icon: '📋' },
    { id: 'content', label: 'কোর্স কন্টেন্ট', icon: '📚' },
    { id: 'settings', label: 'সেটিংস', icon: '⚙️' },
    { id: 'preview', label: 'প্রিভিউ', icon: '👁️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link 
            href="/admin-courses"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconBook className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">নতুন কোর্স তৈরি করুন</h1>
            <p className="text-gray-600 dark:text-gray-400">সম্পূর্ণ কোর্স তথ্য এবং কন্টেন্ট যোগ করুন</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <IconEye className="w-4 h-4" />
            <span>প্রিভিউ</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">কোর্স তৈরির অগ্রগতি</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">৩০%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '30%' }}></div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                )}
              >
                <div className="flex items-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Course Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    কোর্সের নাম (বাংলা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                    placeholder="যেমন: HSC পদার্থবিজ্ঞান - সম্পূর্ণ কোর্স"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Course Title English */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    কোর্সের নাম (ইংরেজি) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('titleEn')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                    placeholder="e.g: HSC Physics - Complete Course"
                  />
                  {errors.titleEn && (
                    <p className="text-sm text-red-600">{errors.titleEn.message}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    ক্যাটেগরি <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                  >
                    <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    কোর্সের স্তর <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('level')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                  >
                    <option value="beginner">শুরুর স্তর (Beginner)</option>
                    <option value="intermediate">মধ্যম স্তর (Intermediate)</option>
                    <option value="advanced">উন্নত স্তর (Advanced)</option>
                  </select>
                  {errors.level && (
                    <p className="text-sm text-red-600">{errors.level.message}</p>
                  )}
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    কোর্সের সময়কাল (ঘন্টা) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('duration', { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                    placeholder="৫০"
                  />
                  {errors.duration && (
                    <p className="text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    কোর্সের মূল্য (টাকা) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      {...register('price', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      max="100000"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      placeholder="৫০০০"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">৳</span>
                    </div>
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                {/* Instructor */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    শিক্ষক <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('instructor')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                  >
                    <option value="">শিক্ষক নির্বাচন করুন</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name} - {instructor.subject}
                      </option>
                    ))}
                  </select>
                  {errors.instructor && (
                    <p className="text-sm text-red-600">{errors.instructor.message}</p>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    কোর্স থাম্বনেইল <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      {...register('thumbnail')}
                      type="url"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <IconUpload className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.thumbnail && (
                    <p className="text-sm text-red-600">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  কোর্সের বিবরণ <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('description')}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="কোর্সের সম্পূর্ণ বিবরণ, কী শিখবেন, কোর্সের উদ্দেশ্য ইত্যাদি লিখুন..."
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  পূর্বশর্ত (ঐচ্ছিক)
                </label>
                <Controller
                  name="prerequisites"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value?.join(', ') || ''}
                      onChange={(e) => {
                        const prerequisites = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                        field.onChange(prerequisites);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      placeholder="পূর্বশর্তসমূহ কমা দিয়ে আলাদা করুন (উদাহরণ: গণিত, পদার্থবিজ্ঞান)"
                    />
                  )}
                />
                {errors.prerequisites && (
                  <p className="text-sm text-red-600">{errors.prerequisites.message}</p>
                )}
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    শিক্ষার ফলাফল
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newOutcomes = [...learningOutcomes, ''];
                      setLearningOutcomes(newOutcomes);
                      setValue('learningOutcomes', newOutcomes);
                    }}
                    className="flex items-center space-x-2 px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 transition-colors"
                  >
                    <IconPlus className="w-4 h-4" />
                    <span>যোগ করুন</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        value={outcome}
                        onChange={(e) => {
                          const newOutcomes = [...learningOutcomes];
                          newOutcomes[index] = e.target.value;
                          setLearningOutcomes(newOutcomes);
                          setValue('learningOutcomes', newOutcomes);
                        }}
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                        placeholder="যেমন: পদার্থবিজ্ঞানের মৌলিক ধারণা বুঝতে পারবেন"
                      />
                      {learningOutcomes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newOutcomes = learningOutcomes.filter((_, i) => i !== index);
                            setLearningOutcomes(newOutcomes);
                            setValue('learningOutcomes', newOutcomes);
                          }}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg dark:hover:bg-red-900/20 transition-colors"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">কোর্স কন্টেন্ট</h3>
                <button
                  type="button"
                  onClick={addSubject}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <IconPlus className="w-4 h-4" />
                  <span>নতুন বিষয়</span>
                </button>
              </div>

              <div className="space-y-6">
                {subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                        বিষয় {subjectIndex + 1}
                      </h4>
                      {subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubject(subjectIndex)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg dark:hover:bg-red-900/20 transition-colors"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <input
                        value={subject.title}
                        onChange={(e) => updateSubject(subjectIndex, 'title', e.target.value)}
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                        placeholder="বিষয়ের নাম (বাংলা)"
                      />
                      <input
                        value={subject.titleEn}
                        onChange={(e) => updateSubject(subjectIndex, 'titleEn', e.target.value)}
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                        placeholder="বিষয়ের নাম (ইংরেজি)"
                      />
                    </div>

                    <textarea
                      value={subject.description}
                      onChange={(e) => updateSubject(subjectIndex, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors mb-4"
                      placeholder="বিষয়ের বিবরণ"
                    />

                    {/* Basic Chapter Info */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">অধ্যায়সমূহ</h5>
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p>📚 এই বিষয়ে {subject.chapters.length}টি অধ্যায় রয়েছে</p>
                        <p>🎯 প্রতিটি অধ্যায়ে ভিডিও, PDF, MCQ এবং অ্যাসাইনমেন্ট থাকবে</p>
                        <p>⏱️ আনুমানিক সময়: {subject.chapters.length * 2} ঘন্টা</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">কোর্স সেটিংস</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enrollment Settings */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">ভর্তি সেটিংস</h4>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        {...register('isPublic')}
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">পাবলিক কোর্স</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        {...register('allowEnrollment')}
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">ভর্তি অনুমোদিত</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      সর্বোচ্চ শিক্ষার্থী সংখ্যা (ঐচ্ছিক)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      placeholder="১০০"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">ট্যাগ ও কীওয়ার্ড</h4>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                      placeholder="পদার্থবিজ্ঞান, HSC, বিজ্ঞান"
                      onChange={(e) => {
                        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                        // Just store the tags, don't use setValue for now
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">কোর্স প্রিভিউ</h3>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">কোর্স থাম্বনেইল</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {watch('title') || 'কোর্সের নাম'}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {watch('description') || 'কোর্সের বিবরণ'}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-emerald-600">
                      ৳{watch('price') || 0}
                    </span>
                    <span className="text-sm text-gray-500">
                      {watch('duration') || 0} ঘন্টা
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                    {watch('level') === 'beginner' ? 'শুরুর স্তর' : 
                     watch('level') === 'intermediate' ? 'মধ্যম স্তর' : 'উন্নত স্তর'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin-courses"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              বাতিল
            </Link>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                খসড়া সংরক্ষণ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IconSave className="w-4 h-4" />
                <span>{isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'কোর্স তৈরি করুন'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;