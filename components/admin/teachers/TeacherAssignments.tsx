'use client';

import React, { useState, useEffect } from 'react';
import { useTeachers } from '@/lib/hooks/useTeachers';
import { Teacher, CourseAssignment } from '@/store/types/teacher';
import { toast } from 'sonner';

// Icons
import IconPlus from '@/components/icon/icon-plus';
import IconTrash from '@/components/icon/icon-trash';
import IconEdit from '@/components/icon/icon-edit';
import IconX from '@/components/icon/icon-x';
import IconCalendar from '@/components/icon/icon-calendar';
import IconBook from '@/components/icon/icon-book';

// UI Components
import Button from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface TeacherAssignmentsProps {
  teacher: Teacher;
  onUpdate?: () => void;
}

interface CourseOption {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  level: string;
}

// Dummy course data for assignment
const availableCourses: CourseOption[] = [
  {
    id: 'course-001',
    title: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান',
    titleEn: 'Higher Secondary Physics',
    category: 'বিজ্ঞান',
    level: 'intermediate',
  },
  {
    id: 'course-002',
    title: 'গণিত - ক্যালকুলাস',
    titleEn: 'Mathematics - Calculus',
    category: 'গণিত',
    level: 'advanced',
  },
  {
    id: 'course-003',
    title: 'বাংলা সাহিত্য',
    titleEn: 'Bengali Literature',
    category: 'ভাষা',
    level: 'intermediate',
  },
  {
    id: 'course-004',
    title: 'উচ্চ মাধ্যমিক গণিত',
    titleEn: 'Higher Secondary Mathematics',
    category: 'গণিত',
    level: 'intermediate',
  },
  {
    id: 'course-005',
    title: 'পরিসংখ্যান',
    titleEn: 'Statistics',
    category: 'গণিত',
    level: 'advanced',
  },
  {
    id: 'course-006',
    title: 'উচ্চ মাধ্যমিক রসায়ন',
    titleEn: 'Higher Secondary Chemistry',
    category: 'বিজ্ঞান',
    level: 'intermediate',
  },
  {
    id: 'course-007',
    title: 'কম্পিউটার প্রোগ্রামিং',
    titleEn: 'Computer Programming',
    category: 'প্রযুক্তি',
    level: 'beginner',
  },
];

const TeacherAssignments: React.FC<TeacherAssignmentsProps> = ({ 
  teacher, 
  onUpdate 
}) => {
  const { assignCoursesToTeacher, loading } = useTeachers();
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [assignmentDate, setAssignmentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  // Get current assignments for this teacher
  const currentAssignments = teacher.assignedCourses || [];
  
  // Get available courses that are not already assigned
  const unassignedCourses = availableCourses.filter(
    course => !currentAssignments.includes(course.id)
  );

  // Get course details for assigned courses
  const assignedCourseDetails = availableCourses.filter(
    course => currentAssignments.includes(course.id)
  );

  const handleAssignCourses = async () => {
    if (selectedCourses.length === 0) {
      toast.error('অন্তত একটি কোর্স নির্বাচন করুন');
      return;
    }

    try {
      await assignCoursesToTeacher({
        teacherId: teacher.id,
        courseIds: selectedCourses,
        assignedDate: assignmentDate,
        notes: notes.trim() || undefined,
      });

      toast.success(`${selectedCourses.length}টি কোর্স সফলভাবে বরাদ্দ করা হয়েছে`);
      setShowAssignDialog(false);
      setSelectedCourses([]);
      setNotes('');
      onUpdate?.();
    } catch (error) {
      toast.error('কোর্স বরাদ্দ করতে ব্যর্থ');
    }
  };

  const handleRemoveAssignment = (courseId: string) => {
    setAssignmentToDelete(courseId);
    setShowDeleteDialog(true);
  };

  const confirmRemoveAssignment = async () => {
    if (!assignmentToDelete) return;

    try {
      // In a real app, you would call an API to remove the assignment
      // For now, we'll just show a success message
      toast.success('কোর্স বরাদ্দ বাতিল করা হয়েছে');
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
      onUpdate?.();
    } catch (error) {
      toast.error('কোর্স বরাদ্দ বাতিল করতে ব্যর্থ');
    }
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const getTeachingLoad = () => {
    return currentAssignments.length;
  };

  const getLoadStatus = () => {
    const load = getTeachingLoad();
    if (load === 0) return { text: 'কোন কোর্স নেই', color: 'text-gray-500' };
    if (load <= 2) return { text: 'কম লোড', color: 'text-green-600' };
    if (load <= 4) return { text: 'মাঝারি লোড', color: 'text-yellow-600' };
    return { text: 'বেশি লোড', color: 'text-red-600' };
  };

  const loadStatus = getLoadStatus();

  return (
    <div className="space-y-6">
      {/* Header with Teaching Load */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            কোর্স বরাদ্দ
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            মোট কোর্স: {getTeachingLoad()}টি • 
            <span className={`ml-1 font-medium ${loadStatus.color}`}>
              {loadStatus.text}
            </span>
          </p>
        </div>
        <Button
          onClick={() => setShowAssignDialog(true)}
          disabled={unassignedCourses.length === 0}
          className="flex items-center space-x-2"
        >
          <IconPlus className="w-4 h-4" />
          <span>কোর্স বরাদ্দ করুন</span>
        </Button>
      </div>

      {/* Current Assignments */}
      <div className="space-y-4">
        {assignedCourseDetails.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <IconBook className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>এই শিক্ষকের কোন কোর্স বরাদ্দ নেই</p>
          </div>
        ) : (
          assignedCourseDetails.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {course.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.titleEn}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    স্তর: {course.level === 'beginner' ? 'প্রাথমিক' : 
                           course.level === 'intermediate' ? 'মাধ্যমিক' : 'উন্নত'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRemoveAssignment(course.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="কোর্স বরাদ্দ বাতিল করুন"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Assign Courses Dialog */}
      {showAssignDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                কোর্স বরাদ্দ করুন
              </h3>
              <button
                onClick={() => setShowAssignDialog(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Assignment Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  বরাদ্দের তারিখ
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={assignmentDate}
                    onChange={(e) => setAssignmentDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <IconCalendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  কোর্স নির্বাচন করুন ({selectedCourses.length} টি নির্বাচিত)
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {unassignedCourses.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      সব কোর্স ইতিমধ্যে বরাদ্দ করা হয়েছে
                    </p>
                  ) : (
                    unassignedCourses.map((course) => (
                      <label
                        key={course.id}
                        className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => toggleCourseSelection(course.id)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {course.title}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {course.titleEn}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {course.category}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {course.level === 'beginner' ? 'প্রাথমিক' : 
                               course.level === 'intermediate' ? 'মাধ্যমিক' : 'উন্নত'}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  নোট (ঐচ্ছিক)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="কোর্স বরাদ্দ সম্পর্কে কোন বিশেষ নোট..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAssignDialog(false)}
              >
                বাতিল
              </Button>
              <Button
                onClick={handleAssignCourses}
                disabled={selectedCourses.length === 0 || loading}
                className="flex items-center space-x-2"
              >
                {loading && <LoadingSpinner size="sm" />}
                <span>বরাদ্দ করুন</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmRemoveAssignment}
        title="কোর্স বরাদ্দ বাতিল"
        message="আপনি কি নিশ্চিত যে এই কোর্সের বরাদ্দ বাতিল করতে চান?"
        confirmText="বাতিল করুন"
        cancelText="না"
        type="danger"
      />
    </div>
  );
};

export default TeacherAssignments;