/**
 * About timeline. `year` and `image` stay empty until they are confirmed.
 * Adding either one does not change the row structure.
 * Milestones 2, 7 and 8 stay off until their details are confirmed.
 * Growing up is one line, not a second copy of the band cards.
 */
export type TimelineMilestone = {
  id: string;
  title: string;
  text: string;
  year?: string;
  image?: string;
  imageAlt?: string;
};

export type TimelineEra = {
  id: string;
  label: string;
  milestones: TimelineMilestone[];
};

export const aboutEras: TimelineEra[] = [
  {
    id: "beginning",
    label: "The beginning",
    milestones: [
      {
        id: "start",
        title: "Tushar Sonigra starts Beats16 in Mumbai",
        text: "Families call him Tushar ji.",
      },
    ],
  },
  {
    id: "growing",
    label: "Growing up",
    milestones: [
      {
        id: "bands",
        title: "The music grows with the work",
        text: "One wedding led to the next, and one festival led to another. Each celebration asked for its own sound.",
      },
    ],
  },
  {
    id: "today",
    label: "Today",
    milestones: [
      {
        id: "today",
        title: "5,000+ events and 80+ Navratris",
        text: "In India and abroad. Tushar ji still answers every inquiry personally.",
      },
    ],
  },
];
