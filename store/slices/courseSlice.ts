import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Course,
  CourseState,
  CourseFilter,
  CourseStats,
  CourseCategory,
  CourseActivity,
  CourseNote,
  BulkCourseOperation,
  CourseImportData,
  CourseExportOptions,
  CourseListResponse,
  CourseStatsResponse,
  CourseActivityResponse,
  CourseCategoryResponse,
  CreateCourseFormData,
  UpdateCourseFormData,
  Subject,
  Chapter,
  CourseMaterial,
  CoursePublishInfo,
  CourseStatusChangeInfo,
  CourseValidationResult,
} from '@/store/types/course';

// Initial state
const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  categories: [],
  stats: null,
  activities: [],
  notes: [],
  filters: {
    search: '',
    status: 'all',
    category: '',
    level: 'all',
    instructor: '',
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
    publish: false,
    validate: false,
    statusChange: false,
    stats: false,
    export: false,
    import: false,
    categories: false,
  },
  error: {
    list: null,
    details: null,
    create: null,
    update: null,
    delete: null,
    publish: null,
    validate: null,
    statusChange: null,
    stats: null,
    export: null,
    import: null,
    categories: null,
  },
  selectedCourses: [],
  searchResults: [],
  recentlyViewed: [],
  publishQueue: [],
  validationResults: {},
  importProgress: {
    total: 0,
    processed: 0,
    errors: [],
    isImporting: false,
  },
};

// Dummy data generators
const generateDummyCategories = (): CourseCategory[] => {
  return [
    {
      id: 'cat-1',
      name: 'বিজ্ঞান',
      nameEn: 'Science',
      description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং গণিত',
      icon: '🔬',
      color: '#10b981',
      isActive: true,
      courseCount: 15,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'cat-2',
      name: 'ভাষা ও সাহিত্য',
      nameEn: 'Language & Literature',
      description: 'বাংলা, ইংরেজি এবং অন্যান্য ভাষা',
      icon: '📚',
      color: '#3b82f6',
      isActive: true,
      courseCount: 12,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'cat-3',
      name: 'তথ্য ও যোগাযোগ প্রযুক্তি',
      nameEn: 'ICT',
      description: 'কম্পিউটার বিজ্ঞান এবং প্রোগ্রামিং',
      icon: '💻',
      color: '#8b5cf6',
      isActive: true,
      courseCount: 8,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'cat-4',
      name: 'ব্যবসায় শিক্ষা',
      nameEn: 'Business Studies',
      description: 'হিসাববিজ্ঞান, ব্যবসায় নীতি ও প্রয়োগ',
      icon: '💼',
      color: '#f59e0b',
      isActive: true,
      courseCount: 6,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'cat-5',
      name: 'সামাজিক বিজ্ঞান',
      nameEn: 'Social Science',
      description: 'ইতিহাস, ভূগোল, পৌরনীতি ও সুশাসন',
      icon: '🌍',
      color: '#ef4444',
      isActive: true,
      courseCount: 10,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];
};

const generateDummyMaterials = (count: number = 3): CourseMaterial[] => {
  const materialTypes: CourseMaterial['type'][] = ['video', 'pdf', 'mcq', 'assignment', 'text'];
  const materials: CourseMaterial[] = [];

  for (let i = 0; i < count; i++) {
    const type = materialTypes[i % materialTypes.length];
    materials.push({
      id: `material-${Date.now()}-${i}`,
      title: `উপাদান ${i + 1}`,
      type,
      content: type === 'video' ? 'https://example.com/video.mp4' : 
               type === 'pdf' ? 'https://example.com/document.pdf' : 
               'Sample content',
      duration: type === 'video' ? Math.floor(Math.random() * 60) + 10 : undefined,
      order: i + 1,
      isRequired: i < 2, // First 2 materials are required
      description: `এটি ${i + 1} নম্বর উপাদানের বিবরণ`,
      fileSize: type === 'pdf' ? Math.floor(Math.random() * 5000000) + 1000000 : undefined,
      mimeType: type === 'video' ? 'video/mp4' : type === 'pdf' ? 'application/pdf' : 'text/plain',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return materials;
};

const generateDummyChapters = (count: number = 3): Chapter[] => {
  const chapters: Chapter[] = [];

  for (let i = 0; i < count; i++) {
    const materials = generateDummyMaterials(Math.floor(Math.random() * 5) + 2);
    chapters.push({
      id: `chapter-${Date.now()}-${i}`,
      title: `অধ্যায় ${i + 1}`,
      titleEn: `Chapter ${i + 1}`,
      description: `এটি ${i + 1} নম্বর অধ্যায়ের বিবরণ। এই অধ্যায়ে গুরুত্বপূর্ণ বিষয়গুলো আলোচনা করা হয়েছে।`,
      order: i + 1,
      materials,
      estimatedDuration: materials.reduce((total, material) => total + (material.duration || 0), 0),
      completionRate: Math.floor(Math.random() * 40) + 60, // 60-100%
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return chapters;
};

const generateDummySubjects = (count: number = 2): Subject[] => {
  const subjects: Subject[] = [];

  for (let i = 0; i < count; i++) {
    const chapters = generateDummyChapters(Math.floor(Math.random() * 4) + 2);
    subjects.push({
      id: `subject-${Date.now()}-${i}`,
      title: `বিষয় ${i + 1}`,
      titleEn: `Subject ${i + 1}`,
      description: `এটি ${i + 1} নম্বর বিষয়ের বিবরণ। এই বিষয়ে বিস্তারিত আলোচনা করা হয়েছে।`,
      order: i + 1,
      chapters,
      estimatedDuration: chapters.reduce((total, chapter) => total + chapter.estimatedDuration, 0),
      completionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return subjects;
};

const generateDummyCourses = (): Course[] => {
  const categories = generateDummyCategories();
  const courseNames = [
    { bn: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান', en: 'Higher Secondary Physics' },
    { bn: 'উচ্চ মাধ্যমিক রসায়ন', en: 'Higher Secondary Chemistry' },
    { bn: 'উচ্চ মাধ্যমিক গণিত', en: 'Higher Secondary Mathematics' },
    { bn: 'উচ্চ মাধ্যমিক জীববিজ্ঞান', en: 'Higher Secondary Biology' },
    { bn: 'ইংরেজি ভাষা ও সাহিত্য', en: 'English Language & Literature' },
    { bn: 'বাংলা ভাষা ও সাহিত্য', en: 'Bengali Language & Literature' },
    { bn: 'তথ্য ও যোগাযোগ প্রযুক্তি', en: 'Information & Communication Technology' },
    { bn: 'ব্যবসায় নীতি ও প্রয়োগ', en: 'Business Studies & Application' },
    { bn: 'হিসাববিজ্ঞান', en: 'Accounting' },
    { bn: 'বাংলাদেশ ও বিশ্বপরিচয়', en: 'Bangladesh & Global Studies' },
    { bn: 'ইসলামের ইতিহাস ও সংস্কৃতি', en: 'History & Culture of Islam' },
    { bn: 'পৌরনীতি ও সুশাসন', en: 'Civics & Good Governance' },
  ];

  const instructorNames = [
    'ড. মোহাম্মদ করিম',
    'প্রফেসর ফাতিমা খান',
    'ড. আব্দুর রহমান',
    'প্রফেসর সাদিয়া ইসলাম',
    'ড. তানভীর হাসান',
    'প্রফেসর নুসরাত জাহান',
  ];

  const levels: Course['level'][] = ['beginner', 'intermediate', 'advanced'];
  const statuses: Course['status'][] = ['draft', 'published', 'archived', 'under_review'];

  return courseNames.map((course, index) => {
    const category = categories[index % categories.length];
    const instructor = instructorNames[index % instructorNames.length];
    const level = levels[index % levels.length];
    const status = index % 5 === 0 ? 'draft' : index % 7 === 0 ? 'under_review' : index % 10 === 0 ? 'archived' : 'published';
    const subjects = generateDummySubjects(Math.floor(Math.random() * 3) + 2);
    const totalDuration = subjects.reduce((total, subject) => total + subject.estimatedDuration, 0);

    return {
      id: `course-${index + 1}`,
      title: course.bn,
      titleEn: course.en,
      description: `${course.bn} কোর্সটি ${level === 'beginner' ? 'প্রাথমিক' : level === 'intermediate' ? 'মধ্যম' : 'উন্নত'} স্তরের শিক্ষার্থীদের জন্য ডিজাইন করা হয়েছে। এই কোর্সে বিস্তারিত আলোচনা এবং ব্যবহারিক প্রয়োগ রয়েছে।`,
      shortDescription: `${course.bn} এর সম্পূর্ণ কোর্স`,
      category: category.id,
      categoryInfo: category,
      level,
      duration: Math.floor(totalDuration / 60), // Convert minutes to hours
      price: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 BDT
      originalPrice: Math.floor(Math.random() * 2000) + 6000, // For showing discounts
      currency: 'BDT' as const,
      thumbnail: `https://ui-avatars.com/api/?name=${encodeURIComponent(course.en)}&background=10b981&color=fff&size=400`,
      bannerImage: `https://picsum.photos/800/400?random=${index}`,
      videoPreview: `https://example.com/preview-${index + 1}.mp4`,
      status,
      instructor: `instructor-${(index % instructorNames.length) + 1}`,
      instructorInfo: {
        id: `instructor-${(index % instructorNames.length) + 1}`,
        name: instructor,
        email: `${instructor.toLowerCase().replace(/[^\w]/g, '')}@graviton.edu.bd`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=3b82f6&color=fff`,
        bio: `${instructor} একজন অভিজ্ঞ শিক্ষক এবং গবেষক।`,
        specializations: [course.bn],
        rating: Math.random() * 2 + 3, // 3-5 rating
        totalCourses: Math.floor(Math.random() * 10) + 1,
        totalStudents: Math.floor(Math.random() * 1000) + 100,
      },
      subjects,
      tags: [
        course.bn.split(' ')[0],
        level === 'beginner' ? 'প্রাথমিক' : level === 'intermediate' ? 'মধ্যম' : 'উন্নত',
        category.name,
      ],
      prerequisites: index % 3 === 0 ? ['মাধ্যমিক স্তরের জ্ঞান প্রয়োজন'] : [],
      learningOutcomes: [
        `${course.bn} এর মূল ধারণা বুঝতে পারবেন`,
        'ব্যবহারিক সমস্যা সমাধান করতে পারবেন',
        'পরীক্ষায় ভাল ফলাফল অর্জন করতে পারবেন',
      ],
      targetAudience: ['HSC শিক্ষার্থী', 'বিশ্ববিদ্যালয় ভর্তিচ্ছু', 'শিক্ষক'],
      
      // Enrollment settings
      isPublic: true,
      allowEnrollment: status === 'published',
      maxStudents: Math.floor(Math.random() * 500) + 100,
      enrollmentStartDate: '2024-01-01T00:00:00Z',
      enrollmentEndDate: '2024-12-31T23:59:59Z',
      
      // Course statistics
      totalStudents: Math.floor(Math.random() * 200) + 50,
      rating: Math.random() * 2 + 3, // 3-5 rating
      totalRatings: Math.floor(Math.random() * 100) + 20,
      enrollmentInfo: {
        totalEnrollments: Math.floor(Math.random() * 200) + 50,
        activeEnrollments: Math.floor(Math.random() * 150) + 30,
        completedEnrollments: Math.floor(Math.random() * 50) + 10,
        droppedEnrollments: Math.floor(Math.random() * 20) + 5,
        averageProgress: Math.floor(Math.random() * 40) + 60, // 60-100%
        averageRating: Math.random() * 2 + 3,
        totalRatings: Math.floor(Math.random() * 100) + 20,
      },
      
      // Publishing information
      publishedAt: status === 'published' ? new Date().toISOString() : undefined,
      publishedBy: status === 'published' ? 'admin-1' : undefined,
      lastModifiedBy: 'admin-1',
      version: 1,
      
      // SEO and metadata
      slug: course.en.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-'),
      metaTitle: `${course.bn} - Graviton Academy`,
      metaDescription: `${course.bn} কোর্সে ভর্তি হয়ে আপনার দক্ষতা বৃদ্ধি করুন।`,
      keywords: [course.bn, course.en, category.name, 'অনলাইন কোর্স'],
      
      // Course settings
      allowComments: true,
      allowRating: true,
      certificateTemplate: 'default-template',
      passingScore: 70, // 70% to pass
      
      // Timestamps
      createdAt: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}T10:00:00Z`,
      updatedAt: new Date().toISOString(),
    };
  });
};

// Async thunks for API calls
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (filters: CourseFilter = {}) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dummyCourses = generateDummyCourses();
    let filteredCourses = [...dummyCourses];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.titleEn.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.instructorInfo?.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.status === filters.status);
    }

    if (filters.category) {
      filteredCourses = filteredCourses.filter(course => course.category === filters.category);
    }

    if (filters.level && filters.level !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.level === filters.level);
    }

    if (filters.instructor) {
      filteredCourses = filteredCourses.filter(course => course.instructor === filters.instructor);
    }

    if (filters.priceMin !== undefined) {
      filteredCourses = filteredCourses.filter(course => course.price >= filters.priceMin!);
    }

    if (filters.priceMax !== undefined) {
      filteredCourses = filteredCourses.filter(course => course.price <= filters.priceMax!);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredCourses.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (filters.sortBy) {
          case 'title':
            aValue = a.title;
            bValue = b.title;
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'duration':
            aValue = a.duration;
            bValue = b.duration;
            break;
          case 'totalStudents':
            aValue = a.totalStudents;
            bValue = b.totalStudents;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'publishedAt':
            aValue = new Date(a.publishedAt || a.createdAt);
            bValue = new Date(b.publishedAt || b.createdAt);
            break;
          case 'createdAt':
          default:
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
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
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    const response: CourseListResponse = {
      courses: paginatedCourses,
      pagination: {
        page,
        limit,
        total: filteredCourses.length,
        totalPages: Math.ceil(filteredCourses.length / limit),
      },
    };

    return response;
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dummyCourses = generateDummyCourses();
    const course = dummyCourses.find(c => c.id === courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    return course;
  }
);

export const fetchCourseCategories = createAsyncThunk(
  'courses/fetchCourseCategories',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const categories = generateDummyCategories();
    
    const response: CourseCategoryResponse = {
      categories,
    };
    
    return response;
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData: CreateCourseFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Transform the form data to a complete Course object
    const subjects: Subject[] = courseData.subjects.map((subject, index) => ({
      ...subject,
      id: `subject-${Date.now()}-${index}`,
      estimatedDuration: subject.chapters.reduce((total, chapter) => 
        total + chapter.materials.reduce((chapterTotal, material) => 
          chapterTotal + (material.duration || 0), 0), 0),
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chapters: subject.chapters.map((chapter, chapterIndex) => ({
        ...chapter,
        id: `chapter-${Date.now()}-${index}-${chapterIndex}`,
        estimatedDuration: chapter.materials.reduce((total, material) => 
          total + (material.duration || 0), 0),
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        materials: chapter.materials.map((material, materialIndex) => ({
          ...material,
          id: `material-${Date.now()}-${index}-${chapterIndex}-${materialIndex}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
      })),
    }));
    
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      currency: 'BDT' as const,
      status: 'draft',
      subjects,
      totalStudents: 0,
      rating: 0,
      totalRatings: 0,
      version: 1,
      allowComments: true,
      allowRating: true,
      passingScore: 70,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newCourse;
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, data }: { id: string; data: UpdateCourseFormData }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const updatedCourse: Course = {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    } as Course;
    
    return updatedCourse;
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return courseId;
  }
);

export const validateCourseForPublishing = createAsyncThunk(
  'courses/validateCourseForPublishing',
  async (courseId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dummyCourses = generateDummyCourses();
    const course = dummyCourses.find(c => c.id === courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    const result: CourseValidationResult = {
      isValid: true,
      canPublish: true,
      errors: [],
      warnings: [],
      suggestions: [],
    };

    // Check basic course information
    if (!course.title || !course.titleEn) {
      result.errors.push({
        type: 'error',
        message: 'কোর্সের নাম সম্পূর্ণ নয়',
        field: 'title',
        details: ['বাংলা এবং ইংরেজি উভয় নাম প্রয়োজন'],
      });
    }

    if (!course.description || course.description.length < 50) {
      result.errors.push({
        type: 'error',
        message: 'কোর্সের বিবরণ অপর্যাপ্ত',
        field: 'description',
        details: ['কমপক্ষে ৫০ অক্ষরের বিবরণ প্রয়োজন'],
      });
    }

    if (!course.thumbnail) {
      result.errors.push({
        type: 'error',
        message: 'কোর্সের থাম্বনেইল নেই',
        field: 'thumbnail',
        details: ['একটি আকর্ষণীয় থাম্বনেইল যোগ করুন'],
      });
    }

    if (!course.instructor) {
      result.errors.push({
        type: 'error',
        message: 'শিক্ষক নির্ধারিত নয়',
        field: 'instructor',
        details: ['একজন শিক্ষক নির্বাচন করুন'],
      });
    }

    // Check course content
    if (!course.subjects || course.subjects.length === 0) {
      result.errors.push({
        type: 'error',
        message: 'কোর্সে কোনো বিষয় নেই',
        field: 'subjects',
        details: ['অন্তত একটি বিষয় যোগ করুন'],
      });
    } else {
      // Check subjects
      const emptySubjects = course.subjects.filter(subject => 
        !subject.chapters || subject.chapters.length === 0
      );
      
      if (emptySubjects.length > 0) {
        result.errors.push({
          type: 'error',
          message: `${emptySubjects.length}টি বিষয়ে কোনো অধ্যায় নেই`,
          field: 'subjects',
          details: emptySubjects.map(subject => `• ${subject.title}`),
        });
      }

      // Check chapters
      const emptyChapters = course.subjects.flatMap(subject => 
        subject.chapters.filter(chapter => 
          !chapter.materials || chapter.materials.length === 0
        )
      );

      if (emptyChapters.length > 0) {
        result.errors.push({
          type: 'error',
          message: `${emptyChapters.length}টি অধ্যায়ে কোনো উপাদান নেই`,
          field: 'chapters',
          details: emptyChapters.slice(0, 5).map(chapter => `• ${chapter.title}`),
        });
      }

      // Check for video content
      const totalMaterials = course.subjects.flatMap(subject => 
        subject.chapters.flatMap(chapter => chapter.materials)
      );
      
      const videoMaterials = totalMaterials.filter(material => material.type === 'video');
      
      if (videoMaterials.length === 0) {
        result.warnings.push({
          type: 'warning',
          message: 'কোর্সে কোনো ভিডিও কন্টেন্ট নেই',
          field: 'materials',
          details: ['ভিডিও কন্টেন্ট শিক্ষার্থীদের জন্য আরও আকর্ষণীয়'],
        });
      }

      // Check for assessments
      const assessmentMaterials = totalMaterials.filter(material => 
        material.type === 'mcq' || material.type === 'quiz' || material.type === 'assignment'
      );
      
      if (assessmentMaterials.length === 0) {
        result.warnings.push({
          type: 'warning',
          message: 'কোর্সে কোনো মূল্যায়ন নেই',
          field: 'materials',
          details: ['MCQ, কুইজ বা অ্যাসাইনমেন্ট যোগ করুন'],
        });
      }
    }

    // Check pricing
    if (course.price <= 0) {
      result.warnings.push({
        type: 'warning',
        message: 'কোর্সটি বিনামূল্যে',
        field: 'price',
        details: ['নিশ্চিত হন যে এটি বিনামূল্যে হওয়ার কথা'],
      });
    }

    // Check learning outcomes
    if (!course.learningOutcomes || course.learningOutcomes.length === 0) {
      result.warnings.push({
        type: 'warning',
        message: 'শিক্ষার ফলাফল উল্লেখ নেই',
        field: 'learningOutcomes',
        details: ['শিক্ষার্থীরা কী শিখবে তা উল্লেখ করুন'],
      });
    }

    // Check tags
    if (!course.tags || course.tags.length === 0) {
      result.suggestions.push({
        type: 'info',
        message: 'কোর্সে কোনো ট্যাগ নেই',
        field: 'tags',
        details: ['ট্যাগ যোগ করলে কোর্স খুঁজে পাওয়া সহজ হয়'],
      });
    }

    // Check enrollment settings
    if (course.maxStudents && course.maxStudents < 10) {
      result.suggestions.push({
        type: 'info',
        message: 'সর্বোচ্চ শিক্ষার্থী সংখ্যা কম',
        field: 'maxStudents',
        details: [`বর্তমানে সর্বোচ্চ ${course.maxStudents} জন`],
      });
    }

    // Determine final validation status
    result.isValid = result.errors.length === 0;
    result.canPublish = result.errors.length === 0;
    
    return result;
  }
);

export const changeCourseStatus = createAsyncThunk(
  'courses/changeCourseStatus',
  async (statusChangeInfo: CourseStatusChangeInfo) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate status transition
    const validTransitions: Record<Course['status'], Course['status'][]> = {
      'draft': ['under_review', 'published'],
      'under_review': ['draft', 'published'],
      'published': ['draft', 'archived'],
      'archived': ['draft'],
    };
    
    const dummyCourses = generateDummyCourses();
    const course = dummyCourses.find(c => c.id === statusChangeInfo.courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    const allowedStatuses = validTransitions[course.status];
    if (!allowedStatuses.includes(statusChangeInfo.newStatus)) {
      throw new Error(`Cannot change status from ${course.status} to ${statusChangeInfo.newStatus}`);
    }
    
    // Check if enrollments need to be preserved
    if (!statusChangeInfo.preserveEnrollments && course.totalStudents > 0) {
      throw new Error('Cannot change status without preserving enrollments when students are enrolled');
    }
    
    return {
      courseId: statusChangeInfo.courseId,
      newStatus: statusChangeInfo.newStatus,
      changedAt: new Date().toISOString(),
      changedBy: statusChangeInfo.changedBy || 'admin-1',
      reason: statusChangeInfo.reason,
      preservedEnrollments: statusChangeInfo.preserveEnrollments ? course.totalStudents : 0,
    };
  }
);

export const publishCourseWithValidation = createAsyncThunk(
  'courses/publishCourseWithValidation',
  async (publishInfo: CoursePublishInfo, { dispatch }) => {
    // First validate the course
    const validationResult = await dispatch(validateCourseForPublishing(publishInfo.courseId)).unwrap();
    
    if (!validationResult.canPublish && !publishInfo.validationOverride) {
      throw new Error('Course validation failed. Cannot publish course.');
    }
    
    // Simulate API call for publishing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const dummyCourses = generateDummyCourses();
    const course = dummyCourses.find(c => c.id === publishInfo.courseId);
    
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Check if course can be published
    if (course.status !== 'draft' && course.status !== 'under_review') {
      throw new Error('Only draft or under review courses can be published');
    }
    
    return {
      courseId: publishInfo.courseId,
      publishedAt: publishInfo.schedulePublish && publishInfo.publishDate 
        ? publishInfo.publishDate 
        : new Date().toISOString(),
      publishedBy: publishInfo.publishedBy || 'admin-1',
      publishNotes: publishInfo.publishNotes,
      preservedEnrollments: publishInfo.preserveEnrollments ? course.totalStudents : 0,
      validationOverridden: publishInfo.validationOverride,
    };
  }
);

export const fetchCourseStats = createAsyncThunk(
  'courses/fetchCourseStats',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const dummyCourses = generateDummyCourses();
    const categories = generateDummyCategories();
    
    const stats: CourseStats = {
      totalCourses: dummyCourses.length,
      publishedCourses: dummyCourses.filter(c => c.status === 'published').length,
      draftCourses: dummyCourses.filter(c => c.status === 'draft').length,
      archivedCourses: dummyCourses.filter(c => c.status === 'archived').length,
      underReviewCourses: dummyCourses.filter(c => c.status === 'under_review').length,
      totalEnrollments: dummyCourses.reduce((total, course) => total + course.totalStudents, 0),
      totalRevenue: dummyCourses.reduce((total, course) => total + (course.price * course.totalStudents), 0),
      averageRating: dummyCourses.reduce((total, course) => total + course.rating, 0) / dummyCourses.length,
      totalInstructors: 6, // Based on dummy data
      popularCourses: dummyCourses.filter(c => c.totalStudents > 100).slice(0, 5),
      recentCourses: dummyCourses.slice(0, 5),
      topRatedCourses: dummyCourses.filter(c => c.rating > 4.5).slice(0, 5),
      coursesByCategory: categories.map(cat => ({
        category: cat.name,
        count: dummyCourses.filter(c => c.category === cat.id).length,
        revenue: dummyCourses
          .filter(c => c.category === cat.id)
          .reduce((total, course) => total + (course.price * course.totalStudents), 0),
      })),
      coursesByLevel: [
        { level: 'প্রাথমিক', count: dummyCourses.filter(c => c.level === 'beginner').length },
        { level: 'মধ্যম', count: dummyCourses.filter(c => c.level === 'intermediate').length },
        { level: 'উন্নত', count: dummyCourses.filter(c => c.level === 'advanced').length },
      ],
      enrollmentTrends: [
        { month: 'জানুয়ারি', enrollments: 120, revenue: 450000 },
        { month: 'ফেব্রুয়ারি', enrollments: 150, revenue: 520000 },
        { month: 'মার্চ', enrollments: 180, revenue: 680000 },
        { month: 'এপ্রিল', enrollments: 200, revenue: 750000 },
        { month: 'মে', enrollments: 220, revenue: 820000 },
        { month: 'জুন', enrollments: 190, revenue: 710000 },
      ],
      revenueByMonth: [
        { month: 'জানুয়ারি', revenue: 450000 },
        { month: 'ফেব্রুয়ারি', revenue: 520000 },
        { month: 'মার্চ', revenue: 680000 },
        { month: 'এপ্রিল', revenue: 750000 },
        { month: 'মে', revenue: 820000 },
        { month: 'জুন', revenue: 710000 },
      ],
    };
    
    return { stats };
  }
);

export const bulkUpdateCourses = createAsyncThunk(
  'courses/bulkUpdateCourses',
  async (operation: BulkCourseOperation) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return operation;
  }
);

// Create the slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<CourseFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedCourses: (state, action: PayloadAction<string[]>) => {
      state.selectedCourses = action.payload;
    },
    toggleCourseSelection: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      const index = state.selectedCourses.indexOf(courseId);
      if (index > -1) {
        state.selectedCourses.splice(index, 1);
      } else {
        state.selectedCourses.push(courseId);
      }
    },
    selectAllCourses: (state) => {
      state.selectedCourses = state.courses.map(course => course.id);
    },
    clearSelection: (state) => {
      state.selectedCourses = [];
    },
    addToRecentlyViewed: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      const existingIndex = state.recentlyViewed.findIndex(c => c.id === course.id);
      
      if (existingIndex > -1) {
        state.recentlyViewed.splice(existingIndex, 1);
      }
      
      state.recentlyViewed.unshift(course);
      
      // Keep only last 10 items
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 10);
      }
    },
    addToPublishQueue: (state, action: PayloadAction<CoursePublishInfo>) => {
      state.publishQueue.push(action.payload);
    },
    removeFromPublishQueue: (state, action: PayloadAction<string>) => {
      state.publishQueue = state.publishQueue.filter(item => item.courseId !== action.payload);
    },
    setCurrentCourse: (state, action: PayloadAction<Course | null>) => {
      state.currentCourse = action.payload;
    },
    clearErrors: (state) => {
      state.error = initialState.error;
    },
    clearValidationResults: (state) => {
      state.validationResults = {};
    },
    setValidationResult: (state, action: PayloadAction<{ courseId: string; result: CourseValidationResult }>) => {
      state.validationResults[action.payload.courseId] = action.payload.result;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading.list = false;
        state.courses = action.payload.courses;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.error.message || 'Failed to fetch courses';
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading.details = true;
        state.error.details = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading.details = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading.details = false;
        state.error.details = action.error.message || 'Failed to fetch course details';
      });

    // Fetch categories
    builder
      .addCase(fetchCourseCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchCourseCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCourseCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.error.message || 'Failed to fetch categories';
      });

    // Create course
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading.create = false;
        state.courses.unshift(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.error.message || 'Failed to create course';
      });

    // Update course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.courses.findIndex(c => c.id === action.payload.id);
        if (index > -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.error.message || 'Failed to update course';
      });

    // Delete course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.courses = state.courses.filter(c => c.id !== action.payload);
        if (state.currentCourse?.id === action.payload) {
          state.currentCourse = null;
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message || 'Failed to delete course';
      });

    // Validate course for publishing
    builder
      .addCase(validateCourseForPublishing.pending, (state) => {
        state.loading.validate = true;
        state.error.validate = null;
      })
      .addCase(validateCourseForPublishing.fulfilled, (state, action) => {
        state.loading.validate = false;
        const courseId = action.meta.arg;
        state.validationResults[courseId] = action.payload;
      })
      .addCase(validateCourseForPublishing.rejected, (state, action) => {
        state.loading.validate = false;
        state.error.validate = action.error.message || 'Failed to validate course';
      });

    // Change course status
    builder
      .addCase(changeCourseStatus.pending, (state) => {
        state.loading.statusChange = true;
        state.error.statusChange = null;
      })
      .addCase(changeCourseStatus.fulfilled, (state, action) => {
        state.loading.statusChange = false;
        const { courseId, newStatus, changedAt, changedBy } = action.payload;
        
        // Update course status
        const courseIndex = state.courses.findIndex(c => c.id === courseId);
        if (courseIndex > -1) {
          state.courses[courseIndex].status = newStatus;
          state.courses[courseIndex].updatedAt = changedAt;
          state.courses[courseIndex].lastModifiedBy = changedBy;
          
          // Set published date if publishing
          if (newStatus === 'published') {
            state.courses[courseIndex].publishedAt = changedAt;
            state.courses[courseIndex].publishedBy = changedBy;
          }
        }
        
        if (state.currentCourse?.id === courseId) {
          state.currentCourse.status = newStatus;
          state.currentCourse.updatedAt = changedAt;
          state.currentCourse.lastModifiedBy = changedBy;
          
          if (newStatus === 'published') {
            state.currentCourse.publishedAt = changedAt;
            state.currentCourse.publishedBy = changedBy;
          }
        }
      })
      .addCase(changeCourseStatus.rejected, (state, action) => {
        state.loading.statusChange = false;
        state.error.statusChange = action.error.message || 'Failed to change course status';
      });

    // Publish course with validation
    builder
      .addCase(publishCourseWithValidation.pending, (state) => {
        state.loading.publish = true;
        state.error.publish = null;
      })
      .addCase(publishCourseWithValidation.fulfilled, (state, action) => {
        state.loading.publish = false;
        const { courseId, publishedAt, publishedBy, preservedEnrollments } = action.payload;
        
        // Update course status
        const courseIndex = state.courses.findIndex(c => c.id === courseId);
        if (courseIndex > -1) {
          state.courses[courseIndex].status = 'published';
          state.courses[courseIndex].publishedAt = publishedAt;
          state.courses[courseIndex].publishedBy = publishedBy;
          // Preserve enrollments if specified
          if (preservedEnrollments !== undefined) {
            state.courses[courseIndex].totalStudents = preservedEnrollments;
          }
        }
        
        if (state.currentCourse?.id === courseId) {
          state.currentCourse.status = 'published';
          state.currentCourse.publishedAt = publishedAt;
          state.currentCourse.publishedBy = publishedBy;
          if (preservedEnrollments !== undefined) {
            state.currentCourse.totalStudents = preservedEnrollments;
          }
        }
        
        // Remove from publish queue
        state.publishQueue = state.publishQueue.filter(item => item.courseId !== courseId);
      })
      .addCase(publishCourseWithValidation.rejected, (state, action) => {
        state.loading.publish = false;
        state.error.publish = action.error.message || 'Failed to publish course with validation';
      });

    // Fetch stats
    builder
      .addCase(fetchCourseStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(fetchCourseStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload.stats;
      })
      .addCase(fetchCourseStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.error.message || 'Failed to fetch course statistics';
      });

    // Bulk operations
    builder
      .addCase(bulkUpdateCourses.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(bulkUpdateCourses.fulfilled, (state, action) => {
        state.loading.update = false;
        const { courseIds, operation } = action.payload;
        
        // Update courses based on operation
        state.courses = state.courses.map(course => {
          if (courseIds.includes(course.id)) {
            switch (operation) {
              case 'publish':
                return { ...course, status: 'published' as const, publishedAt: new Date().toISOString() };
              case 'unpublish':
                return { ...course, status: 'draft' as const, publishedAt: undefined };
              case 'archive':
                return { ...course, status: 'archived' as const };
              default:
                return course;
            }
          }
          return course;
        });
        
        // Clear selection after bulk operation
        state.selectedCourses = [];
      })
      .addCase(bulkUpdateCourses.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.error.message || 'Failed to perform bulk operation';
      });
  },
});

// Export actions
export const {
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
} = courseSlice.actions;

// Export reducer
export default courseSlice.reducer;