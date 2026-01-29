'use client';

import React, { useState, useEffect } from 'react';
import { useTeachers } from '@/lib/hooks/useTeachers';
import { Teacher } from '@/store/types/teacher';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

// Components
import TeacherAssignments from './TeacherAssignments';

// Icons
import IconUser from '@/components/icon/icon-user';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import IconMail from '@/components/icon/icon-mail';
import IconPhone from '@/components/icon/icon-phone';
import IconCalendar from '@/components/icon/icon-calendar';
import IconMapPin from '@/components/icon/icon-map-pin';
import IconBook from '@/components/icon/icon-book';
import IconAward from '@/components/icon/icon-award';
import IconFolder from '@/components/icon/icon-folder';
import IconGlobe from '@/components/icon/icon-globe';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import IconX from '@/components/icon/icon-x';
import IconClock from '@/components/icon/icon-clock';

// UI Components
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface TeacherDetailsProps {
  teacherId: string;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ teacherId }) => {
  const { teachers, removeTeacher, loading, error } = useTeachers();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Find teacher from the existing state
  const teacher = teachers.find(t => t.id === teacherId) || null;

  const loadTeacher = () => {
    // This function can be used to refresh teacher data if needed
    // For now, we're using the teacher from the Redux state directly
  };

  const handleDeleteTeacher = async () => {
    if (!teacher) return;

    if (teacher.assignedCourses.length > 0) {
      toast.error('এই শিক্ষকের কোর্স বরাদ্দ রয়েছে। প্রথমে কোর্স বরাদ্দ বাতিল করুন।');
      return;
    }

    setShowDeleteDialog(true);
  };

  const confirmDeleteTeacher = async () => {
    if (!teacher) return;

    try {
      await removeTeacher(teacher.id);
      toast.success('শিক্ষক সফলভাবে মুছে ফেলা হয়েছে');
      // Redirect to teacher list
      window.location.href = '/admin-teachers';
    } catch (error) {
      toast.error('শিক্ষক মুছতে ব্যর্থ');
    }
  };

  const getStatusBadge = (status: Teacher['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <IconCircleCheck className="w-4 h-4 mr-1" />
            সক্রিয়
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            <IconX className="w-4 h-4 mr-1" />
            নিষ্ক্রিয়
          </span>
        );
      case 'on_leave':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <IconClock className="w-4 h-4 mr-1" />
            ছুটিতে
          </span>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'সংক্ষিপ্ত বিবরণ', icon: IconUser },
    { id: 'assignments', label: 'কোর্স বরাদ্দ', icon: IconBook },
    { id: 'qualifications', label: 'শিক্ষাগত যোগ্যতা', icon: IconAward },
    { id: 'experience', label: 'কর্মঅভিজ্ঞতা', icon: IconFolder },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 dark:bg-red-900/20 dark:border-red-800">
        <div className="flex items-center">
          <IconX className="w-5 h-5 text-red-400 mr-2" />
          <p className="text-red-800 dark:text-red-400">
            {error || 'শিক্ষক খুঁজে পাওয়া যায়নি'}
          </p>
        </div>
        <Link
          href="/admin-teachers"
          className="mt-4 inline-flex items-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <IconArrowLeft className="w-4 h-4 mr-1" />
          শিক্ষক তালিকায় ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin-teachers"
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <IconArrowLeft className="w-4 h-4 mr-2" />
            শিক্ষক তালিকায় ফিরে যান
          </Link>
          <div className="flex items-center space-x-3">
            <Link
              href={`/admin-teachers/${teacher.id}/edit`}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <IconEdit className="w-4 h-4" />
              <span>সম্পাদনা</span>
            </Link>
            <button
              onClick={handleDeleteTeacher}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <IconTrash className="w-4 h-4" />
              <span>মুছে ফেলুন</span>
            </button>
          </div>
        </div>

        {/* Teacher Profile Header */}
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            {teacher.avatar ? (
              <Image
                src={teacher.avatar}
                alt={`${teacher.firstName} ${teacher.lastName}`}
                width={120}
                height={120}
                className="w-30 h-30 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-30 h-30 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center border-4 border-white shadow-lg">
                <IconUser className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {teacher.firstName} {teacher.lastName}
              </h1>
              {getStatusBadge(teacher.status)}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              কর্মচারী আইডি: {teacher.employeeId}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <IconMail className="w-4 h-4 mr-2" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <IconPhone className="w-4 h-4 mr-2" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <IconCalendar className="w-4 h-4 mr-2" />
                <span>যোগদান: {new Date(teacher.joinDate).toLocaleDateString('bn-BD')}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <IconBook className="w-4 h-4 mr-2" />
                <span>{teacher.assignedCourses.length}টি কোর্স বরাদ্দ</span>
              </div>
            </div>

            {/* Specializations */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বিশেষত্ব:</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Bio */}
              {teacher.bio && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    জীবনী
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {teacher.bio}
                  </p>
                </div>
              )}

              {/* Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  ঠিকানা
                </h3>
                <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
                  <IconMapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p>{teacher.address.street}</p>
                    <p>{teacher.address.city}, {teacher.address.district}</p>
                    <p>{teacher.address.division} - {teacher.address.postalCode}</p>
                    {teacher.address.country && <p>{teacher.address.country}</p>}
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {teacher.emergencyContact && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    জরুরি যোগাযোগ
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {teacher.emergencyContact.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {teacher.emergencyContact.relationship}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {teacher.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {teacher.socialLinks && Object.values(teacher.socialLinks).some(link => link) && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    সামাজিক যোগাযোগ মাধ্যম
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {teacher.socialLinks.website && (
                      <a
                        href={teacher.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <IconGlobe className="w-4 h-4" />
                        <span>ওয়েবসাইট</span>
                      </a>
                    )}
                    {teacher.socialLinks.linkedin && (
                      <a
                        href={teacher.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {teacher.socialLinks.facebook && (
                      <a
                        href={teacher.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <TeacherAssignments teacher={teacher} onUpdate={loadTeacher} />
          )}

          {/* Qualifications Tab */}
          {activeTab === 'qualifications' && (
            <div className="space-y-4">
              {teacher.qualifications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  কোন শিক্ষাগত যোগ্যতার তথ্য নেই
                </p>
              ) : (
                teacher.qualifications.map((qualification, index) => (
                  <div
                    key={qualification.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {qualification.degree}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {qualification.institution}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>বছর: {qualification.year}</span>
                      {qualification.grade && <span>গ্রেড: {qualification.grade}</span>}
                      {qualification.subject && <span>বিষয়: {qualification.subject}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              {teacher.experience.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  কোন কর্মঅভিজ্ঞতার তথ্য নেই
                </p>
              ) : (
                teacher.experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {exp.position}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {exp.organization}
                        </p>
                        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{new Date(exp.startDate).toLocaleDateString('bn-BD')}</span>
                          <span>-</span>
                          <span>
                            {exp.isCurrent 
                              ? 'বর্তমান' 
                              : exp.endDate 
                                ? new Date(exp.endDate).toLocaleDateString('bn-BD')
                                : 'অনির্দিষ্ট'
                            }
                          </span>
                        </div>
                        {exp.description && (
                          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                            {exp.description}
                          </p>
                        )}
                      </div>
                      {exp.isCurrent && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          বর্তমান
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDeleteTeacher}
        title="শিক্ষক মুছে ফেলুন"
        message={`আপনি কি নিশ্চিত যে "${teacher.firstName} ${teacher.lastName}" কে মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmText="মুছে ফেলুন"
        cancelText="বাতিল"
        type="danger"
      />
    </div>
  );
};

export default TeacherDetails;