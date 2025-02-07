"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

export default function HomeHero() {
  return (
    <div className="snap-start bg-gradient-to-b from-background to-secondary/20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8"
        >
          <MessageSquare className="w-16 h-16 mx-auto text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Mass SMS, Made Simple
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-3 text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl"
        >
          Reach thousands of clients instantly with our powerful SMS platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="max-w-xs"
          />
          <Button size="lg">Get Started</Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16"
      >
        <p className="text-sm text-muted-foreground">
          Trusted by over 1,000+ businesses worldwide
        </p>
      </motion.div>
    </div>
  );
}
