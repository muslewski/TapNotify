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
import { UploadDropzone } from "@/lib/utils";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().optional(),
});

export default function CreateTeamPage() {
  // Define form hook with zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logoUrl: "",
    },
  });

  // get loading state from form
  const { isSubmitting } = form.formState;

  // Handle form submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send request to create team
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();

      // Redirect to the team page with refresh
      window.location.assign(`/app/${data.team.slug}`);

      toast.success("Team created successfully");
    } catch (error) {
      console.error("[CREATE_TEAM_PAGE]", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Team</CardTitle>
          <CardDescription>
            Build a team to streamline your notification campaigns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Example Corp"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Set a name to represent your team.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Logo Image{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      {/* <Input
                        disabled={isSubmitting}
                        placeholder="https://example.com/logo.png"
                        {...field}
                      /> */}
                      <div className="flex flex-col items-start w-fit">
                        {!form.getValues("logoUrl") ? (
                          <div>
                            <UploadDropzone
                              appearance={{
                                button:
                                  "ut-ready:bg-primary ut-uploading:cursor-not-allowed w-fit text-sm font-medium h-10 px-4 py-2 rounded-md bg-primary bg-none after:bg-orange-400",
                                container:
                                  "w-max flex-row rounded-md cursor-pointer",
                              }}
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                const uploadedUrl = res[0]?.url;
                                form.setValue("logoUrl", uploadedUrl);
                                toast.success("Image uploaded successfully");
                              }}
                              onUploadError={(error) => {
                                console.error("Upload error", error);
                                toast.error("Upload failed");
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 items-start">
                            <Button
                              variant="secondary"
                              onClick={() => {
                                form.setValue("logoUrl", "");
                              }}
                              className="mt-2"
                            >
                              Remove Image
                            </Button>
                            <Image
                              src={
                                form.getValues("logoUrl") ||
                                "/fallbacks/user.png"
                              }
                              alt="Team Logo"
                              className="object-cover w-full rounded-lg"
                              width={124}
                              height={124}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add a logo to give your team a visual identity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
