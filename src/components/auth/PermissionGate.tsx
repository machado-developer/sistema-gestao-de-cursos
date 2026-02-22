'use client'

import { useSession } from 'next-auth/react'
import { hasPermission, hasItemPermission } from '@/lib/rbac'
import { ReactNode } from 'react'

interface PermissionGateProps {
    children: ReactNode;
    module?: string;
    item?: string;
    action?: 'read' | 'write';
    fallback?: ReactNode;
}

/**
 * Component to conditionally render children based on user permissions.
 * Usage:
 * <PermissionGate module="financeiro_mod" action="write">
 *   <button>Delete Ledger</button>
 * </PermissionGate>
 */
export function PermissionGate({
    children,
    module,
    item,
    action = 'read',
    fallback = null
}: PermissionGateProps) {
    const { data: session }: any = useSession();

    if (!session || !session.user) {
        return <>{fallback}</>;
    }

    // Admin shortcut
    if (session.user.role === 'ADMIN') {
        return <>{children}</>;
    }

    let allowed = false;

    if (module) {
        allowed = hasPermission(session.user.permissions, module, action);
    } else if (item) {
        allowed = hasItemPermission(session.user.itemPermissions, item, action);
    } else {
        // If neither module nor item is provided, we assume access is granted (e.g., for general authenticated content)
        allowed = true;
    }

    if (!allowed) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
