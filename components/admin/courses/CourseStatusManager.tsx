'use client';

import React, { useState } from 'react';
import { Course, CourseStatusChangeInfo } from '@/store/types/course';
import { useCourses } from '@/lib/hooks/useCourses';
import { cn } from '@/utils/cn';

// Icons
const IconPublish = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const IconUnpublish = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

const IconArchive = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6m0 0l6-6m-6 6V3m-9 5a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v3z" />
  </svg>
);

const IconReview = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const IconDraft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface CourseStatusManagerProps {
  course: Course;
  onStatusChange: (statusChangeInfo: CourseStatusChangeInfo) => void;
  loading?: boolean;
  className?: string;
}

export const CourseStatusManager: React.FC<CourseStatusManagerProps> = ({
  course,
  onStatusChange,
  loading = false,
  className,
}) => {
  const { canChangeStatus } = useCourses();
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Course['status'] | null>(null);
  const [reason, setReason] = useState('');
  const [preserveEnrollments, setPreserveEnrollments] = useState(true);
  const [notifyUsers, setNotifyUsers] = useState(true);

  const getStatusConfig = (status: Course['status']) => {
    switch (status) {
      case 'published':
        return {
          label: 'প্রকাশিত',
          icon: IconPublish,
          className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700',
          description: 'কোর্সটি সবার জন্য দৃশ্যমান এবং ভর্তি খোলা',
        };
      case 'draft':
        return {
          label: 'খসড়া',
          icon: IconDraft,
          className: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-700',
          description: 'কোর্সটি এখনো প্রকাশিত হয়নি',
        };
      case 'under_review':
        return {
          label: 'পর্যালোচনায়',
          icon: IconReview,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-700',
          description: 'কোর্সটি পর্যালোচনার জন্য অপেক্ষমাণ',
        };
      case 'archived':
        return {
          label: 'সংরক্ষিত',
          icon: IconArchive,
          className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700',
          description: 'কোর্সটি সংরক্ষণাগারে রাখা হয়েছে',
        };
    }
  };

  const getAvailableActions = () => {
    const actions = [];

    switch (course.status) {
      case 'draft':
        if (canChangeStatus(course, 'under_review')) {
          actions.push(
            { status: 'under_review' as const, label: 'পর্যালোচনায় পাঠান', icon: IconReview, color: 'yellow' }
          );
        }
        if (canChangeStatus(course, 'published')) {
          actions.push(
            { status: 'published' as const, label: 'প্রকাশ করুন', icon: IconPublish, color: 'green' }
          );
        }
        break;
      case 'under_review':
        if (canChangeStatus(course, 'published')) {
          actions.push(
            { status: 'published' as const, label: 'অনুমোদন ও প্রকাশ', icon: IconPublish, color: 'green' }
          );
        }
        if (canChangeStatus(course, 'draft')) {
          actions.push(
            { status: 'draft' as const, label: 'খসড়ায় ফেরত', icon: IconDraft, color: 'gray' }
          );
        }
        break;
      case 'published':
        if (canChangeStatus(course, 'draft')) {
          actions.push(
            { status: 'draft' as const, label: 'অপ্রকাশিত করুন', icon: IconUnpublish, color: 'gray' }
          );
        }
        if (canChangeStatus(course, 'archived')) {
          actions.push(
            { status: 'archived' as const, label: 'সংরক্ষণ করুন', icon: IconArchive, color: 'red' }
          );
        }
        break;
      case 'archived':
        if (canChangeStatus(course, 'draft')) {
          actions.push(
            { status: 'draft' as const, label: 'পুনরুদ্ধার করুন', icon: IconDraft, color: 'gray' }
          );
        }
        break;
    }

    return actions;
  };

  const handleStatusChange = (newStatus: Course['status']) => {
    // Check if reason is required for certain status changes
    const requiresReason = (
      (course.status === 'published' && newStatus === 'draft') ||
      (course.status === 'published' && newStatus === 'archived') ||
      (course.status === 'under_review' && newStatus === 'draft')
    );

    if (requiresReason) {
      setPendingStatus(newStatus);
      setShowReasonDialog(true);
    } else {
      const statusChangeInfo: CourseStatusChangeInfo = {
        courseId: course.id,
        newStatus,
        preserveEnrollments: true,
        notifyUsers: true,
      };
      onStatusChange(statusChangeInfo);
    }
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      const statusChangeInfo: CourseStatusChangeInfo = {
        courseId: course.id,
        newStatus: pendingStatus,
        reason: reason.trim() || undefined,
        preserveEnrollments,
        notifyUsers,
      };
      
      onStatusChange(statusChangeInfo);
      setShowReasonDialog(false);
      setPendingStatus(null);
      setReason('');
      setPreserveEnrollments(true);
      setNotifyUsers(true);
    }
  };

  const cancelStatusChange = () => {
    setShowReasonDialog(false);
    setPendingStatus(null);
    setReason('');
    setPreserveEnrollments(true);
    setNotifyUsers(true);
  };

  const currentConfig = getStatusConfig(course.status);
  const IconComponent = currentConfig.icon;
  const availableActions = getAvailableActions();

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700', className)}>
      {/* Current Status */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">কোর্সের অবস্থা</h3>
        
        <div className={cn('flex items-center space-x-3 p-3 rounded-lg border', currentConfig.className)}>
          <IconComponent className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-medium">{currentConfig.label}</p>
            <p className="text-sm opacity-80">{currentConfig.description}</p>
          </div>
          {course.publishedAt && course.status === 'published' && (
            <div className="text-right">
              <p className="text-xs opacity-60">প্রকাশিত</p>
              <p className="text-xs font-medium">
                {new Date(course.publishedAt).toLocaleDateString('bn-BD')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status History */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">অবস্থার ইতিহাস</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">তৈরি করা হয়েছে</span>
            <span className="text-gray-500 dark:text-gray-500">
              {new Date(course.createdAt).toLocaleDateString('bn-BD')}
            </span>
          </div>
          {course.publishedAt && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">প্রকাশিত</span>
              <span className="text-gray-500 dark:text-gray-500">
                {new Date(course.publishedAt).toLocaleDateString('bn-BD')}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">সর্বশেষ আপডেট</span>
            <span className="text-gray-500 dark:text-gray-500">
              {new Date(course.updatedAt).toLocaleDateString('bn-BD')}
            </span>
          </div>
        </div>
      </div>

      {/* Available Actions */}
      {availableActions.length > 0 && (
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">উপলব্ধ কার্যক্রম</h4>
          <div className="space-y-2">
            {availableActions.map((action) => {
              const ActionIcon = action.icon;
              const colorClasses = {
                green: 'bg-green-600 hover:bg-green-700 text-white',
                yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
                gray: 'bg-gray-600 hover:bg-gray-700 text-white',
                red: 'bg-red-600 hover:bg-red-700 text-white',
              };

              return (
                <button
                  key={action.status}
                  onClick={() => handleStatusChange(action.status)}
                  disabled={loading}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                    colorClasses[action.color as keyof typeof colorClasses]
                  )}
                >
                  <ActionIcon className="w-4 h-4" />
                  <span>{action.label}</span>
                  {loading && (
                    <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Course Statistics */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">কোর্স পরিসংখ্যান</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">মোট শিক্ষার্থী</p>
            <p className="font-medium text-gray-900 dark:text-white">{course.totalStudents}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">রেটিং</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {course.rating.toFixed(1)} ({course.totalRatings})
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">মোট আয়</p>
            <p className="font-medium text-gray-900 dark:text-white">
              ৳{(course.price * course.totalStudents).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">সম্পূর্ণতার হার</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {course.enrollmentInfo ? Math.round((course.enrollmentInfo.completedEnrollments / course.enrollmentInfo.totalEnrollments) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Reason Dialog */}
      {showReasonDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                কারণ উল্লেখ করুন
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                এই অবস্থা পরিবর্তনের কারণ উল্লেখ করুন:
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="কারণ লিখুন..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              />
              
              {/* Enrollment preservation options */}
              {course.totalStudents > 0 && (
                <div className="space-y-3 mt-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preserveEnrollments}
                      onChange={(e) => setPreserveEnrollments(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        শিক্ষার্থীদের ভর্তি সংরক্ষণ করুন
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        বর্তমান {course.totalStudents} জন শিক্ষার্থীর ভর্তি সংরক্ষিত থাকবে
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notifyUsers}
                      onChange={(e) => setNotifyUsers(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        ব্যবহারকারীদের জানান
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        শিক্ষার্থী এবং শিক্ষকদের অবস্থা পরিবর্তনের বিষয়ে জানানো হবে
                      </p>
                    </div>
                  </label>
                </div>
              )}
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={cancelStatusChange}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  বাতিল
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  নিশ্চিত করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};