"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react"; // Added for the coming soon indicator

export default function ComingSoonMagicLink() {
  return (
    <Card className="w-full p-10 space-y-6 border-dashed border-muted relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="space-y-6 opacity-50">
        <p className="text-sm text-muted-foreground">
          We&apos;ll send you a secure link to sign in to your account.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 pr-32 transition-all duration-200"
                  disabled={true}
                />
                <div className="absolute right-2 top-0 h-full flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={true}
                    className="h-7 px-3 text-xs font-medium transition-colors"
                  >
                    Send link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}
