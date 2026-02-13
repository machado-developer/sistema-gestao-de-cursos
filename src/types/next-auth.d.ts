import { DefaultSession, DefaultUser } from "next-auth";
import { ModulePermission } from "@/lib/rbac";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            permissions: ModulePermission[];
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        role: string;
        permissions: ModulePermission[];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
        permissions: ModulePermission[];
    }
}
