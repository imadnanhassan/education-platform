import { z } from 'zod';
import { addressSchema } from './admin';

// Common validation patterns
const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const studentIdRegex = /^GA\d{7}$/; // Format: GA2024001

// Guardian Information Schema
export const guardianSchema = z.object({
    name: z
        .string()
        .min(1, 'অভিভাবকের নাম প্রয়োজন')
        .min(2, 'অভিভাবকের নাম কমপক্ষে ২ অক্ষরের হতে হবে')
        .max(100, 'অভিভাবকের নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    relationship: z
        .string()
        .min(1, 'সম্পর্ক নির্বাচন করুন')
        .max(50, 'সম্পর্ক সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    phone: z
        .string()
        .min(1, 'অভিভাবকের ফোন নম্বর প্রয়োজন')
        .regex(phoneRegex, 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন'),
    email: z
        .string()
        .email('সঠিক ইমেইল ঠিকানা লিখুন')
        .optional()
        .or(z.literal('')),
    occupation: z
        .string()
        .max(100, 'পেশা সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Academic Information Schema
export const academicInfoSchema = z.object({
    class: z
        .string()
        .min(1, 'শ্রেণী নির্বাচন করুন')
        .max(50, 'শ্রেণী সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    section: z
        .string()
        .max(10, 'শাখা সর্বোচ্চ ১০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    rollNumber: z
        .string()
        .max(20, 'রোল নম্বর সর্বোচ্চ ২০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    institution: z
        .string()
        .min(1, 'শিক্ষা প্রতিষ্ঠানের নাম প্রয়োজন')
        .max(200, 'শিক্ষা প্রতিষ্ঠানের নাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    board: z
        .string()
        .min(1, 'শিক্ষা বোর্ড নির্বাচন করুন')
        .max(100, 'শিক্ষা বোর্ড সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    passingYear: z
        .string()
        .regex(/^\d{4}$/, 'সঠিক বছর লিখুন (যেমন: ২০২৪)')
        .optional()
        .or(z.literal('')),
});

// Student Schema
export const studentSchema = z.object({
    studentId: z
        .string()
        .min(1, 'শিক্ষার্থী আইডি প্রয়োজন')
        .regex(studentIdRegex, 'শিক্ষার্থী আইডি GA এর পর ৭ সংখ্যা হতে হবে (যেমন: GA2024001)'),
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
            return age >= 5 && age <= 100;
        }, 'বয়স ৫ থেকে ১০০ বছরের মধ্যে হতে হবে'),
    gender: z
        .enum(['male', 'female', 'other'], {
            message: 'লিঙ্গ নির্বাচন করুন'
        }),
    address: addressSchema,
    guardian: guardianSchema,
    academicInfo: academicInfoSchema,
    avatar: z
        .string()
        .url('সঠিক ছবির URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    status: z
        .enum(['active', 'inactive', 'suspended'], {
            message: 'অবস্থা নির্বাচন করুন'
        })
        .default('active'),
});

// Course Enrollment Schema
export const courseEnrollmentSchema = z.object({
    courseId: z
        .string()
        .min(1, 'কোর্স নির্বাচন করুন'),
    enrolledAt: z
        .string()
        .min(1, 'ভর্তির তারিখ প্রয়োজন'),
    status: z
        .enum(['enrolled', 'completed', 'dropped'], {
            message: 'ভর্তির অবস্থা নির্বাচন করুন'
        })
        .default('enrolled'),
    progress: z
        .number()
        .min(0, 'অগ্রগতি ০% এর কম হতে পারে না')
        .max(100, 'অগ্রগতি ১০০% এর বেশি হতে পারে না')
        .default(0),
    grade: z
        .string()
        .max(10, 'গ্রেড সর্বোচ্চ ১০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Student Search and Filter Schema
export const studentFilterSchema = z.object({
    search: z
        .string()
        .max(100, 'অনুসন্ধান সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    status: z
        .enum(['all', 'active', 'inactive', 'suspended'], {
            message: 'অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    class: z
        .string()
        .max(50, 'শ্রেণী সর্বোচ্চ ৫০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    gender: z
        .enum(['all', 'male', 'female', 'other'], {
            message: 'লিঙ্গ নির্বাচন করুন'
        })
        .default('all'),
    enrollmentDateFrom: z
        .string()
        .optional()
        .or(z.literal('')),
    enrollmentDateTo: z
        .string()
        .optional()
        .or(z.literal('')),
    sortBy: z
        .enum(['name', 'studentId', 'email', 'createdAt'], {
            message: 'সাজানোর ক্ষেত্র নির্বাচন করুন'
        })
        .default('createdAt'),
    sortOrder: z
        .enum(['asc', 'desc'], {
            message: 'সাজানোর ক্রম নির্বাচন করুন'
        })
        .default('desc'),
});

// Bulk Operations Schema
export const bulkStudentOperationSchema = z.object({
    studentIds: z
        .array(z.string())
        .min(1, 'অন্তত একজন শিক্ষার্থী নির্বাচন করুন'),
    operation: z
        .enum(['activate', 'deactivate', 'suspend', 'delete'], {
            message: 'অপারেশন নির্বাচন করুন'
        }),
    reason: z
        .string()
        .min(1, 'কারণ লিখুন')
        .max(500, 'কারণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Create and Update Schemas
export const createStudentSchema = studentSchema.omit({ studentId: true });
export const updateStudentSchema = studentSchema.partial().extend({
    id: z.string().min(1, 'শিক্ষার্থী আইডি প্রয়োজন')
});

// Export types
export type StudentFormData = z.infer<typeof studentSchema>;
export type CreateStudentFormData = z.infer<typeof createStudentSchema>;
export type UpdateStudentFormData = z.infer<typeof updateStudentSchema>;
export type GuardianFormData = z.infer<typeof guardianSchema>;
export type AcademicInfoFormData = z.infer<typeof academicInfoSchema>;
export type CourseEnrollmentFormData = z.infer<typeof courseEnrollmentSchema>;
export type StudentFilterFormData = z.infer<typeof studentFilterSchema>;
export type BulkStudentOperationFormData = z.infer<typeof bulkStudentOperationSchema>;