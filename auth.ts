import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Resend from "next-auth/providers/resend";
import prisma from "@/lib/prisma";
import { sendVerificationRequest } from "./lib/auth-email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Facebook,
    Twitter,
    GitHub,
    Resend({
      from: `TapNotify <${process.env.RESEND_EMAIL}>`,
      sendVerificationRequest,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
