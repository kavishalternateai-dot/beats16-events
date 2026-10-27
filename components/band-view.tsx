import { getBandPage, type BandPage } from "@/content/bands";
import { StoryView } from "@/components/story-view";

export function BandView({ bandId }: { bandId: BandPage["id"] }) {
  const band = getBandPage(bandId);

  return (
    <StoryView
      story={band.story}
      path={band.href}
      name={band.name}
      description={band.metaDescription}
      bandId={band.id}
    />
  );
}
