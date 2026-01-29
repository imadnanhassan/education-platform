// Course Management Types

export interface CourseCategory {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'mcq' | 'assignment' | 'quiz' | 'text' | 'audio';
  content: string; // URL or content
  duration?: number; // in minutes
  order: number;
  isRequired: boolean;
  description?: string;
  fileSize?: number; // in bytes
  mimeType?: string;
  downloadUrl?: string;
  thumbnailUrl?: string;
  metadata?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  order: number;
  materials: CourseMaterial[];
  estimatedDuration: number; // calculated from materials
  completionRate?: number; // percentage of students who completed
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  order: number;
  chapters: Chapter[];
  estimatedDuration: number; // calculated from chapters
  completionRate?: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseInstructor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  specializations: string[];
  rating?: number;
  totalCourses: number;
  totalStudents: number;
}

export interface CourseEnrollmentInfo {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  droppedEnrollments: number;
  averageProgress: number;
  averageRating: number;
  totalRatings: number;
}

export interface CourseProgress {
  totalMaterials: number;
  completedMaterials: number;
  totalDuration: number;
  completedDuration: number;
  progressPercentage: number;
  lastAccessedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  shortDescription?: string;
  category: string; // category ID
  categoryInfo?: CourseCategory;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  price: number;
  originalPrice?: number; // for discounts
  currency: 'BDT';
  thumbnail: string;
  bannerImage?: string;
  videoPreview?: string;
  status: 'draft' | 'published' | 'archived' | 'under_review';
  instructor: string; // instructor ID
  instructorInfo?: CourseInstructor;
  subjects: Subject[];
  tags: string[];
  prerequisites?: string;
  learningOutcomes: string[];
  targetAudience?: string[];
  
  // Enrollment settings
  isPublic: boolean;
  allowEnrollment: boolean;
  maxStudents?: number;
  enrollmentStartDate?: string;
  enrollmentEndDate?: string;
  
  // Course statistics
  totalStudents: number;
  rating: number;
  totalRatings: number;
  enrollmentInfo?: CourseEnrollmentInfo;
  
  // Publishing information
  publishedAt?: string;
  publishedBy?: string;
  lastModifiedBy?: string;
  version: number;
  
  // SEO and metadata
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  
  // Course settings
  allowComments: boolean;
  allowRating: boolean;
  certificateTemplate?: string;
  passingScore?: number; // percentage
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface CourseFilter {
  search?: string;
  category?: string;
  level?: 'all' | 'beginner' | 'intermediate' | 'advanced';
  status?: 'all' | 'draft' | 'published' | 'archived' | 'under_review';
  instructor?: string;
  priceMin?: number;
  priceMax?: number;
  durationMin?: number;
  durationMax?: number;
  rating?: number;
  tags?: string[];
  createdDateFrom?: string;
  createdDateTo?: string;
  publishedDateFrom?: string;
  publishedDateTo?: string;
  sortBy?: 'title' | 'price' | 'duration' | 'createdAt' | 'publishedAt' | 'totalStudents' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CourseStats {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  archivedCourses: number;
  underReviewCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  averageRating: number;
  totalInstructors: number;
  popularCourses: Course[];
  recentCourses: Course[];
  topRatedCourses: Course[];
  coursesByCategory: { category: string; count: number; revenue: number }[];
  coursesByLevel: { level: string; count: number }[];
  enrollmentTrends: { month: string; enrollments: number; revenue: number }[];
  revenueByMonth: { month: string; revenue: number }[];
}

export interface BulkCourseOperation {
  courseIds: string[];
  operation: 'publish' | 'unpublish' | 'archive' | 'delete' | 'duplicate';
  reason?: string;
  notifyInstructors?: boolean;
  notifyStudents?: boolean;
  scheduleDate?: string;
}

export interface CoursePublishInfo {
  courseId: string;
  publishNotes?: string;
  notifyStudents: boolean;
  schedulePublish: boolean;
  publishDate?: string;
  publishedBy?: string;
  preserveEnrollments: boolean;
  validationOverride: boolean;
}

export interface CourseStatusChangeInfo {
  courseId: string;
  newStatus: Course['status'];
  reason?: string;
  preserveEnrollments: boolean;
  notifyUsers: boolean;
  changedBy?: string;
}

export interface CourseValidationCheck {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
  details?: string[];
}

export interface CourseValidationResult {
  isValid: boolean;
  canPublish: boolean;
  errors: CourseValidationCheck[];
  warnings: CourseValidationCheck[];
  suggestions: CourseValidationCheck[];
}

export interface CourseImportData {
  title: string;
  titleEn: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  price: number;
  instructor: string;
  tags: string[];
  prerequisites?: string;
  learningOutcomes: string[];
}

export interface CourseExportOptions {
  format: 'csv' | 'excel' | 'pdf' | 'json';
  fields: string[];
  filters?: CourseFilter;
  includeSubjects?: boolean;
  includeChapters?: boolean;
  includeMaterials?: boolean;
  includeEnrollmentData?: boolean;
  includeStatistics?: boolean;
}

export interface CourseActivity {
  id: string;
  courseId: string;
  type: 'created' | 'updated' | 'published' | 'unpublished' | 'archived' | 'enrollment' | 'completion' | 'rating';
  description: string;
  metadata?: any;
  timestamp: string;
  performedBy?: string; // admin or instructor ID
  studentId?: string; // for student activities
}

export interface CourseNote {
  id: string;
  courseId: string;
  content: string;
  type: 'general' | 'technical' | 'content' | 'marketing' | 'administrative';
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MCQSet {
  id: string;
  title: string;
  description?: string;
  timeLimit: number; // in minutes
  questions: MCQQuestion[];
  totalMarks: number;
  passingMarks: number;
  shuffleQuestions: boolean;
  showResults: boolean;
  allowRetake: boolean;
  maxAttempts?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: string;
  maxMarks: number;
  submissionFormat: 'text' | 'file' | 'both';
  allowedFileTypes?: string[];
  maxFileSize?: number; // in MB
  isRequired: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Redux State Types
export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  categories: CourseCategory[];
  stats: CourseStats | null;
  activities: CourseActivity[];
  notes: CourseNote[];
  filters: CourseFilter;
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
    publish: boolean;
    validate: boolean;
    statusChange: boolean;
    stats: boolean;
    export: boolean;
    import: boolean;
    categories: boolean;
  };
  error: {
    list: string | null;
    details: string | null;
    create: string | null;
    update: string | null;
    delete: string | null;
    publish: string | null;
    validate: string | null;
    statusChange: string | null;
    stats: string | null;
    export: string | null;
    import: string | null;
    categories: string | null;
  };
  selectedCourses: string[];
  searchResults: Course[];
  recentlyViewed: Course[];
  publishQueue: CoursePublishInfo[];
  validationResults: Record<string, CourseValidationResult>;
  importProgress: {
    total: number;
    processed: number;
    errors: string[];
    isImporting: boolean;
  };
}

// API Response Types
export interface CourseListResponse {
  courses: Course[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CourseStatsResponse {
  stats: CourseStats;
}

export interface CourseActivityResponse {
  activities: CourseActivity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CourseCategoryResponse {
  categories: CourseCategory[];
}

// Form Types (re-export from validations)
export type {
  CourseFormData,
  CreateCourseFormData,
  UpdateCourseFormData,
  SubjectFormData,
  ChapterFormData,
  CourseMaterialFormData,
  CourseFilterFormData,
  CoursePublishFormData,
  BulkCourseOperationFormData,
  MCQQuestionFormData,
  MCQSetFormData,
} from '@/lib/validations/course';