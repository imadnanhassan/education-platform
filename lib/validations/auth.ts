import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'ইমেইল প্রয়োজন')
        .email('সঠিক ইমেইল ঠিকানা লিখুন'),
    password: z
        .string()
        .min(1, 'পাসওয়ার্ড প্রয়োজন')
        .min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
    rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
    firstName: z
        .string()
        .min(1, 'নাম প্রয়োজন')
        .min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে'),
    lastName: z
        .string()
        .min(1, 'পদবি প্রয়োজন')
        .min(2, 'পদবি কমপক্ষে ২ অক্ষরের হতে হবে'),
    email: z
        .string()
        .min(1, 'ইমেইল প্রয়োজন')
        .email('সঠিক ইমেইল ঠিকানা লিখুন'),
    phone: z
        .string()
        .min(1, 'ফোন নম্বর প্রয়োজন')
        .regex(/^(\+8801|01)[3-9]\d{8}$/, 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন'),
    password: z
        .string()
        .min(1, 'পাসওয়ার্ড প্রয়োজন')
        .min(8, 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'পাসওয়ার্ডে অন্তত একটি ছোট হাতের অক্ষর, একটি বড় হাতের অক্ষর এবং একটি সংখ্যা থাকতে হবে'),
    confirmPassword: z
        .string()
        .min(1, 'পাসওয়ার্ড নিশ্চিতকরণ প্রয়োজন'),
    dateOfBirth: z
        .string()
        .min(1, 'জন্ম তারিখ প্রয়োজন'),
    gender: z
        .enum(['male', 'female', 'other'])
        .refine((val) => val !== undefined, {
            message: 'লিঙ্গ নির্বাচন করুন',
        }),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, {
            message: 'শর্তাবলী গ্রহণ করতে হবে',
        }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'পাসওয়ার্ড মিল নেই',
    path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'ইমেইল প্রয়োজন')
        .email('সঠিক ইমেইল ঠিকানা লিখুন'),
});

export const resetPasswordSchema = z.object({
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

export const otpSchema = z.object({
    otp: z
        .string()
        .min(1, 'OTP প্রয়োজন')
        .length(6, 'OTP ৬ সংখ্যার হতে হবে')
        .regex(/^\d+$/, 'শুধুমাত্র সংখ্যা লিখুন'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;