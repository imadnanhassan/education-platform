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
            id: '1',
            title: 'HSC সম্পূর্ণ কোর্স',
            titleEn: 'Complete HSC Course',
            description: 'উচ্চ মাধ্যমিক সার্টিফিকেট পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি',
            image: '/assets/images/courses/hsc-complete.jpg',
            price: 15000,
            duration: '2 বছর',
            level: 'intermediate',
            features: [
                'সকল বিষয়ের ক্লাস',
                'MCQ প্র্যাকটিস',
                'PDF নোটস',
                'ভিডিও লেকচার',
                'মডেল টেস্ট'
            ],
            isPopular: true,
            createdAt: '2024-01-01'
        },
        {
            id: '2',
            title: 'IELTS প্রস্তুতি',
            titleEn: 'IELTS Preparation',
            description: 'IELTS পরীক্ষার জন্য সম্পূর্ণ প্রস্তুতি কোর্স',
            image: '/assets/images/courses/ielts.jpg',
            price: 8000,
            duration: '6 মাস',
            level: 'intermediate',
            features: [
                'Listening Practice',
                'Reading Comprehension',
                'Writing Tasks',
                'Speaking Practice',
                'Mock Tests'
            ],
            isPopular: true,
            createdAt: '2024-01-01'
        },
        {
            id: '3',
            title: 'SAT প্রস্তুতি',
            titleEn: 'SAT Preparation',
            description: 'SAT পরীক্ষার জন্য Math এবং English প্রস্তুতি',
            image: '/assets/images/courses/sat.jpg',
            price: 12000,
            duration: '8 মাস',
            level: 'advanced',
            features: [
                'Math Section',
                'English Section',
                'Practice Tests',
                'Vocabulary Building',
                'Test Strategies'
            ],
            isPopular: false,
            createdAt: '2024-01-01'
        },
        {
            id: '4',
            title: 'অলিম্পিয়াড প্রস্তুতি',
            titleEn: 'Olympiad Preparation',
            description: 'বিভিন্ন অলিম্পিয়াড প্রতিযোগিতার জন্য প্রস্তুতি',
            image: '/assets/images/courses/olympiad.jpg',
            price: 10000,
            duration: '1 বছর',
            level: 'advanced',
            features: [
                'Math Olympiad',
                'Physics Olympiad',
                'Chemistry Olympiad',
                'Problem Solving',
                'Competition Strategy'
            ],
            isPopular: false,
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