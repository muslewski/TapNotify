"use server";

import { signIn } from "@/auth";

export const signInResend = async (email: string, redirectTo: string) => {
  try {
    const response = await signIn("resend", {
      email,
      callbackUrl: redirectTo, // Redirect to the callback URL
      redirect: false, // Do not redirect to verifyRequest page
    });

    console.log("RESPONSE", response);

    if (response.ok) {
      return {
        success: true,
        message: "Verification email successfully sent!",
      };
    } else {
      return { success: false, message: "Failed to send verification email." };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send verification email." };
  }
};
