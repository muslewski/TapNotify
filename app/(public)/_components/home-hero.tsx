"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Shield,
    text: "Enterprise-grade security",
  },
  {
    icon: Zap,
    text: "Lightning-fast delivery",
  },
  {
    icon: Users,
    text: "99.9% delivery rate",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeHero() {
  return (
    <div className="snap-start relative bg-gradient-to-b from-background to-secondary/20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8"
        >
          <div className="relative">
            <MessageSquare className="w-16 h-16 mx-auto text-primary" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Mass SMS, <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl max-w-2xl mx-auto">
            Reach thousands of clients instantly with our powerful, reliable,
            and secure SMS platform. Start connecting with your audience today.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button size="lg" className="group" asChild>
            <Link href="sign-in">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 space-y-6">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="flex items-center space-x-2 text-muted-foreground"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="pt-6 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-sm text-muted-foreground">
              Trusted by innovative companies worldwide
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
