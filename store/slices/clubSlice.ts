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
            id: 'science-club',
            name: 'বিজ্ঞান ক্লাব',
            nameEn: 'Science Club',
            description: 'বিজ্ঞানের বিভিন্ন বিষয়ে গবেষণা, পরীক্ষা-নিরীক্ষা এবং প্রযুক্তিগত উন্নয়নে কাজ করে। আমাদের লক্ষ্য শিক্ষার্থীদের মধ্যে বৈজ্ঞানিক চিন্তাভাবনা ও গবেষণার মনোভাব গড়ে তোলা।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'বার্ষিক বিজ্ঞান মেলা আয়োজন',
                'গবেষণা প্রকল্প ও উদ্ভাবনী কাজ',
                'ল্যাবরেটরি কার্যক্রম ও পরীক্ষা',
                'বিজ্ঞান প্রতিযোগিতা ও অলিম্পিয়াড',
                'বৈজ্ঞানিক সেমিনার ও ওয়ার্কশপ',
                'প্রকৃতি পর্যবেক্ষণ ও ফিল্ড ট্রিপ'
            ],
            notices: [
                {
                    id: 'science-notice-1',
                    title: 'বিজ্ঞান মেলা ২০২৪ - প্রকল্প জমা দেওয়ার শেষ তারিখ',
                    content: 'আগামী ১৫ মার্চ বার্ষিক বিজ্ঞান মেলা অনুষ্ঠিত হবে। সকল সদস্যদের প্রকল্প জমা দেওয়ার শেষ তারিখ ২৮ ফেব্রুয়ারি। বিস্তারিত তথ্যের জন্য ক্লাব রুমে যোগাযোগ করুন।',
                    date: '2024-02-15',
                    isImportant: true
                },
                {
                    id: 'science-notice-2',
                    title: 'জাতীয় বিজ্ঞান অলিম্পিয়াড প্রস্তুতি ক্লাস',
                    content: 'জাতীয় বিজ্ঞান অলিম্পিয়াডের জন্য বিশেষ প্রস্তুতি ক্লাস শুরু হয়েছে। প্রতি শনিবার সকাল ১০টায় পদার্থবিজ্ঞান ল্যাবে। আগ্রহী শিক্ষার্থীরা নাম নিবন্ধন করুন।',
                    date: '2024-02-10',
                    isImportant: false
                },
                {
                    id: 'science-notice-3',
                    title: 'রোবটিক্স ওয়ার্কশপ',
                    content: 'আগামী সপ্তাহে রোবটিক্স ওয়ার্কশপ অনুষ্ঠিত হবে। Arduino এবং Raspberry Pi নিয়ে হ্যান্ডস-অন প্রজেক্ট থাকবে। সীমিত আসন, তাড়াতাড়ি নিবন্ধন করুন।',
                    date: '2024-02-08',
                    isImportant: true
                }
            ],
            gallery: [
                {
                    id: 'science-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'বিজ্ঞান মেলা ২০২৩ - পুরস্কার বিতরণী',
                    description: 'বার্ষিক বিজ্ঞান মেলায় বিজয়ী প্রকল্পের পুরস্কার বিতরণী অনুষ্ঠান',
                    createdAt: '2024-01-15'
                },
                {
                    id: 'science-gallery-2',
                    type: 'photo',
                    url: '/assets/images/menu-heade.jpg',
                    title: 'রসায়ন ল্যাব পরীক্ষা',
                    description: 'শিক্ষার্থীরা রসায়ন ল্যাবে বিভিন্ন পরীক্ষা-নিরীক্ষা করছে',
                    createdAt: '2024-01-10'
                },
                {
                    id: 'science-gallery-3',
                    type: 'video',
                    url: '/videos/science-fair-2023.mp4',
                    title: 'বিজ্ঞান মেলা ২০২৩ হাইলাইটস',
                    description: 'বিজ্ঞান মেলার সেরা মুহূর্তগুলোর ভিডিও',
                    createdAt: '2024-01-05'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'debate-club',
            name: 'বিতর্ক ক্লাব',
            nameEn: 'Debate Club',
            description: 'বিতর্ক এবং বক্তৃতার মাধ্যমে যুক্তিবাদী চিন্তাভাবনা বিকাশ করা। শিক্ষার্থীদের আত্মবিশ্বাস বৃদ্ধি, যুক্তি প্রদানের দক্ষতা এবং পাবলিক স্পিকিং এর ক্ষমতা উন্নয়ন করাই আমাদের মূল লক্ষ্য।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'সাপ্তাহিক বিতর্ক প্রতিযোগিতা',
                'বক্তৃতা ও উপস্থাপনা প্রশিক্ষণ',
                'আন্তঃবিদ্যালয় বিতর্ক প্রতিযোগিতা',
                'পাবলিক স্পিকিং ওয়ার্কশপ',
                'মক পার্লামেন্ট সেশন',
                'জাতীয় ও আন্তর্জাতিক বিষয়ে আলোচনা'
            ],
            notices: [
                {
                    id: 'debate-notice-1',
                    title: 'জাতীয় বিতর্ক প্রতিযোগিতা ২০২৪',
                    content: 'জাতীয় বিতর্ক প্রতিযোগিতায় অংশগ্রহণের জন্য নিবন্ধন চলছে। আগ্রহী শিক্ষার্থীরা আগামী ২৫ ফেব্রুয়ারির মধ্যে নাম নিবন্ধন করুন। প্রাথমিক বাছাই পরীক্ষা ৩ মার্চ।',
                    date: '2024-02-18',
                    isImportant: true
                },
                {
                    id: 'debate-notice-2',
                    title: 'সাপ্তাহিক বিতর্ক - "কৃত্রিম বুদ্ধিমত্তা: সুবিধা নাকি হুমকি?"',
                    content: 'এই শুক্রবার সন্ধ্যা ৬টায় অডিটোরিয়ামে সাপ্তাহিক বিতর্ক অনুষ্ঠিত হবে। বিষয়: "কৃত্রিম বুদ্ধিমত্তা মানবজাতির জন্য সুবিধা নাকি হুমকি?" সকলের উপস্থিতি কাম্য।',
                    date: '2024-02-12',
                    isImportant: false
                },
                {
                    id: 'debate-notice-3',
                    title: 'বক্তৃতা প্রশিক্ষণ কর্মশালা',
                    content: 'নতুন সদস্যদের জন্য বিশেষ বক্তৃতা প্রশিক্ষণ কর্মশালা। প্রতি মঙ্গলবার ও বৃহস্পতিবার বিকাল ৪টায়। বিশেষজ্ঞ প্রশিক্ষকদের তত্ত্বাবধানে।',
                    date: '2024-02-05',
                    isImportant: false
                }
            ],
            gallery: [
                {
                    id: 'debate-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'আন্তঃবিদ্যালয় বিতর্ক প্রতিযোগিতা',
                    description: 'আন্তঃবিদ্যালয় বিতর্ক প্রতিযোগিতায় আমাদের দলের অংশগ্রহণ',
                    createdAt: '2024-01-20'
                },
                {
                    id: 'debate-gallery-2',
                    type: 'photo',
                    url: '/assets/images/menu-heade.jpg',
                    title: 'পাবলিক স্পিকিং ওয়ার্কশপ',
                    description: 'বিশেষজ্ঞ প্রশিক্ষকের তত্ত্বাবধানে পাবলিক স্পিকিং প্রশিক্ষণ',
                    createdAt: '2024-01-15'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'cultural-club',
            name: 'সাংস্কৃতিক ক্লাব',
            nameEn: 'Cultural Club',
            description: 'বাংলার ঐতিহ্যবাহী সংস্কৃতি ও শিল্পকলার চর্চা ও প্রসার। নাচ, গান, নাটক, আবৃত্তি এবং বিভিন্ন সাংস্কৃতিক কার্যক্রমের মাধ্যমে শিক্ষার্থীদের সৃজনশীলতা ও শিল্পবোধ বিকাশ করা।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'বার্ষিক সাংস্কৃতিক অনুষ্ঠান',
                'নাটক ও নৃত্য প্রশিক্ষণ',
                'সঙ্গীত ও আবৃত্তি ক্লাস',
                'শিল্প প্রদর্শনী ও চিত্রাঙ্কন',
                'ঐতিহ্যবাহী উৎসব পালন',
                'সাহিত্য আড্ডা ও কবিতা পাঠ'
            ],
            notices: [
                {
                    id: 'cultural-notice-1',
                    title: 'বসন্ত উৎসব ২০২ৄ - অংশগ্রহণের আমন্ত্রণ',
                    content: 'আগামী ১৪ ফেব্রুয়ারি বসন্ত উৎসব পালিত হবে। নাচ, গান, আবৃত্তি ও চিত্রাঙ্কন প্রতিযোগিতা থাকবে। আগ্রহী শিক্ষার্থীরা ১০ ফেব্রুয়ারির মধ্যে নাম নিবন্ধন করুন।',
                    date: '2024-02-08',
                    isImportant: true
                },
                {
                    id: 'cultural-notice-2',
                    title: 'নাটক "রক্তকরবী" এর রিহার্সাল',
                    content: 'রবীন্দ্রনাথের "রক্তকরবী" নাটকের রিহার্সাল প্রতিদিন বিকাল ৫টায় অডিটোরিয়ামে। নতুন শিল্পীদের অডিশনের সুযোগ রয়েছে।',
                    date: '2024-02-05',
                    isImportant: false
                },
                {
                    id: 'cultural-notice-3',
                    title: 'একুশে ফেব্রুয়ারি সাংস্কৃতিক অনুষ্ঠান',
                    content: 'আন্তর্জাতিক মাতৃভাষা দিবস উপলক্ষে বিশেষ সাংস্কৃতিক অনুষ্ঠান। দেশাত্মবোধক গান, কবিতা আবৃত্তি ও নৃত্য পরিবেশনা থাকবে।',
                    date: '2024-02-15',
                    isImportant: true
                }
            ],
            gallery: [
                {
                    id: 'cultural-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান ২০২৩',
                    description: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠানে নৃত্য পরিবেশনা',
                    createdAt: '2024-01-25'
                },
                {
                    id: 'cultural-gallery-2',
                    type: 'video',
                    url: '/videos/cultural-program.mp4',
                    title: 'পহেলা বৈশাখ উৎসব',
                    description: 'পহেলা বৈশাখ উৎসবের সাংস্কৃতিক অনুষ্ঠান',
                    createdAt: '2024-01-20'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'sports-club',
            name: 'ক্রীড়া ক্লাব',
            nameEn: 'Sports Club',
            description: 'খেলাধুলা এবং শারীরিক সুস্থতার জন্য বিভিন্ন ক্রীড়া কার্যক্রম পরিচালনা। শিক্ষার্থীদের মধ্যে দলীয় চেতনা, নেতৃত্ব এবং সুস্বাস্থ্য বজায় রাখার জন্য নিয়মিত খেলাধুলার আয়োজন করা।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'আন্তঃক্লাস ফুটবল টুর্নামেন্ট',
                'ক্রিকেট ম্যাচ ও প্রশিক্ষণ',
                'অ্যাথলেটিক্স ও ট্র্যাক ইভেন্ট',
                'ব্যাডমিন্টন ও টেবিল টেনিস',
                'বার্ষিক ক্রীড়া প্রতিযোগিতা',
                'ফিটনেস ও যোগব্যায়াম ক্লাস'
            ],
            notices: [
                {
                    id: 'sports-notice-1',
                    title: 'আন্তঃক্লাস ফুটবল টুর্নামেন্ট ২০২৪',
                    content: 'আগামী সপ্তাহে আন্তঃক্লাস ফুটবল টুর্নামেন্ট শুরু হবে। প্রতিটি ক্লাস থেকে একটি করে দল অংশগ্রহণ করতে পারবে। নিবন্ধনের শেষ তারিখ ২২ ফেব্রুয়ারি।',
                    date: '2024-02-20',
                    isImportant: true
                },
                {
                    id: 'sports-notice-2',
                    title: 'জেলা ক্রীড়া প্রতিযোগিতায় নির্বাচন',
                    content: 'জেলা পর্যায়ের ক্রীড়া প্রতিযোগিতায় অংশগ্রহণের জন্য খেলোয়াড় নির্বাচন চলছে। আগ্রহী শিক্ষার্থীরা খেলার মাঠে যোগাযোগ করুন।',
                    date: '2024-02-15',
                    isImportant: false
                },
                {
                    id: 'sports-notice-3',
                    title: 'সকালের ব্যায়াম ও যোগাসন ক্লাস',
                    content: 'প্রতিদিন সকাল ৬টায় খেলার মাঠে ব্যায়াম ও যোগাসন ক্লাস। সকল শিক্ষার্থী ও শিক্ষকদের অংশগ্রহণের আমন্ত্রণ।',
                    date: '2024-02-10',
                    isImportant: false
                }
            ],
            gallery: [
                {
                    id: 'sports-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৩',
                    description: 'বার্ষিক ক্রীড়া প্রতিযোগিতায় পুরস্কার বিতরণী',
                    createdAt: '2024-01-30'
                },
                {
                    id: 'sports-gallery-2',
                    type: 'photo',
                    url: '/assets/images/menu-heade.jpg',
                    title: 'ফুটবল টুর্নামেন্ট ফাইনাল',
                    description: 'আন্তঃক্লাস ফুটবল টুর্নামেন্টের ফাইনাল ম্যাচ',
                    createdAt: '2024-01-25'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'computer-club',
            name: 'কম্পিউটার ক্লাব',
            nameEn: 'Computer Club',
            description: 'তথ্য প্রযুক্তি ও কম্পিউটার বিজ্ঞানের বিভিন্ন বিষয়ে শিক্ষা ও গবেষণা। প্রোগ্রামিং, ওয়েব ডেভেলপমেন্ট, গ্রাফিক্স ডিজাইন এবং সাইবার নিরাপত্তা বিষয়ে প্রশিক্ষণ প্রদান।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'প্রোগ্রামিং প্রতিযোগিতা ও হ্যাকাথন',
                'ওয়েব ডেভেলপমেন্ট ওয়ার্কশপ',
                'গ্রাফিক্স ডিজাইন প্রশিক্ষণ',
                'সাইবার নিরাপত্তা সেমিনার',
                'রোবটিক্স ও AI প্রকল্প',
                'ডিজিটাল মার্কেটিং কোর্স'
            ],
            notices: [
                {
                    id: 'computer-notice-1',
                    title: 'প্রোগ্রামিং প্রতিযোগিতা ২০২৪',
                    content: 'আগামী মাসে জাতীয় প্রোগ্রামিং প্রতিযোগিতা অনুষ্ঠিত হবে। C++, Java, Python এ সমস্যা সমাধান থাকবে। প্রস্তুতির জন্য বিশেষ ক্লাস শুরু হয়েছে।',
                    date: '2024-02-22',
                    isImportant: true
                },
                {
                    id: 'computer-notice-2',
                    title: 'ওয়েব ডেভেলপমেন্ট বুটক্যাম্প',
                    content: 'HTML, CSS, JavaScript এবং React নিয়ে ৩০ দিনের ইনটেনসিভ বুটক্যাম্প। সার্টিফিকেট প্রদান করা হবে। সীমিত আসন।',
                    date: '2024-02-18',
                    isImportant: false
                },
                {
                    id: 'computer-notice-3',
                    title: 'সাইবার নিরাপত্তা সপ্তাহ',
                    content: 'সাইবার নিরাপত্তা সচেতনতা সপ্তাহ পালিত হবে। বিশেষজ্ঞদের বক্তব্য, ওয়ার্কশপ এবং প্রদর্শনী থাকবে।',
                    date: '2024-02-12',
                    isImportant: true
                }
            ],
            gallery: [
                {
                    id: 'computer-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'প্রোগ্রামিং প্রতিযোগিতা ২০২৩',
                    description: 'জাতীয় প্রোগ্রামিং প্রতিযোগিতায় আমাদের দলের সাফল্য',
                    createdAt: '2024-02-01'
                },
                {
                    id: 'computer-gallery-2',
                    type: 'photo',
                    url: '/assets/images/menu-heade.jpg',
                    title: 'রোবটিক্স ওয়ার্কশপ',
                    description: 'Arduino ও Raspberry Pi নিয়ে হ্যান্ডস-অন প্রজেক্ট',
                    createdAt: '2024-01-28'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'literature-club',
            name: 'সাহিত্য ক্লাব',
            nameEn: 'Literature Club',
            description: 'বাংলা ও ইংরেজি সাহিত্যের চর্চা ও আলোচনা। কবিতা, গল্প, উপন্যাস পাঠ এবং সৃজনশীল লেখালেখির মাধ্যমে শিক্ষার্থীদের সাহিত্যিক রুচিবোধ ও লেখার দক্ষতা বিকাশ।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'সাহিত্য আড্ডা ও বই পর্যালোচনা',
                'কবিতা আবৃত্তি ও লেখা প্রতিযোগিতা',
                'গল্প ও প্রবন্ধ রচনা কর্মশালা',
                'বিখ্যাত লেখকদের জীবনী আলোচনা',
                'সাহিত্য পত্রিকা প্রকাশনা',
                'বই মেলা ও পুস্তক প্রদর্শনী'
            ],
            notices: [
                {
                    id: 'literature-notice-1',
                    title: 'একুশের বই মেলা ২০২৪',
                    content: 'একুশে ফেব্রুয়ারি উপলক্ষে বিশেষ বই মেলার আয়োজন। স্থানীয় লেখক ও প্রকাশকদের অংশগ্রহণ থাকবে। বই পড়া প্রতিযোগিতা ও আলোচনা সভা অনুষ্ঠিত হবে।',
                    date: '2024-02-21',
                    isImportant: true
                },
                {
                    id: 'literature-notice-2',
                    title: 'কবিতা লেখা প্রতিযোগিতা',
                    content: 'বসন্ত ঋতু নিয়ে কবিতা লেখা প্রতিযোগিতা। বিজয়ীদের কবিতা ক্লাব ম্যাগাজিনে প্রকাশিত হবে। জমা দেওয়ার শেষ তারিখ ২৮ ফেব্রুয়ারি।',
                    date: '2024-02-15',
                    isImportant: false
                },
                {
                    id: 'literature-notice-3',
                    title: 'রবীন্দ্র জয়ন্তী উৎসব',
                    content: 'কবিগুরু রবীন্দ্রনাথ ঠাকুরের জন্মবার্ষিকী উপলক্ষে বিশেষ অনুষ্ঠান। রবীন্দ্র সংগীত, কবিতা আবৃত্তি ও নাটক পরিবেশনা থাকবে।',
                    date: '2024-02-10',
                    isImportant: true
                }
            ],
            gallery: [
                {
                    id: 'literature-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'সাহিত্য আড্ডা',
                    description: 'মাসিক সাহিত্য আড্ডায় বই পর্যালোচনা',
                    createdAt: '2024-02-05'
                },
                {
                    id: 'literature-gallery-2',
                    type: 'photo',
                    url: '/assets/images/menu-heade.jpg',
                    title: 'কবিতা আবৃত্তি প্রতিযোগিতা',
                    description: 'বার্ষিক কবিতা আবৃত্তি প্রতিযোগিতার একটি দৃশ্য',
                    createdAt: '2024-01-30'
                }
            ],
            createdAt: '2024-01-01'
        },
        {
            id: 'environment-club',
            name: 'পরিবেশ ক্লাব',
            nameEn: 'Environment Club',
            description: 'পরিবেশ সংরক্ষণ ও সচেতনতা বৃদ্ধির কাজ। বৃক্ষরোপণ, পরিচ্ছন্নতা অভিযান, পরিবেশ বিষয়ক গবেষণা এবং সবুজ পৃথিবী গড়ার লক্ষ্যে বিভিন্ন কার্যক্রম পরিচালনা।',
            image: '/assets/images/hero-education.jpg',
            activities: [
                'বৃক্ষরোপণ ও বাগান পরিচর্যা',
                'পরিচ্ছন্নতা অভিযান ও প্লাস্টিক মুক্ত ক্যাম্পেইন',
                'পরিবেশ বিষয়ক সেমিনার ও ওয়ার্কশপ',
                'পুনর্ব্যবহার প্রকল্প ও উদ্ভাবন',
                'প্রকৃতি পর্যবেক্ষণ ও ফটোগ্রাফি',
                'জলবায়ু পরিবর্তন সচেতনতা কর্মসূচি'
            ],
            notices: [
                {
                    id: 'environment-notice-1',
                    title: 'বিশ্ব পরিবেশ দিবস ২০২৪',
                    content: 'বিশ্ব পরিবেশ দিবস উপলক্ষে বিশেষ কর্মসূচি। বৃক্ষরোপণ, পরিচ্ছন্নতা অভিযান এবং পরিবেশ বিষয়ক প্রদর্শনী থাকবে। সকলের অংশগ্রহণ কাম্য।',
                    date: '2024-02-25',
                    isImportant: true
                },
                {
                    id: 'environment-notice-2',
                    title: 'প্লাস্টিক মুক্ত ক্যাম্পাস অভিযান',
                    content: 'ক্যাম্পাসকে প্লাস্টিক মুক্ত রাখার জন্য বিশেষ অভিযান। পুনর্ব্যবহারযোগ্য ব্যাগ বিতরণ ও সচেতনতা কর্মসূচি চালু হয়েছে।',
                    date: '2024-02-20',
                    isImportant: false
                },
                {
                    id: 'environment-notice-3',
                    title: 'জৈব বাগান প্রকল্প',
                    content: 'ক্যাম্পাসে জৈব সবজি বাগান তৈরির প্রকল্প শুরু হয়েছে। আগ্রহী শিক্ষার্থীরা যোগ দিতে পারেন। প্রতি সপ্তাহে বাগান পরিচর্যার কাজ থাকবে।',
                    date: '2024-02-12',
                    isImportant: false
                }
            ],
            gallery: [
                {
                    id: 'environment-gallery-1',
                    type: 'photo',
                    url: '/assets/images/hero-education.jpg',
                    title: 'বৃক্ষরোপণ কর্মসূচি',
                    description: 'ক্যাম্পাসে বৃক্ষরোপণ কর্মসূচিতে শিক্ষার্থীদের অংশগ্রহণ',
                    createdAt: '2024-02-08'
                },
                {
                    id: 'environment-gallery-2',
                    type: 'photo',
                    url: '/assets/images/menu-heade.jpg',
                    title: 'পরিচ্ছন্নতা অভিযান',
                    description: 'স্থানীয় এলাকায় পরিচ্ছন্নতা অভিযানে ক্লাব সদস্যরা',
                    createdAt: '2024-02-03'
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