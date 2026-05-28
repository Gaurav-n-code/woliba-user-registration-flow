import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { useNavigate }                from 'react-router-dom';
import {
  fetchWellbeingPillars,
  setSelectedPillars,
  completeRegistration,
} from '../redux/slices/authSlice';
import AuthLayout from '../components/layout/AuthLayout';
import Alert      from '../components/common/Alert';
import loaderVideo from '../assets/Loader scrren GIF.mp4';

const MAX_PILLARS = 3;

/* ══════════════════════════════════════════════════════════════
   Square checkbox — shows order number when selected
══════════════════════════════════════════════════════════════ */
const PillarCheckbox = ({ orderNumber }) => {
  const selected = orderNumber > 0;
  return (
    <span
      style={{
        flexShrink:     0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          '22px',
        height:         '22px',
        minWidth:       '22px',
        borderRadius:   '5px',
        border:         selected ? 'none' : '1.5px solid #d1d5db',
        background:     selected ? '#E05252' : '#ffffff',
        color:          '#ffffff',
        fontSize:       '11px',
        fontWeight:     700,
        lineHeight:     1,
        transition:     'background 0.15s, border-color 0.15s',
      }}
    >
      {selected ? orderNumber : null}
    </span>
  );
};

/* ══════════════════════════════════════════════════════════════
   Loading skeleton card
══════════════════════════════════════════════════════════════ */
const SkeletonItem = () => (
  <div
    style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px 16px' }}
    className="flex items-start gap-3 animate-pulse"
  >
    <span className="w-[22px] h-[22px] rounded bg-gray-100 shrink-0 mt-0.5" />
    <div className="flex-1 space-y-2">
      <div className="h-3.5 bg-gray-100 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-full" />
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   Full-screen overlay — video + text centered, responsive size
══════════════════════════════════════════════════════════════ */
const VideoLoader = () => (
  <div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
    style={{ background: '#f5f5f5' }}
  >
    <video
      src={loaderVideo}
      autoPlay
      loop
      muted
      playsInline
      style={{
        width:     '100%',
        maxWidth:  '398px',
        height:    'auto',
        maxHeight: '266px',
        objectFit: 'contain',
      }}
    />
    <p
      style={{
        fontFamily:    'Lato, sans-serif',
        fontWeight:    700,
        fontSize:      'clamp(16px, 4vw, 24px)',
        lineHeight:    '1.4',
        letterSpacing: '0',
        color:         '#184A61',
        margin:        '0',
        textAlign:     'center',
        padding:       '0 8px',
      }}
    >
      Getting your wellness journey ready...
    </p>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   PAGE — Step 6: Wellbeing Pillars
══════════════════════════════════════════════════════════════ */
const WellbeingPillars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registrationForm,
    wellbeingPillarsLoading,
    wellbeingPillarsError,
    completeRegError,
  } = useSelector((s) => s.auth);

  const { wellbeingPillars, otpToken } = registrationForm;

  /* Guard — must arrive here after OTP step */
  useEffect(() => {
    if (!otpToken) navigate('/', { replace: true });
  }, [otpToken, navigate]);

  /* Fetch pillars on mount */
  useEffect(() => {
    if (wellbeingPillars.length === 0) dispatch(fetchWellbeingPillars());
  }, [dispatch, wellbeingPillars.length]);

  /* ── Selection: ordered array of IDs ── */
  const [selected,   setSelected]   = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const getOrder = (id) => {
    const idx = selected.indexOf(id);
    return idx === -1 ? 0 : idx + 1;
  };

  const togglePillar = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_PILLARS) return prev;
      return [...prev, id];
    });
  };

  const allThreeSelected = selected.length === MAX_PILLARS;

  /* ── Final submit — show video for ≥ 2 s while API runs ── */
  const handleDone = async () => {
    if (!allThreeSelected || showLoader) return;
    setShowLoader(true);
    dispatch(setSelectedPillars(selected));

    const minDelay = new Promise((r) => setTimeout(r, 2000));
    try {
      await Promise.all([dispatch(completeRegistration()).unwrap(), minDelay]);
      navigate('/welcome');
    } catch (_) {
      setShowLoader(false);
    }
  };

  /* ── Render ── */
  return (
    <AuthLayout cardStyle={{ maxWidth: '960px' }}>

      {/* Video loader — full-screen while processing */}
      {showLoader && <VideoLoader />}

      {/* Title */}
      <h2
        className="text-center font-bold mb-6 sm:mb-8"
        style={{ color: '#184A61', fontSize: 'clamp(15px, 3vw, 20px)', lineHeight: '1.4' }}
      >
        Select any 3 well-being pillars goal you want to achieve
      </h2>

      {/* API error */}
      {(wellbeingPillarsError || completeRegError) && (
        <div className="mb-5">
          <Alert type="error" message={wellbeingPillarsError || completeRegError} />
        </div>
      )}

      {/* ── Pillar grid — 1 col mobile / 2 col tablet / 3 col desktop ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-9">
        {wellbeingPillarsLoading && wellbeingPillars.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)
          : wellbeingPillars.map((pillar) => {
              const order = getOrder(pillar.id);
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => togglePillar(pillar.id)}
                  style={{
                    display:      'flex',
                    alignItems:   'flex-start',
                    gap:          '12px',
                    background:   '#ffffff',
                    border:       '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding:      '14px 16px',
                    cursor:       'pointer',
                    textAlign:    'left',
                    width:        '100%',
                    transition:   'border-color 0.15s',
                  }}
                >
                  <PillarCheckbox orderNumber={order} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#184A61', lineHeight: '1.3' }}>
                      {pillar.pillar_title}
                    </span>
                    <span style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.5' }}>
                      {pillar.description}
                    </span>
                  </span>
                </button>
              );
            })
        }
      </div>

      {/* ── Bottom navigation — stacks on mobile, side-by-side on sm+ ── */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={showLoader}
          className="w-full sm:w-40"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '6px',
            padding:        '13px 20px',
            borderRadius:   '8px',
            border:         '1.5px solid #E05252',
            background:     'transparent',
            color:          '#E05252',
            fontSize:       '14px',
            fontWeight:     500,
            cursor:         showLoader ? 'not-allowed' : 'pointer',
            opacity:        showLoader ? 0.5 : 1,
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Done */}
        <button
          type="button"
          onClick={handleDone}
          disabled={!allThreeSelected || showLoader}
          className="w-full sm:w-40"
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '13px 20px',
            borderRadius:   '8px',
            border:         'none',
            background:     allThreeSelected && !showLoader ? '#E05252' : '#d1d5db',
            color:          '#ffffff',
            fontSize:       '14px',
            fontWeight:     600,
            cursor:         allThreeSelected && !showLoader ? 'pointer' : 'not-allowed',
            transition:     'background 0.2s ease',
          }}
        >
          Done
        </button>
      </div>

    </AuthLayout>
  );
};

export default WellbeingPillars;
