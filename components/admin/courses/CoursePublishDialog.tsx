'use client';

import React, { useState, useEffect } from 'react';
import { Course, CoursePublishInfo, CourseValidationResult } from '@/store/types/course';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useCourses } from '@/lib/hooks/useCourses';

interface CoursePublishDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (publishInfo: CoursePublishInfo) => void;
  course: Course | null;
  loading?: boolean;
}

interface ValidationCheck {
  type: 'error' | 'warning' | 'info';
  message: string;
  details?: string[];
}

const IconWarning = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const IconInfo = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const IconClock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CoursePublishDialog: React.FC<CoursePublishDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  course,
  loading = false,
}) => {
  const { validateCourse, getValidationResult, loading: courseLoading } = useCourses();
  const [checks, setChecks] = useState<ValidationCheck[]>([]);
  const [canPublish, setCanPublish] = useState(false);
  const [publishNotes, setPublishNotes] = useState('');
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [schedulePublish, setSchedulePublish] = useState(false);
  const [publishDate, setPublishDate] = useState('');
  const [preserveEnrollments, setPreserveEnrollments] = useState(true);
  const [validationOverride, setValidationOverride] = useState(false);

  useEffect(() => {
    if (course && isOpen) {
      // Trigger validation
      validateCourse(course.id);
    }
  }, [course, isOpen, validateCourse]);

  useEffect(() => {
    if (course) {
      const validationResult = getValidationResult(course.id);
      if (validationResult) {
        processValidationResult(validationResult);
      }
    }
  }, [course, getValidationResult]);

  const processValidationResult = (result: CourseValidationResult) => {
    const allChecks: ValidationCheck[] = [
      ...result.errors,
      ...result.warnings,
      ...result.suggestions,
    ];
    
    setChecks(allChecks);
    setCanPublish(result.canPublish);
  };

  const handleConfirm = () => {
    if ((!canPublish && !validationOverride) || !course) return;

    const publishInfo: CoursePublishInfo = {
      courseId: course.id,
      publishNotes: publishNotes.trim() || undefined,
      notifyStudents,
      schedulePublish,
      publishDate: schedulePublish ? publishDate : undefined,
      preserveEnrollments,
      validationOverride,
    };

    onConfirm(publishInfo);
  };

  const getCheckIcon = (type: ValidationCheck['type']) => {
    switch (type) {
      case 'error':
        return <IconWarning className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <IconWarning className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <IconInfo className="w-4 h-4 text-blue-500" />;
    }
  };

  if (!course) return null;

  const title = canPublish ? 'কোর্স প্রকাশ করুন' : 'কোর্স প্রকাশ করা যাবে না';
  const message = canPublish 
    ? `আপনি কি নিশ্চিত যে "${course.title}" কোর্সটি প্রকাশ করতে চান?`
    : 'এই কোর্সটি প্রকাশ করার আগে নিম্নলিখিত সমস্যাগুলো সমাধান করুন:';

  const isValidating = courseLoading.validate;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      message={message}
      confirmText={canPublish ? 'প্রকাশ করুন' : 'বুঝেছি'}
      cancelText="বাতিল"
      type={canPublish ? 'info' : 'warning'}
      loading={loading}
    >
      <div className="space-y-4">
        {/* Course Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {course.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {course.subjects.length} বিষয় • {course.duration} ঘন্টা • ৳{course.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Validation Checks */}
        {isValidating && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">কোর্স যাচাই করা হচ্ছে...</span>
          </div>
        )}

        {!isValidating && checks.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium text-gray-900 dark:text-white">
              প্রকাশনা পরীক্ষা:
            </h5>
            {checks.map((check, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  {getCheckIcon(check.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {check.message}
                    </p>
                    {check.details && (
                      <ul className="mt-1 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {check.details.map((detail, detailIndex) => (
                          <li key={detailIndex}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Publishing Options */}
        {!isValidating && canPublish && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                প্রকাশনার নোট (ঐচ্ছিক)
              </label>
              <textarea
                value={publishNotes}
                onChange={(e) => setPublishNotes(e.target.value)}
                placeholder="এই প্রকাশনা সম্পর্কে কোনো বিশেষ নোট..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notifyStudents}
                  onChange={(e) => setNotifyStudents(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    শিক্ষার্থীদের জানান
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ভর্তিকৃত শিক্ষার্থীদের নতুন কোর্স সম্পর্কে জানানো হবে
                  </p>
                </div>
              </label>

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
                    বর্তমান ভর্তিকৃত শিক্ষার্থীদের তথ্য সংরক্ষিত থাকবে ({course.totalStudents} জন)
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={schedulePublish}
                  onChange={(e) => setSchedulePublish(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    নির্ধারিত সময়ে প্রকাশ
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ভবিষ্যতের কোনো তারিখে প্রকাশ করুন
                  </p>
                </div>
              </label>

              {schedulePublish && (
                <div className="ml-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    প্রকাশের তারিখ ও সময়
                  </label>
                  <input
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Validation Override Option */}
        {!isValidating && !canPublish && (
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={validationOverride}
                onChange={(e) => setValidationOverride(e.target.checked)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <div>
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  যাচাইকরণ উপেক্ষা করে প্রকাশ করুন
                </span>
                <p className="text-xs text-red-500 dark:text-red-400">
                  সতর্কতা: এটি সমস্যাযুক্ত কোর্স প্রকাশ করতে পারে
                </p>
              </div>
            </label>
          </div>
        )}

        {/* Success Message */}
        {!isValidating && (canPublish || validationOverride) && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-700 dark:text-green-300">
                <p className="font-medium mb-1">কোর্স প্রকাশের জন্য প্রস্তুত!</p>
                <ul className="text-xs space-y-1">
                  <li>• কোর্সটি সবার জন্য দৃশ্যমান হবে</li>
                  <li>• শিক্ষার্থীরা ভর্তি হতে পারবে</li>
                  <li>• কোর্স তালিকায় প্রদর্শিত হবে</li>
                  {preserveEnrollments && course.totalStudents > 0 && (
                    <li>• বর্তমান {course.totalStudents} জন শিক্ষার্থীর ভর্তি সংরক্ষিত থাকবে</li>
                  )}
                  {schedulePublish && (
                    <li>• নির্ধারিত সময়ে স্বয়ংক্রিয়ভাবে প্রকাশিত হবে</li>
                  )}
                  {validationOverride && (
                    <li className="text-red-600">• যাচাইকরণ সমস্যা উপেক্ষা করা হবে</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {!isValidating && !canPublish && !validationOverride && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <IconWarning className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">কোর্স প্রকাশ করা যাবে না</p>
                <ul className="text-xs space-y-1">
                  <li>• উপরের সমস্যাগুলো সমাধান করুন</li>
                  <li>• কোর্স সম্পাদনা করে প্রয়োজনীয় তথ্য যোগ করুন</li>
                  <li>• সব বিষয়ে অধ্যায় এবং উপাদান যোগ করুন</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConfirmDialog>
  );
};