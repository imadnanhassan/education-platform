'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const MainHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveSubmenu(null);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
        { name: 'ভর্তি', nameEn: 'Admission', href: '/admission' },
        { name: 'গ্যালারি', nameEn: 'Gallery', href: '/gallery' },
        { name: 'শিক্ষকবৃন্দ', nameEn: 'Teachers', href: '/teachers' },
        { name: 'বৃত্তি', nameEn: 'Scholarship', href: '/scholarship' },
        { name: 'ম্যাগাজিন', nameEn: 'Magazine', href: '/magazine' },
        { name: 'সদস্যপদ', nameEn: 'Membership', href: '/membership' },
        { name: 'যোগাযোগ', nameEn: 'Contact', href: '/contact' },
        { name: 'আমাদের সম্পর্কে', nameEn: 'About', href: '/about' }
    ];

    const toggleSubmenu = (href: string) => {
        setActiveSubmenu(activeSubmenu === href ? null : href);
    };

    return (
        <>
            <header className={cn(
                'sticky top-0 z-50 transition-all duration-300',
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' 
                    : 'bg-white border-b border-gray-100'
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="relative">
                                    <img 
                                        src="/assets/images/logo.svg" 
                                        alt="গ্র্যাভিটন একাডেমি" 
                                        className="h-10 lg:h-12 w-auto transition-all duration-300"
                                    />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-lg lg:text-xl font-bold text-gray-800 leading-tight">
                                        গ্র্যাভিটন একাডেমি
                                    </h1>
                                    <p className="text-xs lg:text-sm text-gray-600 leading-tight">
                                        Education & Abroad Preparation
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden xl:flex items-center space-x-1">
                            {navigation.slice(0, 7).map((item) => (
                                <div key={item.href} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'px-3 py-2 text-sm font-medium transition-all duration-200',
                                            pathname === item.href || pathname.startsWith(item.href + '/')
                                                ? 'text-primary-700 bg-primary-50'
                                                : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="py-2">
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        className={cn(
                                                            'block px-4 py-3 text-sm transition-colors rounded-lg mx-2',
                                                            pathname === subItem.href
                                                                ? 'text-primary-700 bg-primary-50'
                                                                : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                                                        )}
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
                                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200">
                                    আরও
                                    <svg className="ml-1 h-4 w-4 inline-block transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="py-2">
                                        {navigation.slice(7).map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    'block px-4 py-3 text-sm transition-colors rounded-lg mx-2',
                                                    pathname === item.href
                                                        ? 'text-primary-700 bg-primary-50'
                                                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-3">
                            {/* Login Button */}
                            <Link href="/login">
                                <Button 
                                    variant="primary" 
                                    size="sm"
                                    className="hidden sm:inline-flex transition-colors duration-200"
                                >
                                    লগইন
                                </Button>
                            </Link>
                            
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="xl:hidden relative z-50 inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={cn(
                                        "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
                                        isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                                    )}></span>
                                    <span className={cn(
                                        "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5",
                                        isOpen ? "opacity-0" : "opacity-100"
                                    )}></span>
                                    <span className={cn(
                                        "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
                                        isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                                    )}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Sidebar */}
            <div className={cn(
                'xl:hidden fixed inset-0 z-40 transition-all duration-300',
                isOpen ? 'visible' : 'invisible'
            )}>
                {/* Backdrop */}
                <div 
                    className={cn(
                        'absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300',
                        isOpen ? 'opacity-100' : 'opacity-0'
                    )}
                    onClick={() => setIsOpen(false)}
                />
                
                {/* Sidebar */}
                <div className={cn(
                    'absolute right-0 top-0 h-full w-72 sm:w-80 max-w-[90vw] bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}>
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/assets/images/logo.svg" 
                                alt="গ্র্যাভিটন একাডেমি" 
                                className="h-8 w-auto"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">গ্র্যাভিটন একাডেমি</h2>
                                <p className="text-xs text-gray-600">Education & Abroad Preparation</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto py-4 max-h-[calc(100vh-140px)]">
                        {/* Mobile Login Button */}
                        <div className="px-4 mb-4 sm:hidden">
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="primary" size="sm" className="w-full">
                                    লগইন
                                </Button>
                            </Link>
                        </div>

                        <nav className="px-4 space-y-2">
                            {navigation.map((item) => (
                                <div key={item.href}>
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex-1 flex items-center px-2 py-2 sm:px-3 sm:py-3 rounded-lg text-base font-medium transition-all duration-200',
                                                pathname === item.href || pathname.startsWith(item.href + '/')
                                                    ? 'text-primary-700 bg-primary-50 border-l-4 border-primary-500'
                                                    : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                                            )}
                                            onClick={() => {
                                                if (!item.submenu) {
                                                    setIsOpen(false);
                                                }
                                            }}
                                        >
                                            <span>{item.name}</span>
                                        </Link>
                                        {item.submenu && (
                                            <button
                                                onClick={() => toggleSubmenu(item.href)}
                                                className="p-2 ml-2 rounded-lg text-gray-500 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
                                            >
                                                <svg 
                                                    className={cn(
                                                        "h-5 w-5 transition-transform duration-200",
                                                        activeSubmenu === item.href && "rotate-180"
                                                    )} 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Submenu */}
                                    {item.submenu && (
                                        <div className={cn(
                                            'ml-4 mt-2 space-y-1 transition-all duration-300 overflow-hidden',
                                            activeSubmenu === item.href ? 'max-h-64 sm:max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        )}>
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className={cn(
                                                        'block px-4 py-2 rounded-lg text-sm transition-colors',
                                                        pathname === subItem.href
                                                            ? 'text-primary-700 bg-primary-50 border-l-2 border-primary-400'
                                                            : 'text-gray-600 hover:text-primary-700 hover:bg-primary-50'
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="text-center text-sm text-gray-500">
                            © 2024 গ্র্যাভিটন একাডেমি
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainHeader;