import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions, 
  canAccessModule,
  isAdmin,
  isSuperAdmin 
} from '@/lib/utils/adminHelpers';

/**
 * Hook for checking user permissions
 */
export const usePermissions = () => {
  const { user } = useSelector((state: IRootState) => state.auth);

  return {
    // Check specific permission
    hasPermission: (resource: string, action: 'create' | 'read' | 'update' | 'delete') =>
      hasPermission(user, resource, action),

    // Check any of multiple permissions
    hasAnyPermission: (permissions: Array<{ resource: string; action: 'create' | 'read' | 'update' | 'delete' }>) =>
      hasAnyPermission(user, permissions),

    // Check all of multiple permissions
    hasAllPermissions: (permissions: Array<{ resource: string; action: 'create' | 'read' | 'update' | 'delete' }>) =>
      hasAllPermissions(user, permissions),

    // Check module access
    canAccessModule: (module: string) => canAccessModule(user, module),

    // Role checks
    isAdmin: () => isAdmin(user),
    isSuperAdmin: () => isSuperAdmin(user),

    // User info
    user,
  };
};

/**
 * Hook for checking if user can perform CRUD operations on a resource
 */
export const useResourcePermissions = (resource: string) => {
  const { hasPermission } = usePermissions();

  return {
    canCreate: hasPermission(resource, 'create'),
    canRead: hasPermission(resource, 'read'),
    canUpdate: hasPermission(resource, 'update'),
    canDelete: hasPermission(resource, 'delete'),
  };
};