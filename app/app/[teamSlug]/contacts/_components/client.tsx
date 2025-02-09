"use client";

import { columns } from "@/app/app/[teamSlug]/contacts/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { PhoneNumber } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function ContactClient({
  initialData,
}: {
  initialData: PhoneNumber[];
}) {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Contacts (${0})`}
        description="Manage your contacts"
        redirect={{
          label: "Add Contact",
          href: `/app/${params.teamSlug}/contacts/add`,
          icon: PlusIcon,
        }}
      />
      <DataTable columns={columns} data={initialData} />
    </>
  );
}
