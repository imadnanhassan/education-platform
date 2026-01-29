import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^(\+8801|01)[3-9]\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Admin User Validation
export const adminUserSchema = z.object({
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
    role: z
        .enum(['super_admin', 'admin', 'moderator', 'content_manager'], {
            message: 'সঠিক ভূমিকা নির্বাচন করুন'
        }),
    avatar: z
        .string()
        .url('সঠিক URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    isActive: z.boolean().default(true),
});

export const adminPasswordSchema = z.object({
    password: z
        .string()
        .min(1, 'পাসওয়ার্ড প্রয়োজন')
        .min(8, 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'পাসওয়ার্ডে অন্তত একটি ছোট হাতের অক্ষর, একটি বড় হাতের অক্ষর এবং একটি সংখ্যা থাকতে হবে'),
    confirmPassword: z
        .string()
        .min(1, 'পাসওয়ার্ড নিশ্চিতকরণ প্রয়োজন'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'পাসওয়ার্ড মিল নেই',
    path: ['confirmPassword'],
});

export const createAdminUserSchema = adminUserSchema.merge(adminPasswordSchema);
export const updateAdminUserSchema = adminUserSchema.partial();

// System Settings Validation
export const systemSettingsSchema = z.object({
    siteName: z
        .string()
        .min(1, 'সাইটের নাম প্রয়োজন')
        .max(100, 'সাইটের নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    siteNameEn: z
        .string()
        .min(1, 'ইংরেজি সাইটের নাম প্রয়োজন')
        .max(100, 'ইংরেজি সাইটের নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .min(1, 'বিবরণ প্রয়োজন')
        .max(500, 'বিবরণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে'),
    descriptionEn: z
        .string()
        .min(1, 'ইংরেজি বিবরণ প্রয়োজন')
        .max(500, 'ইংরেজি বিবরণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে'),
    contactEmail: z
        .string()
        .min(1, 'যোগাযোগের ইমেইল প্রয়োজন')
        .email('সঠিক ইমেইল ঠিকানা লিখুন'),
    contactPhone: z
        .string()
        .min(1, 'যোগাযোগের ফোন নম্বর প্রয়োজন')
        .regex(phoneRegex, 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন'),
    address: z
        .string()
        .min(1, 'ঠিকানা প্রয়োজন')
        .max(200, 'ঠিকানা সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    logo: z
        .string()
        .url('সঠিক লোগো URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    favicon: z
        .string()
        .url('সঠিক ফ্যাভিকন URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    timezone: z
        .string()
        .min(1, 'টাইমজোন নির্বাচন করুন'),
    language: z
        .enum(['bn', 'en'], {
            message: 'ভাষা নির্বাচন করুন'
        }),
    maintenanceMode: z.boolean().default(false),
    registrationEnabled: z.boolean().default(true),
    emailVerificationRequired: z.boolean().default(true),
});

// File Upload Validation
export const fileUploadSchema = z.object({
    file: z
        .instanceof(File, { message: 'ফাইল নির্বাচন করুন' })
        .refine((file) => file.size <= 10 * 1024 * 1024, 'ফাইলের আকার ১০ MB এর বেশি হতে পারবে না')
        .refine((file) => {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                'application/pdf',
                'video/mp4',
                'video/webm',
                'video/ogg'
            ];
            return allowedTypes.includes(file.type);
        }, 'অনুমোদিত ফাইল ফরম্যাট: JPG, PNG, GIF, WebP, PDF, MP4, WebM, OGG'),
});

export const imageUploadSchema = z.object({
    file: z
        .instanceof(File, { message: 'ছবি নির্বাচন করুন' })
        .refine((file) => file.size <= 5 * 1024 * 1024, 'ছবির আকার ৫ MB এর বেশি হতে পারবে না')
        .refine((file) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            return allowedTypes.includes(file.type);
        }, 'অনুমোদিত ছবির ফরম্যাট: JPG, PNG, GIF, WebP'),
});

export const videoUploadSchema = z.object({
    file: z
        .instanceof(File, { message: 'ভিডিও নির্বাচন করুন' })
        .refine((file) => file.size <= 100 * 1024 * 1024, 'ভিডিওর আকার ১০০ MB এর বেশি হতে পারবে না')
        .refine((file) => {
            const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            return allowedTypes.includes(file.type);
        }, 'অনুমোদিত ভিডিও ফরম্যাট: MP4, WebM, OGG'),
});

// Common Address Schema
export const addressSchema = z.object({
    street: z
        .string()
        .min(1, 'রাস্তার ঠিকানা প্রয়োজন')
        .max(100, 'রাস্তার ঠিকানা সর্বোচ্চ ১০০ অক্ষরের হতে পারে'),
    city: z
        .string()
        .min(1, 'শহর প্রয়োজন')
        .max(50, 'শহরের নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    district: z
        .string()
        .min(1, 'জেলা প্রয়োজন')
        .max(50, 'জেলার নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    division: z
        .string()
        .min(1, 'বিভাগ প্রয়োজন')
        .max(50, 'বিভাগের নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    postalCode: z
        .string()
        .min(1, 'পোস্টাল কোড প্রয়োজন')
        .regex(/^\d{4}$/, 'পোস্টাল কোড ৪ সংখ্যার হতে হবে'),
    country: z
        .string()
        .min(1, 'দেশ প্রয়োজন')
        .default('Bangladesh'),
});

// Export types
export type AdminUserFormData = z.infer<typeof adminUserSchema>;
export type CreateAdminUserFormData = z.infer<typeof createAdminUserSchema>;
export type UpdateAdminUserFormData = z.infer<typeof updateAdminUserSchema>;
export type SystemSettingsFormData = z.infer<typeof systemSettingsSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
export type ImageUploadFormData = z.infer<typeof imageUploadSchema>;
export type VideoUploadFormData = z.infer<typeof videoUploadSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;