// Teacher Management Types for Admin Dashboard

export interface Address {
  street: string;
  city: string;
  district: string;
  division: string;
  postalCode: string;
  country?: string;
}

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
  subject?: string;
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrent: boolean;
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
  github?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: Address;
  qualifications: Qualification[];
  experience: Experience[];
  specializations: string[];
  assignedCourses: string[]; // course IDs
  avatar?: string;
  bio?: string;
  bioEn?: string;
  socialLinks?: SocialLinks;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
  salary?: number;
  emergencyContact?: EmergencyContact;
  isPublicProfile: boolean;
  canTeachOnline: boolean;
  preferredSubjects: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface CourseAssignment {
  id: string;
  teacherId: string;
  courseId: string;
  courseName: string;
  assignedDate: string;
  assignedBy: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface TeacherPerformance {
  id: string;
  teacherId: string;
  evaluationPeriod: string;
  overallRating: number;
  teachingQuality: number;
  studentEngagement: number;
  punctuality: number;
  feedback?: string;
  recommendations?: string;
  evaluatedBy: string;
  evaluatedAt: string;
}

export interface TeacherStats {
  totalTeachers: number;
  activeTeachers: number;
  inactiveTeachers: number;
  onLeaveTeachers: number;
  averageExperience: number;
  totalCourseAssignments: number;
  averageRating: number;
  newTeachersThisMonth: number;
}

export interface TeacherFilters {
  search?: string;
  status?: 'all' | 'active' | 'inactive' | 'on_leave';
  specialization?: string;
  gender?: 'all' | 'male' | 'female' | 'other';
  joinDateFrom?: string;
  joinDateTo?: string;
  hasAssignedCourses?: 'all' | 'yes' | 'no';
  sortBy?: 'name' | 'employeeId' | 'email' | 'joinDate' | 'assignedCourses';
  sortOrder?: 'asc' | 'desc';
}

export interface BulkTeacherOperation {
  teacherIds: string[];
  operation: 'activate' | 'deactivate' | 'set_on_leave' | 'delete';
  reason?: string;
  effectiveDate?: string;
}

export interface TeacherState {
  teachers: Teacher[];
  currentTeacher: Teacher | null;
  courseAssignments: CourseAssignment[];
  teacherPerformances: TeacherPerformance[];
  stats: TeacherStats;
  filters: TeacherFilters;
  loading: boolean;
  error: string | null;
  selectedTeachers: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Response Types
export interface TeacherResponse {
  success: boolean;
  data: Teacher;
  message?: string;
}

export interface TeachersResponse {
  success: boolean;
  data: {
    teachers: Teacher[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message?: string;
}

export interface TeacherStatsResponse {
  success: boolean;
  data: TeacherStats;
  message?: string;
}

// Form Types
export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: Address;
  qualifications: Omit<Qualification, 'id'>[];
  experience: Omit<Experience, 'id'>[];
  specializations: string[];
  avatar?: string;
  bio?: string;
  bioEn?: string;
  socialLinks?: SocialLinks;
  joinDate: string;
  salary?: number;
  emergencyContact?: EmergencyContact;
  isPublicProfile: boolean;
  canTeachOnline: boolean;
  preferredSubjects: string[];
}

export interface UpdateTeacherRequest extends Partial<CreateTeacherRequest> {
  id: string;
}

export interface AssignCoursesRequest {
  teacherId: string;
  courseIds: string[];
  assignedDate: string;
  notes?: string;
}

export interface TeacherSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  specialization?: string;
  gender?: string;
  joinDateFrom?: string;
  joinDateTo?: string;
  hasAssignedCourses?: string;
  sortBy?: string;
  sortOrder?: string;
}