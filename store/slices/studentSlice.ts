import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Student,
  StudentState,
  StudentFilter,
  StudentStats,
  StudentActivity,
  StudentNote,
  BulkStudentOperation,
  StudentImportData,
  StudentExportOptions,
  StudentListResponse,
  StudentStatsResponse,
  StudentActivityResponse,
  CreateStudentFormData,
  UpdateStudentFormData,
} from '@/store/types/student';

// Initial state
const initialState: StudentState = {
  students: [],
  currentStudent: null,
  stats: null,
  activities: [],
  notes: [],
  filters: {
    search: '',
    status: 'all',
    class: '',
    gender: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 20,
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  loading: {
    list: false,
    details: false,
    create: false,
    update: false,
    delete: false,
    stats: false,
    export: false,
    import: false,
  },
  error: {
    list: null,
    details: null,
    create: null,
    update: null,
    delete: null,
    stats: null,
    export: null,
    import: null,
  },
  selectedStudents: [],
  searchResults: [],
  recentlyViewed: [],
  importProgress: {
    total: 0,
    processed: 0,
    errors: [],
    isImporting: false,
  },
};

// Dummy data for development
const generateDummyStudents = (): Student[] => {
  const bangladeshiNames = [
    { first: 'রাহুল', last: 'আহমেদ' },
    { first: 'ফাতিমা', last: 'খান' },
    { first: 'আরিফ', last: 'রহমান' },
    { first: 'সাদিয়া', last: 'ইসলাম' },
    { first: 'তানভীর', last: 'হাসান' },
    { first: 'নুসরাত', last: 'জাহান' },
    { first: 'মাহবুব', last: 'আলম' },
    { first: 'রুমানা', last: 'আক্তার' },
    { first: 'শাহরিয়ার', last: 'কবীর' },
    { first: 'তাসনিম', last: 'চৌধুরী' },
    { first: 'ইমরান', last: 'হোসেন' },
    { first: 'জান্নাত', last: 'আরা' },
    { first: 'নাফিস', last: 'উদ্দিন' },
    { first: 'সুমাইয়া', last: 'বেগম' },
    { first: 'রাকিব', last: 'হাসান' },
  ];

  const districts = ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];
  const classes = ['৯ম', '১০ম', '১১শ', '১২শ', 'স্নাতক ১ম বর্ষ', 'স্নাতক ২য় বর্ষ'];
  const boards = ['ঢাকা', 'চট্টগ্রাম', 'কুমিল্লা', 'রাজশাহী', 'যশোর', 'বরিশাল', 'সিলেট', 'দিনাজপুর'];
  const institutions = [
    'ঢাকা কলেজ',
    'নটর ডেম কলেজ',
    'হলি ক্রস কলেজ',
    'ভিকারুননিসা নূন স্কুল',
    'রাজউক উত্তরা মডেল কলেজ',
    'আদমজী ক্যান্টনমেন্ট কলেজ',
  ];

  return bangladeshiNames.map((name, index) => {
    const studentId = `GA${(2024000 + index + 1).toString()}`;
    const district = districts[index % districts.length];
    const studentClass = classes[index % classes.length];
    const board = boards[index % boards.length];
    const institution = institutions[index % institutions.length];
    const status = index % 10 === 0 ? 'inactive' : index % 15 === 0 ? 'suspended' : 'active';
    
    return {
      id: `student-${index + 1}`,
      studentId,
      firstName: name.first,
      lastName: name.last,
      email: `${name.first.toLowerCase().replace(/[^\w]/g, '')}.${name.last.toLowerCase().replace(/[^\w]/g, '')}@example.com`,
      phone: `01${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 90000000 + 10000000)}`,
      dateOfBirth: `${1995 + Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      gender: (index % 3 === 0 ? 'female' : 'male') as 'male' | 'female',
      address: {
        street: `${Math.floor(Math.random() * 100) + 1} নং রোড`,
        city: district,
        district,
        division: district === 'ঢাকা' ? 'ঢাকা' : district === 'চট্টগ্রাম' ? 'চট্টগ্রাম' : 'অন্যান্য',
        postalCode: `${Math.floor(Math.random() * 9000) + 1000}`,
        country: 'Bangladesh',
      },
      guardian: {
        name: `${name.first} এর পিতা`,
        relationship: 'পিতা',
        phone: `01${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 90000000 + 10000000)}`,
        email: `guardian.${name.first.toLowerCase().replace(/[^\w]/g, '')}@example.com`,
        occupation: ['ব্যবসায়ী', 'চাকরিজীবী', 'শিক্ষক', 'ডাক্তার', 'ইঞ্জিনিয়ার'][Math.floor(Math.random() * 5)],
      },
      academicInfo: {
        class: studentClass,
        section: ['ক', 'খ', 'গ'][Math.floor(Math.random() * 3)],
        rollNumber: `${Math.floor(Math.random() * 50) + 1}`,
        institution,
        board,
        passingYear: studentClass.includes('১২শ') ? '2024' : '',
      },
      enrolledCourses: [
        {
          id: `enrollment-${index + 1}-1`,
          courseId: `course-${Math.floor(Math.random() * 5) + 1}`,
          courseName: ['উচ্চ মাধ্যমিক পদার্থবিজ্ঞান', 'উচ্চ মাধ্যমিক রসায়ন', 'উচ্চ মাধ্যমিক গণিত', 'উচ্চ মাধ্যমিক জীববিজ্ঞান', 'ইংরেজি ভাষা'][Math.floor(Math.random() * 5)],
          enrolledAt: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
          status: ['enrolled', 'completed', 'dropped'][Math.floor(Math.random() * 3)] as 'enrolled' | 'completed' | 'dropped',
          progress: Math.floor(Math.random() * 100),
          grade: Math.random() > 0.5 ? ['A+', 'A', 'A-', 'B+', 'B'][Math.floor(Math.random() * 5)] : undefined,
        },
      ],
      status: status as 'active' | 'inactive' | 'suspended',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.first + ' ' + name.last)}&background=10b981&color=fff`,
      bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'][Math.floor(Math.random() * 8)] as any,
      nationality: 'Bangladeshi',
      religion: ['ইসলাম', 'হিন্দু', 'বৌদ্ধ', 'খ্রিস্টান'][Math.floor(Math.random() * 4)],
      totalCoursesCompleted: Math.floor(Math.random() * 5),
      totalCertificatesEarned: Math.floor(Math.random() * 3),
      overallGPA: Math.random() * 2 + 3, // 3.0 to 5.0
      isEmailVerified: Math.random() > 0.2,
      isPhoneVerified: Math.random() > 0.3,
      createdAt: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}T10:00:00Z`,
      updatedAt: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}T10:00:00Z`,
    };
  });
};

// Async thunks for API calls
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (filters: StudentFilter = {}) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dummyStudents = generateDummyStudents();
    let filteredStudents = [...dummyStudents];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredStudents = filteredStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.studentId.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.status === filters.status);
    }

    if (filters.class) {
      filteredStudents = filteredStudents.filter(student => student.academicInfo.class === filters.class);
    }

    if (filters.gender && filters.gender !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.gender === filters.gender);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredStudents.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (filters.sortBy) {
          case 'name':
            aValue = `${a.firstName} ${a.lastName}`;
            bValue = `${b.firstName} ${b.lastName}`;
            break;
          case 'studentId':
            aValue = a.studentId;
            bValue = b.studentId;
            break;
          case 'email':
            aValue = a.email;
            bValue = b.email;
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
          default:
            aValue = a.createdAt;
            bValue = b.createdAt;
        }

        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    const response: StudentListResponse = {
      students: paginatedStudents,
      pagination: {
        page,
        limit,
        total: filteredStudents.length,
        totalPages: Math.ceil(filteredStudents.length / limit),
      },
    };

    return response;
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (studentId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dummyStudents = generateDummyStudents();
    const student = dummyStudents.find(s => s.id === studentId);
    
    if (!student) {
      throw new Error('Student not found');
    }
    
    return student;
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (studentData: CreateStudentFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStudent: Student = {
      id: `student-${Date.now()}`,
      studentId: `GA${Date.now().toString().slice(-7)}`,
      ...studentData,
      enrolledCourses: [],
      totalCoursesCompleted: 0,
      totalCertificatesEarned: 0,
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newStudent;
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }: { id: string; data: UpdateStudentFormData }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedStudent: Student = {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    } as Student;
    
    return updatedStudent;
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return studentId;
  }
);

export const fetchStudentStats = createAsyncThunk(
  'students/fetchStudentStats',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const dummyStudents = generateDummyStudents();
    
    const stats: StudentStats = {
      totalStudents: dummyStudents.length,
      activeStudents: dummyStudents.filter(s => s.status === 'active').length,
      inactiveStudents: dummyStudents.filter(s => s.status === 'inactive').length,
      suspendedStudents: dummyStudents.filter(s => s.status === 'suspended').length,
      newStudentsThisMonth: Math.floor(dummyStudents.length * 0.1),
      studentsWithCourses: dummyStudents.filter(s => s.enrolledCourses.length > 0).length,
      averageCoursesPerStudent: dummyStudents.reduce((acc, s) => acc + s.enrolledCourses.length, 0) / dummyStudents.length,
      topPerformers: dummyStudents.filter(s => s.overallGPA && s.overallGPA > 4.5).slice(0, 5),
      recentEnrollments: dummyStudents.flatMap(s => s.enrolledCourses).slice(0, 10),
      studentsByClass: [
        { class: '৯ম', count: 25 },
        { class: '১০ম', count: 30 },
        { class: '১১শ', count: 28 },
        { class: '১২শ', count: 22 },
      ],
      studentsByDistrict: [
        { district: 'ঢাকা', count: 45 },
        { district: 'চট্টগ্রাম', count: 25 },
        { district: 'সিলেট', count: 15 },
        { district: 'রাজশাহী', count: 20 },
      ],
      studentsByGender: [
        { gender: 'male', count: 60 },
        { gender: 'female', count: 45 },
      ],
      enrollmentTrends: [
        { month: 'জানুয়ারি', count: 12 },
        { month: 'ফেব্রুয়ারি', count: 18 },
        { month: 'মার্চ', count: 25 },
        { month: 'এপ্রিল', count: 20 },
        { month: 'মে', count: 30 },
        { month: 'জুন', count: 22 },
      ],
    };
    
    return { stats };
  }
);

export const bulkUpdateStudents = createAsyncThunk(
  'students/bulkUpdateStudents',
  async (operation: BulkStudentOperation) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return operation;
  }
);

// Create the slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<StudentFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedStudents: (state, action: PayloadAction<string[]>) => {
      state.selectedStudents = action.payload;
    },
    toggleStudentSelection: (state, action: PayloadAction<string>) => {
      const studentId = action.payload;
      const index = state.selectedStudents.indexOf(studentId);
      if (index > -1) {
        state.selectedStudents.splice(index, 1);
      } else {
        state.selectedStudents.push(studentId);
      }
    },
    selectAllStudents: (state) => {
      state.selectedStudents = state.students.map(student => student.id);
    },
    clearSelection: (state) => {
      state.selectedStudents = [];
    },
    addToRecentlyViewed: (state, action: PayloadAction<Student>) => {
      const student = action.payload;
      const existingIndex = state.recentlyViewed.findIndex(s => s.id === student.id);
      
      if (existingIndex > -1) {
        state.recentlyViewed.splice(existingIndex, 1);
      }
      
      state.recentlyViewed.unshift(student);
      
      // Keep only last 10 items
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 10);
      }
    },
    clearErrors: (state) => {
      state.error = initialState.error;
    },
    setCurrentStudent: (state, action: PayloadAction<Student | null>) => {
      state.currentStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch students
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading.list = false;
        state.students = action.payload.students;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.error.message || 'Failed to fetch students';
      });

    // Fetch student by ID
    builder
      .addCase(fetchStudentById.pending, (state) => {
        state.loading.details = true;
        state.error.details = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading.details = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading.details = false;
        state.error.details = action.error.message || 'Failed to fetch student details';
      });

    // Create student
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading.create = false;
        state.students.unshift(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.error.message || 'Failed to create student';
      });

    // Update student
    builder
      .addCase(updateStudent.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index > -1) {
          state.students[index] = action.payload;
        }
        if (state.currentStudent?.id === action.payload.id) {
          state.currentStudent = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.error.message || 'Failed to update student';
      });

    // Delete student
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.students = state.students.filter(s => s.id !== action.payload);
        if (state.currentStudent?.id === action.payload) {
          state.currentStudent = null;
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message || 'Failed to delete student';
      });

    // Fetch stats
    builder
      .addCase(fetchStudentStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchStudentStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload.stats;
      })
      .addCase(fetchStudentStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.error.message || 'Failed to fetch student statistics';
      });

    // Bulk operations
    builder
      .addCase(bulkUpdateStudents.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(bulkUpdateStudents.fulfilled, (state, action) => {
        state.loading.update = false;
        // Update students based on operation
        const { studentIds, operation } = action.payload;
        
        state.students = state.students.map(student => {
          if (studentIds.includes(student.id)) {
            switch (operation.operation) {
              case 'activate':
                return { ...student, status: 'active' as const };
              case 'deactivate':
                return { ...student, status: 'inactive' as const };
              case 'suspend':
                return { ...student, status: 'suspended' as const };
              default:
                return student;
            }
          }
          return student;
        });
        
        // Clear selection after bulk operation
        state.selectedStudents = [];
      })
      .addCase(bulkUpdateStudents.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.error.message || 'Failed to perform bulk operation';
      });
  },
});

// Export actions
export const {
  setFilters,
  clearFilters,
  setSelectedStudents,
  toggleStudentSelection,
  selectAllStudents,
  clearSelection,
  addToRecentlyViewed,
  clearErrors,
  setCurrentStudent,
} = studentSlice.actions;

// Export reducer
export default studentSlice.reducer;