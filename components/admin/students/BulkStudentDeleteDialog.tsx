'use client';

import React, { useState, useEffect } from 'react';
import { Student } from '@/store/types/student';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface BulkStudentDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  students: Student[];
  loading?: boolean;
}

interface BulkDeletionSummary {
  totalStudents: number;
  studentsWithActiveCourses: number;
  studentsWithCompletedCourses: number;
  studentsWithCertificates: number;
  highPerformers: number;
  recentStudents: number;
  canDelete: boolean;
  blockedStudents: Student[];
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

const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
  </svg>
);

export const BulkStudentDeleteDialog: React.FC<BulkStudentDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  students,
  loading = false,
}) => {
  const [summary, setSummary] = useState<BulkDeletionSummary | null>(null);
  const [confirmationText, setConfirmationText] = useState('');

  useEffect(() => {
    if (students.length > 0 && isOpen) {
      analyzeBulkDeletion(students);
    }
  }, [students, isOpen]);

  const analyzeBulkDeletion = (students: Student[]) => {
    const studentsWithActiveCourses = students.filter(s => 
      s.enrolledCourses.some(course => course.status === 'enrolled')
    );
    
    const studentsWithCompletedCourses = students.filter(s => 
      s.enrolledCourses.some(course => course.status === 'completed')
    );
    
    const studentsWithCertificates = students.filter(s => s.totalCertificatesEarned > 0);
    
    const highPerformers = students.filter(s => s.overallGPA && s.overallGPA > 4.0);
    
    const recentStudents = students.filter(s => {
      const createdDate = new Date(s.createdAt);
      const daysSinceCreation = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceCreation < 30;
    });

    const blockedStudents = studentsWithActiveCourses;
    const canDelete = blockedStudents.length === 0;

    setSummary({
      totalStudents: students.length,
      studentsWithActiveCourses: studentsWithActiveCourses.length,
      studentsWithCompletedCourses: studentsWithCompletedCourses.length,
      studentsWithCertificates: studentsWithCertificates.length,
      highPerformers: highPerformers.length,
      recentStudents: recentStudents.length,
      canDelete,
      blockedStudents,
    });
  };

  const handleConfirm = () => {
    if (summary?.canDelete && confirmationText === 'DELETE') {
      onConfirm();
    }
  };

  if (!summary) return null;

  const title = summary.canDelete ? 'একাধিক শিক্ষার্থী মুছে ফেলুন' : 'একাধিক শিক্ষার্থী মুছে ফেলা যাবে না';
  const message = summary.canDelete 
    ? `আপনি কি নিশ্চিত যে ${summary.totalStudents}টি শিক্ষার্থীকে স্থায়ীভাবে মুছে দিতে চান?`
    : `${summary.blockedStudents.length}টি শিক্ষার্থীকে মুছে ফেলা যাবে না কারণ তারা সক্রিয় কোর্সে ভর্তি রয়েছে।`;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={title}
      message={message}
      confirmText={summary.canDelete ? 'স্থায়ীভাবে মুছুন' : 'বুঝেছি'}
      cancelText="বাতিল"
      type={summary.canDelete ? 'danger' : 'warning'}
      loading={loading}
    >
      <div className="space-y-4">
        {/* Summary Statistics */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <IconUsers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h4 className="font-medium text-gray-900 dark:text-white">
              নির্বাচিত শিক্ষার্থী সংক্ষিপ্ত তথ্য
            </h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">মোট শিক্ষার্থী:</span>
                <span className="font-medium text-gray-900 dark:text-white">{summary.totalStudents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">সক্রিয় কোর্সে:</span>
                <span className={`font-medium ${summary.studentsWithActiveCourses > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  {summary.studentsWithActiveCourses}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">সম্পন্ন কোর্স:</span>
                <span className="font-medium text-gray-900 dark:text-white">{summary.studentsWithCompletedCourses}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">সার্টিফিকেট:</span>
                <span className="font-medium text-gray-900 dark:text-white">{summary.studentsWithCertificates}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">উচ্চ পারফরমার:</span>
                <span className="font-medium text-gray-900 dark:text-white">{summary.highPerformers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">নতুন (৩০ দিন):</span>
                <span className="font-medium text-gray-900 dark:text-white">{summary.recentStudents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blocked Students */}
        {!summary.canDelete && summary.blockedStudents.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              <IconWarning className="w-4 h-4 text-red-500" />
              <span>সক্রিয় কোর্সে ভর্তি শিক্ষার্থী:</span>
            </h5>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {summary.blockedStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded">
                  <div className="flex items-center space-x-2">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.firstName} className="w-6 h-6 rounded-full" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                        <span className="text-white text-xs">{student.firstName.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-red-900 dark:text-red-100">
                      {student.firstName} {student.lastName}
                    </span>
                  </div>
                  <span className="text-xs text-red-600 dark:text-red-400">
                    {student.enrolledCourses.filter(c => c.status === 'enrolled').length} কোর্স
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation Input */}
        {summary.canDelete && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              নিশ্চিত করতে <span className="font-bold text-red-600">DELETE</span> টাইপ করুন:
            </label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
            />
            {confirmationText && confirmationText !== 'DELETE' && (
              <p className="text-xs text-red-600 dark:text-red-400">
                অনুগ্রহ করে "DELETE" টাইপ করুন।
              </p>
            )}
          </div>
        )}

        {/* Warning Message */}
        {summary.canDelete && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <IconWarning className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">সতর্কতা: এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না!</p>
                <ul className="text-xs space-y-1">
                  <li>• {summary.totalStudents}টি শিক্ষার্থীর সকল তথ্য মুছে যাবে</li>
                  <li>• {summary.studentsWithCompletedCourses}টি সম্পন্ন কোর্স রেকর্ড মুছে যাবে</li>
                  <li>• {summary.studentsWithCertificates}টি সার্টিফিকেট রেকর্ড মুছে যাবে</li>
                  <li>• এই ডেটা পুনরুদ্ধার করা সম্ভব হবে না</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Alternative Actions */}
        {!summary.canDelete && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <IconInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">বিকল্প কাজ:</p>
                <ul className="text-xs space-y-1">
                  <li>• প্রথমে সক্রিয় কোর্স থেকে আলাদা করুন</li>
                  <li>• শিক্ষার্থীদের নিষ্ক্রিয় করুন</li>
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