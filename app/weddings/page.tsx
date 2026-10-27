import type { Metadata } from "next";
import { weddingsSeo, weddingsStory } from "@/content/weddings";
import { StoryView } from "@/components/story-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: weddingsSeo.title,
  description: weddingsSeo.description,
  path: "/weddings",
});

export default function WeddingsPage() {
  return (
    <StoryView
      story={weddingsStory}
      path="/weddings"
      name="Weddings"
      description={weddingsSeo.description}
    />
  );
}
