'use client';

import React, { useEffect, useState } from 'react';
import { useStudents } from '@/lib/hooks/useStudents';
import { Student, StudentFilter } from '@/store/types/student';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { StudentDeleteDialog } from './StudentDeleteDialog';
import { BulkStudentDeleteDialog } from './BulkStudentDeleteDialog';

// Icons (assuming these exist)
const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
  </svg>
);

const IconPlus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const IconEye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconEdit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconTrash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconFilter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const IconDownload = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
    <span className={cn('px-2 py-1 text-xs font-medium rounded-full', config.className)}>
      {config.label}
    </span>
  );
};

interface StudentListProps {
  className?: string;
}

export const StudentList: React.FC<StudentListProps> = ({ className }) => {
  const {
    students,
    stats,
    filters,
    pagination,
    loading,
    error,
    selectedStudents,
    loadStudents,
    loadStudentStats,
    updateFilters,
    toggleSelection,
    selectAll,
    clearSelections,
    removeStudent,
    isAllSelected,
    hasSelection,
  } = useStudents();

  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<Partial<StudentFilter>>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    student: Student | null;
    loading: boolean;
  }>({
    isOpen: false,
    student: null,
    loading: false,
  });

  const [bulkDeleteDialog, setBulkDeleteDialog] = useState<{
    isOpen: boolean;
    students: Student[];
    loading: boolean;
  }>({
    isOpen: false,
    students: [],
    loading: false,
  });

  useEffect(() => {
    loadStudents(filters);
    loadStudentStats();
  }, [filters]);

  const handleFilterChange = (key: keyof StudentFilter, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleSearch = (searchTerm: string) => {
    handleFilterChange('search', searchTerm);
  };

  const handleStatusFilter = (status: StudentFilter['status']) => {
    handleFilterChange('status', status);
  };

  const handleSort = (sortBy: StudentFilter['sortBy'], sortOrder: StudentFilter['sortOrder']) => {
    updateFilters({ sortBy, sortOrder });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const handleDeleteStudent = async (student: Student) => {
    setDeleteDialog({
      isOpen: true,
      student,
      loading: false,
    });
  };

  const confirmDeleteStudent = async () => {
    if (!deleteDialog.student) return;

    setDeleteDialog(prev => ({ ...prev, loading: true }));

    try {
      await removeStudent(deleteDialog.student.id);
      // Reload the list after deletion
      loadStudents(filters);
      setDeleteDialog({
        isOpen: false,
        student: null,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to delete student:', error);
      setDeleteDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const closeDeleteDialog = () => {
    if (!deleteDialog.loading) {
      setDeleteDialog({
        isOpen: false,
        student: null,
        loading: false,
      });
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedStudents.length === 0) {
      alert('কোনো শিক্ষার্থী নির্বাচিত নেই');
      return;
    }

    const selectedStudentObjects = students.filter(s => selectedStudents.includes(s.id));

    switch (action) {
      case 'delete':
        setBulkDeleteDialog({
          isOpen: true,
          students: selectedStudentObjects,
          loading: false,
        });
        break;
      case 'activate':
        console.log('Bulk activate:', selectedStudents);
        break;
      case 'deactivate':
        console.log('Bulk deactivate:', selectedStudents);
        break;
      case 'export':
        console.log('Export selected:', selectedStudents);
        break;
    }
  };

  const confirmBulkDelete = async () => {
    if (bulkDeleteDialog.students.length === 0) return;

    setBulkDeleteDialog(prev => ({ ...prev, loading: true }));

    try {
      // Implement bulk delete logic here
      for (const student of bulkDeleteDialog.students) {
        await removeStudent(student.id);
      }
      
      // Reload the list after deletion
      loadStudents(filters);
      clearSelections();
      setBulkDeleteDialog({
        isOpen: false,
        students: [],
        loading: false,
      });
    } catch (error) {
      console.error('Failed to delete students:', error);
      setBulkDeleteDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const closeBulkDeleteDialog = () => {
    if (!bulkDeleteDialog.loading) {
      setBulkDeleteDialog({
        isOpen: false,
        students: [],
        loading: false,
      });
    }
  };

  if (loading.list && students.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconUsers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">শিক্ষার্থী ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল শিক্ষার্থীর তালিকা এবং তথ্য</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <IconFilter className="w-4 h-4" />
            <span>ফিল্টার</span>
          </button>
          <Link
            href="/admin-students/create"
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>নতুন শিক্ষার্থী</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">মোট শিক্ষার্থী</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-lg">
                <IconUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">সক্রিয় শিক্ষার্থী</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">{stats.activeStudents}</p>
              </div>
              <div className="p-3 bg-green-600 rounded-lg">
                <IconUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">কোর্সে ভর্তি</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.studentsWithCourses}</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-lg">
                <IconUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">নতুন (এই মাসে)</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-1">{stats.newStudentsThisMonth}</p>
              </div>
              <div className="p-3 bg-orange-600 rounded-lg">
                <IconUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                অবস্থা
              </label>
              <select
                value={filters.status || 'all'}
                onChange={(e) => handleStatusFilter(e.target.value as StudentFilter['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">সকল</option>
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
                <option value="suspended">স্থগিত</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                লিঙ্গ
              </label>
              <select
                value={filters.gender || 'all'}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">সকল</option>
                <option value="male">পুরুষ</option>
                <option value="female">মহিলা</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                শ্রেণী
              </label>
              <input
                type="text"
                placeholder="শ্রেণী লিখুন..."
                value={filters.class || ''}
                onChange={(e) => handleFilterChange('class', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                সাজানো
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleSort(sortBy as StudentFilter['sortBy'], sortOrder as StudentFilter['sortOrder']);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="createdAt-desc">নতুন প্রথমে</option>
                <option value="createdAt-asc">পুরাতন প্রথমে</option>
                <option value="name-asc">নাম (ক-য)</option>
                <option value="name-desc">নাম (য-ক)</option>
                <option value="studentId-asc">আইডি (ছোট-বড়)</option>
                <option value="studentId-desc">আইডি (বড়-ছোট)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {hasSelection && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {selectedStudents.length}টি শিক্ষার্থী নির্বাচিত
              </span>
              <button
                onClick={clearSelections}
                className="text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
              >
                নির্বাচন বাতিল
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                সক্রিয় করুন
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                নিষ্ক্রিয় করুন
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                এক্সপোর্ট
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">শিক্ষার্থী তালিকা</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                value={filters.search || ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                onClick={() => console.log('Export all')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
              >
                <IconDownload className="w-4 h-4" />
                <span>এক্সপোর্ট</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() => isAllSelected ? clearSelections() : selectAll()}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  শিক্ষার্থী
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  যোগাযোগ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  শিক্ষাগত তথ্য
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  কোর্স
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  অবস্থা
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  কার্যক্রম
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleSelection(student.id)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {student.avatar ? (
                        <img src={student.avatar} alt={`${student.firstName} ${student.lastName}`} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {student.firstName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{student.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{student.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{student.academicInfo.class}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.academicInfo.institution}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledCourses.slice(0, 2).map((course, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded dark:bg-blue-900/20 dark:text-blue-400">
                          {course.courseName}
                        </span>
                      ))}
                      {student.enrolledCourses.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded dark:bg-gray-700 dark:text-gray-300">
                          +{student.enrolledCourses.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={student.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin-students/${student.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="বিস্তারিত দেখুন"
                      >
                        <IconEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin-students/${student.id}/edit`}
                        className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                        title="সম্পাদনা করুন"
                      >
                        <IconEdit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteStudent(student)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="মুছে দিন"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                মোট {pagination.total}টির মধ্যে {((pagination.page - 1) * pagination.limit) + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} দেখানো হচ্ছে
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  পূর্ববর্তী
                </button>
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        'px-3 py-1 border text-sm rounded',
                        pagination.page === page
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                      )}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  পরবর্তী
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading.list && students.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">আপডেট হচ্ছে...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error.list && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-red-700 dark:text-red-300">{error.list}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <StudentDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteStudent}
        student={deleteDialog.student}
        loading={deleteDialog.loading}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <BulkStudentDeleteDialog
        isOpen={bulkDeleteDialog.isOpen}
        onClose={closeBulkDeleteDialog}
        onConfirm={confirmBulkDelete}
        students={bulkDeleteDialog.students}
        loading={bulkDeleteDialog.loading}
      />
    </div>
  );
};