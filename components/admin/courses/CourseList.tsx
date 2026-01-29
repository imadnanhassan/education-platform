'use client';

import React, { useEffect, useState } from 'react';
import { useCourses } from '@/lib/hooks/useCourses';
import { Course, CourseFilter, CoursePublishInfo } from '@/store/types/course';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { CoursePublishDialog } from './CoursePublishDialog';

// Icons
const IconBook = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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

const IconPublish = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const IconUsers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.239" />
  </svg>
);

const IconStar = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface StatusBadgeProps {
  status: Course['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'published':
        return {
          label: 'প্রকাশিত',
          className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        };
      case 'draft':
        return {
          label: 'খসড়া',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        };
      case 'under_review':
        return {
          label: 'পর্যালোচনায়',
          className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        };
      case 'archived':
        return {
          label: 'সংরক্ষিত',
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

interface LevelBadgeProps {
  level: Course['level'];
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level }) => {
  const getLevelConfig = () => {
    switch (level) {
      case 'beginner':
        return {
          label: 'প্রাথমিক',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        };
      case 'intermediate':
        return {
          label: 'মধ্যম',
          className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
        };
      case 'advanced':
        return {
          label: 'উন্নত',
          className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
        };
      default:
        return {
          label: 'অজানা',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        };
    }
  };

  const config = getLevelConfig();

  return (
    <span className={cn('px-2 py-1 text-xs font-medium rounded-full', config.className)}>
      {config.label}
    </span>
  );
};

interface CourseListProps {
  className?: string;
}

export const CourseList: React.FC<CourseListProps> = ({ className }) => {
  const {
    courses,
    categories,
    stats,
    filters,
    pagination,
    loading,
    error,
    selectedCourses,
    loadCourses,
    loadCategories,
    loadCourseStats,
    updateFilters,
    toggleSelection,
    selectAll,
    clearSelections,
    removeCourse,
    publishExistingCourse,
    isAllSelected,
    hasSelection,
  } = useCourses();

  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<Partial<CourseFilter>>({});
  const [publishDialog, setPublishDialog] = useState<{
    isOpen: boolean;
    course: Course | null;
    loading: boolean;
  }>({
    isOpen: false,
    course: null,
    loading: false,
  });

  useEffect(() => {
    loadCourses(filters);
    loadCategories();
    loadCourseStats();
  }, [filters]);

  const handleFilterChange = (key: keyof CourseFilter, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleSearch = (searchTerm: string) => {
    handleFilterChange('search', searchTerm);
  };

  const handleStatusFilter = (status: CourseFilter['status']) => {
    handleFilterChange('status', status);
  };

  const handleSort = (sortBy: CourseFilter['sortBy'], sortOrder: CourseFilter['sortOrder']) => {
    updateFilters({ sortBy, sortOrder });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই কোর্সটি মুছে দিতে চান?')) {
      try {
        await removeCourse(courseId);
        loadCourses(filters);
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  const handlePublishCourse = async (course: Course) => {
    setPublishDialog({
      isOpen: true,
      course,
      loading: false,
    });
  };

  const confirmPublishCourse = async (publishInfo: CoursePublishInfo) => {
    if (!publishDialog.course) return;

    setPublishDialog(prev => ({ ...prev, loading: true }));

    try {
      await publishExistingCourse(publishInfo);
      loadCourses(filters);
      setPublishDialog({
        isOpen: false,
        course: null,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to publish course:', error);
      setPublishDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const closePublishDialog = () => {
    if (!publishDialog.loading) {
      setPublishDialog({
        isOpen: false,
        course: null,
        loading: false,
      });
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedCourses.length === 0) {
      alert('কোনো কোর্স নির্বাচিত নেই');
      return;
    }

    switch (action) {
      case 'publish':
        if (window.confirm(`আপনি কি নিশ্চিত যে ${selectedCourses.length}টি কোর্স প্রকাশ করতে চান?`)) {
          console.log('Bulk publish:', selectedCourses);
        }
        break;
      case 'unpublish':
        if (window.confirm(`আপনি কি নিশ্চিত যে ${selectedCourses.length}টি কোর্স অপ্রকাশিত করতে চান?`)) {
          console.log('Bulk unpublish:', selectedCourses);
        }
        break;
      case 'archive':
        if (window.confirm(`আপনি কি নিশ্চিত যে ${selectedCourses.length}টি কোর্স সংরক্ষণ করতে চান?`)) {
          console.log('Bulk archive:', selectedCourses);
        }
        break;
      case 'delete':
        if (window.confirm(`আপনি কি নিশ্চিত যে ${selectedCourses.length}টি কোর্স মুছে দিতে চান?`)) {
          console.log('Bulk delete:', selectedCourses);
        }
        break;
      case 'export':
        console.log('Export selected:', selectedCourses);
        break;
    }
  };

  if (loading.list && courses.length === 0) {
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
            <IconBook className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">কোর্স ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">সকল কোর্সের তালিকা এবং তথ্য</p>
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
            href="/admin-courses/create"
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>নতুন কোর্স</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">মোট কোর্স</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.totalCourses}</p>
              </div>
              <div className="p-3 bg-blue-600 rounded-lg">
                <IconBook className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">প্রকাশিত কোর্স</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">{stats.publishedCourses}</p>
              </div>
              <div className="p-3 bg-green-600 rounded-lg">
                <IconPublish className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">মোট শিক্ষার্থী</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">{stats.totalEnrollments}</p>
              </div>
              <div className="p-3 bg-purple-600 rounded-lg">
                <IconUsers className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">মোট আয়</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-1">৳{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-600 rounded-lg">
                <IconStar className="w-6 h-6 text-white" />
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
                onChange={(e) => handleStatusFilter(e.target.value as CourseFilter['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">সকল</option>
                <option value="published">প্রকাশিত</option>
                <option value="draft">খসড়া</option>
                <option value="under_review">পর্যালোচনায়</option>
                <option value="archived">সংরক্ষিত</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ক্যাটেগরি
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">সকল ক্যাটেগরি</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                স্তর
              </label>
              <select
                value={filters.level || 'all'}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">সকল স্তর</option>
                <option value="beginner">প্রাথমিক</option>
                <option value="intermediate">মধ্যম</option>
                <option value="advanced">উন্নত</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                সাজানো
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleSort(sortBy as CourseFilter['sortBy'], sortOrder as CourseFilter['sortOrder']);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="createdAt-desc">নতুন প্রথমে</option>
                <option value="createdAt-asc">পুরাতন প্রথমে</option>
                <option value="title-asc">নাম (ক-য)</option>
                <option value="title-desc">নাম (য-ক)</option>
                <option value="price-asc">মূল্য (কম-বেশি)</option>
                <option value="price-desc">মূল্য (বেশি-কম)</option>
                <option value="totalStudents-desc">জনপ্রিয়তা</option>
                <option value="rating-desc">রেটিং</option>
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
                {selectedCourses.length}টি কোর্স নির্বাচিত
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
                onClick={() => handleBulkAction('publish')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                প্রকাশ করুন
              </button>
              <button
                onClick={() => handleBulkAction('unpublish')}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                অপ্রকাশিত করুন
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                সংরক্ষণ করুন
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

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">কোর্স তালিকা</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="নাম, বিবরণ বা শিক্ষক দিয়ে খুঁজুন..."
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
                  কোর্স
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ক্যাটেগরি ও স্তর
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  শিক্ষক
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  মূল্য ও সময়
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  শিক্ষার্থী ও রেটিং
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
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleSelection(course.id)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {course.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {course.titleEn}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.categoryInfo?.name}
                      </p>
                      <LevelBadge level={course.level} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {course.instructorInfo?.avatar && (
                        <img 
                          src={course.instructorInfo.avatar} 
                          alt={course.instructorInfo.name} 
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.instructorInfo?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {course.instructorInfo?.totalCourses} কোর্স
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ৳{course.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {course.duration} ঘন্টা
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.totalStudents} শিক্ষার্থী
                      </p>
                      <div className="flex items-center space-x-1">
                        <IconStar className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {course.rating.toFixed(1)} ({course.totalRatings})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={course.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin-courses/${course.id}`}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="বিস্তারিত দেখুন"
                      >
                        <IconEye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin-courses/${course.id}/edit`}
                        className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                        title="সম্পাদনা করুন"
                      >
                        <IconEdit className="w-4 h-4" />
                      </Link>
                      {course.status === 'draft' && (
                        <button
                          onClick={() => handlePublishCourse(course)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          title="প্রকাশ করুন"
                        >
                          <IconPublish className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
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
      {loading.list && courses.length > 0 && (
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

      {/* Course Publish Dialog */}
      <CoursePublishDialog
        isOpen={publishDialog.isOpen}
        onClose={closePublishDialog}
        onConfirm={confirmPublishCourse}
        course={publishDialog.course}
        loading={publishDialog.loading}
      />
    </div>
  );
};