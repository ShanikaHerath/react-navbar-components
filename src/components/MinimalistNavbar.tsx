import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

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

  // Variant for mobile slide drawer
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav className={`w-full bg-white border-b border-slate-100 sticky top-0 z-50 transition-all duration-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a 
            href={logoHref} 
            className="flex items-center text-xl font-bold tracking-tight text-slate-900 font-sans hover:opacity-80 transition-opacity"
          >
            {typeof logo === 'string' ? (
              <span className="font-extrabold tracking-widest uppercase text-base">{logo}</span>
            ) : (
              logo
            )}
          </a>

          {/* Desktop Nav Links */}
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
                  <a
                    href={link.href}
                    className="flex items-center gap-1 text-[14px] font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-bold bg-slate-900 text-white rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          activeDropdown === idx ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </a>

                  {/* Underline Indicator */}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute left-0 mt-3 w-56 bg-white border border-slate-100 rounded-lg shadow-xl shadow-slate-100/50 p-2 z-50"
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            className="flex items-start gap-3 p-2.5 rounded-md hover:bg-slate-50 transition-colors duration-200"
                          >
                            {subLink.icon && (
                              <subLink.icon className="w-4 h-4 text-slate-400 mt-0.5" />
                            )}
                            <div>
                              <p className="text-[13px] font-semibold text-slate-800">
                                {subLink.label}
                              </p>
                              {subLink.description && (
                                <p className="text-[11px] text-slate-400 font-light mt-0.5 leading-snug">
                                  {subLink.description}
                                </p>
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
                className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase border border-slate-900 bg-slate-900 text-white hover:bg-transparent hover:text-slate-900 transition-all duration-300 rounded-none"
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Slide-out */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-8 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-extrabold tracking-widest uppercase text-base text-slate-900">
                  {typeof logo === 'string' ? logo : 'Menu'}
                </span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-slate-500 hover:text-slate-900 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-6 my-auto">
                {links.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block text-2xl font-light tracking-wide text-slate-800 hover:text-slate-900 hover:pl-2 transition-all duration-300"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold bg-slate-900 text-white rounded-full uppercase tracking-wider">
                          {link.badge}
                        </span>
                      )}
                    </a>

                    {/* Sublinks in mobile menu */}
                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-3 pl-4 border-l border-slate-100 flex flex-col space-y-3">
                        {link.dropdownItems.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={toggleMenu}
                            className="text-sm font-medium text-slate-400 hover:text-slate-800 transition-colors"
                          >
                            {subLink.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              {cta && (
                <motion.div variants={itemVariants} className="mt-auto pt-8">
                  <a
                    href={cta.href}
                    onClick={() => {
                      toggleMenu();
                      if (onCtaClick) onCtaClick();
                    }}
                    className="block w-full py-4 text-center text-xs font-bold tracking-wider uppercase border border-slate-900 bg-slate-900 text-white hover:bg-transparent hover:text-slate-900 transition-all duration-300 rounded-none"
                  >
                    {cta.label}
                  </a>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
