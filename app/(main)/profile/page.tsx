import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to login if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="flex items-center text-lg font-medium mb-8">
          <span className="mr-2">Email:</span>
          <span className="text-xl text-gray-700">{session.user?.email}</span>
        </div>
      </div>
    </div>
  );
}
