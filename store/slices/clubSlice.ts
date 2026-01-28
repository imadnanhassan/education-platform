import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club } from '../types';

interface ClubState {
    clubs: Club[];
    selectedClub: Club | null;
    loading: boolean;
    error: string | null;
}

const initialState: ClubState = {
    clubs: [
        {
            id: '1',
            name: 'বিজ্ঞান ক্লাব',
            nameEn: 'Science Club',
            description: 'বিজ্ঞানের বিভিন্ন বিষয়ে গবেষণা এবং প্রযুক্তিগত উন্নয়নে কাজ করে',
            image: '/assets/images/clubs/science.jpg',
            activities: [
                'বিজ্ঞান মেলা আয়োজন',
                'গবেষণা প্রকল্প',
                'ল্যাবরেটরি কার্যক্রম',
                'বিজ্ঞান প্রতিযোগিতা'
            ],
            notices: [
                {
                    id: '1',
                    title: 'বিজ্ঞান মেলা ২০২৪',
                    content: 'আগামী মাসে বার্ষিক বিজ্ঞান মেলা অনুষ্ঠিত হবে। সকল সদস্যদের অংশগ্রহণ কাম্য।',
                    date: '2024-02-15',
                    isImportant: true
                }
            ],
            gallery: [
                {
                    id: '1',
                    type: 'photo',
                    url: '/assets/images/gallery/science1.jpg',
                    title: 'বিজ্ঞান মেলা ২০২৩',
                    createdAt: '2024-01-01'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: '2',
            name: 'ডিবেট ক্লাব',
            nameEn: 'Debate Club',
            description: 'বিতর্ক এবং বক্তৃতার মাধ্যমে যুক্তিবাদী চিন্তাভাবনা বিকাশ',
            image: '/assets/images/clubs/debate.jpg',
            activities: [
                'সাপ্তাহিক বিতর্ক প্রতিযোগিতা',
                'বক্তৃতা প্রশিক্ষণ',
                'আন্তঃবিদ্যালয় বিতর্ক',
                'পাবলিক স্পিকিং ওয়ার্কশপ'
            ],
            notices: [
                {
                    id: '2',
                    title: 'জাতীয় বিতর্ক প্রতিযোগিতা',
                    content: 'জাতীয় বিতর্ক প্রতিযোগিতায় অংশগ্রহণের জন্য নিবন্ধন চলছে।',
                    date: '2024-02-10',
                    isImportant: false
                }
            ],
            gallery: [
                {
                    id: '2',
                    type: 'photo',
                    url: '/assets/images/gallery/debate1.jpg',
                    title: 'বিতর্ক প্রতিযোগিতা',
                    createdAt: '2024-01-01'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: '3',
            name: 'সাংস্কৃতিক ক্লাব',
            nameEn: 'Cultural Club',
            description: 'সাংস্কৃতিক কার্যক্রম এবং শিল্পকলার চর্চা ও প্রসার',
            image: '/assets/images/clubs/cultural.jpg',
            activities: [
                'সাংস্কৃতিক অনুষ্ঠান',
                'নাটক ও নৃত্য',
                'সঙ্গীত প্রশিক্ষণ',
                'শিল্প প্রদর্শনী'
            ],
            notices: [
                {
                    id: '3',
                    title: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান',
                    content: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠানের প্রস্তুতি শুরু হয়েছে।',
                    date: '2024-02-05',
                    isImportant: true
                }
            ],
            gallery: [
                {
                    id: '3',
                    type: 'photo',
                    url: '/assets/images/gallery/cultural1.jpg',
                    title: 'সাংস্কৃতিক অনুষ্ঠান',
                    createdAt: '2024-01-01'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: '4',
            name: 'ক্রীড়া ক্লাব',
            nameEn: 'Sports Club',
            description: 'খেলাধুলা এবং শারীরিক সুস্থতার জন্য বিভিন্ন ক্রীড়া কার্যক্রম',
            image: '/assets/images/clubs/sports.jpg',
            activities: [
                'ফুটবল টুর্নামেন্ট',
                'ক্রিকেট ম্যাচ',
                'অ্যাথলেটিক্স প্রতিযোগিতা',
                'ইনডোর গেমস'
            ],
            notices: [
                {
                    id: '4',
                    title: 'আন্তঃক্লাস ফুটবল টুর্নামেন্ট',
                    content: 'আগামী সপ্তাহে আন্তঃক্লাস ফুটবল টুর্নামেন্ট শুরু হবে।',
                    date: '2024-02-12',
                    isImportant: false
                }
            ],
            gallery: [
                {
                    id: '4',
                    type: 'photo',
                    url: '/assets/images/gallery/sports1.jpg',
                    title: 'ক্রীড়া প্রতিযোগিতা',
                    createdAt: '2024-01-01'
                }
            ],
            createdAt: '2024-01-01'
        }
    ],
    selectedClub: null,
    loading: false,
    error: null
};

const clubSlice = createSlice({
    name: 'clubs',
    initialState,
    reducers: {
        setSelectedClub: (state, action: PayloadAction<Club | null>) => {
            state.selectedClub = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { setSelectedClub, setLoading, setError } = clubSlice.actions;
export default clubSlice.reducer;