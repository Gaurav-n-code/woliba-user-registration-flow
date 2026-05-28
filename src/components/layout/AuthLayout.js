import React from "react";
import logo from "../../assets/woliba-logo.png";
import LanguageSelector from "../common/LanguageSelector";

/* ── Illustration assets ──────────────────── */
import laptopMan    from "../../assets/Vector.png";    // yellow  – laptop man
import meditation   from "../../assets/Vector-1.png";  // blue    – meditation woman
import runningPink  from "../../assets/Vector-2.png";  // pink    – running woman (tall)
import cookingGreen from "../../assets/Vector-3.png";  // green   – cooking woman (wide)
import yogaStretch  from "../../assets/Vector-4.png";  // pink    – yoga stretch (tall)
import readingCoral from "../../assets/Vector-5.png";  // coral   – reading woman (wide)
import jumpingPeach from "../../assets/Vector-6.png";  // peach   – jumping person
import plantGirl    from "../../assets/Vector-7.png";  // coral   – plant girl (tall)

/*
 * ILLUSTRATION MAP  (percentages match the 1440 × 900 Figma frame)
 *
 * Each entry:
 *   src      – imported asset
 *   alt      – empty string (decorative)
 *   style    – absolute position as % of viewport
 *   twSize   – Tailwind width at each breakpoint
 *   show     – Tailwind responsive display class
 *              mobile hides all; sm shows corners; lg shows everything
 */
const ILLUSTRATIONS = [
  /* ── TOP-LEFT  : cooking woman (green, wide/horizontal) ── */
  {
    src:    cookingGreen,
    alt:    "",
    style:  { top: "13%", left: "0" },
    twSize: "w-36 md:w-44 xl:w-52",
    show:   "hidden sm:block",
  },

  /* ── TOP-CENTER-LEFT : running woman (pink, tall/vertical) ── */
  {
    src:    runningPink,
    alt:    "",
    style:  { top: "2%", left: "17%" },
    twSize: "w-28 md:w-36 xl:w-44",
    show:   "hidden md:block",
  },

  /* ── TOP-CENTER-RIGHT : jumping person (peach, wide) ── */
  {
    src:    jumpingPeach,
    alt:    "",
    style:  { top: "0%", left: "60%" },
    twSize: "w-36 md:w-44 xl:w-52",
    show:   "hidden md:block",
  },

  /* ── TOP-RIGHT : laptop man (yellow/olive, wide/horizontal) ── */
  {
    src:    laptopMan,
    alt:    "",
    style:  { top: "13%", right: "0" },
    twSize: "w-44 md:w-52 xl:w-64",
    show:   "hidden sm:block",
  },

  /* ── MIDDLE-LEFT : reading woman (coral, wide) ── */
  {
    src:    readingCoral,
    alt:    "",
    style:  { top: "40%", left: "7%" },
    twSize: "w-40 md:w-48 xl:w-56",
    show:   "hidden lg:block",
  },

  /* ── MIDDLE-RIGHT : yoga stretch (pink, tall/vertical) ── */
  {
    src:    yogaStretch,
    alt:    "",
    style:  { top: "38%", right: "6%" },
    twSize: "w-40 md:w-48 xl:w-56",
    show:   "hidden lg:block",
  },

  /* ── BOTTOM-LEFT : meditation woman (blue, square) ── */
  {
    src:    meditation,
    alt:    "",
    style:  { bottom: "6%", left: "0" },
    twSize: "w-36 md:w-44 xl:w-52",
    show:   "hidden sm:block",
  },

  /* ── BOTTOM-RIGHT : plant girl (coral, tall/vertical) ── */
  {
    src:    plantGirl,
    alt:    "",
    style:  { bottom: "3%", right: "0" },
    twSize: "w-32 md:w-40 xl:w-48",
    show:   "hidden sm:block",
  },
];

/* ─────────────────────────────────────────────────────────────── */

const AuthLayout = ({ children, cardStyle = {} }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">

      {/* ══ ILLUSTRATION LAYER (z-0, pointer-events-none) ══════════ */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {ILLUSTRATIONS.map(({ src, alt, style, twSize, show }) => (
          <img
            key={src}
            src={src}
            alt={alt}
            draggable={false}
            className={`absolute object-contain select-none opacity-80 ${twSize} ${show}`}
            style={style}
          />
        ))}
      </div>

      {/* ══ NAVBAR (z-10) ══════════════════════════════════════════ */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4 shrink-0">
        <img
          src={logo}
          alt="Woliba"
          className="h-8 sm:h-9 w-auto object-contain"
        />
        <LanguageSelector />
      </header>

      {/* ══ AUTH CARD (z-10, centred; scrollable on mobile) ═══════ */}
      <main className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-4 py-6 sm:py-4">
        <div
          className="w-full bg-white rounded-xl px-5 sm:px-8 py-8 sm:py-10"
          style={{
            maxWidth       : "360px",
            boxShadow      : "0 2px 24px 0 rgba(0,0,0,0.09)",
            border         : "1px solid #efefef",
            ...cardStyle,
          }}
        >
          {children}
        </div>
      </main>

      {/* ══ FOOTER (z-10) ══════════════════════════════════════════ */}
      <footer className="relative z-10 flex items-center justify-center gap-6 py-4 shrink-0">
        <a
          href="/terms"
          className="text-sm hover:opacity-75 transition-opacity"
          style={{ color: "#E05252" }}
        >
          Terms of Use
        </a>
        <a
          href="/contact"
          className="text-sm hover:opacity-75 transition-opacity"
          style={{ color: "#E05252" }}
        >
          Contact Us
        </a>
      </footer>

    </div>
  );
};

export default AuthLayout;
