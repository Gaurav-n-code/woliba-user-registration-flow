/**
 * WellnessIcons — SVG vector icons for wellness / sport activities
 * All icons use currentColor so they adapt to selected/unselected pill state.
 * ViewBox: 0 0 24 24 | strokeWidth: 1.6 | strokeLinecap: round
 */

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' };

/* ── shared head circle ── */
const Head = ({ cx, cy, r = 2 }) => (
  <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
);

/* ────────────────────────────────────────────── INDIVIDUAL SPORTS */

export const IconAerobics = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    {/* jumping-jack arms spread wide */}
    <path d="M12 5v6" />
    <path d="M12 7l-5 3M12 7l5 3" />
    {/* legs spread */}
    <path d="M12 11l-4 7M12 11l4 7" />
  </svg>
);

export const IconBallet = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="11" cy="3" />
    {/* torso upright */}
    <path d="M11 5v7" />
    {/* arms graceful: left up, right side */}
    <path d="M11 8l-3-3" />
    <path d="M11 8l3 2" />
    {/* arabesque: standing leg down, back leg up + extended */}
    <path d="M11 12l-1 9" />
    <path d="M11 12c2-1 5-3 7-5" />
  </svg>
);

export const IconCalisthenics = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="5" cy="9" />
    {/* push-up position: body horizontal */}
    <path d="M6 10l12 0" />
    {/* arms supporting */}
    <path d="M8 10v4M16 10v4" />
    {/* feet */}
    <path d="M14 10l4 3" />
  </svg>
);

export const IconDance = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="13" cy="3" />
    {/* torso with twist */}
    <path d="M13 5l-1 7" />
    {/* arms spread in dance */}
    <path d="M12 8l-4-2M12 8l4-2" />
    {/* legs: one kicked out */}
    <path d="M12 12l-2 8" />
    <path d="M12 12c1 2 4 4 6 3" />
  </svg>
);

export const IconGymnastics = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="5" cy="6" />
    {/* cartwheel: body diagonal */}
    <path d="M5 8l7 6" />
    {/* legs up */}
    <path d="M12 14l5-5M12 14l6 4" />
    {/* arms as support */}
    <path d="M5 8l-1 5" />
    <path d="M7 9l3-3" />
  </svg>
);

export const IconHiking = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="13" cy="3" />
    {/* slight forward lean torso */}
    <path d="M13 5l-1 8" />
    {/* backpack hint */}
    <rect x="13" y="5" width="3" height="5" rx="1" />
    {/* arm with pole */}
    <path d="M12 9l-3 4" />
    {/* walking pole */}
    <path d="M9 13l-2 7" />
    {/* other arm */}
    <path d="M12 8l3 2" />
    {/* legs striding */}
    <path d="M12 13l-2 7M12 13l2 7" />
  </svg>
);

export const IconObstacleRacing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="8" cy="3" />
    {/* body leaping forward */}
    <path d="M8 5l1 6" />
    {/* arms: one forward one back */}
    <path d="M9 8l4-2M9 8l-3-1" />
    {/* front leg clearing hurdle */}
    <path d="M9 11l5 0l3 4" />
    {/* back leg trailing */}
    <path d="M9 11l-2 5" />
    {/* hurdle */}
    <path d="M14 11v8M18 11v8" />
  </svg>
);

export const IconPilates = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="4" cy="12" />
    {/* reclined torso */}
    <path d="M5 13l7 0" />
    {/* legs raised at angle – V-sit */}
    <path d="M12 13l5-6" />
    {/* arms reaching toward legs */}
    <path d="M8 13l4-4" />
    {/* floor line */}
    <path d="M2 17l20 0" />
  </svg>
);

export const IconRunning = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="15" cy="3" />
    {/* torso leaning forward */}
    <path d="M14 5l-3 6" />
    {/* forward arm */}
    <path d="M13.5 7.5l4-2" />
    {/* back arm */}
    <path d="M13 8l-3 2" />
    {/* front leg */}
    <path d="M11 11l3 5l-2 4" />
    {/* back leg */}
    <path d="M11 11l-2.5 4l2 4" />
  </svg>
);

export const IconWalking = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    {/* upright torso */}
    <path d="M12 5v8" />
    {/* swinging arms */}
    <path d="M12 9l3 3M12 9l-3 2" />
    {/* stride legs */}
    <path d="M12 13l-2 5l-2 3" />
    <path d="M12 13l2 5l2 3" />
  </svg>
);

export const IconYoga = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    {/* upright spine */}
    <path d="M12 5v6" />
    {/* arms in yoga mudra: raised and angled */}
    <path d="M12 8l-4 3M12 8l4 3" />
    {/* seated crossed legs */}
    <path d="M12 11c-2 2-4 2-5 5" />
    <path d="M12 11c2 2 4 2 5 5" />
    <path d="M7 16l10 0" />
  </svg>
);

/* ──────────────────────────────────────────────────── BALL SPORTS */

export const IconBasketball = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="13" cy="3" />
    {/* body */}
    <path d="M13 5l-1 7" />
    {/* dribbling arm */}
    <path d="M12 9l-3 4" />
    {/* other arm */}
    <path d="M12 9l3 2" />
    {/* legs */}
    <path d="M12 12l-2 6M12 12l2 6" />
    {/* basketball */}
    <circle cx="8" cy="17" r="3" />
    <path d="M8 14v6M5 15.5l6 3M5 18.5l6-3" />
  </svg>
);

export const IconSoccer = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="11" cy="3" />
    <path d="M11 5l-1 7" />
    <path d="M10 8l3 2M10 8l-3 1" />
    {/* kicking leg */}
    <path d="M10 12l2 4l4 2" />
    {/* standing leg */}
    <path d="M10 12l-2 7" />
    {/* ball */}
    <circle cx="17" cy="19" r="2.5" />
  </svg>
);

export const IconTennis = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="9" cy="3" />
    <path d="M9 5v7" />
    {/* racket arm swinging */}
    <path d="M9 8l5-4" />
    {/* racket head */}
    <ellipse cx="15.5" cy="3" rx="2.5" ry="2" />
    <path d="M13.5 4.5l-4 3" />
    {/* other arm */}
    <path d="M9 8l-3 3" />
    <path d="M9 12l-2 7M9 12l2 7" />
  </svg>
);

export const IconVolleyball = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    <path d="M12 5v6" />
    {/* both arms raised to spike/set */}
    <path d="M12 8l-4-2M12 8l4-2" />
    {/* legs */}
    <path d="M12 11l-2 7M12 11l2 7" />
    {/* ball above */}
    <circle cx="12" cy="1.5" r="1.5" />
  </svg>
);

export const IconBaseball = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="9" cy="3" />
    <path d="M9 5v7" />
    {/* batting swing: arms follow-through */}
    <path d="M9 9l5-4l3 3" />
    {/* bat */}
    <path d="M14 5l4 5" />
    {/* legs in batting stance */}
    <path d="M9 12l-3 7M9 12l3 6" />
  </svg>
);

export const IconGolf = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="10" cy="3" />
    <path d="M10 5v8" />
    {/* follow-through arms */}
    <path d="M10 9l5-5" />
    <path d="M10 9l-3 3" />
    {/* club */}
    <path d="M15 4l2 2" />
    {/* legs */}
    <path d="M10 13l-2 7M10 13l3 7" />
    {/* ball */}
    <circle cx="18" cy="20" r="1.5" />
    {/* hole flag */}
    <path d="M18 20v-5l3-2" />
  </svg>
);

export const IconRugby = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    <path d="M12 5l-1 7" />
    {/* carrying ball with one arm */}
    <path d="M11 8l4 2" />
    <path d="M11 9l-3 2" />
    {/* legs running */}
    <path d="M11 12l-2 6M11 12l2 6" />
    {/* rugby ball */}
    <ellipse cx="16" cy="11" rx="2.5" ry="1.5" transform="rotate(-30 16 11)" />
  </svg>
);

/* ──────────────────────────────────────────────── WHEEL SPORTS */

export const IconCycling = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* wheels */}
    <circle cx="6" cy="17" r="3.5" />
    <circle cx="18" cy="17" r="3.5" />
    {/* frame */}
    <path d="M6 17l4-7l8 7" />
    <path d="M10 10l2-1" />
    {/* rider */}
    <Head cx="15" cy="6" />
    <path d="M15 8l-3 3" />
    <path d="M15 9l3 2l-3 6" />
    {/* handlebars */}
    <path d="M12 11l-5 1" />
    <path d="M7 12l-1-1 1-1" />
  </svg>
);

export const IconSkateboarding = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* board */}
    <path d="M3 20l18 0" />
    <circle cx="7" cy="21" r="1.2" />
    <circle cx="17" cy="21" r="1.2" />
    {/* rider crouching */}
    <Head cx="14" cy="6" />
    <path d="M14 8l-1 6" />
    <path d="M13 11l-4-2M13 11l3-2" />
    <path d="M13 14l-3 4l-3 2" />
    <path d="M13 14l2 4l3 2" />
  </svg>
);

export const IconRollerblading = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="13" cy="3" />
    {/* gliding body leaned */}
    <path d="M13 5l-2 8" />
    <path d="M12 9l4-2M12 9l-3 2" />
    {/* skating legs */}
    <path d="M11 13l-1 4" />
    <path d="M11 13l2 4" />
    {/* skate boots */}
    <path d="M7 18l5 0" />
    <path d="M11 18l5 0" />
    <circle cx="8" cy="19" r="1" />
    <circle cx="10" cy="19" r="1" />
    <circle cx="13" cy="19" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

export const IconMountainBiking = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <circle cx="6" cy="18" r="3.5" />
    <circle cx="18" cy="18" r="3.5" />
    <path d="M6 18l4-8l8 8" />
    <path d="M10 10l2-2" />
    <Head cx="16" cy="6" />
    {/* more aggressive forward lean */}
    <path d="M16 8l-4 4" />
    <path d="M16 9l3 3l-3 6" />
    <path d="M12 12l-5 2" />
    {/* mountain terrain */}
    <path d="M1 21l5-8l4 5l4-10l4 6l4-5 2 12" />
  </svg>
);

/* ──────────────────────────────────────────────── COMBAT SPORTS */

export const IconBoxing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    <path d="M12 5l-1 8" />
    {/* front punch extended */}
    <path d="M11 8l5-2" />
    {/* glove at end */}
    <rect x="15" y="5" width="3" height="2" rx="1" />
    {/* guard arm */}
    <path d="M11 9l-3 0" />
    <rect x="6" y="7" width="3" height="2" rx="1" />
    {/* legs in stance */}
    <path d="M11 13l2 7M11 13l-2 7" />
  </svg>
);

export const IconWrestling = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* two figures grappling */}
    <Head cx="8" cy="5" />
    <path d="M8 7l1 5" />
    <path d="M9 9l4 0" />
    <path d="M9 12l-2 6M9 12l2 5" />
    <Head cx="16" cy="7" />
    <path d="M16 9l-1 4" />
    <path d="M15 11l-4 0" />
    <path d="M15 13l2 5M15 13l-2 6" />
  </svg>
);

export const IconMartialArts = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    <path d="M12 5v7" />
    {/* high kick */}
    <path d="M12 12l-3 7" />
    <path d="M12 10l5-4" />
    {/* arms in block/strike */}
    <path d="M12 8l-4 2M12 8l3 3" />
    {/* belt line */}
    <path d="M9 11l6 0" />
  </svg>
);

/* ─────────────────────────────────────────── RESISTANCE TRAINING */

export const IconWeightLifting = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="5" />
    <path d="M12 7v6" />
    {/* arms raised overhead with barbell */}
    <path d="M12 9l-4-3M12 9l4-3" />
    {/* barbell */}
    <path d="M5 5l14 0" />
    {/* plates */}
    <path d="M5 3v4M8 4v2M16 4v2M19 3v4" />
    {/* legs planted */}
    <path d="M12 13l-3 6M12 13l3 6" />
  </svg>
);

export const IconCrossfit = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    {/* burpee / box-jump pose: jumping up arms overhead */}
    <path d="M12 5v6" />
    <path d="M12 8l-4-3M12 8l4-3" />
    <path d="M12 11l-3 5l2 4" />
    <path d="M12 11l3 5l-2 4" />
    {/* box */}
    <rect x="7" y="19" width="10" height="3" rx="1" />
  </svg>
);

export const IconKettlebell = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    <path d="M12 5l-1 7" />
    {/* one arm swing */}
    <path d="M11 9l-3 5" />
    <path d="M11 9l3 1" />
    {/* legs wide in swing stance */}
    <path d="M11 12l-3 7M11 12l3 7" />
    {/* kettlebell */}
    <circle cx="7" cy="16" r="2.5" />
    <path d="M5.5 14c0-2 3-2 3 0" />
  </svg>
);

export const IconPowerlifting = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="4" />
    {/* deadlift: bent forward grabbing bar */}
    <path d="M12 6c0 0-1 4-3 6" />
    <path d="M12 6c0 0 1 3 3 5" />
    {/* bar on floor */}
    <path d="M3 18l18 0" />
    <path d="M3 16v4M6 15v6M18 15v6M21 16v4" />
    {/* arms reaching down */}
    <path d="M9 12l0 5M15 11l0 5" />
    <path d="M9 17l6 1" />
    {/* legs */}
    <path d="M9 6l-2 12M15 5l2 13" />
  </svg>
);

export const IconBodybuilding = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    {/* wide torso / double-bicep pose */}
    <path d="M12 5v8" />
    {/* arms flexed up at sides */}
    <path d="M12 7l-4-1l-1 3l2 1" />
    <path d="M12 7l4-1l1 3l-2 1" />
    {/* wide legs */}
    <path d="M12 13l-4 7M12 13l4 7" />
  </svg>
);

/* ──────────────────────────────────────────────── WINTER SPORTS */

export const IconSkiing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="13" cy="4" />
    {/* crouching forward */}
    <path d="M13 6l-2 7" />
    {/* poles */}
    <path d="M12 9l-4-2l-2 8" />
    <path d="M12 9l4-1l2 7" />
    {/* bent knees */}
    <path d="M11 13l-2 3M11 13l2 3" />
    {/* skis */}
    <path d="M4 19l10-3" />
    <path d="M10 18l10-2" />
  </svg>
);

export const IconSnowboarding = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="14" cy="4" />
    <path d="M14 6l-2 7" />
    {/* arms out for balance */}
    <path d="M13 9l-4 2M13 9l4 0" />
    {/* legs on board */}
    <path d="M12 13l-2 3M12 13l3 3" />
    {/* snowboard diagonal */}
    <path d="M4 19l16-5" />
    <path d="M4 19c-1 1 0 3 2 2" />
    <path d="M20 14c1-1 2 1 1 2" />
  </svg>
);

export const IconIceSkating = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="3" />
    <path d="M12 5v8" />
    {/* arms wide for balance */}
    <path d="M12 8l-5-1M12 8l5-1" />
    {/* gliding on one leg */}
    <path d="M12 13l-1 6" />
    {/* extended back leg */}
    <path d="M12 13l6-3" />
    {/* skate blade */}
    <path d="M9 19l4 0" />
    {/* ice surface */}
    <path d="M2 21l20 0" />
  </svg>
);

export const IconHockey = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="9" cy="3" />
    <path d="M9 5v8" />
    {/* stick arm */}
    <path d="M9 8l4-2" />
    {/* hockey stick */}
    <path d="M13 6l5 10l-3 2" />
    {/* puck */}
    <ellipse cx="17" cy="18" rx="2" ry="0.8" />
    <path d="M9 8l-3 3" />
    <path d="M9 13l-2 6M9 13l2 6" />
  </svg>
);

export const IconCurling = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="9" cy="4" />
    {/* bent forward releasing stone */}
    <path d="M9 6l-2 7" />
    {/* broom in one hand */}
    <path d="M8 9l4-2l4 8" />
    {/* sliding leg extended */}
    <path d="M7 13l7-3" />
    {/* front leg crouched */}
    <path d="M7 13l-2 5" />
    {/* curling stone */}
    <circle cx="4" cy="20" r="2.5" />
    <path d="M3 19l2-3" />
    {/* ice */}
    <path d="M1 22l22 0" />
  </svg>
);

/* ──────────────────────────────────────────────── WATER SPORTS */

export const IconSwimming = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="20" cy="10" />
    {/* body horizontal in water */}
    <path d="M19 11l-14 2" />
    {/* freestyle stroke arm forward */}
    <path d="M19 11l3-4" />
    {/* trailing arm */}
    <path d="M13 12l-3-4" />
    {/* legs kicking */}
    <path d="M5 13l-2-2M5 13l-2 2" />
    {/* water lines */}
    <path d="M2 16c3-1 5 1 8 0s5-1 8 0 4 1 5 0" />
  </svg>
);

export const IconSurfing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="5" />
    {/* standing on board, arms out */}
    <path d="M12 7v6" />
    <path d="M12 10l-4-2M12 10l4-2" />
    <path d="M12 13l-2 4l-1 3" />
    <path d="M12 13l2 4l2 3" />
    {/* surfboard */}
    <path d="M2 20c3-2 15-2 20 0" />
    <path d="M2 20c2 2 16 2 20 0" />
    {/* wave */}
    <path d="M1 17c3-2 5 2 8 0s5-2 8 0 4 2 7 0" />
  </svg>
);

export const IconKayaking = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* kayak hull */}
    <path d="M2 16c3-2 5-2 10-2s7 0 10 2c-3 2-7 2-10 2s-7 0-10-2z" />
    <Head cx="12" cy="9" />
    <path d="M12 11v4" />
    {/* paddle */}
    <path d="M6 12l12 0" />
    {/* blades */}
    <path d="M6 12l-2-2l-2 2l2 2z" />
    <path d="M18 12l2-2l2 2l-2 2z" />
  </svg>
);

export const IconDiving = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="12" cy="4" />
    {/* streamlined dive position: body angled down */}
    <path d="M12 6l-3 8" />
    {/* arms together pointed forward/down */}
    <path d="M11 9l4-3" />
    <path d="M11 10l-3-2" />
    {/* legs together */}
    <path d="M9 14l-2 6" />
    <path d="M9 14l0 6" />
    {/* water splash */}
    <path d="M5 21c2-2 4-1 6 0s4 2 7 0" />
  </svg>
);

export const IconRowing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* boat */}
    <path d="M2 17c4-2 14-2 20 0l-1 3H3z" />
    <Head cx="12" cy="10" />
    <path d="M12 12v5" />
    {/* oar */}
    <path d="M12 13l-7-5" />
    <path d="M5 8l-2-1l-1 2l2 1z" />
    {/* leaning back */}
    <path d="M12 12l3-2" />
  </svg>
);

/* ──────────────────────────────────────────────── OTHER SPORTS */

export const IconRockClimbing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* wall */}
    <path d="M20 2v20" />
    {/* holds */}
    <circle cx="19" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="17" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="19" cy="15" r="1" fill="currentColor" stroke="none" />
    <Head cx="14" cy="6" />
    <path d="M14 8l-2 6" />
    {/* hand grips */}
    <path d="M14 9l4-3" />
    <path d="M13 9l-2-2" />
    {/* feet on wall */}
    <path d="M12 14l4 3" />
    <path d="M11 13l-2 4" />
  </svg>
);

export const IconArchery = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="8" cy="4" />
    <path d="M8 6v8" />
    {/* draw arm back */}
    <path d="M8 9l4 2" />
    {/* bow arm extended */}
    <path d="M8 9l-3-1" />
    {/* bow */}
    <path d="M5 3c-2 3-2 9 0 12" />
    {/* bow string */}
    <path d="M5 3l7 8M5 15l7-6" />
    {/* arrow */}
    <path d="M12 11l7-1" />
    <path d="M19 10l-2 0l0 2" />
    <path d="M8 14l-2 6M8 14l2 6" />
  </svg>
);

export const IconEquestrian = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    {/* horse body */}
    <path d="M3 14c3-3 12-3 16-1" />
    {/* horse neck + head */}
    <path d="M19 13l2-4" />
    <circle cx="21" cy="8" r="2" />
    {/* horse legs */}
    <path d="M6 14l-1 6M9 14l0 6M14 14l1 6M17 13l1 6" />
    {/* horse tail */}
    <path d="M3 14l-2 3" />
    {/* rider */}
    <Head cx="13" cy="7" />
    <path d="M13 9l0 5" />
    <path d="M13 11l4 2M13 11l-4 2" />
  </svg>
);

export const IconFencing = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="15" cy="3" />
    {/* body in lunge */}
    <path d="M15 5l-2 8" />
    {/* sword arm lunging forward */}
    <path d="M14 8l6-4" />
    {/* sword */}
    <path d="M20 4l2-2" />
    {/* guard */}
    <path d="M19 5l2 2" />
    {/* back arm */}
    <path d="M14 8l-3-1" />
    {/* front leg lunging */}
    <path d="M13 13l4 6" />
    {/* back leg */}
    <path d="M13 13l-4 2l-2 5" />
  </svg>
);

export const IconShooting = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...S}>
    <Head cx="8" cy="4" />
    <path d="M8 6v8" />
    {/* aiming arm extended */}
    <path d="M8 9l8 0" />
    {/* pistol shape */}
    <path d="M16 8l3 0l0 3l-1 0" />
    <path d="M17 11l0 2" />
    {/* other arm supporting */}
    <path d="M8 10l-3 2" />
    <path d="M8 14l-2 6M8 14l3 6" />
    {/* target */}
    <circle cx="22" cy="9" r="1.5" />
    <circle cx="22" cy="9" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
