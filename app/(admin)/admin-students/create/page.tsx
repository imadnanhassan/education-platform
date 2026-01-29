'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStudents } from '@/lib/hooks/useStudents';
import { StudentForm } from '@/components/admin/students/StudentForm';
import { CreateStudentFormData, UpdateStudentFormData } from '@/lib/validations/student';

const CreateStudentPage: React.FC = () => {
  const router = useRouter();
  const { createNewStudent } = useStudents();

  const handleSubmit = async (data: CreateStudentFormData | UpdateStudentFormData) => {
    try {
      // For create page, we know it's CreateStudentFormData
      await createNewStudent(data as CreateStudentFormData);
      router.push('/admin-students');
    } catch (error) {
      console.error('Error creating student:', error);
      throw error; // Let the form handle the error
    }
  };

  const handleCancel = () => {
    router.push('/admin-students');
  };

  return (
    <StudentForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CreateStudentPage;