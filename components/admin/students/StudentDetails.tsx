'use client';

import React, { useEffect } from 'react';
import { useStudents } from '@/lib/hooks/useStudents';
import { Student } from '@/store/types/student';
import { cn } from '@/utils/cn';
import Link from 'next/link';

// Icons
const IconUser = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconMail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconPhone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconCalendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconLocation = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconAcademicCap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const IconEdit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'suspended';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          label: 'সক্রিয়',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        };
      case 'inactive':
        return {
          label: 'নিষ্ক্রিয়',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        };
      case 'suspended':
        return {
          label: 'স্থগিত',
          className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        };
      default:
        return {
          label: 'অজানা',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={cn('px-3 py-1 text-sm font-medium rounded-full', config.className)}>
      {config.label}
    </span>
  );
};

interface StudentDetailsProps {
  studentId: string;
  className?: string;
}

export const StudentDetails: React.FC<StudentDetailsProps> = ({ studentId, className }) => {
  const { currentStudent, loading, error, loadStudentById, addRecentlyViewed } = useStudents();

  useEffect(() => {
    if (studentId) {
      loadStudentById(studentId);
    }
  }, [studentId, loadStudentById]);

  useEffect(() => {
    if (currentStudent) {
      addRecentlyViewed(currentStudent);
    }
  }, [currentStudent, addRecentlyViewed]);

  if (loading.details) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error.details) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-700 dark:text-red-300">{error.details}</span>
        </div>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">শিক্ষার্থীর তথ্য পাওয়া যায়নি</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin-students"
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentStudent.firstName} {currentStudent.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">শিক্ষার্থী আইডি: {currentStudent.studentId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <StatusBadge status={currentStudent.status} />
          <Link
            href={`/admin-students/${currentStudent.id}/edit`}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <IconEdit className="w-4 h-4" />
            <span>সম্পাদনা</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Contact */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              {currentStudent.avatar ? (
                <img
                  src={currentStudent.avatar}
                  alt={`${currentStudent.firstName} ${currentStudent.lastName}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {currentStudent.firstName.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentStudent.firstName} {currentStudent.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{currentStudent.academicInfo.class}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                বয়স: {calculateAge(currentStudent.dateOfBirth)} বছর
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">যোগাযোগের তথ্য</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <IconMail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ইমেইল</p>
                  <p className="text-gray-900 dark:text-white">{currentStudent.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <IconPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ফোন</p>
                  <p className="text-gray-900 dark:text-white">{currentStudent.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <IconCalendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">জন্ম তারিখ</p>
                  <p className="text-gray-900 dark:text-white">{formatDate(currentStudent.dateOfBirth)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <IconLocation className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ঠিকানা</p>
                  <p className="text-gray-900 dark:text-white">
                    {currentStudent.address.city}, {currentStudent.address.district}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">অতিরিক্ত তথ্য</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">লিঙ্গ:</span>
                <span className="text-gray-900 dark:text-white">
                  {currentStudent.gender === 'male' ? 'পুরুষ' : currentStudent.gender === 'female' ? 'মহিলা' : 'অন্যান্য'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">জাতীয়তা:</span>
                <span className="text-gray-900 dark:text-white">{currentStudent.nationality}</span>
              </div>
              {currentStudent.religion && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">ধর্ম:</span>
                  <span className="text-gray-900 dark:text-white">{currentStudent.religion}</span>
                </div>
              )}
              {currentStudent.bloodGroup && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">রক্তের গ্রুপ:</span>
                  <span className="text-gray-900 dark:text-white">{currentStudent.bloodGroup}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">ভর্তির তারিখ:</span>
                <span className="text-gray-900 dark:text-white">{formatDate(currentStudent.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Academic & Guardian Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <IconAcademicCap className="w-6 h-6 text-emerald-600" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">শিক্ষাগত তথ্য</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">শ্রেণী</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.academicInfo.class}</p>
              </div>
              {currentStudent.academicInfo.section && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">শাখা</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.academicInfo.section}</p>
                </div>
              )}
              {currentStudent.academicInfo.rollNumber && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">রোল নম্বর</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.academicInfo.rollNumber}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">শিক্ষা বোর্ড</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.academicInfo.board}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">শিক্ষা প্রতিষ্ঠান</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.academicInfo.institution}</p>
              </div>
              {currentStudent.academicInfo.passingYear && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">পাসের বছর</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.academicInfo.passingYear}</p>
                </div>
              )}
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <IconUser className="w-6 h-6 text-emerald-600" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">অভিভাবকের তথ্য</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">নাম</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.guardian.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">সম্পর্ক</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.guardian.relationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">ফোন</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.guardian.phone}</p>
              </div>
              {currentStudent.guardian.email && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ইমেইল</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.guardian.email}</p>
                </div>
              )}
              {currentStudent.guardian.occupation && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">পেশা</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.guardian.occupation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <IconLocation className="w-6 h-6 text-emerald-600" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">ঠিকানা</h4>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white">{currentStudent.address.street}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {currentStudent.address.city}, {currentStudent.address.district}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {currentStudent.address.division}, {currentStudent.address.country}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                পোস্টাল কোড: {currentStudent.address.postalCode}
              </p>
            </div>
          </div>

          {/* Enrolled Courses */}
          {currentStudent.enrolledCourses.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">ভর্তিকৃত কোর্স</h4>
              <div className="space-y-4">
                {currentStudent.enrolledCourses.map((course, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 dark:text-white">{course.courseName}</h5>
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        course.status === 'enrolled' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
                        course.status === 'completed' && 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
                        course.status === 'dropped' && 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      )}>
                        {course.status === 'enrolled' && 'চলমান'}
                        {course.status === 'completed' && 'সম্পন্ন'}
                        {course.status === 'dropped' && 'বাদ দেওয়া'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>ভর্তির তারিখ: {formatDate(course.enrolledAt)}</span>
                      <span>অগ্রগতি: {course.progress}%</span>
                    </div>
                    {course.grade && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">গ্রেড: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{course.grade}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contact */}
          {currentStudent.emergencyContact && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">জরুরি যোগাযোগ</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">নাম</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">সম্পর্ক</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.emergencyContact.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ফোন</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{currentStudent.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};