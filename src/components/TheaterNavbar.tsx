import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteData } from '../config/siteData';
import clsx from 'clsx';

export const TheaterNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500',
          {
            'bg-white/95 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.05)]': isScrolled || isMobileMenuOpen,
            'bg-transparent py-8': !isScrolled && !isMobileMenuOpen,
          }
        )}
      >
        <div className="container flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-4">
            <div className={clsx(
              "w-10 h-10 flex items-center justify-center font-serif text-xl border-2 transition-all duration-500",
              (isScrolled || isMobileMenuOpen) ? "text-[var(--color-text-primary)] border-[var(--color-text-primary)]" : "text-white border-white",
              "group-hover:bg-[var(--color-accent-red)] group-hover:text-white group-hover:border-[var(--color-accent-red)]"
            )}>
              朱
            </div>
            <span className={clsx(
              "font-sans text-sm tracking-[0.2em] font-bold uppercase transition-colors duration-500 hidden sm:block",
              (isScrolled || isMobileMenuOpen) ? "text-[var(--color-text-primary)]" : "text-white"
            )}>
              {siteData.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex gap-8">
              {siteData.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={clsx(
                      'font-sans text-xs font-semibold tracking-[0.1em] uppercase transition-colors link-underline',
                      location.pathname === link.href ? 'text-[var(--color-accent-red)]' : 
                      (isScrolled ? 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-red)]' : 'text-white/90 hover:text-white')
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact" className={clsx(
              "font-sans text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 border transition-colors",
              isScrolled ? "border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-red)] hover:border-[var(--color-accent-red)] hover:text-white" : 
              "border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]"
            )}>
              Tickets
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={clsx(
              "md:hidden p-2 focus:outline-none transition-colors",
              (isScrolled || isMobileMenuOpen) ? "text-[var(--color-text-primary)]" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div
        className={clsx(
          'md:hidden fixed inset-0 w-full h-screen bg-white z-40 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center pt-20',
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="flex flex-col items-center gap-8 w-full px-6">
          {siteData.navigation.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-2xl font-serif font-bold tracking-[0.1em] text-[var(--color-text-primary)] hover:text-[var(--color-accent-red)] transition-colors w-full text-center border-b border-[var(--color-bg-tertiary)] pb-6"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary w-full mt-4">
            <span>Tickets</span>
          </Link>
        </div>
      </div>
    </>
  );
};
