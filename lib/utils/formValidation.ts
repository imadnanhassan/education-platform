
import {  FieldValues } from 'react-hook-form';




// Error message formatter for Bengali localization
export function formatErrorMessage(error: string): string {
    // Common error message translations
    const errorTranslations: Record<string, string> = {
        'Required': 'প্রয়োজন',
        'Invalid email': 'সঠিক ইমেইল ঠিকানা লিখুন',
        'Invalid URL': 'সঠিক URL প্রদান করুন',
        'Too short': 'খুব ছোট',
        'Too long': 'খুব বড়',
        'Invalid format': 'সঠিক ফরম্যাট ব্যবহার করুন',
        'Invalid phone number': 'সঠিক ফোন নম্বর লিখুন',
        'Passwords do not match': 'পাসওয়ার্ড মিল নেই',
        'File too large': 'ফাইলের আকার খুব বড়',
        'Invalid file type': 'অনুমোদিত ফাইল ফরম্যাট নয়',
    };

    return errorTranslations[error] || error;
}



// Form data sanitizer
export function sanitizeFormData<T extends FieldValues>(data: T): T {
    const sanitized = { ...data };
    
    // Remove empty strings and convert to undefined for optional fields
    Object.keys(sanitized).forEach(key => {
        const value = sanitized[key as keyof T];
        if (typeof value === 'string' && value.trim() === '') {
            sanitized[key as keyof T] = undefined as any;
        }
    });
    
    return sanitized;
}

// File validation helper
export function validateFile(
    file: File,
    maxSize: number = 10 * 1024 * 1024, // 10MB default
    allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
): { isValid: boolean; error?: string } {
    if (file.size > maxSize) {
        return {
            isValid: false,
            error: `ফাইলের আকার ${Math.round(maxSize / (1024 * 1024))} MB এর বেশি হতে পারবে না`
        };
    }
    
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: 'অনুমোদিত ফাইল ফরম্যাট নয়'
        };
    }
    
    return { isValid: true };
}

export function validateImage(file: File): Promise<{ isValid: boolean; error?: string; dimensions?: { width: number; height: number } }> {
    return new Promise((resolve) => {
        if (!file.type.startsWith('image/')) {
            resolve({ isValid: false, error: 'ফাইলটি একটি ছবি নয়' });
            return;
        }
        
        const img = new Image();
        const url = URL.createObjectURL(file);
        
        img.onload = () => {
            URL.revokeObjectURL(url);
            
            if (img.width < 100 || img.height < 100) {
                resolve({
                    isValid: false,
                    error: 'ছবির আকার কমপক্ষে ১০০x১০০ পিক্সেল হতে হবে'
                });
                return;
            }
            
            if (img.width > 5000 || img.height > 5000) {
                resolve({
                    isValid: false,
                    error: 'ছবির আকার সর্বোচ্চ ৫০০০x৫০০০ পিক্সেল হতে পারে'
                });
                return;
            }
            
            resolve({
                isValid: true,
                dimensions: { width: img.width, height: img.height }
            });
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve({ isValid: false, error: 'ছবি লোড করতে সমস্যা হয়েছে' });
        };
        
        img.src = url;
    });
}

export function formatPhoneNumber(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    
    if (digits.startsWith('880')) {
        return `+${digits}`;
    } else if (digits.startsWith('01')) {
        return `+880${digits.substring(1)}`;
    } else if (digits.length === 10 && digits.startsWith('1')) {
        return `+880${digits}`;
    }
    
    return phone;
}

export function validateDateRange(startDate: string, endDate: string): { isValid: boolean; error?: string } {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return { isValid: false, error: 'সঠিক তারিখ প্রদান করুন' };
    }
    
    if (start > end) {
        return { isValid: false, error: 'শুরুর তারিখ শেষের তারিখের পরে হতে পারে না' };
    }
    
    return { isValid: true };
}

export function validateAge(dateOfBirth: string, minAge: number = 5, maxAge: number = 100): { isValid: boolean; error?: string; age?: number } {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) {
        return { isValid: false, error: 'সঠিক জন্ম তারিখ প্রদান করুন' };
    }
    
    if (birthDate > today) {
        return { isValid: false, error: 'জন্ম তারিখ ভবিষ্যতের হতে পারে না' };
    }
    
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        const actualAge = age - 1;
        
        if (actualAge < minAge || actualAge > maxAge) {
            return {
                isValid: false,
                error: `বয়স ${minAge} থেকে ${maxAge} বছরের মধ্যে হতে হবে`,
                age: actualAge
            };
        }
        
        return { isValid: true, age: actualAge };
    }
    
    if (age < minAge || age > maxAge) {
        return {
            isValid: false,
            error: `বয়স ${minAge} থেকে ${maxAge} বছরের মধ্যে হতে হবে`,
            age
        };
    }
    
    return { isValid: true, age };
}

export function validatePasswordStrength(password: string): { 
    isValid: boolean; 
    score: number; 
    feedback: string[];
    requirements: { met: boolean; text: string }[];
} {
    const requirements = [
        { regex: /.{8,}/, text: 'কমপক্ষে ৮ অক্ষর' },
        { regex: /[a-z]/, text: 'একটি ছোট হাতের অক্ষর' },
        { regex: /[A-Z]/, text: 'একটি বড় হাতের অক্ষর' },
        { regex: /\d/, text: 'একটি সংখ্যা' },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, text: 'একটি বিশেষ চিহ্ন' },
    ];
    
    const metRequirements = requirements.map(req => ({
        met: req.regex.test(password),
        text: req.text
    }));
    
    const score = metRequirements.filter(req => req.met).length;
    const feedback: string[] = [];
    
    if (score < 3) {
        feedback.push('পাসওয়ার্ড খুবই দুর্বল');
    } else if (score < 4) {
        feedback.push('পাসওয়ার্ড দুর্বল');
    } else if (score < 5) {
        feedback.push('পাসওয়ার্ড মধ্যম');
    } else {
        feedback.push('পাসওয়ার্ড শক্তিশালী');
    }
    
    return {
        isValid: score >= 4,
        score,
        feedback,
        requirements: metRequirements
    };
}

export async function handleFormSubmission<T extends FieldValues>(
    data: T,
    submitFn: (data: T) => Promise<any>,
    options?: {
        onSuccess?: (result: any) => void;
        onError?: (error: any) => void;
        sanitize?: boolean;
    }
): Promise<{ success: boolean; result?: any; error?: any }> {
    try {
        const processedData = options?.sanitize ? sanitizeFormData(data) : data;
        const result = await submitFn(processedData);
        
        if (options?.onSuccess) {
            options.onSuccess(result);
        }
        
        return { success: true, result };
    } catch (error) {
        if (options?.onError) {
            options.onError(error);
        }
        
        return { success: false, error };
    }
}

export const validationPatterns = {
    phone: /^(\+8801|01)[3-9]\d{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    studentId: /^GA\d{7}$/,
    employeeId: /^GA-T-\d{3}$/,
    applicationId: /^ADM\d{7}$/,
    url: /^https?:\/\/.+/,
    postalCode: /^\d{4}$/,
    year: /^\d{4}$/,
};

// Export validation messages in Bengali
export const validationMessages = {
    required: 'এই ক্ষেত্রটি প্রয়োজন',
    email: 'সঠিক ইমেইল ঠিকানা লিখুন',
    phone: 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন',
    url: 'সঠিক URL প্রদান করুন',
    minLength: (min: number) => `কমপক্ষে ${min} অক্ষরের হতে হবে`,
    maxLength: (max: number) => `সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    min: (min: number) => `কমপক্ষে ${min} হতে হবে`,
    max: (max: number) => `সর্বোচ্চ ${max} হতে পারে`,
    passwordMismatch: 'পাসওয়ার্ড মিল নেই',
    invalidFormat: 'সঠিক ফরম্যাট ব্যবহার করুন',
    fileTooLarge: 'ফাইলের আকার খুব বড়',
    invalidFileType: 'অনুমোদিত ফাইল ফরম্যাট নয়',
};