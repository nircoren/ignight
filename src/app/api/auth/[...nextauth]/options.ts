import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import prisma from "../../../lib/prisma";

export const options: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }): Promise<string | boolean> {
      if (account?.provider === "google") {
        try {
          const email = profile?.email;
          const name = profile?.name;
          if (!email || !name) {
            throw new Error("Email or name undefined.");
          }
          // Find the user in the database
          const User = await prisma.user.upsert({
            where: {
              email,
            },
            update: {},
            create: {
              email,
              name,
              props: {
                create: {
                },
              },
            },
          });
          return true
          // Example condition based on email verification and domain
          // return profile?.email_verified && email.endsWith("@example.com");
        } catch (error) {
          console.error("Failed to find user:", error);
          return false;
        }
      }

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return ''
    // },
  },

};
