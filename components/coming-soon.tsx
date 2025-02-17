"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, HomeIcon, Sparkles } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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
  },
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ComingSoon() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="p-8 space-y-8 relative overflow-hidden border-dashed">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#a057ff,transparent)]" />
          </div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              className="flex items-center justify-center space-x-2 bg-muted px-4 py-2 rounded-full"
            >
              <Clock className="h-4 w-4" />
              <span className="font-medium">Coming Soon</span>
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Something Exciting is Coming!
            </h1>
            <p className="text-muted-foreground text-sm">
              We&apos;re working hard to bring you something amazing. Stay tuned
              for updates!
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-4 flex justify-center"
          >
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  <span>Back to Homepage</span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>

          {/* Optional: Add a subtle decoration */}
          <div className="absolute bottom-2 right-2 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-24 w-24" />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
