"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/lib/uploadthing-components";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Image as ImageIcon,
  Loader2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user"; // Adjust import path as needed
import { useEffect } from "react";
import { useTeamStore } from "@/store/use-team-store";

const formSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().optional(),
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CreateTeamPage() {
  const { fetchTeams, activeTeam, teams } = useTeamStore();
  const currentUser = useCurrentUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logoUrl: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (currentUser?.id) {
      fetchTeams(currentUser.id);
    }
  }, [currentUser?.id, fetchTeams]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground"
        >
          Loading user data...
        </motion.div>
      </div>
    );
  }

  // Only show back button if we have teams and we're coming from a team context
  const shouldShowBackButton = teams && teams.length > 0 && activeTeam;
  const backUrl = shouldShowBackButton
    ? `/app/${activeTeam.slug}/dashboard`
    : null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: currentUser.id,
        }),
      });

      if (!response.ok) {
        toast.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      if (currentUser.id) {
        await fetchTeams(currentUser.id);
      }
      window.location.assign(`/app/${data.team.slug}/dashboard`);
      toast.success("Team created successfully");
    } catch (error) {
      console.error("[CREATE_TEAM_PAGE]", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex flex-col items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {backUrl && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <Link href={backUrl}>
              <Button
                variant="ghost"
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>
        )}

        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-primary" />
              <CardTitle>
                {backUrl ? "Create Team" : "Create First Team"}
              </CardTitle>
            </div>
            <CardDescription className="text-base">
              Build a team to streamline your notification campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Team Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Example Corp"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be your team&apos;s display name
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={fadeIn} transition={{ delay: 0.3 }}>
                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-base">
                          Team Logo{" "}
                          <span className="text-muted-foreground text-sm">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-start space-y-4">
                            {!form.getValues("logoUrl") ? (
                              <div className="w-full">
                                <UploadDropzone
                                  appearance={{
                                    button:
                                      "ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-md bg-primary hover:bg-primary/90 transition-colors",
                                    container:
                                      "rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors",
                                  }}
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
                                    const uploadedUrl = res[0]?.url;
                                    form.setValue("logoUrl", uploadedUrl);
                                    toast.success(
                                      "Image uploaded successfully"
                                    );
                                  }}
                                  onUploadError={(error) => {
                                    console.error("Upload error", error);
                                    toast.error("Upload failed");
                                  }}
                                />
                              </div>
                            ) : (
                              <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative group w-32 h-32"
                              >
                                <Image
                                  src={
                                    form.getValues("logoUrl") ||
                                    "/fallbacks/user.png"
                                  }
                                  alt="Team Logo"
                                  className="rounded-lg object-cover border-2 group-hover:border-destructive/50 transition-colors"
                                  fill
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => form.setValue("logoUrl", "")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" />
                          Add a logo to give your team a visual identity
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 text-base"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Creating..." : "Create Team"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
