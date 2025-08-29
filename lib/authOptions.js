
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
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
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
