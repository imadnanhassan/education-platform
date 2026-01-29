'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { IRootState } from '@/store';
import { setSidebarCollapsed } from '@/store/slices/dashboardSlice';
import { toggleTheme } from '@/store/themeConfigSlice';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminBreadcrumb from './AdminBreadcrumb';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: IRootState) => state.auth);
  const { sidebarCollapsed } = useSelector((state: IRootState) => state.dashboard);
  const { isDarkMode, theme } = useSelector((state: IRootState) => state.themeConfig);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme !== theme) {
      dispatch(toggleTheme(savedTheme));
    }
  }, [dispatch, theme]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        dispatch(setSidebarCollapsed(true));
      } else {
        dispatch(setSidebarCollapsed(false));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-[#060818] ${isDarkMode ? 'dark' : ''}`}>
      <AdminSidebar />
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <AdminHeader />
        <main className="p-6">
          <AdminBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;