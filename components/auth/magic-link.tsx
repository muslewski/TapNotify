"use client";

import { useState } from "react";
import { signInResend } from "@/actions/auth/signin-resend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    setErrorMessage(null);

    try {
      await signInResend(data.email, callbackUrl);
      setStatus("sent");
      toast.success("Check your email for the magic link.");
    } catch (error) {
      setStatus("error");
      toast.error("Failed to send email. Please try again.");
      setErrorMessage("Failed to send email. Please try again.");
      console.error(error);
    }
  };

  const handleInputChange = () => {
    if (status === "sent" || status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            onChange: handleInputChange,
          })}
          disabled={status === "sending"}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="default"
        disabled={status === "sending" || status === "sent"}
      >
        {status === "idle" && "Send Magic Link"}
        {status === "sending" && "Sending..."}
        {status === "sent" && "Email Sent"}
        {status === "error" && "Try Again"}
      </Button>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </form>
  );
}
