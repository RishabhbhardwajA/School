'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SubNavbar({ activePage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/faculty', label: 'Faculty' },
    { href: '/alumni', label: 'Alumni Wall' },
    { href: '/campus', label: 'Campus' },
  ];

  return (
    <nav className="navbar scrolled">
      <div className="navbar-inner">
        <Link href="/" className="nav-logo">
          <div className="logo-icon">DE</div>
          <div className="logo-text">
            <h3 style={{ margin: 0 }}>Delhi Excellence</h3>
            <small>Public School</small>
          </div>
        </Link>
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {links.map(link => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                style={activePage === link.label ? { color: 'var(--gold)' } : {}}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              href="/admissions" 
              className="btn btn-gold btn-sm" 
              style={{ color: 'var(--navy)' }}
              onClick={() => setMobileOpen(false)}
            >
              Apply
            </Link>
          </li>
        </ul>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
          <span style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}></span>
          <span style={mobileOpen ? { opacity: 0 } : {}}></span>
          <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}}></span>
        </button>
      </div>
    </nav>
  );
}
