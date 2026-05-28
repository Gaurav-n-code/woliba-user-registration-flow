import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate }              from 'react-router-dom';
import wilibaLogo                   from '../assets/woliba-logo.png';
import meditationImg                from '../assets/Rectangle 4545.png';

/* ══════════════════════════════════════════════════════════════
   PAGE — Welcome Screen  (matches Figma Rectangle 4545)
══════════════════════════════════════════════════════════════ */
const Welcome = () => {
  const navigate = useNavigate();

  const { registeredUser } = useSelector((s) => s.auth);

  /* Guard: must arrive here after successful registration */
  useEffect(() => {
    if (!registeredUser) navigate('/', { replace: true });
  }, [registeredUser, navigate]);

  if (!registeredUser) return null;

  const firstName = registeredUser.fname || '';

  const handleGetStarted = () => navigate('/dashboard');

  return (
    <div
      style={{
        minHeight:     '100vh',
        background:    '#f2f2f2',
        position:      'relative',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Background glow blobs ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Green blob — bottom-left */}
        <div style={{
          position: 'absolute', width: '340px', height: '340px',
          borderRadius: '50%', background: 'rgba(100, 210, 160, 0.28)',
          filter: 'blur(80px)', bottom: '100px', left: '-60px',
        }} />
        {/* Yellow/cream blob — top-center */}
        <div style={{
          position: 'absolute', width: '280px', height: '280px',
          borderRadius: '50%', background: 'rgba(255, 230, 130, 0.30)',
          filter: 'blur(80px)', top: '60px', left: '50%', transform: 'translateX(-50%)',
        }} />
        {/* Blue-purple blob — right */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', background: 'rgba(140, 160, 230, 0.28)',
          filter: 'blur(80px)', top: '200px', right: '-40px',
        }} />
      </div>

      {/* ── Top navigation bar ── */}
      <header style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 36px',
      }}>
        <img src={wilibaLogo} alt="Woliba" style={{ height: '36px', objectFit: 'contain' }} />

        {/* Language selector */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '13px', color: '#4b5563', cursor: 'pointer', userSelect: 'none',
        }}>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Language</span>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect width="20" height="14" rx="2" fill="#B22234" />
            <rect y="1.08"  width="20" height="1.08" fill="white" />
            <rect y="3.23"  width="20" height="1.08" fill="white" />
            <rect y="5.38"  width="20" height="1.08" fill="white" />
            <rect y="7.54"  width="20" height="1.08" fill="white" />
            <rect y="9.69"  width="20" height="1.08" fill="white" />
            <rect y="11.85" width="20" height="1.08" fill="white" />
            <rect width="8" height="7.54" rx="2" fill="#3C3B6E" />
          </svg>
          <span style={{ fontWeight: 500 }}>En</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24"
            stroke="#6b7280" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{
        flex: 1, position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px 24px 60px', textAlign: 'center',
      }}>

        {/* Rectangle 4545 — exact Figma illustration */}
        <img
          src={meditationImg}
          alt="wellness illustration"
          style={{
            width:        '100%',
            maxWidth:     '398px',
            height:       'auto',
            maxHeight:    '266px',
            objectFit:    'contain',
            marginBottom: '28px',
          }}
        />

        {/* Welcome heading */}
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#184A61', margin: '0 0 14px' }}>
          Welcome {firstName}!
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '14px', color: '#6b7280', lineHeight: '1.7',
          maxWidth: '400px', margin: '0 0 32px',
        }}>
          Welcome to Woliba! You'll find wellness challenges, fitness and recipe
          videos, and daily tips to support your health goals. Download our iOS or
          Android app and start your wellbeing journey today.
        </p>

        {/* CTA button */}
        <button
          type="button"
          onClick={handleGetStarted}
          style={{
            padding: '13px 48px', borderRadius: '8px',
            border: 'none', background: '#E05252', color: '#ffffff',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            transition: 'background 0.15s', letterSpacing: '0.01em',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#c94444')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#E05252')}
        >
          Let's get Started
        </button>
      </main>
    </div>
  );
};

export default Welcome;
