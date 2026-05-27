import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyCompany, clearVerifyError } from '../redux/slices/authSlice';
import { passwordRules, validateStep2 } from '../utils/validators';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Alert from '../components/common/Alert';

/* ── Password rule indicator ──────────────────────────────────── */
const PasswordRule = ({ passed, label }) => (
  <li className="flex items-center gap-2">
    <span
      className={`
        inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center
        rounded-full border transition-all duration-200
        ${passed ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}
      `}
    >
      {passed && (
        <svg
          className="h-[7px] w-[7px] text-white"
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={4}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
    <span className={`text-xs transition-colors duration-200 ${passed ? 'text-green-600' : 'text-gray-400'}`}>
      {label}
    </span>
  </li>
);

/* ══════════════════════════════════════════════════════════════
   REGISTRATION PAGE
   Step 1 — Verify Company Name & Password
══════════════════════════════════════════════════════════════ */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verifyLoading, verifyError } = useSelector((s) => s.auth);

  const [companyName,     setCompanyName]     = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [nameError,       setNameError]       = useState('');
  const [pwTouched,       setPwTouched]       = useState(false);
  const [step,            setStep]            = useState(1);
  const [email,           setEmail]           = useState('');
  const [firstName,       setFirstName]       = useState('');
  const [lastName,        setLastName]        = useState('');
  const [step2Errors,     setStep2Errors]     = useState({});

  /* ── Derived password rule states ──────── */
  const rules = [
    { key: 'len', label: 'Minimum 8 characters',       passed: passwordRules.minLength(companyPassword)    },
    { key: 'upp', label: 'At least 1 uppercase letter', passed: passwordRules.hasUppercase(companyPassword) },
    { key: 'num', label: 'At least 1 number',           passed: passwordRules.hasNumber(companyPassword)    },
  ];

  const allRulesMet = rules.every((r) => r.passed);
  const nameValid   = companyName.trim().length >= 2;

  /* Next button is enabled only when both conditions are fully met */
  const canSubmit   = nameValid && allRulesMet;

  /* ── Handlers ────────────────────────── */
  const handleNameChange = (e) => {
    setCompanyName(e.target.value);
    if (nameError) setNameError('');                   // clear error on correction
    if (verifyError) dispatch(clearVerifyError());
  };

  const handleNameBlur = () => {
    if (!companyName.trim())
      setNameError('Company name is required.');
    else if (companyName.trim().length < 2)
      setNameError('Company name must be at least 2 characters.');
  };

  const handlePasswordChange = (e) => {
    setCompanyPassword(e.target.value);
    if (!pwTouched) setPwTouched(true);                // reveal rules on first keystroke
    if (verifyError) dispatch(clearVerifyError());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setStep2Errors((prev) => ({ ...prev, email: undefined }));
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setStep2Errors((prev) => ({ ...prev, firstName: undefined }));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setStep2Errors((prev) => ({ ...prev, lastName: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!canSubmit) return;

      try {
        await dispatch(
          verifyCompany({ companyName: companyName.trim(), password: companyPassword })
        ).unwrap();
        setStep(2);
        setPwTouched(false);
      } catch (_) {
        /* verifyError is already set in Redux — shown in Alert */
      }
      return;
    }

    const errors = validateStep2({ firstName, lastName, email, companyName });

    if (Object.keys(errors).length) {
      setStep2Errors(errors);
      return;
    }

    setStep2Errors({});
    // At this point the second step is valid; continue to the next action.
    // Example: dispatch(registerUser({ companyName, firstName, lastName, email }))
    navigate('/verify-code', {
      state: { companyName, email, firstName, lastName },
    });
  };

  /* ── Render ──────────────────────────── */
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} noValidate>

        {/* ── Title ── */}
        <h2
          className="text-center font-bold mb-6"
          style={{ color: '#1a3353', fontSize: '22px' }}
        >
          Registration
        </h2>

        {/* ── API error banner ── */}
        {verifyError && step === 1 && (
          <div className="mb-4">
            <Alert type="error" message={verifyError} />
          </div>
        )}

        {step === 1 ? (
          <>
            {/* ── Company Name ── */}
            <div className="mb-4">
              <label
                htmlFor="companyName"
                style={{ display: 'block', fontSize: '13px', color: '#374151', fontWeight: 500, marginBottom: '6px' }}
              >
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                placeholder="Enter Company Name"
                autoFocus
                autoComplete="organization"
                disabled={verifyLoading}
                style={{
                  width:           '100%',
                  border:          `1px solid ${nameError ? '#f87171' : '#d1d5db'}`,
                  borderRadius:    '6px',
                  padding:         '10px 14px',
                  fontSize:        '14px',
                  color:           '#111827',
                  outline:         'none',
                  transition:      'border-color 0.15s',
                  boxSizing:       'border-box',
                  backgroundColor: verifyLoading ? '#f9fafb' : '#fff',
                }}
                onFocus={(e) => { if (!nameError) e.target.style.borderColor = '#60a5fa'; }}
                onBlurCapture={(e) => { if (!nameError) e.target.style.borderColor = '#d1d5db'; }}
              />
              {nameError && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                  {nameError}
                </p>
              )}
            </div>

            {/* ── Company Password ── */}
            <div className={pwTouched && !allRulesMet ? 'mb-3' : 'mb-6'}>
              <label
                htmlFor="companyPassword"
                style={{ display: 'block', fontSize: '13px', color: '#374151', fontWeight: 500, marginBottom: '6px' }}
              >
                Company Password
              </label>
              <Input
                id="companyPassword"
                name="companyPassword"
                type="password"
                value={companyPassword}
                onChange={handlePasswordChange}
                placeholder="Enter Company Password"
                eyeColor="#E05252"
                disabled={verifyLoading}
                autoComplete="new-password"
              />
            </div>

            {/* ── Password rules ─────────────────────────────────────────
                · Hidden before user types (pwTouched = false)
                · Shown while any rule is unmet — each turns green as it passes
                · Hidden again once ALL rules are met (clean UI before submit)
            ──────────────────────────────────────────────────────────── */}
            {pwTouched && !allRulesMet && (
              <ul className="flex flex-col gap-2 mb-5 pl-0.5">
                {rules.map((r) => (
                  <PasswordRule key={r.key} passed={r.passed} label={r.label} />
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <div className="mb-4">
              <Input
                label="Email ID"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email id"
                error={step2Errors.email}
                autoComplete="email"
              />
            </div>

            <div className="mb-4">
              <Input
                label="First name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="Enter First name"
                error={step2Errors.firstName}
                autoComplete="given-name"
              />
            </div>

            <div className="mb-4">
              <Input
                label="Last name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Enter Last name"
                error={step2Errors.lastName}
                autoComplete="family-name"
              />
            </div>

            <div className="mb-6">
              <Input
                label="Company name"
                name="companyNameStep2"
                type="text"
                value={companyName}
                placeholder="Enter Company name"
                error={step2Errors.companyName}
                autoComplete="organization"
                disabled
              />
            </div>
          </>
        )}

        {/* ── Next button ────────────────────────────────────────────
            DISABLED  → light gray bg, gray text, not-allowed cursor
            ENABLED   → coral bg (#E05252), white text (#FEFEFE), pointer
        ──────────────────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={step === 1 ? !canSubmit || verifyLoading : verifyLoading}
          style={{
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            gap:             '8px',
            width:           '100%',
            padding:         '11px 0',
            borderRadius:    '6px',
            border:          'none',
            fontSize:        '15px',
            fontWeight:      600,
            cursor:          step === 1
              ? canSubmit && !verifyLoading ? 'pointer' : 'not-allowed'
              : verifyLoading ? 'not-allowed' : 'pointer',
            transition:      'background-color 0.2s, color 0.2s',
            /* Enabled: coral / Disabled: light gray */
            backgroundColor: step === 1
              ? canSubmit && !verifyLoading ? '#E05252' : '#e5e7eb'
              : verifyLoading ? '#e5e7eb' : '#E05252',
            color:           step === 1
              ? canSubmit && !verifyLoading ? '#FEFEFE' : '#9ca3af'
              : verifyLoading ? '#9ca3af' : '#FEFEFE',
          }}
        >
          {/* Spinner shown only during API call */}
          {verifyLoading && (
            <span
              className="inline-block h-4 w-4 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(255,255,255,0.35)', borderTopColor: '#fff' }}
            />
          )}
          {verifyLoading ? 'Verifying…' : step === 1 ? 'Next' : 'Verify email'}
        </button>

      </form>
    </AuthLayout>
  );
};

export default Register;
