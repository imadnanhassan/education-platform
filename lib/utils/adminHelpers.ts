import { AdminUser, Permission } from '@/store/types/admin';

/**
 * Check if user has a specific permission
 */
export const hasPermission = (
  user: AdminUser | null,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
): boolean => {
  if (!user || !user.isActive) return false;

  // Super admin has all permissions
  if (user.role.name === 'super_admin') return true;

  // Check user permissions
  return user.permissions.some(
    permission => 
      (permission.resource === resource || permission.resource === '*') &&
      (permission.action === action || permission.action === '*')
  );
};

/**
 * Check if user has any of the specified permissions
 */
export const hasAnyPermission = (
  user: AdminUser | null,
  permissions: Array<{ resource: string; action: 'create' | 'read' | 'update' | 'delete' }>
): boolean => {
  if (!user || !user.isActive) return false;

  return permissions.some(({ resource, action }) => 
    hasPermission(user, resource, action)
  );
};

/**
 * Check if user has all of the specified permissions
 */
export const hasAllPermissions = (
  user: AdminUser | null,
  permissions: Array<{ resource: string; action: 'create' | 'read' | 'update' | 'delete' }>
): boolean => {
  if (!user || !user.isActive) return false;

  return permissions.every(({ resource, action }) => 
    hasPermission(user, resource, action)
  );
};

/**
 * Check if user can access a specific module
 */
export const canAccessModule = (user: AdminUser | null, module: string): boolean => {
  if (!user || !user.isActive) return false;

  // Super admin can access all modules
  if (user.role.name === 'super_admin') return true;

  // Check if user has read permission for the module
  return hasPermission(user, module, 'read');
};

/**
 * Get user's accessible modules based on permissions
 */
export const getAccessibleModules = (user: AdminUser | null): string[] => {
  if (!user || !user.isActive) return [];

  // Super admin can access all modules
  if (user.role.name === 'super_admin') {
    return [
      'dashboard',
      'students',
      'courses',
      'teachers',
      'admissions',
      'clubs',
      'gallery',
      'magazine',
      'analytics',
      'settings'
    ];
  }

  // Get modules based on permissions
  const modules: string[] = [];
  const modulePermissions = user.permissions.filter(p => p.action === 'read' || p.action === '*');
  
  modulePermissions.forEach(permission => {
    if (permission.resource === '*') {
      // User has access to all modules
      modules.push(
        'dashboard',
        'students',
        'courses',
        'teachers',
        'admissions',
        'clubs',
        'gallery',
        'magazine',
        'analytics',
        'settings'
      );
    } else if (!modules.includes(permission.resource)) {
      modules.push(permission.resource);
    }
  });

  return modules;
};

/**
 * Filter sidebar items based on user permissions
 */
export const filterSidebarItems = (user: AdminUser | null, items: any[]): any[] => {
  if (!user || !user.isActive) return [];

  const accessibleModules = getAccessibleModules(user);
  
  return items.filter(item => {
    // Extract module name from href (remove leading slash)
    const module = item.href.replace('/', '').split('/')[0];
    return accessibleModules.includes(module);
  });
};

/**
 * Check if user is admin or higher
 */
export const isAdmin = (user: AdminUser | null): boolean => {
  if (!user || !user.isActive) return false;
  return ['super_admin', 'admin'].includes(user.role.name);
};

/**
 * Check if user is super admin
 */
export const isSuperAdmin = (user: AdminUser | null): boolean => {
  if (!user || !user.isActive) return false;
  return user.role.name === 'super_admin';
};

/**
 * Get user display name
 */
export const getUserDisplayName = (user: AdminUser | null): string => {
  if (!user) return 'Unknown User';
  return `${user.firstName} ${user.lastName}`;
};

/**
 * Get user initials for avatar
 */
export const getUserInitials = (user: AdminUser | null): string => {
  if (!user) return 'U';
  return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
};

/**
 * Format last login time
 */
export const formatLastLogin = (lastLogin: string | undefined): string => {
  if (!lastLogin) return 'Never';
  
  const date = new Date(lastLogin);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} days ago`;
  
  return date.toLocaleDateString();
};