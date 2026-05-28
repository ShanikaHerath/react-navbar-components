import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Star } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

export const AuroraNavbar: React.FC<NavbarProps> = ({
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
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-500 ${className}`}
      style={{
        background: scrolled
          ? 'rgba(10, 6, 30, 0.95)'
          : 'linear-gradient(135deg, rgba(99,55,203,0.95) 0%, rgba(56,108,214,0.95) 35%, rgba(14,165,173,0.95) 70%, rgba(99,55,203,0.95) 100%)',
        backdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 4px 40px rgba(99,55,203,0.3)' : '0 2px 24px rgba(99,55,203,0.2)',
      }}
    >
      {/* Aurora shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
        style={{
          background: 'linear-gradient(90deg, #a855f7, #38bdf8, #34d399, #f472b6, #a855f7)',
          backgroundSize: '200% 100%',
          animation: 'aurora-shift 4s linear infinite',
        }}
      />

      <style>{`
        @keyframes aurora-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <a href={logoHref} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white group-hover:bg-white/25 transition-colors">
              <Star className="w-4 h-4 fill-white/80" />
            </div>
            {typeof logo === 'string' ? (
              <span className="text-base font-black tracking-tight text-white drop-shadow-sm">
                {logo}
              </span>
            ) : logo}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, idx) => {
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={link.label}
                  className="relative px-3.5 py-2 rounded-xl"
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
                    className="relative z-10 flex items-center gap-1.5 text-[12px] font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-bold bg-white/20 text-white rounded-full border border-white/30">
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                    )}
                  </a>

                  {/* Hover pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="aurora-pill"
                      className="absolute inset-0 rounded-xl z-0"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                    />
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 14, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                        className="absolute left-0 mt-4 w-64 rounded-2xl p-2 z-50 border border-white/20"
                        style={{
                          background: 'linear-gradient(135deg, rgba(99,55,203,0.97), rgba(56,108,214,0.97))',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,55,203,0.3)',
                          backdropFilter: 'blur(16px)',
                        }}
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/15 transition-all duration-150 group"
                          >
                            {subLink.icon && (
                              <div className="p-1.5 rounded-lg bg-white/10 text-white/60 group-hover:text-white group-hover:bg-white/20 transition-colors">
                                <subLink.icon className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <div>
                              <p className="text-[12px] font-bold text-white group-hover:text-white/90">{subLink.label}</p>
                              {subLink.description && (
                                <p className="text-[10.5px] text-white/50 mt-0.5 leading-snug">{subLink.description}</p>
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
                className="px-5 py-2.5 text-[11px] font-bold tracking-wide bg-white text-purple-700 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg shadow-purple-900/30 active:scale-95"
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 text-white focus:outline-none" aria-label="Toggle menu">
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
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
              className="fixed inset-0 bg-purple-950/60 backdrop-blur-md z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 max-w-sm mx-auto rounded-2xl p-6 z-50 border border-white/20 flex flex-col md:hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(99,55,203,0.98), rgba(56,108,214,0.98))',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block text-[15px] font-bold text-white hover:text-white/70 transition-colors py-1"
                    >
                      {link.label}
                      {link.badge && <span className="ml-2 text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full">{link.badge}</span>}
                    </a>
                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-1 ml-3 pl-3 border-l border-white/20 flex flex-col space-y-2">
                        {link.dropdownItems.map((subLink) => (
                          <a key={subLink.label} href={subLink.href} onClick={toggleMenu} className="text-xs text-white/50 hover:text-white transition-colors">
                            {subLink.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {cta && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <a
                    href={cta.href}
                    onClick={() => { toggleMenu(); if (onCtaClick) onCtaClick(); }}
                    className="block w-full text-center py-3 text-xs font-bold bg-white text-purple-700 rounded-xl hover:bg-white/90 transition-all"
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
