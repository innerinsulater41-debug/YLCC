import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If unauthenticated, let the page handle or redirect to login
  // Note: /admin/login handles unauthenticated state itself

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col md:flex-row">
      <AdminSidebar currentUser={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader currentUser={user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
