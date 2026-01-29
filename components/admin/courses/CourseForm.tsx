'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, CreateCourseFormData } from '@/lib/validations/course';
import { Course, CourseCategory, Subject, Chapter, CourseMaterial } from '@/store/types/course';
import { useCourses } from '@/lib/hooks/useCourses';
import { FormField } from '@/components/ui/FormField';
import { FileUpload } from '@/components/ui/FileUpload';
import { cn } from '@/utils/cn';

// Icons
const IconPlus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const IconTrash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconMove = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

const IconSave = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const IconEye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

interface CourseFormProps {
  course?: Course;
  onSubmit: (data: CreateCourseFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  className?: string;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  course,
  onSubmit,
  onCancel,
  loading = false,
  className,
}) => {
  const { categories, loadCategories } = useCourses();
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateCourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course ? {
      title: course.title,
      titleEn: course.titleEn,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      currency: course.currency,
      thumbnail: course.thumbnail,
      instructor: course.instructor,
      subjects: course.subjects,
      tags: course.tags,
      prerequisites: course.prerequisites,
      learningOutcomes: course.learningOutcomes,
      isPublic: course.isPublic,
      allowEnrollment: course.allowEnrollment,
      maxStudents: course.maxStudents,
    } : {
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
      subjects: [],
      tags: [],
      prerequisites: '',
      learningOutcomes: [],
      isPublic: true,
      allowEnrollment: true,
    },
  });

  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
    move: moveSubject,
  } = useFieldArray({
    control,
    name: 'subjects',
  });

  const {
    fields: outcomeFields,
    append: appendOutcome,
    remove: removeOutcome,
  } = useFieldArray({
    control,
    name: 'learningOutcomes',
  });

  const watchedSubjects = watch('subjects');

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleFormSubmit = async (data: CreateCourseFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const addSubject = () => {
    appendSubject({
      title: '',
      titleEn: '',
      description: '',
      order: subjectFields.length + 1,
      chapters: [],
    });
  };

  const addChapter = (subjectIndex: number) => {
    const currentSubjects = watchedSubjects || [];
    const subject = currentSubjects[subjectIndex];
    if (subject) {
      const newChapter: Chapter = {
        id: `chapter-${Date.now()}`,
        title: '',
        titleEn: '',
        description: '',
        order: subject.chapters.length + 1,
        materials: [],
        estimatedDuration: 0,
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setValue(`subjects.${subjectIndex}.chapters`, [...subject.chapters, newChapter]);
    }
  };

  const removeChapter = (subjectIndex: number, chapterIndex: number) => {
    const currentSubjects = watchedSubjects || [];
    const subject = currentSubjects[subjectIndex];
    if (subject) {
      const updatedChapters = subject.chapters.filter((_, index) => index !== chapterIndex);
      setValue(`subjects.${subjectIndex}.chapters`, updatedChapters);
    }
  };

  const addMaterial = (subjectIndex: number, chapterIndex: number) => {
    const currentSubjects = watchedSubjects || [];
    const chapter = currentSubjects[subjectIndex]?.chapters[chapterIndex];
    if (chapter) {
      const newMaterial: CourseMaterial = {
        id: `material-${Date.now()}`,
        title: '',
        type: 'video',
        content: '',
        order: chapter.materials.length + 1,
        isRequired: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setValue(`subjects.${subjectIndex}.chapters.${chapterIndex}.materials`, [...chapter.materials, newMaterial]);
    }
  };

  const removeMaterial = (subjectIndex: number, chapterIndex: number, materialIndex: number) => {
    const currentSubjects = watchedSubjects || [];
    const chapter = currentSubjects[subjectIndex]?.chapters[chapterIndex];
    if (chapter) {
      const updatedMaterials = chapter.materials.filter((_, index) => index !== materialIndex);
      setValue(`subjects.${subjectIndex}.chapters.${chapterIndex}.materials`, updatedMaterials);
    }
  };

  const addOutcome = () => {
    appendOutcome('');
  };

  const tabs = [
    { id: 'basic', label: 'মূল তথ্য', icon: '📝' },
    { id: 'content', label: 'কোর্স কন্টেন্ট', icon: '📚' },
    { id: 'settings', label: 'সেটিংস', icon: '⚙️' },
    { id: 'preview', label: 'প্রিভিউ', icon: '👁️' },
  ];

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {course ? 'কোর্স সম্পাদনা' : 'নতুন কোর্স তৈরি'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {course ? 'কোর্সের তথ্য আপডেট করুন' : 'একটি নতুন কোর্স তৈরি করুন'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              <IconEye className="w-4 h-4" />
              <span>{previewMode ? 'সম্পাদনা' : 'প্রিভিউ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="কোর্সের নাম (বাংলা)"
                  name="title"
                  control={control}
                  error={errors.title?.message}
                  required
                />
                <FormField
                  label="কোর্সের নাম (ইংরেজি)"
                  name="titleEn"
                  control={control}
                  error={errors.titleEn?.message}
                  required
                />
              </div>

              <FormField
                label="কোর্সের বিবরণ"
                name="description"
                type="textarea"
                control={control}
                error={errors.description?.message}
                rows={4}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ক্যাটেগরি <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    স্তর <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="level"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="beginner">প্রাথমিক</option>
                        <option value="intermediate">মধ্যম</option>
                        <option value="advanced">উন্নত</option>
                      </select>
                    )}
                  />
                </div>

                <FormField
                  label="সময়কাল (ঘন্টা)"
                  name="duration"
                  type="number"
                  control={control}
                  error={errors.duration?.message}
                  min={1}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="মূল্য (টাকা)"
                  name="price"
                  type="number"
                  control={control}
                  error={errors.price?.message}
                  min={0}
                  required
                />
                <FormField
                  label="শিক্ষক আইডি"
                  name="instructor"
                  control={control}
                  error={errors.instructor?.message}
                  placeholder="instructor-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  কোর্স থাম্বনেইল <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      accept="image/*"
                      maxSize={5}
                      onUpload={(files) => {
                        if (files.length > 0) {
                          // In a real app, you would upload the file and get a URL
                          field.onChange(`https://example.com/thumbnails/${files[0].name}`);
                        }
                      }}
                      preview
                      currentFile={field.value}
                    />
                  )}
                />
                {errors.thumbnail && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <FormField
                label="পূর্বশর্ত (ঐচ্ছিক)"
                name="prerequisites"
                type="textarea"
                control={control}
                error={errors.prerequisites?.message}
                rows={2}
                placeholder="এই কোর্সের জন্য কোন পূর্বশর্ত থাকলে লিখুন..."
              />

              {/* Learning Outcomes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    শিক্ষার ফলাফল
                  </label>
                  <button
                    type="button"
                    onClick={addOutcome}
                    className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                  >
                    <IconPlus className="w-4 h-4" />
                    <span>যোগ করুন</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {outcomeFields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Controller
                        name={`learningOutcomes.${index}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder={`ফলাফল ${index + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => removeOutcome(index)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
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
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">কোর্স কন্টেন্ট</h3>
                <button
                  type="button"
                  onClick={addSubject}
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <IconPlus className="w-4 h-4" />
                  <span>বিষয় যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-6">
                {subjectFields.map((subjectField, subjectIndex) => (
                  <div key={subjectField.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        বিষয় {subjectIndex + 1}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {subjectIndex > 0 && (
                          <button
                            type="button"
                            onClick={() => moveSubject(subjectIndex, subjectIndex - 1)}
                            className="text-gray-600 hover:text-gray-700 dark:text-gray-400"
                          >
                            <IconMove className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeSubject(subjectIndex)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <FormField
                        label="বিষয়ের নাম (বাংলা)"
                        name={`subjects.${subjectIndex}.title`}
                        control={control}
                        error={errors.subjects?.[subjectIndex]?.title?.message}
                        required
                      />
                      <FormField
                        label="বিষয়ের নাম (ইংরেজি)"
                        name={`subjects.${subjectIndex}.titleEn`}
                        control={control}
                        error={errors.subjects?.[subjectIndex]?.titleEn?.message}
                        required
                      />
                    </div>

                    <FormField
                      label="বিষয়ের বিবরণ"
                      name={`subjects.${subjectIndex}.description`}
                      type="textarea"
                      control={control}
                      error={errors.subjects?.[subjectIndex]?.description?.message}
                      rows={2}
                      required
                    />

                    {/* Chapters */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">অধ্যায়সমূহ</h5>
                        <button
                          type="button"
                          onClick={() => addChapter(subjectIndex)}
                          className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                        >
                          <IconPlus className="w-3 h-3" />
                          <span>অধ্যায় যোগ করুন</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {watchedSubjects?.[subjectIndex]?.chapters?.map((chapter, chapterIndex) => (
                          <div key={chapterIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h6 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                অধ্যায় {chapterIndex + 1}
                              </h6>
                              <button
                                type="button"
                                onClick={() => removeChapter(subjectIndex, chapterIndex)}
                                className="text-red-600 hover:text-red-700 dark:text-red-400"
                              >
                                <IconTrash className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <FormField
                                label="অধ্যায়ের নাম (বাংলা)"
                                name={`subjects.${subjectIndex}.chapters.${chapterIndex}.title`}
                                control={control}
                                size="sm"
                                required
                              />
                              <FormField
                                label="অধ্যায়ের নাম (ইংরেজি)"
                                name={`subjects.${subjectIndex}.chapters.${chapterIndex}.titleEn`}
                                control={control}
                                size="sm"
                                required
                              />
                            </div>

                            <FormField
                              label="অধ্যায়ের বিবরণ"
                              name={`subjects.${subjectIndex}.chapters.${chapterIndex}.description`}
                              type="textarea"
                              control={control}
                              rows={2}
                              size="sm"
                              required
                            />

                            {/* Materials */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">উপাদানসমূহ</span>
                                <button
                                  type="button"
                                  onClick={() => addMaterial(subjectIndex, chapterIndex)}
                                  className="flex items-center space-x-1 text-xs text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                                >
                                  <IconPlus className="w-3 h-3" />
                                  <span>উপাদান যোগ করুন</span>
                                </button>
                              </div>

                              <div className="space-y-2">
                                {chapter.materials?.map((material, materialIndex) => (
                                  <div key={materialIndex} className="bg-white dark:bg-gray-600 rounded p-2">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">
                                        উপাদান {materialIndex + 1}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => removeMaterial(subjectIndex, chapterIndex, materialIndex)}
                                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                                      >
                                        <IconTrash className="w-3 h-3" />
                                      </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      <FormField
                                        label="উপাদানের নাম"
                                        name={`subjects.${subjectIndex}.chapters.${chapterIndex}.materials.${materialIndex}.title`}
                                        control={control}
                                        size="sm"
                                        required
                                      />
                                      <div>
                                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                          ধরন
                                        </label>
                                        <Controller
                                          name={`subjects.${subjectIndex}.chapters.${chapterIndex}.materials.${materialIndex}.type`}
                                          control={control}
                                          render={({ field }) => (
                                            <select
                                              {...field}
                                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                              <option value="video">ভিডিও</option>
                                              <option value="pdf">PDF</option>
                                              <option value="mcq">MCQ</option>
                                              <option value="assignment">অ্যাসাইনমেন্ট</option>
                                              <option value="text">টেক্সট</option>
                                            </select>
                                          )}
                                        />
                                      </div>
                                      <FormField
                                        label="কন্টেন্ট URL"
                                        name={`subjects.${subjectIndex}.chapters.${chapterIndex}.materials.${materialIndex}.content`}
                                        control={control}
                                        size="sm"
                                        placeholder="https://..."
                                        required
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">কোর্স সেটিংস</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-3">
                    <Controller
                      name="isPublic"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      )}
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        পাবলিক কোর্স
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        কোর্সটি সবার জন্য দৃশ্যমান হবে
                      </p>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <Controller
                      name="allowEnrollment"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      )}
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        ভর্তি অনুমোদন
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        নতুন শিক্ষার্থী ভর্তি হতে পারবে
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <FormField
                label="সর্বোচ্চ শিক্ষার্থী সংখ্যা (ঐচ্ছিক)"
                name="maxStudents"
                type="number"
                control={control}
                error={errors.maxStudents?.message}
                min={1}
                placeholder="সীমাহীন"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ট্যাগসমূহ
                </label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      value={field.value?.join(', ') || ''}
                      onChange={(e) => {
                        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                        field.onChange(tags);
                      }}
                      placeholder="ট্যাগসমূহ কমা দিয়ে আলাদা করুন"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  )}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  উদাহরণ: পদার্থবিজ্ঞান, বিজ্ঞান, HSC
                </p>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">কোর্স প্রিভিউ</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  প্রিভিউ ফিচার শীঘ্রই আসছে...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting || loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {(isSubmitting || loading) && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <IconSave className="w-4 h-4" />
              <span>{course ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};