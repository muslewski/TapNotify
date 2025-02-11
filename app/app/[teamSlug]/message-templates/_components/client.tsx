"use client";

import { columns } from "@/app/app/[teamSlug]/message-templates/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { MessageTemplate } from "@prisma/client";
import { MessageSquareDashed, PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function ContactClient({
  initialData,
}: {
  initialData: MessageTemplate[];
}) {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Message Templates`}
        number={initialData.length}
        mainIcon={MessageSquareDashed}
        description="Manage your message templates"
        redirect={{
          label: "Create New",
          href: `/app/${params.teamSlug}/message-templates/create`,
          icon: PlusIcon,
        }}
      />
      <DataTable searchKey="title" columns={columns} data={initialData} />
    </>
  );
}
