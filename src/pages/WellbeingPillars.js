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
    style={{
      border:       '1px solid #e5e7eb',
      borderRadius: '10px',
      padding:      '14px 16px',
    }}
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
   Full-screen loading overlay while registration API runs
══════════════════════════════════════════════════════════════ */
const Overlay = () => (
  <div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
    style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
  >
    <span
      className="h-12 w-12 rounded-full border-4 animate-spin mb-4"
      style={{ borderColor: '#f3f4f6', borderTopColor: '#E05252' }}
    />
    <p className="text-base font-semibold" style={{ color: '#184A61' }}>
      Completing registration…
    </p>
    <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   PAGE — Step 6: Wellbeing Pillars
   Matches Figma: 3-column grid of bordered cards, square checkbox
   with order number, no disabling — extra clicks are silently ignored.
══════════════════════════════════════════════════════════════ */
const WellbeingPillars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registrationForm,
    wellbeingPillarsLoading,
    wellbeingPillarsError,
    completeRegLoading,
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

  /* ── Selection: ordered array of IDs (index 0 = first pick) ── */
  const [selected, setSelected] = useState([]); // e.g. [4, 7, 2]

  const getOrder = (id) => {
    const idx = selected.indexOf(id);
    return idx === -1 ? 0 : idx + 1; // 0 = not selected; 1/2/3 = order
  };

  const togglePillar = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= MAX_PILLARS) return prev;
      return [...prev, id];
    });
  };

  const allThreeSelected = selected.length === MAX_PILLARS;

  /* ── Final submit ── */
  const handleDone = async () => {
    if (!allThreeSelected || completeRegLoading) return;
    dispatch(setSelectedPillars(selected));
    try {
      await dispatch(completeRegistration()).unwrap();
      navigate('/welcome');
    } catch (_) { /* completeRegError shown via Alert */ }
  };

  /* ── Render ── */
  return (
    <AuthLayout cardStyle={{ maxWidth: '960px' }}>

      {completeRegLoading && <Overlay />}

      {/* Title */}
      <h2
        className="text-center font-bold mb-8"
        style={{ color: '#184A61', fontSize: '20px', lineHeight: '1.4' }}
      >
        Select any 3 well-being pillars goal you want to achieve
      </h2>

      {/* API error */}
      {(wellbeingPillarsError || completeRegError) && (
        <div className="mb-5">
          <Alert type="error" message={wellbeingPillarsError || completeRegError} />
        </div>
      )}

      {/* Pillar grid */}
      <div
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '16px',
          marginBottom:        '36px',
        }}
      >
        {wellbeingPillarsLoading && wellbeingPillars.length === 0
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonItem key={i} />)
          : wellbeingPillars.map((pillar) => {
              const order  = getOrder(pillar.id);
              const isSel  = order > 0;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => togglePillar(pillar.id)}
                  style={{
                    display:       'flex',
                    alignItems:    'flex-start',
                    gap:           '12px',
                    background:    '#ffffff',
                    border:        '1px solid #e5e7eb',
                    borderRadius:  '10px',
                    padding:       '14px 16px',
                    cursor:        'pointer',
                    textAlign:     'left',
                    transition:    'border-color 0.15s, box-shadow 0.15s',
                    boxShadow:     isSel ? '0 0 0 1px #e5e7eb' : 'none',
                  }}
                >
                  {/* Square checkbox / number badge */}
                  <PillarCheckbox orderNumber={order} />

                  {/* Text */}
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span
                      style={{
                        fontSize:   '14px',
                        fontWeight: 600,
                        color:      '#184A61',
                        lineHeight: '1.3',
                      }}
                    >
                      {pillar.pillar_title}
                    </span>
                    <span
                      style={{
                        fontSize:   '12px',
                        color:      '#9ca3af',
                        lineHeight: '1.5',
                      }}
                    >
                      {pillar.description}
                    </span>
                  </span>
                </button>
              );
            })
        }
      </div>

      {/* Bottom navigation — Back + Done */}
      <div className="flex items-center justify-center gap-3">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={completeRegLoading}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '6px',
            width:          '160px',
            padding:        '13px 20px',
            borderRadius:   '8px',
            border:         '1.5px solid #E05252',
            background:     'transparent',
            color:          '#E05252',
            fontSize:       '14px',
            fontWeight:     500,
            cursor:         completeRegLoading ? 'not-allowed' : 'pointer',
            opacity:        completeRegLoading ? 0.5 : 1,
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
          disabled={!allThreeSelected || completeRegLoading}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '8px',
            width:          '160px',
            padding:        '13px 20px',
            borderRadius:   '8px',
            border:         'none',
            background:     allThreeSelected && !completeRegLoading ? '#E05252' : '#d1d5db',
            color:          '#ffffff',
            fontSize:       '14px',
            fontWeight:     600,
            cursor:         allThreeSelected && !completeRegLoading ? 'pointer' : 'not-allowed',
            transition:     'background 0.2s ease',
          }}
        >
          {completeRegLoading && (
            <span
              className="inline-block h-4 w-4 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
            />
          )}
          {completeRegLoading ? 'Processing…' : 'Done'}
        </button>
      </div>

    </AuthLayout>
  );
};

export default WellbeingPillars;
