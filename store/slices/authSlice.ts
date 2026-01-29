import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminUser, DemoCredentials } from '@/store/types/admin';

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  demoCredentials: DemoCredentials;
}

const demoStudentUser: AdminUser = {
  id: 'student-001',
  email: 'student@graviton.edu.bd',
  firstName: 'Student',
  lastName: 'User',
  role: {
    id: 'role-002',
    name: 'student' as any,
    displayName: 'Student',
    permissions: [
      { id: 'perm-005', name: 'frontend_access', resource: 'frontend', action: 'read' },
    ],
  },
  permissions: [
    { id: 'perm-005', name: 'frontend_access', resource: 'frontend', action: 'read' },
  ],
  avatar: '/assets/images/user-profile.jpeg',
  phone: '+880 1712-345679',
  isActive: true,
  lastLogin: new Date().toISOString(),
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString(),
};

const demoAdminUser: AdminUser = {
  id: 'admin-001',
  email: 'admin@graviton.edu.bd',
  firstName: 'Admin',
  lastName: 'User',
  role: {
    id: 'role-001',
    name: 'super_admin',
    displayName: 'Super Administrator',
    permissions: [
      { id: 'perm-001', name: 'all_access', resource: '*', action: 'create' },
      { id: 'perm-002', name: 'all_access', resource: '*', action: 'read' },
      { id: 'perm-003', name: 'all_access', resource: '*', action: 'update' },
      { id: 'perm-004', name: 'all_access', resource: '*', action: 'delete' },
    ],
  },
  permissions: [
    { id: 'perm-001', name: 'all_access', resource: '*', action: 'create' },
    { id: 'perm-002', name: 'all_access', resource: '*', action: 'read' },
    { id: 'perm-003', name: 'all_access', resource: '*', action: 'update' },
    { id: 'perm-004', name: 'all_access', resource: '*', action: 'delete' },
  ],
  avatar: '/assets/images/user-profile.jpeg',
  phone: '+880 1712-345678',
  isActive: true,
  lastLogin: new Date().toISOString(),
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString(),
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  demoCredentials: {
    admin: {
      email: 'admin@graviton.edu.bd',
      password: 'admin123',
      role: 'super_admin',
    },
    student: {
      email: 'student@graviton.edu.bd',
      password: 'student123',
      role: 'student',
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AdminUser>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      // Clear saved credentials from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('rememberedCredentials');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    // Demo login function
    demoLogin: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      
      if (
        email === state.demoCredentials.admin.email &&
        password === state.demoCredentials.admin.password
      ) {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          ...demoAdminUser,
          lastLogin: new Date().toISOString(),
        };
        state.error = null;
      } else {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = 'Invalid credentials';
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  demoLogin,
} = authSlice.actions;

export default authSlice.reducer;