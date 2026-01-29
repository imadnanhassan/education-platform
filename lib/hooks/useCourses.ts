'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/store';
import {
  fetchCourses,
  fetchCourseById,
  fetchCourseCategories,
  createCourse,
  updateCourse,
  deleteCourse,
  validateCourseForPublishing,
  changeCourseStatus,
  publishCourseWithValidation,
  fetchCourseStats,
  bulkUpdateCourses,
  setFilters,
  clearFilters,
  setSelectedCourses,
  toggleCourseSelection,
  selectAllCourses,
  clearSelection,
  addToRecentlyViewed,
  addToPublishQueue,
  removeFromPublishQueue,
  clearErrors,
  setCurrentCourse,
  clearValidationResults,
  setValidationResult,
} from '@/store/slices/courseSlice';
import {
  CourseFilter,
  BulkCourseOperation,
  CoursePublishInfo,
  CourseStatusChangeInfo,
  CreateCourseFormData,
  UpdateCourseFormData,
} from '@/store/types/course';

export const useCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    courses,
    currentCourse,
    categories,
    stats,
    activities,
    notes,
    filters,
    pagination,
    loading,
    error,
    selectedCourses,
    searchResults,
    recentlyViewed,
    publishQueue,
    validationResults,
    importProgress,
  } = useSelector((state: RootState) => state.courses);

  // Load courses with filters
  const loadCourses = useCallback((courseFilters?: Partial<CourseFilter>) => {
    const finalFilters = courseFilters ? { ...filters, ...courseFilters } : filters;
    dispatch(fetchCourses(finalFilters) as any);
  }, [dispatch, filters]);

  // Load course by ID
  const loadCourseById = useCallback((courseId: string) => {
    dispatch(fetchCourseById(courseId) as any);
  }, [dispatch]);

  // Load course categories
  const loadCategories = useCallback(() => {
    dispatch(fetchCourseCategories() as any);
  }, [dispatch]);

  // Load course statistics
  const loadCourseStats = useCallback(() => {
    dispatch(fetchCourseStats() as any);
  }, [dispatch]);

  // Create new course
  const createNewCourse = useCallback((courseData: CreateCourseFormData) => {
    return dispatch(createCourse(courseData) as any);
  }, [dispatch]);

  // Update existing course
  const updateExistingCourse = useCallback((id: string, courseData: UpdateCourseFormData) => {
    return dispatch(updateCourse({ id, data: courseData }) as any);
  }, [dispatch]);

  // Delete course
  const removeCourse = useCallback((courseId: string) => {
    return dispatch(deleteCourse(courseId) as any);
  }, [dispatch]);

  // Publish course
  const publishExistingCourse = useCallback((publishInfo: CoursePublishInfo) => {
    return dispatch(publishCourseWithValidation(publishInfo) as any);
  }, [dispatch]);

  // Validate course for publishing
  const validateCourse = useCallback((courseId: string) => {
    return dispatch(validateCourseForPublishing(courseId) as any);
  }, [dispatch]);

  // Change course status
  const changeStatus = useCallback((statusChangeInfo: CourseStatusChangeInfo) => {
    return dispatch(changeCourseStatus(statusChangeInfo) as any);
  }, [dispatch]);

  // Publish course with validation
  const publishWithValidation = useCallback((publishInfo: CoursePublishInfo) => {
    return dispatch(publishCourseWithValidation(publishInfo) as any);
  }, [dispatch]);

  // Bulk operations
  const performBulkOperation = useCallback((operation: BulkCourseOperation) => {
    return dispatch(bulkUpdateCourses(operation) as any);
  }, [dispatch]);

  // Filter management
  const updateFilters = useCallback((newFilters: Partial<CourseFilter>) => {
    dispatch(setFilters(newFilters) as any);
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(clearFilters() as any);
  }, [dispatch]);

  // Selection management
  const toggleSelection = useCallback((courseId: string) => {
    dispatch(toggleCourseSelection(courseId) as any);
  }, [dispatch]);

  const selectAll = useCallback(() => {
    dispatch(selectAllCourses() as any);
  }, [dispatch]);

  const clearSelections = useCallback(() => {
    dispatch(clearSelection() as any);
  }, [dispatch]);

  const setSelections = useCallback((courseIds: string[]) => {
    dispatch(setSelectedCourses(courseIds) as any);
  }, [dispatch]);

  // Recently viewed management
  const addToRecent = useCallback((course: any) => {
    dispatch(addToRecentlyViewed(course) as any);
  }, [dispatch]);

  // Publish queue management
  const addToQueue = useCallback((publishInfo: CoursePublishInfo) => {
    dispatch(addToPublishQueue(publishInfo) as any);
  }, [dispatch]);

  const removeFromQueue = useCallback((courseId: string) => {
    dispatch(removeFromPublishQueue(courseId) as any);
  }, [dispatch]);

  // Error management
  const clearAllErrors = useCallback(() => {
    dispatch(clearErrors() as any);
  }, [dispatch]);

  // Current course management
  const setCurrent = useCallback((course: any) => {
    dispatch(setCurrentCourse(course) as any);
  }, [dispatch]);

  // Validation management
  const clearValidations = useCallback(() => {
    dispatch(clearValidationResults() as any);
  }, [dispatch]);

  const setValidation = useCallback((courseId: string, result: any) => {
    dispatch(setValidationResult({ courseId, result }) as any);
  }, [dispatch]);

  // Computed values
  const isAllSelected = courses.length > 0 && selectedCourses.length === courses.length;
  const hasSelection = selectedCourses.length > 0;
  const selectedCoursesData = courses.filter(course => selectedCourses.includes(course.id));

  // Course statistics
  const publishedCoursesCount = courses.filter(course => course.status === 'published').length;
  const draftCoursesCount = courses.filter(course => course.status === 'draft').length;
  const archivedCoursesCount = courses.filter(course => course.status === 'archived').length;
  const underReviewCoursesCount = courses.filter(course => course.status === 'under_review').length;

  // Category helpers
  const getCategoryById = useCallback((categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  }, [categories]);

  const getCoursesByCategory = useCallback((categoryId: string) => {
    return courses.filter(course => course.category === categoryId);
  }, [courses]);

  // Status helpers
  const getCoursesByStatus = useCallback((status: string) => {
    return courses.filter(course => course.status === status);
  }, [courses]);

  // Search helpers
  const searchCourses = useCallback((searchTerm: string) => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructorInfo?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  }, [courses]);

  // Validation helpers
  const canPublishCourse = useCallback((course: any) => {
    return (
      course.status === 'draft' &&
      course.subjects.length > 0 &&
      course.subjects.every((subject: any) => 
        subject.chapters.length > 0 &&
        subject.chapters.every((chapter: any) => chapter.materials.length > 0)
      )
    );
  }, []);

  const canDeleteCourse = useCallback((course: any) => {
    return course.totalStudents === 0 || course.status === 'draft';
  }, []);

  const canChangeStatus = useCallback((course: any, newStatus: string) => {
    const validTransitions: Record<string, string[]> = {
      'draft': ['under_review', 'published'],
      'under_review': ['draft', 'published'],
      'published': ['draft', 'archived'],
      'archived': ['draft'],
    };
    
    return validTransitions[course.status]?.includes(newStatus) || false;
  }, []);

  const getValidationResult = useCallback((courseId: string) => {
    return validationResults[courseId] || null;
  }, [validationResults]);

  return {
    // State
    courses,
    currentCourse,
    categories,
    stats,
    activities,
    notes,
    filters,
    pagination,
    loading,
    error,
    selectedCourses,
    searchResults,
    recentlyViewed,
    publishQueue,
    validationResults,
    importProgress,

    // Actions
    loadCourses,
    loadCourseById,
    loadCategories,
    loadCourseStats,
    createNewCourse,
    updateExistingCourse,
    removeCourse,
    publishExistingCourse,
    validateCourse,
    changeStatus,
    publishWithValidation,
    performBulkOperation,

    // Filter management
    updateFilters,
    resetFilters,

    // Selection management
    toggleSelection,
    selectAll,
    clearSelections,
    setSelections,

    // Other actions
    addToRecent,
    addToQueue,
    removeFromQueue,
    clearAllErrors,
    setCurrent,
    clearValidations,
    setValidation,

    // Computed values
    isAllSelected,
    hasSelection,
    selectedCoursesData,
    publishedCoursesCount,
    draftCoursesCount,
    archivedCoursesCount,
    underReviewCoursesCount,

    // Helper functions
    getCategoryById,
    getCoursesByCategory,
    getCoursesByStatus,
    searchCourses,
    canPublishCourse,
    canDeleteCourse,
    canChangeStatus,
    getValidationResult,
  };
};