"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Shield,
    text: "Enterprise-grade security",
    description: "Bank-level encryption",
  },
  {
    icon: Zap,
    text: "Lightning-fast delivery",
    description: "Under 5 seconds globally",
  },
  {
    icon: Users,
    text: "99.9% delivery rate",
    description: "Industry-leading reliability",
  },
];

// Animated counter for statistics
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;
      setCount(Math.floor(progress * value));

      if (currentStep === steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}+</span>;
};

// Enhanced animations
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

const glowVariants = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HomeHero() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="snap-start bg-gradient-to-b from-background to-secondary/20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute left-1/4 top-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        style={{ opacity, y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto relative z-10"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 backdrop-blur-sm border border-secondary/20"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            New: AI-Powered SMS Templates
          </span>
        </motion.div>

        {/* Main Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8 relative w-20 h-20 mx-auto"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl" />
          <MessageSquare className="w-20 h-20 text-primary relative z-10" />
        </motion.div>

        {/* Hero Content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Mass SMS,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary px-3 py-2">
                Made Simple
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10 rounded-lg skew-x-12"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  left: "-0.5rem",
                  right: "-0.5rem",
                  top: "-0.25rem",
                  bottom: "-0.25rem",
                }}
              />
            </span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl max-w-2xl mx-auto leading-relaxed">
            Reach thousands of clients instantly with our powerful, reliable,
            and secure SMS platform. Start connecting with your audience today.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            asChild
          >
            <Link href="sign-in">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg hover:bg-secondary/80 transition-all duration-300 border-secondary/50"
            asChild
          >
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants} className="mt-20 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 border border-secondary/10"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {feature.text}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-16 pt-8 border-t border-border/50"
          >
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  <AnimatedNumber value={5000} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Active Users
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  <AnimatedNumber value={1000000} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Messages/Day
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  <AnimatedNumber value={99.9} />%
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Delivery Rate
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            className="pt-8 flex flex-col items-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex items-center space-x-2 text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Trusted by innovative companies worldwide</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
