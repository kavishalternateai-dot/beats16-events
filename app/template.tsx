import { ViewTransition } from "react";

/**
 * Crossfades page content on App Router navigations.
 * The header, footer, and mobile bar sit outside this template, so they stay put.
 * `update="none"` keeps form input and disclosure toggles from retriggering it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none" share="none" update="none">
      {children}
    </ViewTransition>
  );
}
