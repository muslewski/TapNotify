"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Wand2, Zap, Layers, Palette, Globe } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Video Generation",
      description:
        "Transform your text into high-quality videos with our cutting-edge AI technology.",
      icon: <Video className="h-6 w-6" />,
      badge: "Core",
    },
    {
      title: "Custom Styling",
      description:
        "Personalize your videos with a wide range of styles, fonts, and visual effects.",
      icon: <Palette className="h-6 w-6" />,
      badge: "Pro",
    },
    {
      title: "Lightning-Fast Rendering",
      description:
        "Get your videos in minutes, not hours, thanks to our optimized rendering engine.",
      icon: <Zap className="h-6 w-6" />,
      badge: "Speed",
    },
    {
      title: "Multi-Language Support",
      description:
        "Create videos in multiple languages to reach a global audience.",
      icon: <Globe className="h-6 w-6" />,
      badge: "Global",
    },
    {
      title: "Scene Customization",
      description:
        "Fine-tune each scene of your video for the perfect storytelling experience.",
      icon: <Layers className="h-6 w-6" />,
      badge: "Control",
    },
    {
      title: "Magic Edit",
      description:
        "Easily make last-minute changes to your video without starting from scratch.",
      icon: <Wand2 className="h-6 w-6" />,
      badge: "Edit",
    },
  ];

  return (
    <div className="container mx-auto py-12 flex-grow flex flex-col items-center justify-center">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Powerful Features
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </motion.div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            <Badge variant="secondary">{feature.badge}</Badge>
          </div>
          <CardTitle className="mt-4">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{feature.description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
