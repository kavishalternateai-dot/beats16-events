import type { Metadata } from "next";
import { corporateSeo, corporateStory } from "@/content/corporate";
import { StoryView } from "@/components/story-view";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: corporateSeo.title,
  description: corporateSeo.description,
  path: "/corporate-cultural",
});

export default function CorporatePage() {
  return (
    <StoryView
      story={corporateStory}
      path="/corporate-cultural"
      name="Corporate & cultural events"
      description={corporateSeo.description}
    />
  );
}
