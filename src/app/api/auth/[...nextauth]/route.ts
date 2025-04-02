/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { login, loginWithGoole } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await login({ email });

        if (user) {
          const passwordConfirm = await bcrypt.compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }

        // if (email === "mluqmaan22@gmail.com" && password === "123") {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID! || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET! || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          email: user.email,
          type: "google",
        };

        await loginWithGoole(data, (result: { status: boolean; data: any }) => {
          if (result.status) {
            token.email = result.data.email;
            token.role = result.data.role;
          }
        });
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("password" in token) {
        session.user.password = token.password;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
