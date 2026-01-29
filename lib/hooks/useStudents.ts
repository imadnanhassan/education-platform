'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { IRootState } from '@/store';
import {
  fetchStudents,
  fetchStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  fetchStudentStats,
  bulkUpdateStudents,
  setFilters,
  clearFilters,
  setSelectedStudents,
  toggleStudentSelection,
  selectAllStudents,
  clearSelection,
  addToRecentlyViewed,
  clearErrors,
  setCurrentStudent,
} from '@/store/slices/studentSlice';
import {
  StudentFilter,
  BulkStudentOperation,
  CreateStudentFormData,
  UpdateStudentFormData,
} from '@/store/types/student';

export const useStudents = () => {
  const dispatch = useDispatch();
  
  const {
    students,
    currentStudent,
    stats,
    activities,
    notes,
    filters,
    pagination,
    loading,
    error,
    selectedStudents,
    searchResults,
    recentlyViewed,
    importProgress,
  } = useSelector((state: IRootState) => state.students);

  // Actions
  const loadStudents = useCallback((filters?: StudentFilter) => {
    return dispatch(fetchStudents(filters) as any);
  }, [dispatch]);

  const loadStudentById = useCallback((studentId: string) => {
    return dispatch(fetchStudentById(studentId) as any);
  }, [dispatch]);

  const createNewStudent = useCallback((studentData: CreateStudentFormData) => {
    return dispatch(createStudent(studentData) as any);
  }, [dispatch]);

  const updateExistingStudent = useCallback((id: string, data: UpdateStudentFormData) => {
    return dispatch(updateStudent({ id, data }) as any);
  }, [dispatch]);

  const removeStudent = useCallback((studentId: string) => {
    return dispatch(deleteStudent(studentId) as any);
  }, [dispatch]);

  const loadStudentStats = useCallback(() => {
    return dispatch(fetchStudentStats() as any);
  }, [dispatch]);

  const performBulkOperation = useCallback((operation: BulkStudentOperation) => {
    return dispatch(bulkUpdateStudents(operation) as any);
  }, [dispatch]);

  const updateFilters = useCallback((newFilters: Partial<StudentFilter>) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const updateSelectedStudents = useCallback((studentIds: string[]) => {
    dispatch(setSelectedStudents(studentIds));
  }, [dispatch]);

  const toggleSelection = useCallback((studentId: string) => {
    dispatch(toggleStudentSelection(studentId));
  }, [dispatch]);

  const selectAll = useCallback(() => {
    dispatch(selectAllStudents());
  }, [dispatch]);

  const clearSelections = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  const addRecentlyViewed = useCallback((student: any) => {
    dispatch(addToRecentlyViewed(student));
  }, [dispatch]);

  const clearAllErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const setStudent = useCallback((student: any) => {
    dispatch(setCurrentStudent(student));
  }, [dispatch]);

  // Computed values
  const isLoading = Object.values(loading).some(Boolean);
  const hasError = Object.values(error).some(Boolean);
  const totalSelected = selectedStudents.length;
  const isAllSelected = selectedStudents.length === students.length && students.length > 0;
  const hasSelection = selectedStudents.length > 0;

  // Helper functions
  const getStudentById = useCallback((id: string) => {
    return students.find(student => student.id === id);
  }, [students]);

  const getStudentsByStatus = useCallback((status: 'active' | 'inactive' | 'suspended') => {
    return students.filter(student => student.status === status);
  }, [students]);

  const getStudentsByClass = useCallback((className: string) => {
    return students.filter(student => student.academicInfo.class === className);
  }, [students]);

  const searchStudents = useCallback((query: string) => {
    const searchTerm = query.toLowerCase();
    return students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm) ||
      student.lastName.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm) ||
      student.phone.includes(searchTerm)
    );
  }, [students]);

  const getActiveStudents = useCallback(() => {
    return students.filter(student => student.status === 'active');
  }, [students]);

  const getInactiveStudents = useCallback(() => {
    return students.filter(student => student.status === 'inactive');
  }, [students]);

  const getSuspendedStudents = useCallback(() => {
    return students.filter(student => student.status === 'suspended');
  }, [students]);

  const getStudentsWithCourses = useCallback(() => {
    return students.filter(student => student.enrolledCourses.length > 0);
  }, [students]);

  const getTopPerformers = useCallback((limit: number = 10) => {
    return students
      .filter(student => student.overallGPA)
      .sort((a, b) => (b.overallGPA || 0) - (a.overallGPA || 0))
      .slice(0, limit);
  }, [students]);

  return {
    // State
    students,
    currentStudent,
    stats,
    activities,
    notes,
    filters,
    pagination,
    loading,
    error,
    selectedStudents,
    searchResults,
    recentlyViewed,
    importProgress,

    // Actions
    loadStudents,
    loadStudentById,
    createNewStudent,
    updateExistingStudent,
    removeStudent,
    loadStudentStats,
    performBulkOperation,
    updateFilters,
    resetFilters,
    updateSelectedStudents,
    toggleSelection,
    selectAll,
    clearSelections,
    addRecentlyViewed,
    clearAllErrors,
    setStudent,

    // Computed values
    isLoading,
    hasError,
    totalSelected,
    isAllSelected,
    hasSelection,

    // Helper functions
    getStudentById,
    getStudentsByStatus,
    getStudentsByClass,
    searchStudents,
    getActiveStudents,
    getInactiveStudents,
    getSuspendedStudents,
    getStudentsWithCourses,
    getTopPerformers,
  };
};