import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

export const RetroNavbar: React.FC<NavbarProps> = ({
  logo,
  logoHref = '#',
  links,
  cta,
  className = '',
  onCtaClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`w-full sticky top-0 z-50 ${className}`}
      style={{
        background: '#faf7f0',
        borderBottom: '3px double #8b7355',
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Decorative top stripe */}
      <div
        className="h-1.5 w-full"
        style={{ background: 'repeating-linear-gradient(90deg, #8b7355 0px, #8b7355 8px, #faf7f0 8px, #faf7f0 16px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <a
            href={logoHref}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border-2"
              style={{
                background: '#8b7355',
                borderColor: '#6b5535',
                boxShadow: '2px 2px 0 #6b5535',
              }}
            >
              <BookOpen className="w-4.5 h-4.5 text-amber-50" />
            </div>
            {typeof logo === 'string' ? (
              <div>
                <span
                  className="block text-xl font-black tracking-wider uppercase"
                  style={{ color: '#3d2b1f', letterSpacing: '0.12em' }}
                >
                  {logo}
                </span>
                <div className="h-0.5 mt-0.5" style={{ background: '#8b7355', width: '100%' }} />
              </div>
            ) : logo}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0">
            {links.map((link, idx) => {
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              const isActive = activeDropdown === idx;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => { if (hasDropdown) setActiveDropdown(idx); }}
                  onMouseLeave={() => { if (hasDropdown) setActiveDropdown(null); }}
                >
                  <a
                    href={link.href}
                    className="block px-4 py-2 text-[13px] font-bold tracking-wide transition-all duration-150 relative group"
                    style={{
                      color: isActive ? '#faf7f0' : '#5c3d23',
                      background: isActive ? '#8b7355' : 'transparent',
                      fontFamily: "'Georgia', serif",
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      {link.label}
                      {link.badge && (
                        <span
                          className="px-1 py-0 text-[8px] font-black border"
                          style={{ color: '#8b7355', borderColor: '#8b7355', fontFamily: 'sans-serif', letterSpacing: '0.1em' }}
                        >
                          {link.badge}
                        </span>
                      )}
                      {hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />}
                    </span>

                    {/* Hover underline */}
                    {!isActive && (
                      <span
                        className="absolute bottom-1 left-4 right-4 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                        style={{ background: '#8b7355' }}
                      />
                    )}
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-0 w-60 z-50"
                        style={{
                          background: '#faf7f0',
                          border: '2px solid #8b7355',
                          boxShadow: '4px 4px 0 #8b7355',
                        }}
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            className="flex items-start gap-3 px-4 py-3 transition-colors duration-100 group"
                            style={{ borderBottom: '1px solid rgba(139,115,85,0.2)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#f3ede0')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            {subLink.icon && (
                              <div style={{ color: '#8b7355' }}>
                                <subLink.icon className="w-3.5 h-3.5 mt-0.5" />
                              </div>
                            )}
                            <div>
                              <p className="text-[12px] font-bold" style={{ color: '#3d2b1f', fontFamily: "'Georgia', serif" }}>{subLink.label}</p>
                              {subLink.description && (
                                <p className="text-[10px] mt-0.5 leading-snug" style={{ color: '#8b7355', fontFamily: 'sans-serif' }}>{subLink.description}</p>
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
                className="px-5 py-2 text-[11px] font-black tracking-wider uppercase text-amber-50 transition-all duration-150 active:translate-y-0.5"
                style={{
                  background: '#5c3d23',
                  border: '2px solid #3d2b1f',
                  boxShadow: '3px 3px 0 #3d2b1f',
                  fontFamily: 'sans-serif',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#3d2b1f';
                  (e.currentTarget as HTMLElement).style.boxShadow = '1px 1px 0 #3d2b1f';
                  (e.currentTarget as HTMLElement).style.transform = 'translate(2px, 2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#5c3d23';
                  (e.currentTarget as HTMLElement).style.boxShadow = '3px 3px 0 #3d2b1f';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
              style={{ color: '#5c3d23' }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative bottom stripe */}
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #8b7355 15%, #8b7355 85%, transparent)' }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: '#3d2b1f' }}
            />
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm z-50 p-8 flex flex-col md:hidden"
              style={{
                background: '#faf7f0',
                borderRight: '3px solid #8b7355',
                boxShadow: '8px 0 24px rgba(61,43,31,0.25)',
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-lg font-black tracking-widest uppercase" style={{ color: '#3d2b1f', fontFamily: "'Georgia', serif" }}>
                  {typeof logo === 'string' ? logo : 'Menu'}
                </span>
                <button onClick={toggleMenu} style={{ color: '#5c3d23' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-5 my-auto">
                {links.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block text-xl font-bold tracking-wide transition-all duration-200"
                      style={{ color: '#5c3d23', fontFamily: "'Georgia', serif" }}
                    >
                      {link.label}
                      {link.badge && <span className="ml-2 text-[9px] font-black border px-1" style={{ borderColor: '#8b7355', color: '#8b7355', fontFamily: 'sans-serif' }}>{link.badge}</span>}
                    </a>
                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-2 pl-4 border-l-2 flex flex-col gap-2" style={{ borderColor: '#8b7355' }}>
                        {link.dropdownItems.map((subLink) => (
                          <a key={subLink.label} href={subLink.href} onClick={toggleMenu} className="text-sm" style={{ color: '#8b7355', fontFamily: "'Georgia', serif" }}>
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
                    className="block w-full py-3.5 text-center text-xs font-black tracking-widest uppercase text-amber-50 transition-all"
                    style={{ background: '#5c3d23', border: '2px solid #3d2b1f', fontFamily: 'sans-serif' }}
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
