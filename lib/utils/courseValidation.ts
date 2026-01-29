import { Course, CourseValidationResult, CourseValidationCheck } from '@/store/types/course';

/**
 * Validates a course for publishing and returns detailed validation results
 */
export const validateCourseForPublishing = (course: Course): CourseValidationResult => {
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

    // Check material quality
    const lowQualityMaterials = totalMaterials.filter(material => 
      !material.description || material.description.length < 10
    );
    
    if (lowQualityMaterials.length > 0) {
      result.suggestions.push({
        type: 'info',
        message: `${lowQualityMaterials.length}টি উপাদানে বিবরণ নেই বা অপর্যাপ্ত`,
        field: 'materials',
        details: ['উপাদানের বিবরণ যোগ করলে শিক্ষার্থীরা ভালো বুঝতে পারবে'],
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

  // Check prerequisites
  if (!course.prerequisites || course.prerequisites.length === 0) {
    result.suggestions.push({
      type: 'info',
      message: 'পূর্বশর্ত উল্লেখ নেই',
      field: 'prerequisites',
      details: ['কোর্সের জন্য প্রয়োজনীয় পূর্বজ্ঞান উল্লেখ করুন'],
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

  // Check course duration
  if (course.duration < 1) {
    result.warnings.push({
      type: 'warning',
      message: 'কোর্সের সময়কাল খুবই কম',
      field: 'duration',
      details: ['কমপক্ষে ১ ঘন্টার কোর্স হওয়া উচিত'],
    });
  }

  // Check if course has banner image
  if (!course.bannerImage) {
    result.suggestions.push({
      type: 'info',
      message: 'কোর্সের ব্যানার ইমেজ নেই',
      field: 'bannerImage',
      details: ['ব্যানার ইমেজ কোর্সকে আরও আকর্ষণীয় করে তোলে'],
    });
  }

  // Check if course has video preview
  if (!course.videoPreview) {
    result.suggestions.push({
      type: 'info',
      message: 'কোর্সের প্রিভিউ ভিডিও নেই',
      field: 'videoPreview',
      details: ['প্রিভিউ ভিডিও শিক্ষার্থীদের আকৃষ্ট করতে সাহায্য করে'],
    });
  }

  // Determine final validation status
  result.isValid = result.errors.length === 0;
  result.canPublish = result.errors.length === 0;
  
  return result;
};

/**
 * Checks if a course status transition is valid
 */
export const isValidStatusTransition = (currentStatus: Course['status'], newStatus: Course['status']): boolean => {
  const validTransitions: Record<Course['status'], Course['status'][]> = {
    'draft': ['under_review', 'published'],
    'under_review': ['draft', 'published'],
    'published': ['draft', 'archived'],
    'archived': ['draft'],
  };
  
  return validTransitions[currentStatus]?.includes(newStatus) || false;
};

/**
 * Gets the next possible statuses for a course
 */
export const getNextPossibleStatuses = (currentStatus: Course['status']): Course['status'][] => {
  const validTransitions: Record<Course['status'], Course['status'][]> = {
    'draft': ['under_review', 'published'],
    'under_review': ['draft', 'published'],
    'published': ['draft', 'archived'],
    'archived': ['draft'],
  };
  
  return validTransitions[currentStatus] || [];
};

/**
 * Checks if enrollments should be preserved during status change
 */
export const shouldPreserveEnrollments = (
  currentStatus: Course['status'], 
  newStatus: Course['status'], 
  totalStudents: number
): boolean => {
  // Always preserve enrollments if there are students
  if (totalStudents > 0) {
    return true;
  }
  
  // For certain transitions, preservation is recommended even without students
  const preservationRecommended = [
    ['published', 'draft'],
    ['published', 'archived'],
    ['archived', 'draft'],
  ];
  
  return preservationRecommended.some(([from, to]) => 
    currentStatus === from && newStatus === to
  );
};

/**
 * Gets a human-readable description of what happens during a status change
 */
export const getStatusChangeDescription = (
  currentStatus: Course['status'], 
  newStatus: Course['status']
): string => {
  const descriptions: Record<string, string> = {
    'draft->under_review': 'কোর্সটি পর্যালোচনার জন্য পাঠানো হবে',
    'draft->published': 'কোর্সটি সরাসরি প্রকাশিত হবে',
    'under_review->draft': 'কোর্সটি খসড়া অবস্থায় ফিরে যাবে',
    'under_review->published': 'কোর্সটি অনুমোদিত হয়ে প্রকাশিত হবে',
    'published->draft': 'কোর্সটি অপ্রকাশিত হয়ে খসড়া অবস্থায় যাবে',
    'published->archived': 'কোর্সটি সংরক্ষণাগারে চলে যাবে',
    'archived->draft': 'কোর্সটি পুনরুদ্ধার হয়ে খসড়া অবস্থায় যাবে',
  };
  
  const key = `${currentStatus}->${newStatus}`;
  return descriptions[key] || 'অবস্থা পরিবর্তিত হবে';
};

/**
 * Validates course content completeness
 */
export const validateCourseContent = (course: Course): CourseValidationCheck[] => {
  const checks: CourseValidationCheck[] = [];
  
  if (!course.subjects || course.subjects.length === 0) {
    checks.push({
      type: 'error',
      message: 'কোর্সে কোনো বিষয় নেই',
      field: 'subjects',
    });
    return checks;
  }
  
  course.subjects.forEach((subject, subjectIndex) => {
    if (!subject.chapters || subject.chapters.length === 0) {
      checks.push({
        type: 'error',
        message: `বিষয় "${subject.title}" এ কোনো অধ্যায় নেই`,
        field: `subjects[${subjectIndex}].chapters`,
      });
      return;
    }
    
    subject.chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.materials || chapter.materials.length === 0) {
        checks.push({
          type: 'error',
          message: `অধ্যায় "${chapter.title}" এ কোনো উপাদান নেই`,
          field: `subjects[${subjectIndex}].chapters[${chapterIndex}].materials`,
        });
      }
    });
  });
  
  return checks;
};

/**
 * Calculates course completion statistics
 */
export const calculateCourseStats = (course: Course) => {
  const totalSubjects = course.subjects?.length || 0;
  const totalChapters = course.subjects?.reduce((sum, subject) => 
    sum + (subject.chapters?.length || 0), 0) || 0;
  const totalMaterials = course.subjects?.reduce((sum, subject) => 
    sum + (subject.chapters?.reduce((chapterSum, chapter) => 
      chapterSum + (chapter.materials?.length || 0), 0) || 0), 0) || 0;
  
  const estimatedDuration = course.subjects?.reduce((sum, subject) => 
    sum + (subject.estimatedDuration || 0), 0) || 0;
  
  return {
    totalSubjects,
    totalChapters,
    totalMaterials,
    estimatedDuration,
    averageChaptersPerSubject: totalSubjects > 0 ? Math.round(totalChapters / totalSubjects) : 0,
    averageMaterialsPerChapter: totalChapters > 0 ? Math.round(totalMaterials / totalChapters) : 0,
  };
};