import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Resend from "next-auth/providers/resend";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Facebook,
    Twitter,
    GitHub,
    Resend({ from: `TapNotify <${process.env.RESEND_EMAIL}>` }),
  ],
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/sign-in",
    error: "/sign-in",
  },
});
