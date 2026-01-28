// Common Types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'admin';
    avatar?: string;
    phone?: string;
    address?: string;
}

export interface Subject {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    image: string;
    totalChapters: number;
    createdAt: string;
}

export interface Chapter {
    id: string;
    subjectId: string;
    name: string;
    nameEn: string;
    description: string;
    order: number;
    mcqCount: number;
    hasVideo: boolean;
    hasPdf: boolean;
    createdAt: string;
}

export interface MCQ {
    id: string;
    chapterId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    difficulty: 'easy' | 'medium' | 'hard';
    createdAt: string;
}

export interface VideoClass {
    id: string;
    chapterId: string;
    title: string;
    titleEn: string;
    description: string;
    videoUrl: string;
    duration: string; // in minutes
    thumbnail: string;
    instructor: string;
    createdAt: string;
}

export interface PDFNote {
    id: string;
    chapterId: string;
    title: string;
    titleEn: string;
    description: string;
    fileUrl: string;
    fileSize: string; // in MB
    pages: number;
    createdAt: string;
}

export interface Course {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    image: string;
    price: number;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    features: string[];
    isPopular: boolean;
    createdAt: string;
}

export interface Club {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    image: string;
    activities: string[];
    notices: Notice[];
    gallery: GalleryItem[];
    createdAt: string;
}

export interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    isImportant: boolean;
}

export interface GalleryItem {
    id: string;
    type: 'photo' | 'video';
    url: string;
    title: string;
    description?: string;
    createdAt: string;
}

export interface Teacher {
    id: string;
    name: string;
    nameEn: string;
    designation: string;
    bio: string;
    image: string;
    subjects: string[];
    experience: number;
    education: string[];
    createdAt: string;
}

export interface Article {
    id: string;
    title: string;
    titleEn: string;
    content: string;
    excerpt: string;
    image: string;
    author: string;
    tags: string[];
    publishedAt: string;
    isPublished: boolean;
}

export interface Feedback {
    id: string;
    name: string;
    email: string;
    type: 'student' | 'guardian';
    message: string;
    rating: number;
    images?: string[];
    createdAt: string;
    isApproved: boolean;
}

export interface Member {
    id: string;
    name: string;
    nameEn: string;
    type: 'shareholder' | 'silver';
    image: string;
    designation?: string;
    bio?: string;
    joinedAt: string;
}