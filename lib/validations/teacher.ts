import { z } from 'zod';
import { addressSchema } from './admin';

// Common validation patterns
const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const employeeIdRegex = /^GA-T-\d{3}$/; // Format: GA-T-001

// Qualification Schema
export const qualificationSchema = z.object({
    degree: z
        .string()
        .min(1, 'ডিগ্রির নাম প্রয়োজন')
        .max(100, 'ডিগ্রির নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    institution: z
        .string()
        .min(1, 'প্রতিষ্ঠানের নাম প্রয়োজন')
        .max(200, 'প্রতিষ্ঠানের নাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    year: z
        .string()
        .min(1, 'পাসের বছর প্রয়োজন')
        .regex(/^\d{4}$/, 'সঠিক বছর লিখুন (যেমন: ২০২০)'),
    grade: z
        .string()
        .max(20, 'গ্রেড সর্বোচ্চ ২০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    subject: z
        .string()
        .max(100, 'বিষয় সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Experience Schema
export const experienceSchema = z.object({
    position: z
        .string()
        .min(1, 'পদবির নাম প্রয়োজন')
        .max(100, 'পদবির নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    organization: z
        .string()
        .min(1, 'প্রতিষ্ঠানের নাম প্রয়োজন')
        .max(200, 'প্রতিষ্ঠানের নাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    startDate: z
        .string()
        .min(1, 'শুরুর তারিখ প্রয়োজন'),
    endDate: z
        .string()
        .optional()
        .or(z.literal('')),
    description: z
        .string()
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    isCurrent: z
        .boolean()
        .default(false),
});

// Social Links Schema
export const socialLinksSchema = z.object({
    facebook: z
        .string()
        .url('সঠিক Facebook URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    linkedin: z
        .string()
        .url('সঠিক LinkedIn URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    twitter: z
        .string()
        .url('সঠিক Twitter URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    website: z
        .string()
        .url('সঠিক ওয়েবসাইট URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    youtube: z
        .string()
        .url('সঠিক YouTube URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
});

// Teacher Schema
export const teacherSchema = z.object({
    employeeId: z
        .string()
        .min(1, 'কর্মচারী আইডি প্রয়োজন')
        .regex(employeeIdRegex, 'কর্মচারী আইডি GA-T- এর পর ৩ সংখ্যা হতে হবে (যেমন: GA-T-001)'),
    firstName: z
        .string()
        .min(1, 'নাম প্রয়োজন')
        .min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে')
        .max(50, 'নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    lastName: z
        .string()
        .min(1, 'পদবি প্রয়োজন')
        .min(2, 'পদবি কমপক্ষে ২ অক্ষরের হতে হবে')
        .max(50, 'পদবি সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    email: z
        .string()
        .min(1, 'ইমেইল প্রয়োজন')
        .email('সঠিক ইমেইল ঠিকানা লিখুন')
        .regex(emailRegex, 'সঠিক ইমেইল ফরম্যাট ব্যবহার করুন'),
    phone: z
        .string()
        .min(1, 'ফোন নম্বর প্রয়োজন')
        .regex(phoneRegex, 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন'),
    dateOfBirth: z
        .string()
        .min(1, 'জন্ম তারিখ প্রয়োজন')
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 22 && age <= 70;
        }, 'বয়স ২২ থেকে ৭০ বছরের মধ্যে হতে হবে'),
    gender: z
        .enum(['male', 'female', 'other'], {
            message: 'লিঙ্গ নির্বাচন করুন'
        }),
    address: addressSchema,
    qualifications: z
        .array(qualificationSchema)
        .min(1, 'অন্তত একটি শিক্ষাগত যোগ্যতা যোগ করুন')
        .max(10, 'সর্বোচ্চ ১০টি শিক্ষাগত যোগ্যতা যোগ করা যাবে'),
    experience: z
        .array(experienceSchema)
        .max(20, 'সর্বোচ্চ ২০টি কর্মঅভিজ্ঞতা যোগ করা যাবে')
        .default([]),
    specializations: z
        .array(z.string())
        .min(1, 'অন্তত একটি বিশেষত্ব যোগ করুন')
        .max(10, 'সর্বোচ্চ ১০টি বিশেষত্ব যোগ করা যাবে'),
    assignedCourses: z
        .array(z.string())
        .max(20, 'সর্বোচ্চ ২০টি কোর্স বরাদ্দ করা যাবে')
        .default([]),
    avatar: z
        .string()
        .url('সঠিক ছবির URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    bio: z
        .string()
        .max(2000, 'জীবনী সর্বোচ্চ ২০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    bioEn: z
        .string()
        .max(2000, 'ইংরেজি জীবনী সর্বোচ্চ ২০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    socialLinks: socialLinksSchema.optional(),
    status: z
        .enum(['active', 'inactive', 'on_leave'], {
            message: 'অবস্থা নির্বাচন করুন'
        })
        .default('active'),
    joinDate: z
        .string()
        .min(1, 'যোগদানের তারিখ প্রয়োজন'),
    salary: z
        .number()
        .min(0, 'বেতন ০ টাকার কম হতে পারে না')
        .max(1000000, 'বেতন ১০,০০,০০০ টাকার বেশি হতে পারে না')
        .optional(),
    emergencyContact: z.object({
        name: z
            .string()
            .min(1, 'জরুরি যোগাযোগের নাম প্রয়োজন')
            .max(100, 'নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
        relationship: z
            .string()
            .min(1, 'সম্পর্ক প্রয়োজন')
            .max(50, 'সম্পর্ক সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
        phone: z
            .string()
            .min(1, 'ফোন নম্বর প্রয়োজন')
            .regex(phoneRegex, 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন'),
    }).optional(),
    isPublicProfile: z
        .boolean()
        .default(true),
    canTeachOnline: z
        .boolean()
        .default(true),
    preferredSubjects: z
        .array(z.string())
        .max(15, 'সর্বোচ্চ ১৫টি পছন্দের বিষয় যোগ করা যাবে')
        .default([]),
});

// Course Assignment Schema
export const courseAssignmentSchema = z.object({
    teacherId: z
        .string()
        .min(1, 'শিক্ষক নির্বাচন করুন'),
    courseIds: z
        .array(z.string())
        .min(1, 'অন্তত একটি কোর্স নির্বাচন করুন')
        .max(10, 'সর্বোচ্চ ১০টি কোর্স একসাথে বরাদ্দ করা যাবে'),
    assignedDate: z
        .string()
        .min(1, 'বরাদ্দের তারিখ প্রয়োজন'),
    notes: z
        .string()
        .max(500, 'নোট সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Teacher Filter Schema
export const teacherFilterSchema = z.object({
    search: z
        .string()
        .max(100, 'অনুসন্ধান সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    status: z
        .enum(['all', 'active', 'inactive', 'on_leave'], {
            message: 'অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    specialization: z
        .string()
        .optional()
        .or(z.literal('')),
    gender: z
        .enum(['all', 'male', 'female', 'other'], {
            message: 'লিঙ্গ নির্বাচন করুন'
        })
        .default('all'),
    joinDateFrom: z
        .string()
        .optional()
        .or(z.literal('')),
    joinDateTo: z
        .string()
        .optional()
        .or(z.literal('')),
    hasAssignedCourses: z
        .enum(['all', 'yes', 'no'], {
            message: 'কোর্স বরাদ্দের অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    sortBy: z
        .enum(['name', 'employeeId', 'email', 'joinDate', 'assignedCourses'], {
            message: 'সাজানোর ক্ষেত্র নির্বাচন করুন'
        })
        .default('joinDate'),
    sortOrder: z
        .enum(['asc', 'desc'], {
            message: 'সাজানোর ক্রম নির্বাচন করুন'
        })
        .default('desc'),
});

// Bulk Teacher Operations Schema
export const bulkTeacherOperationSchema = z.object({
    teacherIds: z
        .array(z.string())
        .min(1, 'অন্তত একজন শিক্ষক নির্বাচন করুন'),
    operation: z
        .enum(['activate', 'deactivate', 'set_on_leave', 'delete'], {
            message: 'অপারেশন নির্বাচন করুন'
        }),
    reason: z
        .string()
        .max(500, 'কারণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    effectiveDate: z
        .string()
        .optional()
        .or(z.literal('')),
});

// Teacher Performance Schema
export const teacherPerformanceSchema = z.object({
    teacherId: z
        .string()
        .min(1, 'শিক্ষক আইডি প্রয়োজন'),
    evaluationPeriod: z
        .string()
        .min(1, 'মূল্যায়নের সময়কাল প্রয়োজন'),
    overallRating: z
        .number()
        .min(1, 'সামগ্রিক রেটিং কমপক্ষে ১ হতে হবে')
        .max(5, 'সামগ্রিক রেটিং সর্বোচ্চ ৫ হতে পারে'),
    teachingQuality: z
        .number()
        .min(1, 'শিক্ষাদানের মান কমপক্ষে ১ হতে হবে')
        .max(5, 'শিক্ষাদানের মান সর্বোচ্চ ৫ হতে পারে'),
    studentEngagement: z
        .number()
        .min(1, 'শিক্ষার্থী সম্পৃক্ততা কমপক্ষে ১ হতে হবে')
        .max(5, 'শিক্ষার্থী সম্পৃক্ততা সর্বোচ্চ ৫ হতে পারে'),
    punctuality: z
        .number()
        .min(1, 'সময়ানুবর্তিতা কমপক্ষে ১ হতে হবে')
        .max(5, 'সময়ানুবর্তিতা সর্বোচ্চ ৫ হতে পারে'),
    feedback: z
        .string()
        .max(2000, 'মতামত সর্বোচ্চ ২০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    recommendations: z
        .string()
        .max(1000, 'সুপারিশ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    evaluatedBy: z
        .string()
        .min(1, 'মূল্যায়নকারী প্রয়োজন'),
});

// Create and Update Schemas
export const createTeacherSchema = teacherSchema.omit({ employeeId: true });
export const updateTeacherSchema = teacherSchema.partial().extend({
    id: z.string().min(1, 'শিক্ষক আইডি প্রয়োজন')
});

// Export types
export type TeacherFormData = z.infer<typeof teacherSchema>;
export type CreateTeacherFormData = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherFormData = z.infer<typeof updateTeacherSchema>;
export type QualificationFormData = z.infer<typeof qualificationSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;
export type CourseAssignmentFormData = z.infer<typeof courseAssignmentSchema>;
export type TeacherFilterFormData = z.infer<typeof teacherFilterSchema>;
export type BulkTeacherOperationFormData = z.infer<typeof bulkTeacherOperationSchema>;
export type TeacherPerformanceFormData = z.infer<typeof teacherPerformanceSchema>;