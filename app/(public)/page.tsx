"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className=" bg-gradient-to-b from-background to-secondary flex flex-grow">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transform Text into Video with AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            DopeClips: Where your words become visual stories
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your text here..."
              className="flex-grow"
            />
            <Button>Generate</Button>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-2xl aspect-video bg-muted rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Placeholder for video preview or demo */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Video Preview
          </div>
        </motion.div>
      </main>
    </div>
  );
}
