
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   signIn: '/login',
  // },
  callbacks: {
    async signIn({ user }) {
      // Store user email in MongoDB
      try {
        const client = await clientPromise;
        const db = client.db();
        await db.collection('users').updateOne(
          { email: user.email },
          { $set: { email: user.email } },
          { upsert: true }
        );
      } catch (e) {
        console.error('MongoDB user store error:', e);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to profile page after login
      return '/profile';
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
