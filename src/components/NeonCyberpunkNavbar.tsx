import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Cpu } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

export const NeonCyberpunkNavbar: React.FC<NavbarProps> = ({
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
    <nav
      className={`w-full bg-black border-b border-cyan-500/30 sticky top-0 z-50 ${className}`}
      style={{ boxShadow: '0 0 30px rgba(0,255,255,0.08), 0 1px 0 rgba(0,255,255,0.2)' }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.015) 2px, rgba(0,255,255,0.015) 4px)',
        }}
      />

      {/* Top neon accent strip */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" style={{ boxShadow: '0 0 12px rgba(0,255,255,0.8)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a
            href={logoHref}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-9 h-9 rounded border border-cyan-400/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors"
              style={{ boxShadow: '0 0 12px rgba(0,255,255,0.3), inset 0 0 8px rgba(0,255,255,0.05)' }}
            >
              <Cpu className="w-4.5 h-4.5" />
            </div>
            {typeof logo === 'string' ? (
              <span
                className="text-base font-black tracking-[0.2em] uppercase text-white group-hover:text-cyan-300 transition-colors duration-300"
                style={{ textShadow: '0 0 20px rgba(0,255,255,0.5)' }}
              >
                {logo}
              </span>
            ) : (
              logo
            )}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, idx) => {
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={link.label}
                  className="relative px-4 py-2"
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    if (hasDropdown) setActiveDropdown(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    if (hasDropdown) setActiveDropdown(null);
                  }}
                >
                  <a
                    href={link.href}
                    className="relative flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-200"
                    style={{
                      color: isHovered ? '#00ffff' : 'rgba(255,255,255,0.6)',
                      textShadow: isHovered ? '0 0 10px rgba(0,255,255,0.8)' : 'none',
                    }}
                  >
                    {link.label}
                    {link.badge && (
                      <span
                        className="ml-1 px-1.5 py-0.5 text-[8px] font-black tracking-wider rounded-sm bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40"
                        style={{ textShadow: '0 0 8px rgba(217,70,239,0.8)' }}
                      >
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === idx ? 'rotate-180' : ''}`}
                      />
                    )}
                  </a>

                  {/* Neon underline on hover */}
                  {isHovered && (
                    <motion.div
                      layoutId="cyber-underline"
                      className="absolute bottom-0 left-2 right-2 h-[1px] bg-cyan-400"
                      style={{ boxShadow: '0 0 8px rgba(0,255,255,0.9)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-3 w-60 rounded-sm p-2 z-50 border border-cyan-500/30 bg-black"
                        style={{ boxShadow: '0 0 30px rgba(0,255,255,0.12), 0 4px 24px rgba(0,0,0,0.8)' }}
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            className="flex items-start gap-3 p-2.5 rounded-sm hover:bg-cyan-500/10 transition-colors duration-150 group"
                          >
                            {subLink.icon && (
                              <subLink.icon className="w-3.5 h-3.5 mt-0.5 text-cyan-500/60 group-hover:text-cyan-400 transition-colors" />
                            )}
                            <div>
                              <p className="text-[11px] font-bold tracking-wide text-white/80 group-hover:text-cyan-300 transition-colors">{subLink.label}</p>
                              {subLink.description && (
                                <p className="text-[10px] text-white/30 mt-0.5 leading-snug">{subLink.description}</p>
                              )}
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

          {/* CTA */}
          <div className="hidden md:flex items-center">
            {cta && (
              <a
                href={cta.href}
                onClick={onCtaClick}
                className="relative px-5 py-2 text-[11px] font-black tracking-[0.2em] uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 rounded-sm"
                style={{ boxShadow: '0 0 20px rgba(0,255,255,0.5)' }}
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-cyan-400 hover:text-cyan-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-black border-l border-cyan-500/30 z-50 p-8 flex flex-col md:hidden"
              style={{ boxShadow: '-4px 0 40px rgba(0,255,255,0.1)' }}
            >
              <div className="flex items-center justify-between mb-10">
                <span
                  className="text-sm font-black tracking-[0.25em] uppercase text-cyan-400"
                  style={{ textShadow: '0 0 12px rgba(0,255,255,0.6)' }}
                >
                  {typeof logo === 'string' ? logo : 'NAV'}
                </span>
                <button onClick={toggleMenu} className="p-1.5 text-cyan-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-5 my-auto">
                {links.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block text-xl font-black tracking-widest uppercase text-white/70 hover:text-cyan-400 transition-colors duration-200"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-2 text-[9px] font-black text-fuchsia-400">[{link.badge}]</span>
                      )}
                    </a>
                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-2 pl-4 border-l border-cyan-500/20 flex flex-col space-y-2">
                        {link.dropdownItems.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={toggleMenu}
                            className="text-xs text-white/40 hover:text-cyan-400 transition-colors tracking-wide"
                          >
                            {subLink.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {cta && (
                <div className="mt-auto pt-8">
                  <a
                    href={cta.href}
                    onClick={() => { toggleMenu(); if (onCtaClick) onCtaClick(); }}
                    className="block w-full py-3.5 text-center text-[11px] font-black tracking-[0.2em] uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-colors rounded-sm"
                    style={{ boxShadow: '0 0 20px rgba(0,255,255,0.4)' }}
                  >
                    {cta.label}
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
