"use client";

import { columns } from "@/app/app/[teamSlug]/contacts/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { Contact } from "@prisma/client";
import { ContactIcon, PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function ContactClient({
  initialData,
}: {
  initialData: Contact[];
}) {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Contacts`}
        number={initialData.length}
        mainIcon={ContactIcon}
        description="Manage your contacts"
        redirect={{
          label: "Add Contact",
          href: `/app/${params.teamSlug}/contacts/add`,
          icon: PlusIcon,
        }}
      />
      <DataTable searchKey="name" columns={columns} data={initialData} />
    </>
  );
}
