'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTeachers } from '@/lib/hooks/useTeachers';
import { Teacher } from '@/store/types/teacher';
import TeacherForm from '@/components/admin/teachers/TeacherForm';
import Link from 'next/link';
import { toast } from 'sonner';

// Icons
import IconArrowLeft from '@/components/icon/icon-arrow-left';
import IconX from '@/components/icon/icon-x';

// UI Components
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EditTeacherPageProps {
  params: {
    teacherId: string;
  };
}

const EditTeacherPage: React.FC<EditTeacherPageProps> = ({ params }) => {
  const router = useRouter();
  const { teachers, loading, error } = useTeachers();

  // Find teacher from the existing state
  const teacher = teachers.find(t => t.id === params.teacherId) || null;

  const handleSuccess = () => {
    router.push(`/admin-teachers/${params.teacherId}`);
  };

  const handleCancel = () => {
    router.push(`/admin-teachers/${params.teacherId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="p-6">
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
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/admin-teachers/${params.teacherId}`}
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
          >
            <IconArrowLeft className="w-4 h-4 mr-2" />
            শিক্ষকের বিবরণে ফিরে যান
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            শিক্ষকের তথ্য সম্পাদনা
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {teacher.firstName} {teacher.lastName} এর তথ্য আপডেট করুন
          </p>
        </div>

        {/* Teacher Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TeacherForm
            teacher={teacher}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTeacherPage;