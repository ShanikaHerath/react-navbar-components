import { useState } from 'react';
import { 
  Sparkles, 
  Shield, 
  Workflow, 
  Settings, 
  Info, 
  Layers, 
  Code2, 
  Laptop, 
  Smartphone, 
  Copy, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { MinimalistNavbar } from './components/MinimalistNavbar';
import { GlassmorphismNavbar } from './components/GlassmorphismNavbar';
import { DarkModePremiumNavbar } from './components/DarkModePremiumNavbar';
import { NeonCyberpunkNavbar } from './components/NeonCyberpunkNavbar';
import { AuroraNavbar } from './components/AuroraNavbar';
import { RetroNavbar } from './components/RetroNavbar';
import { BrutalistNavbar } from './components/BrutalistNavbar';
import type { NavLink, NavCTA } from './types/navbar';

export default function App() {
  // Navigation Bar Selection
  const [selectedNavbar, setSelectedNavbar] = useState<'minimalist' | 'glass' | 'dark' | 'neon' | 'aurora' | 'retro' | 'brutalist'>('glass');
  
  // Customization States (Props Editor)
  const [logoText, setLogoText] = useState('AETHER');
  const [ctaText, setCtaText] = useState('Get Started');
  const [includeBadges, setIncludeBadges] = useState(true);
  const [includeDropdowns, setIncludeDropdowns] = useState(true);
  
  // Viewport Simulation State
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Copy-code helper state
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Setup sample navigation links
  const sampleLinks: NavLink[] = [
    { 
      label: 'Products', 
      href: '#products',
      dropdownItems: includeDropdowns ? [
        { 
          label: 'Platform Core', 
          href: '#core', 
          description: 'High-performance cloud-native infrastructure.',
          icon: Workflow
        },
        { 
          label: 'Security & Access', 
          href: '#security', 
          description: 'Zero-trust network architecture built-in.',
          icon: Shield
        },
        { 
          label: 'Aether Engine', 
          href: '#engine', 
          description: 'Real-time telemetry and edge analytics.',
          icon: Sparkles
        },
      ] : []
    },
    { 
      label: 'Solutions', 
      href: '#solutions',
      badge: includeBadges ? 'New' : undefined,
      dropdownItems: includeDropdowns ? [
        { 
          label: 'Enterprise Scale', 
          href: '#enterprise', 
          description: 'Managed solutions for global systems.',
          icon: Layers
        },
        { 
          label: 'Developer Hub', 
          href: '#devs', 
          description: 'API docs, SDKs, and sandboxes.',
          icon: Settings
        },
      ] : []
    },
    { 
      label: 'Documentation', 
      href: '#docs',
    },
    { 
      label: 'About', 
      href: '#about',
    }
  ];

  const sampleCTA: NavCTA = {
    label: ctaText,
    href: '#cta',
    variant: 'primary',
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Code Strings for Code Viewer
  const typesCode = `// src/types/navbar.ts
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
}`;

  const getActiveCode = () => {
    switch (selectedNavbar) {
      case 'minimalist':
        return `// src/components/MinimalistNavbar.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const MinimalistNavbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = '#',
  links,
  cta,
  className = '',
  onCtaClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.07, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <nav className={\`w-full bg-white border-b border-slate-100 sticky top-0 z-50 transition-all duration-300 \${className}\`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href={logoHref} className="flex items-center text-xl font-bold tracking-tight text-slate-900 font-sans">
            {typeof logo === 'string' ? (
              <span className="font-extrabold tracking-widest uppercase text-base">{logo}</span>
            ) : logo}
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, idx) => {
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              return (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    if (hasDropdown) setActiveDropdown(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    if (hasDropdown) setActiveDropdown(null);
                  }}
                >
                  <a href={link.href} className="flex items-center gap-1 text-[14px] font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-slate-900 text-white rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && <ChevronDown className={\`w-3.5 h-3.5 transition-transform duration-300 \${activeDropdown === idx ? 'rotate-180' : ''}\`} />}
                  </a>

                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}

                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 mt-3 w-56 bg-white border border-slate-100 rounded-lg shadow-xl p-2 z-50"
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a key={subLink.label} href={subLink.href} className="flex items-start gap-3 p-2.5 rounded-md hover:bg-slate-50 transition-colors duration-200">
                            {subLink.icon && <subLink.icon className="w-4 h-4 text-slate-400 mt-0.5" />}
                            <div>
                              <p className="text-[13px] font-semibold text-slate-800">{subLink.label}</p>
                              {subLink.description && <p className="text-[11px] text-slate-400 font-light mt-0.5 leading-snug">{subLink.description}</p>}
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            {cta && (
              <a href={cta.href} onClick={onCtaClick} className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase border border-slate-900 bg-slate-900 text-white hover:bg-transparent hover:text-slate-900 transition-all duration-300 rounded-none">
                {cta.label}
              </a>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} onClick={toggleMenu} className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden" />
            <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-8 flex flex-col md:hidden">
              <div className="flex items-center justify-between mb-8">
                <span className="font-extrabold tracking-widest uppercase text-base text-slate-900">{typeof logo === 'string' ? logo : 'Menu'}</span>
                <button onClick={toggleMenu} className="p-2 text-slate-500 hover:text-slate-900 focus:outline-none"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex flex-col space-y-6 my-auto">
                {links.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <a href={link.href} onClick={toggleMenu} className="block text-2xl font-light tracking-wide text-slate-800 hover:text-slate-900 hover:pl-2 transition-all duration-300">
                      {link.label}
                      {link.badge && <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-slate-900 text-white rounded-full uppercase tracking-wider">{link.badge}</span>}
                    </a>
                  </motion.div>
                ))}
              </div>
              {cta && (
                <motion.div variants={itemVariants} className="mt-auto pt-8">
                  <a href={cta.href} onClick={() => { toggleMenu(); if (onCtaClick) onCtaClick(); }} className="block w-full py-4 text-center text-xs font-bold tracking-wider uppercase border border-slate-900 bg-slate-900 text-white transition-all duration-300 rounded-none">{cta.label}</a>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};`;
      case 'glass':
        return `// src/components/GlassmorphismNavbar.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Compass } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const GlassmorphismNavbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = '#',
  links,
  cta,
  className = '',
  onCtaClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={\`w-full fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto \${className}\`}>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glassmorphism w-full px-6 md:px-8 py-3.5 rounded-2xl shadow-xl flex items-center justify-between"
      >
        <a href={logoHref} className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-800 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md">
            <Compass className="w-4.5 h-4.5" />
          </div>
          {typeof logo === 'string' ? (
            <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent font-extrabold tracking-tight">
              {logo}
            </span>
          ) : logo}
        </a>

        <div className="hidden md:flex items-center space-x-1">
          {links.map((link, idx) => {
            const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
            return (
              <div
                key={link.label}
                className="relative py-1.5 px-3.5 rounded-xl cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  if (hasDropdown) setActiveDropdown(idx);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  if (hasDropdown) setActiveDropdown(null);
                }}
              >
                <a href={link.href} className="relative z-10 flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors">
                  {link.label}
                  {link.badge && <span className="px-1.5 py-0.5 text-[8px] font-bold bg-indigo-500/10 text-indigo-600 rounded-full">{link.badge}</span>}
                  {hasDropdown && <ChevronDown className={\`w-3.5 h-3.5 transition-transform duration-300 \${activeDropdown === idx ? 'rotate-180 text-indigo-600' : ''}\`} />}
                </a>

                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="glass-hover-pill"
                    className="absolute inset-0 bg-slate-900/5 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <AnimatePresence>
                  {hasDropdown && activeDropdown === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-4 w-64 glassmorphism rounded-xl shadow-2xl p-2 z-50 border border-white/30"
                    >
                      {link.dropdownItems?.map((subLink) => (
                        <a key={subLink.label} href={subLink.href} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/40 transition-all duration-200 group">
                          {subLink.icon && (
                            <div className="p-1.5 rounded-md bg-white/50 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-500/10">
                              <subLink.icon className="w-4 h-4" />
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-bold text-slate-800">{subLink.label}</p>
                            {subLink.description && <p className="text-[10.5px] text-slate-500 mt-0.5">{subLink.description}</p>}
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex items-center">
          {cta && (
            <a href={cta.href} className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transition-all rounded-xl shadow-md">
              {cta.label}
            </a>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none">
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleMenu} className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-40" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="fixed top-20 left-4 right-4 glassmorphism rounded-2xl p-6 z-50 border border-white/40 shadow-2xl flex flex-col">
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <div key={link.label}>
                    <a href={link.href} onClick={toggleMenu} className="flex items-center justify-between text-[15px] font-bold text-slate-800 hover:text-indigo-600 py-1.5">
                      <span>{link.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};`;
      case 'dark':
        return `// src/components/DarkModePremiumNavbar.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const DarkModePremiumNavbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = '#',
  links,
  cta,
  className = '',
  onCtaClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={\`w-full bg-zinc-950/95 border-b border-zinc-800/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 \${className}\`}>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent shadow-[0_1px_8px_rgba(99,102,241,0.5)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href={logoHref} className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white font-sans group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300">
              <Zap className="w-4 h-4 fill-indigo-400/20" />
            </div>
            {typeof logo === 'string' ? (
              <span className="font-extrabold tracking-wide uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {logo}
              </span>
            ) : logo}
          </a>

          <div className="hidden md:flex items-center space-x-6">
            {links.map((link, idx) => {
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              return (
                <div
                  key={link.label}
                  className="relative py-2 px-1"
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    if (hasDropdown) setActiveDropdown(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    if (hasDropdown) setActiveDropdown(null);
                  }}
                >
                  <a href={link.href} className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-zinc-400 hover:text-white transition-colors duration-300">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md">
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && <ChevronDown className={\`w-3.5 h-3.5 transition-transform duration-300 \${activeDropdown === idx ? 'rotate-180 text-indigo-400' : ''}\`} />}
                  </a>

                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="dark-hover-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            {cta && (
              <a href={cta.href} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold tracking-wider uppercase rounded-lg group bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
                <span className="relative px-5 py-2 transition-all bg-zinc-950 rounded-md group-hover:bg-opacity-0">
                  {cta.label}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};`;
      case 'neon':
        return `// src/components/NeonCyberpunkNavbar.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Cpu } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const NeonCyberpunkNavbar: React.FC<NavbarProps> = ({ logo, logoHref = '#', links, cta, className = '', onCtaClick }) => {
  // Dark cyberpunk navbar with neon cyan glow, scanline overlay,
  // and a hot-pink/fuchsia badge accent. Dropdowns use sharp corners
  // and a subtle cyan border glow on hover.
  // ...
};`;
      case 'aurora':
        return `// src/components/AuroraNavbar.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Star } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const AuroraNavbar: React.FC<NavbarProps> = ({ logo, logoHref = '#', links, cta, className = '', onCtaClick }) => {
  // Flowing gradient navbar that transitions between deep purple, blue and
  // teal. Compresses to a near-opaque dark background when scrolled.
  // Features an animated aurora shimmer top stripe and glassy dropdowns.
  // ...
};`;
      case 'retro':
        return `// src/components/RetroNavbar.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const RetroNavbar: React.FC<NavbarProps> = ({ logo, logoHref = '#', links, cta, className = '', onCtaClick }) => {
  // Warm cream-toned retro navbar in a serif typeface with earthy brown
  // accents, double-rule borders, and a hatch-stripe decorative top stripe.
  // Dropdowns use offset box-shadows for a retro print-era feel.
  // ...
};`;
      case 'brutalist':
        return `// src/components/BrutalistNavbar.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Triangle } from 'lucide-react';
import { NavbarProps } from '../types/navbar';

export const BrutalistNavbar: React.FC<NavbarProps> = ({ logo, logoHref = '#', links, cta, className = '', onCtaClick }) => {
  // High-contrast brutalist navbar in vivid yellow (#f5f500) and pure black.
  // Uses bold Impact/Arial Black typography, thick borders, and offset shadows.
  // Mobile menu slides down from the top and stacks links with heavy dividers.
  // ...
};`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased pb-24 selection:bg-indigo-500 selection:text-white">
      
      {/* Header and Hero Section */}
      <header className="relative py-16 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-[-20%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[80px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 hover:scale-105 transition-transform">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          High-Fidelity UI Suite
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Modern React <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Navigation Bars</span>
        </h1>
        
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-6 font-light leading-relaxed">
          Seven responsive, props-driven navigation components designed with TypeScript, Tailwind CSS, and fluid Framer Motion animations.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column: Controls Panel */}
        <section className="lg:col-span-1 bg-slate-850/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 h-fit flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">Customize Props</h2>
          </div>

          {/* Logo Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Logo Text</label>
            <input 
              type="text" 
              value={logoText} 
              onChange={(e) => setLogoText(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-sm text-slate-200 transition-colors"
            />
          </div>

          {/* CTA Text Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">CTA Label</label>
            <input 
              type="text" 
              value={ctaText} 
              onChange={(e) => setCtaText(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none text-sm text-slate-200 transition-colors"
            />
          </div>

          {/* Configuration Toggles */}
          <div className="flex flex-col gap-4 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeBadges} 
                onChange={(e) => setIncludeBadges(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-500 bg-slate-900 border-slate-800 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">Include Menu Badges</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeDropdowns} 
                onChange={(e) => setIncludeDropdowns(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-500 bg-slate-900 border-slate-800 focus:ring-0 focus:ring-offset-0"
              />
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">Enable Nested Dropdowns</span>
            </label>
          </div>

          {/* Viewport Control */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Simulate Viewport</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl">
              <button 
                onClick={() => setViewportMode('desktop')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  viewportMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                Desktop
              </button>
              <button 
                onClick={() => setViewportMode('mobile')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                  viewportMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile
              </button>
            </div>
          </div>
        </section>

        {/* Right Columns: Showcase & Code Viewer */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Navigation Bar Style Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {([
              { key: 'minimalist', label: 'Minimalist' },
              { key: 'glass',      label: 'Glassmorphism' },
              { key: 'dark',       label: 'Dark Premium' },
              { key: 'neon',       label: 'Neon Cyberpunk' },
              { key: 'aurora',     label: 'Aurora' },
              { key: 'retro',      label: 'Retro' },
              { key: 'brutalist',  label: 'Brutalist' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedNavbar(key)}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all ${
                  selectedNavbar === key
                    ? 'bg-slate-850 text-white border border-slate-700 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Interactive Preview Canvas */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-850">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10.5px] font-mono text-slate-400 tracking-wide">
                <span>localhost:3000/preview</span>
                <RefreshCw className="w-3 h-3 animate-spin-slow hover:text-indigo-400 cursor-pointer" />
              </div>
              <div className="w-12" /> {/* spacing element */}
            </div>

            {/* Simulated Frame Canvas */}
            <div className="relative bg-slate-950 min-h-[480px] p-6 flex flex-col justify-start overflow-hidden transition-all duration-300">
              
              {/* Conditional background highlighting styling details */}
              {selectedNavbar === 'glass' && (
                <div className="absolute inset-0 bg-slate-950 flex items-center justify-center pointer-events-none">
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-600/35 blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500/25 blur-3xl" />
                </div>
              )}
              {selectedNavbar === 'minimalist' && (
                <div className="absolute inset-0 bg-slate-50 pointer-events-none transition-colors duration-300" />
              )}
              {selectedNavbar === 'dark' && (
                <div className="absolute inset-0 bg-zinc-950 pointer-events-none transition-colors duration-300" />
              )}
              {selectedNavbar === 'neon' && (
                <div className="absolute inset-0 bg-black pointer-events-none">
                  <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
                </div>
              )}
              {selectedNavbar === 'aurora' && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #0a061e 0%, #0f1730 50%, #06161f 100%)' }}>
                  <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl" style={{ background: '#6337cb' }} />
                  <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: '#0ea5e9' }} />
                </div>
              )}
              {selectedNavbar === 'retro' && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: '#f3ede0' }} />
              )}
              {selectedNavbar === 'brutalist' && (
                <div className="absolute inset-0 pointer-events-none bg-white" />
              )}

              {/* Viewport Frame Box Wrapper */}
              <div 
                className={`w-full mx-auto transition-all duration-500 z-10 ${
                  viewportMode === 'mobile' ? 'max-w-[360px] border-8 border-slate-800 rounded-[32px] overflow-y-auto bg-slate-900 shadow-2xl h-[580px] relative' : 'w-full relative'
                }`}
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                {/* Embedded Navbar Instance */}
                {selectedNavbar === 'minimalist' && (
                  <MinimalistNavbar logo={logoText} links={sampleLinks} cta={sampleCTA} />
                )}
                {selectedNavbar === 'glass' && (
                  <GlassmorphismNavbar
                    logo={logoText}
                    links={sampleLinks}
                    cta={sampleCTA}
                    className={viewportMode === 'mobile' ? '!top-3 !left-3 !right-3 !px-0' : ''}
                  />
                )}
                {selectedNavbar === 'dark' && (
                  <DarkModePremiumNavbar logo={logoText} links={sampleLinks} cta={sampleCTA} />
                )}
                {selectedNavbar === 'neon' && (
                  <NeonCyberpunkNavbar logo={logoText} links={sampleLinks} cta={sampleCTA} />
                )}
                {selectedNavbar === 'aurora' && (
                  <AuroraNavbar logo={logoText} links={sampleLinks} cta={sampleCTA} />
                )}
                {selectedNavbar === 'retro' && (
                  <RetroNavbar logo={logoText} links={sampleLinks} cta={sampleCTA} />
                )}
                {selectedNavbar === 'brutalist' && (
                  <BrutalistNavbar logo={logoText} links={sampleLinks} cta={sampleCTA} />
                )}

                {/* Simulated Webpage Contents */}
                {(() => {
                  const isLight = selectedNavbar === 'minimalist' || selectedNavbar === 'retro' || selectedNavbar === 'brutalist';
                  const isRetro = selectedNavbar === 'retro';
                  const isBrutalist = selectedNavbar === 'brutalist';
                  return (
                    <div className={`p-8 mt-12 flex flex-col justify-center text-center`}
                      style={{ color: isLight ? (isRetro ? '#5c3d23' : (isBrutalist ? '#000' : '#1e293b')) : '#cbd5e1' }}
                    >
                      <h3
                        className="text-2xl font-black"
                        style={{
                          color: isRetro ? '#3d2b1f' : isBrutalist ? '#000' : isLight ? '#0f172a' : '#fff',
                          fontFamily: isRetro ? "'Georgia', serif" : isBrutalist ? "'Arial Black', Impact, sans-serif" : undefined,
                        }}
                      >
                        Interactive Mock Page
                      </h3>
                      <p className="text-xs max-w-sm mx-auto mt-3 font-light leading-relaxed">
                        Test the transitions, nested submenus, responsive hamburger toggles, and sliding indicator overlays.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        {[
                          { title: 'Subtle Micro-Animations', desc: 'Hover tabs use Framer Motion layout transition models.' },
                          { title: 'Responsive Hamburger', desc: 'Auto scales and overlays clean overlay panels for mobile viewports.' },
                        ].map((card, i) => {
                          let cardStyle: React.CSSProperties = {};
                          let cardClass = 'p-4 rounded-xl text-left border';
                          if (selectedNavbar === 'minimalist') cardClass += ' bg-white border-slate-200/60 shadow-sm';
                          else if (selectedNavbar === 'glass') cardClass += ' glassmorphism border-white/10';
                          else if (selectedNavbar === 'retro') {
                            cardClass += ' text-left';
                            cardStyle = { background: '#faf7f0', border: '2px solid #8b7355', boxShadow: '3px 3px 0 #8b7355' };
                          } else if (selectedNavbar === 'brutalist') {
                            cardClass += ' text-left';
                            cardStyle = { background: '#f5f500', border: '3px solid #000', boxShadow: '4px 4px 0 #000' };
                          } else if (selectedNavbar === 'neon') {
                            cardClass += ' text-left';
                            cardStyle = { background: 'rgba(0,255,255,0.03)', border: '1px solid rgba(0,255,255,0.2)', boxShadow: '0 0 16px rgba(0,255,255,0.06)' };
                          } else if (selectedNavbar === 'aurora') {
                            cardClass += ' text-left';
                            cardStyle = { background: 'rgba(99,55,203,0.25)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' };
                          } else {
                            cardClass += ' bg-zinc-900/60 border-zinc-800';
                          }
                          return (
                            <div key={i} className={cardClass} style={cardStyle}>
                              <h4
                                className="text-xs font-bold"
                                style={{
                                  color: isRetro ? '#3d2b1f' : isBrutalist ? '#000' : isLight ? '#0f172a' : '#fff',
                                  fontFamily: isRetro ? "'Georgia', serif" : isBrutalist ? "'Arial Black', sans-serif" : undefined,
                                }}
                              >
                                {card.title}
                              </h4>
                              <p
                                className="text-[10px] mt-1 leading-normal"
                                style={{ color: isRetro ? '#8b7355' : isBrutalist ? '#333' : '#94a3b8' }}
                              >
                                {card.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </div>
          </section>

          {/* Component Source & Integration Guide */}
          <section className="bg-slate-850/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Source Code & Integration</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">React + TypeScript</span>
            </div>

            {/* Code Tabs */}
            <div className="flex flex-col gap-4">
              
              {/* File 1: TypeScript Definition Types */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300 font-mono">src/types/navbar.ts</span>
                  <button 
                    onClick={() => copyToClipboard(typesCode, 'types')}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedSection === 'types' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 text-[11px] font-mono text-slate-300 bg-slate-950 overflow-x-auto max-h-48 leading-relaxed">
                  {typesCode}
                </pre>
              </div>

              {/* File 2: Selected Navbar Component Code */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-300 font-mono">
                    src/components/
                    {selectedNavbar === 'minimalist' && 'MinimalistNavbar.tsx'}
                    {selectedNavbar === 'glass' && 'GlassmorphismNavbar.tsx'}
                    {selectedNavbar === 'dark' && 'DarkModePremiumNavbar.tsx'}
                    {selectedNavbar === 'neon' && 'NeonCyberpunkNavbar.tsx'}
                    {selectedNavbar === 'aurora' && 'AuroraNavbar.tsx'}
                    {selectedNavbar === 'retro' && 'RetroNavbar.tsx'}
                    {selectedNavbar === 'brutalist' && 'BrutalistNavbar.tsx'}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(getActiveCode(), 'component')}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedSection === 'component' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 text-[11px] font-mono text-slate-300 bg-slate-950 overflow-x-auto max-h-72 leading-relaxed">
                  {getActiveCode()}
                </pre>
              </div>

            </div>

            {/* Integration Instructions */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex gap-4">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Integration Guidelines</h4>
                <ul className="text-[11px] text-slate-400 list-disc pl-4 mt-2 space-y-2 leading-relaxed">
                  <li>Make sure you have installed <code className="bg-slate-950 text-indigo-400 px-1 py-0.5 rounded">framer-motion</code> and <code className="bg-slate-950 text-indigo-400 px-1 py-0.5 rounded">lucide-react</code>.</li>
                  <li>Import your chosen component (e.g. <code className="text-slate-300">MinimalistNavbar</code>) and configure the links/CTA items inside your layout.</li>
                  <li>All navbars are configured via custom React props, enabling easy integrations with routing libraries like React Router, Next Link, or Astro.</li>
                </ul>
              </div>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}
