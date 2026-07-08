import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from 'lucide-react/dist/esm/icons/menu.mjs';
import Ticket from 'lucide-react/dist/esm/icons/ticket.mjs';
import X from 'lucide-react/dist/esm/icons/x.mjs';
import clsx from 'clsx';
import { siteData } from '../config/siteData';

export const TheaterNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = useMemo(
    () => [{ label: 'ホーム', href: '/' }, ...siteData.navigation],
    [],
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => (
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)
  );

  return (
    <>
      <header className={clsx('theater-nav', (isScrolled || isMobileMenuOpen) && 'is-scrolled', isMobileMenuOpen && 'is-open')}>
        <div className="theater-nav__inner">
          <Link to="/" className="theater-nav__brand" aria-label={`${siteData.name} ホーム`}>
            <span className="theater-nav__mark">朱</span>
            <span className="theater-nav__name">
              <strong>{siteData.name}</strong>
              <span>伝統芸能案内所</span>
            </span>
          </Link>

          <nav className="theater-nav__desktop" aria-label="主要ナビゲーション">
            <div className="theater-nav__links">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={clsx('theater-nav__link', isActive(link.href) && 'is-active')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="theater-nav__ticket">
              <Ticket size={16} aria-hidden="true" />
              チケット
            </Link>
          </nav>

          <button
            type="button"
            className="theater-nav__toggle"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>
        </div>
      </header>

      <div id="mobile-navigation" className={clsx('theater-mobile-menu', isMobileMenuOpen && 'is-open')}>
        <nav className="theater-mobile-menu__links" aria-label="モバイルナビゲーション">
          {navItems.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(isActive(link.href) && 'is-active')}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link to="/contact" className={clsx(isActive('/contact') && 'is-active')}>
            <span>チケット</span>
            <Ticket size={18} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </>
  );
};
