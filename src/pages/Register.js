import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  verifyCompany,
  saveUserDetails,
  clearVerifyError,
} from '../redux/slices/authSlice';
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
   Step 1 — Verify Company Name & Password  (API: verify-by-company-name-and-password)
   Step 2 — Enter User Details              (API: save-user-details-and-send-otp)
══════════════════════════════════════════════════════════════ */
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    verifyCompanyLoading,
    verifyCompanyError,
    saveDetailsLoading,
    saveDetailsError,
    registrationForm,
  } = useSelector((s) => s.auth);

  /* ── Step 1 local state ── */
  const [companyName,     setCompanyName]     = useState(registrationForm.companyName || '');
  const [companyPassword, setCompanyPassword] = useState('');
  const [nameError,       setNameError]       = useState('');
  const [pwTouched,       setPwTouched]       = useState(false);

  /* ── Step 2 local state ── */
  const [step,        setStep]        = useState(1);
  const [email,       setEmail]       = useState(registrationForm.email || '');
  const [firstName,   setFirstName]   = useState(registrationForm.firstName || '');
  const [lastName,    setLastName]    = useState(registrationForm.lastName || '');
  const [step2Errors, setStep2Errors] = useState({});

  /* ── Derived password rule states ── */
  const rules = [
    { key: 'len', label: 'Minimum 8 characters',       passed: passwordRules.minLength(companyPassword)    },
    { key: 'upp', label: 'At least 1 uppercase letter', passed: passwordRules.hasUppercase(companyPassword) },
    { key: 'num', label: 'At least 1 number',           passed: passwordRules.hasNumber(companyPassword)    },
  ];
  const allRulesMet = rules.every((r) => r.passed);
  const nameValid   = companyName.trim().length >= 2;
  const canSubmit   = nameValid && allRulesMet;

  const isStep1Loading = verifyCompanyLoading;
  const isStep2Loading = saveDetailsLoading;
  const currentError   = step === 1 ? verifyCompanyError : saveDetailsError;

  /* ── Step 1 handlers ── */
  const handleNameChange = (e) => {
    setCompanyName(e.target.value);
    if (nameError) setNameError('');
    if (verifyCompanyError) dispatch(clearVerifyError());
  };

  const handleNameBlur = () => {
    if (!companyName.trim())
      setNameError('Company name is required.');
    else if (companyName.trim().length < 2)
      setNameError('Company name must be at least 2 characters.');
  };

  const handlePasswordChange = (e) => {
    setCompanyPassword(e.target.value);
    if (!pwTouched) setPwTouched(true);
    if (verifyCompanyError) dispatch(clearVerifyError());
  };

  /* ── Step 2 handlers ── */
  const handleEmailChange     = (e) => { setEmail(e.target.value);     setStep2Errors((p) => ({ ...p, email:     undefined })); };
  const handleFirstNameChange = (e) => { setFirstName(e.target.value); setStep2Errors((p) => ({ ...p, firstName: undefined })); };
  const handleLastNameChange  = (e) => { setLastName(e.target.value);  setStep2Errors((p) => ({ ...p, lastName:  undefined })); };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!canSubmit) return;
      try {
        await dispatch(
          verifyCompany({ company_name: companyName.trim(), password: companyPassword })
        ).unwrap();
        setStep(2);
        setPwTouched(false);
      } catch (_) { /* verifyCompanyError shown via Alert */ }
      return;
    }

    /* Step 2 */
    const errors = validateStep2({ firstName, lastName, email, companyName });
    if (Object.keys(errors).length) { setStep2Errors(errors); return; }
    setStep2Errors({});

    try {
      await dispatch(
        saveUserDetails({
          company_id: registrationForm.companyId,
          mail:       email.trim(),
          fname:      firstName.trim(),
          lname:      lastName.trim(),
        })
      ).unwrap();
      navigate('/verify-code');
    } catch (_) { /* saveDetailsError shown via Alert */ }
  };

  /* ── Button state ── */
  const loading  = step === 1 ? isStep1Loading : isStep2Loading;
  const disabled = step === 1 ? (!canSubmit || loading) : loading;
  const btnLabel = loading
    ? (step === 1 ? 'Verifying…' : 'Sending OTP…')
    : (step === 1 ? 'Next' : 'Send OTP');

  /* ── Render ── */
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} noValidate>

        <h2
          className="text-center font-bold mb-6"
          style={{ color: '#1a3353', fontSize: '22px' }}
        >
          Registration
        </h2>

        {/* API error banner */}
        {currentError && (
          <div className="mb-4">
            <Alert type="error" message={currentError} />
          </div>
        )}

        {step === 1 ? (
          <>
            {/* Company Name */}
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
                disabled={loading}
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
                  backgroundColor: loading ? '#f9fafb' : '#fff',
                }}
                onFocus={(e) => { if (!nameError) e.target.style.borderColor = '#60a5fa'; }}
                onBlurCapture={(e) => { if (!nameError) e.target.style.borderColor = '#d1d5db'; }}
              />
              {nameError && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>{nameError}</p>
              )}
            </div>

            {/* Company Password */}
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
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            {/* Password rules — hidden until typing, and once all pass */}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <Input
                label="Company name"
                name="companyNameStep2"
                type="text"
                value={registrationForm.companyName || companyName}
                placeholder="Company name"
                disabled
              />
            </div>
          </>
        )}

        {/* Next / Send OTP button */}
        <button
          type="submit"
          disabled={disabled}
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
            cursor:          disabled ? 'not-allowed' : 'pointer',
            transition:      'background-color 0.2s',
            backgroundColor: disabled ? '#e5e7eb' : '#E05252',
            color:           disabled ? '#9ca3af' : '#FEFEFE',
          }}
        >
          {loading && (
            <span
              className="inline-block h-4 w-4 rounded-full border-2 animate-spin"
              style={{ borderColor: 'rgba(255,255,255,0.35)', borderTopColor: '#fff' }}
            />
          )}
          {btnLabel}
        </button>

      </form>
    </AuthLayout>
  );
};

export default Register;
