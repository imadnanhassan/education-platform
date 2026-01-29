import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Teacher,
  TeacherState,
  TeacherFilters,
  CreateTeacherRequest,
  UpdateTeacherRequest,
  AssignCoursesRequest,
  CourseAssignment,
  TeacherPerformance,
  BulkTeacherOperation,
  TeacherStats,
} from '../types/teacher';

// Dummy data for teachers
const dummyTeachers: Teacher[] = [
  {
    id: 'teacher-001',
    employeeId: 'GA-T-001',
    firstName: 'ড. মোহাম্মদ',
    lastName: 'করিম',
    email: 'karim@graviton.edu.bd',
    phone: '01712345678',
    dateOfBirth: '1980-05-15',
    gender: 'male',
    address: {
      street: '১২৩ ধানমন্ডি রোড',
      city: 'ঢাকা',
      district: 'ঢাকা',
      postalCode: '১২০৫',
      country: 'বাংলাদেশ',
      division: ''
    },
    qualifications: [
      {
        id: 'qual-001',
        degree: 'পিএইচডি পদার্থবিজ্ঞান',
        institution: 'ঢাকা বিশ্ববিদ্যালয়',
        year: '2010',
        grade: 'A+',
        subject: 'পদার্থবিজ্ঞান',
      },
      {
        id: 'qual-002',
        degree: 'এমএসসি পদার্থবিজ্ঞান',
        institution: 'ঢাকা বিশ্ববিদ্যালয়',
        year: '2005',
        grade: 'A+',
        subject: 'পদার্থবিজ্ঞান',
      },
    ],
    experience: [
      {
        id: 'exp-001',
        position: 'সহযোগী অধ্যাপক',
        organization: 'ঢাকা বিশ্ববিদ্যালয়',
        startDate: '2015-01-01',
        endDate: '2023-12-31',
        description: 'পদার্থবিজ্ঞান বিভাগে শিক্ষকতা ও গবেষণা',
        isCurrent: false,
      },
    ],
    specializations: ['পদার্থবিজ্ঞান', 'গণিত', 'কোয়ান্টাম মেকানিক্স'],
    assignedCourses: ['course-001', 'course-002'],
    avatar: '/assets/images/teachers/karim.jpg',
    bio: 'পদার্থবিজ্ঞানে ১৫ বছরের অভিজ্ঞতা সম্পন্ন শিক্ষক। কোয়ান্টাম মেকানিক্স ও তাত্ত্বিক পদার্থবিজ্ঞানে বিশেষজ্ঞ।',
    bioEn: 'Experienced physics teacher with 15 years of expertise in quantum mechanics and theoretical physics.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karim-physics',
      website: 'https://karimphysics.com',
    },
    status: 'active',
    joinDate: '2024-01-15',
    salary: 80000,
    emergencyContact: {
      name: 'ফাতেমা করিম',
      relationship: 'স্ত্রী',
      phone: '01798765432',
    },
    isPublicProfile: true,
    canTeachOnline: true,
    preferredSubjects: ['পদার্থবিজ্ঞান', 'গণিত'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    createdBy: 'admin-001',
    updatedBy: 'admin-001',
  },
  {
    id: 'teacher-002',
    employeeId: 'GA-T-002',
    firstName: 'রাহেলা',
    lastName: 'খাতুন',
    email: 'rahela@graviton.edu.bd',
    phone: '01823456789',
    dateOfBirth: '1985-08-22',
    gender: 'female',
    address: {
      street: '৪৫৬ গুলশান এভিনিউ',
      city: 'ঢাকা',
      district: 'ঢাকা',
      postalCode: '১২১২',
      country: 'বাংলাদেশ',
      division: ''
    },
    qualifications: [
      {
        id: 'qual-003',
        degree: 'এমএ বাংলা সাহিত্য',
        institution: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
        year: '2008',
        grade: 'A',
        subject: 'বাংলা সাহিত্য',
      },
    ],
    experience: [
      {
        id: 'exp-002',
        position: 'প্রভাষক',
        organization: 'আদর্শ কলেজ',
        startDate: '2010-03-01',
        endDate: '2024-01-10',
        description: 'বাংলা সাহিত্য ও ভাষা শিক্ষাদান',
        isCurrent: false,
      },
    ],
    specializations: ['বাংলা সাহিত্য', 'বাংলা ভাষা', 'কবিতা'],
    assignedCourses: ['course-003'],
    avatar: '/assets/images/teachers/rahela.jpg',
    bio: 'বাংলা সাহিত্যে দক্ষ শিক্ষিকা। কবিতা ও গদ্য বিশ্লেষণে পারদর্শী।',
    bioEn: 'Skilled Bengali literature teacher with expertise in poetry and prose analysis.',
    socialLinks: {
      facebook: 'https://facebook.com/rahela.khatun',
    },
    status: 'active',
    joinDate: '2024-01-20',
    salary: 65000,
    emergencyContact: {
      name: 'আব্দুল করিম',
      relationship: 'স্বামী',
      phone: '01734567890',
    },
    isPublicProfile: true,
    canTeachOnline: true,
    preferredSubjects: ['বাংলা সাহিত্য', 'বাংলা ভাষা'],
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-25T11:15:00Z',
    createdBy: 'admin-001',
    updatedBy: 'admin-001',
  },
  {
    id: 'teacher-003',
    employeeId: 'GA-T-003',
    firstName: 'আহমেদ',
    lastName: 'হাসান',
    email: 'ahmed@graviton.edu.bd',
    phone: '01934567890',
    dateOfBirth: '1978-12-10',
    gender: 'male',
    address: {
      street: '৭৮৯ বনানী রোড',
      city: 'ঢাকা',
      district: 'ঢাকা',
      postalCode: '১২১৩',
      country: 'বাংলাদেশ',
      division: ''
    },
    qualifications: [
      {
        id: 'qual-004',
        degree: 'এমএসসি গণিত',
        institution: 'বুয়েট',
        year: '2002',
        grade: 'A+',
        subject: 'গণিত',
      },
    ],
    experience: [
      {
        id: 'exp-003',
        position: 'সিনিয়র শিক্ষক',
        organization: 'আইডিয়াল স্কুল',
        startDate: '2005-06-01',
        endDate: '2023-12-31',
        description: 'উচ্চ মাধ্যমিক গণিত শিক্ষাদান',
        isCurrent: false,
      },
    ],
    specializations: ['গণিত', 'পরিসংখ্যান', 'ক্যালকুলাস'],
    assignedCourses: ['course-004', 'course-005'],
    avatar: '/assets/images/teachers/ahmed.jpg',
    bio: 'গণিতে ২০ বছরের অভিজ্ঞতা। জটিল গাণিতিক সমস্যা সমাধানে দক্ষ।',
    bioEn: 'Mathematics expert with 20 years of experience in solving complex mathematical problems.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmed-hasan-math',
      youtube: 'https://youtube.com/c/AhmedMathTutorials',
    },
    status: 'active',
    joinDate: '2024-02-01',
    salary: 75000,
    emergencyContact: {
      name: 'সালমা হাসান',
      relationship: 'স্ত্রী',
      phone: '01845678901',
    },
    isPublicProfile: true,
    canTeachOnline: true,
    preferredSubjects: ['গণিত', 'পরিসংখ্যান'],
    createdAt: '2024-02-01T08:30:00Z',
    updatedAt: '2024-02-05T14:20:00Z',
    createdBy: 'admin-001',
    updatedBy: 'admin-001',
  },
  {
    id: 'teacher-004',
    employeeId: 'GA-T-004',
    firstName: 'নাসরিন',
    lastName: 'আক্তার',
    email: 'nasrin@graviton.edu.bd',
    phone: '01645678901',
    dateOfBirth: '1990-03-18',
    gender: 'female',
    address: {
      street: '৩২১ উত্তরা সেক্টর ৭',
      city: 'ঢাকা',
      district: 'ঢাকা',
      postalCode: '১২৩০',
      country: 'বাংলাদেশ',
      division: ''
    },
    qualifications: [
      {
        id: 'qual-005',
        degree: 'এমএসসি রসায়ন',
        institution: 'চট্টগ্রাম বিশ্ববিদ্যালয়',
        year: '2013',
        grade: 'A',
        subject: 'রসায়ন',
      },
    ],
    experience: [
      {
        id: 'exp-004',
        position: 'জুনিয়র শিক্ষক',
        organization: 'মডেল কলেজ',
        startDate: '2014-01-01',
        endDate: '2023-12-31',
        description: 'রসায়ন বিষয়ে শিক্ষাদান ও ল্যাব পরিচালনা',
        isCurrent: false,
      },
    ],
    specializations: ['রসায়ন', 'জৈব রসায়ন', 'ল্যাবরেটরি'],
    assignedCourses: ['course-006'],
    avatar: '/assets/images/teachers/nasrin.jpg',
    bio: 'রসায়নে বিশেষজ্ঞ শিক্ষিকা। ল্যাবরেটরি কাজে অভিজ্ঞ।',
    bioEn: 'Chemistry specialist with extensive laboratory experience.',
    socialLinks: {
      facebook: 'https://facebook.com/nasrin.chemistry',
    },
    status: 'on_leave',
    joinDate: '2024-02-15',
    salary: 60000,
    emergencyContact: {
      name: 'মোহাম্মদ আলী',
      relationship: 'স্বামী',
      phone: '01756789012',
    },
    isPublicProfile: true,
    canTeachOnline: false,
    preferredSubjects: ['রসায়ন', 'জৈব রসায়ন'],
    createdAt: '2024-02-15T10:45:00Z',
    updatedAt: '2024-02-20T16:30:00Z',
    createdBy: 'admin-001',
    updatedBy: 'admin-001',
  },
  {
    id: 'teacher-005',
    employeeId: 'GA-T-005',
    firstName: 'তানভীর',
    lastName: 'রহমান',
    email: 'tanvir@graviton.edu.bd',
    phone: '01567890123',
    dateOfBirth: '1988-07-25',
    gender: 'male',
    address: {
      street: '৬৫৪ মিরপুর রোড',
      city: 'ঢাকা',
      district: 'ঢাকা',
      postalCode: '১২১৬',
      country: 'বাংলাদেশ',
      division: ''
    },
    qualifications: [
      {
        id: 'qual-006',
        degree: 'বিএসসি কম্পিউটার সায়েন্স',
        institution: 'বুয়েট',
        year: '2011',
        grade: 'A+',
        subject: 'কম্পিউটার সায়েন্স',
      },
    ],
    experience: [
      {
        id: 'exp-005',
        position: 'সফটওয়্যার ইঞ্জিনিয়ার',
        organization: 'টেক কোম্পানি',
        startDate: '2011-07-01',
        endDate: '2023-12-31',
        description: 'ওয়েব ডেভেলপমেন্ট ও সফটওয়্যার ডিজাইন',
        isCurrent: false,
      },
    ],
    specializations: ['কম্পিউটার সায়েন্স', 'প্রোগ্রামিং', 'ওয়েব ডেভেলপমেন্ট'],
    assignedCourses: ['course-007'],
    avatar: '/assets/images/teachers/tanvir.jpg',
    bio: 'কম্পিউটার সায়েন্স ও প্রোগ্রামিং এ দক্ষ। ইন্ডাস্ট্রি অভিজ্ঞতা সম্পন্ন।',
    bioEn: 'Computer science expert with industry experience in programming and web development.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/tanvir-rahman-dev',
      website: 'https://tanvirdev.com',
      github: 'https://github.com/tanvirrahman',
    },
    status: 'active',
    joinDate: '2024-03-01',
    salary: 90000,
    emergencyContact: {
      name: 'সাবিনা রহমান',
      relationship: 'স্ত্রী',
      phone: '01678901234',
    },
    isPublicProfile: true,
    canTeachOnline: true,
    preferredSubjects: ['কম্পিউটার সায়েন্স', 'প্রোগ্রামিং'],
    createdAt: '2024-03-01T09:15:00Z',
    updatedAt: '2024-03-05T13:45:00Z',
    createdBy: 'admin-001',
    updatedBy: 'admin-001',
  },
];

// Dummy course assignments
const dummyCourseAssignments: CourseAssignment[] = [
  {
    id: 'assign-001',
    teacherId: 'teacher-001',
    courseId: 'course-001',
    courseName: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান',
    assignedDate: '2024-01-15',
    assignedBy: 'admin-001',
    status: 'active',
    notes: 'প্রধান শিক্ষক হিসেবে নিয়োগ',
  },
  {
    id: 'assign-002',
    teacherId: 'teacher-001',
    courseId: 'course-002',
    courseName: 'গণিত - ক্যালকুলাস',
    assignedDate: '2024-01-20',
    assignedBy: 'admin-001',
    status: 'active',
    notes: 'সহায়ক শিক্ষক',
  },
  {
    id: 'assign-003',
    teacherId: 'teacher-002',
    courseId: 'course-003',
    courseName: 'বাংলা সাহিত্য',
    assignedDate: '2024-01-25',
    assignedBy: 'admin-001',
    status: 'active',
  },
];

// Dummy teacher stats
const dummyTeacherStats: TeacherStats = {
  totalTeachers: 5,
  activeTeachers: 4,
  inactiveTeachers: 0,
  onLeaveTeachers: 1,
  averageExperience: 12.5,
  totalCourseAssignments: 7,
  averageRating: 4.6,
  newTeachersThisMonth: 2,
};

// Initial state
const initialState: TeacherState = {
  teachers: dummyTeachers,
  currentTeacher: null,
  courseAssignments: dummyCourseAssignments,
  teacherPerformances: [],
  stats: dummyTeacherStats,
  filters: {
    search: '',
    status: 'all',
    specialization: '',
    gender: 'all',
    joinDateFrom: '',
    joinDateTo: '',
    hasAssignedCourses: 'all',
    sortBy: 'joinDate',
    sortOrder: 'desc',
  },
  loading: false,
  error: null,
  selectedTeachers: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 5,
    totalPages: 1,
  },
};

// Async thunks for API calls (simulated with dummy data)
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (params: { page?: number; limit?: number; filters?: TeacherFilters }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filteredTeachers = [...dummyTeachers];
    
    // Apply filters
    if (params.filters?.search) {
      const search = params.filters.search.toLowerCase();
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.firstName.toLowerCase().includes(search) ||
        teacher.lastName.toLowerCase().includes(search) ||
        teacher.email.toLowerCase().includes(search) ||
        teacher.employeeId.toLowerCase().includes(search)
      );
    }
    
    if (params.filters?.status && params.filters.status !== 'all') {
      filteredTeachers = filteredTeachers.filter(teacher => teacher.status === params.filters?.status);
    }
    
    if (params.filters?.gender && params.filters.gender !== 'all') {
      filteredTeachers = filteredTeachers.filter(teacher => teacher.gender === params.filters?.gender);
    }
    
    if (params.filters?.specialization) {
      filteredTeachers = filteredTeachers.filter(teacher =>
        teacher.specializations.some(spec => 
          spec.toLowerCase().includes(params.filters?.specialization?.toLowerCase() || '')
        )
      );
    }
    
    // Apply sorting
    if (params.filters?.sortBy) {
      filteredTeachers.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (params.filters?.sortBy) {
          case 'name':
            aValue = `${a.firstName} ${a.lastName}`;
            bValue = `${b.firstName} ${b.lastName}`;
            break;
          case 'employeeId':
            aValue = a.employeeId;
            bValue = b.employeeId;
            break;
          case 'email':
            aValue = a.email;
            bValue = b.email;
            break;
          case 'joinDate':
            aValue = new Date(a.joinDate);
            bValue = new Date(b.joinDate);
            break;
          case 'assignedCourses':
            aValue = a.assignedCourses.length;
            bValue = b.assignedCourses.length;
            break;
          default:
            aValue = a.joinDate;
            bValue = b.joinDate;
        }
        
        if (params.filters?.sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
      });
    }
    
    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);
    
    return {
      teachers: paginatedTeachers,
      pagination: {
        page,
        limit,
        total: filteredTeachers.length,
        totalPages: Math.ceil(filteredTeachers.length / limit),
      },
    };
  }
);

export const fetchTeacherById = createAsyncThunk(
  'teachers/fetchTeacherById',
  async (teacherId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const teacher = dummyTeachers.find(t => t.id === teacherId);
    if (!teacher) {
      throw new Error('শিক্ষক খুঁজে পাওয়া যায়নি');
    }
    
    return teacher;
  }
);

export const createTeacher = createAsyncThunk(
  'teachers/createTeacher',
  async (teacherData: CreateTeacherRequest) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate new teacher ID and employee ID
    const newId = `teacher-${String(dummyTeachers.length + 1).padStart(3, '0')}`;
    const newEmployeeId = `GA-T-${String(dummyTeachers.length + 1).padStart(3, '0')}`;
    
    const newTeacher: Teacher = {
      ...teacherData,
      id: newId,
      employeeId: newEmployeeId,
      qualifications: teacherData.qualifications.map((qual, index) => ({
        ...qual,
        id: `qual-${newId}-${index + 1}`,
      })),
      experience: teacherData.experience.map((exp, index) => ({
        ...exp,
        id: `exp-${newId}-${index + 1}`,
      })),
      assignedCourses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin-001',
      updatedBy: 'admin-001',
      status: 'active'
    };
    
    return newTeacher;
  }
);

export const updateTeacher = createAsyncThunk(
  'teachers/updateTeacher',
  async (teacherData: UpdateTeacherRequest) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingTeacher = dummyTeachers.find(t => t.id === teacherData.id);
    if (!existingTeacher) {
      throw new Error('শিক্ষক খুঁজে পাওয়া যায়নি');
    }
    
    // Ensure qualifications and experience have IDs and are not undefined
    const processedData = {
      ...teacherData,
      qualifications: teacherData.qualifications?.map((qual, index) => ({
        ...qual,
        id: (qual as any).id || `qual-${teacherData.id}-${index + 1}`,
      })) || existingTeacher.qualifications,
      experience: teacherData.experience?.map((exp, index) => ({
        ...exp,
        id: (exp as any).id || `exp-${teacherData.id}-${index + 1}`,
      })) || existingTeacher.experience,
    };
    
    const updatedTeacher: Teacher = {
      ...existingTeacher,
      ...processedData,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin-001',
    };
    
    return updatedTeacher;
  }
);

export const deleteTeacher = createAsyncThunk(
  'teachers/deleteTeacher',
  async (teacherId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const teacher = dummyTeachers.find(t => t.id === teacherId);
    if (!teacher) {
      throw new Error('শিক্ষক খুঁজে পাওয়া যায়নি');
    }
    
    // Check if teacher has assigned courses
    if (teacher.assignedCourses.length > 0) {
      throw new Error('এই শিক্ষকের কোর্স বরাদ্দ রয়েছে। প্রথমে কোর্স বরাদ্দ বাতিল করুন।');
    }
    
    return teacherId;
  }
);

export const assignCourses = createAsyncThunk(
  'teachers/assignCourses',
  async (assignmentData: AssignCoursesRequest) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const teacher = dummyTeachers.find(t => t.id === assignmentData.teacherId);
    if (!teacher) {
      throw new Error('শিক্ষক খুঁজে পাওয়া যায়নি');
    }
    
    // Create course assignments
    const newAssignments: CourseAssignment[] = assignmentData.courseIds.map((courseId, index) => ({
      id: `assign-${Date.now()}-${index}`,
      teacherId: assignmentData.teacherId,
      courseId,
      courseName: `কোর্স ${courseId}`, // In real app, fetch course name
      assignedDate: assignmentData.assignedDate,
      assignedBy: 'admin-001',
      status: 'active',
      notes: assignmentData.notes,
    }));
    
    return {
      teacherId: assignmentData.teacherId,
      assignments: newAssignments,
      courseIds: assignmentData.courseIds,
    };
  }
);

export const bulkUpdateTeachers = createAsyncThunk(
  'teachers/bulkUpdateTeachers',
  async (operationData: BulkTeacherOperation) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { teacherIds, operation } = operationData;
    
    // Validate teachers exist
    const teachers = dummyTeachers.filter(t => teacherIds.includes(t.id));
    if (teachers.length !== teacherIds.length) {
      throw new Error('কিছু শিক্ষক খুঁজে পাওয়া যায়নি');
    }
    
    // Apply operation
    let newStatus: Teacher['status'];
    switch (operation) {
      case 'activate':
        newStatus = 'active';
        break;
      case 'deactivate':
        newStatus = 'inactive';
        break;
      case 'set_on_leave':
        newStatus = 'on_leave';
        break;
      case 'delete':
        // Check if any teacher has assigned courses
        const teachersWithCourses = teachers.filter(t => t.assignedCourses.length > 0);
        if (teachersWithCourses.length > 0) {
          throw new Error('কিছু শিক্ষকের কোর্স বরাদ্দ রয়েছে। প্রথমে কোর্স বরাদ্দ বাতিল করুন।');
        }
        return { operation, teacherIds };
      default:
        throw new Error('অবৈধ অপারেশন');
    }
    
    return { operation, teacherIds, newStatus };
  }
);

export const fetchTeacherStats = createAsyncThunk(
  'teachers/fetchTeacherStats',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return dummyTeacherStats;
  }
);

// Teacher slice
const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TeacherFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedTeachers: (state, action: PayloadAction<string[]>) => {
      state.selectedTeachers = action.payload;
    },
    toggleTeacherSelection: (state, action: PayloadAction<string>) => {
      const teacherId = action.payload;
      const index = state.selectedTeachers.indexOf(teacherId);
      if (index > -1) {
        state.selectedTeachers.splice(index, 1);
      } else {
        state.selectedTeachers.push(teacherId);
      }
    },
    selectAllTeachers: (state) => {
      state.selectedTeachers = state.teachers.map(teacher => teacher.id);
    },
    clearSelection: (state) => {
      state.selectedTeachers = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentTeacher: (state, action: PayloadAction<Teacher | null>) => {
      state.currentTeacher = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload.teachers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'শিক্ষক তালিকা লোড করতে ব্যর্থ';
      })
      
      // Fetch teacher by ID
      .addCase(fetchTeacherById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTeacher = action.payload;
      })
      .addCase(fetchTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'শিক্ষকের তথ্য লোড করতে ব্যর্থ';
      })
      
      // Create teacher
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.unshift(action.payload);
        state.stats.totalTeachers += 1;
        state.stats.activeTeachers += 1;
        state.stats.newTeachersThisMonth += 1;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'শিক্ষক তৈরি করতে ব্যর্থ';
      })
      
      // Update teacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex(t => t.id === action.payload.id);
        if (index > -1) {
          state.teachers[index] = action.payload;
        }
        if (state.currentTeacher?.id === action.payload.id) {
          state.currentTeacher = action.payload;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'শিক্ষকের তথ্য আপডেট করতে ব্যর্থ';
      })
      
      // Delete teacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter(t => t.id !== action.payload);
        state.stats.totalTeachers -= 1;
        state.stats.activeTeachers -= 1;
        if (state.currentTeacher?.id === action.payload) {
          state.currentTeacher = null;
        }
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'শিক্ষক মুছতে ব্যর্থ';
      })
      
      // Assign courses
      .addCase(assignCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignCourses.fulfilled, (state, action) => {
        state.loading = false;
        const { teacherId, assignments, courseIds } = action.payload;
        
        // Update teacher's assigned courses
        const teacherIndex = state.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex > -1) {
          state.teachers[teacherIndex].assignedCourses = [
            ...state.teachers[teacherIndex].assignedCourses,
            ...courseIds,
          ];
        }
        
        // Add course assignments
        state.courseAssignments.push(...assignments);
        state.stats.totalCourseAssignments += assignments.length;
      })
      .addCase(assignCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'কোর্স বরাদ্দ করতে ব্যর্থ';
      })
      
      // Bulk update teachers
      .addCase(bulkUpdateTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkUpdateTeachers.fulfilled, (state, action) => {
        state.loading = false;
        const { operation, teacherIds, newStatus } = action.payload;
        
        if (operation === 'delete') {
          state.teachers = state.teachers.filter(t => !teacherIds.includes(t.id));
          state.stats.totalTeachers -= teacherIds.length;
        } else if (newStatus) {
          teacherIds.forEach(teacherId => {
            const teacherIndex = state.teachers.findIndex(t => t.id === teacherId);
            if (teacherIndex > -1) {
              const oldStatus = state.teachers[teacherIndex].status;
              state.teachers[teacherIndex].status = newStatus;
              
              // Update stats
              if (oldStatus === 'active' && newStatus !== 'active') {
                state.stats.activeTeachers -= 1;
              } else if (oldStatus !== 'active' && newStatus === 'active') {
                state.stats.activeTeachers += 1;
              }
              
              if (newStatus === 'on_leave') {
                state.stats.onLeaveTeachers += 1;
              } else if (oldStatus === 'on_leave') {
                state.stats.onLeaveTeachers -= 1;
              }
            }
          });
        }
        
        state.selectedTeachers = [];
      })
      .addCase(bulkUpdateTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'বাল্ক অপারেশন ব্যর্থ';
      })
      
      // Fetch teacher stats
      .addCase(fetchTeacherStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setSelectedTeachers,
  toggleTeacherSelection,
  selectAllTeachers,
  clearSelection,
  clearError,
  setCurrentTeacher,
} = teacherSlice.actions;

export default teacherSlice.reducer;