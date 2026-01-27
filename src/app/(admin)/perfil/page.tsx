import { getUserProfile } from "./actions";
import { ProfileClient } from "./ProfileClient";
import { redirect } from "next/navigation";
import { serializePrisma } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const user = await getUserProfile();

    if (!user) {
        redirect('/login');
    }

    return <ProfileClient user={serializePrisma(user)} />;
}
