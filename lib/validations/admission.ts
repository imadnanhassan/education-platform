import { z } from 'zod';
import { addressSchema } from './admin';
import { guardianSchema, academicInfoSchema } from './student';

// Common validation patterns
const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const applicationIdRegex = /^ADM\d{7}$/; // Format: ADM2024001

// Document Schema
export const documentSchema = z.object({
    type: z
        .enum(['photo', 'certificate', 'transcript', 'id_card', 'birth_certificate', 'other'], {
            message: 'ডকুমেন্টের ধরন নির্বাচন করুন'
        }),
    name: z
        .string()
        .min(1, 'ডকুমেন্টের নাম প্রয়োজন')
        .max(200, 'ডকুমেন্টের নাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    url: z
        .string()
        .min(1, 'ডকুমেন্টের URL প্রয়োজন')
        .url('সঠিক URL প্রদান করুন'),
    size: z
        .number()
        .min(1, 'ফাইলের আকার প্রয়োজন')
        .max(10 * 1024 * 1024, 'ফাইলের আকার ১০ MB এর বেশি হতে পারবে না'),
    mimeType: z
        .string()
        .min(1, 'ফাইলের ধরন প্রয়োজন')
        .refine((type) => {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'application/pdf',
                'image/webp'
            ];
            return allowedTypes.includes(type);
        }, 'অনুমোদিত ফাইল ফরম্যাট: JPG, PNG, GIF, WebP, PDF'),
    description: z
        .string()
        .max(500, 'বিবরণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Course Preference Schema
export const coursePreferenceSchema = z.object({
    courseId: z
        .string()
        .min(1, 'কোর্স নির্বাচন করুন'),
    priority: z
        .number()
        .min(1, 'অগ্রাধিকার কমপক্ষে ১ হতে হবে')
        .max(5, 'অগ্রাধিকার সর্বোচ্চ ৫ হতে পারে'),
    reason: z
        .string()
        .max(500, 'কারণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Applicant Information Schema
export const applicantInfoSchema = z.object({
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
    nationality: z
        .string()
        .min(1, 'জাতীয়তা প্রয়োজন')
        .max(50, 'জাতীয়তা সর্বোচ্চ ৫০ অক্ষরের হতে পারে')
        .default('Bangladeshi'),
    religion: z
        .string()
        .min(1, 'ধর্ম প্রয়োজন')
        .max(50, 'ধর্ম সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
            message: 'রক্তের গ্রুপ নির্বাচন করুন'
        })
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
    }),
});

// Main Admission Request Schema
export const admissionRequestSchema = z.object({
    applicationId: z
        .string()
        .min(1, 'আবেদন আইডি প্রয়োজন')
        .regex(applicationIdRegex, 'আবেদন আইডি ADM এর পর ৭ সংখ্যা হতে হবে (যেমন: ADM2024001)'),
    applicantInfo: applicantInfoSchema,
    academicInfo: academicInfoSchema,
    coursePreferences: z
        .array(coursePreferenceSchema)
        .min(1, 'অন্তত একটি কোর্স পছন্দ নির্বাচন করুন')
        .max(3, 'সর্বোচ্চ ৩টি কোর্স পছন্দ নির্বাচন করা যাবে')
        .refine((preferences) => {
            const priorities = preferences.map(p => p.priority);
            const uniquePriorities = new Set(priorities);
            return uniquePriorities.size === priorities.length;
        }, 'প্রতিটি কোর্সের অগ্রাধিকার আলাদা হতে হবে'),
    documents: z
        .array(documentSchema)
        .min(1, 'অন্তত একটি ডকুমেন্ট আপলোড করুন')
        .max(10, 'সর্বোচ্চ ১০টি ডকুমেন্ট আপলোড করা যাবে'),
    status: z
        .enum(['pending', 'under_review', 'approved', 'rejected', 'waitlisted'], {
            message: 'আবেদনের অবস্থা নির্বাচন করুন'
        })
        .default('pending'),
    applicationFee: z
        .number()
        .min(0, 'আবেদন ফি ০ টাকার কম হতে পারে না')
        .max(10000, 'আবেদন ফি ১০,০০০ টাকার বেশি হতে পারে না')
        .default(500),
    paymentStatus: z
        .enum(['pending', 'paid', 'failed', 'refunded'], {
            message: 'পেমেন্টের অবস্থা নির্বাচন করুন'
        })
        .default('pending'),
    specialRequirements: z
        .string()
        .max(1000, 'বিশেষ প্রয়োজনীয়তা সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    howDidYouHear: z
        .enum(['website', 'facebook', 'friend', 'teacher', 'advertisement', 'other'], {
            message: 'কীভাবে জানলেন তা নির্বাচন করুন'
        })
        .optional(),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, {
            message: 'শর্তাবলী গ্রহণ করতে হবে',
        }),
});

// Admission Review Schema
export const admissionReviewSchema = z.object({
    applicationId: z
        .string()
        .min(1, 'আবেদন আইডি প্রয়োজন'),
    status: z
        .enum(['approved', 'rejected', 'waitlisted'], {
            message: 'সিদ্ধান্ত নির্বাচন করুন'
        }),
    reviewNotes: z
        .string()
        .min(1, 'পর্যালোচনার মন্তব্য প্রয়োজন')
        .max(2000, 'মন্তব্য সর্বোচ্চ ২০০০ অক্ষরের হতে পারে'),
    assignedCourse: z
        .string()
        .min(1, 'বরাদ্দকৃত কোর্স নির্বাচন করুন')
        .optional()
        .or(z.literal('')),
    scholarshipAmount: z
        .number()
        .min(0, 'বৃত্তির পরিমাণ ০ টাকার কম হতে পারে না')
        .max(100000, 'বৃত্তির পরিমাণ ১,০০,০০০ টাকার বেশি হতে পারে না')
        .optional(),
    conditionalRequirements: z
        .string()
        .max(1000, 'শর্তসাপেক্ষ প্রয়োজনীয়তা সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    followUpRequired: z
        .boolean()
        .default(false),
    followUpDate: z
        .string()
        .optional()
        .or(z.literal('')),
    notifyApplicant: z
        .boolean()
        .default(true),
    createStudentProfile: z
        .boolean()
        .default(false),
});

// Admission Filter Schema
export const admissionFilterSchema = z.object({
    search: z
        .string()
        .max(100, 'অনুসন্ধান সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    status: z
        .enum(['all', 'pending', 'under_review', 'approved', 'rejected', 'waitlisted'], {
            message: 'অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    paymentStatus: z
        .enum(['all', 'pending', 'paid', 'failed', 'refunded'], {
            message: 'পেমেন্টের অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    coursePreference: z
        .string()
        .optional()
        .or(z.literal('')),
    gender: z
        .enum(['all', 'male', 'female', 'other'], {
            message: 'লিঙ্গ নির্বাচন করুন'
        })
        .default('all'),
    ageRange: z
        .enum(['all', '5-10', '11-15', '16-20', '21-25', '26+'], {
            message: 'বয়সের পরিসর নির্বাচন করুন'
        })
        .default('all'),
    submissionDateFrom: z
        .string()
        .optional()
        .or(z.literal('')),
    submissionDateTo: z
        .string()
        .optional()
        .or(z.literal('')),
    reviewedBy: z
        .string()
        .optional()
        .or(z.literal('')),
    sortBy: z
        .enum(['submittedAt', 'applicantName', 'status', 'reviewedAt'], {
            message: 'সাজানোর ক্ষেত্র নির্বাচন করুন'
        })
        .default('submittedAt'),
    sortOrder: z
        .enum(['asc', 'desc'], {
            message: 'সাজানোর ক্রম নির্বাচন করুন'
        })
        .default('desc'),
});

// Bulk Admission Operations Schema
export const bulkAdmissionOperationSchema = z.object({
    applicationIds: z
        .array(z.string())
        .min(1, 'অন্তত একটি আবেদন নির্বাচন করুন'),
    operation: z
        .enum(['approve', 'reject', 'move_to_review', 'send_reminder'], {
           message: 'অপারেশন নির্বাচন করুন'
        }),
    reason: z
        .string()
        .max(1000, 'কারণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    assignedCourse: z
        .string()
        .optional()
        .or(z.literal('')),
    notifyApplicants: z
        .boolean()
        .default(true),
});

// Admission Statistics Schema
export const admissionStatsFilterSchema = z.object({
    dateFrom: z
        .string()
        .min(1, 'শুরুর তারিখ প্রয়োজন'),
    dateTo: z
        .string()
        .min(1, 'শেষের তারিখ প্রয়োজন'),
    courseId: z
        .string()
        .optional()
        .or(z.literal('')),
    groupBy: z
        .enum(['day', 'week', 'month'], {
           message: 'গ্রুপিং পদ্ধতি নির্বাচন করুন'
        })
        .default('month'),
});

// Create and Update Schemas
export const createAdmissionRequestSchema = admissionRequestSchema.omit({ 
    applicationId: true, 
    status: true, 
    paymentStatus: true 
});

export const updateAdmissionRequestSchema = admissionRequestSchema.partial().extend({
    id: z.string().min(1, 'আবেদন আইডি প্রয়োজন')
});

// Export types
export type AdmissionRequestFormData = z.infer<typeof admissionRequestSchema>;
export type CreateAdmissionRequestFormData = z.infer<typeof createAdmissionRequestSchema>;
export type UpdateAdmissionRequestFormData = z.infer<typeof updateAdmissionRequestSchema>;
export type ApplicantInfoFormData = z.infer<typeof applicantInfoSchema>;
export type DocumentFormData = z.infer<typeof documentSchema>;
export type CoursePreferenceFormData = z.infer<typeof coursePreferenceSchema>;
export type AdmissionReviewFormData = z.infer<typeof admissionReviewSchema>;
export type AdmissionFilterFormData = z.infer<typeof admissionFilterSchema>;
export type BulkAdmissionOperationFormData = z.infer<typeof bulkAdmissionOperationSchema>;
export type AdmissionStatsFilterFormData = z.infer<typeof admissionStatsFilterSchema>;