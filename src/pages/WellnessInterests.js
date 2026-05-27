import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector }            from 'react-redux';
import { useNavigate }                         from 'react-router-dom';
import {
  fetchWellnessInterests,
  setSelectedInterests,
} from '../redux/slices/authSlice';
import AuthLayout from '../components/layout/AuthLayout';
import Alert      from '../components/common/Alert';
import {
  IconAerobics, IconBallet, IconCalisthenics, IconDance, IconGymnastics,
  IconHiking, IconObstacleRacing, IconPilates, IconRunning, IconWalking, IconYoga,
  IconBasketball, IconSoccer, IconTennis, IconVolleyball, IconBaseball, IconGolf, IconRugby,
  IconCycling, IconSkateboarding, IconRollerblading, IconMountainBiking,
  IconBoxing, IconWrestling, IconMartialArts,
  IconWeightLifting, IconCrossfit, IconKettlebell, IconPowerlifting, IconBodybuilding,
  IconSkiing, IconSnowboarding, IconIceSkating, IconHockey, IconCurling,
  IconSwimming, IconSurfing, IconKayaking, IconDiving, IconRowing,
  IconRockClimbing, IconArchery, IconEquestrian, IconFencing, IconShooting,
} from '../components/common/WellnessIcons';

/* ── Icon resolver — maps interest name keywords → SVG component ── */
const getIconForName = (name) => {
  const n = name.toLowerCase();
  if (n.includes('aerob'))                          return IconAerobics;
  if (n.includes('ballet') || n.includes('aerial')) return IconBallet;
  if (n.includes('cali'))                           return IconCalisthenics;
  if (n.includes('dance'))                          return IconDance;
  if (n.includes('gymnast') || n.includes('acrobat')) return IconGymnastics;
  if (n.includes('hik'))                            return IconHiking;
  if (n.includes('obstacle'))                       return IconObstacleRacing;
  if (n.includes('pilat'))                          return IconPilates;
  if (n.includes('run'))                            return IconRunning;
  if (n.includes('walk'))                           return IconWalking;
  if (n.includes('yoga'))                           return IconYoga;
  if (n.includes('basket'))                         return IconBasketball;
  if (n.includes('soccer') || n.includes('football')) return IconSoccer;
  if (n.includes('tennis'))                         return IconTennis;
  if (n.includes('volley'))                         return IconVolleyball;
  if (n.includes('baseball'))                       return IconBaseball;
  if (n.includes('golf'))                           return IconGolf;
  if (n.includes('rugby'))                          return IconRugby;
  if (n.includes('cycl'))                           return IconCycling;
  if (n.includes('skateboard'))                     return IconSkateboarding;
  if (n.includes('roller'))                         return IconRollerblading;
  if (n.includes('mountain'))                       return IconMountainBiking;
  if (n.includes('box'))                            return IconBoxing;
  if (n.includes('wrest'))                          return IconWrestling;
  if (n.includes('martial') || n.includes('judo') || n.includes('karat')) return IconMartialArts;
  if (n.includes('weight') || (n.includes('lift') && !n.includes('power'))) return IconWeightLifting;
  if (n.includes('crossfit') || (n.includes('cross') && n.includes('fit'))) return IconCrossfit;
  if (n.includes('kettle'))                         return IconKettlebell;
  if (n.includes('power'))                          return IconPowerlifting;
  if (n.includes('bodyb') || (n.includes('body') && n.includes('build'))) return IconBodybuilding;
  if (n.includes('ski') && !n.includes('snow') && !n.includes('ice')) return IconSkiing;
  if (n.includes('snowboard'))                      return IconSnowboarding;
  if (n.includes('ice') || n.includes('skat'))      return IconIceSkating;
  if (n.includes('hockey'))                         return IconHockey;
  if (n.includes('curl'))                           return IconCurling;
  if (n.includes('swim'))                           return IconSwimming;
  if (n.includes('surf'))                           return IconSurfing;
  if (n.includes('kayak'))                          return IconKayaking;
  if (n.includes('div'))                            return IconDiving;
  if (n.includes('row'))                            return IconRowing;
  if (n.includes('climb') || n.includes('rock'))    return IconRockClimbing;
  if (n.includes('arch'))                           return IconArchery;
  if (n.includes('eque') || n.includes('horse'))    return IconEquestrian;
  if (n.includes('fenc'))                           return IconFencing;
  if (n.includes('shoot'))                          return IconShooting;
  return IconRunning; // default fallback
};

/* ── Chevron ── */
const Chevron = ({ open }) => (
  <svg
    style={{
      width: '16px', height: '16px', flexShrink: 0,
      transition: 'transform 0.2s ease',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
    fill="none" viewBox="0 0 24 24" stroke="#E05252" strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

/* ── Skeleton loader ── */
const SkeletonRow = () => (
  <div style={{ borderBottom: '1px solid #f3f4f6', padding: '14px 0' }}>
    <div className="animate-pulse h-4 bg-gray-100 rounded w-32" />
  </div>
);

/* ══════════════════════════════════════════════════════════════
   PAGE — Step 5: Wellness Interests
══════════════════════════════════════════════════════════════ */
const WellnessInterests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    registrationForm,
    wellnessInterestsLoading,
    wellnessInterestsError,
  } = useSelector((s) => s.auth);

  const { wellnessInterests, selectedInterests: storedSelected, otpToken } = registrationForm;

  /* Guard */
  useEffect(() => {
    if (!otpToken) navigate('/', { replace: true });
  }, [otpToken, navigate]);

  /* Fetch on mount */
  useEffect(() => {
    if (wellnessInterests.length === 0) dispatch(fetchWellnessInterests());
  }, [dispatch, wellnessInterests.length]);

  /* ── Group interests by interest_type ── */
  const categories = useMemo(() => {
    const map = {};
    wellnessInterests.forEach((item) => {
      if (!map[item.interest_type]) map[item.interest_type] = [];
      map[item.interest_type].push(item);
    });
    return Object.entries(map).map(([label, items]) => ({ label, items }));
  }, [wellnessInterests]);

  /* ── Single-open accordion ── */
  const [openLabel, setOpenLabel] = useState(null);
  useEffect(() => {
    if (categories.length > 0 && openLabel === null) {
      setOpenLabel(categories[0].label);
    }
  }, [categories, openLabel]);

  const toggleCategory = (label) =>
    setOpenLabel((prev) => (prev === label ? null : label));

  /* ── Multi-select (Set of API numeric IDs) ── */
  const [selected, setSelected] = useState(() => new Set(storedSelected));

  const toggleItem = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const hasAnySelection = selected.size > 0;

  /* ── Navigation ── */
  const handleBack = () => navigate(-1);
  const handleNext = () => {
    if (!hasAnySelection) return;
    dispatch(setSelectedInterests([...selected]));
    navigate('/wellbeing-pillars');
  };

  /* ── Render ── */
  return (
    <AuthLayout cardStyle={{ maxWidth: '1330px' }}>

      <h2
        className="text-center font-bold mb-5"
        style={{ color: '#184A61', fontSize: '17px', lineHeight: '1.5' }}
      >
        Select all wellness interests that apply&nbsp;— at least one is required.
      </h2>

      {/* API error */}
      {wellnessInterestsError && (
        <div className="mb-4">
          <Alert type="error" message={wellnessInterestsError} />
        </div>
      )}

      {/* Accordion list */}
      <div style={{ borderTop: '1px solid #f3f4f6' }}>
        {wellnessInterestsLoading && wellnessInterests.length === 0
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : categories.map(({ label, items }) => {
              const isOpen = openLabel === label;
              return (
                <div key={label} style={{ borderBottom: '1px solid #f3f4f6' }}>

                  {/* Category header */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(label)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', padding: '14px 0',
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '13.5px', color: '#6b7280', fontWeight: 400 }}>
                      {label}
                    </span>
                    <Chevron open={isOpen} />
                  </button>

                  {/* Pills */}
                  {isOpen && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingBottom: '16px' }}>
                      {items.map((item) => {
                        const sel = selected.has(item.id);
                        const Icon = getIconForName(item.name);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '7px',
                              padding: '6px 14px 6px 10px', borderRadius: '999px',
                              border:     `1.5px solid ${sel ? '#E05252' : '#e8e8e8'}`,
                              background: sel ? '#E05252' : '#ffffff',
                              color:      sel ? '#ffffff' : '#184A61',
                              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                              transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                              whiteSpace: 'nowrap', lineHeight: 1,
                              boxShadow: sel ? 'none' : '0 1px 4px rgba(0,0,0,0.07)',
                              outline: 'none',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                              <Icon />
                            </span>
                            {item.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
        }
      </div>

      {/* Selection count */}
      {selected.size > 0 && (
        <p className="text-center text-sm mt-3" style={{ color: '#6b7280' }}>
          {selected.size} interest{selected.size !== 1 ? 's' : ''} selected
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          type="button"
          onClick={handleBack}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            width: '150px', padding: '14px 20px', borderRadius: '8px',
            border: '1px solid #E05252', background: 'transparent',
            color: '#E05252', fontSize: '15px', cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!hasAnySelection}
          style={{
            width: '150px', padding: '14px 20px', borderRadius: '8px', border: 'none',
            background: hasAnySelection ? '#E05252' : '#d1d5db',
            color: '#ffffff', fontSize: '15px', fontWeight: 600,
            cursor: hasAnySelection ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s ease',
          }}
        >
          Next
        </button>
      </div>

    </AuthLayout>
  );
};

export default WellnessInterests;
