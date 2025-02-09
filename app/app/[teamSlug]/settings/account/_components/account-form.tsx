"use client";

import Heading from "@/app/app/_components/heading";
import { User } from "@prisma/client";

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
        deleteButton={{
          label: "Delete Account",
          onClick: onDelete,
          confirmModal: {
            heading: "Delete Account",
            description: "Are you sure you want to delete your account?",
          },
        }}
      />
      <div className="h-full text-xl"> Coming Soon...</div>
    </>
  );
}
