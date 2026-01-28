// Home Page Types
export interface Service {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  features: string[];
  link: string;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  message: string;
  messageEn: string;
  rating: number;
  image: string;
  course: string;
  year: number;
}

export interface Teacher {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  subjects: string[];
  experience: number;
  education: string[];
  image: string;
  rating: number;
  studentsCount: number;
}

export interface OnlineBatch {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  schedule: string;
  duration: string;
  students: number;
  teacher: string;
  features: string[];
  price: number;
  startDate: string;
}

export interface AdmissionStep {
  id: string;
  step: number;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  requirements?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEn: string;
  image: string;
  category: 'campus' | 'events' | 'activities' | 'achievements';
  date: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: 'announcement' | 'event' | 'notice' | 'blog';
  author: string;
}

export interface ContactInfo {
  address: string;
  addressEn: string;
  phone: string[];
  email: string[];
  hours: string;
  hoursEn: string;
  socialMedia: {
    facebook: string;
    youtube: string;
    instagram: string;
    linkedin: string;
  };
}

export interface AboutInfo {
  mission: string;
  missionEn: string;
  vision: string;
  visionEn: string;
  description: string;
  descriptionEn: string;
  established: number;
  achievements: {
    students: number;
    courses: number;
    successRate: number;
    experience: number;
  };
  founderMessage: {
    name: string;
    designation: string;
    message: string;
    image: string;
  };
}

export interface Feature {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  stats?: {
    value: string;
    label: string;
  };
}