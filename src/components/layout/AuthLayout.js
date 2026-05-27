import React from 'react';
import backgroundImg from '../../assets/Background.png';
import logo from '../../assets/woliba-logo.png';
import LanguageSelector from '../common/LanguageSelector';

/**
 * AuthLayout
 * Matches Woliba Figma:
 *  - Full-screen background with scattered fitness illustrations
 *  - Top navbar: Woliba logo (left) | Language selector (right)
 *  - Centered white card
 *  - Footer: Terms of Use | Contact Us
 */
const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffffff',
      }}
    >
      {/* ── Navbar ── */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-4">
        <img
          src={logo}
          alt="Woliba"
          className="h-8 sm:h-9 w-auto object-contain"
        />
        <LanguageSelector />
      </header>

      {/* ── Main (centred card) ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div
          className="w-full bg-white rounded-xl shadow-md px-8 py-10"
          style={{ maxWidth: '360px' }}
        >
          {children}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="flex items-center justify-center gap-4 pb-6 pt-2">
        <a
          href="/terms"
          className="text-sm transition-opacity hover:opacity-80"
          style={{ color: '#E05252' }}
        >
          Terms of Use
        </a>
        <a
          href="/contact"
          className="text-sm transition-opacity hover:opacity-80"
          style={{ color: '#E05252' }}
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default AuthLayout;
