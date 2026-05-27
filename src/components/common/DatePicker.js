import React, { useState, useRef, useEffect } from 'react';

/**
 * DatePicker — Custom reusable date picker
 *
 * Props:
 *   label        — field label text
 *   value        — controlled value (MM/DD/YYYY string)
 *   onChange     — called with (MM/DD/YYYY string) on Done
 *   placeholder  — input placeholder (default: 'Select date of birth [MM/DD/YYYY]')
 *   error        — validation error string
 *   required     — boolean
 *   minYear      — earliest year in year dropdown (default: 1924)
 *   maxYear      — latest year in year dropdown (default: current year)
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_HEADERS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/* ── helpers ──────────────────────────────────────────────────── */
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

/** Returns 0=Mon … 6=Sun offset for the 1st of month */
const firstDayOffset = (month, year) => {
  const jsDay = new Date(year, month, 1).getDay(); // 0=Sun
  return jsDay === 0 ? 6 : jsDay - 1;
};

const toDisplay = (date) => {
  if (!date) return '';
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${m}/${d}/${date.getFullYear()}`;
};

const parseDisplay = (str) => {
  if (!str) return null;
  const [m, d, y] = str.split('/').map(Number);
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? null : date;
};

/* ── CalendarIcon ─────────────────────────────────────────────── */
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[18px] w-[18px]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#E05252"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

/* ── ChevronDown ──────────────────────────────────────────────── */
const ChevronDown = () => (
  <svg
    className="w-4 h-4 text-gray-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════ */
const DatePicker = ({
  label,
  value = '',
  onChange,
  placeholder = 'Select date of birth [MM/DD/YYYY]',
  error,
  required = false,
  minYear,
  maxYear,
}) => {
  const today = new Date();
  const resolvedMaxYear = maxYear ?? today.getFullYear();
  const resolvedMinYear = minYear ?? 1924;

  /* ── state ── */
  const [isOpen, setIsOpen]                   = useState(false);
  const [viewMonth, setViewMonth]             = useState(today.getMonth());
  const [viewYear, setViewYear]               = useState(today.getFullYear());
  const [pendingDate, setPendingDate]         = useState(null); // selection inside picker before Done
  const [showMonthMenu, setShowMonthMenu]     = useState(false);
  const [showYearMenu, setShowYearMenu]       = useState(false);

  const modalRef      = useRef(null);
  const monthMenuRef  = useRef(null);
  const yearMenuRef   = useRef(null);

  /* sync external value → picker view on open */
  useEffect(() => {
    if (isOpen) {
      const parsed = parseDisplay(value);
      if (parsed) {
        setViewMonth(parsed.getMonth());
        setViewYear(parsed.getFullYear());
        setPendingDate(parsed);
      } else {
        setPendingDate(null);
      }
    }
    // reset menus on open/close
    setShowMonthMenu(false);
    setShowYearMenu(false);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  /* close dropdowns on outside click */
  useEffect(() => {
    const handleOutside = (e) => {
      if (monthMenuRef.current && !monthMenuRef.current.contains(e.target)) {
        setShowMonthMenu(false);
      }
      if (yearMenuRef.current && !yearMenuRef.current.contains(e.target)) {
        setShowYearMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  /* ── calendar grid ── */
  const buildCells = () => {
    const total    = daysInMonth(viewMonth, viewYear);
    const offset   = firstDayOffset(viewMonth, viewYear);
    const prevTotal = daysInMonth(
      viewMonth === 0 ? 11 : viewMonth - 1,
      viewMonth === 0 ? viewYear - 1 : viewYear,
    );

    const cells = [];

    // trailing days from previous month
    for (let i = offset - 1; i >= 0; i--) {
      cells.push({ day: prevTotal - i, type: 'prev' });
    }
    // current month
    for (let d = 1; d <= total; d++) {
      cells.push({ day: d, type: 'current' });
    }
    // leading days from next month (always show 6 rows → 42 cells)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, type: 'next' });
    }

    return cells;
  };

  const isSelectedCell = (cell) => {
    if (cell.type !== 'current' || !pendingDate) return false;
    return (
      pendingDate.getDate()     === cell.day &&
      pendingDate.getMonth()    === viewMonth &&
      pendingDate.getFullYear() === viewYear
    );
  };

  const isTodayCell = (cell) => {
    if (cell.type !== 'current') return false;
    return (
      today.getDate()     === cell.day &&
      today.getMonth()    === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  const handleDayClick = (cell) => {
    if (cell.type !== 'current') return;
    setPendingDate(new Date(viewYear, viewMonth, cell.day));
  };

  const handleDone = () => {
    if (pendingDate) onChange(toDisplay(pendingDate));
    setIsOpen(false);
  };

  /* ── year list ── */
  const years = [];
  for (let y = resolvedMaxYear; y >= resolvedMinYear; y--) years.push(y);

  const cells = buildCells();

  /* ════════════════════════════════════════════════════════════ */
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm mb-1" style={{ color: '#4b5563' }}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
        className={`
          w-full border rounded-md px-3 py-2.5 text-sm bg-white
          flex items-center justify-between cursor-pointer
          focus:outline-none focus:ring-1 focus:ring-blue-400
          ${error ? 'border-red-400' : 'border-gray-300'}
        `}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <CalendarIcon />
      </div>

      {error && (
        <p role="alert" className="text-red-500 text-xs mt-1">{error}</p>
      )}

      {/* ── Modal overlay ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pb-48"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-[310px] px-5 pt-5 pb-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h3 className="text-center font-semibold text-gray-800 text-[15px] mb-4">
              Select date
            </h3>

            {/* Month / Year row */}
            <div className="flex items-center gap-4 mb-3">
              {/* Month dropdown */}
              <div className="relative" ref={monthMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    setShowMonthMenu((v) => !v);
                    setShowYearMenu(false);
                  }}
                >
                  {MONTHS[viewMonth]}
                  <ChevronDown />
                </button>

                {showMonthMenu && (
                  <div className="absolute top-7 left-0 z-20 w-36 max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg py-1">
                    {MONTHS.map((name, idx) => (
                      <div
                        key={name}
                        onClick={() => { setViewMonth(idx); setShowMonthMenu(false); }}
                        className={`
                          px-3 py-2 text-sm cursor-pointer
                          ${idx === viewMonth
                            ? 'bg-[#E05252] text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'}
                        `}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Year dropdown */}
              <div className="relative" ref={yearMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    setShowYearMenu((v) => !v);
                    setShowMonthMenu(false);
                  }}
                >
                  {viewYear}
                  <ChevronDown />
                </button>

                {showYearMenu && (
                  <div className="absolute top-7 left-0 z-20 w-24 max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg py-1">
                    {years.map((y) => (
                      <div
                        key={y}
                        onClick={() => { setViewYear(y); setShowYearMenu(false); }}
                        className={`
                          px-3 py-2 text-sm cursor-pointer
                          ${y === viewYear
                            ? 'bg-[#E05252] text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'}
                        `}
                      >
                        {y}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_HEADERS.map((d) => (
                <div
                  key={d}
                  className="text-center text-[11px] font-medium text-gray-400 py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((cell, idx) => {
                const selected = isSelectedCell(cell);
                const isToday  = isTodayCell(cell);
                const current  = cell.type === 'current';

                return (
                  <div
                    key={idx}
                    onClick={() => handleDayClick(cell)}
                    className={`
                      flex items-center justify-center mx-auto
                      w-8 h-8 rounded-full text-[13px] select-none
                      ${current ? 'cursor-pointer' : 'cursor-default'}
                      ${selected
                        ? 'bg-[#E05252] text-white font-semibold'
                        : isToday
                          ? 'border border-[#E05252] text-[#E05252] font-semibold'
                          : current
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300'}
                    `}
                  >
                    {cell.day}
                  </div>
                );
              })}
            </div>

            {/* Done button */}
            <button
              type="button"
              onClick={handleDone}
              className="mt-5 w-full bg-[#E05252] hover:bg-[#cc4444] active:bg-[#b83c3c] text-white rounded-lg py-2.5 text-sm font-semibold transition duration-150"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
