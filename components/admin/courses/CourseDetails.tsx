'use client';

import React, { useState } from 'react';
import { Course } from '@/store/types/course';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { CourseStatusManager } from './CourseStatusManager';

// Icons
const IconEdit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconPublish = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
  </svg>
);

const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconTag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const IconBook = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconPlay = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconDocument = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconQuiz = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface CourseDetailsProps {
  course: Course;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onStatusChange?: (courseId: string, newStatus: Course['status'], reason?: string) => void;
  className?: string;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  onPublish,
  onUnpublish,
  onStatusChange,
  className,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = () => {
    const configs = {
      published: { label: 'প্রকাশিত', className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
      draft: { label: 'খসড়া', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' },
      under_review: { label: 'পর্যালোচনায়', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
      archived: { label: 'সংরক্ষিত', className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
    };
    const config = configs[course.status];
    return (
      <span className={cn('px-3 py-1 text-sm font-medium rounded-full', config.className)}>
        {config.label}
      </span>
    );
  };

  const getLevelBadge = () => {
    const configs = {
      beginner: { label: 'প্রাথমিক', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
      intermediate: { label: 'মধ্যম', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' },
      advanced: { label: 'উন্নত', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' },
    };
    const config = configs[course.level];
    return (
      <span className={cn('px-2 py-1 text-xs font-medium rounded-full', config.className)}>
        {config.label}
      </span>
    );
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <IconPlay className="w-4 h-4 text-red-500" />;
      case 'pdf':
        return <IconDocument className="w-4 h-4 text-blue-500" />;
      case 'mcq':
      case 'quiz':
        return <IconQuiz className="w-4 h-4 text-green-500" />;
      case 'assignment':
        return <IconBook className="w-4 h-4 text-purple-500" />;
      default:
        return <IconDocument className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'সংক্ষিপ্ত তথ্য', icon: '📋' },
    { id: 'content', label: 'কোর্স কন্টেন্ট', icon: '📚' },
    { id: 'students', label: 'শিক্ষার্থী', icon: '👥' },
    { id: 'status', label: 'অবস্থা ব্যবস্থাপনা', icon: '⚙️' },
    { id: 'analytics', label: 'পরিসংখ্যান', icon: '📊' },
  ];

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700', className)}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {course.title}
                </h1>
                {getStatusBadge()}
                {getLevelBadge()}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {course.titleEn}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <IconUsers className="w-4 h-4" />
                  <span>{course.totalStudents} শিক্ষার্থী</span>
                </div>
                <div className="flex items-center space-x-1">
                  <IconStar className="w-4 h-4 text-yellow-400" />
                  <span>{course.rating.toFixed(1)} ({course.totalRatings} রিভিউ)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <IconClock className="w-4 h-4" />
                  <span>{course.duration} ঘন্টা</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">৳{course.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {course.status === 'draft' && onPublish && (
              <button
                onClick={onPublish}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <IconPublish className="w-4 h-4" />
                <span>প্রকাশ করুন</span>
              </button>
            )}
            {course.status === 'published' && onUnpublish && (
              <button
                onClick={onUnpublish}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span>অপ্রকাশিত করুন</span>
              </button>
            )}
            <Link
              href={`/admin-courses/${course.id}/edit`}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <IconEdit className="w-4 h-4" />
              <span>সম্পাদনা</span>
            </Link>
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

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Course Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">কোর্স বিবরণ</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">শিক্ষক তথ্য</h4>
                <div className="flex items-center space-x-3">
                  {course.instructorInfo?.avatar && (
                    <img 
                      src={course.instructorInfo.avatar} 
                      alt={course.instructorInfo.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {course.instructorInfo?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.instructorInfo?.totalCourses} কোর্স • {course.instructorInfo?.totalStudents} শিক্ষার্থী
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">ক্যাটেগরি</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.categoryInfo?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {course.categoryInfo?.description}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">ভর্তি তথ্য</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    সর্বোচ্চ: {course.maxStudents ? `${course.maxStudents} জন` : 'সীমাহীন'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    বর্তমান: {course.totalStudents} জন
                  </p>
                  <p className={cn(
                    'font-medium',
                    course.allowEnrollment ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  )}>
                    {course.allowEnrollment ? 'ভর্তি চালু' : 'ভর্তি বন্ধ'}
                  </p>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">পূর্বশর্ত</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.prerequisites}
                </p>
              </div>
            )}

            {/* Learning Outcomes */}
            {course.learningOutcomes.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">শিক্ষার ফলাফল</h3>
                <ul className="space-y-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                      <span className="text-gray-600 dark:text-gray-400">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {course.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">ট্যাগসমূহ</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-full text-sm"
                    >
                      <IconTag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">কোর্স কন্টেন্ট</h3>
            
            <div className="space-y-4">
              {course.subjects.map((subject, subjectIndex) => (
                <div key={subject.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {subjectIndex + 1}. {subject.title}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {subject.chapters.length} অধ্যায়
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {subject.description}
                    </p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {subject.chapters.map((chapter, chapterIndex) => (
                      <div key={chapter.id} className="border-l-2 border-emerald-200 dark:border-emerald-700 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800 dark:text-gray-200">
                            {chapterIndex + 1}.{subjectIndex + 1} {chapter.title}
                          </h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {chapter.materials.length} উপাদান
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {chapter.description}
                        </p>
                        
                        <div className="space-y-2">
                          {chapter.materials.map((material, materialIndex) => (
                            <div key={material.id} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              {getMaterialIcon(material.type)}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {material.title}
                                </p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                  <span className="capitalize">{material.type}</span>
                                  {material.duration && (
                                    <>
                                      <span>•</span>
                                      <span>{material.duration} মিনিট</span>
                                    </>
                                  )}
                                  {material.isRequired && (
                                    <>
                                      <span>•</span>
                                      <span className="text-red-500">আবশ্যক</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">ভর্তিকৃত শিক্ষার্থী</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                মোট {course.totalStudents} জন
              </span>
            </div>

            {/* Enrollment Stats */}
            {course.enrollmentInfo && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">সক্রিয় শিক্ষার্থী</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                    {course.enrollmentInfo.activeEnrollments}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">সম্পন্নকারী</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                    {course.enrollmentInfo.completedEnrollments}
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">গড় অগ্রগতি</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mt-1">
                    {course.enrollmentInfo.averageProgress}%
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">গড় রেটিং</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                    {course.enrollmentInfo.averageRating.toFixed(1)}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                শিক্ষার্থীদের বিস্তারিত তালিকা শীঘ্রই যোগ করা হবে...
              </p>
            </div>
          </div>
        )}

        {/* Status Management Tab */}
        {activeTab === 'status' && onStatusChange && (
          <div>
            <CourseStatusManager
              course={course}
              onStatusChange={onStatusChange}
              loading={false}
            />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">কোর্স পরিসংখ্যান</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-6">
                <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">মোট আয়</h4>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  ৳{(course.price * course.totalStudents).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">সম্পূর্ণতার হার</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {course.enrollmentInfo ? Math.round((course.enrollmentInfo.completedEnrollments / course.enrollmentInfo.totalEnrollments) * 100) : 0}%
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
                <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">রেটিং</h4>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {course.rating.toFixed(1)}
                  </p>
                  <IconStar className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                বিস্তারিত পরিসংখ্যান এবং চার্ট শীঘ্রই যোগ করা হবে...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};