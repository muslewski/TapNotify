"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInResend } from "@/actions/auth/signin-resend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormData = z.infer<typeof schema>;

interface MagicLinkProps {
  callbackUrl: string;
}

export default function MagicLink({ callbackUrl }: MagicLinkProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");

    try {
      await signInResend(data.email, callbackUrl);
      setStatus("sent");
      toast.success("Check your email for the magic link.");
    } catch (error) {
      setStatus("error");
      toast.error("Failed to send email. Please try again.");
      console.error(error);
    }
  };

  const handleInputChange = () => {
    if (status === "sent" || status === "error") {
      setStatus("idle");
    }
  };

  return (
    <Card className="w-full p-10 space-y-6 border-dashed border-muted">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          We&apos;ll send you a secure link to sign in to your account.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={`
                    h-11 
                    pr-32
                    transition-all 
                    duration-200
                    ${errors.email ? "focus-visible:ring-destructive" : ""}
                    ${status === "sent" ? "focus-visible:ring-green-500" : ""}
                  `}
                  {...register("email", { onChange: handleInputChange })}
                  disabled={status === "sending"}
                />
                <div className="absolute right-2 top-0 h-full flex items-center">
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    disabled={status === "sending" || status === "sent"}
                    className={`
                      h-7 
                      px-3 
                      text-xs
                      font-medium
                      transition-colors
                      ${status === "sent" ? "text-green-500" : "text-primary"}
                    `}
                  >
                    {status === "sending" && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    {status === "idle" && "Send link"}
                    {status === "sending" && "Sending..."}
                    {status === "sent" && "Link sent ✨"}
                    {status === "error" && "Try again"}
                  </Button>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-destructive font-medium"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </Card>
  );
}
