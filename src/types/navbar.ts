import React from 'react';

export interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  dropdownItems?: DropdownItem[];
}

export interface NavCTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface NavbarProps {
  logo: React.ReactNode | string;
  logoHref?: string;
  links: NavLink[];
  cta?: NavCTA;
  className?: string;
  onCtaClick?: () => void;
}
