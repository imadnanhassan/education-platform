'use client';

import React from 'react';
import { usePermissions } from '@/lib/hooks/usePermissions';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: {
    resource: string;
    action: 'create' | 'read' | 'update' | 'delete';
  };
  anyPermissions?: Array<{
    resource: string;
    action: 'create' | 'read' | 'update' | 'delete';
  }>;
  allPermissions?: Array<{
    resource: string;
    action: 'create' | 'read' | 'update' | 'delete';
  }>;
  module?: string;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
  fallback?: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  anyPermissions,
  allPermissions,
  module,
  requireAdmin = false,
  requireSuperAdmin = false,
  fallback = null,
}) => {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessModule,
    isAdmin,
    isSuperAdmin,
  } = usePermissions();

  // Check super admin requirement
  if (requireSuperAdmin && !isSuperAdmin()) {
    return <>{fallback}</>;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin()) {
    return <>{fallback}</>;
  }

  // Check module access
  if (module && !canAccessModule(module)) {
    return <>{fallback}</>;
  }

  // Check specific permission
  if (permission && !hasPermission(permission.resource, permission.action)) {
    return <>{fallback}</>;
  }

  // Check any permissions
  if (anyPermissions && !hasAnyPermission(anyPermissions)) {
    return <>{fallback}</>;
  }

  // Check all permissions
  if (allPermissions && !hasAllPermissions(allPermissions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGuard;