"use client";

import { motion } from "framer-motion";
import MagicLink from "@/components/auth/magic-link";
import OAuth from "@/components/auth/oauth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export default function LoginCard() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6 2xl:space-y-12"
    >
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Sign in to TapNotify
        </h1>
        <p className="text-sm text-muted-foreground">
          Start managing your SMS communications
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <OAuth callbackUrl={callbackUrl} />
      </motion.div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <motion.div variants={itemVariants}>
        <MagicLink callbackUrl={callbackUrl} />
      </motion.div>
    </motion.div>
  );
}
