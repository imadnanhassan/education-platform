'use client';
import React, { useState } from 'react';
import Card from '@/components/ui/Card';

const GalleryPage = () => {
    const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

    const photos = [
        {
            id: 1,
            title: 'বিজ্ঞান মেলা ২০২৩',
            category: 'একাডেমিক',
            image: '/assets/images/gallery/science-fair-1.jpg',
            date: '২০২৩-১২-১৫'
        },
        {
            id: 2,
            title: 'সাংস্কৃতিক অনুষ্ঠান',
            category: 'সাংস্কৃতিক',
            image: '/assets/images/gallery/cultural-1.jpg',
            date: '২০২৩-১১-২০'
        },
        {
            id: 3,
            title: 'ক্রীড়া প্রতিযোগিতা',
            category: 'ক্রীড়া',
            image: '/assets/images/gallery/sports-1.jpg',
            date: '২০২৩-১০-১০'
        },
        {
            id: 4,
            title: 'বিতর্ক প্রতিযোগিতা',
            category: 'একাডেমিক',
            image: '/assets/images/gallery/debate-1.jpg',
            date: '২০২৩-০৯-২৫'
        },
        {
            id: 5,
            title: 'শিক্ষা সফর',
            category: 'শিক্ষামূলক',
            image: '/assets/images/gallery/educational-tour-1.jpg',
            date: '২০২৩-০৮-১৫'
        },
        {
            id: 6,
            title: 'পুরস্কার বিতরণী',
            category: 'অনুষ্ঠান',
            image: '/assets/images/gallery/award-ceremony-1.jpg',
            date: '২০২ৃ-০৭-৩০'
        },
        {
            id: 7,
            title: 'ক্লাস কার্যক্রম',
            category: 'একাডেমিক',
            image: '/assets/images/gallery/classroom-1.jpg',
            date: '২০২৩-০৬-২০'
        },
        {
            id: 8,
            title: 'গ্র্যাজুয়েশন সেরেমনি',
            category: 'অনুষ্ঠান',
            image: '/assets/images/gallery/graduation-1.jpg',
            date: '২০২৩-০৫-১৫'
        }
    ];

    const videos = [
        {
            id: 1,
            title: 'গ্র্যাভিটন একাডেমি পরিচিতি',
            category: 'প্রাতিষ্ঠানিক',
            thumbnail: '/assets/images/gallery/video-thumb-1.jpg',
            duration: '৩:৪৫',
            date: '২০২৩-১২-০১'
        },
        {
            id: 2,
            title: 'বিজ্ঞান মেলার হাইলাইটস',
            category: 'একাডেমিক',
            thumbnail: '/assets/images/gallery/video-thumb-2.jpg',
            duration: '৫:২০',
            date: '২০২৩-১১-১৫'
        },
        {
            id: 3,
            title: 'সাংস্কৃতিক অনুষ্ঠানের পারফরম্যান্স',
            category: 'সাংস্কৃতিক',
            thumbnail: '/assets/images/gallery/video-thumb-3.jpg',
            duration: '৭:১০',
            date: '২০২৩-১০-২৫'
        },
        {
            id: 4,
            title: 'শিক্ষার্থীদের সাফল্যের গল্প',
            category: 'অনুপ্রেরণামূলক',
            thumbnail: '/assets/images/gallery/video-thumb-4.jpg',
            duration: '৪:৩০',
            date: '২০২৩-০৯-১০'
        }
    ];

    const categories = ['সকল', 'একাডেমিক', 'সাংস্কৃতিক', 'ক্রীড়া', 'শিক্ষামূলক', 'অনুষ্ঠান'];
    const [selectedCategory, setSelectedCategory] = useState('সকল');

    const filteredPhotos = selectedCategory === 'সকল' 
        ? photos 
        : photos.filter(photo => photo.category === selectedCategory);

    const filteredVideos = selectedCategory === 'সকল' 
        ? videos 
        : videos.filter(video => video.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                            ফটো ও ভিডিও গ্যালারি
                        </h1>
                        <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                            আমাদের প্রতিষ্ঠানের বিভিন্ন কার্যক্রম ও অনুষ্ঠানের স্মৃতিচারণ
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs and Filters */}
            <div className="bg-white border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Tabs */}
                        <div className="flex rounded-lg bg-gray-100 p-1">
                            <button
                                onClick={() => setActiveTab('photos')}
                                className={`flex-1 py-2 px-6 text-sm font-medium rounded-md transition-colors ${
                                    activeTab === 'photos'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                ফটো গ্যালারি
                            </button>
                            <button
                                onClick={() => setActiveTab('videos')}
                                className={`flex-1 py-2 px-6 text-sm font-medium rounded-md transition-colors ${
                                    activeTab === 'videos'
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                ভিডিও গ্যালারি
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {activeTab === 'photos' ? (
                    /* Photo Gallery */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPhotos.map((photo) => (
                            <Card key={photo.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden p-0">
                                <div className="aspect-w-4 aspect-h-3">
                                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative overflow-hidden rounded-t-lg">
                                        <div className="text-4xl opacity-30">📸</div>
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {photo.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                                            {photo.category}
                                        </span>
                                        <span>{photo.date}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Video Gallery */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((video) => (
                            <Card key={video.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden p-0">
                                <div className="aspect-w-16 aspect-h-9 relative">
                                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center relative overflow-hidden rounded-t-lg">
                                        <div className="text-4xl opacity-30">🎥</div>
                                        
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        {/* Duration Badge */}
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                                            {video.duration}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {video.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                                            {video.category}
                                        </span>
                                        <span>{video.date}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {((activeTab === 'photos' && filteredPhotos.length === 0) || 
                  (activeTab === 'videos' && filteredVideos.length === 0)) && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            কোন {activeTab === 'photos' ? 'ছবি' : 'ভিডিও'} পাওয়া যায়নি
                        </h3>
                        <p className="text-gray-500">
                            এই ক্যাটেগরিতে কোন {activeTab === 'photos' ? 'ছবি' : 'ভিডিও'} নেই।
                        </p>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">{photos.length}+</div>
                            <div className="text-gray-600">ছবি</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">{videos.length}+</div>
                            <div className="text-gray-600">ভিডিও</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">৫০+</div>
                            <div className="text-gray-600">অনুষ্ঠান</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary-600 mb-2">১০০+</div>
                            <div className="text-gray-600">স্মৃতি</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;