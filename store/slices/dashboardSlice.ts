import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/store/types/admin';

interface DashboardState {
  sidebarCollapsed: boolean;
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
}

const dummyNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'নতুন ভর্তির আবেদন',
    message: 'রাহুল আহমেদ HSC পদার্থবিজ্ঞান কোর্সের জন্য আবেদন করেছেন',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: 'notif-002',
    title: 'কোর্স প্রকাশিত',
    message: 'উচ্চ মাধ্যমিক রসায়ন কোর্স সফলভাবে প্রকাশিত হয়েছে',
    type: 'success',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'notif-003',
    title: 'সিস্টেম আপডেট',
    message: 'সিস্টেম রক্ষণাবেক্ষণ আগামীকাল রাত ১২টায় শুরু হবে',
    type: 'warning',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

const initialState: DashboardState = {
  sidebarCollapsed: false,
  notifications: dummyNotifications,
  unreadCount: dummyNotifications.filter(n => !n.isRead).length,
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
      state.unreadCount = 0;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      const newNotification: Notification = {
        ...action.payload,
        id: `notif-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      state.notifications.unshift(newNotification);
      if (!newNotification.isRead) {
        state.unreadCount += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  addNotification,
  setLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;