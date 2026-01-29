'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/slices/dashboardSlice';
import { SidebarItem } from '@/store/types/admin';
import { filterSidebarItems } from '@/lib/utils/adminHelpers';

// Import icons
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';
import IconUsers from '@/components/icon/icon-users';
import IconBook from '@/components/icon/icon-book';
import IconUser from '@/components/icon/icon-user';
import IconInbox from '@/components/icon/icon-inbox';
import IconGallery from '@/components/icon/icon-gallery';
import IconNotes from '@/components/icon/icon-notes';
import IconBarChart from '@/components/icon/icon-bar-chart';
import IconSettings from '@/components/icon/icon-settings';

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'ড্যাশবোর্ড',
    labelEn: 'Dashboard',
    icon: 'dashboard',
    href: '/dashboard',
  },
  {
    id: 'students',
    label: 'শিক্ষার্থী ব্যবস্থাপনা',
    labelEn: 'Student Management',
    icon: 'users',
    href: '/students',
    submenu: [
      {
        id: 'students-list',
        label: 'শিক্ষার্থী তালিকা',
        labelEn: 'Student List',
        icon: 'users',
        href: '/students',
      },
      {
        id: 'students-create',
        label: 'নতুন শিক্ষার্থী',
        labelEn: 'Add Student',
        icon: 'users',
        href: '/students/create',
      },
    ],
  },
  {
    id: 'courses',
    label: 'কোর্স ব্যবস্থাপনা',
    labelEn: 'Course Management',
    icon: 'book',
    href: '/courses',
    submenu: [
      {
        id: 'courses-list',
        label: 'কোর্স তালিকা',
        labelEn: 'Course List',
        icon: 'book',
        href: '/courses',
      },
      {
        id: 'courses-create',
        label: 'নতুন কোর্স',
        labelEn: 'Add Course',
        icon: 'book',
        href: '/courses/create',
      },
    ],
  },
  {
    id: 'teachers',
    label: 'শিক্ষক ব্যবস্থাপনা',
    labelEn: 'Teacher Management',
    icon: 'user',
    href: '/teachers',
    submenu: [
      {
        id: 'teachers-list',
        label: 'শিক্ষক তালিকা',
        labelEn: 'Teacher List',
        icon: 'user',
        href: '/teachers',
      },
      {
        id: 'teachers-create',
        label: 'নতুন শিক্ষক',
        labelEn: 'Add Teacher',
        icon: 'user',
        href: '/teachers/create',
      },
    ],
  },
  {
    id: 'admissions',
    label: 'ভর্তি আবেদন',
    labelEn: 'Admissions',
    icon: 'inbox',
    href: '/admissions',
    badge: 5,
  },
  {
    id: 'clubs',
    label: 'ক্লাব ব্যবস্থাপনা',
    labelEn: 'Club Management',
    icon: 'users',
    href: '/clubs',
  },
  {
    id: 'gallery',
    label: 'গ্যালারি ব্যবস্থাপনা',
    labelEn: 'Gallery Management',
    icon: 'gallery',
    href: '/gallery',
  },
  {
    id: 'magazine',
    label: 'ম্যাগাজিন ব্যবস্থাপনা',
    labelEn: 'Magazine Management',
    icon: 'notes',
    href: '/magazine',
  },
  {
    id: 'analytics',
    label: 'অ্যানালিটিক্স ও রিপোর্ট',
    labelEn: 'Analytics & Reports',
    icon: 'bar-chart',
    href: '/analytics',
  },
  {
    id: 'settings',
    label: 'সিস্টেম সেটিংস',
    labelEn: 'System Settings',
    icon: 'settings',
    href: '/settings',
    submenu: [
      {
        id: 'settings-general',
        label: 'সাধারণ সেটিংস',
        labelEn: 'General Settings',
        icon: 'settings',
        href: '/settings/general',
      },
      {
        id: 'settings-users',
        label: 'ব্যবহারকারী ব্যবস্থাপনা',
        labelEn: 'User Management',
        icon: 'users',
        href: '/settings/users',
      },
    ],
  },
];


const AdminSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { sidebarCollapsed } = useSelector((state: IRootState) => state.dashboard);
  const { user } = useSelector((state: IRootState) => state.auth);
  const [currentMenu, setCurrentMenu] = useState<string>('');

  // Filter sidebar items based on user permissions
  const accessibleItems = filterSidebarItems(user, sidebarItems);

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && !sidebarCollapsed) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    selector?.classList.add('active');
  };

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar */}
      <div className="sidebar-wrapper">
        <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen transition-all duration-300 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] ${
          sidebarCollapsed ? 'w-16' : 'w-[260px]'
        }`}>
          <div className="h-full bg-white dark:bg-[#0e1726]">
            {/* Logo */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white-light dark:border-[#191e3a]">
              <Link href="/admin-dashboard" className="main-logo flex shrink-0 items-center">
                <img className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
                {!sidebarCollapsed && (
                  <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 text-emerald-600 dark:text-emerald-400 lg:inline">
                    Graviton
                  </span>
                )}
              </Link>

              <button
                type="button"
                className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 text-gray-600 dark:text-gray-300 dark:hover:bg-dark-light/10"
                onClick={() => dispatch(toggleSidebar())}
              >
                <IconCaretsDown className="m-auto rotate-90" />
              </button>
            </div>

            {/* Navigation */}
            <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
              <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                {/* Dashboard */}
                <li className="nav-item">
                  <Link href="/admin-dashboard" className={`${isActive('/admin-dashboard') ? 'active' : ''} group nav-link`}>
                    <div className="flex items-center">
                      <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          ড্যাশবোর্ড
                        </span>
                      )}
                    </div>
                  </Link>
                </li>

                {/* Management Section */}
                <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                  <IconMinus className="hidden h-5 w-4 flex-none" />
                  {!sidebarCollapsed && <span className="text-dark dark:text-white-light">ব্যবস্থাপনা</span>}
                </h2>

                {/* Students Management */}
                <li className="menu nav-item">
                  <button 
                    type="button" 
                    className={`${currentMenu === 'students' ? 'active' : ''} nav-link group w-full`} 
                    onClick={() => toggleMenu('students')}
                  >
                    <div className="flex items-center">
                      <IconUsers className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            শিক্ষার্থী ব্যবস্থাপনা
                          </span>
                          <div className={currentMenu !== 'students' ? '-rotate-90 rtl:rotate-90' : ''}>
                            <IconCaretDown />
                          </div>
                        </>
                      )}
                    </div>
                  </button>

                  {!sidebarCollapsed && (
                    <AnimateHeight duration={300} height={currentMenu === 'students' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/admin-students">শিক্ষার্থী তালিকা</Link>
                        </li>
                        <li>
                          <Link href="/admin-students/create">নতুন শিক্ষার্থী</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  )}
                </li>

                {/* Courses Management */}
                <li className="menu nav-item">
                  <button 
                    type="button" 
                    className={`${currentMenu === 'courses' ? 'active' : ''} nav-link group w-full`} 
                    onClick={() => toggleMenu('courses')}
                  >
                    <div className="flex items-center">
                      <IconBook className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            কোর্স ব্যবস্থাপনা
                          </span>
                          <div className={currentMenu !== 'courses' ? '-rotate-90 rtl:rotate-90' : ''}>
                            <IconCaretDown />
                          </div>
                        </>
                      )}
                    </div>
                  </button>

                  {!sidebarCollapsed && (
                    <AnimateHeight duration={300} height={currentMenu === 'courses' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/admin-courses">কোর্স তালিকা</Link>
                        </li>
                        <li>
                          <Link href="/admin-courses/create">নতুন কোর্স</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  )}
                </li>

                {/* Teachers Management */}
                <li className="menu nav-item">
                  <button 
                    type="button" 
                    className={`${currentMenu === 'teachers' ? 'active' : ''} nav-link group w-full`} 
                    onClick={() => toggleMenu('teachers')}
                  >
                    <div className="flex items-center">
                      <IconUser className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            শিক্ষক ব্যবস্থাপনা
                          </span>
                          <div className={currentMenu !== 'teachers' ? '-rotate-90 rtl:rotate-90' : ''}>
                            <IconCaretDown />
                          </div>
                        </>
                      )}
                    </div>
                  </button>

                  {!sidebarCollapsed && (
                    <AnimateHeight duration={300} height={currentMenu === 'teachers' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/admin-teachers">শিক্ষক তালিকা</Link>
                        </li>
                        <li>
                          <Link href="/admin-teachers/create">নতুন শিক্ষক</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  )}
                </li>

                {/* Single Menu Items */}
                <li className="nav-item">
                  <Link href="/admin-admissions" className={`${isActive('/admin-admissions') ? 'active' : ''} group nav-link`}>
                    <div className="flex items-center">
                      <IconInbox className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            ভর্তি আবেদন
                          </span>
                          <span className="ml-auto bg-emerald-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            5
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/admin-clubs" className={`${isActive('/admin-clubs') ? 'active' : ''} group nav-link`}>
                    <div className="flex items-center">
                      <IconUsers className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          ক্লাব ব্যবস্থাপনা
                        </span>
                      )}
                    </div>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/admin-gallery" className={`${isActive('/admin-gallery') ? 'active' : ''} group nav-link`}>
                    <div className="flex items-center">
                      <IconGallery className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          গ্যালারি ব্যবস্থাপনা
                        </span>
                      )}
                    </div>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/admin-magazine" className={`${isActive('/admin-magazine') ? 'active' : ''} group nav-link`}>
                    <div className="flex items-center">
                      <IconNotes className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          ম্যাগাজিন ব্যবস্থাপনা
                        </span>
                      )}
                    </div>
                  </Link>
                </li>

                {/* Analytics Section */}
                <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                  <IconMinus className="hidden h-5 w-4 flex-none" />
                  {!sidebarCollapsed && <span className="text-dark dark:text-white-light">রিপোর্ট ও বিশ্লেষণ</span>}
                </h2>

                <li className="nav-item">
                  <Link href="/admin-analytics" className={`${isActive('/admin-analytics') ? 'active' : ''} group nav-link`}>
                    <div className="flex items-center">
                      <IconBarChart className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          অ্যানালিটিক্স ও রিপোর্ট
                        </span>
                      )}
                    </div>
                  </Link>
                </li>

                {/* Settings Section */}
                <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                  <IconMinus className="hidden h-5 w-4 flex-none" />
                  {!sidebarCollapsed && <span className="text-dark dark:text-white-light">সিস্টেম</span>}
                </h2>

                <li className="menu nav-item">
                  <button 
                    type="button" 
                    className={`${currentMenu === 'settings' ? 'active' : ''} nav-link group w-full`} 
                    onClick={() => toggleMenu('settings')}
                  >
                    <div className="flex items-center">
                      <IconSettings className="shrink-0 group-hover:!text-primary" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            সিস্টেম সেটিংস
                          </span>
                          <div className={currentMenu !== 'settings' ? '-rotate-90 rtl:rotate-90' : ''}>
                            <IconCaretDown />
                          </div>
                        </>
                      )}
                    </div>
                  </button>

                  {!sidebarCollapsed && (
                    <AnimateHeight duration={300} height={currentMenu === 'settings' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/admin-settings/general">সাধারণ সেটিংস</Link>
                        </li>
                        <li>
                          <Link href="/admin-settings/users">ব্যবহারকারী ব্যবস্থাপনা</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  )}
                </li>
              </ul>
            </PerfectScrollbar>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;