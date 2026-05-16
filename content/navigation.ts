export type NavigationItem = {
  label: string;
  href: string;
  active: boolean;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Lessons", href: "/lessons", active: true },
  { label: "Visit", href: "/visit", active: true },
  { label: "Giving", href: "/giving", active: true },
  { label: "Blog", href: "/blog", active: true },
  { label: "Contact", href: "/contact", active: true },
];

export const footerNavigation: NavigationItem[] = [
  { label: "Lesson Library", href: "/lessons", active: true },
  { label: "Flagship Teaching", href: "/teachings/the-law-and-the-testimony", active: true },
  { label: "Giving", href: "/giving", active: true },
  { label: "Blog", href: "/blog", active: true },
];
