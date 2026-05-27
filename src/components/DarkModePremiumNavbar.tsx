import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import type { NavbarProps } from '../types/navbar';

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
    <nav className={`w-full bg-zinc-950/95 border-b border-zinc-800/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${className}`}>
      
      {/* Animated Glowing Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent shadow-[0_1px_8px_rgba(99,102,241,0.5)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a 
            href={logoHref} 
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white font-sans group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shadow-inner group-hover:text-indigo-300 transition-colors">
              <Zap className="w-4 h-4 fill-indigo-400/20" />
            </div>
            {typeof logo === 'string' ? (
              <span className="font-extrabold tracking-wide uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {logo}
              </span>
            ) : (
              logo
            )}
          </a>

          {/* Desktop Nav Links */}
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
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md tracking-normal">
                        {link.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          activeDropdown === idx ? 'rotate-180 text-indigo-400' : ''
                        }`} 
                      />
                    )}
                  </a>

                  {/* Neon Glow Hover Dot */}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="dark-hover-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-zinc-950 border border-zinc-800/80 rounded-xl shadow-2xl p-2 z-50 dark-glow"
                      >
                        {link.dropdownItems?.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-zinc-900/60 transition-all duration-200 group"
                          >
                            {subLink.icon && (
                              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                                <subLink.icon className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                                {subLink.label}
                              </p>
                              {subLink.description && (
                                <p className="text-[10.5px] text-zinc-500 group-hover:text-zinc-400 mt-1 font-light leading-relaxed">
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
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold tracking-wider uppercase rounded-lg group bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 group-hover:from-indigo-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-2 focus:outline-none focus:ring-indigo-800"
              >
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-zinc-950 rounded-md group-hover:bg-opacity-0">
                  {cta.label}
                </span>
              </a>
            )}
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 p-8 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-extrabold tracking-wider uppercase text-base bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {typeof logo === 'string' ? logo : 'Menu'}
                </span>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-zinc-400 hover:text-white focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-6 my-auto">
                {links.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block text-xl font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-[8px] font-bold bg-indigo-600 text-white rounded-md">
                          {link.badge}
                        </span>
                      )}
                    </a>

                    {link.dropdownItems && link.dropdownItems.length > 0 && (
                      <div className="mt-3 pl-4 border-l border-zinc-800 flex flex-col space-y-3">
                        {link.dropdownItems.map((subLink) => (
                          <a
                            key={subLink.label}
                            href={subLink.href}
                            onClick={toggleMenu}
                            className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
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
                <div className="mt-auto pt-8">
                  <a
                    href={cta.href}
                    onClick={() => {
                      toggleMenu();
                      if (onCtaClick) onCtaClick();
                    }}
                    className="block w-full py-4 text-center text-xs font-bold tracking-wider uppercase rounded-xl text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-98 transition-all duration-300"
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
