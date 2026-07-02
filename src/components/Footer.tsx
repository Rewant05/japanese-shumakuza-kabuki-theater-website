import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, MapPin } from 'lucide-react';
import { siteData } from '../config/siteData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[rgba(0,0,0,0.05)] pt-24 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-4 mb-6 group">
              <div className="w-10 h-10 flex items-center justify-center font-serif text-xl border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] group-hover:bg-[var(--color-accent-red)] group-hover:text-white group-hover:border-[var(--color-accent-red)] transition-all duration-300">
                朱
              </div>
              <span className="font-sans text-sm tracking-[0.2em] font-bold uppercase text-[var(--color-text-primary)]">
                {siteData.name}
              </span>
            </Link>
            <p className="text-subtle text-sm max-w-sm leading-loose mb-8">
              {siteData.description}
            </p>
            <div className="flex gap-4">
              <a href={siteData.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-[var(--color-text-tertiary)] rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-accent-red)] hover:text-white hover:border-[var(--color-accent-red)] transition-colors">
                <Camera size={18} />
              </a>
              <a href={`mailto:${siteData.email}`} className="w-10 h-10 flex items-center justify-center border border-[var(--color-text-tertiary)] rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-accent-red)] hover:text-white hover:border-[var(--color-accent-red)] transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[var(--color-text-primary)] mb-6 border-b border-[rgba(0,0,0,0.05)] pb-4">
              Explore
            </h4>
            <ul className="space-y-4">
              {siteData.footerLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-subtle text-sm hover:text-[var(--color-accent-red)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[var(--color-text-primary)] mb-6 border-b border-[rgba(0,0,0,0.05)] pb-4">
              Visit Us
            </h4>
            <div className="space-y-4 text-subtle text-sm leading-loose">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-[var(--color-accent-red)] flex-shrink-0" />
                <span>{siteData.address}</span>
              </p>
              <p className="pl-7">
                営業時間: {siteData.businessHours}
              </p>
            </div>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(0,0,0,0.05)] gap-4">
          <p className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} {siteData.romanizedName}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-[0.1em] hover:text-[var(--color-accent-red)] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-[0.1em] hover:text-[var(--color-accent-red)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
