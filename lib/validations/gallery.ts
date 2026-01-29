import { z } from 'zod';

// Common validation patterns
const urlRegex = /^https?:\/\/.+/;

// Media Metadata Schema
export const mediaMetadataSchema = z.object({
    size: z
        .number()
        .min(1, 'ফাইলের আকার প্রয়োজন')
        .max(100 * 1024 * 1024, 'ফাইলের আকার ১০০ MB এর বেশি হতে পারবে না'),
    dimensions: z.object({
        width: z
            .number()
            .min(1, 'প্রস্থ কমপক্ষে ১ পিক্সেল হতে হবে')
            .max(10000, 'প্রস্থ সর্বোচ্চ ১০,০০০ পিক্সেল হতে পারে'),
        height: z
            .number()
            .min(1, 'উচ্চতা কমপক্ষে ১ পিক্সেল হতে হবে')
            .max(10000, 'উচ্চতা সর্বোচ্চ ১০,০০০ পিক্সেল হতে পারে'),
    }).optional(),
    duration: z
        .number()
        .min(1, 'সময়কাল কমপক্ষে ১ সেকেন্ড হতে হবে')
        .max(7200, 'সময়কাল সর্বোচ্চ ২ ঘন্টা হতে পারে')
        .optional(),
    format: z
        .string()
        .min(1, 'ফাইল ফরম্যাট প্রয়োজন')
        .max(20, 'ফাইল ফরম্যাট সর্বোচ্চ ২০ অক্ষরের হতে পারে'),
    colorSpace: z
        .string()
        .max(20, 'কালার স্পেস সর্বোচ্চ ২০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    compression: z
        .string()
        .max(20, 'কম্প্রেশন সর্বোচ্চ ২০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Gallery Item Schema
export const galleryItemSchema = z.object({
    title: z
        .string()
        .min(1, 'শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    titleEn: z
        .string()
        .min(1, 'ইংরেজি শিরোনাম প্রয়োজন')
        .max(200, 'ইংরেজি শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    type: z
        .enum(['photo', 'video'], {
             message: 'মিডিয়ার ধরন নির্বাচন করুন'
        }),
    url: z
        .string()
        .min(1, 'ফাইলের URL প্রয়োজন')
        .url('সঠিক URL প্রদান করুন')
        .regex(urlRegex, 'URL https:// বা http:// দিয়ে শুরু হতে হবে'),
    thumbnail: z
        .string()
        .url('সঠিক থাম্বনেইল URL প্রদান করুন')
        .optional()
        .or(z.literal('')),
    category: z
        .enum(['general', 'events', 'clubs', 'achievements', 'campus', 'students', 'teachers'], {
            message: 'ক্যাটেগরি নির্বাচন করুন'
        }),
    tags: z
        .array(z.string())
        .max(20, 'সর্বোচ্চ ২০টি ট্যাগ যোগ করা যাবে')
        .default([])
        .refine((tags) => {
            return tags.every(tag => tag.length <= 50);
        }, 'প্রতিটি ট্যাগ সর্বোচ্চ ৫০ অক্ষরের হতে পারে'),
    albumId: z
        .string()
        .optional()
        .or(z.literal('')),
    clubId: z
        .string()
        .optional()
        .or(z.literal('')),
    eventId: z
        .string()
        .optional()
        .or(z.literal('')),
    isPublic: z
        .boolean()
        .default(true),
    isFeatured: z
        .boolean()
        .default(false),
    allowDownload: z
        .boolean()
        .default(true),
    allowComments: z
        .boolean()
        .default(true),
    metadata: mediaMetadataSchema,
    capturedDate: z
        .string()
        .optional()
        .or(z.literal('')),
    location: z
        .string()
        .max(200, 'অবস্থান সর্বোচ্চ ২০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    photographer: z
        .string()
        .max(100, 'ফটোগ্রাফারের নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    copyright: z
        .string()
        .max(200, 'কপিরাইট তথ্য সর্বোচ্চ ২০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    altText: z
        .string()
        .max(500, 'বিকল্প টেক্সট সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Album Schema
export const albumSchema = z.object({
    title: z
        .string()
        .min(1, 'অ্যালবামের শিরোনাম প্রয়োজন')
        .max(200, 'শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    titleEn: z
        .string()
        .min(1, 'ইংরেজি শিরোনাম প্রয়োজন')
        .max(200, 'ইংরেজি শিরোনাম সর্বোচ্চ ২০০ অক্ষরের হতে পারে'),
    description: z
        .string()
        .max(1000, 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    cover: z
        .string()
        .min(1, 'কভার ছবি প্রয়োজন')
        .url('সঠিক কভার ছবির URL প্রদান করুন'),
    category: z
        .enum(['general', 'events', 'clubs', 'achievements', 'campus', 'students', 'teachers'], {
           message: 'ক্যাটেগরি নির্বাচন করুন' 
        }),
    tags: z
        .array(z.string())
        .max(15, 'সর্বোচ্চ ১৫টি ট্যাগ যোগ করা যাবে')
        .default([]),
    isPublic: z
        .boolean()
        .default(true),
    isFeatured: z
        .boolean()
        .default(false),
    allowContributions: z
        .boolean()
        .default(false),
    maxItems: z
        .number()
        .min(1, 'সর্বোচ্চ আইটেম সংখ্যা কমপক্ষে ১ হতে হবে')
        .max(1000, 'সর্বোচ্চ আইটেম সংখ্যা ১০০০ এর বেশি হতে পারে না')
        .optional(),
    sortOrder: z
        .enum(['date_asc', 'date_desc', 'title_asc', 'title_desc', 'manual'], {
           message: 'সাজানোর ক্রম নির্বাচন করুন'
        })
        .default('date_desc'),
    clubId: z
        .string()
        .optional()
        .or(z.literal('')),
    eventId: z
        .string()
        .optional()
        .or(z.literal('')),
});

// Gallery Filter Schema
export const galleryFilterSchema = z.object({
    search: z
        .string()
        .max(100, 'অনুসন্ধান সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    type: z
        .enum(['all', 'photo', 'video'], {
            message: 'মিডিয়ার ধরন নির্বাচন করুন'
        })
        .default('all'),
    category: z
        .enum(['all', 'general', 'events', 'clubs', 'achievements', 'campus', 'students', 'teachers'], {
            message: 'ক্যাটেগরি নির্বাচন করুন' 
        })
        .default('all'),
    albumId: z
        .string()
        .optional()
        .or(z.literal('')),
    clubId: z
        .string()
        .optional()
        .or(z.literal('')),
    isPublic: z
        .enum(['all', 'public', 'private'], {
            message: 'দৃশ্যমানতা নির্বাচন করুন' 
        })
        .default('all'),
    isFeatured: z
        .enum(['all', 'featured', 'not_featured'], {
           message: 'ফিচার অবস্থা নির্বাচন করুন'
        })
        .default('all'),
    tags: z
        .array(z.string())
        .max(10, 'সর্বোচ্চ ১০টি ট্যাগ ফিল্টার করা যাবে')
        .default([]),
    uploadDateFrom: z
        .string()
        .optional()
        .or(z.literal('')),
    uploadDateTo: z
        .string()
        .optional()
        .or(z.literal('')),
    capturedDateFrom: z
        .string()
        .optional()
        .or(z.literal('')),
    capturedDateTo: z
        .string()
        .optional()
        .or(z.literal('')),
    uploadedBy: z
        .string()
        .optional()
        .or(z.literal('')),
    sortBy: z
        .enum(['createdAt', 'title', 'capturedDate', 'size', 'views'], {
            message: 'সাজানোর ক্ষেত্র নির্বাচন করুন'
        })
        .default('createdAt'),
    sortOrder: z
        .enum(['asc', 'desc'], {
            message: 'সাজানোর ক্রম নির্বাচন করুন'
        })
        .default('desc'),
});

// Bulk Gallery Operations Schema
export const bulkGalleryOperationSchema = z.object({
    itemIds: z
        .array(z.string())
        .min(1, 'অন্তত একটি আইটেম নির্বাচন করুন'),
    operation: z
        .enum(['delete', 'make_public', 'make_private', 'feature', 'unfeature', 'move_to_album', 'add_tags', 'remove_tags'], {
            message: 'অপারেশন নির্বাচন করুন'
        }),
    targetAlbumId: z
        .string()
        .optional()
        .or(z.literal('')),
    tags: z
        .array(z.string())
        .max(20, 'সর্বোচ্চ ২০টি ট্যাগ যোগ করা যাবে')
        .default([]),
    reason: z
        .string()
        .max(500, 'কারণ সর্বোচ্চ ৫০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Media Upload Schema
export const mediaUploadSchema = z.object({
    files: z
        .array(z.instanceof(File))
        .min(1, 'অন্তত একটি ফাইল নির্বাচন করুন')
        .max(20, 'সর্বোচ্চ ২০টি ফাইল একসাথে আপলোড করা যাবে')
        .refine((files) => {
            return files.every(file => file.size <= 100 * 1024 * 1024);
        }, 'প্রতিটি ফাইলের আকার ১০০ MB এর বেশি হতে পারবে না')
        .refine((files) => {
            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
                'video/mp4',
                'video/webm',
                'video/ogg'
            ];
            return files.every(file => allowedTypes.includes(file.type));
        }, 'অনুমোদিত ফাইল ফরম্যাট: JPG, PNG, GIF, WebP, MP4, WebM, OGG'),
    albumId: z
        .string()
        .optional()
        .or(z.literal('')),
    category: z
        .enum(['general', 'events', 'clubs', 'achievements', 'campus', 'students', 'teachers'], {
            message: 'ক্যাটেগরি নির্বাচন করুন'
        })
        .default('general'),
    tags: z
        .array(z.string())
        .max(20, 'সর্বোচ্চ ২০টি ট্যাগ যোগ করা যাবে')
        .default([]),
    isPublic: z
        .boolean()
        .default(true),
    clubId: z
        .string()
        .optional()
        .or(z.literal('')),
    eventId: z
        .string()
        .optional()
        .or(z.literal('')),
    location: z
        .string()
        .max(200, 'অবস্থান সর্বোচ্চ ২০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    photographer: z
        .string()
        .max(100, 'ফটোগ্রাফারের নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
});

// Gallery Settings Schema
export const gallerySettingsSchema = z.object({
    maxFileSize: z
        .number()
        .min(1, 'সর্বোচ্চ ফাইল সাইজ কমপক্ষে ১ MB হতে হবে')
        .max(500, 'সর্বোচ্চ ফাইল সাইজ ৫০০ MB এর বেশি হতে পারে না')
        .default(100),
    allowedImageFormats: z
        .array(z.string())
        .min(1, 'অন্তত একটি ছবির ফরম্যাট অনুমোদিত হতে হবে')
        .default(['jpeg', 'jpg', 'png', 'gif', 'webp']),
    allowedVideoFormats: z
        .array(z.string())
        .min(1, 'অন্তত একটি ভিডিও ফরম্যাট অনুমোদিত হতে হবে')
        .default(['mp4', 'webm', 'ogg']),
    thumbnailSize: z
        .number()
        .min(100, 'থাম্বনেইল সাইজ কমপক্ষে ১০০ পিক্সেল হতে হবে')
        .max(1000, 'থাম্বনেইল সাইজ সর্বোচ্চ ১০০০ পিক্সেল হতে পারে')
        .default(300),
    watermarkEnabled: z
        .boolean()
        .default(false),
    watermarkText: z
        .string()
        .max(100, 'ওয়াটারমার্ক টেক্সট সর্বোচ্চ ১০০ অক্ষরের হতে পারে')
        .optional()
        .or(z.literal('')),
    autoGenerateThumbnails: z
        .boolean()
        .default(true),
    enableGeotagging: z
        .boolean()
        .default(false),
    defaultVisibility: z
        .enum(['public', 'private'], {
            message: 'ডিফল্ট দৃশ্যমানতা নির্বাচন করুন'
        })
        .default('public'),
});

// Create and Update Schemas
export const createGalleryItemSchema = galleryItemSchema.omit({ metadata: true });
export const updateGalleryItemSchema = galleryItemSchema.partial().extend({
    id: z.string().min(1, 'গ্যালারি আইটেম আইডি প্রয়োজন')
});

export const createAlbumSchema = albumSchema;
export const updateAlbumSchema = albumSchema.partial().extend({
    id: z.string().min(1, 'অ্যালবাম আইডি প্রয়োজন')
});

// Export types
export type GalleryItemFormData = z.infer<typeof galleryItemSchema>;
export type CreateGalleryItemFormData = z.infer<typeof createGalleryItemSchema>;
export type UpdateGalleryItemFormData = z.infer<typeof updateGalleryItemSchema>;
export type AlbumFormData = z.infer<typeof albumSchema>;
export type CreateAlbumFormData = z.infer<typeof createAlbumSchema>;
export type UpdateAlbumFormData = z.infer<typeof updateAlbumSchema>;
export type MediaMetadataFormData = z.infer<typeof mediaMetadataSchema>;
export type GalleryFilterFormData = z.infer<typeof galleryFilterSchema>;
export type BulkGalleryOperationFormData = z.infer<typeof bulkGalleryOperationSchema>;
export type MediaUploadFormData = z.infer<typeof mediaUploadSchema>;
export type GallerySettingsFormData = z.infer<typeof gallerySettingsSchema>;