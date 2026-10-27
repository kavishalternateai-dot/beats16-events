"use client";

import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

type LinkProps = {
  className?: string;
  children?: React.ReactNode;
  location?: string;
  href?: string;
};

export function PhoneLink({ className, children, location = "phone_link" }: LinkProps) {
  return (
    <a
      href={`tel:${site.phoneTel}`}
      className={className}
      onClick={() => trackEvent("call_click", { location })}
    >
      {children ?? site.phoneDisplay}
    </a>
  );
}

export function EmailLink({ className, children, location = "email_link", href }: LinkProps) {
  return (
    <a
      href={href ?? `mailto:${site.email}`}
      className={className}
      onClick={() => trackEvent("email_click", { location })}
    >
      {children ?? site.email}
    </a>
  );
}
