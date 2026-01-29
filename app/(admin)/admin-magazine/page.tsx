'use client';

import React, { useState } from 'react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import IconNotes from '@/components/icon/icon-notes';
import IconPlus from '@/components/icon/icon-plus';
import IconEye from '@/components/icon/icon-eye';
import IconEdit from '@/components/icon/icon-edit';
import IconTrash from '@/components/icon/icon-trash';
import IconDownload from '@/components/icon/icon-download';
import IconFilter from '@/components/icon/icon-filter';

const AdminMagazinePage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');

  // Dummy magazine data
  const magazines = [
    {
      id: '1',
      title: 'গ্রাভিটন ম্যাগাজিন - জানুয়ারি ২০২৪',
      titleEn: 'Graviton Magazine - January 2024',
      issue: 'ভলিউম ৫, সংখ্যা ১',
      publishDate: '2024-01-15',
      author: 'সম্পাদনা পরিষদ',
      category: 'Monthly',
      status: 'published',
      downloads: 245,
      pages: 32,
      fileSize: '15.2 MB',
      coverImage: '/assets/images/magazine/jan-2024-cover.jpg',
      description: 'নতুন বছরের বিশেষ সংখ্যা - শিক্ষার্থীদের সৃজনশীল লেখা ও কবিতা',
      articles: [
        'নতুন বছরের প্রত্যাশা - রাহুল আহমেদ',
        'বিজ্ঞানের অগ্রগতি - সারা খাতুন',
        'কবিতা: স্বপ্নের পথে - তানভীর হাসান'
      ],
    },
    {
      id: '2',
      title: 'বিজ্ঞান বিশেষ সংখ্যা',
      titleEn: 'Science Special Issue',
      issue: 'বিশেষ সংখ্যা ২০২৪',
      publishDate: '2024-01-10',
      author: 'বিজ্ঞান বিভাগ',
      category: 'Special',
      status: 'published',
      downloads: 189,
      pages: 48,
      fileSize: '22.8 MB',
      coverImage: '/assets/images/magazine/science-special-cover.jpg',
      description: 'বিজ্ঞান মেলার প্রকল্প ও গবেষণা নিয়ে বিশেষ সংখ্যা',
      articles: [
        'কৃত্রিম বুদ্ধিমত্তার ভবিষ্যৎ - ড. আহমেদ হাসান',
        'পরিবেশ ও প্রযুক্তি - প্রফেসর রহিমা খাতুন',
        'রোবটিক্স প্রকল্প - ফাতিমা আক্তার'
      ],
    },
    {
      id: '3',
      title: 'সাহিত্য সংকলন ২০২৩',
      titleEn: 'Literature Collection 2023',
      issue: 'বার্ষিক সংকলন',
      publishDate: '2023-12-20',
      author: 'সাহিত্য সংসদ',
      category: 'Annual',
      status: 'published',
      downloads: 312,
      pages: 64,
      fileSize: '18.5 MB',
      coverImage: '/assets/images/magazine/literature-2023-cover.jpg',
      description: '২০২৩ সালের সেরা কবিতা, গল্প ও প্রবন্ধের সংকলন',
      articles: [
        'গল্প: হারিয়ে যাওয়া দিন - নাফিস রহমান',
        'কবিতা: মুক্তির গান - আয়েশা সিদ্দিকা',
        'প্রবন্ধ: শিক্ষার গুরুত্ব - মোহাম্মদ করিম'
      ],
    },
    {
      id: '4',
      title: 'ক্রীড়া বিশেষ সংখ্যা',
      titleEn: 'Sports Special Issue',
      issue: 'ক্রীড়া সংখ্যা ২০২৪',
      publishDate: '2024-01-05',
      author: 'ক্রীড়া বিভাগ',
      category: 'Special',
      status: 'draft',
      downloads: 0,
      pages: 28,
      fileSize: '12.3 MB',
      coverImage: '/assets/images/magazine/sports-special-cover.jpg',
      description: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও খেলোয়াড়দের অর্জন নিয়ে',
      articles: [
        'ক্রিকেট চ্যাম্পিয়নশিপ - জামিল হোসেন',
        'ফুটবল টুর্নামেন্ট - রাকিব আহমেদ',
        'অ্যাথলেটিক্স রেকর্ড - সুমাইয়া খাতুন'
      ],
    },
    {
      id: '5',
      title: 'প্রযুক্তি ও ভবিষ্যৎ',
      titleEn: 'Technology and Future',
      issue: 'প্রযুক্তি সংখ্যা ১',
      publishDate: '2023-12-15',
      author: 'কম্পিউটার বিভাগ',
      category: 'Technical',
      status: 'published',
      downloads: 156,
      pages: 40,
      fileSize: '19.7 MB',
      coverImage: '/assets/images/magazine/tech-future-cover.jpg',
      description: 'আধুনিক প্রযুক্তি ও এর প্রভাব নিয়ে আলোচনা',
      articles: [
        'ব্লকচেইন প্রযুক্তি - আব্দুল করিম',
        'মোবাইল অ্যাপ ডেভেলপমেন্ট - সাদিয়া রহমান',
        'সাইবার নিরাপত্তা - হাসান আলী'
      ],
    },
  ];

  const filteredMagazines = statusFilter === 'all' 
    ? magazines 
    : magazines.filter(magazine => magazine.status === statusFilter);

  const getStatusVariant = (status: string) => {
    return status === 'published' ? 'success' : 'warning';
  };

  const getStatusText = (status: string) => {
    return status === 'published' ? 'প্রকাশিত' : 'খসড়া';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Monthly': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Special': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Annual': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Technical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const columns = [
    {
      key: 'title' as keyof typeof magazines[0],
      label: 'ম্যাগাজিনের তথ্য',
      render: (value: any, magazine: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{magazine.title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{magazine.issue}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{magazine.description}</p>
        </div>
      ),
    },
    {
      key: 'author' as keyof typeof magazines[0],
      label: 'লেখক ও প্রকাশনা',
      render: (value: any, magazine: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{magazine.author}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{magazine.publishDate}</p>
        </div>
      ),
    },
    {
      key: 'category' as keyof typeof magazines[0],
      label: 'ক্যাটেগরি',
      render: (value: any, magazine: any) => (
        <span className={`px-2 py-1 text-sm rounded-full ${getCategoryColor(magazine.category)}`}>
          {magazine.category}
        </span>
      ),
    },
    {
      key: 'pages' as keyof typeof magazines[0],
      label: 'পৃষ্ঠা ও আকার',
      render: (value: any, magazine: any) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{magazine.pages} পৃষ্ঠা</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{magazine.fileSize}</p>
        </div>
      ),
    },
    {
      key: 'downloads' as keyof typeof magazines[0],
      label: 'ডাউনলোড',
      render: (value: any, magazine: any) => (
        <div className="flex items-center space-x-2">
          <IconDownload className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{magazine.downloads}</span>
        </div>
      ),
    },
    {
      key: 'status' as keyof typeof magazines[0],
      label: 'অবস্থা',
      render: (value: any, magazine: any) => (
        <StatusBadge 
          status={getStatusText(magazine.status)} 
          variant={getStatusVariant(magazine.status)} 
        />
      ),
    },
  ];

  const stats = [
    { label: 'মোট ম্যাগাজিন', value: magazines.length, color: 'bg-blue-500' },
    { label: 'প্রকাশিত', value: magazines.filter(m => m.status === 'published').length, color: 'bg-green-500' },
    { label: 'মোট ডাউনলোড', value: magazines.reduce((sum, mag) => sum + mag.downloads, 0), color: 'bg-purple-500' },
    { label: 'খসড়া', value: magazines.filter(m => m.status === 'draft').length, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900/20">
            <IconNotes className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ম্যাগাজিন ব্যবস্থাপনা</h1>
            <p className="text-gray-600 dark:text-gray-400">ডিজিটাল ম্যাগাজিন প্রকাশনা ও বিতরণ</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <IconDownload className="w-4 h-4" />
            <span>রিপোর্ট</span>
          </button>
          <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            <IconPlus className="w-4 h-4" />
            <span>নতুন ম্যাগাজিন</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <IconNotes className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Articles Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">সাম্প্রতিক প্রবন্ধ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {magazines.slice(0, 3).map((magazine) => (
            <div key={magazine.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                <IconNotes className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{magazine.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{magazine.issue}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(magazine.category)}`}>
                  {magazine.category}
                </span>
                <span className="text-xs text-gray-500">{magazine.downloads} ডাউনলোড</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Magazine List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">ম্যাগাজিন তালিকা</h2>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <IconFilter className="w-4 h-4 text-gray-500" />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">সব অবস্থা</option>
                  <option value="published">প্রকাশিত</option>
                  <option value="draft">খসড়া</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <DataTable
          data={filteredMagazines}
          columns={columns}
          actions={[
            {
              label: 'বিস্তারিত',
              onClick: (magazine) => console.log('View magazine:', magazine),
              icon: <IconEye className="w-4 h-4" />,
              className: 'text-blue-600 hover:text-blue-900',
            },
            {
              label: 'ডাউনলোড',
              onClick: (magazine: any) => console.log('Download magazine:', magazine),
              icon: <IconDownload className="w-4 h-4" />,
              className: 'text-green-600 hover:text-green-900',
              condition: (magazine: any) => magazine.status === 'published',
            },
            {
              label: 'সম্পাদনা',
              onClick: (magazine) => console.log('Edit magazine:', magazine),
              icon: <IconEdit className="w-4 h-4" />,
              className: 'text-emerald-600 hover:text-emerald-900',
            },
            {
              label: 'মুছুন',
              onClick: (magazine) => console.log('Delete magazine:', magazine),
              icon: <IconTrash className="w-4 h-4" />,
              className: 'text-red-600 hover:text-red-900',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminMagazinePage;