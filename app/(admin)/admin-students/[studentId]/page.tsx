'use client';

import React from 'react';
import { StudentDetails } from '@/components/admin/students/StudentDetails';

interface StudentDetailPageProps {
  params: {
    studentId: string;
  };
}

const StudentDetailPage: React.FC<StudentDetailPageProps> = ({ params }) => {
  return <StudentDetails studentId={params.studentId} />;
};

export default StudentDetailPage;