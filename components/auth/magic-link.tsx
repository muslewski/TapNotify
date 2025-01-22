"use client";

import { signInResend } from "@/actions/auth/signin-resend";
import { Button, Input, Form } from "@heroui/react";
import { useState } from "react";

interface MagicLinkProps {
  callbackUrl: string;
}

export default function MagicLink({ callbackUrl }: MagicLinkProps) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.email) {
      setErrors({ email: "Email is required." });
      return;
    }

    try {
      setErrors({});
      setLoading(true);

      const response = await signInResend(data.email as string, callbackUrl);

      if (response.success) {
        console.log("Email sent successfully!");
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="flex flex-col w-full items-end"
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <Input
        label="Email"
        name="email"
        variant="bordered"
        type="email"
        description="Log in securely with a link sent to your email."
        classNames={{ label: "text-default-foreground" }}
        isClearable
      />
      <Button type="submit" color="secondary" isLoading={loading}>
        Send
      </Button>
    </Form>
  );
}
