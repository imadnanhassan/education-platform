'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconHome from '@/components/icon/icon-home';
import IconArrowForward from '@/components/icon/icon-arrow-forward';

interface BreadcrumbItem {
  label: string;
  labelEn: string;
  href?: string;
}

interface AdminBreadcrumbProps {
  items?: BreadcrumbItem[];
}

const AdminBreadcrumb: React.FC<AdminBreadcrumbProps> = ({ items }) => {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'ড্যাশবোর্ড', labelEn: 'Dashboard', href: '/dashboard' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip the first segment if it's 'dashboard'
      if (segment === 'dashboard') return;

      // Map common segments to Bengali labels
      const segmentLabels: { [key: string]: { label: string; labelEn: string } } = {
        students: { label: 'শিক্ষার্থী', labelEn: 'Students' },
        courses: { label: 'কোর্স', labelEn: 'Courses' },
        teachers: { label: 'শিক্ষক', labelEn: 'Teachers' },
        admissions: { label: 'ভর্তি আবেদন', labelEn: 'Admissions' },
        clubs: { label: 'ক্লাব', labelEn: 'Clubs' },
        gallery: { label: 'গ্যালারি', labelEn: 'Gallery' },
        magazine: { label: 'ম্যাগাজিন', labelEn: 'Magazine' },
        analytics: { label: 'অ্যানালিটিক্স', labelEn: 'Analytics' },
        settings: { label: 'সেটিংস', labelEn: 'Settings' },
        create: { label: 'নতুন তৈরি', labelEn: 'Create New' },
        edit: { label: 'সম্পাদনা', labelEn: 'Edit' },
        profile: { label: 'প্রোফাইল', labelEn: 'Profile' },
        content: { label: 'কন্টেন্ট', labelEn: 'Content' },
        subjects: { label: 'বিষয়', labelEn: 'Subjects' },
        chapters: { label: 'অধ্যায়', labelEn: 'Chapters' },
        materials: { label: 'উপকরণ', labelEn: 'Materials' },
        upload: { label: 'আপলোড', labelEn: 'Upload' },
        albums: { label: 'অ্যালবাম', labelEn: 'Albums' },
        reports: { label: 'রিপোর্ট', labelEn: 'Reports' },
        users: { label: 'ব্যবহারকারী', labelEn: 'Users' },
        roles: { label: 'ভূমিকা', labelEn: 'Roles' },
        general: { label: 'সাধারণ', labelEn: 'General' },
      };

      const segmentLabel = segmentLabels[segment] || {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        labelEn: segment.charAt(0).toUpperCase() + segment.slice(1)
      };

      // Don't add href for the last segment (current page)
      const isLastSegment = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        ...segmentLabel,
        href: isLastSegment ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        href="/dashboard"
        className="flex items-center hover:text-emerald-600 transition-colors"
      >
        <IconHome className="w-4 h-4" />
      </Link>
      
      {breadcrumbItems.length > 1 && (
        <>
          <IconArrowForward className="w-3 h-3 text-gray-400" />
          {breadcrumbItems.slice(1).map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link 
                  href={item.href}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              )}
              
              {index < breadcrumbItems.length - 2 && (
                <IconArrowForward className="w-3 h-3 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </nav>
  );
};

export default AdminBreadcrumb;