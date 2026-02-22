import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { hasPermission, hasItemPermission } from "./rbac";

/**
 * Utility to check permission on the server side (API routes / Server Components)
 */
export async function checkPermission(moduleKey: string, action: 'read' | 'write' = 'read') {
    const session: any = await getServerSession(authOptions);

    if (!session || !session.user) {
        return false;
    }

    // Role-based shortcuts (ADMIN has all access)
    if (session.user.role === 'ADMIN') return true;

    return hasPermission(session.user.permissions, moduleKey, action);
}

/**
 * Utility to check item-level permission on the server side
 */
export async function checkItemPermission(itemKey: string, action: 'read' | 'write' = 'read') {
    const session: any = await getServerSession(authOptions);

    if (!session || !session.user) {
        return false;
    }

    if (session.user.role === 'ADMIN') return true;

    return hasItemPermission(session.user.itemPermissions, itemKey, action);
}

/**
 * Throws an error or returns a response if the user doesn't have permission.
 * Useful for API routes.
 */
export async function validatePermission(moduleKey: string, action: 'read' | 'write' = 'read') {
    const hasPerm = await checkPermission(moduleKey, action);
    if (!hasPerm) {
        throw new Error("FORBIDDEN");
    }
    return true;
}
