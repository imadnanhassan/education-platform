'use client';

import React from 'react';
import TeacherDetails from '@/components/admin/teachers/TeacherDetails';

interface TeacherDetailsPageProps {
  params: {
    teacherId: string;
  };
}

const TeacherDetailsPage: React.FC<TeacherDetailsPageProps> = ({ params }) => {
  return (
    <div className="p-6">
      <TeacherDetails teacherId={params.teacherId} />
    </div>
  );
};

export default TeacherDetailsPage;