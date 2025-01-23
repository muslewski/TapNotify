"use client";

import { signInResend } from "@/actions/auth/signin-resend";
import { Button, Input, Form } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MagicLinkProps {
  callbackUrl: string;
}

// Define validation schema with Zod
const schema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .nonempty("Email is required."),
});

// This ensures type safety for the form data
type FormData = z.infer<typeof schema>;

export default function MagicLink({ callbackUrl }: MagicLinkProps) {
  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting, isDirty, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit", // Validate fields when they lose focus
  });

  // Track if the form is submitted and nothing changed
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setIsInvalid(!!errors.email && (touchedFields.email || isDirty));
  }, [errors.email, touchedFields.email, isDirty]);

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    try {
      await signInResend(data.email as string, callbackUrl);
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = () => {
    setFormSubmitted(false);
    setIsInvalid(false);
  };

  const handleInputClear = () => {
    setFormSubmitted(false);
    setIsInvalid(false);
    clearErrors("email");
    reset({ email: "" });
  };

  return (
    <Form
      className="flex flex-col w-full items-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            variant="bordered"
            isDisabled={isSubmitting}
            isInvalid={isInvalid}
            errorMessage={isInvalid ? errors.email?.message : ""}
            description={
              formSubmitted
                ? "Check your email for verification link."
                : "Log in securely with a link sent to your email."
            }
            classNames={{
              label: formSubmitted ? "text-success-500" : "text-secondary-500",
            }}
            color={formSubmitted ? "success" : "secondary"}
            onClear={() => {
              handleInputClear();
              field.onChange("");
            }}
            onChange={(e) => {
              handleInputChange();
              field.onChange(e);
              reset({ email: e.target.value });
            }}
          />
        )}
      />
      <Button
        type="submit"
        isDisabled={isInvalid || isSubmitting || formSubmitted}
        className={cn(
          "transition-colors",
          isInvalid
            ? "bg-danger-300 text-error-foreground"
            : formSubmitted
            ? "bg-success-300 text-success-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
        isLoading={isSubmitting}
        startContent={
          <AnimatePresence>
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckIcon />
              </motion.div>
            )}
          </AnimatePresence>
        }
      >
        {isSubmitting ? "Sending" : formSubmitted ? "Sent" : "Send"}
      </Button>
    </Form>
  );
}
