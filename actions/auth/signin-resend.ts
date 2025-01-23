"use server";

import { signIn } from "@/auth";

export const signInResend = async (email: string, redirectTo: string) => {
  try {
    await signIn("resend", {
      email,
      callbackUrl: redirectTo, // Redirect to the callback URL
      redirect: false, // Do not redirect to verifyRequest page
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send verification email.");
  }
};
