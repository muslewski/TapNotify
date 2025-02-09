import CampaignForm from "@/app/app/[teamSlug]/campaigns/[campaignId]/_components/campaign-form";
import Container from "@/app/app/_components/container";

export default async function CreateCampaignPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;
  console.log(teamSlug);

  // // If campaign is not found and campaignId is not "create", show 404
  // if (!contact && contactId !== "add") {
  //   return (
  //     <Container>
  //       <NotFound />
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <CampaignForm />
    </Container>
  );
}
