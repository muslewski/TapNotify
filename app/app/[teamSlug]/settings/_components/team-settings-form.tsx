"use client";

import { CountryCodeField } from "@/app/app/_components/country-code-field";
import Heading from "@/app/app/_components/heading";
import { Button } from "@/components/ui/button";
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
import { UploadDropzone } from "@/lib/uploadthing-components";
import { useTeamStore } from "@/store/use-team-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Team } from "@prisma/client";
import { CogIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  defaultCountryCode: z.string().optional(),
  logoUrl: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function TeamSettingsForm({
  initialData,
}: {
  initialData: Team;
}) {
  const params = useParams();
  const router = useRouter();
  const { updateTeam } = useTeamStore();

  const [loading, setLoading] = useState(false); // because we have onDelete outside of the form

  // Initialize form hook
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema), // Use Zod resolver for validation
    defaultValues: {
      ...initialData,
      logoUrl: initialData.logoUrl ?? undefined,
      defaultCountryCode: initialData.defaultCountryCode ?? undefined,
    }, // Set initial form values
  });

  // get loading state from form
  const { isSubmitting } = form.formState;

  // Handle form submission
  const onSubmit = async (data: SettingsFormValues) => {
    try {
      // Send request to update team
      const response = await fetch(`/api/teams/${params.teamSlug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        const errorMessage = await response.text();
        form.setError("slug", { message: errorMessage });
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Update the team in the store
      updateTeam({ ...initialData, ...data });

      await new Promise((resolve) => setTimeout(resolve, 50));
      // Check if the slug has changed and push to the new URL if it has
      if (data.slug !== initialData.slug) {
        router.push(`/app/${data.slug}/dashboard`);
      } else {
        // Refresh the page to reflect changes
        router.refresh();
      }

      toast.success("Team updated successfully.");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("Something went wrong.");
    }
  };

  // Handle delete team action
  const onDelete = async () => {
    console.log("Team Slug: ", params.teamSlug);
    try {
      setLoading(true);
      // Send request to delete team
      const response = await fetch(`/api/teams/${params.teamSlug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error(`Error: ${response.status} ${response.statusText}`);
      }

      // Update the team in the store to reflect the deletion
      updateTeam({});
      router.push("/app");

      toast.success("Team deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Make sure you removed all campaigns and contacts first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading
        title="Team Settings"
        mainIcon={CogIcon}
        description="Add and manage team members, roles, and permissions for collaboration."
        deleteButton={{
          label: "Delete Team",
          onClick: onDelete,
          confirmModal: {
            heading: "Delete Team",
            description: "Are you sure you want to delete this team?",
          },
        }}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 w-full flex flex-col"
        >
          <div className="flex flex-wrap  gap-y-10 gap-x-20">
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="example-corp"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A unique identifier for your team.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CountryCodeField control={form.control} disabled={isSubmitting} />

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
                            form.getValues("logoUrl") || "/fallbacks/user.png"
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
                  {form.getValues("logoUrl")
                    ? "Your team's logo."
                    : "Add a logo to give your team a visual identity."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-fit bg-foreground hover:bg-muted-foreground"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </Form>
    </>
  );
}
