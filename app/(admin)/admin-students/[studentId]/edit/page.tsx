'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStudents } from '@/lib/hooks/useStudents';
import { StudentForm } from '@/components/admin/students/StudentForm';
import { UpdateStudentFormData, CreateStudentFormData } from '@/store/types/student';

interface EditStudentPageProps {
  params: {
    studentId: string;
  };
}

const EditStudentPage: React.FC<EditStudentPageProps> = ({ params }) => {
  const router = useRouter();
  const { currentStudent, loading, loadStudentById, updateExistingStudent } = useStudents();

  useEffect(() => {
    if (params.studentId) {
      loadStudentById(params.studentId);
    }
  }, [params.studentId, loadStudentById]);

  const handleSubmit = async (data: CreateStudentFormData | UpdateStudentFormData) => {
    try {
      // Add the student ID to the data for update operations
      const updateData: UpdateStudentFormData = {
        ...data,
        id: params.studentId,
      };
      await updateExistingStudent(params.studentId, updateData);
      router.push(`/admin-students/${params.studentId}`);
    } catch (error) {
      console.error('Error updating student:', error);
      throw error; // Let the form handle the error
    }
  };

  const handleCancel = () => {
    router.push(`/admin-students/${params.studentId}`);
  };

  if (loading.details) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
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

  return (
    <StudentForm
      student={currentStudent}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default EditStudentPage;