import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject, Chapter, MCQ, VideoClass, PDFNote } from '../types';

interface SubjectState {
    subjects: Subject[];
    chapters: Chapter[];
    mcqs: MCQ[];
    videoClasses: VideoClass[];
    pdfNotes: PDFNote[];
    selectedSubject: Subject | null;
    selectedChapter: Chapter | null;
    loading: boolean;
    error: string | null;
}

const initialState: SubjectState = {
    subjects: [
        {
            id: 'math',
            name: 'গণিত',
            nameEn: 'Mathematics',
            description: 'উচ্চ মাধ্যমিক গণিত - ম্যাট্রিক্স, ক্যালকুলাস, জ্যামিতি এবং পরিসংখ্যানের সম্পূর্ণ কোর্স',
            image: '/assets/images/hero-education.jpg',
            totalChapters: 8,
            createdAt: '2024-01-01'
        },
        {
            id: 'physics',
            name: 'পদার্থবিজ্ঞান',
            nameEn: 'Physics',
            description: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান - বলবিদ্যা, তাপ, আলো, শব্দ এবং আধুনিক পদার্থবিজ্ঞান',
            image: '/assets/images/hero-education.jpg',
            totalChapters: 6,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry',
            name: 'রসায়ন',
            nameEn: 'Chemistry',
            description: 'উচ্চ মাধ্যমিক রসায়ন - জৈব রসায়ন, অজৈব রসায়ন এবং ভৌত রসায়নের সম্পূর্ণ কোর্স',
            image: '/assets/images/hero-education.jpg',
            totalChapters: 7,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology',
            name: 'জীববিজ্ঞান',
            nameEn: 'Biology',
            description: 'উচ্চ মাধ্যমিক জীববিজ্ঞান - উদ্ভিদবিজ্ঞান, প্রাণিবিজ্ঞান এবং মানব শরীরতত্ত্ব',
            image: '/assets/images/hero-education.jpg',
            totalChapters: 9,
            createdAt: '2024-01-01'
        },
        {
            id: 'bangla',
            name: 'বাংলা',
            nameEn: 'Bengali',
            description: 'উচ্চ মাধ্যমিক বাংলা - সাহিত্য, ব্যাকরণ এবং রচনার সম্পূর্ণ কোর্স',
            image: '/assets/images/hero-education.jpg',
            totalChapters: 5,
            createdAt: '2024-01-01'
        },
        {
            id: 'english',
            name: 'ইংরেজি',
            nameEn: 'English',
            description: 'উচ্চ মাধ্যমিক ইংরেজি - গ্রামার, লিটারেচার এবং কম্পোজিশনের সম্পূর্ণ কোর্স',
            image: '/assets/images/hero-education.jpg',
            totalChapters: 6,
            createdAt: '2024-01-01'
        }
    ],
    chapters: [
        // Mathematics Chapters
        {
            id: 'math-1',
            subjectId: 'math',
            name: 'ম্যাট্রিক্স ও নির্ণায়ক',
            nameEn: 'Matrix and Determinants',
            description: 'ম্যাট্রিক্স এবং নির্ণায়কের মৌলিক ধারণা, গুণ, যোগ, বিয়োগ এবং বিভিন্ন ধরনের ম্যাট্রিক্স সমাধান',
            order: 1,
            mcqCount: 35,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-2',
            subjectId: 'math',
            name: 'সমীকরণ',
            nameEn: 'Equations',
            description: 'রৈখিক সমীকরণ, দ্বিঘাত সমীকরণ এবং উচ্চতর ডিগ্রির সমীকরণের সমাধান পদ্ধতি',
            order: 2,
            mcqCount: 42,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-3',
            subjectId: 'math',
            name: 'ক্যালকুলাস',
            nameEn: 'Calculus',
            description: 'অন্তরীকরণ এবং সমাকলনের মৌলিক নিয়ম, সীমা এবং ধারাবাহিকতার ধারণা',
            order: 3,
            mcqCount: 38,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-4',
            subjectId: 'math',
            name: 'জ্যামিতি',
            nameEn: 'Geometry',
            description: 'সমতল জ্যামিতি, ত্রিকোণমিতি এবং স্থানাঙ্ক জ্যামিতির বিভিন্ন সূত্র ও সমাধান',
            order: 4,
            mcqCount: 40,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-5',
            subjectId: 'math',
            name: 'পরিসংখ্যান',
            nameEn: 'Statistics',
            description: 'তথ্য সংগ্রহ, বিশ্লেষণ এবং উপস্থাপনা, সম্ভাব্যতা এবং বিতরণের ধারণা',
            order: 5,
            mcqCount: 30,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-6',
            subjectId: 'math',
            name: 'বীজগণিত',
            nameEn: 'Algebra',
            description: 'বহুপদী, সূচক ও লগারিদম, অসমতা এবং ফাংশনের বিভিন্ন ধরন ও বৈশিষ্ট্য',
            order: 6,
            mcqCount: 36,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-7',
            subjectId: 'math',
            name: 'সংখ্যাতত্ত্ব',
            nameEn: 'Number Theory',
            description: 'মৌলিক সংখ্যা, গসাগু, লসাগু এবং সংখ্যার বিভিন্ন ধর্ম ও বৈশিষ্ট্য',
            order: 7,
            mcqCount: 28,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'math-8',
            subjectId: 'math',
            name: 'গাণিতিক যুক্তি',
            nameEn: 'Mathematical Logic',
            description: 'যুক্তিবিদ্যা, প্রমাণ পদ্ধতি এবং গাণিতিক সমস্যা সমাধানের কৌশল',
            order: 8,
            mcqCount: 25,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },

        // Physics Chapters
        {
            id: 'physics-1',
            subjectId: 'physics',
            name: 'বলবিদ্যা',
            nameEn: 'Mechanics',
            description: 'নিউটনের সূত্র, গতি, বল, কাজ, শক্তি এবং ভরবেগের ধারণা ও প্রয়োগ',
            order: 1,
            mcqCount: 45,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'physics-2',
            subjectId: 'physics',
            name: 'তাপগতিবিদ্যা',
            nameEn: 'Thermodynamics',
            description: 'তাপ, তাপমাত্রা, গ্যাসের সূত্র এবং তাপগতিবিদ্যার মূলনীতি',
            order: 2,
            mcqCount: 38,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'physics-3',
            subjectId: 'physics',
            name: 'আলোকবিজ্ঞান',
            nameEn: 'Optics',
            description: 'আলোর প্রতিফলন, প্রতিসরণ, লেন্স, দর্পণ এবং আলোর তরঙ্গ ধর্ম',
            order: 3,
            mcqCount: 40,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'physics-4',
            subjectId: 'physics',
            name: 'শব্দবিজ্ঞান',
            nameEn: 'Acoustics',
            description: 'শব্দের উৎপত্তি, প্রচার, প্রতিধ্বনি এবং শব্দের বিভিন্ন বৈশিষ্ট্য',
            order: 4,
            mcqCount: 32,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'physics-5',
            subjectId: 'physics',
            name: 'তড়িৎ ও চুম্বক',
            nameEn: 'Electricity and Magnetism',
            description: 'তড়িৎ প্রবাহ, চুম্বকত্ব, তড়িৎ চুম্বকীয় আবেশ এবং বর্তনী বিশ্লেষণ',
            order: 5,
            mcqCount: 48,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'physics-6',
            subjectId: 'physics',
            name: 'আধুনিক পদার্থবিজ্ঞান',
            nameEn: 'Modern Physics',
            description: 'পরমাণু গঠন, তেজস্ক্রিয়তা, কোয়ান্টাম তত্ত্ব এবং আপেক্ষিকতার ধারণা',
            order: 6,
            mcqCount: 35,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },

        // Chemistry Chapters
        {
            id: 'chemistry-1',
            subjectId: 'chemistry',
            name: 'জৈব রসায়ন',
            nameEn: 'Organic Chemistry',
            description: 'কার্বন যৌগ, হাইড্রোকার্বন, অ্যালকোহল, অ্যাসিড এবং জৈব বিক্রিয়া',
            order: 1,
            mcqCount: 50,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry-2',
            subjectId: 'chemistry',
            name: 'অজৈব রসায়ন',
            nameEn: 'Inorganic Chemistry',
            description: 'ধাতু, অধাতু, লবণ, অ্যাসিড, ক্ষার এবং পর্যায় সারণির মৌল',
            order: 2,
            mcqCount: 45,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry-3',
            subjectId: 'chemistry',
            name: 'ভৌত রসায়ন',
            nameEn: 'Physical Chemistry',
            description: 'রাসায়নিক গতিবিদ্যা, সাম্যাবস্থা, তাপরসায়ন এবং দ্রবণের ধর্ম',
            order: 3,
            mcqCount: 42,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry-4',
            subjectId: 'chemistry',
            name: 'পরিবেশ রসায়ন',
            nameEn: 'Environmental Chemistry',
            description: 'বায়ু দূষণ, পানি দূষণ, মাটি দূষণ এবং পরিবেশ সংরক্ষণের রসায়ন',
            order: 4,
            mcqCount: 30,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry-5',
            subjectId: 'chemistry',
            name: 'বিশ্লেষণী রসায়ন',
            nameEn: 'Analytical Chemistry',
            description: 'গুণগত ও পরিমাণগত বিশ্লেষণ, টাইট্রেশন এবং যন্ত্রগত বিশ্লেষণ',
            order: 5,
            mcqCount: 38,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry-6',
            subjectId: 'chemistry',
            name: 'শিল্প রসায়ন',
            nameEn: 'Industrial Chemistry',
            description: 'সার উৎপাদন, কাগজ শিল্প, চিনি শিল্প এবং বিভিন্ন রাসায়নিক শিল্প',
            order: 6,
            mcqCount: 35,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'chemistry-7',
            subjectId: 'chemistry',
            name: 'জীব রসায়ন',
            nameEn: 'Biochemistry',
            description: 'প্রোটিন, কার্বোহাইড্রেট, লিপিড এবং জীবদেহের রাসায়নিক প্রক্রিয়া',
            order: 7,
            mcqCount: 40,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },

        // Biology Chapters
        {
            id: 'biology-1',
            subjectId: 'biology',
            name: 'কোষবিজ্ঞান',
            nameEn: 'Cell Biology',
            description: 'কোষের গঠন, কোষ বিভাজন, কোষের কার্যাবলী এবং কোষীয় প্রক্রিয়া',
            order: 1,
            mcqCount: 45,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-2',
            subjectId: 'biology',
            name: 'উদ্ভিদবিজ্ঞান',
            nameEn: 'Botany',
            description: 'উদ্ভিদের গঠন, শ্রেণিবিভাগ, প্রজনন এবং উদ্ভিদের জীবনচক্র',
            order: 2,
            mcqCount: 50,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-3',
            subjectId: 'biology',
            name: 'প্রাণিবিজ্ঞান',
            nameEn: 'Zoology',
            description: 'প্রাণীর গঠন, শ্রেণিবিভাগ, আচরণ এবং প্রাণীর বিবর্তন',
            order: 3,
            mcqCount: 48,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-4',
            subjectId: 'biology',
            name: 'মানব শরীরতত্ত্ব',
            nameEn: 'Human Physiology',
            description: 'মানব দেহের বিভিন্ন তন্ত্র, হরমোন, রোগ প্রতিরোধ ব্যবস্থা',
            order: 4,
            mcqCount: 55,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-5',
            subjectId: 'biology',
            name: 'বংশগতিবিদ্যা',
            nameEn: 'Genetics',
            description: 'বংশগতি, DNA, RNA, জিন, ক্রোমোজোম এবং বংশগতির সূত্র',
            order: 5,
            mcqCount: 42,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-6',
            subjectId: 'biology',
            name: 'বিবর্তনবিদ্যা',
            nameEn: 'Evolution',
            description: 'প্রাকৃতিক নির্বাচন, অভিযোজন, প্রজাতির উৎপত্তি এবং বিবর্তনের প্রমাণ',
            order: 6,
            mcqCount: 38,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-7',
            subjectId: 'biology',
            name: 'পরিবেশবিদ্যা',
            nameEn: 'Ecology',
            description: 'বাস্তুতন্ত্র, খাদ্যশৃঙ্খল, জীববৈচিত্র্য এবং পরিবেশ সংরক্ষণ',
            order: 7,
            mcqCount: 40,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-8',
            subjectId: 'biology',
            name: 'জৈবপ্রযুক্তি',
            nameEn: 'Biotechnology',
            description: 'জিন প্রকৌশল, ক্লোনিং, টিস্যু কালচার এবং জৈবপ্রযুক্তির প্রয়োগ',
            order: 8,
            mcqCount: 35,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'biology-9',
            subjectId: 'biology',
            name: 'অণুজীববিজ্ঞান',
            nameEn: 'Microbiology',
            description: 'ব্যাকটেরিয়া, ভাইরাস, ছত্রাক এবং অণুজীবের ভূমিকা ও প্রয়োগ',
            order: 9,
            mcqCount: 32,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },

        // Bengali Chapters
        {
            id: 'bangla-1',
            subjectId: 'bangla',
            name: 'কবিতা',
            nameEn: 'Poetry',
            description: 'বাংলা সাহিত্যের বিখ্যাত কবিতা, ছন্দ, অলংকার এবং কাব্য বিশ্লেষণ',
            order: 1,
            mcqCount: 40,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'bangla-2',
            subjectId: 'bangla',
            name: 'গল্প',
            nameEn: 'Short Stories',
            description: 'বাংলা সাহিত্যের শ্রেষ্ঠ গল্প, চরিত্র বিশ্লেষণ এবং সাহিত্য সমালোচনা',
            order: 2,
            mcqCount: 35,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'bangla-3',
            subjectId: 'bangla',
            name: 'ব্যাকরণ',
            nameEn: 'Grammar',
            description: 'বাংলা ব্যাকরণের নিয়ম, বানান, সন্ধি, সমাস এবং বাক্য গঠন',
            order: 3,
            mcqCount: 50,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'bangla-4',
            subjectId: 'bangla',
            name: 'রচনা',
            nameEn: 'Composition',
            description: 'প্রবন্ধ রচনা, চিঠিপত্র, আবেদনপত্র এবং সৃজনশীল লেখার কৌশল',
            order: 4,
            mcqCount: 30,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'bangla-5',
            subjectId: 'bangla',
            name: 'সাহিত্যের ইতিহাস',
            nameEn: 'History of Literature',
            description: 'বাংলা সাহিত্যের ইতিহাস, যুগ বিভাজন এবং বিখ্যাত সাহিত্যিকদের জীবনী',
            order: 5,
            mcqCount: 38,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },

        // English Chapters
        {
            id: 'english-1',
            subjectId: 'english',
            name: 'গ্রামার',
            nameEn: 'Grammar',
            description: 'English grammar rules, tenses, parts of speech, and sentence structure',
            order: 1,
            mcqCount: 45,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'english-2',
            subjectId: 'english',
            name: 'সাহিত্য',
            nameEn: 'Literature',
            description: 'English literature, poetry, prose, drama analysis and literary criticism',
            order: 2,
            mcqCount: 40,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'english-3',
            subjectId: 'english',
            name: 'রচনা',
            nameEn: 'Composition',
            description: 'Essay writing, paragraph writing, letter writing and creative writing',
            order: 3,
            mcqCount: 35,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'english-4',
            subjectId: 'english',
            name: 'শব্দভান্ডার',
            nameEn: 'Vocabulary',
            description: 'Word meanings, synonyms, antonyms, idioms and phrases',
            order: 4,
            mcqCount: 50,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'english-5',
            subjectId: 'english',
            name: 'পঠন দক্ষতা',
            nameEn: 'Reading Skills',
            description: 'Reading comprehension, passage analysis and critical reading',
            order: 5,
            mcqCount: 42,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: 'english-6',
            subjectId: 'english',
            name: 'কথোপকথন',
            nameEn: 'Speaking Skills',
            description: 'Spoken English, pronunciation, conversation and presentation skills',
            order: 6,
            mcqCount: 30,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        }
    ],
    mcqs: [
        // Math Chapter 1 - Matrix & Determinants (10 MCQs)
        {
            id: 'mcq-math-1-1',
            chapterId: 'math-1',
            question: 'একটি 2×2 ম্যাট্রিক্সের নির্ণায়ক কীভাবে বের করা হয়?',
            options: ['ad - bc', 'ac - bd', 'ab - cd', 'a + d - b - c'],
            correctAnswer: 0,
            explanation: '2×2 ম্যাট্রিক্স [[a,b],[c,d]] এর নির্ণায়ক = ad - bc',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-2',
            chapterId: 'math-1',
            question: 'একক ম্যাট্রিক্সের নির্ণায়ক কত?',
            options: ['0', '1', '-1', 'অসংজ্ঞায়িত'],
            correctAnswer: 1,
            explanation: 'একক ম্যাট্রিক্সের নির্ণায়ক সর্বদা 1 হয়।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-3',
            chapterId: 'math-1',
            question: 'দুটি ম্যাট্রিক্স গুণ করার জন্য কী শর্ত প্রয়োজন?',
            options: ['একই মাত্রার হতে হবে', 'প্রথমটির কলাম = দ্বিতীয়টির সারি', 'বর্গাকার হতে হবে', 'নির্ণায়ক শূন্য হতে পারবে না'],
            correctAnswer: 1,
            explanation: 'ম্যাট্রিক্স গুণের জন্য প্রথম ম্যাট্রিক্সের কলাম সংখ্যা = দ্বিতীয় ম্যাট্রিক্সের সারি সংখ্যা হতে হবে।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-4',
            chapterId: 'math-1',
            question: 'শূন্য ম্যাট্রিক্সের নির্ণায়ক কত?',
            options: ['0', '1', '-1', 'অসংজ্ঞায়িত'],
            correctAnswer: 0,
            explanation: 'শূন্য ম্যাট্রিক্সের সকল উপাদান 0 হওয়ায় এর নির্ণায়ক 0।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-5',
            chapterId: 'math-1',
            question: 'ম্যাট্রিক্সের ট্রান্সপোজ কী?',
            options: ['সারি ও কলাম অদলবদল', 'নির্ণায়ক বের করা', 'বিপরীত ম্যাট্রিক্স', 'যোগ করা'],
            correctAnswer: 0,
            explanation: 'ট্রান্সপোজে ম্যাট্রিক্সের সারি ও কলাম অদলবদল হয়।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-6',
            chapterId: 'math-1',
            question: '3×3 ম্যাট্রিক্সের নির্ণায়ক বের করার কোন পদ্ধতি সবচেয়ে সহজ?',
            options: ['সরাস পদ্ধতি', 'কোফ্যাক্টর পদ্ধতি', 'ক্রামারের নিয়ম', 'গাউস পদ্ধতি'],
            correctAnswer: 0,
            explanation: '3×3 ম্যাট্রিক্সের জন্য সরাস পদ্ধতি সবচেয়ে সহজ ও দ্রুত।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-7',
            chapterId: 'math-1',
            question: 'বিপরীত ম্যাট্রিক্স বের করার শর্ত কী?',
            options: ['নির্ণায়ক ≠ 0', 'বর্গাকার ম্যাট্রিক্স', 'উভয়ই সত্য', 'কোনটিই নয়'],
            correctAnswer: 2,
            explanation: 'বিপরীত ম্যাট্রিক্স বের করতে ম্যাট্রিক্স বর্গাকার এবং নির্ণায়ক শূন্য নয় - উভয় শর্ত প্রয়োজন।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-8',
            chapterId: 'math-1',
            question: 'ম্যাট্রিক্স যোগের জন্য কী শর্ত?',
            options: ['একই মাত্রার হতে হবে', 'বর্গাকার হতে হবে', 'নির্ণায়ক সমান হতে হবে', 'কোন শর্ত নেই'],
            correctAnswer: 0,
            explanation: 'ম্যাট্রিক্স যোগের জন্য উভয় ম্যাট্রিক্স একই মাত্রার (সারি ও কলাম সংখ্যা সমান) হতে হবে।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-9',
            chapterId: 'math-1',
            question: 'সিমেট্রিক ম্যাট্রিক্সের বৈশিষ্ট্য কী?',
            options: ['A = A^T', 'A = -A^T', 'A = A^(-1)', 'det(A) = 0'],
            correctAnswer: 0,
            explanation: 'সিমেট্রিক ম্যাট্রিক্সে A = A^T (ম্যাট্রিক্স তার ট্রান্সপোজের সমান)।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-math-1-10',
            chapterId: 'math-1',
            question: 'কোন ম্যাট্রিক্সের নির্ণায়ক সর্বদা ধনাত্মক?',
            options: ['একক ম্যাট্রিক্স', 'শূন্য ম্যাট্রিক্স', 'সিমেট্রিক ম্যাট্রিক্স', 'কোনটিই নয়'],
            correctAnswer: 3,
            explanation: 'কোন ম্যাট্রিক্সের নির্ণায়ক সর্বদা ধনাত্মক হয় না। এটি ম্যাট্রিক্সের উপাদানের উপর নির্ভর করে।',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },

        // Physics Chapter 1 - Mechanics (10 MCQs)
        {
            id: 'mcq-physics-1-1',
            chapterId: 'physics-1',
            question: 'নিউটনের প্রথম সূত্র কী বলে?',
            options: ['বল = ভর × ত্বরণ', 'প্রতিটি ক্রিয়ার সমান ও বিপরীত প্রতিক্রিয়া আছে', 'স্থির বস্তু স্থির থাকে এবং গতিশীল বস্তু সমবেগে চলতে থাকে', 'শক্তির সংরক্ষণশীলতা'],
            correctAnswer: 2,
            explanation: 'নিউটনের প্রথম সূত্র জড়তার সূত্র নামেও পরিচিত।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-2',
            chapterId: 'physics-1',
            question: 'নিউটনের দ্বিতীয় সূত্রের গাণিতিক রূপ কী?',
            options: ['F = ma', 'F = mv', 'F = m/a', 'F = a/m'],
            correctAnswer: 0,
            explanation: 'নিউটনের দ্বিতীয় সূত্র: বল = ভর × ত্বরণ (F = ma)',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-3',
            chapterId: 'physics-1',
            question: 'ভরবেগের একক কী?',
            options: ['kg⋅m/s', 'kg⋅m/s²', 'N⋅s', 'kg⋅m/s এবং N⋅s উভয়ই'],
            correctAnswer: 3,
            explanation: 'ভরবেগের একক kg⋅m/s এবং N⋅s উভয়ই সমান।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-4',
            chapterId: 'physics-1',
            question: 'মুক্ত পতনে বস্তুর ত্বরণ কত?',
            options: ['9.8 m/s', '9.8 m/s²', '9.8 m', '98 m/s²'],
            correctAnswer: 1,
            explanation: 'মুক্ত পতনে বস্তুর ত্বরণ g = 9.8 m/s²',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-5',
            chapterId: 'physics-1',
            question: 'কাজের একক কী?',
            options: ['জুল (J)', 'ওয়াট (W)', 'নিউটন (N)', 'প্যাসকেল (Pa)'],
            correctAnswer: 0,
            explanation: 'কাজের একক জুল (J) = N⋅m',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-6',
            chapterId: 'physics-1',
            question: 'শক্তির সংরক্ষণশীলতার সূত্র কী বলে?',
            options: ['শক্তি সৃষ্টি বা ধ্বংস হয় না', 'শক্তি এক রূপ থেকে অন্য রূপে রূপান্তরিত হয়', 'মোট শক্তি সর্বদা ধ্রুব থাকে', 'সবগুলোই সত্য'],
            correctAnswer: 3,
            explanation: 'শক্তির সংরক্ষণশীলতার সূত্র অনুযায়ী শক্তি সৃষ্টি বা ধ্বংস হয় না, শুধু রূপান্তরিত হয়।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-7',
            chapterId: 'physics-1',
            question: 'ঘর্ষণ বল কোন দিকে কাজ করে?',
            options: ['গতির দিকে', 'গতির বিপরীত দিকে', 'গতির লম্ব দিকে', 'কোন নির্দিষ্ট দিক নেই'],
            correctAnswer: 1,
            explanation: 'ঘর্ষণ বল সর্বদা গতির বিপরীত দিকে কাজ করে।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-8',
            chapterId: 'physics-1',
            question: 'কেন্দ্রমুখী বলের দিক কোনদিকে?',
            options: ['কেন্দ্রের দিকে', 'কেন্দ্র থেকে বাইরের দিকে', 'স্পর্শকের দিকে', 'গতির দিকে'],
            correctAnswer: 0,
            explanation: 'কেন্দ্রমুখী বল সর্বদা বৃত্তের কেন্দ্রের দিকে কাজ করে।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-9',
            chapterId: 'physics-1',
            question: 'প্রক্ষেপ গতিতে সর্বোচ্চ উচ্চতায় বেগের কোন উপাদান শূন্য?',
            options: ['অনুভূমিক উপাদান', 'উল্লম্ব উপাদান', 'উভয় উপাদান', 'কোনটিই নয়'],
            correctAnswer: 1,
            explanation: 'সর্বোচ্চ উচ্চতায় বেগের উল্লম্ব উপাদান শূন্য হয়, অনুভূমিক উপাদান অপরিবর্তিত থাকে।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-physics-1-10',
            chapterId: 'physics-1',
            question: 'স্থিতিস্থাপক সংঘর্ষে কী সংরক্ষিত থাকে?',
            options: ['শুধু ভরবেগ', 'শুধু গতিশক্তি', 'ভরবেগ ও গতিশক্তি উভয়ই', 'কোনটিই নয়'],
            correctAnswer: 2,
            explanation: 'স্থিতিস্থাপক সংঘর্ষে ভরবেগ ও গতিশক্তি উভয়ই সংরক্ষিত থাকে।',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },

        // Chemistry Chapter 1 - Organic Chemistry (10 MCQs)
        {
            id: 'mcq-chemistry-1-1',
            chapterId: 'chemistry-1',
            question: 'মিথেনের আণবিক সূত্র কী?',
            options: ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'],
            correctAnswer: 0,
            explanation: 'মিথেন হলো সবচেয়ে সরল হাইড্রোকার্বন, যার সূত্র CH₄।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-2',
            chapterId: 'chemistry-1',
            question: 'ইথেনের গঠন সূত্র কী?',
            options: ['C₂H₆', 'C₂H₄', 'C₂H₂', 'CH₄'],
            correctAnswer: 0,
            explanation: 'ইথেন একটি স্যাচুরেটেড হাইড্রোকার্বন, সূত্র C₂H₆।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-3',
            chapterId: 'chemistry-1',
            question: 'অ্যালকেনের সাধারণ সূত্র কী?',
            options: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙHₙ'],
            correctAnswer: 0,
            explanation: 'অ্যালকেনের সাধারণ সূত্র CₙH₂ₙ₊₂ (যেখানে n = কার্বন সংখ্যা)।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-4',
            chapterId: 'chemistry-1',
            question: 'বেনজিনের আণবিক সূত্র কী?',
            options: ['C₆H₆', 'C₆H₁₂', 'C₆H₁₄', 'C₆H₁₀'],
            correctAnswer: 0,
            explanation: 'বেনজিন একটি অ্যারোমেটিক যৌগ, সূত্র C₆H₆।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-5',
            chapterId: 'chemistry-1',
            question: 'কার্বনের যোজনী কত?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 2,
            explanation: 'কার্বনের যোজনী 4, তাই এটি 4টি বন্ধন গঠন করতে পারে।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-6',
            chapterId: 'chemistry-1',
            question: 'অ্যালকোহলের কার্যকরী মূলক কী?',
            options: ['-OH', '-COOH', '-CHO', '-CO-'],
            correctAnswer: 0,
            explanation: 'অ্যালকোহলের কার্যকরী মূলক হাইড্রক্সিল গ্রুপ (-OH)।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-7',
            chapterId: 'chemistry-1',
            question: 'কার্বক্সিলিক অ্যাসিডের কার্যকরী মূলক কী?',
            options: ['-COOH', '-OH', '-CHO', '-NH₂'],
            correctAnswer: 0,
            explanation: 'কার্বক্সিলিক অ্যাসিডের কার্যকরী মূলক কার্বক্সিল গ্রুপ (-COOH)।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-8',
            chapterId: 'chemistry-1',
            question: 'আইসোমেরিজম কী?',
            options: ['একই আণবিক সূত্র, ভিন্ন গঠন', 'ভিন্ন আণবিক সূত্র, একই গঠন', 'একই আণবিক ভর', 'একই ভৌত ধর্ম'],
            correctAnswer: 0,
            explanation: 'আইসোমেরিজম হলো একই আণবিক সূত্র কিন্তু ভিন্ন গঠন বিশিষ্ট যৌগের অস্তিত্ব।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-9',
            chapterId: 'chemistry-1',
            question: 'হাইব্রিডাইজেশন কী?',
            options: ['অরবিটালের মিশ্রণ', 'ইলেকট্রনের স্থানান্তর', 'আয়নের গঠন', 'বন্ধন ভাঙা'],
            correctAnswer: 0,
            explanation: 'হাইব্রিডাইজেশন হলো পরমাণুর বিভিন্ন অরবিটালের মিশ্রণ প্রক্রিয়া।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-chemistry-1-10',
            chapterId: 'chemistry-1',
            question: 'পলিমারাইজেশন কী?',
            options: ['ছোট অণুর যুক্ত হয়ে বড় অণু গঠন', 'বড় অণুর ভেঙে ছোট অণু গঠন', 'আয়নিক বন্ধন গঠন', 'হাইড্রোজেন বন্ধন গঠন'],
            correctAnswer: 0,
            explanation: 'পলিমারাইজেশনে অনেক ছোট অণু (মনোমার) যুক্ত হয়ে বড় অণু (পলিমার) গঠন করে।',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },

        // Biology Chapter 1 - Cell Biology (10 MCQs)
        {
            id: 'mcq-biology-1-1',
            chapterId: 'biology-1',
            question: 'কোষের কোন অংশকে "পাওয়ার হাউস" বলা হয়?',
            options: ['নিউক্লিয়াস', 'মাইটোকন্ড্রিয়া', 'রাইবোজোম', 'গলগি বডি'],
            correctAnswer: 1,
            explanation: 'মাইটোকন্ড্রিয়া ATP উৎপাদন করে বলে একে কোষের পাওয়ার হাউস বলা হয়।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-2',
            chapterId: 'biology-1',
            question: 'কোষের নিয়ন্ত্রণ কেন্দ্র কোনটি?',
            options: ['নিউক্লিয়াস', 'মাইটোকন্ড্রিয়া', 'সাইটোপ্লাজম', 'কোষপ্রাচীর'],
            correctAnswer: 0,
            explanation: 'নিউক্লিয়াস কোষের সকল কার্যক্রম নিয়ন্ত্রণ করে বলে একে নিয়ন্ত্রণ কেন্দ্র বলা হয়।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-3',
            chapterId: 'biology-1',
            question: 'প্রোটিন সংশ্লেষণ কোথায় হয়?',
            options: ['নিউক্লিয়াস', 'রাইবোজোম', 'মাইটোকন্ড্রিয়া', 'গলগি বডি'],
            correctAnswer: 1,
            explanation: 'রাইবোজোমে প্রোটিন সংশ্লেষণ হয়।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-4',
            chapterId: 'biology-1',
            question: 'কোষপ্রাচীর কোন কোষে থাকে?',
            options: ['প্রাণী কোষে', 'উদ্ভিদ কোষে', 'উভয়েই', 'কোনটিতেই নয়'],
            correctAnswer: 1,
            explanation: 'কোষপ্রাচীর শুধুমাত্র উদ্ভিদ কোষে থাকে, প্রাণী কোষে থাকে না।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-5',
            chapterId: 'biology-1',
            question: 'ক্লোরোপ্লাস্ট কোন কোষে পাওয়া যায়?',
            options: ['প্রাণী কোষে', 'উদ্ভিদ কোষে', 'ব্যাকটেরিয়ায়', 'ভাইরাসে'],
            correctAnswer: 1,
            explanation: 'ক্লোরোপ্লাস্ট শুধুমাত্র উদ্ভিদ কোষে থাকে এবং সালোকসংশ্লেষণে ভূমিকা রাখে।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-6',
            chapterId: 'biology-1',
            question: 'কোষ বিভাজনের কয়টি প্রধান ধাপ?',
            options: ['2টি', '3টি', '4টি', '5টি'],
            correctAnswer: 2,
            explanation: 'কোষ বিভাজনের 4টি প্রধান ধাপ: প্রোফেজ, মেটাফেজ, অ্যানাফেজ, টেলোফেজ।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-7',
            chapterId: 'biology-1',
            question: 'DNA এর পূর্ণরূপ কী?',
            options: ['Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribose Acid', 'Dioxy Nucleic Acid'],
            correctAnswer: 0,
            explanation: 'DNA এর পূর্ণরূপ Deoxyribonucleic Acid।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-8',
            chapterId: 'biology-1',
            question: 'কোষঝিল্লি কী দিয়ে তৈরি?',
            options: ['প্রোটিন', 'লিপিড', 'প্রোটিন ও লিপিড', 'কার্বোহাইড্রেট'],
            correctAnswer: 2,
            explanation: 'কোষঝিল্লি প্রোটিন ও লিপিডের দ্বিস্তর দিয়ে তৈরি।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-9',
            chapterId: 'biology-1',
            question: 'এন্ডোপ্লাজমিক রেটিকুলামের কাজ কী?',
            options: ['প্রোটিন পরিবহন', 'লিপিড সংশ্লেষণ', 'পদার্থ পরিবহন', 'সবগুলোই'],
            correctAnswer: 3,
            explanation: 'এন্ডোপ্লাজমিক রেটিকুলাম প্রোটিন ও লিপিড সংশ্লেষণ এবং পদার্থ পরিবহনে ভূমিকা রাখে।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-biology-1-10',
            chapterId: 'biology-1',
            question: 'লাইসোজোমকে কী বলা হয়?',
            options: ['পাওয়ার হাউস', 'সুইসাইড ব্যাগ', 'নিয়ন্ত্রণ কেন্দ্র', 'প্রোটিন ফ্যাক্টরি'],
            correctAnswer: 1,
            explanation: 'লাইসোজোমে পাচক এনজাইম থাকে যা ক্ষতিগ্রস্ত কোষাংশ ধ্বংস করে, তাই একে সুইসাইড ব্যাগ বলা হয়।',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },

        // Bengali Chapter 1 - Poetry (10 MCQs)
        {
            id: 'mcq-bangla-1-1',
            chapterId: 'bangla-1',
            question: 'কাজী নজরুল ইসলামের "বিদ্রোহী" কবিতাটি কোন ছন্দে রচিত?',
            options: ['মাত্রাবৃত্ত', 'স্বরবৃত্ত', 'অক্ষরবৃত্ত', 'মুক্তক'],
            correctAnswer: 1,
            explanation: '"বিদ্রোহী" কবিতাটি স্বরবৃত্ত ছন্দে রচিত।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-2',
            chapterId: 'bangla-1',
            question: 'রবীন্দ্রনাথ ঠাকুরের "গীতাঞ্জলি" কাব্যগ্রন্থের জন্য তিনি কোন পুরস্কার পেয়েছিলেন?',
            options: ['নোবেল পুরস্কার', 'পুলিৎজার পুরস্কার', 'ম্যান বুকার পুরস্কার', 'একুশে পদক'],
            correctAnswer: 0,
            explanation: '১৯১৩ সালে "গীতাঞ্জলি" কাব্যগ্রন্থের জন্য রবীন্দ্রনাথ নোবেল পুরস্কার পান।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-3',
            chapterId: 'bangla-1',
            question: 'বাংলা সাহিত্যের প্রথম মহাকাব্য কোনটি?',
            options: ['মেঘনাদবধ কাব্য', 'শ্রীকৃষ্ণকীর্তন', 'চণ্ডীমঙ্গল', 'অন্নদামঙ্গল'],
            correctAnswer: 1,
            explanation: 'বড়ু চণ্ডীদাসের "শ্রীকৃষ্ণকীর্তন" বাংলা সাহিত্যের প্রথম মহাকাব্য।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-4',
            chapterId: 'bangla-1',
            question: 'কোন কবিকে "কবিগুরু" বলা হয়?',
            options: ['কাজী নজরুল ইসলাম', 'রবীন্দ্রনাথ ঠাকুর', 'জীবনানন্দ দাশ', 'মাইকেল মধুসূদন দত্ত'],
            correctAnswer: 1,
            explanation: 'রবীন্দ্রনাথ ঠাকুরকে "কবিগুরু" বলা হয়।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-5',
            chapterId: 'bangla-1',
            question: 'বাংলা সনেটের জনক কে?',
            options: ['রবীন্দ্রনাথ ঠাকুর', 'মাইকেল মধুসূদন দত্ত', 'কাজী নজরুল ইসলাম', 'ঈশ্বরচন্দ্র গুপ্ত'],
            correctAnswer: 1,
            explanation: 'মাইকেল মধুসূদন দত্ত বাংলা সনেটের জনক।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-6',
            chapterId: 'bangla-1',
            question: 'ছন্দের রাজা কাকে বলা হয়?',
            options: ['রবীন্দ্রনাথ ঠাকুর', 'সত্যেন্দ্রনাথ দত্ত', 'কাজী নজরুল ইসলাম', 'জীবনানন্দ দাশ'],
            correctAnswer: 1,
            explanation: 'সত্যেন্দ্রনাথ দত্তকে "ছন্দের রাজা" বলা হয়।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-7',
            chapterId: 'bangla-1',
            question: 'কোন কবিতায় "আমি চির উন্নত মম শির" লাইনটি আছে?',
            options: ['বিদ্রোহী', 'সোনার তরী', 'আমার সোনার বাংলা', 'কবর'],
            correctAnswer: 0,
            explanation: 'কাজী নজরুল ইসলামের "বিদ্রোহী" কবিতায় এই লাইনটি আছে।',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-8',
            chapterId: 'bangla-1',
            question: 'বাংলা কাব্যে অমিত্রাক্ষর ছন্দের প্রবর্তক কে?',
            options: ['রবীন্দ্রনাথ ঠাকুর', 'মাইকেল মধুসূদন দত্ত', 'কাজী নজরুল ইসলাম', 'বিহারীলাল চক্রবর্তী'],
            correctAnswer: 1,
            explanation: 'মাইকেল মধুসূদন দত্ত বাংলা কাব্যে অমিত্রাক্ষর ছন্দের প্রবর্তক।',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-9',
            chapterId: 'bangla-1',
            question: 'কোন কবিকে "প্রকৃতির কবি" বলা হয়?',
            options: ['জীবনানন্দ দাশ', 'রবীন্দ্রনাথ ঠাকুর', 'কাজী নজরুল ইসলাম', 'সুকান্ত ভট্টাচার্য'],
            correctAnswer: 0,
            explanation: 'জীবনানন্দ দাশকে "প্রকৃতির কবি" বলা হয়।',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-bangla-1-10',
            chapterId: 'bangla-1',
            question: 'বাংলা সাহিত্যের আধুনিক যুগের সূচনা কোন গ্রন্থ দিয়ে?',
            options: ['বেতাল পঞ্চবিংশতি', 'অন্নদামঙ্গল', 'নীলদর্পণ', 'রাজা প্রতাপাদিত্য চরিত্র'],
            correctAnswer: 0,
            explanation: 'ঈশ্বরচন্দ্র বিদ্যাসাগরের "বেতাল পঞ্চবিংশতি" দিয়ে বাংলা সাহিত্যের আধুনিক যুগের সূচনা।',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },

        // English Chapter 1 - Grammar (10 MCQs)
        {
            id: 'mcq-english-1-1',
            chapterId: 'english-1',
            question: 'Which of the following is a present perfect tense?',
            options: ['I am reading', 'I have read', 'I will read', 'I read'],
            correctAnswer: 1,
            explanation: 'Present perfect tense is formed with "have/has + past participle".',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-2',
            chapterId: 'english-1',
            question: 'What is the past participle of "go"?',
            options: ['went', 'gone', 'going', 'goes'],
            correctAnswer: 1,
            explanation: 'The past participle of "go" is "gone".',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-3',
            chapterId: 'english-1',
            question: 'Which sentence is in passive voice?',
            options: ['John writes a letter', 'A letter is written by John', 'John is writing a letter', 'John will write a letter'],
            correctAnswer: 1,
            explanation: 'Passive voice: "A letter is written by John" - the object becomes the subject.',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-4',
            chapterId: 'english-1',
            question: 'What type of noun is "happiness"?',
            options: ['Concrete noun', 'Abstract noun', 'Proper noun', 'Collective noun'],
            correctAnswer: 1,
            explanation: '"Happiness" is an abstract noun as it represents a feeling or emotion.',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-5',
            chapterId: 'english-1',
            question: 'Which is the correct comparative form of "good"?',
            options: ['gooder', 'more good', 'better', 'best'],
            correctAnswer: 2,
            explanation: 'The comparative form of "good" is "better".',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-6',
            chapterId: 'english-1',
            question: 'What is a gerund?',
            options: ['A verb form ending in -ing used as a noun', 'A past tense verb', 'An adjective', 'An adverb'],
            correctAnswer: 0,
            explanation: 'A gerund is a verb form ending in -ing that functions as a noun.',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-7',
            chapterId: 'english-1',
            question: 'Which sentence uses the subjunctive mood?',
            options: ['If I was rich, I would travel', 'If I were rich, I would travel', 'I am rich and I travel', 'I was rich when I traveled'],
            correctAnswer: 1,
            explanation: 'Subjunctive mood uses "were" instead of "was" in hypothetical situations.',
            difficulty: 'hard',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-8',
            chapterId: 'english-1',
            question: 'What is the plural of "child"?',
            options: ['childs', 'childes', 'children', 'child'],
            correctAnswer: 2,
            explanation: 'The plural of "child" is "children" - an irregular plural form.',
            difficulty: 'easy',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-9',
            chapterId: 'english-1',
            question: 'Which is a coordinating conjunction?',
            options: ['because', 'although', 'and', 'when'],
            correctAnswer: 2,
            explanation: '"And" is a coordinating conjunction (FANBOYS: for, and, nor, but, or, yet, so).',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        },
        {
            id: 'mcq-english-1-10',
            chapterId: 'english-1',
            question: 'What is the function of an adverb?',
            options: ['Modifies nouns', 'Modifies verbs, adjectives, or other adverbs', 'Connects clauses', 'Shows relationships'],
            correctAnswer: 1,
            explanation: 'Adverbs modify verbs, adjectives, or other adverbs, often ending in -ly.',
            difficulty: 'medium',
            createdAt: '2024-01-01'
        }
    ],
    videoClasses: [
        // Math Video Classes
        {
            id: 'video-math-1-1',
            chapterId: 'math-1',
            title: 'ম্যাট্রিক্সের পরিচিতি',
            titleEn: 'Introduction to Matrix',
            description: 'ম্যাট্রিক্সের মৌলিক ধারণা, প্রকারভেদ এবং বিভিন্ন অপারেশন',
            videoUrl: '/videos/math/matrix-intro.mp4',
            duration: '45',
            thumbnail: '/assets/images/hero-education.jpg',
            instructor: 'প্রফেসর আহমেদ আলী',
            createdAt: '2024-01-01'
        },
        {
            id: 'video-physics-1-1',
            chapterId: 'physics-1',
            title: 'নিউটনের সূত্রসমূহ',
            titleEn: 'Newton\'s Laws',
            description: 'নিউটনের তিনটি সূত্রের বিস্তারিত ব্যাখ্যা এবং প্রয়োগ',
            videoUrl: '/videos/physics/newton-laws.mp4',
            duration: '48',
            thumbnail: '/assets/images/hero-education.jpg',
            instructor: 'ড. রহিম উদ্দিন',
            createdAt: '2024-01-01'
        },
        {
            id: 'video-chemistry-1-1',
            chapterId: 'chemistry-1',
            title: 'জৈব যৌগের পরিচিতি',
            titleEn: 'Introduction to Organic Compounds',
            description: 'জৈব রসায়নের মৌলিক ধারণা এবং কার্বন যৌগের বৈশিষ্ট্য',
            videoUrl: '/videos/chemistry/organic-intro.mp4',
            duration: '42',
            thumbnail: '/assets/images/hero-education.jpg',
            instructor: 'মোহাম্মদ করিম',
            createdAt: '2024-01-01'
        },
        {
            id: 'video-biology-1-1',
            chapterId: 'biology-1',
            title: 'কোষের গঠন',
            titleEn: 'Cell Structure',
            description: 'প্রাণী ও উদ্ভিদ কোষের গঠন এবং বিভিন্ন অঙ্গাণুর কার্যাবলী',
            videoUrl: '/videos/biology/cell-structure.mp4',
            duration: '50',
            thumbnail: '/assets/images/hero-education.jpg',
            instructor: 'ড. সালমা খাতুন',
            createdAt: '2024-01-01'
        }
    ],
    pdfNotes: [
        // Math Chapter 1 - Matrix & Determinants (2 PDFs)
        {
            id: 'pdf-math-1-1',
            chapterId: 'math-1',
            title: 'ম্যাট্রিক্স ও নির্ণায়ক - তত্ত্বীয় নোট',
            titleEn: 'Matrix and Determinants - Theory Notes',
            description: 'ম্যাট্রিক্স এবং নির্ণায়কের সকল সূত্র, সংজ্ঞা, উপপাদ্য এবং বিস্তারিত ব্যাখ্যা। এই নোটে রয়েছে ম্যাট্রিক্সের প্রকারভেদ, গুণ, যোগ, বিয়োগ এবং নির্ণায়ক বের করার সকল পদ্ধতি।',
            fileUrl: '/pdfs/math/matrix-theory.pdf',
            fileSize: '3.2',
            pages: 58,
            createdAt: '2024-01-01'
        },
        {
            id: 'pdf-math-1-2',
            chapterId: 'math-1',
            title: 'ম্যাট্রিক্স সমস্যা সমাধান ও অনুশীলনী',
            titleEn: 'Matrix Problem Solutions & Exercises',
            description: 'ম্যাট্রিক্স সংক্রান্ত বিভিন্ন ধরনের সমস্যার ধাপে ধাপে সমাধান। রয়েছে ১০০+ সমাধানকৃত উদাহরণ এবং অনুশীলনীর জন্য অতিরিক্ত সমস্যা।',
            fileUrl: '/pdfs/math/matrix-problems.pdf',
            fileSize: '2.8',
            pages: 45,
            createdAt: '2024-01-01'
        },

        // Physics Chapter 1 - Mechanics (2 PDFs)
        {
            id: 'pdf-physics-1-1',
            chapterId: 'physics-1',
            title: 'বলবিদ্যা - মূলনীতি ও সূত্রাবলী',
            titleEn: 'Mechanics - Principles and Formulas',
            description: 'নিউটনের সূত্রসমূহ, গতি, বল, কাজ, শক্তি এবং ভরবেগের বিস্তারিত আলোচনা। সকল গুরুত্বপূর্ণ সূত্র এবং তাদের প্রয়োগের উদাহরণ সহ।',
            fileUrl: '/pdfs/physics/mechanics-theory.pdf',
            fileSize: '4.5',
            pages: 72,
            createdAt: '2024-01-01'
        },
        {
            id: 'pdf-physics-1-2',
            chapterId: 'physics-1',
            title: 'বলবিদ্যা - সমস্যা সমাধান গাইড',
            titleEn: 'Mechanics - Problem Solving Guide',
            description: 'বলবিদ্যার জটিল সমস্যা সমাধানের কৌশল এবং শর্টকাট পদ্ধতি। ৮০+ সমাধানকৃত সমস্যা এবং পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন।',
            fileUrl: '/pdfs/physics/mechanics-problems.pdf',
            fileSize: '3.8',
            pages: 65,
            createdAt: '2024-01-01'
        },

        // Chemistry Chapter 1 - Organic Chemistry (2 PDFs)
        {
            id: 'pdf-chemistry-1-1',
            chapterId: 'chemistry-1',
            title: 'জৈব রসায়ন - মৌলিক ধারণা ও তত্ত্ব',
            titleEn: 'Organic Chemistry - Basic Concepts & Theory',
            description: 'জৈব রসায়নের মৌলিক ধারণা, কার্বন যৌগের বৈশিষ্ট্য, হাইব্রিডাইজেশন, আইসোমেরিজম এবং বিভিন্ন কার্যকরী মূলকের বিস্তারিত আলোচনা।',
            fileUrl: '/pdfs/chemistry/organic-theory.pdf',
            fileSize: '5.5',
            pages: 95,
            createdAt: '2024-01-01'
        },
        {
            id: 'pdf-chemistry-1-2',
            chapterId: 'chemistry-1',
            title: 'জৈব রসায়ন - বিক্রিয়া ও প্রক্রিয়া',
            titleEn: 'Organic Chemistry - Reactions & Mechanisms',
            description: 'জৈব যৌগের বিভিন্ন বিক্রিয়া, বিক্রিয়ার প্রক্রিয়া, নামকরণ পদ্ধতি এবং গুরুত্বপূর্ণ জৈব যৌগের প্রস্তুতি প্রণালী।',
            fileUrl: '/pdfs/chemistry/organic-reactions.pdf',
            fileSize: '4.2',
            pages: 78,
            createdAt: '2024-01-01'
        },

        // Biology Chapter 1 - Cell Biology (2 PDFs)
        {
            id: 'pdf-biology-1-1',
            chapterId: 'biology-1',
            title: 'কোষবিজ্ঞান - গঠন ও কার্যাবলী',
            titleEn: 'Cell Biology - Structure & Functions',
            description: 'কোষের গঠন, বিভিন্ন কোষাংশের কার্যাবলী, প্রাণী ও উদ্ভিদ কোষের পার্থক্য এবং কোষঝিল্লির গঠন ও কার্যপ্রণালী।',
            fileUrl: '/pdfs/biology/cell-structure.pdf',
            fileSize: '4.1',
            pages: 82,
            createdAt: '2024-01-01'
        },
        {
            id: 'pdf-biology-1-2',
            chapterId: 'biology-1',
            title: 'কোষ বিভাজন ও জিনতত্ত্ব',
            titleEn: 'Cell Division & Genetics',
            description: 'মাইটোসিস ও মিয়োসিস কোষ বিভাজন, DNA ও RNA এর গঠন, প্রোটিন সংশ্লেষণ এবং বংশগতির মৌলিক নিয়মাবলী।',
            fileUrl: '/pdfs/biology/cell-division.pdf',
            fileSize: '3.7',
            pages: 68,
            createdAt: '2024-01-01'
        },

        // Bengali Chapter 1 - Poetry (2 PDFs)
        {
            id: 'pdf-bangla-1-1',
            chapterId: 'bangla-1',
            title: 'বাংলা কবিতা - বিশ্লেষণ ও ব্যাখ্যা',
            titleEn: 'Bengali Poetry - Analysis & Explanation',
            description: 'পাঠ্যবইয়ের সকল কবিতার বিস্তারিত বিশ্লেষণ, কবি পরিচিতি, কবিতার মূলভাব, ভাষা ও ছন্দের ব্যবহার এবং সাহিত্যিক গুণাবলী।',
            fileUrl: '/pdfs/bangla/poetry-analysis.pdf',
            fileSize: '3.5',
            pages: 65,
            createdAt: '2024-01-01'
        },
        {
            id: 'pdf-bangla-1-2',
            chapterId: 'bangla-1',
            title: 'ছন্দ ও অলংকার শাস্ত্র',
            titleEn: 'Prosody & Rhetoric',
            description: 'বাংলা ছন্দের প্রকারভেদ, মাত্রা গণনা, অলংকারের ব্যবহার এবং কবিতা রচনার কৌশল। রয়েছে বিভিন্ন ছন্দের উদাহরণ ও অনুশীলনী।',
            fileUrl: '/pdfs/bangla/prosody-rhetoric.pdf',
            fileSize: '2.9',
            pages: 52,
            createdAt: '2024-01-01'
        },

        // English Chapter 1 - Grammar (2 PDFs)
        {
            id: 'pdf-english-1-1',
            chapterId: 'english-1',
            title: 'English Grammar - Complete Guide',
            titleEn: 'English Grammar - Complete Guide',
            description: 'Comprehensive English grammar covering all tenses, parts of speech, sentence structure, active-passive voice, direct-indirect speech with detailed explanations and examples.',
            fileUrl: '/pdfs/english/grammar-complete.pdf',
            fileSize: '4.8',
            pages: 98,
            createdAt: '2024-01-01'
        },
        {
            id: 'pdf-english-1-2',
            chapterId: 'english-1',
            title: 'Grammar Exercises & Practice Tests',
            titleEn: 'Grammar Exercises & Practice Tests',
            description: 'Extensive collection of grammar exercises, practice tests, and mock exams. Includes 500+ questions with detailed answers and explanations for better understanding.',
            fileUrl: '/pdfs/english/grammar-exercises.pdf',
            fileSize: '3.6',
            pages: 75,
            createdAt: '2024-01-01'
        }
    ],
    selectedSubject: null,
    selectedChapter: null,
    loading: false,
    error: null
};

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSelectedSubject: (state, action: PayloadAction<Subject | null>) => {
            state.selectedSubject = action.payload;
        },
        setSelectedChapter: (state, action: PayloadAction<Chapter | null>) => {
            state.selectedChapter = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { setSelectedSubject, setSelectedChapter, setLoading, setError } = subjectSlice.actions;
export default subjectSlice.reducer;