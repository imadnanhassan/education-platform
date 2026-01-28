import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject, Chapter, MCQ } from '../types';

interface SubjectState {
    subjects: Subject[];
    chapters: Chapter[];
    mcqs: MCQ[];
    selectedSubject: Subject | null;
    selectedChapter: Chapter | null;
    loading: boolean;
    error: string | null;
}

const initialState: SubjectState = {
    subjects: [
        {
            id: '1',
            name: 'গণিত',
            nameEn: 'Mathematics',
            description: 'উচ্চ মাধ্যমিক গণিত কোর্স',
            image: '/assets/images/subjects/math.jpg',
            totalChapters: 12,
            createdAt: '2024-01-01'
        },
        {
            id: '2',
            name: 'পদার্থবিজ্ঞান',
            nameEn: 'Physics',
            description: 'উচ্চ মাধ্যমিক পদার্থবিজ্ঞান কোর্স',
            image: '/assets/images/subjects/physics.jpg',
            totalChapters: 10,
            createdAt: '2024-01-01'
        },
        {
            id: '3',
            name: 'রসায়ন',
            nameEn: 'Chemistry',
            description: 'উচ্চ মাধ্যমিক রসায়ন কোর্স',
            image: '/assets/images/subjects/chemistry.jpg',
            totalChapters: 8,
            createdAt: '2024-01-01'
        },
        {
            id: '4',
            name: 'জীববিজ্ঞান',
            nameEn: 'Biology',
            description: 'উচ্চ মাধ্যমিক জীববিজ্ঞান কোর্স',
            image: '/assets/images/subjects/biology.jpg',
            totalChapters: 15,
            createdAt: '2024-01-01'
        }
    ],
    chapters: [
        // Math chapters
        {
            id: '1',
            subjectId: '1',
            name: 'ম্যাট্রিক্স ও নির্ণায়ক',
            nameEn: 'Matrix and Determinants',
            description: 'ম্যাট্রিক্স এবং নির্ণায়কের মৌলিক ধারণা',
            order: 1,
            mcqCount: 25,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        },
        {
            id: '2',
            subjectId: '1',
            name: 'সমীকরণ',
            nameEn: 'Equations',
            description: 'বিভিন্ন ধরনের সমীকরণ সমাধান',
            order: 2,
            mcqCount: 30,
            hasVideo: true,
            hasPdf: true,
            createdAt: '2024-01-01'
        }
    ],
    mcqs: [
        {
            id: '1',
            chapterId: '1',
            question: 'একটি 2×2 ম্যাট্রিক্সের নির্ণায়ক কীভাবে বের করা হয়?',
            options: [
                'ad - bc',
                'ac - bd',
                'ab - cd',
                'a + d - b - c'
            ],
            correctAnswer: 0,
            explanation: '2×2 ম্যাট্রিক্স [[a,b],[c,d]] এর নির্ণায়ক = ad - bc',
            difficulty: 'easy',
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