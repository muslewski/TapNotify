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

const floatingAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export default function HomeHero() {
  return (
    <div className="snap-start bg-gradient-to-b from-background to-secondary/20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        variants={floatingAnimation}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 -z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8 relative w-16 h-16 mx-auto"
        >
          <MessageSquare className="w-16 h-16 text-primary relative z-10" />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Mass SMS,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary px-3 py-2">
                Made Simple
              </span>
              <motion.span
                className="absolute inset-0 bg-primary/10 -z-10 rounded-lg skew-x-12"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  left: "-0.5rem", // Adds extra space on the left
                  right: "-0.5rem", // Adds extra space on the right
                  top: "-0.25rem", // Adds extra space on top
                  bottom: "-0.25rem", // Adds extra space on bottom
                }}
              />
            </span>
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
          <Button size="lg" className="group relative overflow-hidden" asChild>
            <Link href="sign-in">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-secondary/80 transition-colors duration-300"
            asChild
          >
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
                whileHover={{ y: -5 }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300"
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
