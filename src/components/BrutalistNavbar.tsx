import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Triangle } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

export const BrutalistNavbar: React.FC<NavbarProps> = ({
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
      className={`w-full sticky top-0 z-50 bg-[#f5f500] border-b-4 border-black ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a
            href={logoHref}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-9 h-9 bg-black flex items-center justify-center border-2 border-black text-[#f5f500] group-hover:bg-[#f5f500] group-hover:text-black transition-colors duration-150"
              style={{ boxShadow: '3px 3px 0 #000' }}
            >
              <Triangle className="w-4 h-4 fill-current" />
            </div>
            {typeof logo === 'string' ? (
              <span
                className="text-xl font-black tracking-[-0.03em] uppercase text-black"
                style={{ fontFamily: "'Arial Black', 'Impact', sans-serif", WebkitTextStroke: '1px black' }}
              >
                {logo}
              </span>
            ) : logo}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center">
            {links.map((link, idx) => {
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={link.label}
                  className="relative"
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
                    className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-black uppercase tracking-wide transition-all duration-100 border-l-2 border-transparent"
                    style={{
                      fontFamily: "'Arial Black', Impact, sans-serif",
                      background: isHovered ? '#000' : 'transparent',
                      color: isHovered ? '#f5f500' : '#000',
                      borderLeftColor: isHovered ? '#000' : 'transparent',
                    }}
                  >
                    {link.label}
                    {link.badge && (
                      <span
                        className="px-1 py-0 text-[9px] font-black"
                        style={{
                          background: isHovered ? '#f5f500' : '#000',
                          color: isHovered ? '#000' : '#f5f500',
                          fontFamily: 'sans-serif',
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180' : ''}`} />}
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-0 mt-0 w-64 z-50 bg-[#f5f500]"
                        style={{ border: '3px solid #000', boxShadow: '5px 5px 0 #000' }}
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            className="flex items-start gap-3 px-4 py-3 transition-colors duration-100 group"
                            style={{ borderBottom: i < (link.dropdownItems?.length ?? 0) - 1 ? '2px solid #000' : 'none' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#000';
                              e.currentTarget.querySelectorAll('p').forEach((p) => {
                                (p as HTMLElement).style.color = '#f5f500';
                              });
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) (icon as SVGElement).style.color = '#f5f500';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.querySelectorAll('p').forEach((p) => {
                                (p as HTMLElement).style.color = '';
                              });
                              const icon = e.currentTarget.querySelector('svg');
                              if (icon) (icon as SVGElement).style.color = '';
                            }}
                          >
                            {subLink.icon && (
                              <subLink.icon className="w-4 h-4 mt-0.5 text-black" />
                            )}
                            <div>
                              <p className="text-[12px] font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>{subLink.label}</p>
                              {subLink.description && (
                                <p className="text-[10px] text-black/60 mt-0.5 font-medium">{subLink.description}</p>
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            {cta && (
              <a
                href={cta.href}
                onClick={onCtaClick}
                className="px-5 py-2.5 text-[12px] font-black tracking-wide uppercase bg-black text-[#f5f500] border-2 border-black hover:bg-[#f5f500] hover:text-black transition-colors duration-150 active:translate-x-[2px] active:translate-y-[2px]"
                style={{
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.4)',
                  fontFamily: "'Arial Black', Impact, sans-serif",
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
              className="p-2 text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" strokeWidth={3} /> : <Menu className="w-5 h-5" strokeWidth={3} />}
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="fixed top-0 left-0 right-0 bg-[#f5f500] border-b-4 border-black z-50 p-8 flex flex-col md:hidden"
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-10">
                <span
                  className="text-lg font-black tracking-widest uppercase text-black"
                  style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
                >
                  {typeof logo === 'string' ? logo : 'MENU'}
                </span>
                <button onClick={toggleMenu} className="text-black">
                  <X className="w-6 h-6" strokeWidth={3} />
                </button>
              </div>

              <div className="flex flex-col">
                {links.map((link, i) => (
                  <div
                    key={link.label}
                    className="border-t-2 border-black first:border-t-0 py-4"
                  >
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block text-2xl font-black uppercase text-black hover:text-black/60 transition-colors"
                      style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
                    >
                      {link.label}
                      {link.badge && <span className="ml-2 text-xs bg-black text-[#f5f500] px-1">{link.badge}</span>}
                    </a>
                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-2 pl-4 border-l-4 border-black flex flex-col gap-1.5">
                        {link.dropdownItems.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={toggleMenu}
                            className="text-sm font-bold uppercase text-black/60 hover:text-black transition-colors"
                            style={{ fontFamily: 'sans-serif' }}
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
                <div className="mt-8 border-t-4 border-black pt-6">
                  <a
                    href={cta.href}
                    onClick={() => { toggleMenu(); if (onCtaClick) onCtaClick(); }}
                    className="block w-full py-4 text-center text-sm font-black tracking-wider uppercase bg-black text-[#f5f500] border-2 border-black"
                    style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
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
