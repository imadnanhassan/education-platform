import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  fetchTeachers,
  fetchTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignCourses,
  bulkUpdateTeachers,
  fetchTeacherStats,
  setFilters,
  clearFilters,
  setSelectedTeachers,
  toggleTeacherSelection,
  selectAllTeachers,
  clearSelection,
  clearError,
  setCurrentTeacher,
} from '@/store/slices/teacherSlice';
import {
  TeacherFilters,
  CreateTeacherRequest,
  UpdateTeacherRequest,
  AssignCoursesRequest,
  BulkTeacherOperation,
} from '@/store/types/teacher';

export const useTeachers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacherState = useSelector((state: RootState) => state.teachers);

  // Fetch teachers with filters and pagination
  const getTeachers = useCallback(
    (params?: { page?: number; limit?: number; filters?: TeacherFilters }) => {
      return dispatch(fetchTeachers(params || {}));
    },
    [dispatch]
  );

  // Fetch single teacher by ID
  const getTeacherById = useCallback(
    (teacherId: string) => {
      return dispatch(fetchTeacherById(teacherId));
    },
    [dispatch]
  );

  // Create new teacher
  const addTeacher = useCallback(
    (teacherData: CreateTeacherRequest) => {
      return dispatch(createTeacher(teacherData));
    },
    [dispatch]
  );

  // Update existing teacher
  const editTeacher = useCallback(
    (teacherData: UpdateTeacherRequest) => {
      return dispatch(updateTeacher(teacherData));
    },
    [dispatch]
  );

  // Delete teacher
  const removeTeacher = useCallback(
    (teacherId: string) => {
      return dispatch(deleteTeacher(teacherId));
    },
    [dispatch]
  );

  // Assign courses to teacher
  const assignCoursesToTeacher = useCallback(
    (assignmentData: AssignCoursesRequest) => {
      return dispatch(assignCourses(assignmentData));
    },
    [dispatch]
  );

  // Bulk operations on teachers
  const performBulkOperation = useCallback(
    (operationData: BulkTeacherOperation) => {
      return dispatch(bulkUpdateTeachers(operationData));
    },
    [dispatch]
  );

  // Fetch teacher statistics
  const getTeacherStats = useCallback(() => {
    return dispatch(fetchTeacherStats());
  }, [dispatch]);

  // Filter management
  const updateFilters = useCallback(
    (filters: Partial<TeacherFilters>) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  // Selection management
  const updateSelectedTeachers = useCallback(
    (teacherIds: string[]) => {
      dispatch(setSelectedTeachers(teacherIds));
    },
    [dispatch]
  );

  const toggleSelection = useCallback(
    (teacherId: string) => {
      dispatch(toggleTeacherSelection(teacherId));
    },
    [dispatch]
  );

  const selectAll = useCallback(() => {
    dispatch(selectAllTeachers());
  }, [dispatch]);

  const clearSelections = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  // Error management
  const clearErrors = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Current teacher management
  const setActiveTeacher = useCallback(
    (teacher: any) => {
      dispatch(setCurrentTeacher(teacher));
    },
    [dispatch]
  );

  // Helper functions
  const getFilteredTeachers = useCallback(() => {
    let filtered = [...teacherState.teachers];
    const { filters } = teacherState;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(teacher =>
        teacher.firstName.toLowerCase().includes(search) ||
        teacher.lastName.toLowerCase().includes(search) ||
        teacher.email.toLowerCase().includes(search) ||
        teacher.employeeId.toLowerCase().includes(search)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(teacher => teacher.status === filters.status);
    }

    if (filters.gender && filters.gender !== 'all') {
      filtered = filtered.filter(teacher => teacher.gender === filters.gender);
    }

    if (filters.specialization) {
      filtered = filtered.filter(teacher =>
        teacher.specializations.some(spec =>
          spec.toLowerCase().includes(filters.specialization?.toLowerCase() || '')
        )
      );
    }

    if (filters.hasAssignedCourses && filters.hasAssignedCourses !== 'all') {
      const hasCourses = filters.hasAssignedCourses === 'yes';
      filtered = filtered.filter(teacher =>
        hasCourses ? teacher.assignedCourses.length > 0 : teacher.assignedCourses.length === 0
      );
    }

    return filtered;
  }, [teacherState.teachers, teacherState.filters]);

  const getTeachersByStatus = useCallback(
    (status: 'active' | 'inactive' | 'on_leave') => {
      return teacherState.teachers.filter(teacher => teacher.status === status);
    },
    [teacherState.teachers]
  );

  const getTeachersBySpecialization = useCallback(
    (specialization: string) => {
      return teacherState.teachers.filter(teacher =>
        teacher.specializations.some(spec =>
          spec.toLowerCase().includes(specialization.toLowerCase())
        )
      );
    },
    [teacherState.teachers]
  );

  const getTeachersWithCourses = useCallback(() => {
    return teacherState.teachers.filter(teacher => teacher.assignedCourses.length > 0);
  }, [teacherState.teachers]);

  const getTeachersWithoutCourses = useCallback(() => {
    return teacherState.teachers.filter(teacher => teacher.assignedCourses.length === 0);
  }, [teacherState.teachers]);

  const getTeacherCourseAssignments = useCallback(
    (teacherId: string) => {
      return teacherState.courseAssignments.filter(assignment => assignment.teacherId === teacherId);
    },
    [teacherState.courseAssignments]
  );

  const isTeacherSelected = useCallback(
    (teacherId: string) => {
      return teacherState.selectedTeachers.includes(teacherId);
    },
    [teacherState.selectedTeachers]
  );

  const getSelectedTeachersCount = useCallback(() => {
    return teacherState.selectedTeachers.length;
  }, [teacherState.selectedTeachers]);

  const canDeleteSelectedTeachers = useCallback(() => {
    const selectedTeachers = teacherState.teachers.filter(teacher =>
      teacherState.selectedTeachers.includes(teacher.id)
    );
    return selectedTeachers.every(teacher => teacher.assignedCourses.length === 0);
  }, [teacherState.teachers, teacherState.selectedTeachers]);

  // Validation helpers
  const validateTeacherData = useCallback((teacherData: Partial<CreateTeacherRequest>) => {
    const errors: Record<string, string> = {};

    if (!teacherData.firstName?.trim()) {
      errors.firstName = 'নাম প্রয়োজন';
    }

    if (!teacherData.lastName?.trim()) {
      errors.lastName = 'পদবি প্রয়োজন';
    }

    if (!teacherData.email?.trim()) {
      errors.email = 'ইমেইল প্রয়োজন';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacherData.email)) {
      errors.email = 'সঠিক ইমেইল ঠিকানা লিখুন';
    }

    if (!teacherData.phone?.trim()) {
      errors.phone = 'ফোন নম্বর প্রয়োজন';
    } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(teacherData.phone)) {
      errors.phone = 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন';
    }

    if (!teacherData.dateOfBirth) {
      errors.dateOfBirth = 'জন্ম তারিখ প্রয়োজন';
    }

    if (!teacherData.gender) {
      errors.gender = 'লিঙ্গ নির্বাচন করুন';
    }

    if (!teacherData.joinDate) {
      errors.joinDate = 'যোগদানের তারিখ প্রয়োজন';
    }

    if (!teacherData.qualifications?.length) {
      errors.qualifications = 'অন্তত একটি শিক্ষাগত যোগ্যতা যোগ করুন';
    }

    if (!teacherData.specializations?.length) {
      errors.specializations = 'অন্তত একটি বিশেষত্ব যোগ করুন';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, []);

  return {
    // State
    ...teacherState,
    
    // Actions
    getTeachers,
    getTeacherById,
    addTeacher,
    editTeacher,
    removeTeacher,
    assignCoursesToTeacher,
    performBulkOperation,
    getTeacherStats,
    
    // Filter management
    updateFilters,
    resetFilters,
    
    // Selection management
    updateSelectedTeachers,
    toggleSelection,
    selectAll,
    clearSelections,
    
    // Error management
    clearErrors,
    
    // Current teacher
    setActiveTeacher,
    
    // Helper functions
    getFilteredTeachers,
    getTeachersByStatus,
    getTeachersBySpecialization,
    getTeachersWithCourses,
    getTeachersWithoutCourses,
    getTeacherCourseAssignments,
    isTeacherSelected,
    getSelectedTeachersCount,
    canDeleteSelectedTeachers,
    
    // Validation
    validateTeacherData,
  };
};