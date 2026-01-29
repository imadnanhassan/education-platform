// Admin Dashboard Types

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  permissions: Permission[];
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminRole {
  id: string;
  name: 'super_admin' | 'admin' | 'moderator' | 'content_manager';
  displayName: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | '*';
}

export interface SidebarItem {
  id: string;
  label: string;
  labelEn: string;
  icon: string;
  href: string;
  badge?: number;
  submenu?: SidebarItem[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface DemoCredentials {
  admin: {
    email: 'admin@graviton.edu.bd';
    password: 'admin123';
    role: 'super_admin';
  };
  student: {
    email: 'student@graviton.edu.bd';
    password: 'student123';
    role: 'student';
  };
}