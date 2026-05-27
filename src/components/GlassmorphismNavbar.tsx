import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Compass } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

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

  // Dropdown framer-motion variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 25,
      }
    },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <div className={`w-full fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="glassmorphism w-full px-6 md:px-8 py-3.5 rounded-2xl shadow-xl shadow-slate-200/20 flex items-center justify-between"
      >
        {/* Logo */}
        <a 
          href={logoHref} 
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-800 font-sans group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
            <Compass className="w-4.5 h-4.5" />
          </div>
          {typeof logo === 'string' ? (
            <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent font-extrabold tracking-tight">
              {logo}
            </span>
          ) : (
            logo
          )}
        </a>

        {/* Desktop Links with Sliding Hover Pill */}
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
                <a
                  href={link.href}
                  className="relative z-10 flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors duration-200"
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold bg-indigo-500/10 text-indigo-600 rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {hasDropdown && (
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === idx ? 'rotate-180 text-indigo-600' : ''
                      }`} 
                    />
                  )}
                </a>

                {/* Sliding Background Pill */}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="glass-hover-pill"
                    className="absolute inset-0 bg-slate-900/5 rounded-xl z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                {/* Glass Dropdown */}
                <AnimatePresence>
                  {hasDropdown && activeDropdown === idx && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-4 w-64 glassmorphism rounded-xl shadow-2xl p-2 z-50 border border-white/30"
                    >
                      {link.dropdownItems?.map((subLink) => (
                        <a
                          key={subLink.label}
                          href={subLink.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/40 transition-all duration-200 group"
                        >
                          {subLink.icon && (
                            <div className="p-1.5 rounded-md bg-white/50 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-500/10 transition-colors">
                              <subLink.icon className="w-4 h-4" />
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-950">
                              {subLink.label}
                            </p>
                            {subLink.description && (
                              <p className="text-[10.5px] text-slate-500 mt-0.5 leading-normal">
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
              className="relative overflow-hidden px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 rounded-xl shadow-md shadow-indigo-500/20 active:scale-95"
            >
              {cta.label}
            </a>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none transition-colors"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 glassmorphism max-w-lg mx-auto rounded-2xl p-6 z-50 border border-white/40 shadow-2xl flex flex-col md:hidden"
            >
              {/* Menu Links */}
              <div className="flex flex-col space-y-4">
                {links.map((link) => (
                  <div key={link.label} className="w-full">
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="flex items-center justify-between text-[15px] font-bold text-slate-800 hover:text-indigo-600 py-1.5 transition-colors"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 text-[8px] font-bold bg-indigo-500/10 text-indigo-600 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </a>

                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-1 ml-4 pl-3 border-l border-indigo-100 flex flex-col space-y-2">
                        {link.dropdownItems.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={toggleMenu}
                            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                          >
                            {subLink.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              {cta && (
                <div className="mt-6 pt-4 border-t border-slate-900/5">
                  <a
                    href={cta.href}
                    onClick={() => {
                      toggleMenu();
                      if (onCtaClick) onCtaClick();
                    }}
                    className="block w-full text-center py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-xl shadow-md shadow-indigo-500/20 transition-all duration-300"
                  >
                    {cta.label}
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
