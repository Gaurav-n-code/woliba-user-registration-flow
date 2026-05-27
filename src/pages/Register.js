import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError, clearRegistrationSuccess } from '../redux/slices/authSlice';
import { validateStep1, validateStep2 } from '../utils/validators';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

/* ── Constants ───────────────────────────── */
/* ── Initial State ───────────────────────── */
const INIT_STEP1 = { companyName: '', companyPassword: '' };
const INIT_STEP2 = { firstName: '', lastName: '', email: '', phone: '' };

/* ── Component ───────────────────────────── */
const Register = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { loading, error, registrationSuccess } = useSelector((s) => s.auth);

  const [step,        setStep]        = useState(0);   // 0 = company creds, 1 = admin details
  const [step1,       setStep1]       = useState(INIT_STEP1);
  const [step2,       setStep2]       = useState(INIT_STEP2);
  const [fieldErrors, setFieldErrors] = useState({});

  /* ── Side effects ────────────────────── */
  useEffect(() => {
    if (registrationSuccess) setStep(2);            // show success screen
  }, [registrationSuccess]);

  useEffect(() => {
    if (error) dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step1, step2]);

  /* ── Handlers ────────────────────────── */
  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: '' }));
  };

  /** Step 0 → 1 */
  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateStep1(step1);
    if (Object.keys(errors).length) { setFieldErrors(errors); return; }
    setFieldErrors({});
    setCurrentStep(1);
  };

  /** Step 1 → submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateStep2(step2);
    if (Object.keys(errors).length) { setFieldErrors(errors); return; }

    dispatch(registerUser({
      company_name:     step1.companyName.trim(),
      company_password: step1.companyPassword,
      first_name:       step2.firstName.trim(),
      last_name:        step2.lastName.trim(),
      email:            step2.email.trim().toLowerCase(),
      phone:            step2.phone.trim(),
    }));
  };

  const setCurrentStep = (n) => { setStep(n); setFieldErrors({}); dispatch(clearError()); };

  /* ── Step 0: Company credentials (matches Figma) ── */
  const renderStep0 = () => (
    <form onSubmit={handleNext} noValidate>
      <h2
        className="text-center font-semibold mb-6"
        style={{ color: '#1a2b4b', fontSize: '22px' }}
      >
        Registration
      </h2>

      <Alert type="error" message={error} />

      {/* Company Name */}
      <div className="mb-4">
        <label
          htmlFor="companyName"
          className="block text-sm mb-1"
          style={{ color: '#4b5563' }}
        >
          Company Name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={step1.companyName}
          onChange={handleChange(setStep1)}
          placeholder="Enter Company Name"
          autoFocus
          className={`w-full border rounded-md px-3 py-2.5 text-sm
            placeholder-gray-400 focus:outline-none focus:ring-1 transition
            ${fieldErrors.companyName
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'}`}
        />
        {fieldErrors.companyName && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.companyName}</p>
        )}
      </div>

      {/* Company Password */}
      <div className="mb-6">
        <label
          htmlFor="companyPassword"
          className="block text-sm mb-1"
          style={{ color: '#4b5563' }}
        >
          Company Password
        </label>
        <Input
          id="companyPassword"
          name="companyPassword"
          type="password"
          value={step1.companyPassword}
          onChange={handleChange(setStep1)}
          placeholder="Enter Company Password"
          error={fieldErrors.companyPassword}
          eyeColor="#E05252"
        />
      </div>

      {/* Next button — matches Figma grey style */}
      <button
        type="submit"
        className="w-full rounded-md py-2.5 text-sm font-medium transition
          focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
        style={{ backgroundColor: '#d1d5db', color: '#374151' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9ca3af')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d1d5db')}
      >
        Next
      </button>

      {/* Sign in link */}
      <p className="mt-5 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium hover:underline"
          style={{ color: '#E05252' }}
        >
          Sign In
        </Link>
      </p>
    </form>
  );

  /* ── Step 1: Admin / contact details ── */
  const renderStep1 = () => (
    <form onSubmit={handleSubmit} noValidate>
      <h2
        className="text-center font-semibold mb-1"
        style={{ color: '#1a2b4b', fontSize: '22px' }}
      >
        Contact Details
      </h2>
      <p className="text-center text-xs text-gray-400 mb-6">
        Tell us about the account administrator
      </p>

      <Alert type="error" message={error} />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Input
          label="First Name"
          name="firstName"
          value={step2.firstName}
          onChange={handleChange(setStep2)}
          error={fieldErrors.firstName}
          placeholder="John"
          required
          autoFocus
        />
        <Input
          label="Last Name"
          name="lastName"
          value={step2.lastName}
          onChange={handleChange(setStep2)}
          error={fieldErrors.lastName}
          placeholder="Doe"
          required
        />
      </div>

      <div className="mb-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={step2.email}
          onChange={handleChange(setStep2)}
          error={fieldErrors.email}
          placeholder="you@company.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="mb-6">
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={step2.phone}
          onChange={handleChange(setStep2)}
          error={fieldErrors.phone}
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep(0)}
          disabled={loading}
          className="flex-1 border border-gray-300 rounded-md py-2.5 text-sm
            font-medium text-gray-600 hover:bg-gray-50 transition focus:outline-none"
        >
          ← Back
        </button>
        <Button type="submit" loading={loading} disabled={loading} className="flex-1">
          {loading ? 'Creating…' : 'Create Account'}
        </Button>
      </div>
    </form>
  );

  /* ── Step 2: Success screen ── */
  const renderSuccess = () => (
    <div className="text-center py-4 space-y-4">
      <div className="inline-flex h-16 w-16 items-center justify-center
        rounded-full bg-green-100 mx-auto">
        <svg className="h-8 w-8 text-green-600" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-bold" style={{ color: '#1a2b4b' }}>
          Account Created!
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Welcome to Woliba,{' '}
          <strong>{step1.companyName}</strong>!
          <br />Your account has been successfully created.
        </p>
      </div>
      <button
        onClick={() => { dispatch(clearRegistrationSuccess()); navigate('/login'); }}
        className="w-full rounded-md py-2.5 text-sm font-semibold text-white transition"
        style={{ backgroundColor: '#E05252' }}
      >
        Go to Sign In
      </button>
    </div>
  );

  return (
    <AuthLayout>
      {step === 0 && renderStep0()}
      {step === 1 && renderStep1()}
      {step === 2 && renderSuccess()}
    </AuthLayout>
  );
};

export default Register;
