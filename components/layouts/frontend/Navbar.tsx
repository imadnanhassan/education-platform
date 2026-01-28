'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: 'হোম', nameEn: 'Home', href: '/' },
        { name: 'Made Easy', nameEn: 'Made Easy', href: '/made-easy' },
        { name: 'ক্লাব', nameEn: 'Clubs', href: '/clubs' },
        { name: 'কোর্স', nameEn: 'Courses', href: '/courses' },
        { 
            name: 'বিদেশে পড়াশোনা', 
            nameEn: 'Fly to Abroad', 
            href: '/fly-to-abroad',
            submenu: [
                { name: 'অলিম্পিয়াড', href: '/fly-to-abroad/olympiad' },
                { name: 'SAT', href: '/fly-to-abroad/sat' },
                { name: 'IELTS', href: '/fly-to-abroad/ielts' },
                { name: 'Extra Curricular', href: '/fly-to-abroad/extra-curricular' }
            ]
        },
        { name: 'গ্যালারি', nameEn: 'Gallery', href: '/gallery' },
        { name: 'শিক্ষকবৃন্দ', nameEn: 'Teachers', href: '/teachers' },
        { name: 'বৃত্তি', nameEn: 'Scholarship', href: '/scholarship' },
        { name: 'ম্যাগাজিন', nameEn: 'Magazine', href: '/magazine' },
        { name: 'সদস্যপদ', nameEn: 'Membership', href: '/membership' },
        { name: 'যোগাযোগ', nameEn: 'Contact', href: '/contact' },
        { name: 'আমাদের সম্পর্কে', nameEn: 'About', href: '/about' }
    ];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <img 
                                src="/assets/images/logo.svg" 
                                alt="গ্র্যাভিটন একাডেমি" 
                                className="h-10 w-auto"
                            />
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold text-primary-700">গ্র্যাভিটন একাডেমি</h1>
                                <p className="text-xs text-gray-600">Education & Abroad Preparation</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navigation.slice(0, 6).map((item) => (
                            <div key={item.href} className="relative group">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                        pathname === item.href
                                            ? 'text-primary-700 bg-primary-50'
                                            : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                                    )}
                                >
                                    {item.name}
                                </Link>
                                {item.submenu && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="py-1">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* More Menu */}
                        <div className="relative group">
                            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50">
                                আরও
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    {navigation.slice(6).map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex items-center space-x-4">
                        <Link href="/login">
                            <Button variant="primary" size="sm">
                                লগইন
                            </Button>
                        </Link>
                        
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-700 hover:bg-primary-50"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                        {navigation.map((item) => (
                            <div key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'block px-3 py-2 rounded-md text-base font-medium',
                                        pathname === item.href
                                            ? 'text-primary-700 bg-primary-50'
                                            : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                                {item.submenu && (
                                    <div className="ml-4 space-y-1">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary-700 hover:bg-primary-50"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;