import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getUserProfile } from "@/lib/profile";
import EditProfileForm from "@/components/EditProfileForm";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const user = await getSession();
  if (!user) redirect("/login");
  const profile = await getUserProfile(String(user.id));
  if (!profile) redirect("/login");

  return (
    <div className="max-w-xl">
      <Link href="/cont" className="text-sm text-moss hover:text-amber-glow">← cont</Link>

      <header className="mt-4 mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-moss mb-2">profil</p>
        <h1 className="text-3xl font-display text-fog">Editează profil</h1>
        <p className="text-sm text-fog/65 mt-1">Nickname, bio, locație, vizibilitate publică.</p>
      </header>

      <EditProfileForm
        initial={{
          nickname: profile.nickname ?? "",
          bio: profile.bio ?? "",
          location: profile.location ?? "",
          profile_public: profile.profile_public,
        }}
      />
    </div>
  );
}
