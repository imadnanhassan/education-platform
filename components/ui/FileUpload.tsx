'use client';

import React, { useCallback, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/utils/cn';
import { validateFile, validateImage } from '@/lib/utils/formValidation';

interface FileUploadProps {
    name: string;
    label: string;
    accept?: string;
    multiple?: boolean;
    maxSize?: number; // in bytes
    maxFiles?: number;
    allowedTypes?: string[];
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    preview?: boolean;
    onFileSelect?: (files: File[]) => void;
}

export function FileUpload({
    name,
    label,
    accept = 'image/*',
    multiple = false,
    maxSize = 10 * 1024 * 1024, // 10MB
    maxFiles = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    description,
    required = false,
    disabled = false,
    className,
    preview = true,
    onFileSelect,
}: FileUploadProps) {
    const {
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});

    const currentFiles = watch(name) || [];
    const error = errors[name];
    const hasError = !!error;

    const handleFiles = useCallback(async (files: FileList | File[]) => {
        const fileArray = Array.from(files);
        const validFiles: File[] = [];
        const errors: string[] = [];

        for (const file of fileArray) {
            const validation = validateFile(file, maxSize, allowedTypes);
            if (validation.isValid) {
                validFiles.push(file);
                
                // Generate preview for images
                if (preview && file.type.startsWith('image/')) {
                    const imageValidation = await validateImage(file);
                    if (imageValidation.isValid) {
                        const url = URL.createObjectURL(file);
                        setPreviews(prev => ({ ...prev, [file.name]: url }));
                    }
                }
            } else {
                errors.push(`${file.name}: ${validation.error}`);
            }
        }

        if (errors.length > 0) {
            // Handle validation errors
            console.error('File validation errors:', errors);
        }

        const newFiles = multiple ? [...currentFiles, ...validFiles] : validFiles;
        const limitedFiles = newFiles.slice(0, maxFiles);

        setValue(name, limitedFiles, { shouldValidate: true });
        
        if (onFileSelect) {
            onFileSelect(limitedFiles);
        }
    }, [name, setValue, currentFiles, multiple, maxSize, allowedTypes, maxFiles, preview, onFileSelect]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (disabled) return;
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    }, [handleFiles, disabled]);

    const removeFile = useCallback((index: number) => {
        const newFiles = currentFiles.filter((_: any, i: number) => i !== index);
        setValue(name, newFiles, { shouldValidate: true });
        
        // Clean up preview URL
        const removedFile = currentFiles[index];
        if (removedFile && previews[removedFile.name]) {
            URL.revokeObjectURL(previews[removedFile.name]);
            setPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[removedFile.name];
                return newPreviews;
            });
        }
    }, [currentFiles, name, setValue, previews]);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={cn('space-y-2', className)}>
            <label
                className={cn(
                    'block text-sm font-medium text-gray-700 dark:text-gray-300',
                    required && "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
            >
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="space-y-4">
                        {/* Upload Area */}
                        <div
                            className={cn(
                                'relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200',
                                'hover:border-emerald-400 dark:hover:border-emerald-500',
                                dragActive && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
                                hasError && 'border-red-300 dark:border-red-600',
                                disabled && 'opacity-50 cursor-not-allowed',
                                !dragActive && !hasError && 'border-gray-300 dark:border-gray-600'
                            )}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="mt-4">
                                    <label
                                        htmlFor={`${name}-file-upload`}
                                        className={cn(
                                            'cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500',
                                            'focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2',
                                            disabled && 'cursor-not-allowed'
                                        )}
                                    >
                                        <span>ফাইল আপলোড করুন</span>
                                        <input
                                            id={`${name}-file-upload`}
                                            type="file"
                                            className="sr-only"
                                            accept={accept}
                                            multiple={multiple}
                                            disabled={disabled}
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    handleFiles(e.target.files);
                                                }
                                            }}
                                        />
                                    </label>
                                    <p className="pl-1 text-gray-500 dark:text-gray-400">অথবা ড্র্যাগ করে ছেড়ে দিন</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    {allowedTypes.includes('image/jpeg') && 'JPG, '}
                                    {allowedTypes.includes('image/png') && 'PNG, '}
                                    {allowedTypes.includes('image/gif') && 'GIF, '}
                                    {allowedTypes.includes('application/pdf') && 'PDF, '}
                                    সর্বোচ্চ {formatFileSize(maxSize)}
                                </p>
                            </div>
                        </div>

                        {/* File List */}
                        {currentFiles.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    নির্বাচিত ফাইল ({currentFiles.length})
                                </h4>
                                <div className="space-y-2">
                                    {currentFiles.map((file: File, index: number) => (
                                        <div
                                            key={`${file.name}-${index}`}
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                        >
                                            <div className="flex items-center space-x-3">
                                                {preview && previews[file.name] && (
                                                    <img
                                                        src={previews[file.name]}
                                                        alt={file.name}
                                                        className="h-10 w-10 object-cover rounded"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                disabled={disabled}
                                                className={cn(
                                                    'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300',
                                                    'disabled:opacity-50 disabled:cursor-not-allowed'
                                                )}
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            />

            {description && !hasError && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}

interface ImageUploadProps {
    name: string;
    label: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    aspectRatio?: 'square' | '16:9' | '4:3' | 'free';
    maxSize?: number;
}

export function ImageUpload({
    name,
    label,
    description,
    required = false,
    disabled = false,
    className,
    aspectRatio = 'free',
    maxSize = 5 * 1024 * 1024, // 5MB
}: ImageUploadProps) {
    const {
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const [preview, setPreview] = useState<string | null>(null);
    const currentValue = watch(name);
    const error = errors[name];
    const hasError = !!error;

    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validation = await validateImage(file);
        if (!validation.isValid) {
            console.error('Image validation error:', validation.error);
            return;
        }

        setValue(name, file, { shouldValidate: true });
        
        // Create preview
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, [name, setValue]);

    const removeImage = useCallback(() => {
        setValue(name, null, { shouldValidate: true });
        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    }, [name, setValue, preview]);

    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case 'square': return 'aspect-square';
            case '16:9': return 'aspect-video';
            case '4:3': return 'aspect-[4/3]';
            default: return 'aspect-video';
        }
    };

    return (
        <div className={cn('space-y-2', className)}>
            <label
                className={cn(
                    'block text-sm font-medium text-gray-700 dark:text-gray-300',
                    required && "after:content-['*'] after:ml-0.5 after:text-red-500"
                )}
            >
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="space-y-4">
                        {/* Upload Area */}
                        <div
                            className={cn(
                                'relative border-2 border-dashed rounded-lg overflow-hidden transition-colors duration-200',
                                'hover:border-emerald-400 dark:hover:border-emerald-500',
                                hasError && 'border-red-300 dark:border-red-600',
                                disabled && 'opacity-50 cursor-not-allowed',
                                !hasError && 'border-gray-300 dark:border-gray-600',
                                getAspectRatioClass()
                            )}
                        >
                            {(preview || currentValue) ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={preview || (typeof currentValue === 'string' ? currentValue : '')}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <div className="flex space-x-2">
                                            <label
                                                htmlFor={`${name}-image-upload`}
                                                className="px-3 py-1 bg-white text-gray-900 rounded text-sm cursor-pointer hover:bg-gray-100"
                                            >
                                                পরিবর্তন
                                            </label>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                                            >
                                                মুছুন
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full p-6">
                                    <div className="text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="mt-4">
                                            <label
                                                htmlFor={`${name}-image-upload`}
                                                className={cn(
                                                    'cursor-pointer rounded-md font-medium text-emerald-600 hover:text-emerald-500',
                                                    disabled && 'cursor-not-allowed'
                                                )}
                                            >
                                                ছবি নির্বাচন করুন
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            JPG, PNG, GIF সর্বোচ্চ {Math.round(maxSize / (1024 * 1024))}MB
                                        </p>
                                    </div>
                                </div>
                            )}

                            <input
                                id={`${name}-image-upload`}
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                disabled={disabled}
                                onChange={handleFileSelect}
                            />
                        </div>
                    </div>
                )}
            />

            {description && !hasError && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}

            {hasError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error?.message as string}
                </p>
            )}
        </div>
    );
}