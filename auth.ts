import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Twitter, GitHub, Discord],
});
