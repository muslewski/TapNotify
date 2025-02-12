"use client";

import LoginCard from "@/components/auth/login-card";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden mt-32 md:mt-0">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px]" />
      </div>

      {/* Left side - Login Form */}
      <div className="relative flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-20 bg-background/95 backdrop-blur-[2px]">
        <Card className="w-full xl:max-w-[700px] xl:min-w-[700px] p-4 sm:p-6 lg:p-8 shadow-md dark:shadow-2xl dark:shadow-primary/5 border-neutral-200/50 dark:border-neutral-800/50">
          <LoginCard />
        </Card>
      </div>

      {/* Right side - Branding Section - Show on mobile as well */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative flex lg:w-[45%] bg-gradient-to-b from-muted/60 via-muted/30 to-transparent dark:from-muted/20 dark:via-muted/10 dark:to-transparent p-6 sm:p-10 lg:p-20 flex-col justify-between"
      >
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-32 sm:w-64 h-32 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-32 sm:w-64 h-32 sm:h-64 bg-primary/5 rounded-full blur-3xl" />

        <div />
        <div className="relative space-y-6 sm:space-y-12 max-w-[500px]">
          <motion.div
            variants={itemVariants}
            className="space-y-4 sm:space-y-6"
          >
            <div className="relative group">
              <div className="relative h-10 w-10 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 shadow-lg flex items-center justify-center ring-2 ring-primary/10 ring-offset-2 ring-offset-background transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Mass SMS Communication,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary">
                Simplified
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Join thousands of businesses revolutionizing their communication
              with TapNotify&apos;s powerful SMS platform.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 sm:gap-8 pt-4 sm:pt-8"
          >
            <div className="space-y-2 group">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                0M+
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Messages Delivered
              </p>
            </div>
            <div className="space-y-2 group">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                0k+
              </p>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Active Businesses
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative flex items-center space-x-4 pt-10 sm:pt-20"
        >
          <div className="flex -space-x-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-4 ring-background bg-gradient-to-br from-muted-foreground/30 to-muted-foreground/10 transition-transform hover:scale-105 hover:z-10"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
