import { z } from 'zod';

// Common validation patterns
const urlRegex = /^https?:\/\/.+/;

// Course Material Schema
export const courseMaterialSchema = z.object({
    title: z
        .string()
        .min(1, 'উপাদানের শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    type: z
        .enum(['video', 'pdf', 'mcq', 'assignment', 'quiz'], {
            message: 'উপাদানের ধরন নির্বাচন করুন'
        }),
    content: z
        .string()
        .min(1, 'উপাদানের বিষয়বস্তু প্রয়োজন')
        .refine((content) => {
            // For URLs, validate URL format
            if (content.startsWith('http')) {
                return urlRegex.test(content);
            }
            return true;
        }, 'সঠিক URL প্রদান করুন'),
    duration: z
        .number()
        .min(0, 'সময়কাল ০ মিনিটের কম হতে পারে না')
        .max(600, 'সময়কাল ৬০০ মিনিটের বেশি হতে পারে না')
        .optional(),
    order: z
        .number()
        .min(1, 'ক্রম ১ এর কম হতে পারে না')
        .max(1000, 'ক্রম ১০০০ এর বেশি হতে পারে না'),
    isRequired: z
        .boolean()
        .default(true),
    description: z
        .string()
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Chapter Schema
export const chapterSchema = z.object({
    title: z
        .string()
        .min(1, 'অধ্যায়ের শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    titleEn: z
        .string()
        .min(1, 'ইংরেজি শিরোনাম প্রয়োজন')
        .max(200, 'ইংরেজি শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .min(1, 'অধ্যায়ের বিবরণ প্রয়োজন')
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে'),
    order: z
        .number()
        .min(1, 'ক্রম ১ এর কম হতে পারে না')
        .max(100, 'ক্রম ১০০ এর বেশি হতে পারে না'),
    materials: z
        .array(courseMaterialSchema)
        .min(1, 'অন্তত একটি উপাদান যোগ করুন')
        .max(50, 'সর্বোচ্চ ৫০টি উপাদান যোগ করা যাবে'),
});

// Subject Schema
export const subjectSchema = z.object({
    title: z
        .string()
        .min(1, 'বিষয়ের শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    titleEn: z
        .string()
        .min(1, 'ইংরেজি শিরোনাম প্রয়োজন')
        .max(200, 'ইংরেজি শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .min(1, 'বিষয়ের বিবরণ প্রয়োজন')
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে'),
    order: z
        .number()
        .min(1, 'ক্রম ১ এর কম হতে পারে না')
        .max(50, 'ক্রম ৫০ এর বেশি হতে পারে না'),
    chapters: z
        .array(chapterSchema)
        .min(1, 'অন্তত একটি অধ্যায় যোগ করুন')
        .max(20, 'সর্বোচ্চ ২০টি অধ্যায় যোগ করা যাবে'),
});

// Course Category Schema
export const courseCategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    nameEn: z.string(),
    description: z.string().optional(),
});

// Main Course Schema
export const courseSchema = z.object({
    title: z
        .string()
        .min(1, 'কোর্সের শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    titleEn: z
        .string()
        .min(1, 'ইংরেজি শিরোনাম প্রয়োজন')
        .max(200, 'ইংরেজি শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .min(1, 'কোর্সের বিবরণ প্রয়োজন')
        .max(2000, 'বিবরণ সর্বোচ্চ ২০০০ অক্ষরের হতে পারে'),
    category: z
        .string()
        .min(1, 'কোর্সের ক্যাটেগরি নির্বাচন করুন'),
    level: z
        .enum(['beginner', 'intermediate', 'advanced'], {
            message: 'কোর্সের স্তর নির্বাচন করুন'
        }),
    duration: z
        .number()
        .min(1, 'কোর্সের সময়কাল কমপক্ষে ১ ঘন্টা হতে হবে')
        .max(1000, 'কোর্সের সময়কাল সর্বোচ্চ ১০০০ ঘন্টা হতে পারে'),
    price: z
        .number()
        .min(0, 'মূল্য ০ টাকার কম হতে পারে না')
        .max(100000, 'মূল্য ১,০০,০০০ টাকার বেশি হতে পারে না'),
    currency: z
        .literal('BDT', {
            message: 'মুদ্রা BDT হতে হবে'
        }),
    thumbnail: z
        .string()
        .min(1, 'কোর্সের থাম্বনেইল প্রয়োজন')
        .url('সঠিক থাম্বনেইল URL প্রদান করুন'),
    instructor: z
        .string()
        .min(1, 'শিক্ষক নির্বাচন করুন'),
    subjects: z
        .array(subjectSchema)
        .min(1, 'অন্তত একটি বিষয় যোগ করুন')
        .max(10, 'সর্বোচ্চ ১০টি বিষয় যোগ করা যাবে'),
    tags: z
        .array(z.string())
        .max(20, 'সর্বোচ্চ ২০টি ট্যাগ যোগ করা যাবে')
        .default([]),
    status: z
        .enum(['draft', 'published', 'archived'], {
            message: 'কোর্সের অবস্থা নির্বাচন করুন'
        })
        .default('draft'),
    prerequisites: z
        .string()
        .max(1000, 'পূর্বশর্ত সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    learningOutcomes: z
        .array(z.string())
        .max(20, 'সর্বোচ্চ ২০টি শিক্ষার ফলাফল যোগ করা যাবে')
        .default([]),
    isPublic: z
        .boolean()
        .default(true),
    allowEnrollment: z
        .boolean()
        .default(true),
    maxStudents: z
        .number()
        .min(1, 'সর্বোচ্চ শিক্ষার্থী সংখ্যা কমপক্ষে ১ হতে হবে')
        .max(10000, 'সর্বোচ্চ শিক্ষার্থী সংখ্যা ১০,০০০ এর বেশি হতে পারে না')
        .optional(),
});

// Course Filter Schema
export const courseFilterSchema = z.object({
    search: z
        .string()
        .max(100, 'অনুসন্ধান সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    category: z
        .string()
        .optional()
        .or(z.literal('')),
    level: z
        .enum(['all', 'beginner', 'intermediate', 'advanced'], {
            message: 'স্তর নির্বাচন করুন'
        })
        .default('all'),
    status: z
        .enum(['all', 'draft', 'published', 'archived'], {
            message: 'অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    instructor: z
        .string()
        .optional()
        .or(z.literal('')),
    priceMin: z
        .number()
        .min(0, 'সর্বনিম্ন মূল্য ০ টাকার কম হতে পারে না')
        .optional(),
    priceMax: z
        .number()
        .min(0, 'সর্বোচ্চ মূল্য ০ টাকার কম হতে পারে না')
        .optional(),
    createdDateFrom: z
        .string()
        .optional()
        .or(z.literal('')),
    createdDateTo: z
        .string()
        .optional()
        .or(z.literal('')),
    sortBy: z
        .enum(['title', 'price', 'duration', 'createdAt', 'totalStudents'], {
            message: 'সাজানোর ক্ষেত্র নির্বাচন করুন'
        })
        .default('createdAt'),
    sortOrder: z
        .enum(['asc', 'desc'], {
            message: 'সাজানোর ক্রম নির্বাচন করুন'
        })
        .default('desc'),
});

// Course Publishing Schema
export const coursePublishSchema = z.object({
    courseId: z
        .string()
        .min(1, 'কোর্স আইডি প্রয়োজন'),
    publishNotes: z
        .string()
        .max(500, 'প্রকাশনার নোট সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    notifyStudents: z
        .boolean()
        .default(true),
    schedulePublish: z
        .boolean()
        .default(false),
    publishDate: z
        .string()
        .optional()
        .or(z.literal('')),
    preserveEnrollments: z
        .boolean()
        .default(true),
    validationOverride: z
        .boolean()
        .default(false),
});

// Course Status Change Schema
export const courseStatusChangeSchema = z.object({
    courseId: z
        .string()
        .min(1, 'কোর্স আইডি প্রয়োজন'),
    newStatus: z
        .enum(['draft', 'published', 'archived', 'under_review'], {
            message: 'নতুন অবস্থা নির্বাচন করুন'
        }),
    reason: z
        .string()
        .max(500, 'কারণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    preserveEnrollments: z
        .boolean()
        .default(true),
    notifyUsers: z
        .boolean()
        .default(true),
});

// Course Validation Result Schema
export const courseValidationResultSchema = z.object({
    isValid: z.boolean(),
    canPublish: z.boolean(),
    errors: z.array(z.object({
        type: z.enum(['error', 'warning', 'info']),
        message: z.string(),
        field: z.string().optional(),
        details: z.array(z.string()).optional(),
    })),
    warnings: z.array(z.object({
        type: z.enum(['error', 'warning', 'info']),
        message: z.string(),
        field: z.string().optional(),
        details: z.array(z.string()).optional(),
    })),
    suggestions: z.array(z.object({
        type: z.enum(['error', 'warning', 'info']),
        message: z.string(),
        field: z.string().optional(),
        details: z.array(z.string()).optional(),
    })),
});

// Bulk Course Operations Schema
export const bulkCourseOperationSchema = z.object({
    courseIds: z
        .array(z.string())
        .min(1, 'অন্তত একটি কোর্স নির্বাচন করুন'),
    operation: z
        .enum(['publish', 'unpublish', 'archive', 'delete'], {
            message: 'অপারেশন নির্বাচন করুন'
        }),
    reason: z
        .string()
        .max(500, 'কারণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Create and Update Schemas
export const createCourseSchema = courseSchema.omit({ status: true });
export const updateCourseSchema = courseSchema.partial().extend({
    id: z.string().min(1, 'কোর্স আইডি প্রয়োজন')
});

// MCQ Question Schema for course materials
export const mcqQuestionSchema = z.object({
    question: z
        .string()
        .min(1, 'প্রশ্ন প্রয়োজন')
        .max(1000, 'প্রশ্ন সর্বোচ্চ ১০০০ অক্ষরের হতে পারে'),
    options: z
        .array(z.string())
        .min(2, 'কমপক্ষে ২টি অপশন প্রয়োজন')
        .max(6, 'সর্বোচ্চ ৬টি অপশন যোগ করা যাবে'),
    correctAnswer: z
        .number()
        .min(0, 'সঠিক উত্তরের ইনডেক্স ০ এর কম হতে পারে না')
        .max(5, 'সঠিক উত্তরের ইনডেক্স ৫ এর বেশি হতে পারে না'),
    explanation: z
        .string()
        .max(500, 'ব্যাখ্যা সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    marks: z
        .number()
        .min(1, 'নম্বর কমপক্ষে ১ হতে হবে')
        .max(10, 'নম্বর সর্বোচ্চ ১০ হতে পারে')
        .default(1),
});

export const mcqSetSchema = z.object({
    title: z
        .string()
        .min(1, 'MCQ সেটের শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    timeLimit: z
        .number()
        .min(1, 'সময়সীমা কমপক্ষে ১ মিনিট হতে হবে')
        .max(180, 'সময়সীমা সর্বোচ্চ ১৮০ মিনিট হতে পারে'),
    questions: z
        .array(mcqQuestionSchema)
        .min(1, 'অন্তত একটি প্রশ্ন যোগ করুন')
        .max(100, 'সর্বোচ্চ ১০০টি প্রশ্ন যোগ করা যাবে'),
    passingMarks: z
        .number()
        .min(1, 'পাসিং মার্ক কমপক্ষে ১ হতে হবে'),
    shuffleQuestions: z
        .boolean()
        .default(true),
    showResults: z
        .boolean()
        .default(true),
});

// Export types
export type CourseFormData = z.infer<typeof courseSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;
export type SubjectFormData = z.infer<typeof subjectSchema>;
export type ChapterFormData = z.infer<typeof chapterSchema>;
export type CourseMaterialFormData = z.infer<typeof courseMaterialSchema>;
export type CourseFilterFormData = z.infer<typeof courseFilterSchema>;
export type CoursePublishFormData = z.infer<typeof coursePublishSchema>;
export type CourseStatusChangeFormData = z.infer<typeof courseStatusChangeSchema>;
export type CourseValidationResult = z.infer<typeof courseValidationResultSchema>;
export type BulkCourseOperationFormData = z.infer<typeof bulkCourseOperationSchema>;
export type MCQQuestionFormData = z.infer<typeof mcqQuestionSchema>;
export type MCQSetFormData = z.infer<typeof mcqSetSchema>;