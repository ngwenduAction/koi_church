import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";

export const runtime = "nodejs";

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET ?? "development-only-secret",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/contact",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
