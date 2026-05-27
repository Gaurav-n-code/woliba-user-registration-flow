import React, { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'En', flag: '🇺🇸' },
  { code: 'es', label: 'Es', flag: '🇪🇸' },
  { code: 'fr', label: 'Fr', flag: '🇫🇷' },
];

/**
 * LanguageSelector
 * Top-right dropdown matching the Figma: "Language | 🇺🇸 En ▼"
 */
const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 focus:outline-none select-none"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-gray-500 font-normal mr-1">Language</span>
        <span className="text-gray-400">|</span>
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="font-medium">{selected.label}</span>
        {/* Chevron */}
        <svg
          className={`h-3.5 w-3.5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-32 bg-white border border-gray-200
            rounded-lg shadow-lg py-1 z-50"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                role="option"
                aria-selected={selected.code === lang.code}
                onClick={() => { setSelected(lang); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm
                  hover:bg-gray-50 transition-colors
                  ${selected.code === lang.code ? 'font-semibold text-blue-600' : 'text-gray-700'}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
