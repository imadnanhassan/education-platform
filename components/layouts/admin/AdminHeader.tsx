'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { IRootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { toggleSidebar, markNotificationAsRead, markAllNotificationsAsRead } from '@/store/slices/dashboardSlice';
import { toggleTheme } from '@/store/themeConfigSlice';
import Dropdown from '@/components/dropdown';
import IconBell from '@/components/icon/icon-bell';
import IconMenu from '@/components/icon/icon-menu';
import IconLogout from '@/components/icon/icon-logout';
import IconUser from '@/components/icon/icon-user';
import IconSun from '@/components/icon/icon-sun';
import IconMoon from '@/components/icon/icon-moon';
import IconLaptop from '@/components/icon/icon-laptop';
import IconSearch from '@/components/icon/icon-search';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconSettings from '@/components/icon/icon-settings';

const AdminHeader: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: IRootState) => state.auth);
  const { notifications, unreadCount } = useSelector((state: IRootState) => state.dashboard);
  const { theme } = useSelector((state: IRootState) => state.themeConfig);
  
  const [search, setSearch] = useState(false);

  const handleThemeToggle = () => {
    if (theme === 'light') {
      dispatch(toggleTheme('dark'));
    } else if (theme === 'dark') {
      dispatch(toggleTheme('system'));
    } else {
      dispatch(toggleTheme('light'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleNotificationClick = (notificationId: string) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'এখনই';
    if (diffInMinutes < 60) return `${diffInMinutes} মিনিট আগে`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ঘন্টা আগে`;
    return `${Math.floor(diffInMinutes / 1440)} দিন আগে`;
  };

  return (
    <header className="z-40">
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          {/* Left side - Mobile menu button */}
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>

          {/* Center - Search */}
          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <form
                className={`${search && '!block'} absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
              >
                <div className="relative">
                  <input
                    type="text"
                    className="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                    placeholder="Search..."
                  />
                  <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
                    <IconSearch className="mx-auto" />
                  </button>
                  <button type="button" className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden" onClick={() => setSearch(false)}>
                    <IconXCircle />
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
              >
                <IconSearch className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
              </button>
            </div>

            {/* Right side - Theme toggle, Notifications, User menu */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div>
                {theme === 'light' && (
                  <button
                    className="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                    onClick={handleThemeToggle}
                    title="Switch to Dark Mode"
                  >
                    <IconSun />
                  </button>
                )}
                {theme === 'dark' && (
                  <button
                    className="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                    onClick={handleThemeToggle}
                    title="Switch to System Mode"
                  >
                    <IconMoon />
                  </button>
                )}
                {theme === 'system' && (
                  <button
                    className="flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                    onClick={handleThemeToggle}
                    title="Switch to Light Mode"
                  >
                    <IconLaptop />
                  </button>
                )}
              </div>

              {/* Notifications */}
              <div className="dropdown shrink-0">
                <Dropdown
                  offset={[0, 8]}
                  placement="bottom-end"
                  btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  button={
                    <span>
                      <IconBell />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                          <span className="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                        </span>
                      )}
                    </span>
                  }
                >
                  <ul className="w-[300px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]">
                    <li onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between px-4 py-2 font-semibold">
                        <h4 className="text-lg">নোটিফিকেশন</h4>
                        {unreadCount > 0 && (
                          <span className="badge bg-primary/80">{unreadCount} নতুন</span>
                        )}
                      </div>
                    </li>
                    {notifications.length > 0 ? (
                      <>
                        {notifications.slice(0, 5).map((notification) => (
                          <li key={notification.id} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                            <div className="group flex items-center px-4 py-2">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                notification.type === 'error' ? 'bg-red-500' :
                                'bg-blue-500'
                              }`} />
                              <div className="flex flex-auto ltr:pl-3 rtl:pr-3">
                                <div className="ltr:pr-3 rtl:pl-3">
                                  <h6 className="font-medium text-gray-800 text-sm dark:text-white-light">
                                    {notification.title}
                                  </h6>
                                  <p className="text-gray-600 text-sm mt-1 dark:text-gray-400">
                                    {notification.message}
                                  </p>
                                  <span className="block text-xs font-normal dark:text-gray-500">
                                    {formatTimeAgo(notification.createdAt)}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ltr:ml-auto rtl:mr-auto"
                                  onClick={() => handleNotificationClick(notification.id)}
                                >
                                  <IconXCircle />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                        <li>
                          <div className="p-4">
                            <button 
                              className="btn btn-primary btn-small block w-full"
                              onClick={() => dispatch(markAllNotificationsAsRead())}
                            >
                              সব পড়া হয়েছে
                            </button>
                          </div>
                        </li>
                      </>
                    ) : (
                      <li onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
                          <div className="mx-auto mb-4 rounded-full ring-4 ring-primary/30">
                            <IconBell className="h-10 w-10 text-primary" />
                          </div>
                          কোন নোটিফিকেশন নেই
                        </button>
                      </li>
                    )}
                  </ul>
                </Dropdown>
              </div>

              {/* User Menu */}
              <div className="dropdown flex shrink-0">
                <Dropdown
                  offset={[0, 8]}
                  placement="bottom-end"
                  btnClassName="relative group block"
                  button={
                    <div className="flex items-center space-x-2">
                      {user?.avatar ? (
                        <img 
                          className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100" 
                          src={user.avatar} 
                          alt="userProfile" 
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  }
                >
                  <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                    <li>
                      <div className="flex items-center px-4 py-4">
                        {user?.avatar ? (
                          <img className="h-10 w-10 rounded-md object-cover" src={user.avatar} alt="userProfile" />
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-emerald-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </span>
                          </div>
                        )}
                        <div className="truncate ltr:pl-4 rtl:pr-4">
                          <h4 className="text-base">
                            {user?.firstName} {user?.lastName}
                            <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                              {user?.role.displayName}
                            </span>
                          </h4>
                          <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                            {user?.email}
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push('/profile')}
                        className="w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                        প্রোফাইল
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push('/settings')}
                        className="w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <IconSettings className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                        সেটিংস
                      </button>
                    </li>
                    <li className="border-t border-white-light dark:border-white-light/10">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-danger hover:bg-danger-light dark:hover:bg-danger dark:hover:text-white"
                      >
                        <IconLogout className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                        লগ আউট
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;