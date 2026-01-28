import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../types';

interface CourseState {
    courses: Course[];
    selectedCourse: Course | null;
    loading: boolean;
    error: string | null;
}

const initialState: CourseState = {
    courses: [
        {
            id: 'hsc-complete',
            title: 'HSC সম্পূর্ণ কোর্স',
            titleEn: 'Complete HSC Course',
            description: 'উচ্চ মাধ্যমিক সার্টিফিকেট পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি - সকল বিষয়ে বিশেষজ্ঞ শিক্ষকদের গাইডেন্স',
            fullDescription: 'এই কোর্সটি HSC পরীক্ষার্থীদের জন্য বিশেষভাবে ডিজাইন করা হয়েছে। বিজ্ঞান, মানবিক এবং ব্যবসায় শিক্ষা - সকল বিভাগের শিক্ষার্থীদের জন্য আলাদা সিলেবাস রয়েছে। অভিজ্ঞ শিক্ষকমণ্ডলী, আধুনিক শিক্ষা পদ্ধতি এবং নিয়মিত মূল্যায়নের মাধ্যমে আমরা নিশ্চিত করি যে প্রতিটি শিক্ষার্থী তার সর্বোচ্চ সম্ভাবনা অর্জন করতে পারে।',
            image: '/assets/images/hero-education.jpg',
            price: 15000,
            originalPrice: 20000,
            duration: '২ বছর',
            level: 'intermediate',
            features: [
                'সকল বিষয়ের লাইভ ক্লাস',
                'MCQ ও CQ প্র্যাকটিস',
                'PDF নোটস ও বই',
                'ভিডিও লেকচার লাইব্রেরি',
                'সাপ্তাহিক মডেল টেস্ট',
                'ব্যক্তিগত মেন্টরিং',
                'অনলাইন ও অফলাইন সাপোর্ট'
            ],
            curriculum: [
                'পদার্থবিজ্ঞান - ১ম ও ২য় পত্র',
                'রসায়ন - ১ম ও ২য় পত্র', 
                'গণিত - ১ম ও ২য় পত্র',
                'জীববিজ্ঞান - ১ম ও ২য় পত্র',
                'বাংলা - ১ম ও ২য় পত্র',
                'ইংরেজি - ১ম ও ২য় পত্র',
                'ICT ও অন্যান্য বিষয়'
            ],
            instructor: 'প্রফেসর ড. আহমেদ আলী',
            instructorImage: '/assets/images/profile-34.jpeg',
            instructorBio: '২০ বছরের শিক্ষকতার অভিজ্ঞতা সহ পদার্থবিজ্ঞানের প্রফেসর। ঢাকা বিশ্ববিদ্যালয় থেকে পিএইচডি।',
            totalStudents: 1250,
            rating: 4.9,
            totalLessons: 240,
            totalHours: 480,
            certificate: true,
            isPopular: true,
            category: 'HSC',
            prerequisites: ['SSC পাস বা সমমান'],
            whatYouWillLearn: [
                'HSC সিলেবাসের সম্পূর্ণ কভারেজ',
                'পরীক্ষার কৌশল ও টাইম ম্যানেজমেন্ট',
                'MCQ ও CQ সমাধানের দক্ষতা',
                'বিষয়ভিত্তিক গভীর জ্ঞান',
                'পরীক্ষার আত্মবিশ্বাস বৃদ্ধি'
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'ielts-preparation',
            title: 'IELTS প্রস্তুতি কোর্স',
            titleEn: 'IELTS Preparation Course',
            description: 'আন্তর্জাতিক মানের IELTS প্রস্তুতি - Listening, Reading, Writing, Speaking সকল মডিউলে দক্ষতা অর্জন',
            fullDescription: 'IELTS (International English Language Testing System) পরীক্ষায় সফলতার জন্য আমাদের বিশেষায়িত কোর্স। ব্রিটিশ কাউন্সিল ট্রেইনড শিক্ষকদের তত্ত্বাবধানে চার মডিউলে (Listening, Reading, Writing, Speaking) সম্পূর্ণ প্রস্তুতি। নিয়মিত মক টেস্ট, ব্যক্তিগত ফিডব্যাক এবং ব্যান্ড স্কোর উন্নতির গ্যারান্টি।',
            image: '/assets/images/hero-education.jpg',
            price: 12000,
            originalPrice: 15000,
            duration: '৬ মাস',
            level: 'intermediate',
            features: [
                'Listening Practice Sessions',
                'Reading Comprehension',
                'Writing Task 1 & 2',
                'Speaking Mock Tests',
                'Weekly Mock Exams',
                'Individual Feedback',
                'Study Materials Included'
            ],
            curriculum: [
                'IELTS Overview & Test Format',
                'Listening Module Training',
                'Reading Module Strategies',
                'Writing Task 1 (Academic/General)',
                'Writing Task 2 (Essay Writing)',
                'Speaking Module Practice',
                'Mock Tests & Evaluation'
            ],
            instructor: 'ড. সালমা বেগম',
            instructorImage: '/assets/images/user-profile.jpeg',
            instructorBio: 'IELTS Certified Trainer, Cambridge University থেকে TESOL সার্টিফিকেট। ১৫ বছরের অভিজ্ঞতা।',
            totalStudents: 850,
            rating: 4.8,
            totalLessons: 96,
            totalHours: 144,
            certificate: true,
            isPopular: true,
            category: 'Language',
            prerequisites: ['ইংরেজিতে মৌলিক দক্ষতা'],
            whatYouWillLearn: [
                'IELTS পরীক্ষার সম্পূর্ণ ফরম্যাট',
                'Listening দক্ষতা উন্নয়ন',
                'Reading speed ও comprehension',
                'Academic ও General Writing',
                'Fluent Speaking techniques',
                'Band Score 7+ অর্জনের কৌশল'
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'sat-preparation',
            title: 'SAT প্রস্তুতি কোর্স',
            titleEn: 'SAT Preparation Course',
            description: 'আমেরিকান বিশ্ববিদ্যালয়ে ভর্তির জন্য SAT পরীক্ষার সম্পূর্ণ প্রস্তুতি - Math ও English উভয় সেকশনে',
            fullDescription: 'SAT (Scholastic Assessment Test) আমেরিকান বিশ্ববিদ্যালয়ে ভর্তির জন্য অত্যাবশ্যক। আমাদের কোর্সে রয়েছে Math ও Evidence-Based Reading and Writing উভয় সেকশনের বিস্তারিত প্রস্তুতি। College Board অনুমোদিত সিলেবাস অনুসরণ করে আমরা শিক্ষার্থীদের 1400+ স্কোর অর্জনে সহায়তা করি।',
            image: '/assets/images/hero-education.jpg',
            price: 18000,
            originalPrice: 22000,
            duration: '৮ মাস',
            level: 'advanced',
            features: [
                'Math Section (Algebra, Geometry)',
                'Reading & Writing Section',
                'Practice Tests (Official)',
                'Vocabulary Building',
                'Test-taking Strategies',
                'College Application Guidance',
                'Scholarship Information'
            ],
            curriculum: [
                'SAT Math - Algebra & Functions',
                'SAT Math - Geometry & Trigonometry',
                'SAT Math - Statistics & Probability',
                'Reading Comprehension Strategies',
                'Grammar & Language Usage',
                'Essay Writing (Optional)',
                'Full-length Practice Tests'
            ],
            instructor: 'মোহাম্মদ করিম',
            instructorImage: '/assets/images/profile-16.jpeg',
            instructorBio: 'MIT গ্র্যাজুয়েট, SAT Math Perfect Scorer। ১২ বছর SAT কোচিং অভিজ্ঞতা।',
            totalStudents: 420,
            rating: 4.9,
            totalLessons: 128,
            totalHours: 192,
            certificate: true,
            isPopular: false,
            category: 'International',
            prerequisites: ['HSC বা A-Level সমমান', 'ইংরেজিতে ভাল দক্ষতা'],
            whatYouWillLearn: [
                'SAT Math সম্পূর্ণ সিলেবাস',
                'Critical Reading Skills',
                'Advanced Grammar Rules',
                'Time Management Techniques',
                'Test Anxiety Management',
                '1400+ Score Achievement Strategy'
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'olympiad-preparation',
            title: 'অলিম্পিয়াড প্রস্তুতি',
            titleEn: 'Olympiad Preparation',
            description: 'গণিত, পদার্থ ও রসায়ন অলিম্পিয়াডের জন্য বিশেষ প্রস্তুতি - জাতীয় ও আন্তর্জাতিক পর্যায়ে সফলতার জন্য',
            fullDescription: 'বাংলাদেশ গণিত অলিম্পিয়াড, পদার্থবিজ্ঞান অলিম্পিয়াড এবং রসায়ন অলিম্পিয়াডের জন্য বিশেষায়িত প্রস্তুতি কোর্স। আন্তর্জাতিক অলিম্পিয়াড মেডেলিস্ট শিক্ষকদের তত্ত্বাবধানে সমস্যা সমাধানের উন্নত কৌশল শেখানো হয়। জাতীয় পর্যায়ে পদক জয়ের লক্ষ্যে নিবিড় প্রশিক্ষণ।',
            image: '/assets/images/hero-education.jpg',
            price: 14000,
            originalPrice: 18000,
            duration: '১ বছর',
            level: 'advanced',
            features: [
                'Math Olympiad Training',
                'Physics Olympiad Prep',
                'Chemistry Olympiad Prep',
                'Problem Solving Techniques',
                'Competition Strategies',
                'Mock Competitions',
                'Individual Mentoring'
            ],
            curriculum: [
                'Number Theory & Algebra',
                'Geometry & Combinatorics',
                'Classical Mechanics Problems',
                'Thermodynamics & Waves',
                'Organic Chemistry Reactions',
                'Physical Chemistry Calculations',
                'Competition Problem Solving'
            ],
            instructor: 'ড. রাহুল দাস',
            instructorImage: '/assets/images/profile-34.jpeg',
            instructorBio: 'আন্তর্জাতিক গণিত অলিম্পিয়াড ব্রোঞ্জ মেডেলিস্ট। IIT থেকে পিএইচডি।',
            totalStudents: 180,
            rating: 4.9,
            totalLessons: 160,
            totalHours: 240,
            certificate: true,
            isPopular: false,
            category: 'Competition',
            prerequisites: ['HSC বিজ্ঞান বিভাগ', 'গণিত ও বিজ্ঞানে ভাল ফলাফল'],
            whatYouWillLearn: [
                'Advanced Problem Solving',
                'Mathematical Proof Techniques',
                'Physics Problem Analysis',
                'Chemistry Reaction Mechanisms',
                'Competition Time Management',
                'Medal Winning Strategies'
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'ssc-complete',
            title: 'SSC সম্পূর্ণ কোর্স',
            titleEn: 'Complete SSC Course',
            description: 'মাধ্যমিক স্কুল সার্টিফিকেট পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি - সকল বিষয়ে A+ গ্রেড অর্জনের লক্ষ্যে',
            fullDescription: 'SSC পরীক্ষার্থীদের জন্য বিশেষভাবে প্রস্তুত এই কোর্সে রয়েছে সকল বিষয়ের সম্পূর্ণ সিলেবাস কভারেজ। বিজ্ঞান, মানবিক এবং ব্যবসায় শিক্ষা বিভাগের জন্য আলাদা ব্যাচ। নিয়মিত ক্লাস টেস্ট, মডেল টেস্ট এবং ব্যক্তিগত যত্নের মাধ্যমে প্রতিটি শিক্ষার্থীর সর্বোচ্চ ফলাফল নিশ্চিত করা হয়।',
            image: '/assets/images/hero-education.jpg',
            price: 10000,
            originalPrice: 13000,
            duration: '১ বছর',
            level: 'beginner',
            features: [
                'সকল বিষয়ের ক্লাস',
                'নিয়মিত ক্লাস টেস্ট',
                'মাসিক মডেল টেস্ট',
                'প্রশ্ন সমাধান সেশন',
                'অভিভাবক মিটিং',
                'স্টাডি ম্যাটেরিয়াল',
                'অনলাইন সাপোর্ট'
            ],
            curriculum: [
                'বাংলা ১ম ও ২য় পত্র',
                'ইংরেজি ১ম ও ২য় পত্র',
                'গণিত',
                'বিজ্ঞান (পদার্থ, রসায়ন, জীববিজ্ঞান)',
                'বাংলাদেশ ও বিশ্বপরিচয়',
                'ধর্ম ও নৈতিক শিক্ষা',
                'তথ্য ও যোগাযোগ প্রযুক্তি'
            ],
            instructor: 'মিসেস ফাতিমা খাতুন',
            instructorImage: '/assets/images/user-profile.jpeg',
            instructorBio: 'SSC বিশেষজ্ঞ শিক্ষক। ঢাকা বিশ্ববিদ্যালয় থেকে শিক্ষায় মাস্টার্স। ১৮ বছরের অভিজ্ঞতা।',
            totalStudents: 950,
            rating: 4.7,
            totalLessons: 180,
            totalHours: 270,
            certificate: true,
            isPopular: true,
            category: 'SSC',
            prerequisites: ['ক্লাস ৯ সম্পন্ন'],
            whatYouWillLearn: [
                'SSC সিলেবাসের সম্পূর্ণ কভারেজ',
                'পরীক্ষার প্রশ্ন প্যাটার্ন',
                'সময় ব্যবস্থাপনা',
                'সৃজনশীল প্রশ্ন সমাধান',
                'MCQ কৌশল',
                'A+ গ্রেড অর্জনের পদ্ধতি'
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'spoken-english',
            title: 'স্পোকেন ইংলিশ কোর্স',
            titleEn: 'Spoken English Course',
            description: 'দৈনন্দিন কথোপকথনে ইংরেজি ভাষায় দক্ষতা অর্জন - Beginner থেকে Advanced লেভেল পর্যন্ত',
            fullDescription: 'আত্মবিশ্বাসের সাথে ইংরেজিতে কথা বলার জন্য আমাদের বিশেষায়িত কোর্স। দৈনন্দিন কথোপকথন, ব্যবসায়িক যোগাযোগ, প্রেজেন্টেশন স্কিল এবং উচ্চারণ উন্নতির উপর বিশেষ গুরুত্ব। ইন্টারেক্টিভ ক্লাস, গ্রুপ ডিসকাশন এবং রিয়েল-লাইফ সিচুয়েশন প্র্যাকটিসের মাধ্যমে ভাষার দক্ষতা বৃদ্ধি।',
            image: '/assets/images/hero-education.jpg',
            price: 6000,
            originalPrice: 8000,
            duration: '৪ মাস',
            level: 'beginner',
            features: [
                'Interactive Speaking Sessions',
                'Pronunciation Training',
                'Grammar in Context',
                'Vocabulary Building',
                'Group Discussions',
                'Presentation Skills',
                'Confidence Building'
            ],
            curriculum: [
                'Basic Conversation Skills',
                'Pronunciation & Accent Training',
                'Grammar for Speaking',
                'Vocabulary Enhancement',
                'Business English',
                'Presentation Techniques',
                'Advanced Conversation'
            ],
            instructor: 'জনাব আরিফ হাসান',
            instructorImage: '/assets/images/profile-16.jpeg',
            instructorBio: 'TESOL Certified English Trainer। যুক্তরাজ্যে ৫ বছর অভিজ্ঞতা। ১০ বছর বাংলাদেশে শিক্ষকতা।',
            totalStudents: 650,
            rating: 4.6,
            totalLessons: 64,
            totalHours: 96,
            certificate: true,
            isPopular: false,
            category: 'Language',
            prerequisites: ['ইংরেজি পড়তে পারার ক্ষমতা'],
            whatYouWillLearn: [
                'Fluent English Speaking',
                'Correct Pronunciation',
                'Everyday Conversation',
                'Business Communication',
                'Public Speaking Skills',
                'Confidence in English'
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'computer-basics',
            title: 'কম্পিউটার বেসিক কোর্স',
            titleEn: 'Computer Basics Course',
            description: 'কম্পিউটারের মৌলিক জ্ঞান থেকে শুরু করে MS Office, ইন্টারনেট ব্যবহার এবং ডিজিটাল লিটারেসি',
            fullDescription: 'ডিজিটাল যুগে কম্পিউটার দক্ষতা অপরিহার্য। আমাদের এই কোর্সে রয়েছে কম্পিউটারের মৌলিক জ্ঞান, Windows অপারেটিং সিস্টেম, MS Word, Excel, PowerPoint, ইন্টারনেট ব্রাউজিং, ইমেইল ব্যবহার এবং সাইবার নিরাপত্তার বিষয়াদি। চাকরি ও ব্যবসায়িক প্রয়োজনে কম্পিউটার ব্যবহারের সম্পূর্ণ দক্ষতা অর্জন।',
            image: '/assets/images/hero-education.jpg',
            price: 5000,
            originalPrice: 7000,
            duration: '৩ মাস',
            level: 'beginner',
            features: [
                'Computer Fundamentals',
                'Windows Operating System',
                'MS Office Suite',
                'Internet & Email',
                'Digital Security',
                'Hands-on Practice',
                'Job-ready Skills'
            ],
            curriculum: [
                'Computer Hardware & Software',
                'Windows OS Navigation',
                'MS Word (Document Creation)',
                'MS Excel (Spreadsheets)',
                'MS PowerPoint (Presentations)',
                'Internet Browsing & Email',
                'Digital Security & Privacy'
            ],
            instructor: 'ইঞ্জিনিয়ার সাকিব রহমান',
            instructorImage: '/assets/images/profile-34.jpeg',
            instructorBio: 'Computer Science Engineer। Microsoft Certified Trainer। ১৫ বছর IT ট্রেনিং অভিজ্ঞতা।',
            totalStudents: 1100,
            rating: 4.5,
            totalLessons: 48,
            totalHours: 72,
            certificate: true,
            isPopular: true,
            category: 'Technology',
            prerequisites: ['কোন পূর্ব অভিজ্ঞতার প্রয়োজন নেই'],
            whatYouWillLearn: [
                'Computer Operation Skills',
                'MS Office Proficiency',
                'Internet Usage',
                'Email Communication',
                'Digital File Management',
                'Basic Troubleshooting'
            ],
            createdAt: '2024-01-01'
        }
    ],
    selectedCourse: null,
    loading: false,
    error: null
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
            state.selectedCourse = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { setSelectedCourse, setLoading, setError } = courseSlice.actions;
export default courseSlice.reducer;