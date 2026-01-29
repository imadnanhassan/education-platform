// Student Management Types

export interface Address {
  street: string;
  city: string;
  district: string;
  division: string;
  postalCode: string;
  country: string;
}

export interface Guardian {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  occupation?: string;
}

export interface AcademicInfo {
  class: string;
  section?: string;
  rollNumber?: string;
  institution: string;
  board: string;
  passingYear?: string;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  courseName: string;
  enrolledAt: string;
  status: 'enrolled' | 'completed' | 'dropped';
  progress: number; // percentage
  grade?: string;
  completedAt?: string;
  certificateUrl?: string;
}

export interface Student {
  id: string;
  studentId: string; // unique student ID (GA2024001)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: Address;
  guardian: Guardian;
  academicInfo: AcademicInfo;
  enrolledCourses: CourseEnrollment[];
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  nationality: string;
  religion?: string;
  totalCoursesCompleted: number;
  totalCertificatesEarned: number;
  overallGPA?: number;
  lastLoginAt?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentFilter {
  search?: string;
  status?: 'all' | 'active' | 'inactive' | 'suspended';
  class?: string;
  gender?: 'all' | 'male' | 'female' | 'other';
  enrollmentDateFrom?: string;
  enrollmentDateTo?: string;
  courseId?: string;
  district?: string;
  board?: string;
  sortBy?: 'name' | 'studentId' | 'email' | 'createdAt' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  suspendedStudents: number;
  newStudentsThisMonth: number;
  studentsWithCourses: number;
  averageCoursesPerStudent: number;
  topPerformers: Student[];
  recentEnrollments: CourseEnrollment[];
  studentsByClass: { class: string; count: number }[];
  studentsByDistrict: { district: string; count: number }[];
  studentsByGender: { gender: string; count: number }[];
  enrollmentTrends: { month: string; count: number }[];
}

export interface BulkStudentOperation {
  studentIds: string[];
  operation: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'export';
  reason?: string;
  notifyStudents?: boolean;
}

export interface StudentImportData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  class: string;
  section?: string;
  institution: string;
  board: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelationship: string;
  street: string;
  city: string;
  district: string;
  division: string;
  postalCode: string;
}

export interface StudentExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  fields: string[];
  filters?: StudentFilter;
  includeEnrollments?: boolean;
  includeGuardianInfo?: boolean;
  includeAcademicInfo?: boolean;
}

export interface StudentActivity {
  id: string;
  studentId: string;
  type: 'enrollment' | 'completion' | 'login' | 'profile_update' | 'status_change';
  description: string;
  metadata?: any;
  timestamp: string;
  performedBy?: string; // admin who performed the action
}

export interface StudentNote {
  id: string;
  studentId: string;
  content: string;
  type: 'general' | 'academic' | 'behavioral' | 'medical' | 'administrative';
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Redux State Types
export interface StudentState {
  students: Student[];
  currentStudent: Student | null;
  stats: StudentStats | null;
  activities: StudentActivity[];
  notes: StudentNote[];
  filters: StudentFilter;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: {
    list: boolean;
    details: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    stats: boolean;
    export: boolean;
    import: boolean;
  };
  error: {
    list: string | null;
    details: string | null;
    create: string | null;
    update: string | null;
    delete: string | null;
    stats: string | null;
    export: string | null;
    import: string | null;
  };
  selectedStudents: string[];
  searchResults: Student[];
  recentlyViewed: Student[];
  importProgress: {
    total: number;
    processed: number;
    errors: string[];
    isImporting: boolean;
  };
}

// API Response Types
export interface StudentListResponse {
  students: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface StudentStatsResponse {
  stats: StudentStats;
}

export interface StudentActivityResponse {
  activities: StudentActivity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types (re-export from validations)
export type {
  StudentFormData,
  CreateStudentFormData,
  UpdateStudentFormData,
  GuardianFormData,
  AcademicInfoFormData,
  CourseEnrollmentFormData,
  StudentFilterFormData,
  BulkStudentOperationFormData,
} from '@/lib/validations/student';