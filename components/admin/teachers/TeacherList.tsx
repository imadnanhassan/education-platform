'use client';

import React, { useState, useEffect } from 'react';
import { useTeachers } from '@/lib/hooks/useTeachers';
import { Teacher } from '@/store/types/teacher';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

// Icons
import IconUser from '@/components/icon/icon-user';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconEye from '@/components/icon/icon-eye';
import IconSearch from '@/components/icon/icon-search';
import IconDownload from '@/components/icon/icon-download';
import IconPlus from '@/components/icon/icon-plus';
import IconX from '@/components/icon/icon-x';
import IconClock from '@/components/icon/icon-clock';
import IconChecks from '@/components/icon/icon-checks';
import IconFilter from '@/components/icon/icon-filter';

// UI Components
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface TeacherListProps {
  onTeacherSelect?: (teacher: Teacher) => void;
  selectable?: boolean;
}

const TeacherList: React.FC<TeacherListProps> = ({ 
  onTeacherSelect, 
  selectable = false 
}) => {
  const {
    teachers,
    loading,
    error,
    filters,
    selectedTeachers,
    pagination,
    stats,
    getTeachers,
    removeTeacher,
    updateFilters,
    resetFilters,
    toggleSelection,
    selectAll,
    clearSelections,
    performBulkOperation,
    clearErrors,
    getSelectedTeachersCount,
    canDeleteSelectedTeachers,
  } = useTeachers();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Load teachers on component mount
  useEffect(() => {
    getTeachers({ page: 1, limit: 10, filters });
  }, []);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    updateFilters({ search: searchTerm });
    getTeachers({ page: 1, limit: pagination.limit, filters: { ...filters, search: searchTerm } });
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters({ [key]: value });
    getTeachers({ page: 1, limit: pagination.limit, filters: newFilters });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    getTeachers({ page, limit: pagination.limit, filters });
  };

  // Handle delete teacher
  const handleDeleteTeacher = async (teacher: Teacher) => {
    if (teacher.assignedCourses.length > 0) {
      toast.error('এই শিক্ষকের কোর্স বরাদ্দ রয়েছে। প্রথমে কোর্স বরাদ্দ বাতিল করুন।');
      return;
    }
    
    setTeacherToDelete(teacher);
    setShowDeleteDialog(true);
  };

  const confirmDeleteTeacher = async () => {
    if (!teacherToDelete) return;

    try {
      await removeTeacher(teacherToDelete.id);
      toast.success('শিক্ষক সফলভাবে মুছে ফেলা হয়েছে');
      setShowDeleteDialog(false);
      setTeacherToDelete(null);
      getTeachers({ page: pagination.page, limit: pagination.limit, filters });
    } catch (error) {
      toast.error('শিক্ষক মুছতে ব্যর্থ');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (!canDeleteSelectedTeachers()) {
      toast.error('নির্বাচিত কিছু শিক্ষকের কোর্স বরাদ্দ রয়েছে');
      return;
    }
    setShowBulkDeleteDialog(true);
  };

  const confirmBulkDelete = async () => {
    try {
      await performBulkOperation({
        teacherIds: selectedTeachers,
        operation: 'delete',
        reason: 'বাল্ক ডিলিট অপারেশন',
      });
      toast.success(`${selectedTeachers.length}টি শিক্ষক সফলভাবে মুছে ফেলা হয়েছে`);
      setShowBulkDeleteDialog(false);
      clearSelections();
      getTeachers({ page: pagination.page, limit: pagination.limit, filters });
    } catch (error) {
      toast.error('বাল্ক ডিলিট ব্যর্থ');
    }
  };

  // Handle bulk status change
  const handleBulkStatusChange = async (operation: 'activate' | 'deactivate' | 'set_on_leave') => {
    try {
      await performBulkOperation({
        teacherIds: selectedTeachers,
        operation,
        reason: 'বাল্ক স্ট্যাটাস পরিবর্তন',
      });
      
      let message = '';
      switch (operation) {
        case 'activate':
          message = 'নির্বাচিত শিক্ষকদের সক্রিয় করা হয়েছে';
          break;
        case 'deactivate':
          message = 'নির্বাচিত শিক্ষকদের নিষ্ক্রিয় করা হয়েছে';
          break;
        case 'set_on_leave':
          message = 'নির্বাচিত শিক্ষকদের ছুটিতে রাখা হয়েছে';
          break;
      }
      
      toast.success(message);
      clearSelections();
      getTeachers({ page: pagination.page, limit: pagination.limit, filters });
    } catch (error) {
      toast.error('স্ট্যাটাস পরিবর্তন ব্যর্থ');
    }
  };

  // Get status badge
  const getStatusBadge = (status: Teacher['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <IconChecks className="w-3 h-3 mr-1" />
            সক্রিয়
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            <IconX className="w-3 h-3 mr-1" />
            নিষ্ক্রিয়
          </span>
        );
      case 'on_leave':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            <IconClock className="w-3 h-3 mr-1" />
            ছুটিতে
          </span>
        );
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
        <div className="flex items-center">
          <IconX className="w-5 h-5 text-red-400 mr-2" />
          <p className="text-red-800 dark:text-red-400">{error}</p>
        </div>
        <button
          onClick={clearErrors}
          className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          পুনরায় চেষ্টা করুন
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
              <IconUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">মোট শিক্ষক</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTeachers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
              <IconChecks className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">সক্রিয় শিক্ষক</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeTeachers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900/20">
              <IconClock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ছুটিতে</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.onLeaveTeachers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
              <IconUser className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">কোর্স বরাদ্দ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCourseAssignments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="নাম, ইমেইল বা কর্মচারী আইডি দিয়ে খুঁজুন..."
                value={filters.search || ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <IconFilter className="w-4 h-4" />
            <span>ফিল্টার</span>
          </button>

          {/* Add Teacher Button */}
          <Link
            href="/admin-teachers/create"
            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <IconPlus className="w-4 h-4" />
            <span>নতুন শিক্ষক</span>
          </Link>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  অবস্থা
                </label>
                <select
                  value={filters.status || 'all'}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">সকল</option>
                  <option value="active">সক্রিয়</option>
                  <option value="inactive">নিষ্ক্রিয়</option>
                  <option value="on_leave">ছুটিতে</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  বিশেষত্ব
                </label>
                <input
                  type="text"
                  placeholder="বিশেষত্ব লিখুন..."
                  value={filters.specialization || ''}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  কোর্স বরাদ্দ
                </label>
                <select
                  value={filters.hasAssignedCourses || 'all'}
                  onChange={(e) => handleFilterChange('hasAssignedCourses', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">সকল</option>
                  <option value="yes">কোর্স আছে</option>
                  <option value="no">কোর্স নেই</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedTeachers.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 dark:bg-emerald-900/20 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <p className="text-emerald-800 dark:text-emerald-400">
                {getSelectedTeachersCount()}টি শিক্ষক নির্বাচিত
              </p>
              <button
                onClick={clearSelections}
                className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                নির্বাচন বাতিল
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkStatusChange('activate')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                সক্রিয় করুন
              </button>
              <button
                onClick={() => handleBulkStatusChange('deactivate')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                নিষ্ক্রিয় করুন
              </button>
              <button
                onClick={() => handleBulkStatusChange('set_on_leave')}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                ছুটিতে রাখুন
              </button>
              {canDeleteSelectedTeachers() && (
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  মুছে ফেলুন
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Teachers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">লোড হচ্ছে...</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="p-8 text-center">
            <IconUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">কোনো শিক্ষক পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {selectable && (
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedTeachers.length === teachers.length}
                        onChange={() => selectedTeachers.length === teachers.length ? clearSelections() : selectAll()}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    শিক্ষক
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    যোগাযোগ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    বিশেষত্ব
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    কোর্স
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    অবস্থা
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    যোগদান
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    কার্যক্রম
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {teachers.map((teacher) => (
                  <tr 
                    key={teacher.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => onTeacherSelect?.(teacher)}
                  >
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedTeachers.includes(teacher.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelection(teacher.id);
                          }}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {teacher.avatar ? (
                            <Image
                              src={teacher.avatar}
                              alt={`${teacher.firstName} ${teacher.lastName}`}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                              <IconUser className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {teacher.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{teacher.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{teacher.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.specializations.slice(0, 2).map((spec, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                          >
                            {spec}
                          </span>
                        ))}
                        {teacher.specializations.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{teacher.specializations.length - 2} আরো
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {teacher.assignedCourses.length}টি কোর্স
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(teacher.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(teacher.joinDate).toLocaleDateString('bn-BD')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin-teachers/${teacher.id}`}
                          className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconEye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin-teachers/${teacher.id}/edit`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <IconEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTeacher(teacher);
                          }}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                >
                  পূর্বের
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                >
                  পরের
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span>
                    {' থেকে '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>
                    {' এর মধ্যে '}
                    <span className="font-medium">{pagination.total}</span>
                    {' টি ফলাফল'}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                      পূর্বের
                    </button>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pagination.page
                            ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-900/20 dark:border-emerald-500 dark:text-emerald-400'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                      পরের
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDeleteTeacher}
        title="শিক্ষক মুছে ফেলুন"
        message={`আপনি কি নিশ্চিত যে "${teacherToDelete?.firstName} ${teacherToDelete?.lastName}" কে মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmText="মুছে ফেলুন"
        cancelText="বাতিল"
        type="danger"
      />

      {/* Bulk Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        onConfirm={confirmBulkDelete}
        title="একাধিক শিক্ষক মুছে ফেলুন"
        message={`আপনি কি নিশ্চিত যে ${selectedTeachers.length}টি শিক্ষককে মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`}
        confirmText="মুছে ফেলুন"
        cancelText="বাতিল"
        type="danger"
      />
    </div>
  );
};

export default TeacherList;