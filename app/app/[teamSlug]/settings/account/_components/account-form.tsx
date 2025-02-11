"use client";

import Heading from "@/app/app/_components/heading";
import UnderDevelopment from "@/app/app/_components/under-development";
import { User } from "@prisma/client";
import { UserCog } from "lucide-react";

interface AccountFormProps {
  initialData: User;
}

export default function AccountForm({ initialData }: AccountFormProps) {
  console.log(initialData);

  //   const onSubmit = () => {
  //     // Update user account
  //   };

  const onDelete = () => {
    // Delete user account
  };

  return (
    <>
      <Heading
        title="Account Settings"
        description="Manage your account settings (independent of the team)"
        mainIcon={UserCog}
        deleteButton={{
          label: "Delete Account",
          onClick: onDelete,
          confirmModal: {
            heading: "Delete Account",
            description: "Are you sure you want to delete your account?",
          },
        }}
      />
      <UnderDevelopment />
    </>
  );
}
