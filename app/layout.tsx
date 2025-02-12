import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/providers";

import { Plus_Jakarta_Sans } from "next/font/google"; // Inter, Work_Sans, Plus_Jakarta_Sans

// Initialize Inter font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  preload: true,
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | TapNotify - Scalable SMS Campaigns Made Easy",
    default: "TapNotify - Scalable SMS Campaigns Made Easy", // This is used when no title is provided
  },
  description:
    "TapNotify is a powerful SMS marketing platform that helps you send personalized messages at scale. Manage contacts, create message templates, and launch targeted campaigns effortlessly.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={jakarta.variable}>
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
