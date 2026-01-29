'use client';

import React, { useState, useEffect } from 'react';
import { Student } from '@/store/types/student';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface StudentDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  student: Student | null;
  loading?: boolean;
}

interface DeletionCheck {
  type: 'warning' | 'error' | 'info';
  message: string;
  details?: string[];
}

const IconCourse = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconCertificate = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

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

export const StudentDeleteDialog: React.FC<StudentDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  student,
  loading = false,
}) => {
  const [checks, setChecks] = useState<DeletionCheck[]>([]);
  const [canDelete, setCanDelete] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  useEffect(() => {
    if (student && isOpen) {
      performSafetyChecks(student);
    }
  }, [student, isOpen]);

  const performSafetyChecks = (student: Student) => {
    const newChecks: DeletionCheck[] = [];

    // Check for active course enrollments
    const activeCourses = student.enrolledCourses.filter(course => course.status === 'enrolled');
    if (activeCourses.length > 0) {
      newChecks.push({
        type: 'warning',
        message: `শিক্ষার্থী বর্তমানে ${activeCourses.length}টি কোর্সে ভর্তি রয়েছে`,
        details: activeCourses.map(course => `• ${course.courseName} (${course.progress}% সম্পন্ন)`),
      });
    }

    // Check for completed courses with certificates
    const completedCourses = student.enrolledCourses.filter(course => course.status === 'completed');
    if (completedCourses.length > 0) {
      newChecks.push({
        type: 'warning',
        message: `শিক্ষার্থী ${completedCourses.length}টি কোর্স সম্পন্ন করেছে`,
        details: completedCourses.map(course => `• ${course.courseName}${course.grade ? ` (গ্রেড: ${course.grade})` : ''}`),
      });
    }

    // Check for certificates earned
    if (student.totalCertificatesEarned > 0) {
      newChecks.push({
        type: 'warning',
        message: `শিক্ষার্থী ${student.totalCertificatesEarned}টি সার্টিফিকেট অর্জন করেছে`,
        details: ['• সার্টিফিকেট রেকর্ড স্থায়ীভাবে মুছে যাবে'],
      });
    }

    // Check if student has high GPA
    if (student.overallGPA && student.overallGPA > 4.0) {
      newChecks.push({
        type: 'info',
        message: `শিক্ষার্থীর উচ্চ GPA রয়েছে (${student.overallGPA.toFixed(2)})`,
        details: ['• এটি একজন ভাল পারফরমার শিক্ষার্থী'],
      });
    }

    // Check for recent activity
    const createdDate = new Date(student.createdAt);
    const daysSinceCreation = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCreation < 30) {
      newChecks.push({
        type: 'info',
        message: `শিক্ষার্থী সম্প্রতি যোগ দিয়েছে (${daysSinceCreation} দিন আগে)`,
        details: ['• নতুন শিক্ষার্থী মুছে ফেলার আগে নিশ্চিত হন'],
      });
    }

    // Check for verification status
    if (student.isEmailVerified || student.isPhoneVerified) {
      newChecks.push({
        type: 'info',
        message: 'শিক্ষার্থীর যাচাইকৃত যোগাযোগ তথ্য রয়েছে',
        details: [
          ...(student.isEmailVerified ? ['• ইমেইল যাচাইকৃত'] : []),
          ...(student.isPhoneVerified ? ['• ফোন যাচাইকৃত'] : []),
        ],
      });
    }

    // Determine if deletion should be blocked
    const hasBlockingIssues = activeCourses.length > 0;
    
    setChecks(newChecks);
    setCanDelete(!hasBlockingIssues);
  };

  const handleConfirm = () => {
    if (canDelete && confirmationText === student?.firstName) {
      onConfirm();
    }
  };

  const getCheckIcon = (type: DeletionCheck['type']) => {
    switch (type) {
      case 'error':
        return <IconWarning className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <IconWarning className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <IconInfo className="w-4 h-4 text-blue-500" />;
    }
  };

  if (!student) return null;

  const title = canDelete ? 'শিক্ষার্থী মুছে ফেলুন' : 'শিক্ষার্থী মুছে ফেলা যাবে না';
  const message = canDelete 
    ? `আপনি কি নিশ্চিত যে "${student.firstName} ${student.lastName}" কে স্থায়ীভাবে মুছে দিতে চান?`
    : 'এই শিক্ষার্থীকে বর্তমানে মুছে ফেলা যাবে না কারণ:';

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      message={message}
      confirmText={canDelete ? 'স্থায়ীভাবে মুছুন' : 'বুঝেছি'}
      cancelText="বাতিল"
      type={canDelete ? 'danger' : 'warning'}
      loading={loading}
    >
      <div className="space-y-4">
        {/* Student Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            {student.avatar ? (
              <img 
                src={student.avatar} 
                alt={`${student.firstName} ${student.lastName}`} 
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white text-lg font-medium">
                  {student.firstName.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {student.firstName} {student.lastName}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {student.studentId} • {student.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {student.academicInfo.class} • {student.academicInfo.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Safety Checks */}
        {checks.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium text-gray-900 dark:text-white">
              নিরাপত্তা পরীক্ষা:
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

        {/* Confirmation Input */}
        {canDelete && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              নিশ্চিত করতে শিক্ষার্থীর প্রথম নাম টাইপ করুন: <span className="font-bold">{student.firstName}</span>
            </label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={student.firstName}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
            {confirmationText && confirmationText !== student.firstName && (
              <p className="text-xs text-red-600 dark:text-red-400">
                নাম মিলছে না। অনুগ্রহ করে সঠিক নাম টাইপ করুন।
              </p>
            )}
          </div>
        )}

        {/* Warning Message */}
        {canDelete && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <IconWarning className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">সতর্কতা: এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না!</p>
                <ul className="text-xs space-y-1">
                  <li>• শিক্ষার্থীর সকল ব্যক্তিগত তথ্য মুছে যাবে</li>
                  <li>• কোর্স এনরোলমেন্ট ইতিহাস মুছে যাবে</li>
                  <li>• অর্জিত সার্টিফিকেট রেকর্ড মুছে যাবে</li>
                  <li>• এই ডেটা পুনরুদ্ধার করা সম্ভব হবে না</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Alternative Actions */}
        {!canDelete && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <IconInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">বিকল্প কাজ:</p>
                <ul className="text-xs space-y-1">
                  <li>• শিক্ষার্থীকে নিষ্ক্রিয় করুন</li>
                  <li>• কোর্স থেকে আলাদা করুন</li>
                  <li>• অ্যাকাউন্ট স্থগিত করুন</li>
                  <li>• পরে মুছে ফেলার জন্য চিহ্নিত করুন</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConfirmDialog>
  );
};