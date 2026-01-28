import { 
  Service, 
  Course, 
  Testimonial, 
  Teacher, 
  OnlineBatch, 
  AdmissionStep, 
  GalleryItem, 
  NewsUpdate, 
  ContactInfo, 
  AboutInfo, 
  Feature 
} from '@/types/home';

// About Information
export const aboutInfo: AboutInfo = {
  mission: "প্রতিটি শিক্ষার্থীর মধ্যে লুকিয়ে থাকা প্রতিভা বিকশিত করে তাদের স্বপ্নের গন্তব্যে পৌঁছে দেওয়া।",
  missionEn: "To develop the hidden talents of every student and help them reach their dream destination.",
  vision: "বাংলাদেশের শিক্ষা ক্ষেত্রে একটি বিপ্লব আনয়ন করে বিশ্বমানের শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া।",
  visionEn: "To become a world-class educational institution by bringing a revolution in Bangladesh's education sector.",
  description: "গ্র্যাভিটন একাডেমি একটি আধুনিক শিক্ষা প্রতিষ্ঠান যেখানে ঐতিহ্যবাহী শিক্ষা পদ্ধতির সাথে আধুনিক প্রযুক্তির সমন্বয় ঘটিয়ে শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষা প্রদান করা হয়।",
  descriptionEn: "Graviton Academy is a modern educational institution that provides the highest quality education by combining traditional teaching methods with modern technology.",
  established: 2019,
  achievements: {
    students: 1200,
    courses: 50,
    successRate: 98,
    experience: 5
  },
  founderMessage: {
    name: "ড. মোহাম্মদ রহিম উদ্দিন",
    designation: "প্রতিষ্ঠাতা ও পরিচালক",
    message: "শিক্ষাই জাতির মেরুদণ্ড। আমাদের লক্ষ্য প্রতিটি শিক্ষার্থীকে তার সর্বোচ্চ সম্ভাবনা অর্জনে সহায়তা করা।",
    image: "/assets/images/profile-34.jpeg"
  }
};

// Services Data
export const servicesData: Service[] = [
  {
    id: "made-easy",
    title: "Made Easy সিস্টেম",
    titleEn: "Made Easy System",
    description: "জটিল বিষয়গুলো সহজ করে শেখানোর বিশেষ পদ্ধতি",
    descriptionEn: "Special method of teaching complex subjects in an easy way",
    icon: "book",
    features: [
      "বিষয়ভিত্তিক সহজ পদ্ধতি",
      "ইন্টারেক্টিভ লার্নিং",
      "প্র্যাকটিক্যাল এপ্রোচ",
      "রেগুলার অ্যাসেসমেন্ট"
    ],
    link: "/made-easy",
    color: "emerald"
  },
  {
    id: "fly-abroad",
    title: "বিদেশে পড়াশোনা",
    titleEn: "Study Abroad",
    description: "SAT, IELTS, অলিম্পিয়াড এবং স্কলারশিপ প্রস্তুতি",
    descriptionEn: "SAT, IELTS, Olympiad and Scholarship preparation",
    icon: "globe",
    features: [
      "SAT প্রস্তুতি",
      "IELTS কোর্স",
      "অলিম্পিয়াড ট্রেনিং",
      "স্কলারশিপ গাইডেন্স"
    ],
    link: "/fly-to-abroad",
    color: "green"
  },
  {
    id: "clubs",
    title: "ক্লাব ও কার্যক্রম",
    titleEn: "Clubs & Activities",
    description: "সহশিক্ষা কার্যক্রম ও দক্ষতা উন্নয়ন প্রোগ্রাম",
    descriptionEn: "Co-curricular activities and skill development programs",
    icon: "users",
    features: [
      "সায়েন্স ক্লাব",
      "ডিবেট ক্লাব",
      "কালচারাল প্রোগ্রাম",
      "স্পোর্টস এক্টিভিটি"
    ],
    link: "/clubs",
    color: "teal"
  },
  {
    id: "scholarship",
    title: "বৃত্তি প্রোগ্রাম",
    titleEn: "Scholarship Program",
    description: "মেধাবী শিক্ষার্থীদের জন্য বিশেষ বৃত্তি সুবিধা",
    descriptionEn: "Special scholarship facilities for meritorious students",
    icon: "award",
    features: [
      "মেধা বৃত্তি",
      "আর্থিক সহায়তা",
      "পারফরমেন্স বোনাস",
      "বিশেষ ছাড়"
    ],
    link: "/scholarship",
    color: "cyan"
  }
];

// Courses Data
export const coursesData: Course[] = [
  {
    id: "hsc-science",
    title: "এইচএসসি সাইন্স",
    titleEn: "HSC Science",
    description: "পদার্থ, রসায়ন, গণিত ও জীববিজ্ঞানের সম্পূর্ণ কোর্স",
    duration: "২ বছর",
    students: 150,
    rating: 4.9,
    price: 15000,
    image: "/assets/images/hero-education.jpg",
    category: "HSC",
    level: "intermediate",
    isPopular: true
  },
  {
    id: "ssc-general",
    title: "এসএসসি জেনারেল",
    titleEn: "SSC General",
    description: "সকল বিষয়ের সমন্বিত প্রস্তুতি কোর্স",
    duration: "১ বছর",
    students: 200,
    rating: 4.8,
    price: 12000,
    image: "/assets/images/hero-education.jpg",
    category: "SSC",
    level: "beginner",
    isPopular: true
  },
  {
    id: "ielts-preparation",
    title: "IELTS প্রস্তুতি",
    titleEn: "IELTS Preparation",
    description: "আন্তর্জাতিক মানের IELTS প্রস্তুতি কোর্স",
    duration: "৬ মাস",
    students: 80,
    rating: 4.7,
    price: 18000,
    image: "/assets/images/hero-education.jpg",
    category: "Language",
    level: "intermediate"
  },
  {
    id: "sat-math",
    title: "SAT ম্যাথ",
    titleEn: "SAT Math",
    description: "আমেরিকান বিশ্ববিদ্যালয় ভর্তি পরীক্ষার গণিত",
    duration: "৪ মাস",
    students: 45,
    rating: 4.9,
    price: 20000,
    image: "/assets/images/hero-education.jpg",
    category: "SAT",
    level: "advanced"
  }
];

// Testimonials Data
export const testimonialsData: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "সাকিব আল হাসান",
    nameEn: "Sakib Al Hasan",
    designation: "ঢাকা বিশ্ববিদ্যালয়ের শিক্ষার্থী",
    designationEn: "Student at Dhaka University",
    message: "গ্র্যাভিটন একাডেমির Made Easy পদ্ধতি আমার জীবন পরিবর্তন করে দিয়েছে। জটিল গণিত এখন আমার কাছে খুবই সহজ লাগে।",
    messageEn: "Graviton Academy's Made Easy method has changed my life. Complex mathematics now seems very easy to me.",
    rating: 5,
    image: "/assets/images/profile-16.jpeg",
    course: "HSC Science",
    year: 2023
  },
  {
    id: "testimonial-2",
    name: "ফাতিমা খাতুন",
    nameEn: "Fatima Khatun",
    designation: "IELTS স্কোর ৮.৫",
    designationEn: "IELTS Score 8.5",
    message: "IELTS কোর্সটি অসাধারণ ছিল। শিক্ষকদের গাইডেন্স এবং প্র্যাকটিস সেশন আমাকে টার্গেট স্কোর অর্জনে সাহায্য করেছে।",
    messageEn: "The IELTS course was excellent. Teachers' guidance and practice sessions helped me achieve my target score.",
    rating: 5,
    image: "/assets/images/user-profile.jpeg",
    course: "IELTS Preparation",
    year: 2023
  },
  {
    id: "testimonial-3",
    name: "রাহুল দাস",
    nameEn: "Rahul Das",
    designation: "MIT তে স্কলারশিপ প্রাপ্ত",
    designationEn: "Scholarship recipient at MIT",
    message: "SAT প্রস্তুতি এবং স্কলারশিপ গাইডেন্সের জন্য গ্র্যাভিটন একাডেমি সেরা। আমি MIT তে পূর্ণ স্কলারশিপ পেয়েছি।",
    messageEn: "Graviton Academy is the best for SAT preparation and scholarship guidance. I got a full scholarship at MIT.",
    rating: 5,
    image: "/assets/images/profile-34.jpeg",
    course: "SAT Preparation",
    year: 2022
  }
];

// Teachers Data
export const teachersData: Teacher[] = [
  {
    id: "teacher-1",
    name: "প্রফেসর আহমেদ আলী",
    nameEn: "Professor Ahmed Ali",
    designation: "গণিত বিভাগের প্রধান",
    designationEn: "Head of Mathematics Department",
    subjects: ["গণিত", "পদার্থবিজ্ঞান"],
    experience: 15,
    education: ["পিএইচডি ইন ম্যাথমেটিক্স", "ঢাকা বিশ্ববিদ্যালয়"],
    image: "/assets/images/profile-16.jpeg",
    rating: 4.9,
    studentsCount: 500
  },
  {
    id: "teacher-2",
    name: "ড. সালমা বেগম",
    nameEn: "Dr. Salma Begum",
    designation: "ইংরেজি বিভাগের সিনিয়র প্রভাষক",
    designationEn: "Senior Lecturer, English Department",
    subjects: ["ইংরেজি", "IELTS"],
    experience: 12,
    education: ["পিএইচডি ইন ইংলিশ", "অক্সফোর্ড বিশ্ববিদ্যালয়"],
    image: "/assets/images/user-profile.jpeg",
    rating: 4.8,
    studentsCount: 300
  },
  {
    id: "teacher-3",
    name: "মোহাম্মদ করিম",
    nameEn: "Mohammad Karim",
    designation: "রসায়ন বিশেষজ্ঞ",
    designationEn: "Chemistry Specialist",
    subjects: ["রসায়ন", "জীববিজ্ঞান"],
    experience: 10,
    education: ["এমএসসি ইন কেমিস্ট্রি", "বুয়েট"],
    image: "/assets/images/profile-34.jpeg",
    rating: 4.7,
    studentsCount: 250
  }
];

// Online Batch Data
export const onlineBatchData: OnlineBatch[] = [
  {
    id: "batch-1",
    title: "HSC 2025 ব্যাচ",
    titleEn: "HSC 2025 Batch",
    description: "সম্পূর্ণ HSC সিলেবাস কভার করা লাইভ ক্লাস",
    schedule: "সন্ধ্যা ৬:০০ - ৮:০০",
    duration: "১৮ মাস",
    students: 120,
    teacher: "প্রফেসর আহমেদ আলী",
    features: [
      "লাইভ ইন্টারেক্টিভ ক্লাস",
      "রেকর্ডেড ভিডিও",
      "সাপ্তাহিক পরীক্ষা",
      "ব্যক্তিগত মেন্টরিং"
    ],
    price: 15000,
    startDate: "2024-02-01"
  },
  {
    id: "batch-2",
    title: "IELTS ইনটেনসিভ",
    titleEn: "IELTS Intensive",
    description: "দ্রুত IELTS স্কোর উন্নতির জন্য বিশেষ কোর্স",
    schedule: "রাত ৮:০০ - ১০:০০",
    duration: "৩ মাস",
    students: 40,
    teacher: "ড. সালমা বেগম",
    features: [
      "স্পিকিং প্র্যাকটিস",
      "রাইটিং ফিডব্যাক",
      "মক টেস্ট",
      "ব্যান্ড স্কোর গ্যারান্টি"
    ],
    price: 18000,
    startDate: "2024-02-15"
  }
];

// Admission Steps Data
export const admissionStepsData: AdmissionStep[] = [
  {
    id: "step-1",
    step: 1,
    title: "অনলাইন আবেদন",
    titleEn: "Online Application",
    description: "আমাদের ওয়েবসাইটে গিয়ে অনলাইন আবেদন ফর্ম পূরণ করুন",
    icon: "computer",
    requirements: ["জাতীয় পরিচয়পত্র", "শিক্ষাগত যোগ্যতার সনদ", "পাসপোর্ট সাইজ ছবি"]
  },
  {
    id: "step-2",
    step: 2,
    title: "ভর্তি পরীক্ষা",
    titleEn: "Admission Test",
    description: "নির্ধারিত তারিখে ভর্তি পরীক্ষায় অংশগ্রহণ করুন",
    icon: "edit",
    requirements: ["ভর্তি কার্ড", "কলম ও পেন্সিল", "ক্যালকুলেটর (প্রয়োজনে)"]
  },
  {
    id: "step-3",
    step: 3,
    title: "ফলাফল প্রকাশ",
    titleEn: "Result Publication",
    description: "পরীক্ষার ৭ দিনের মধ্যে ফলাফল প্রকাশিত হবে",
    icon: "check-circle"
  },
  {
    id: "step-4",
    step: 4,
    title: "ভর্তি নিশ্চিতকরণ",
    titleEn: "Admission Confirmation",
    description: "নির্ধারিত ফি জমা দিয়ে ভর্তি নিশ্চিত করুন",
    icon: "credit-card",
    requirements: ["ভর্তি ফি", "মূল সনদপত্র", "অভিভাবকের তথ্য"]
  }
];

// Gallery Data
export const galleryData: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "আধুনিক ক্লাসরুম",
    titleEn: "Modern Classroom",
    image: "/assets/images/hero-education.jpg",
    category: "campus",
    date: "2023-12-01"
  },
  {
    id: "gallery-2",
    title: "বিজ্ঞান মেলা ২০২৩",
    titleEn: "Science Fair 2023",
    image: "/assets/images/menu-heade.jpg",
    category: "events",
    date: "2023-11-15"
  },
  {
    id: "gallery-3",
    title: "সাংস্কৃতিক অনুষ্ঠান",
    titleEn: "Cultural Program",
    image: "/assets/images/hero-education.jpg",
    category: "activities",
    date: "2023-10-20"
  },
  {
    id: "gallery-4",
    title: "পুরস্কার বিতরণী",
    titleEn: "Prize Distribution",
    image: "/assets/images/menu-heade.jpg",
    category: "achievements",
    date: "2023-12-10"
  }
];

// News & Updates Data
export const newsUpdatesData: NewsUpdate[] = [
  {
    id: "news-1",
    title: "নতুন ব্যাচের ভর্তি শুরু",
    titleEn: "New Batch Admission Started",
    excerpt: "২০২৪ সালের জন্য সকল কোর্সে নতুন ব্যাচের ভর্তি কার্যক্রম শুরু হয়েছে।",
    content: "বিস্তারিত তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।",
    image: "/assets/images/hero-education.jpg",
    date: "2024-01-15",
    category: "announcement",
    author: "প্রশাসন বিভাগ"
  },
  {
    id: "news-2",
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    titleEn: "Annual Sports Competition",
    excerpt: "আগামী মাসে অনুষ্ঠিত হবে বার্ষিক ক্রীড়া প্রতিযোগিতা।",
    content: "সকল শিক্ষার্থী অংশগ্রহণের জন্য আমন্ত্রিত।",
    image: "/assets/images/menu-heade.jpg",
    date: "2024-01-10",
    category: "event",
    author: "ক্রীড়া বিভাগ"
  },
  {
    id: "news-3",
    title: "IELTS মক টেস্ট",
    titleEn: "IELTS Mock Test",
    excerpt: "বিনামূল্যে IELTS মক টেস্টের আয়োজন করা হবে।",
    content: "আগ্রহী শিক্ষার্থীরা নিবন্ধন করতে পারেন।",
    image: "/assets/images/hero-education.jpg",
    date: "2024-01-05",
    category: "notice",
    author: "ইংরেজি বিভাগ"
  }
];

// Contact Information
export const contactInfo: ContactInfo = {
  address: "১২৩/এ, ধানমন্ডি, ঢাকা-১২০৫",
  addressEn: "123/A, Dhanmondi, Dhaka-1205",
  phone: ["+880-1712-345678", "+880-2-9876543"],
  email: ["info@gravitonacademy.com", "admission@gravitonacademy.com"],
  hours: "সকাল ৯:০০ - রাত ৯:০০ (রবিবার বন্ধ)",
  hoursEn: "9:00 AM - 9:00 PM (Closed on Sunday)",
  socialMedia: {
    facebook: "https://facebook.com/gravitonacademy",
    youtube: "https://youtube.com/gravitonacademy",
    instagram: "https://instagram.com/gravitonacademy",
    linkedin: "https://linkedin.com/company/gravitonacademy"
  }
};

// Features Data
export const featuresData: Feature[] = [
  {
    id: "feature-1",
    title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
    titleEn: "Experienced Teachers",
    description: "দেশের সেরা শিক্ষকদের নিয়ে গঠিত আমাদের শিক্ষকমণ্ডলী",
    icon: "users",
    stats: {
      value: "৫০+",
      label: "অভিজ্ঞ শিক্ষক"
    }
  },
  {
    id: "feature-2",
    title: "আধুনিক প্রযুক্তি",
    titleEn: "Modern Technology",
    description: "স্মার্ট বোর্ড ও ডিজিটাল কন্টেন্ট সহ আধুনিক শিক্ষা ব্যবস্থা",
    icon: "desktop",
    stats: {
      value: "১০০%",
      label: "ডিজিটাল ক্লাসরুম"
    }
  },
  {
    id: "feature-3",
    title: "ব্যক্তিগত যত্ন",
    titleEn: "Personal Care",
    description: "প্রতিটি শিক্ষার্থীর জন্য ব্যক্তিগত মনোযোগ ও যত্ন",
    icon: "heart",
    stats: {
      value: "১:১৫",
      label: "শিক্ষক-শিক্ষার্থী অনুপাত"
    }
  },
  {
    id: "feature-4",
    title: "সাফল্যের নিশ্চয়তা",
    titleEn: "Success Guarantee",
    description: "৯৮% সাফল্যের হার সহ প্রমাণিত ফলাফল",
    icon: "award",
    stats: {
      value: "৯৮%",
      label: "সাফল্যের হার"
    }
  }
];