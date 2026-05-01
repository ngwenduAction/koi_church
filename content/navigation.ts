export type NavigationItem = {
  label: string;
  href: string;
  active: boolean;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Lessons", href: "/lessons", active: true },
  { label: "Visit", href: "/visit", active: false },
  { label: "Beliefs", href: "/mission-beliefs", active: false },
  { label: "Teachings", href: "/teachings", active: false },
  { label: "Contact", href: "/contact", active: false },
];
